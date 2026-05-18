import type { ReactNode } from "react";

import { GoogleProfileSync } from "@/components/mediahire/supabase-auth/google-profile-sync";

export default function EmployerGoogleDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <GoogleProfileSync role="employer">{children}</GoogleProfileSync>;
}
