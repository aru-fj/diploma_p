"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AuthInput } from "./auth-input";
import { AuthLogo } from "./logo";
import { PasswordInput } from "./password-input";
import { EmployerAuthImagePanel } from "./employer-auth-image-panel";
import { GoogleIcon, SocialButton } from "./social-button";
import { ProgressSteps } from "./progress-steps";
import { TestimonialCard } from "./testimonial-card";

type EmployerSignupForm = {
  confirmPassword: string;
  email: string;
  fullName: string;
  password: string;
  role: string;
};

type EmployerSignupErrors = Partial<Record<keyof EmployerSignupForm, string>>;

const initialForm: EmployerSignupForm = {
  confirmPassword: "",
  email: "",
  fullName: "",
  password: "",
  role: "",
};

export function EmployerSignupPage() {
  const router = useRouter();
  const [form, setForm] = useState<EmployerSignupForm>(initialForm);
  const [errors, setErrors] = useState<EmployerSignupErrors>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  function updateField(field: keyof EmployerSignupForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const nextErrors: EmployerSignupErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Full name is required";
    }

    if (!form.role.trim()) {
      nextErrors.role = "Role is required";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Business email is required";
    } else if (!emailPattern.test(form.email)) {
      nextErrors.email = "Please enter a valid business email";
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    window.localStorage.setItem(
      "mediahire.pendingProfile",
      JSON.stringify({
        email: form.email.trim(),
        fullName: form.fullName.trim(),
        role: "employer",
        title: form.role.trim(),
      }),
    );
    router.push(
      `/verify-email?role=employer&email=${encodeURIComponent(form.email.trim())}`,
    );
  }

  function handleGoogleSignup() {
    router.push("/auth/google?role=employer&intent=signup");
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
          <div className="w-full max-w-[335px]">
            <div className="mx-auto max-w-[175px]">
              <ProgressSteps activeStep={0} total={2} />
            </div>

            <div className="mt-6 text-center">
              <AuthLogo compact />
              <h1 className="mx-auto mt-6 max-w-[300px] text-2xl font-black leading-tight tracking-tight text-[#252525]">
                Give us your company information
              </h1>
              <p className="mx-auto mt-3 max-w-[300px] text-sm leading-6 text-slate-400">
                Please enter your personal details to set up your account and
                personalize your experience
              </p>
            </div>

            <form className="mt-5 space-y-3.5" onSubmit={handleSubmit} noValidate>
              <AuthInput
                autoComplete="name"
                compact
                error={errors.fullName}
                id="employerFullName"
                label="Full Name*"
                onChange={(event) => updateField("fullName", event.target.value)}
                placeholder="Enter your Full Name"
                type="text"
                value={form.fullName}
              />

              <AuthInput
                autoComplete="organization-title"
                compact
                error={errors.role}
                id="employerRole"
                label="Role*"
                onChange={(event) => updateField("role", event.target.value)}
                placeholder="Enter your role"
                type="text"
                value={form.role}
              />

              <AuthInput
                autoComplete="email"
                compact
                error={errors.email}
                id="employerEmail"
                label="Email*"
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="Enter your Business Email"
                type="email"
                value={form.email}
              />

              <PasswordInput
                autoComplete="new-password"
                compact
                error={errors.password}
                id="employerPassword"
                isVisible={isPasswordVisible}
                label="Password*"
                onChange={(event) => updateField("password", event.target.value)}
                onToggleVisibility={() =>
                  setIsPasswordVisible((current) => !current)
                }
                placeholder="Enter your password"
                value={form.password}
              />

              <PasswordInput
                autoComplete="new-password"
                compact
                error={errors.confirmPassword}
                id="employerConfirmPassword"
                isVisible={isConfirmVisible}
                label="Confirm Password*"
                onChange={(event) =>
                  updateField("confirmPassword", event.target.value)
                }
                onToggleVisibility={() =>
                  setIsConfirmVisible((current) => !current)
                }
                placeholder="Confirm your Password"
                value={form.confirmPassword}
              />

              <motion.button
                className="mt-1 h-12 w-full rounded-lg bg-[#252525] text-base font-black text-white shadow-[0_12px_28px_rgba(37,37,37,0.18)] transition hover:bg-black focus:outline-none focus:ring-4 focus:ring-[#252525]/15"
                type="submit"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
              >
                Sign up
              </motion.button>
            </form>

            <div className="my-4 flex items-center gap-5 text-sm font-semibold text-slate-400">
              <span className="h-px flex-1 bg-slate-300" />
              OR
              <span className="h-px flex-1 bg-slate-300" />
            </div>

            <SocialButton
              compact
              icon={<GoogleIcon />}
              onClick={handleGoogleSignup}
              tone="dark"
            >
              Sign up with Google
            </SocialButton>

            <p className="mt-4 text-center text-sm font-medium text-slate-500">
              Do you already have an account?{" "}
              <Link
                className="font-black text-[#0B63E5] underline-offset-4 transition hover:underline"
                href="/login/employer"
              >
                Login
              </Link>
            </p>
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
                avatar="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=160&q=80"
                name="Robert Fox"
                role="Recruiter at Apple"
                text="This website made job searching so much easier. The interface is user-friendly, the filters are precise, and I quickly saw relevant opportunities. It truly understands what job seekers need."
              />
            </motion.div>
          </EmployerAuthImagePanel>
        </motion.section>
      </div>
    </main>
  );
}
