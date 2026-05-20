import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token?.supabaseUserId || token.role !== "employer") {
    return NextResponse.json({ error: "Unauthorized employer request." }, { status: 401 });
  }

  const body = (await request.json()) as {
    companyDescription?: string;
    companyField?: string;
    companyName?: string;
    logoUrl?: string;
  };

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.from("employer_profiles").upsert(
    {
      company_description: body.companyDescription || null,
      company_field: body.companyField || null,
      company_name: body.companyName || "Employer Company",
      logo_url: body.logoUrl || null,
      user_id: token.supabaseUserId,
    },
    { onConflict: "user_id" },
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
