import { NextResponse } from "next/server";

type OAuthRole = "jobseeker" | "employer";
type OAuthMode = "login" | "signup";

function normalizeRole(role: string | null): OAuthRole {
  return role === "employer" ? "employer" : "jobseeker";
}

function normalizeMode(mode: string | null): OAuthMode {
  return mode === "signup" ? "signup" : "login";
}

function callbackPath(role: OAuthRole, mode: OAuthMode) {
  if (mode === "signup") {
    return role === "jobseeker"
      ? "/signup/jobseeker/google-details"
      : "/signup/employer/company-details";
  }

  return role === "jobseeker" ? "/home/jobseeker" : "/account/employer";
}

export function GET(request: Request) {
  const url = new URL(request.url);
  const role = normalizeRole(url.searchParams.get("role"));
  const mode = normalizeMode(url.searchParams.get("mode"));
  const signinUrl = new URL("/api/auth/signin/google", url.origin);

  signinUrl.searchParams.set("callbackUrl", callbackPath(role, mode));

  const response = NextResponse.redirect(signinUrl);

  response.cookies.set("mediahire_oauth_role", role, {
    httpOnly: true,
    maxAge: 10 * 60,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  response.cookies.set("mediahire_oauth_mode", mode, {
    httpOnly: true,
    maxAge: 10 * 60,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
