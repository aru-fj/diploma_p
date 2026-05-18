import type { Metadata } from "next";
import { Suspense } from "react";
import { GoogleOAuthRedirectPage } from "@/components/mediahire/auth/oauth/google-oauth-redirect-page";

export const metadata: Metadata = {
  title: "Connecting to Google | MediaHire",
  description:
    "Securely continue to Google OAuth account selection for MediaHire.",
};

export default function GoogleAuthPage() {
  const isGoogleOAuthConfigured = Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.NEXTAUTH_SECRET &&
      process.env.NEXTAUTH_URL,
  );

  return (
    <Suspense fallback={null}>
      <GoogleOAuthRedirectPage isGoogleOAuthConfigured={isGoogleOAuthConfigured} />
    </Suspense>
  );
}
