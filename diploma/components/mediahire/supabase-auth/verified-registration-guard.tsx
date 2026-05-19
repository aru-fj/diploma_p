"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { supabase } from "@/lib/supabase-client";
import type { MediaHireRole } from "./auth-service";

export function VerifiedRegistrationGuard({
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

    async function checkVerification() {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) {
        window.location.replace(`/verify-email?role=${role}&next=${encodeURIComponent(pathname)}`);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_verified,email")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!profile?.is_verified) {
        window.location.replace(
          `/verify-email?role=${role}&email=${encodeURIComponent(
            user.email || profile?.email || "",
          )}&next=${encodeURIComponent(pathname)}`,
        );
        return;
      }

      if (isMounted) {
        setIsReady(true);
      }
    }

    void checkVerification();

    return () => {
      isMounted = false;
    };
  }, [pathname, role]);

  if (!isReady) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f5f7fb] px-4">
        <div className="rounded-3xl bg-white px-8 py-6 text-center text-sm font-black text-slate-600 shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
          Checking your MediaHire verification...
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
