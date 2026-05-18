"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { supabase } from "@/lib/supabase-client";
import { upsertProfile, type MediaHireRole } from "./auth-service";

function roleFromQuery(role: string | null): MediaHireRole {
  return role === "employer" ? "employer" : "jobseeker";
}

function destinationForRole(role: MediaHireRole) {
  return role === "jobseeker" ? "/home/jobseeker" : "/account/employer";
}

export function EmailConfirmationSync({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const role = roleFromQuery(searchParams.get("role"));
    const email = searchParams.get("email") || "";

    async function handleSession() {
      const { data } = await supabase.auth.getSession();

      if (!data.session?.user) {
        return;
      }

      const user = data.session.user;

      await upsertProfile({
        email: user.email || email,
        firstName: user.user_metadata?.first_name,
        lastName: user.user_metadata?.last_name,
        provider:
          user.app_metadata?.provider === "google" ? "google" : "email",
        role,
        userId: user.id,
      });

      router.replace(destinationForRole(role));
    }

    void handleSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        void handleSession();
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return <>{children}</>;
}
