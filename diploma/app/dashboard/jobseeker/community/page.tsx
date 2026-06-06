import type { Metadata } from "next";
import { CommunityPage } from "@/components/mediahire/community/community-page";

export const metadata: Metadata = {
  title: "Community | MediaHire",
  description:
    "Message employers, recruiters, clients, and creative collaborators on MediaHire.",
};

type JobSeekerCommunityRouteProps = {
  searchParams?: Promise<{
    chat?: string;
  }>;
};

export default async function JobSeekerCommunityRoute({
  searchParams,
}: JobSeekerCommunityRouteProps) {
  const resolvedSearchParams = await searchParams;
  const initialChatId = resolvedSearchParams?.chat || null;

  return (
    <CommunityPage
      initialChatId={initialChatId}
      key={initialChatId || "community-inbox"}
    />
  );
}
