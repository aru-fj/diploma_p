import { LockedAccessPage } from "@/components/mediahire/guest/locked-access-page";
import type { PublicRole } from "@/components/mediahire/header";

type GuestMyProfilePageProps = {
  searchParams?: Promise<{
    role?: string;
  }>;
};

function resolveRole(role?: string): PublicRole {
  return role === "employer" ? "employer" : "jobseeker";
}

export default async function GuestMyProfilePage({
  searchParams,
}: GuestMyProfilePageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <LockedAccessPage
      message="Sign in or create an account to access this feature."
      role={resolveRole(resolvedSearchParams?.role)}
      title="My Profile is locked"
    />
  );
}
