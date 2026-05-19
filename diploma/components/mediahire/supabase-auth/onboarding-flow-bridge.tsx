"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { supabase } from "@/lib/supabase-client";
import type { MediaHireRole } from "./auth-service";
import { getNextAuthSession } from "./nextauth-session";

type CompletionMode = "none" | "complete";

function homePath(role: MediaHireRole) {
  return role === "jobseeker" ? "/home/jobseeker" : "/account/employer";
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

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("user_id", userId);

  if (error) {
    console.error("Update onboarding profile error:", error);
    throw new Error("Could not update onboarding state.");
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

      if (label === "skip") {
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
