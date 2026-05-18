import type { Metadata } from "next";
import { JobSeekerSignupPage } from "@/components/mediahire/auth/jobseeker-signup-page";

export const metadata: Metadata = {
  title: "Job Seeker Sign Up | MediaHire",
  description:
    "Create your MediaHire job seeker account and start building a creative media portfolio.",
};

export default function SignupJobSeekerPage() {
  return <JobSeekerSignupPage />;
}
