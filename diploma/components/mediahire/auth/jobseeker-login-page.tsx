"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AuthInput } from "./auth-input";
import { AuthLogo } from "./logo";
import { PasswordInput } from "./password-input";
import { GoogleIcon, SocialButton } from "./social-button";
import { TestimonialCard } from "./testimonial-card";

type LoginErrors = {
  email?: string;
  password?: string;
};

export function JobSeekerLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function validate() {
    const nextErrors: LoginErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Email is required";
    }

    if (!password.trim()) {
      nextErrors.password = "Password is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }


  function handleGoogleSignin() {
    window.location.href =
      "/auth/google?role=jobseeker&intent=signin";
  }

  return (
    <main className="min-h-screen bg-white px-4 py-5 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.35fr] lg:items-stretch">
        <motion.section
          className="flex items-center justify-center py-8 lg:py-0"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full max-w-[335px]">
            <div className="text-center">
              <AuthLogo compact />
              <h1 className="mt-6 text-2xl font-black tracking-tight text-slate-900">
                Welcome Back
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Sign in to explore jobs, build your network, and showcase your
                media portfolio
              </p>
            </div>

            <form className="mt-5 space-y-3.5" noValidate>
              <AuthInput
                autoComplete="email"
                compact
                error={errors.email}
                id="email"
                name="email"
                label="Email*"
                onChange={(event) => {
                  setEmail(event.target.value);
                  setErrors((current) => ({ ...current, email: undefined }));
                }}
                placeholder="Enter your Email Address"
                type="email"
                value={email}
              />

              <PasswordInput
                autoComplete="current-password"
                compact
                error={errors.password}
                id="password"
                name="password"
                isVisible={isPasswordVisible}
                label="Password*"
                onChange={(event) => {
                  setPassword(event.target.value);
                  setErrors((current) => ({ ...current, password: undefined }));
                }}
                onToggleVisibility={() =>
                  setIsPasswordVisible((current) => !current)
                }
                placeholder="Enter your Password"
                value={password}
              />

              <motion.button
                className="h-12 w-full rounded-lg bg-[#0B63E5] text-base font-black text-white shadow-[0_12px_28px_rgba(11,99,229,0.20)] transition hover:bg-[#0758cf] focus:outline-none focus:ring-4 focus:ring-[#0B63E5]/20"
                type="submit"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
              >
                Log In
              </motion.button>
            </form>

            <div className="my-4 flex items-center gap-5 text-sm font-semibold text-slate-400">
              <span className="h-px flex-1 bg-slate-300" />
              OR
              <span className="h-px flex-1 bg-slate-300" />
            </div>

            <SocialButton compact icon={<GoogleIcon />} onClick={handleGoogleSignin}>
              Sign in with Google
            </SocialButton>

            <p className="mt-4 text-center text-sm font-medium text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                className="font-black text-[#0B63E5] underline-offset-4 transition hover:underline"
                href="/signup/jobseeker"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </motion.section>

        <motion.section
          className="relative min-h-[520px] overflow-hidden rounded-2xl bg-slate-200 shadow-[0_24px_80px_rgba(15,23,42,0.14)] max-lg:min-h-[520px] max-sm:hidden"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            alt="Media creator preparing content"
            className="object-cover"
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
