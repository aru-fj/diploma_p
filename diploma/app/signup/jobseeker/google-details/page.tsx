import type { Metadata } from "next";
import { JobSeekerGoogleDetailsPage } from "@/components/mediahire/auth/jobseeker-google-details-page";

export const metadata: Metadata = {
  title: "Google Sign Up Details | MediaHire",
  description:
    "Complete your MediaHire job seeker profile after signing up with Google.",
};

export default function SignupJobSeekerGoogleDetailsPage() {
  return <JobSeekerGoogleDetailsPage />;
}
