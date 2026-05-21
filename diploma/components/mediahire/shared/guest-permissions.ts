"use client";

import { supabase } from "@/lib/supabase-client";

export async function hasMediaHireSession() {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return Boolean(session);
  } catch {
    return false;
  }
}

export async function requireJobSeekerAuth(actionLabel = "continue") {
  const isAuthenticated = await hasMediaHireSession();

  if (isAuthenticated || typeof window === "undefined") {
    return true;
  }

  window.alert(
    `Please log in or sign up before you ${actionLabel}.`,
  );

  const nextPath = `${window.location.pathname}${window.location.search}`;
  window.location.href = `/login/jobseeker?next=${encodeURIComponent(nextPath)}`;

  return false;
}
