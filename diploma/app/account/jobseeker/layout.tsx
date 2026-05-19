import type { ReactNode } from "react";

import { JobSeekerDashboardRouteSwitcher } from "@/components/mediahire/jobseeker-dashboard/jobseeker-dashboard-route-switcher";
import { FullAuthorizationGuard } from "@/components/mediahire/supabase-auth/full-authorization-guard";
import { ProtectedRoute } from "@/components/mediahire/supabase-auth/protected-route";

export default function JobSeekerAccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedRoute redirectTo="/login/jobseeker">
      <FullAuthorizationGuard role="jobseeker">
        <JobSeekerDashboardRouteSwitcher>{children}</JobSeekerDashboardRouteSwitcher>
      </FullAuthorizationGuard>
    </ProtectedRoute>
  );
}
