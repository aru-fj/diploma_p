import crypto from "node:crypto";

import { getSupabaseAdmin } from "@/lib/supabase-admin";

export type GoogleOAuthRole = "jobseeker" | "employer";

type EnsureGoogleProfilePayload = {
  avatarUrl?: string | null;
  email: string;
  fullName?: string | null;
  role: GoogleOAuthRole;
};

function splitName(fullName?: string | null) {
  const [firstName = "", ...rest] = (fullName || "").trim().split(/\s+/);

  return {
    firstName,
    lastName: rest.join(" "),
  };
}

export async function ensureGoogleSupabaseProfile({
  avatarUrl,
  email,
  fullName,
  role,
}: EnsureGoogleProfilePayload) {
  const normalizedEmail = email.trim().toLowerCase();
  const supabaseAdmin = getSupabaseAdmin();
  const { firstName, lastName } = splitName(fullName);

  const { data: existingProfile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("role,user_id")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (profileError) {
    throw profileError;
  }

  if (existingProfile?.user_id) {
    if (existingProfile.role && existingProfile.role !== role) {
      throw new Error(
        role === "employer"
          ? "This Google account is registered as a job seeker."
          : "This Google account is registered as an employer.",
      );
    }

    await supabaseAdmin
      .from("profiles")
      .update({
        avatar_url: avatarUrl || null,
        first_name: firstName || null,
        full_name: fullName || null,
        is_verified: true,
        job_title: role === "jobseeker" ? "Creative Specialist" : "Employer",
        last_name: lastName || null,
        provider: "google",
        role,
        verified_at: new Date().toISOString(),
      })
      .eq("user_id", existingProfile.user_id);

    if (role === "employer") {
      await supabaseAdmin.from("employer_profiles").upsert(
        {
          company_field: "Employer",
          company_name: fullName || normalizedEmail,
          logo_url: avatarUrl || null,
          user_id: existingProfile.user_id,
        },
        { onConflict: "user_id" },
      );
    }

    return existingProfile.user_id as string;
  }

  const password = crypto.randomBytes(32).toString("base64url");
  const { data: createdUser, error: createError } =
    await supabaseAdmin.auth.admin.createUser({
      app_metadata: {
        provider: "google",
        role,
      },
      email: normalizedEmail,
      email_confirm: true,
      password,
      user_metadata: {
        avatar_url: avatarUrl,
        first_name: firstName,
        full_name: fullName,
        last_name: lastName,
        provider: "google",
        role,
      },
    });

  if (createError || !createdUser.user) {
    throw createError || new Error("Could not create Supabase Google user.");
  }

  await supabaseAdmin.from("profiles").upsert(
    {
      avatar_url: avatarUrl || null,
      email: normalizedEmail,
      first_name: firstName || null,
      full_name: fullName || null,
      is_verified: true,
      job_title: role === "jobseeker" ? "Creative Specialist" : "Employer",
      last_name: lastName || null,
      provider: "google",
      role,
      user_id: createdUser.user.id,
      verified_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  if (role === "employer") {
    await supabaseAdmin.from("employer_profiles").upsert(
      {
        company_field: "Employer",
        company_name: fullName || normalizedEmail,
        logo_url: avatarUrl || null,
        user_id: createdUser.user.id,
      },
      { onConflict: "user_id" },
    );
  }

  return createdUser.user.id;
}
