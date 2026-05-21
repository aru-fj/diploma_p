import { ProjectDetailPage } from "@/components/mediahire/profile-projects/project-detail-page";

export default async function ProjectWorkRoutePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProjectDetailPage projectId={id} />;
}
