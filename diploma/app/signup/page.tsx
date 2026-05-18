import type { Metadata } from "next";
import { RoleSelectionPage } from "@/components/mediahire/onboarding/role-selection-page";

export const metadata: Metadata = {
  title: "Choose your role | MediaHire",
  description:
    "Select whether you want to create a job seeker or employer profile on MediaHire.",
};

export default function SignupPage() {
  return <RoleSelectionPage />;
}
