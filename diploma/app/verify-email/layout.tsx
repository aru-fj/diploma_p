import type { ReactNode } from "react";
import { Suspense } from "react";

import { EmailConfirmationSync } from "@/components/mediahire/supabase-auth/email-confirmation-sync";

export default function VerifyEmailLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={children}>
      <EmailConfirmationSync>{children}</EmailConfirmationSync>
    </Suspense>
  );
}
