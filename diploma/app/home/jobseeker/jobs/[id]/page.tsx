import { notFound } from "next/navigation";

import { getMediaHireJob } from "@/components/mediahire/jobs-data";
import { JobDetailPage } from "@/components/mediahire/jobseeker-jobs/job-detail-page";

export default async function JobDetailRoutePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = getMediaHireJob(id);

  if (!job) {
    notFound();
  }

  return <JobDetailPage job={job} />;
}
