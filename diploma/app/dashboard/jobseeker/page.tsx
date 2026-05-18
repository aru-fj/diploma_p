import type { Metadata } from "next";
import { JobSeekerAccountDashboardPage } from "@/components/mediahire/jobseeker-account-dashboard/jobseeker-account-dashboard-page";

export const metadata: Metadata = {
  title: "Dashboard | MediaHire",
  description:
    "View your MediaHire job seeker activity, saved jobs, applications, messages, and application history.",
};

export default function JobSeekerDashboardRoute() {
  return <JobSeekerAccountDashboardPage />;
}
