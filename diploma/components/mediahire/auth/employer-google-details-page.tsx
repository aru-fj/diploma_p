"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase-client";
import { upsertProfile } from "@/components/mediahire/supabase-auth/auth-service";
import {
  getEmployerProfile,
  saveEmployerProfile,
} from "../employer/employer-store";
import { AuthInput } from "./auth-input";
import { AuthLogo } from "./logo";
import { EmployerAuthImagePanel } from "./employer-auth-image-panel";
import { PasswordInput } from "./password-input";
import { ProgressSteps } from "./progress-steps";
import { TestimonialCard } from "./testimonial-card";

type GoogleUser = {
  avatar: string | null;
  email: string;
  name: string | null;
};

type EmployerGoogleDetailsForm = {
  confirmPassword: string;
  fullName: string;
  password: string;
  role: string;
};

type EmployerGoogleDetailsErrors = Partial<
  Record<keyof EmployerGoogleDetailsForm, string>
>;

function splitName(fullName: string) {
  const [firstName = "", ...lastNameParts] = fullName.trim().split(/\s+/);

  return {
    firstName,
    lastName: lastNameParts.join(" "),
  };
}

export function EmployerGoogleDetailsPage({
  googleUser,
}: {
  googleUser?: GoogleUser;
}) {
  const router = useRouter();
  const initialName = useMemo(
    () => googleUser?.name?.trim() || "",
    [googleUser?.name],
  );
  const [googleProfile, setGoogleProfile] = useState<GoogleUser>({
    avatar: googleUser?.avatar ?? null,
    email: googleUser?.email ?? "",
    name: googleUser?.name ?? null,
  });
  const [form, setForm] = useState<EmployerGoogleDetailsForm>({
    confirmPassword: "",
    fullName: initialName,
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState<EmployerGoogleDetailsErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadGoogleProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!isMounted || !user) {
        return;
      }

      const fullName =
        user.user_metadata?.full_name || user.user_metadata?.name || "";

      setGoogleProfile({
        avatar: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
        email: user.email || "",
        name: fullName,
      });
      setForm((current) => ({
        ...current,
        fullName: current.fullName || fullName,
      }));
    }

    void loadGoogleProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  function updateField(field: keyof EmployerGoogleDetailsForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  }

  function validate() {
    const nextErrors: EmployerGoogleDetailsErrors = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Full name is required";
    }

    if (!form.role.trim()) {
      nextErrors.role = "Role is required";
    }

    if (!form.password.trim()) {
      nextErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters";
    }

    if (!form.confirmPassword.trim()) {
      nextErrors.confirmPassword = "Please confirm your password";
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "Passwords must match";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    setSubmitError("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw userError || new Error("Please choose your Google account again.");
      }

      const fullName = form.fullName.trim();
      const { firstName, lastName } = splitName(fullName);
      const email = user.email || googleProfile.email;
      const avatar =
        user.user_metadata?.avatar_url ||
        user.user_metadata?.picture ||
        googleProfile.avatar ||
        "";

      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          first_name: firstName,
          full_name: fullName,
          job_title: form.role.trim(),
          last_name: lastName,
          provider: "google",
          role: "employer",
        },
        password: form.password,
      });

      if (updateError) {
        throw updateError;
      }

      await upsertProfile({
        avatarUrl: avatar,
        email,
        firstName,
        jobTitle: form.role.trim(),
        lastName,
        provider: "google",
        role: "employer",
        userId: user.id,
      });

      const currentEmployerProfile = getEmployerProfile();

      saveEmployerProfile({
        ...currentEmployerProfile,
        avatar: avatar || currentEmployerProfile.avatar,
        email,
        firstName: firstName || currentEmployerProfile.firstName,
        lastName: lastName || currentEmployerProfile.lastName,
        role: form.role.trim() || currentEmployerProfile.role,
      });

      window.localStorage.setItem(
        "mediahire.employer.googleProfile",
        JSON.stringify({
          avatar,
          email,
          fullName,
          provider: "google",
          role: form.role.trim(),
        }),
      );

      router.push("/signup/employer/company-details");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Could not complete Google registration.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white px-4 py-4 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl gap-7 lg:grid-cols-[0.78fr_1.35fr] lg:items-start">
        <motion.section
          className="flex items-center justify-center py-5 lg:py-4"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full max-w-[305px]">
            <div className="mx-auto max-w-[210px]">
              <ProgressSteps activeStep={0} total={2} />
            </div>

            <div className="mt-5 text-center">
              <AuthLogo compact />
              <h1 className="mx-auto mt-5 max-w-[280px] text-[1.35rem] font-black leading-tight tracking-tight text-[#252525]">
                Give us your information
              </h1>
              <p className="mx-auto mt-2 max-w-[280px] text-xs leading-5 text-slate-400">
                Please enter your personal details to set up your account and
                personalize your experience
              </p>
              <p className="mt-2 rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-bold leading-5 text-[#252525]">
                Signed in with Google as{" "}
                {googleProfile.email || "your selected Google account"}
              </p>
            </div>

            <form className="mt-4 space-y-3" onSubmit={handleSubmit} noValidate>
              <AuthInput
                autoComplete="name"
                compact
                error={errors.fullName}
                id="employerGoogleFullName"
                label="Full Name*"
                name="fullName"
                onChange={(event) => updateField("fullName", event.target.value)}
                placeholder="Enter your Full Name"
                type="text"
                value={form.fullName}
              />

              <AuthInput
                autoComplete="organization-title"
                compact
                error={errors.role}
                id="employerGoogleRole"
                label="Role*"
                name="role"
                onChange={(event) => updateField("role", event.target.value)}
                placeholder="Enter your role"
                type="text"
                value={form.role}
              />

              <PasswordInput
                autoComplete="new-password"
                compact
                error={errors.password}
                id="employerGooglePassword"
                isVisible={isPasswordVisible}
                label="Password*"
                name="password"
                onChange={(event) => updateField("password", event.target.value)}
                onToggleVisibility={() =>
                  setIsPasswordVisible((current) => !current)
                }
                placeholder="Enter your Password"
                value={form.password}
              />

              <PasswordInput
                autoComplete="new-password"
                compact
                error={errors.confirmPassword}
                id="employerGoogleConfirmPassword"
                isVisible={isConfirmVisible}
                label="Confirm Password*"
                name="confirmPassword"
                onChange={(event) =>
                  updateField("confirmPassword", event.target.value)
                }
                onToggleVisibility={() =>
                  setIsConfirmVisible((current) => !current)
                }
                placeholder="Confirmed your Password"
                value={form.confirmPassword}
              />

              {submitError ? (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">
                  {submitError}
                </p>
              ) : null}

              <motion.button
                className="mt-0.5 h-12 w-full rounded-lg bg-[#252525] text-base font-black text-white shadow-[0_12px_28px_rgba(37,37,37,0.18)] transition hover:bg-black focus:outline-none focus:ring-4 focus:ring-[#252525]/15 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isLoading}
                type="submit"
                whileHover={{ y: isLoading ? 0 : -2 }}
                whileTap={{ scale: isLoading ? 1 : 0.985 }}
              >
                {isLoading ? "Creating account..." : "Sign up"}
              </motion.button>
            </form>
          </div>
        </motion.section>

        <motion.section
          className="max-sm:hidden lg:sticky lg:top-4 lg:self-start"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
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
                avatar="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=160&q=80"
                name="Robert Fox"
                role="Recruiter at Apple"
                text="This website made hiring so much easier. The interface is user-friendly, the candidate filters are precise, and I quickly saw relevant creative portfolios."
              />
            </motion.div>
          </EmployerAuthImagePanel>
        </motion.section>
      </div>
    </main>
  );
}
