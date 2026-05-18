import type { ReactNode } from "react";

import { ProtectedRoute } from "@/components/mediahire/supabase-auth/protected-route";

export default function EmployerAccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <ProtectedRoute redirectTo="/login/employer">{children}</ProtectedRoute>;
}
