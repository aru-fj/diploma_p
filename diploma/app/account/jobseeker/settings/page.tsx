import type { Metadata } from "next";

import { JobSeekerAccountSettingsPage } from "@/components/mediahire/account-settings/jobseeker-account-settings-page";

export const metadata: Metadata = {
  title: "Account Setting | MediaHire",
  description: "Update your MediaHire job seeker profile and account settings.",
};

export default function JobSeekerAccountSettingsRoute() {
  return <JobSeekerAccountSettingsPage />;
}
