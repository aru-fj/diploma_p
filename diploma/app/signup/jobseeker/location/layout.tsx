import type { ReactNode } from "react";

import { OnboardingFlowBridge } from "@/components/mediahire/supabase-auth/onboarding-flow-bridge";
import { VerifiedRegistrationGuard } from "@/components/mediahire/supabase-auth/verified-registration-guard";

export default function JobSeekerLocationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <VerifiedRegistrationGuard role="jobseeker">
      <OnboardingFlowBridge role="jobseeker">{children}</OnboardingFlowBridge>
    </VerifiedRegistrationGuard>
  );
}
