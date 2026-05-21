import { LockedAccessPage } from "@/components/mediahire/guest/locked-access-page";

export default function GuestMyProfilePage() {
  return (
    <LockedAccessPage
      message="This page is available after registration or login."
      title="My Profile is locked"
    />
  );
}
