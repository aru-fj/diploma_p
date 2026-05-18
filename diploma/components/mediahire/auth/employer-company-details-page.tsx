"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AuthInput } from "./auth-input";
import { AuthLogo } from "./logo";
import { CompanyLogoUpload } from "./company-logo-upload";
import { EmployerAuthImagePanel } from "./employer-auth-image-panel";
import { PrimaryButton } from "./primary-button";
import { ProgressSteps } from "./progress-steps";
import { TestimonialCard } from "./testimonial-card";
import { TextareaField } from "./textarea-field";

type CompanyDetailsForm = {
  companyDescription: string;
  companyField: string;
  companyName: string;
};

type CompanyDetailsErrors = Partial<
  Record<keyof CompanyDetailsForm | "logo", string>
>;

const descriptionLimit = 512;
const maxLogoSize = 5 * 1024 * 1024;
const allowedLogoTypes = ["image/png", "image/jpeg", "image/jpg"];

const initialForm: CompanyDetailsForm = {
  companyDescription: "",
  companyField: "",
  companyName: "",
};

export function EmployerCompanyDetailsPage() {
  const router = useRouter();
  const [form, setForm] = useState<CompanyDetailsForm>(initialForm);
  const [errors, setErrors] = useState<CompanyDetailsErrors>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const logoPreviewRef = useRef("");

  useEffect(() => {
    return () => {
      if (logoPreviewRef.current) {
        URL.revokeObjectURL(logoPreviewRef.current);
      }
    };
  }, []);

  function updateField(field: keyof CompanyDetailsForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleLogoChange(file: File | null) {
    setErrors((current) => ({ ...current, logo: undefined }));

    if (logoPreviewRef.current) {
      URL.revokeObjectURL(logoPreviewRef.current);
      logoPreviewRef.current = "";
    }

    if (!file) {
      setLogoFile(null);
      setLogoPreview("");
      return;
    }

    if (!allowedLogoTypes.includes(file.type)) {
      setLogoFile(null);
      setErrors((current) => ({
        ...current,
        logo: "Please upload a PNG, JPG, or JPEG file",
      }));
      return;
    }

    if (file.size > maxLogoSize) {
      setLogoFile(null);
      setErrors((current) => ({
        ...current,
        logo: "Logo must be smaller than 5 MB",
      }));
      return;
    }

    setLogoFile(file);
    const nextPreview = URL.createObjectURL(file);
    logoPreviewRef.current = nextPreview;
    setLogoPreview(nextPreview);
  }

  function validate() {
    const nextErrors: CompanyDetailsErrors = {};

    if (!form.companyName.trim()) {
      nextErrors.companyName = "Company name is required";
    }

    if (!form.companyDescription.trim()) {
      nextErrors.companyDescription = "Company description is required";
    } else if (form.companyDescription.length > descriptionLimit) {
      nextErrors.companyDescription = "Description must be 512 characters or less";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function finishRegistration() {
    window.localStorage.setItem(
      "mediahire.employer.companyDetails",
      JSON.stringify({
        companyDescription: form.companyDescription.trim(),
        companyField: form.companyField.trim(),
        companyName: form.companyName.trim(),
        logoName: logoFile?.name ?? null,
      }),
    );
    router.push("/dashboard/employer");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    window.setTimeout(finishRegistration, 550);
  }

  function handleSkip() {
    router.push("/dashboard/employer");
  }

  return (
    <main className="min-h-screen bg-white px-4 py-5 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.35fr] lg:items-start">
        <motion.section
          className="flex items-center justify-center py-8 lg:py-6"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full max-w-[390px]">
            <div className="mx-auto max-w-[170px]">
              <ProgressSteps activeStep={1} total={2} />
            </div>

            <div className="mt-8 text-center">
              <AuthLogo />
              <h1 className="mx-auto mt-8 max-w-[360px] text-3xl font-black leading-tight tracking-tight text-[#252525]">
                Give us your company information
              </h1>
              <p className="mx-auto mt-4 max-w-[360px] text-base leading-7 text-slate-400">
                Please provide your company details to complete your profile and
                access all features
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
              <CompanyLogoUpload
                error={errors.logo}
                onChange={handleLogoChange}
                previewUrl={logoPreview}
              />

              <AuthInput
                autoComplete="organization"
                error={errors.companyName}
                id="companyName"
                label="Company name*"
                onChange={(event) =>
                  updateField("companyName", event.target.value)
                }
                placeholder="Enter your company name"
                type="text"
                value={form.companyName}
              />

              <AuthInput
                autoComplete="organization-title"
                error={errors.companyField}
                id="companyField"
                label="Company Field"
                onChange={(event) =>
                  updateField("companyField", event.target.value)
                }
                placeholder="Enter your company field"
                type="text"
                value={form.companyField}
              />

              <TextareaField
                counter={`${form.companyDescription.length}/${descriptionLimit}`}
                error={errors.companyDescription}
                helperText="This is a more information"
                id="companyDescription"
                label="Company description*"
                maxLength={descriptionLimit}
                onChange={(event) =>
                  updateField("companyDescription", event.target.value)
                }
                placeholder="write your description company"
                value={form.companyDescription}
              />

              <PrimaryButton
                className="mt-5 bg-[#252525] text-lg shadow-[0_16px_36px_rgba(37,37,37,0.20)] hover:bg-black focus:ring-[#252525]/15"
                isLoading={isLoading}
                type="submit"
              >
                Finish Up
              </PrimaryButton>

              <button
                className="mx-auto block px-4 py-2 text-base font-semibold text-[#252525] transition hover:text-[#0B63E5] disabled:cursor-not-allowed disabled:text-slate-400"
                disabled={isLoading}
                onClick={handleSkip}
                type="button"
              >
                Skip
              </button>
            </form>
          </div>
        </motion.section>

        <motion.section
          className="max-sm:hidden lg:sticky lg:top-5 lg:self-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <EmployerAuthImagePanel>
            <motion.div
              className="absolute inset-x-6 bottom-6 sm:inset-x-9 sm:bottom-9"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <TestimonialCard
                avatar="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=160&q=80"
                name="Bessie Cooper"
                role="Hiring Manager at X"
                text="After trying several job portals, this one stood out. The navigation was clean, the job quality impressive, and applying was fast and professional. I found great matches for my background."
              />
            </motion.div>
          </EmployerAuthImagePanel>
        </motion.section>
      </div>
    </main>
  );
}
