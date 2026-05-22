import { NextRequest, NextResponse } from "next/server";

const nextAuthPaths = new Set([
  "callback",
  "csrf",
  "error",
  "providers",
  "session",
  "signin",
  "signout",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/home/jobseeker/people/")) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = pathname.replace(
      "/home/jobseeker/people",
      "/home/jobseeker/specialists",
    );

    return NextResponse.rewrite(rewriteUrl);
  }

  if (
    pathname === "/profile/jobseeker" ||
    pathname === "/dashboard/jobseeker/profile"
  ) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = "/home/jobseeker/my-profile";

    return NextResponse.rewrite(rewriteUrl);
  }

  if (!pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  const authAction = pathname.split("/")[3] || "";

  if (!nextAuthPaths.has(authAction)) {
    return NextResponse.next();
  }

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = pathname.replace(
    "/api/auth",
    "/api/mediahire-nextauth",
  );

  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: [
    "/api/auth/:path*",
    "/home/jobseeker/people/:path*",
    "/profile/jobseeker",
    "/dashboard/jobseeker/profile",
  ],
};
