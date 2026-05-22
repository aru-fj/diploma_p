import type { Metadata } from "next";
import { Suspense } from "react";

import { GoogleAuthCallbackClient } from "@/components/mediahire/auth/oauth/google-auth-callback-client";

export const metadata: Metadata = {
  title: "Google callback | MediaHire",
  description: "Completing Google authentication for MediaHire.",
};

export default function GoogleAuthCallbackPage() {
  return (
    <Suspense fallback={null}>
      <GoogleAuthCallbackClient />
    </Suspense>
  );
}
