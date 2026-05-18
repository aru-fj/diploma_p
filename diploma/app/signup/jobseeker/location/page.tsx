import type { Metadata } from "next";
import { JobSeekerLocationPage } from "@/components/mediahire/auth/jobseeker-location-page";

export const metadata: Metadata = {
  title: "Location Information | MediaHire",
  description:
    "Add location information to match your MediaHire profile with nearby job offers.",
};

export default function SignupJobSeekerLocationPage() {
  return <JobSeekerLocationPage />;
}
