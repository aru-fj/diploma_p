import type { Metadata } from "next";
import { JobSeekerSalaryPage } from "@/components/mediahire/auth/jobseeker-salary-page";

export const metadata: Metadata = {
  title: "Minimum Salary Information | MediaHire",
  description:
    "Add minimum salary preferences to match your MediaHire profile with relevant creative jobs.",
};

export default function SignupJobSeekerSalaryPage() {
  return <JobSeekerSalaryPage />;
}
