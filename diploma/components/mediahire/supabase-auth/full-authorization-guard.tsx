"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { supabase } from "@/lib/supabase-client";
import type { MediaHireRole } from "./auth-service";
import { getNextAuthSession } from "./nextauth-session";
import {
  jobSeekerProfileStorageKey,
  setActiveJobSeekerEmail,
} from "../account-settings/profile-store";

type AuthorizationProfile = {
  email?: string | null;
  is_verified?: boolean | null;
  onboarding_completed?: boolean | null;
  onboarding_skipped?: boolean | null;
  role?: unknown;
};

function onboardingPath(role: MediaHireRole) {
  return role === "jobseeker"
    ? "/signup/jobseeker/location"
    : "/signup/employer/company-details";
}

function loginPath(role: MediaHireRole) {
  return role === "jobseeker" ? "/login/jobseeker" : "/login/employer";
}

function homePath(role: MediaHireRole) {
  return role === "jobseeker" ? "/home/jobseeker" : "/home/employer";
}

function isMediaHireRole(value: unknown): value is MediaHireRole {
  return value === "jobseeker" || value === "employer";
}

async function getAuthoritativeRole(accessToken?: string) {
  if (!accessToken) {
    return null;
  }

  try {
    const response = await fetch("/api/auth/google-role", {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const result = (await response.json()) as { role?: unknown };

    return isMediaHireRole(result.role) ? result.role : null;
  } catch {
    return null;
  }
}

function withTimeout<T>(
  promise: PromiseLike<T>,
  milliseconds: number,
  fallback: T,
) {
  return new Promise<T>((resolve) => {
    const timeoutId = window.setTimeout(() => resolve(fallback), milliseconds);

    Promise.resolve(promise)
      .then((value) => resolve(value))
      .catch(() => resolve(fallback))
      .finally(() => window.clearTimeout(timeoutId));
  });
}

function hasLocalJobSeekerAccess(role: MediaHireRole) {
  if (role !== "jobseeker" || typeof window === "undefined") {
    return false;
  }

  if (window.sessionStorage.getItem("mediahire.jobseeker.accountAccess") === "true") {
    return true;
  }

  try {
    const rawProfile = window.localStorage.getItem(jobSeekerProfileStorageKey);
    const profile = rawProfile ? JSON.parse(rawProfile) : null;

    return Boolean(
      profile?.email ||
        profile?.fullName ||
        profile?.firstName ||
        profile?.lastName,
    );
  } catch {
    return false;
  }
}

function canOpenWithoutBlocking(role: MediaHireRole, pathname: string) {
  return role === "jobseeker" && pathname === "/home/jobseeker";
}

export function FullAuthorizationGuard({
  children,
  role,
}: {
  children: ReactNode;
  role: MediaHireRole;
}) {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkAuthorization() {
      if (canOpenWithoutBlocking(role, pathname)) {
        if (isMounted) {
          setIsReady(true);
        }
        return;
      }

      const hasLocalAccess = hasLocalJobSeekerAccess(role);
      const sessionResult = await withTimeout(
        supabase.auth.getSession(),
        1800,
        null,
      );
      const sessionData = sessionResult?.data;
      const user = sessionData?.session?.user;
      const nextAuthSession = user
        ? null
        : await withTimeout(getNextAuthSession(), 1800, null);
      const nextAuthUser = nextAuthSession?.user;
      const currentEmail = user?.email || nextAuthUser?.email || "";

      if (currentEmail) {
        setActiveJobSeekerEmail(currentEmail);
      }

      if (!user && !nextAuthUser) {
        if (hasLocalAccess) {
          if (isMounted) {
            setIsReady(true);
          }
          return;
        }

        window.location.replace(
          `${loginPath(role)}?next=${encodeURIComponent(pathname)}`,
        );
        return;
      }

      const profileSelector =
        "email,is_verified,onboarding_completed,onboarding_skipped,role";
      const profileQuery =
        user?.id || nextAuthUser?.supabaseUserId
          ? supabase
              .from("profiles")
              .select(profileSelector)
              .eq("user_id", user?.id || nextAuthUser?.supabaseUserId || "")
              .limit(1)
          : supabase
              .from("profiles")
              .select(profileSelector)
              .eq("email", nextAuthUser?.email || "")
              .limit(1);
      const [authoritativeRole, profileResult] = await Promise.all([
        withTimeout(
          getAuthoritativeRole(sessionData?.session?.access_token),
          1800,
          null,
        ),
        withTimeout(
          Promise.resolve(profileQuery).then(({ data }) => ({
            data: data as AuthorizationProfile[] | null,
          })),
          2200,
          { data: null },
        ),
      ]);
      const profileRows = profileResult.data;
      const profile = profileRows?.[0];
      const actualRole =
        authoritativeRole || (isMediaHireRole(profile?.role) ? profile.role : null);

      if (actualRole && actualRole !== role) {
        window.location.replace(homePath(actualRole));
        return;
      }

      if (profile && !profile.is_verified) {
        window.location.replace(
          `/verify-email?role=${role}&email=${encodeURIComponent(
            user?.email || nextAuthUser?.email || profile?.email || "",
          )}&next=${encodeURIComponent(onboardingPath(role))}`,
        );
        return;
      }

      if (
        profile &&
        !profile.onboarding_completed &&
        !profile.onboarding_skipped
      ) {
        window.sessionStorage.setItem(
          "mediahire.registrationBlockMessage",
          "Please complete your registration before applying for jobs.",
        );
        window.location.replace(onboardingPath(role));
        return;
      }

      if (isMounted) {
        setIsReady(true);
      }
    }

    void checkAuthorization();

    return () => {
      isMounted = false;
    };
  }, [pathname, role]);

  if (!isReady) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f5f7fb] px-4">
        <div className="rounded-3xl bg-white px-8 py-6 text-center text-sm font-black text-slate-600 shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
          Checking your MediaHire registration...
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
