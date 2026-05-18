import type { Metadata } from "next";
import { EmployerLoginPage } from "@/components/mediahire/auth/employer-login-page";

export const metadata: Metadata = {
  title: "Employer Login | MediaHire",
  description:
    "Sign in to MediaHire as an employer to find media professionals and build your creative team.",
};

export default function LoginEmployerPage() {
  return <EmployerLoginPage />;
}
