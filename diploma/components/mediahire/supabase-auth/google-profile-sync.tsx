"use client";

import { useEffect, type ReactNode } from "react";

import { supabase } from "@/lib/supabase-client";
import { upsertProfile, type MediaHireRole } from "./auth-service";

export function GoogleProfileSync({
  children,
  role,
}: {
  children: ReactNode;
  role: MediaHireRole;
}) {
  useEffect(() => {
    async function syncProfile() {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        return;
      }

      const fullName =
        user.user_metadata?.full_name || user.user_metadata?.name || "";
      const [firstName = "", ...rest] = fullName.trim().split(/\s+/);

      await upsertProfile({
        avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture,
        email: user.email || "",
        firstName: user.user_metadata?.first_name || firstName,
        lastName: user.user_metadata?.last_name || rest.join(" "),
        provider: "google",
        role,
        userId: user.id,
      });
    }

    void syncProfile();
  }, [role]);

  return <>{children}</>;
}
