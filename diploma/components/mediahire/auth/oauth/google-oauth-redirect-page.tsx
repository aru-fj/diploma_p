"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { AlertTriangle, Loader2, ShieldCheck } from "lucide-react";
import {
  normalizeMediaHireOAuthIntent,
  normalizeMediaHireRole,
} from "@/lib/oauth";
import { signInWithGoogle } from "@/components/mediahire/supabase-auth/auth-service";
import { AuthLogo } from "../logo";
import { GoogleIcon } from "../social-button";

export function GoogleOAuthRedirectPage({
  isGoogleOAuthConfigured,
}: {
  isGoogleOAuthConfigured: boolean;
}) {
  const searchParams = useSearchParams();
  const role = normalizeMediaHireRole(searchParams.get("role"));
  const intent = normalizeMediaHireOAuthIntent(searchParams.get("intent"));
  const hasOAuthError = Boolean(searchParams.get("error"));

  useEffect(() => {
    if (!isGoogleOAuthConfigured || hasOAuthError) {
      return;
    }

    const redirectTimer = window.setTimeout(() => {
      void signInWithGoogle(role, intent === "signin" ? "login" : "signup");
    }, 650);

    return () => window.clearTimeout(redirectTimer);
  }, [hasOAuthError, intent, isGoogleOAuthConfigured, role]);

  const statusTitle =
    isGoogleOAuthConfigured && !hasOAuthError
      ? "Connecting to Google"
      : "Google OAuth is not ready";
  const statusText =
    isGoogleOAuthConfigured && !hasOAuthError
      ? "Please choose your Google account to continue with MediaHire."
      : "Add your Google credentials to open the real Gmail account selection screen.";

  return (
    <main className="grid min-h-screen place-items-center bg-[#f5f7fb] px-4 py-10 text-slate-950">
      <motion.section
        className="w-full max-w-md rounded-[2rem] border border-[#0B63E5]/15 bg-white p-8 text-center shadow-[0_24px_80px_rgba(11,99,229,0.14)] sm:p-10"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <AuthLogo />

        <motion.div
          className="mx-auto mt-8 grid h-20 w-20 place-items-center rounded-3xl bg-[#f7faff] shadow-inner"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <GoogleIcon />
        </motion.div>

        <h1 className="mt-8 text-3xl font-black tracking-tight text-slate-900">
          {statusTitle}
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-slate-500">
          {statusText}
        </p>

        {isGoogleOAuthConfigured && !hasOAuthError ? (
          <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl bg-[#eef4ff] px-5 py-4 text-sm font-bold text-[#0B63E5]">
            <Loader2 className="animate-spin" size={18} />
            Opening secure Google OAuth
          </div>
        ) : (
          <div className="mt-8 rounded-2xl bg-red-50 px-5 py-4 text-left text-sm font-bold leading-6 text-red-700">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 shrink-0" size={18} />
              <span>
                Set `NEXT_PUBLIC_SUPABASE_URL` and
                `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`, then
                restart the dev server.
              </span>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
          <ShieldCheck size={15} />
          MediaHire never sees or stores your Google password.
        </div>

        <Link
          className="mt-7 inline-flex text-sm font-black text-[#0B63E5] underline-offset-4 transition hover:underline"
          href={role === "employer" ? "/signup/employer" : "/signup/jobseeker"}
        >
          Cancel and go back
        </Link>
      </motion.section>
    </main>
  );
}
