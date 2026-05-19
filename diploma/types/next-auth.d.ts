import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user?: {
      email?: string | null;
      image?: string | null;
      name?: string | null;
      role?: "jobseeker" | "employer";
      supabaseUserId?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "jobseeker" | "employer";
    supabaseUserId?: string;
  }
}
