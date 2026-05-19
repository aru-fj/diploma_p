"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { supabase } from "@/lib/supabase-client";
import type { MediaHireRole } from "./auth-service";
import { getNextAuthSession } from "./nextauth-session";

function onboardingPath(role: MediaHireRole) {
  return role === "jobseeker"
    ? "/signup/jobseeker/location"
    : "/signup/employer/company-details";
}

function loginPath(role: MediaHireRole) {
  return role === "jobseeker" ? "/login/jobseeker" : "/login/employer";
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
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;
      const nextAuthSession = user ? null : await getNextAuthSession();
      const nextAuthUser = nextAuthSession?.user;

      if (!user && !nextAuthUser) {
        window.location.replace(
          `${loginPath(role)}?next=${encodeURIComponent(pathname)}`,
        );
        return;
      }

      const profileSelector =
        "email,is_verified,onboarding_completed,onboarding_skipped";
      const { data: profileRows } =
        user?.id || nextAuthUser?.supabaseUserId
          ? await supabase
              .from("profiles")
              .select(profileSelector)
              .eq("user_id", user?.id || nextAuthUser?.supabaseUserId || "")
              .limit(1)
          : await supabase
              .from("profiles")
              .select(profileSelector)
              .eq("email", nextAuthUser?.email || "")
              .limit(1);
      const profile = profileRows?.[0];

      if (!profile?.is_verified) {
        window.location.replace(
          `/verify-email?role=${role}&email=${encodeURIComponent(
            user?.email || nextAuthUser?.email || profile?.email || "",
          )}&next=${encodeURIComponent(onboardingPath(role))}`,
        );
        return;
      }

      if (!profile.onboarding_completed && !profile.onboarding_skipped) {
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
