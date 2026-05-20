import { SpecialistProfilePage } from "@/components/mediahire/jobseeker-dashboard/jobseeker-dashboard-route-switcher";

export default async function SpecialistProfileProxyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <SpecialistProfilePage profileId={id} />;
}
