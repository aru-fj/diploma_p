import type { Metadata } from "next";
import { EmployerGoogleDetailsPage } from "@/components/mediahire/auth/employer-google-details-page";

export const metadata: Metadata = {
  title: "Employer Google Sign Up Details | MediaHire",
  description:
    "Complete your MediaHire employer account after signing up with Google.",
};

export default function SignupEmployerGoogleDetailsPage() {
  return <EmployerGoogleDetailsPage />;
}
