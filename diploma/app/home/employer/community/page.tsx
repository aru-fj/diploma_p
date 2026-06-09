import { EmployerCommunityPage } from "@/components/mediahire/employer/employer-pages";

type EmployerCommunityRouteProps = {
  searchParams?: Promise<{
    chat?: string;
  }>;
};

export default async function Page({
  searchParams,
}: EmployerCommunityRouteProps) {
  const resolvedSearchParams = await searchParams;
  const initialChatId = resolvedSearchParams?.chat || null;

  return (
    <EmployerCommunityPage
      initialChatId={initialChatId}
      key={initialChatId || "employer-community"}
    />
  );
}
