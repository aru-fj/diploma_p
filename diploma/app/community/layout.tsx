import type { ReactNode } from "react";
import { JobSeekerDashboardRouteSwitcher } from "@/components/mediahire/jobseeker-dashboard/jobseeker-dashboard-route-switcher";

export default function JobSeekerCommunityLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <JobSeekerDashboardRouteSwitcher>{children}</JobSeekerDashboardRouteSwitcher>;
}
