import type { Metadata } from "next";
import { Suspense } from "react";
import { VerifyEmailPage } from "@/components/mediahire/auth/verification/verify-email-page";

export const metadata: Metadata = {
  title: "Verify Email | MediaHire",
  description: "Verify your MediaHire account email address.",
};

export default function VerifyEmailRoute() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailPage />
    </Suspense>
  );
}
