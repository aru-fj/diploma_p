import type { ReactNode } from "react";

import { JobSeekerDashboardRouteSwitcher } from "@/components/mediahire/jobseeker-dashboard/jobseeker-dashboard-route-switcher";
import { FullAuthorizationGuard } from "@/components/mediahire/supabase-auth/full-authorization-guard";

export default function JobSeekerSearchJobLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <FullAuthorizationGuard role="jobseeker">
      <JobSeekerDashboardRouteSwitcher>{children}</JobSeekerDashboardRouteSwitcher>
    </FullAuthorizationGuard>
  );
}
