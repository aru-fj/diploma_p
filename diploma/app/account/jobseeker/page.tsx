import type { Metadata } from "next";

import { JobSeekerActivityDashboardPage } from "@/components/mediahire/jobseeker-dashboard/jobseeker-dashboard-page";

export const metadata: Metadata = {
  title: "Account | MediaHire",
  description:
    "Manage your MediaHire activity, saved jobs, applications, messages, and account tools.",
};

export default function JobSeekerAccountPage() {
  return <JobSeekerActivityDashboardPage />;
}