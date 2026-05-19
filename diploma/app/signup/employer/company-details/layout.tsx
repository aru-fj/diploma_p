import type { ReactNode } from "react";

import { OnboardingFlowBridge } from "@/components/mediahire/supabase-auth/onboarding-flow-bridge";
import { VerifiedRegistrationGuard } from "@/components/mediahire/supabase-auth/verified-registration-guard";

export default function EmployerCompanyDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <VerifiedRegistrationGuard role="employer">
      <OnboardingFlowBridge completionMode="complete" role="employer">
        {children}
      </OnboardingFlowBridge>
    </VerifiedRegistrationGuard>
  );
}
