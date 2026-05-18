import type { Metadata } from "next";
import { JobSeekerLoginPage } from "@/components/mediahire/auth/jobseeker-login-page";

export const metadata: Metadata = {
  title: "Job Seeker Login | MediaHire",
  description:
    "Sign in to your MediaHire job seeker account to explore jobs, build your network, and showcase your media portfolio.",
};

export default function LoginJobSeekerPage() {
  return <JobSeekerLoginPage />;
}
