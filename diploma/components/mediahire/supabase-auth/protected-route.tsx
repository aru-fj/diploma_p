"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { supabase } from "@/lib/supabase-client";

export function ProtectedRoute({
  children,
  redirectTo,
}: {
  children: ReactNode;
  redirectTo: string;
}) {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (!data.session) {
        window.location.replace(`${redirectTo}?next=${encodeURIComponent(pathname)}`);
        return;
      }

      setIsReady(true);
    }

    void checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        window.location.replace(`${redirectTo}?next=${encodeURIComponent(pathname)}`);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [pathname, redirectTo]);

  if (!isReady) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f5f7fb] px-4">
        <div className="rounded-3xl bg-white px-8 py-6 text-center text-sm font-black text-slate-600 shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
          Checking your MediaHire session...
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
