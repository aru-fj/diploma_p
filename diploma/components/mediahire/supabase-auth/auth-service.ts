"use client";

import { supabase } from "@/lib/supabase-client";

export type MediaHireRole = "jobseeker" | "employer";
export type MediaHireProvider = "email" | "google";

export type SignUpPayload = {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  role: MediaHireRole;
};

export type LoginPayload = {
  email: string;
  password: string;
  role: MediaHireRole;
};

export type ProfileUpsertPayload = {
  avatarUrl?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  location?: string;
  minimumSalary?: string;
  paymentPeriod?: string;
  postalCode?: string;
  provider?: MediaHireProvider;
  role: MediaHireRole;
  userId: string;
};

export function getAuthRedirectUrl(path: string) {
  if (typeof window === "undefined") {
    return path;
  }

  return `${window.location.origin}${path}`;
}

export async function upsertProfile(payload: ProfileUpsertPayload) {
  const fullName = [payload.firstName, payload.lastName].filter(Boolean).join(" ");
  const minimumSalary =
    payload.minimumSalary && !Number.isNaN(Number(payload.minimumSalary))
      ? Number(payload.minimumSalary)
      : null;

  const { error } = await supabase.from("profiles").upsert(
    {
      avatar_url: payload.avatarUrl || null,
      email: payload.email || null,
      first_name: payload.firstName || null,
      full_name: fullName || null,
      last_name: payload.lastName || null,
      location: payload.location || null,
      minimum_salary: minimumSalary,
      payment_period: payload.paymentPeriod || null,
      postal_code: payload.postalCode || null,
      provider: payload.provider || "email",
      role: payload.role,
      user_id: payload.userId,
    },
    { onConflict: "user_id" },
  );

  if (error) {
    throw error;
  }
}

export async function signUpWithEmail({
  email,
  firstName = "",
  lastName = "",
  password,
  role,
}: SignUpPayload) {
  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  const { data, error } = await supabase.auth.signUp({
    email,
    options: {
      data: {
        first_name: firstName,
        full_name: fullName,
        last_name: lastName,
        provider: "email",
        role,
      },
      emailRedirectTo: getAuthRedirectUrl(
        role === "jobseeker" ? "/home/jobseeker" : "/account/employer",
      ),
    },
    password,
  });

  if (error) {
    throw error;
  }

  if (data.user && data.session) {
    await upsertProfile({
      email,
      firstName,
      lastName,
      provider: "email",
      role,
      userId: data.user.id,
    });
  }

  return data;
}

export async function loginWithEmail({ email, password, role }: LoginPayload) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  if (data.user) {
    await upsertProfile({
      email: data.user.email || email,
      firstName: data.user.user_metadata?.first_name,
      lastName: data.user.user_metadata?.last_name,
      provider: "email",
      role,
      userId: data.user.id,
    });
  }

  return data;
}

export async function signInWithGoogle(role: MediaHireRole) {
  const callbackPath =
    role === "jobseeker"
      ? "/signup/jobseeker/google-details"
      : "/signup/employer/google-details";

  const { error } = await supabase.auth.signInWithOAuth({
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "select_account",
      },
      redirectTo: getAuthRedirectUrl(callbackPath),
    },
    provider: "google",
  });

  if (error) {
    throw error;
  }
}

export async function requireSession(redirectTo: string) {
  const { data } = await supabase.auth.getSession();

  if (!data.session && typeof window !== "undefined") {
    window.location.replace(redirectTo);
  }

  return data.session;
}
