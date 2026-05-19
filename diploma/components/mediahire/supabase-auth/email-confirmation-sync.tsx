"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { supabase } from "@/lib/supabase-client";
import {
  upsertProfile,
  type MediaHireProvider,
  type MediaHireRole,
} from "./auth-service";
import { getNextAuthSession } from "./nextauth-session";

type PendingEmailSignup = {
  email: string;
  password: string;
  role: MediaHireRole;
};

function roleFromQuery(role: string | null): MediaHireRole {
  return role === "employer" ? "employer" : "jobseeker";
}

function providerFromQuery(provider: string | null): MediaHireProvider {
  return provider === "google" ? "google" : "email";
}

function defaultDestination(role: MediaHireRole) {
  return role === "jobseeker"
    ? "/signup/jobseeker/location"
    : "/signup/employer/company-details";
}

function getCodeFromInputs() {
  const inputs = Array.from(document.querySelectorAll<HTMLInputElement>("input"));
  const digits = inputs
    .map((input) => input.value.trim())
    .join("")
    .replace(/\D/g, "");

  return digits.slice(0, 6);
}

function getPendingEmailSignup() {
  const raw = window.sessionStorage.getItem("mediahire.pendingEmailSignup");

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as PendingEmailSignup;
  } catch {
    return null;
  }
}

async function postJson(path: string, payload: Record<string, unknown>) {
  const response = await fetch(path, {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const result = (await response.json()) as { error?: string };

  if (!response.ok) {
    throw new Error(result.error || "Request failed");
  }

  return result;
}

export function EmailConfirmationSync({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const role = roleFromQuery(searchParams.get("role"));
    const provider = providerFromQuery(searchParams.get("provider"));
    const nextPath = searchParams.get("next") || defaultDestination(role);
    const queryEmail = searchParams.get("email") || "";
    let isSubmitting = false;

    async function getVerificationIdentity() {
      const pending = getPendingEmailSignup();
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      const nextAuthSession = user ? null : await getNextAuthSession();
      const nextAuthUser = nextAuthSession?.user;
      const email = user?.email || nextAuthUser?.email || queryEmail || pending?.email || "";

      return { email, nextAuthUser, pending, user };
    }

    async function sendCode(path = "/api/auth/send-verification-code") {
      const { email, nextAuthUser, user } = await getVerificationIdentity();

      if (!email) {
        throw new Error("Email is missing. Please start registration again.");
      }

      await postJson(path, {
        email,
        provider,
        role,
        userId: user?.id || nextAuthUser?.supabaseUserId,
      });
    }

    async function autoSendGoogleCode() {
      if (provider !== "google") {
        return;
      }

      const { email } = await getVerificationIdentity();

      if (!email) {
        return;
      }

      const sentKey = `mediahire.googleVerificationSent.${email}`;

      if (window.sessionStorage.getItem(sentKey)) {
        return;
      }

      await sendCode();
      window.sessionStorage.setItem(sentKey, "true");
    }

    async function verifyCode(event: Event, control?: HTMLElement | null) {
      event.preventDefault();

      if (isSubmitting) {
        return;
      }

      const code = getCodeFromInputs();

      if (code.length !== 6) {
        window.alert("Please enter the 6-digit verification code.");
        return;
      }

      isSubmitting = true;
      control?.setAttribute("aria-busy", "true");

      try {
        const { email, nextAuthUser, pending, user } = await getVerificationIdentity();

        if (!email) {
          throw new Error("Email is missing. Please start registration again.");
        }

        await postJson("/api/auth/verify-code", { code, email });

        if (pending?.email === email && pending.password) {
          const { error } = await supabase.auth.signInWithPassword({
            email: pending.email,
            password: pending.password,
          });

          if (error) {
            throw error;
          }

          window.sessionStorage.removeItem("mediahire.pendingEmailSignup");
        }

        const { data } = await supabase.auth.getUser();
        const verifiedUser = data.user || user;

        if (verifiedUser) {
          await upsertProfile({
            email: verifiedUser.email || email,
            firstName: verifiedUser.user_metadata?.first_name,
            lastName: verifiedUser.user_metadata?.last_name,
            provider,
            role,
            userId: verifiedUser.id,
          });
        } else if (nextAuthUser?.supabaseUserId) {
          await upsertProfile({
            email,
            provider,
            role,
            userId: nextAuthUser.supabaseUserId,
          });
        }

        router.replace(nextPath);
      } catch (error) {
        window.alert(error instanceof Error ? error.message : "Invalid verification code");
      } finally {
        isSubmitting = false;
        control?.removeAttribute("aria-busy");
      }
    }

    async function resendCode(event: Event, control?: HTMLElement | null) {
      event.preventDefault();

      if (isSubmitting) {
        return;
      }

      isSubmitting = true;
      control?.setAttribute("aria-busy", "true");

      try {
        await sendCode("/api/auth/send-verification-code");
        window.alert("A new verification code has been sent.");
      } catch (error) {
        window.alert(error instanceof Error ? error.message : "Could not resend code");
      } finally {
        isSubmitting = false;
        control?.removeAttribute("aria-busy");
      }
    }

    function handleClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const control = target.closest<HTMLElement>("button, a");
      const label = control?.textContent?.trim().toLowerCase() || "";

      if (label === "verify") {
        void verifyCode(event, control);
        return;
      }

      if (label.includes("resend")) {
        void resendCode(event, control);
      }
    }

    function handleSubmit(event: SubmitEvent) {
      void verifyCode(event, event.submitter as HTMLElement | null);
    }

    void autoSendGoogleCode().catch((error) => {
      window.alert(error instanceof Error ? error.message : "Could not send code");
    });

    document.addEventListener("click", handleClick, true);
    document.addEventListener("submit", handleSubmit, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("submit", handleSubmit, true);
    };
  }, [router]);

  return <>{children}</>;
}
