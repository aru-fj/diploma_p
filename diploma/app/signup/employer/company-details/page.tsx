import type { Metadata } from "next";
import { EmployerCompanyDetailsPage } from "@/components/mediahire/auth/employer-company-details-page";

export const metadata: Metadata = {
  title: "Employer Company Details | MediaHire",
  description:
    "Complete your MediaHire employer profile with company details and logo.",
};

export default function EmployerCompanyDetailsRoute() {
  return <EmployerCompanyDetailsPage />;
}
