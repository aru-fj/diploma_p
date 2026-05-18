import type { ReactNode } from "react";

import { SupabaseAuthBridge } from "@/components/mediahire/supabase-auth/supabase-auth-bridge";

export default function EmployerLoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SupabaseAuthBridge mode="login" role="employer">
      {children}
    </SupabaseAuthBridge>
  );
}
