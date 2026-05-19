import type { ReactNode } from "react";
import { Suspense } from "react";

import { StableVerifyEmailPage } from "@/components/mediahire/auth/verification/stable-verify-email-page";
import { EmailConfirmationSync } from "@/components/mediahire/supabase-auth/email-confirmation-sync";

export default function VerifyEmailLayout({ children: _children }: { children: ReactNode }) {
  void _children;

  return (
    <Suspense fallback={<StableVerifyEmailPage />}>
      <EmailConfirmationSync>
        <StableVerifyEmailPage />
      </EmailConfirmationSync>
    </Suspense>
  );
}
