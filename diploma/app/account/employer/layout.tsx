import type { ReactNode } from "react";

import { FullAuthorizationGuard } from "@/components/mediahire/supabase-auth/full-authorization-guard";
import { ProtectedRoute } from "@/components/mediahire/supabase-auth/protected-route";

export default function EmployerAccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedRoute redirectTo="/login/employer">
      <FullAuthorizationGuard role="employer">{children}</FullAuthorizationGuard>
    </ProtectedRoute>
  );
}
