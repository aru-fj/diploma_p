"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { supabase } from "@/lib/supabase-client";
import {
  getEmployerProfile,
  saveEmployerProfile,
} from "@/components/mediahire/employer/employer-store";
import type { MediaHireRole } from "./auth-service";
import { getNextAuthSession } from "./nextauth-session";

type CompletionMode = "none" | "complete";

function homePath(role: MediaHireRole) {
  return role === "jobseeker" ? "/home/jobseeker" : "/home/employer";
}

async function updateOnboardingState(
  updates: {
    onboarding_completed?: boolean;
    onboarding_skipped?: boolean;
  },
) {
  const { data } = await supabase.auth.getUser();
  const nextAuthSession = data.user ? null : await getNextAuthSession();
  const userId = data.user?.id || nextAuthSession?.user?.supabaseUserId;

  if (!userId) {
    throw new Error("Please sign in before continuing registration.");
  }

  if (!data.user && nextAuthSession?.user?.supabaseUserId) {
    const response = await fetch("/api/auth/onboarding-state", {
      body: JSON.stringify(updates),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const result = (await response.json()) as { error?: string };

    if (!response.ok) {
      throw new Error(result.error || "Could not update onboarding state.");
    }

    return;
  }

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("user_id", userId);

  if (error) {
    console.error("Update onboarding profile error:", error);
    throw new Error("Could not update onboarding state.");
  }
}

function collectEmployerCompanyDetails() {
  const inputs = Array.from(document.querySelectorAll<HTMLInputElement>("input"));
  const textareas = Array.from(document.querySelectorAll<HTMLTextAreaElement>("textarea"));

  function inputByNeedles(needles: string[]) {
    return (
      inputs.find((input) => {
        const haystack = [
          input.name,
          input.id,
          input.placeholder,
          input.getAttribute("aria-label"),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return needles.some((needle) => haystack.includes(needle));
      })?.value.trim() || ""
    );
  }

  return {
    companyDescription: textareas[0]?.value.trim() || "",
    companyField: inputByNeedles(["company field", "field", "industry"]),
    companyName: inputByNeedles(["company name", "company"]),
  };
}

async function upsertEmployerCompanyDetails() {
  const { data } = await supabase.auth.getUser();
  const nextAuthSession = data.user ? null : await getNextAuthSession();
  const userId = data.user?.id || nextAuthSession?.user?.supabaseUserId;

  if (!userId) {
    throw new Error("Please sign in before saving company information.");
  }

  const details = collectEmployerCompanyDetails();
  const currentProfile = getEmployerProfile();

  saveEmployerProfile({
    ...currentProfile,
    companyDescription:
      details.companyDescription || currentProfile.companyDescription,
    companyField: details.companyField || currentProfile.companyField,
    companyName: details.companyName || currentProfile.companyName,
  });

  if (!data.user && nextAuthSession?.user?.supabaseUserId) {
    const response = await fetch("/api/employer/profile", {
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const result = (await response.json()) as { error?: string };

    if (!response.ok) {
      throw new Error(result.error || "Could not save company information.");
    }

    return;
  }

  const { error } = await supabase.from("employer_profiles").upsert(
    {
      company_description: details.companyDescription || null,
      company_field: details.companyField || null,
      company_name: details.companyName || "Employer Company",
      user_id: userId,
    },
    { onConflict: "user_id" },
  );

  if (error) {
    throw error;
  }
}

export function OnboardingFlowBridge({
  children,
  completionMode = "none",
  role,
}: {
  children: ReactNode;
  completionMode?: CompletionMode;
  role: MediaHireRole;
}) {
  const router = useRouter();

  useEffect(() => {
    const blockMessage = window.sessionStorage.getItem(
      "mediahire.registrationBlockMessage",
    );

    if (blockMessage) {
      window.sessionStorage.removeItem("mediahire.registrationBlockMessage");
      window.alert(blockMessage);
    }

    let isSubmitting = false;

    async function markSkipped(event: Event, control: HTMLElement) {
      event.preventDefault();

      if (isSubmitting) {
        return;
      }

      isSubmitting = true;
      control.setAttribute("aria-busy", "true");

      try {
        await updateOnboardingState({
          onboarding_completed: false,
          onboarding_skipped: true,
        });
        router.push(homePath(role));
      } catch (error) {
        window.alert(
          error instanceof Error
            ? error.message
            : "Could not skip registration step.",
        );
      } finally {
        isSubmitting = false;
        control.removeAttribute("aria-busy");
      }
    }

    async function markCompleted(event: Event, control: HTMLElement) {
      if (completionMode !== "complete") {
        return;
      }

      event.preventDefault();

      if (isSubmitting) {
        return;
      }

      isSubmitting = true;
      control.setAttribute("aria-busy", "true");

      try {
        if (role === "employer") {
          await upsertEmployerCompanyDetails();
        }

        await updateOnboardingState({
          onboarding_completed: true,
          onboarding_skipped: false,
        });
        router.push(homePath(role));
      } catch (error) {
        console.error("Finish registration error:", error);
      
        window.alert(
          error instanceof Error
            ? error.message
            : JSON.stringify(error, null, 2),
        );
      } finally {
        isSubmitting = false;
        control.removeAttribute("aria-busy");
      }
    }

    function handleClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const control = target.closest<HTMLElement>("button, a");
      const label = control?.textContent?.trim().toLowerCase() || "";

      if (!control) {
        return;
      }

      if (label === "skip" && completionMode === "complete") {
        void markSkipped(event, control);
        return;
      }

      if (
        label === "finish up" ||
        label === "finish" ||
        (completionMode === "complete" && (label === "sign up" || label === "signup"))
      ) {
        void markCompleted(event, control);
      }
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [completionMode, role, router]);

  return <>{children}</>;
}
