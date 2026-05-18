import type { ReactNode } from "react";

import { SupabaseAuthBridge } from "@/components/mediahire/supabase-auth/supabase-auth-bridge";

export default function EmployerSignUpLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SupabaseAuthBridge mode="signup" role="employer">
      {children}
    </SupabaseAuthBridge>
  );
}
