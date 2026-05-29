"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase-client";
import { AuthImagePanel } from "./auth-image-panel";
import { AuthInput } from "./auth-input";
import { AuthLogo } from "./logo";
import { PrimaryButton } from "./primary-button";
import { ProgressSteps } from "./progress-steps";
import { TestimonialCard } from "./testimonial-card";

type LocationForm = {
  location: string;
  postalCode: string;
};

type LocationErrors = Partial<Record<keyof LocationForm, string>>;

const initialForm: LocationForm = {
  location: "",
  postalCode: "",
};

const nextStepRoute = "/signup/jobseeker/salary";

export function JobSeekerLocationPage() {
  const router = useRouter();
  const [form, setForm] = useState<LocationForm>(initialForm);
  const [errors, setErrors] = useState<LocationErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function updateField(field: keyof LocationForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  }

  function validate() {
    const nextErrors: LocationErrors = {};
    const postalPattern = /^[a-zA-Z0-9\s-]+$/;

    if (form.postalCode.trim() && !postalPattern.test(form.postalCode)) {
      nextErrors.postalCode = "Postal code can contain only letters and numbers";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function saveLocation() {
    const location = form.location.trim();
    const postalCode = form.postalCode.trim();

    if (!location && !postalCode) {
      return;
    }

    window.localStorage.setItem(
      "mediahire.jobseeker.location",
      JSON.stringify({ location, postalCode }),
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        city: location || null,
        location: location || null,
        postal_code: postalCode || null,
      })
      .eq("user_id", user.id);

    if (error) {
      throw error;
    }
  }

  function goToNextStep() {
    setIsLoading(true);
    router.push(nextStepRoute);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    setSubmitError("");

    try {
      await saveLocation();
      router.push(nextStepRoute);
    } catch (error) {
      setIsLoading(false);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Could not save location. Please try again.",
      );
    }
  }

  function handleSkip() {
    setErrors({});
    setSubmitError("");
    goToNextStep();
  }

  return (
    <main className="min-h-screen bg-white px-4 py-5 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.35fr] lg:items-start">
        <motion.section
          className="flex items-start justify-center py-8 lg:py-8"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full max-w-[360px]">
            <ProgressSteps activeStep={1} />

            <div className="mt-24 text-center max-lg:mt-12">
              <AuthLogo />
              <h1 className="mt-8 text-3xl font-black tracking-tight text-slate-900">
                What is your location?
              </h1>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                We use this to match you nearby offers.
              </p>
            </div>

            <form className="mt-7 space-y-4" onSubmit={handleSubmit} noValidate>
              <AuthInput
                autoComplete="address-level2"
                error={errors.location}
                id="location"
                label="Location"
                onChange={(event) => updateField("location", event.target.value)}
                placeholder="Enter your location"
                type="text"
                value={form.location}
              />

              <AuthInput
                autoComplete="postal-code"
                error={errors.postalCode}
                id="postalCode"
                inputMode="text"
                label="Postal code"
                onChange={(event) =>
                  updateField("postalCode", event.target.value)
                }
                placeholder="Enter your Postal code"
                type="text"
                value={form.postalCode}
              />

              {submitError ? (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">
                  {submitError}
                </p>
              ) : null}

              <PrimaryButton className="mt-4" isLoading={isLoading} type="submit">
                Continue
              </PrimaryButton>
            </form>

            <button
              className="mx-auto mt-6 block rounded-full px-6 py-2 text-sm font-bold text-slate-500 transition hover:bg-[#eef4ff] hover:text-[#0B63E5] focus:outline-none focus:ring-4 focus:ring-[#0B63E5]/10"
              onClick={handleSkip}
              type="button"
            >
              Skip
            </button>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <AuthImagePanel
            alt="Media creator holding a tablet and filming setup"
            imageClassName="object-center"
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1500&q=90"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
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
                avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
                name="Dana Kairat"
                role="Job Seeker"
                text="Adding my location helped MediaHire show studios and production teams close to me. The offers felt more relevant, and I could focus on creative roles that matched my city and schedule."
              />
            </motion.div>
          </AuthImagePanel>
        </motion.section>
      </div>
    </main>
  );
}
