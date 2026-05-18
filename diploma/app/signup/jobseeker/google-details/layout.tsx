import type { ReactNode } from "react";

import { GoogleProfileSync } from "@/components/mediahire/supabase-auth/google-profile-sync";

export default function JobSeekerGoogleDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <GoogleProfileSync role="jobseeker">{children}</GoogleProfileSync>;
}
