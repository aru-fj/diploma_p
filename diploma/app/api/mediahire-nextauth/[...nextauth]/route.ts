import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

import {
  ensureGoogleSupabaseProfile,
  type GoogleOAuthRole,
} from "@/lib/google-oauth-profile";

function googleClientId() {
  const value = process.env.GOOGLE_CLIENT_ID;

  if (!value) {
    throw new Error("Missing GOOGLE_CLIENT_ID environment variable.");
  }

  return value;
}

function googleClientSecret() {
  const value = process.env.GOOGLE_CLIENT_SECRET;

  if (!value) {
    throw new Error("Missing GOOGLE_CLIENT_SECRET environment variable.");
  }

  return value;
}

async function selectedRole(): Promise<GoogleOAuthRole> {
  const cookieStore = await cookies();
  const role = cookieStore.get("mediahire_oauth_role")?.value;

  return role === "employer" ? "employer" : "jobseeker";
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "google") {
        const role = await selectedRole();
        const email = profile?.email || token.email;

        if (email) {
          const googleProfile = profile as {
              picture?: unknown;
              name?: unknown;
              email?: unknown;
            } | undefined;
            const supabaseUserId = await ensureGoogleSupabaseProfile({
              avatarUrl:
                typeof googleProfile?.picture === "string"
                  ? googleProfile.picture
                  : typeof token.picture === "string"
                    ? token.picture
                    : "",
              email,
              fullName:
                typeof googleProfile?.name === "string"
                  ? googleProfile.name
                  : typeof token.name === "string"
                    ? token.name
                    : "",
              role,
            });

          token.role = role;
          token.supabaseUserId = supabaseUserId;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role =
          token.role === "employer" ? "employer" : "jobseeker";
        session.user.supabaseUserId =
          typeof token.supabaseUserId === "string" ? token.supabaseUserId : "";
      }

      return session;
    },
  },
  pages: {
    error: "/",
    signIn: "/",
  },
  providers: [
    GoogleProvider({
      authorization: {
        params: {
          access_type: "offline",
          prompt: "select_account",
          response_type: "code",
        },
      },
      clientId: googleClientId(),
      clientSecret: googleClientSecret(),
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
