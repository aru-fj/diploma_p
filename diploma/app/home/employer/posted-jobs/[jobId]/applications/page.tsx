import { EmployerApplicationsPage } from "@/components/mediahire/employer/employer-pages";

export default async function Page({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  return <EmployerApplicationsPage jobId={jobId} />;
}
