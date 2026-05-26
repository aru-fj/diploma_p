import { LockedAccessPage } from "@/components/mediahire/guest/locked-access-page";
import type { PublicRole } from "@/components/mediahire/header";

type GuestCommunityPageProps = {
  searchParams?: Promise<{
    role?: string;
  }>;
};

function resolveRole(role?: string): PublicRole {
  return role === "employer" ? "employer" : "jobseeker";
}

export default async function GuestCommunityPage({
  searchParams,
}: GuestCommunityPageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <LockedAccessPage
      message="Sign in or create an account to access this feature."
      role={resolveRole(resolvedSearchParams?.role)}
      title="Community is locked"
    />
  );
}
