import { LockedAccessPage } from "@/components/mediahire/guest/locked-access-page";

export default function GuestCommunityPage() {
  return (
    <LockedAccessPage
      message="Community is available after registration or login."
      title="Community is locked"
    />
  );
}
