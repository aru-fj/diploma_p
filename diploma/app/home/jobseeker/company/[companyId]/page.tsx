import { notFound } from "next/navigation";

import { getMediaHireCompany } from "@/components/mediahire/jobs-data";
import { CompanyPage } from "@/components/mediahire/jobseeker-jobs/company-page";

export default async function CompanyRoutePage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const company = getMediaHireCompany(companyId);

  if (!company) {
    notFound();
  }

  return <CompanyPage company={company} />;
}
