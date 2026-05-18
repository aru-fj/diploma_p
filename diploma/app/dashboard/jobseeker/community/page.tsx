import type { Metadata } from "next";
import { CommunityPage } from "@/components/mediahire/community/community-page";

export const metadata: Metadata = {
  title: "Community | MediaHire",
  description:
    "Message employers, recruiters, clients, and creative collaborators on MediaHire.",
};

export default function JobSeekerCommunityRoute() {
  return <CommunityPage />;
}
