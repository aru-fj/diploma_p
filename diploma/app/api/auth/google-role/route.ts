import { type NextRequest, NextResponse } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase-admin";

type MediaHireRole = "jobseeker" | "employer";

function isMediaHireRole(value: unknown): value is MediaHireRole {
  return value === "employer" || value === "jobseeker";
}

export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization") || "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";

  if (!token) {
    return NextResponse.json({ error: "Missing auth token." }, { status: 401 });
  }

  let supabaseAdmin: ReturnType<typeof getSupabaseAdmin>;

  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Supabase admin client is not configured.",
      },
      { status: 500 },
    );
  }

  const {
    data: { user },
    error: userError,
  } = await supabaseAdmin.auth.getUser(token);

  if (userError || !user) {
    return NextResponse.json(
      { error: userError?.message || "Could not verify Google session." },
      { status: 401 },
    );
  }

  const { data: employerProfile } = await supabaseAdmin
    .from("employer_profiles")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (employerProfile?.user_id) {
    return NextResponse.json({ role: "employer" satisfies MediaHireRole });
  }

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (isMediaHireRole(profile?.role)) {
    return NextResponse.json({ role: profile.role });
  }

  const email = user.email?.trim().toLowerCase();

  if (email) {
    const { data: emailProfiles } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("email", email)
      .limit(10);

    const roles = (emailProfiles || [])
      .map((emailProfile) => emailProfile.role)
      .filter(isMediaHireRole);

    if (roles.includes("employer")) {
      return NextResponse.json({ role: "employer" satisfies MediaHireRole });
    }

    if (roles.includes("jobseeker")) {
      return NextResponse.json({ role: "jobseeker" satisfies MediaHireRole });
    }
  }

  return NextResponse.json({ role: null });
}
