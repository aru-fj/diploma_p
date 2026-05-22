import type { Metadata } from "next";

import { JobSeekerSettingsPage as JobSeekerSettingsView } from "@/components/mediahire/settings/jobseeker-settings-page";

export const metadata: Metadata = {
  title: "Settings | MediaHire",
  description: "Manage your MediaHire job seeker settings.",
};

export default function JobSeekerSettingsRoutePage() {
  return <JobSeekerSettingsView />;
}
