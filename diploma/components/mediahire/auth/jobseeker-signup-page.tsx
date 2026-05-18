"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AuthInput } from "./auth-input";
import { AuthLogo } from "./logo";
import { PasswordInput } from "./password-input";
import { ProgressSteps } from "./progress-steps";
import { GoogleIcon, SocialButton } from "./social-button";
import { TestimonialCard } from "./testimonial-card";

type SignupForm = {
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

type SignupErrors = Partial<Record<keyof SignupForm, string>>;

const initialForm: SignupForm = {
  confirmPassword: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
};

export function JobSeekerSignupPage() {
  const router = useRouter();
  const [form, setForm] = useState<SignupForm>(initialForm);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  function updateField(field: keyof SignupForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const nextErrors: SignupErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.firstName.trim()) {
      nextErrors.firstName = "First name is required";
    }

    if (!form.lastName.trim()) {
      nextErrors.lastName = "Last name is required";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!emailPattern.test(form.email)) {
      nextErrors.email = "Please enter a valid email address";
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

    const email = form.email.trim();

    window.localStorage.setItem(
      "mediahire.pendingProfile",
      JSON.stringify({
        email,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        role: "jobseeker",
      }),
    );

    router.push(
      `/verify-email?role=jobseeker&email=${encodeURIComponent(
        email,
      )}&next=${encodeURIComponent("/signup/jobseeker/location")}`,
    );
  }

  function handleGoogleSignup() {
    router.push("/auth/google?role=jobseeker&intent=signup");
  }

  return (
    <main className="min-h-screen bg-white px-4 py-5 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.35fr] lg:items-start">
        <motion.section
          className="flex items-center justify-center py-8 lg:py-6"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full max-w-[360px]">
            <ProgressSteps activeStep={0} />

            <div className="mt-8 text-center">
              <AuthLogo />
              <h1 className="mt-8 text-3xl font-black tracking-tight text-slate-900">
                Give us your information
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-400">
                Please enter your personal details to set up your account and
                personalize your experience
              </p>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              <AuthInput
                autoComplete="given-name"
                error={errors.firstName}
                id="firstName"
                label="First Name*"
                onChange={(event) => updateField("firstName", event.target.value)}
                placeholder="Enter your First Name"
                type="text"
                value={form.firstName}
              />

              <AuthInput
                autoComplete="family-name"
                error={errors.lastName}
                id="lastName"
                label="Last Name*"
                onChange={(event) => updateField("lastName", event.target.value)}
                placeholder="Enter your Last Name"
                type="text"
                value={form.lastName}
              />

              <AuthInput
                autoComplete="email"
                error={errors.email}
                id="email"
                label="Email*"
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="Enter your Email Address"
                type="email"
                value={form.email}
              />

              <PasswordInput
                autoComplete="new-password"
                error={errors.password}
                id="password"
                isVisible={isPasswordVisible}
                label="Password*"
                onChange={(event) => updateField("password", event.target.value)}
                onToggleVisibility={() =>
                  setIsPasswordVisible((current) => !current)
                }
                placeholder="Enter your Password"
                value={form.password}
              />

              <PasswordInput
                autoComplete="new-password"
                error={errors.confirmPassword}
                id="confirmPassword"
                isVisible={isConfirmVisible}
                label="Confirm Password*"
                onChange={(event) =>
                  updateField("confirmPassword", event.target.value)
                }
                onToggleVisibility={() =>
                  setIsConfirmVisible((current) => !current)
                }
                placeholder="Confirmed your Password"
                value={form.confirmPassword}
              />

              <motion.button
                className="mt-2 h-14 w-full rounded-xl bg-[#0B63E5] text-lg font-black text-white shadow-[0_16px_36px_rgba(11,99,229,0.24)] transition hover:bg-[#0758cf] focus:outline-none focus:ring-4 focus:ring-[#0B63E5]/20"
                type="submit"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
              >
                Sign up
              </motion.button>
            </form>

            <div className="my-6 flex items-center gap-5 text-sm font-semibold text-slate-400">
              <span className="h-px flex-1 bg-slate-300" />
              OR
              <span className="h-px flex-1 bg-slate-300" />
            </div>

            <SocialButton icon={<GoogleIcon />} onClick={handleGoogleSignup}>
              Sign up with Google
            </SocialButton>

            <p className="mt-5 text-center text-sm font-medium text-slate-500">
              Do you already have an account?{" "}
              <Link
                className="font-black text-[#0B63E5] underline-offset-4 transition hover:underline"
                href="/login/jobseeker"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.section>

        <motion.section
          className="relative overflow-hidden rounded-2xl bg-slate-200 shadow-[0_24px_80px_rgba(15,23,42,0.14)] max-lg:min-h-[520px] max-sm:hidden lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)] lg:min-h-[520px] lg:self-start"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            alt="Media creator preparing content"
            className="object-cover object-center"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1500&q=90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

          <motion.div
            className="absolute inset-x-6 bottom-6 sm:inset-x-9 sm:bottom-9"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <TestimonialCard />
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}
