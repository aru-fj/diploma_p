import type { ReactNode } from "react";

import { SupabaseAuthBridge } from "@/components/mediahire/supabase-auth/supabase-auth-bridge";

export default function JobSeekerSignUpLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SupabaseAuthBridge mode="signup" role="jobseeker">
      {children}
    </SupabaseAuthBridge>
  );
}
