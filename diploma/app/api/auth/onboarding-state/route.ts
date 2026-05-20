import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token?.supabaseUserId) {
    return NextResponse.json({ error: "Unauthorized request." }, { status: 401 });
  }

  const body = (await request.json()) as {
    onboarding_completed?: boolean;
    onboarding_skipped?: boolean;
  };

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin
    .from("profiles")
    .update({
      onboarding_completed: Boolean(body.onboarding_completed),
      onboarding_skipped: Boolean(body.onboarding_skipped),
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", token.supabaseUserId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
