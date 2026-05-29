"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { AlertTriangle, Loader2, ShieldCheck } from "lucide-react";

import { supabase } from "@/lib/supabase-client";
import {
  requestVerificationCode,
  upsertProfile,
  type MediaHireRole,
} from "@/components/mediahire/supabase-auth/auth-service";
import { AuthLogo } from "../logo";
import { GoogleIcon } from "../social-button";

type OAuthMode = "login" | "signup";

function normalizeRole(value: string | null): MediaHireRole {
  return value === "employer" ? "employer" : "jobseeker";
}

function normalizeMode(value: string | null): OAuthMode {
  return value === "login" ? "login" : "signup";
}

function splitName(fullName: string) {
  const [firstName = "", ...rest] = fullName.trim().split(/\s+/);

  return {
    firstName,
    lastName: rest.join(" "),
  };
}

function nextPath(role: MediaHireRole, mode: OAuthMode) {
  if (mode === "login") {
    return role === "employer" ? "/account/employer" : "/home/jobseeker";
  }

  return role === "employer"
    ? "/signup/employer/google-details"
    : "/signup/jobseeker/google-details";
}

export function GoogleAuthCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function completeGoogleAuth() {
      const role = normalizeRole(searchParams.get("role"));
      const mode = normalizeMode(searchParams.get("mode"));
      const code = searchParams.get("code");

      try {
        const { data: initialSession } = await supabase.auth.getSession();

        if (!initialSession.session && code) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) {
            throw exchangeError;
          }
        }

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          throw userError || new Error("Could not complete Google authentication.");
        }

        const fullName =
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          user.email?.split("@")[0] ||
          "";
        const { firstName, lastName } = splitName(fullName);
        const email = user.email || "";
        const avatarUrl =
          user.user_metadata?.avatar_url || user.user_metadata?.picture || "";

        await upsertProfile({
          avatarUrl,
          email,
          firstName,
          jobTitle: role === "employer" ? "Employer" : "Creative Specialist",
          lastName,
          provider: "google",
          role,
          userId: user.id,
        });

        if (mode === "signup") {
          await requestVerificationCode({
            email,
            provider: "google",
            role,
            userId: user.id,
          });

          const verifyUrl = new URL("/verify-email", window.location.origin);
          verifyUrl.searchParams.set("role", role);
          verifyUrl.searchParams.set("email", email);
          verifyUrl.searchParams.set("provider", "google");
          verifyUrl.searchParams.set("next", nextPath(role, mode));

          router.replace(verifyUrl.pathname + verifyUrl.search);
          return;
        }

        router.replace(nextPath(role, mode));
      } catch (authError) {
        if (isMounted) {
          setError(
            authError instanceof Error
              ? authError.message
              : "Could not complete Google authentication.",
          );
        }
      }
    }

    void completeGoogleAuth();

    return () => {
      isMounted = false;
    };
  }, [router, searchParams]);

  return (
    <main className="grid min-h-screen place-items-center bg-[#f5f7fb] px-4 py-10 text-slate-950">
      <motion.section
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-[1.5rem] border border-[#0B63E5]/15 bg-white p-6 text-center shadow-[0_24px_80px_rgba(11,99,229,0.14)] sm:p-7"
        initial={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <AuthLogo />

        <div className="mx-auto mt-6 grid h-16 w-16 place-items-center rounded-2xl bg-[#f7faff] shadow-inner">
          <GoogleIcon />
        </div>

        <h1 className="mt-6 text-2xl font-black tracking-tight text-slate-900">
          {error ? "Google sign in failed" : "Completing Google sign in"}
        </h1>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-500">
          {error
            ? "Please go back and try choosing your Google account again."
            : "Please wait while MediaHire securely connects your account."}
        </p>

        {error ? (
          <div className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-left text-sm font-bold leading-6 text-red-700">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 shrink-0" size={18} />
              <span>{error}</span>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl bg-[#eef4ff] px-4 py-3 text-sm font-bold text-[#0B63E5]">
            <Loader2 className="animate-spin" size={18} />
            Syncing your Google profile
          </div>
        )}

        <div className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
          <ShieldCheck size={15} />
          MediaHire never sees or stores your Google password.
        </div>

        {error ? (
          <Link
            className="mt-7 inline-flex text-sm font-black text-[#0B63E5] underline-offset-4 transition hover:underline"
            href="/signup"
          >
            Back to sign up
          </Link>
        ) : null}
      </motion.section>
    </main>
  );
}
