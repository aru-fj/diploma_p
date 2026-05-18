export type MediaHireRole = "employer" | "jobseeker";
export type MediaHireOAuthIntent = "signin" | "signup";

export function getGoogleOAuthCallbackUrl(
  role: MediaHireRole,
  intent: MediaHireOAuthIntent = "signup",
) {
  if (role === "employer") {
    return intent === "signin"
      ? "/verify-email?role=employer&next=/dashboard/employer"
      : "/verify-email?role=employer";
  }

  return intent === "signin"
    ? "/verify-email?role=jobseeker&next=/dashboard/jobseeker"
    : "/signup/jobseeker/google-details";
}

export function normalizeMediaHireRole(role: string | null): MediaHireRole {
  return role === "employer" ? "employer" : "jobseeker";
}

export function normalizeMediaHireOAuthIntent(
  intent: string | null,
): MediaHireOAuthIntent {
  return intent === "signin" ? "signin" : "signup";
}
