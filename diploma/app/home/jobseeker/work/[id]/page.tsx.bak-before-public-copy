import { ProjectDetailPage } from "@/components/mediahire/profile-projects/project-detail-page";

type WorkPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function WorkPage({ params }: WorkPageProps) {
  const { id } = await params;

  return <ProjectDetailPage projectId={id} />;
}
