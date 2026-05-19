"use client";

import type { MediaHireRole } from "./auth-service";

export type MediaHireNextAuthSession = {
  user?: {
    email?: string | null;
    role?: MediaHireRole;
    supabaseUserId?: string;
  };
};

export async function getNextAuthSession() {
  try {
    const response = await fetch("/api/auth/session", {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const session = (await response.json()) as MediaHireNextAuthSession;

    return session?.user?.email ? session : null;
  } catch {
    return null;
  }
}
