import type { Metadata } from "next";
import { JobSeekerResumePage } from "@/components/mediahire/auth/jobseeker-resume-page";

export const metadata: Metadata = {
  title: "Resume Upload | MediaHire",
  description:
    "Upload your resume to complete your MediaHire job seeker registration.",
};

export default function SignupJobSeekerResumePage() {
  return <JobSeekerResumePage />;
}
