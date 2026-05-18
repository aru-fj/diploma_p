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
import { TestimonialCard } from "./testimonial-card";

type EmployerLoginErrors = {
  email?: string;
  password?: string;
};

export function EmployerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<EmployerLoginErrors>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function validate() {
    const nextErrors: EmployerLoginErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      nextErrors.email = "Business email is required";
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Please enter a valid business email";
    }

    if (!password.trim()) {
      nextErrors.password = "Password is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const businessEmail = email.trim();

    window.localStorage.setItem(
      "mediahire.pendingProfile",
      JSON.stringify({
        email: businessEmail,
        role: "employer",
      }),
    );

    router.push(
      `/verify-email?role=employer&email=${encodeURIComponent(
        businessEmail,
      )}&next=${encodeURIComponent("/dashboard/employer")}`,
    );
  }

  function handleGoogleSignin() {
    router.push("/auth/google?role=employer&intent=signin");
  }

  return (
    <main className="min-h-screen bg-white px-4 py-5 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.35fr] lg:items-stretch">
        <motion.section
          className="flex items-center justify-center py-8 lg:py-0"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full max-w-[360px]">
            <div className="text-center">
              <AuthLogo />
              <h1 className="mt-10 text-3xl font-black tracking-tight text-[#252525]">
                Welcome Back
              </h1>
              <p className="mx-auto mt-4 max-w-[320px] text-base leading-7 text-slate-400">
                Find talented media professionals and build your creative team
                faster
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
              <AuthInput
                autoComplete="email"
                error={errors.email}
                id="employerEmail"
                label="Email*"
                onChange={(event) => {
                  setEmail(event.target.value);
                  setErrors((current) => ({ ...current, email: undefined }));
                }}
                placeholder="Enter your Business Email"
                type="email"
                value={email}
              />

              <PasswordInput
                autoComplete="current-password"
                error={errors.password}
                id="employerPassword"
                isVisible={isPasswordVisible}
                label="Password*"
                onChange={(event) => {
                  setPassword(event.target.value);
                  setErrors((current) => ({ ...current, password: undefined }));
                }}
                onToggleVisibility={() =>
                  setIsPasswordVisible((current) => !current)
                }
                placeholder="Enter your password"
                value={password}
              />

              <motion.button
                className="h-14 w-full rounded-xl bg-[#252525] text-lg font-black text-white shadow-[0_16px_36px_rgba(37,37,37,0.20)] transition hover:bg-black focus:outline-none focus:ring-4 focus:ring-[#252525]/15"
                type="submit"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
              >
                Log In
              </motion.button>
            </form>

            <div className="my-7 flex items-center gap-5 text-sm font-semibold text-slate-400">
              <span className="h-px flex-1 bg-slate-300" />
              OR
              <span className="h-px flex-1 bg-slate-300" />
            </div>

            <SocialButton
              icon={<GoogleIcon />}
              onClick={handleGoogleSignin}
              tone="dark"
            >
              Sign in with Google
            </SocialButton>

            <p className="mt-5 text-center text-sm font-medium text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                className="font-black text-[#0B63E5] underline-offset-4 transition hover:underline"
                href="/signup/employer"
              >
                Sign Up
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
