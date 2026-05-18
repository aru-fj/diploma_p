import type { Metadata } from "next";
import { EmployerSignupPage as EmployerSignupView } from "@/components/mediahire/auth/employer-signup-page";

export const metadata: Metadata = {
  title: "Employer Sign Up | MediaHire",
};

export default function EmployerSignupPage() {
  return <EmployerSignupView />;
}
