import type { Metadata } from "next";

import { JobSeekerResumePage } from "@/components/mediahire/account-resume/jobseeker-resume-page";

export const metadata: Metadata = {
  title: "My Resume | MediaHire",
  description:
    "Manage your MediaHire resume, portfolio, and professional information.",
};

export default function JobSeekerResumeRoute() {
  return <JobSeekerResumePage />;
}
