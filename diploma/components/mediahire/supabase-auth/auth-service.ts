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
  bio?: string;
  city?: string;
  country?: string;
  email?: string;
  expectedSalary?: string;
  firstName?: string;
  jobTitle?: string;
  lastName?: string;
  location?: string;
  minimumSalary?: string;
  paymentPeriod?: string;
  postalCode?: string;
  provider?: MediaHireProvider;
  resumeUrl?: string;
  role: MediaHireRole;
  skills?: string;
  userId: string;
};

type VerificationCodeRequest = {
  email: string;
  provider?: MediaHireProvider;
  role: MediaHireRole;
  userId?: string;
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
  const expectedSalary =
    payload.expectedSalary && !Number.isNaN(Number(payload.expectedSalary))
      ? Number(payload.expectedSalary)
      : minimumSalary;

  const { error } = await supabase.from("profiles").upsert(
    {
      avatar_url: payload.avatarUrl || null,
      bio: payload.bio || null,
      city: payload.city || null,
      country: payload.country || null,
      email: payload.email || null,
      expected_salary: expectedSalary,
      first_name: payload.firstName || null,
      full_name: fullName || null,
      job_title: payload.jobTitle || null,
      last_name: payload.lastName || null,
      location: payload.location || null,
      minimum_salary: minimumSalary,
      payment_period: payload.paymentPeriod || null,
      postal_code: payload.postalCode || null,
      provider: payload.provider || "email",
      resume_url: payload.resumeUrl || null,
      role: payload.role,
      skills: payload.skills || null,
      user_id: payload.userId,
    },
    { onConflict: "user_id" },
  );

  if (error) {
    throw error;
  }
}

export async function requestVerificationCode({
  email,
  provider = "email",
  role,
  userId,
}: VerificationCodeRequest) {
  const response = await fetch("/api/auth/send-verification-code", {
    body: JSON.stringify({ email, provider, role, userId }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const result = (await response.json()) as { error?: string };

  if (!response.ok) {
    throw new Error(result.error || "Could not send verification code");
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
        city: "",
        country: "",
        expected_salary: "",
        first_name: firstName,
        full_name: fullName,
        job_title: "",
        last_name: lastName,
        provider: "email",
        resume_url: "",
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

  if (data.user) {
    await requestVerificationCode({
      email,
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

export async function signInWithGoogle(role: MediaHireRole, mode: "login" | "signup") {
  if (typeof window === "undefined") {
    return;
  }

  const startUrl = new URL("/api/auth/google/start", window.location.origin);
  startUrl.searchParams.set("role", role);
  startUrl.searchParams.set("mode", mode);

  window.location.assign(startUrl.toString());
}

export async function requireSession(redirectTo: string) {
  const { data } = await supabase.auth.getSession();

  if (!data.session && typeof window !== "undefined") {
    window.location.replace(redirectTo);
  }

  return data.session;
}
