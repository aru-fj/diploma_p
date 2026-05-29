"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  normalizeMediaHireRole,
  type MediaHireRole,
} from "@/lib/oauth";
import { AuthImagePanel } from "../auth-image-panel";
import { EmployerAuthImagePanel } from "../employer-auth-image-panel";
import { AuthLogo } from "../logo";
import { PrimaryButton } from "../primary-button";
import { TestimonialCard } from "../testimonial-card";
import { CountdownTimer } from "./countdown-timer";
import { RoleSwitchText } from "./role-switch-text";
import { VerificationCodeInput } from "./verification-code-input";

const initialSeconds = 5 * 60;
const emptyCode = ["", "", "", "", "", ""];

function getSafeNextRoute(nextRoute: string | null) {
  if (!nextRoute?.startsWith("/") || nextRoute.startsWith("//")) {
    return null;
  }

  return nextRoute;
}

function getVerifiedRoute(role: MediaHireRole, nextRoute: string | null) {
  const safeNextRoute = getSafeNextRoute(nextRoute);

  if (safeNextRoute) {
    return safeNextRoute;
  }

  return role === "employer"
    ? "/signup/employer/company-details"
    : "/signup/jobseeker/location";
}

export function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = normalizeMediaHireRole(searchParams.get("role"));
  const isEmployer = role === "employer";
  const nextRoute = searchParams.get("next");
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [code, setCode] = useState(emptyCode);
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const codeValue = useMemo(() => code.join(""), [code]);
  const isComplete = code.every(Boolean);
  const isExpired = secondsLeft <= 0;

  useEffect(() => {
    async function loadEmail() {
      if (email) {
        return;
      }

      const storedProfile =
        window.localStorage.getItem("mediahire.jobseeker.googleProfile") ??
        window.localStorage.getItem("mediahire.pendingProfile");

      if (storedProfile) {
        try {
          const parsedProfile = JSON.parse(storedProfile) as { email?: string };
          if (parsedProfile.email) {
            setEmail(parsedProfile.email);
            return;
          }
        } catch {
          window.localStorage.removeItem("mediahire.pendingProfile");
        }
      }

      try {
        const response = await fetch("/api/auth/session");
        const session = (await response.json()) as { user?: { email?: string } };
        if (session.user?.email) {
          setEmail(session.user.email);
        }
      } catch {
        setEmail("");
      }
    }

    void loadEmail();
  }, [email]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [secondsLeft]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isComplete) {
      setError("Enter the 6-digit verification code");
      return;
    }

    if (isExpired) {
      setError("Code expired. Please resend a new code.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    const response = await fetch("/api/auth/verify-email", {
      body: JSON.stringify({ code: codeValue, email, role }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    if (!response.ok) {
      setIsLoading(false);
      setError("Invalid verification code. Please try again.");
      return;
    }

    router.push(getVerifiedRoute(role, nextRoute));
  }

  async function handleResend() {
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    await fetch("/api/auth/resend-code", {
      body: JSON.stringify({ email, role }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    setCode(emptyCode);
    setSecondsLeft(initialSeconds);
    setSuccessMessage("A new verification code has been sent.");
    setIsLoading(false);
  }

  const verifyButtonClass = isEmployer
    ? "bg-[#252525] hover:bg-black focus:ring-[#252525]/15 disabled:bg-slate-200 disabled:text-slate-400"
    : "";

  const rightPanel = isEmployer ? (
    <EmployerAuthImagePanel>
      <motion.div
        className="absolute inset-x-6 bottom-6 sm:inset-x-9 sm:bottom-9"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <TestimonialCard
          avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80"
          name="Jane Cooper"
          role="External at Google"
          text="Searching for jobs can often feel chaotic, but here, everything felt manageable. The site's well-thought-out structure and personalized suggestions helped me stay focused and on track. For once, checking job updates."
        />
      </motion.div>
    </EmployerAuthImagePanel>
  ) : (
    <AuthImagePanel
      alt="Media creator preparing content"
      src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1500&q=90"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
      <motion.div
        className="absolute inset-x-6 bottom-6 sm:inset-x-9 sm:bottom-9"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <TestimonialCard />
      </motion.div>
    </AuthImagePanel>
  );

  return (
    <main className="min-h-screen bg-white px-4 py-5 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.35fr] lg:items-start">
        <motion.section
          className="flex items-center justify-center py-10 lg:py-0"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full max-w-[360px] text-center">
            <AuthLogo />
            <RoleSwitchText role={role} />

            <h1 className="mt-6 text-2xl font-black tracking-tight text-[#252525]">
              Verify your email address
            </h1>
            <p className="mx-auto mt-3 max-w-[310px] text-sm leading-6 text-slate-400">
              We&apos;ve sent a verification code to your email. Please enter
              the code in the box below to verify your account.
            </p>
            {email ? (
              <p className="mt-3 text-sm font-bold text-slate-500">{email}</p>
            ) : null}

            <form onSubmit={handleSubmit} noValidate>
              <VerificationCodeInput
                code={code}
                disabled={isLoading}
                onChange={(nextCode) => {
                  setCode(nextCode);
                  setError("");
                  setSuccessMessage("");
                }}
              />

              <CountdownTimer seconds={secondsLeft} />

              {error ? (
                <p className="mt-4 text-sm font-bold text-red-500">{error}</p>
              ) : null}
              {successMessage ? (
                <p className="mt-4 text-sm font-bold text-emerald-600">
                  {successMessage}
                </p>
              ) : null}

              <PrimaryButton
                className={`mt-6 ${verifyButtonClass}`}
                disabled={!isComplete || isExpired}
                isLoading={isLoading}
                type="submit"
              >
                Verify
              </PrimaryButton>
            </form>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Didn&apos;t receive the code?{" "}
              <button
                className="font-black text-[#0B63E5] underline-offset-4 transition hover:underline disabled:text-slate-400"
                disabled={isLoading}
                onClick={handleResend}
                type="button"
              >
                Resend
              </button>
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {rightPanel}
        </motion.section>
      </div>
    </main>
  );
}
