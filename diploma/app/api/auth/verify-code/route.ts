import { NextResponse } from "next/server";

import { verifyRegistrationCode } from "@/lib/verification-codes";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      code?: string;
      email?: string;
    };

    if (!body.email || !body.code) {
      return NextResponse.json(
        { error: "Email and verification code are required." },
        { status: 400 },
      );
    }

    const result = await verifyRegistrationCode(body.email, body.code);

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "We could not verify the code right now. Please try again.";

    return NextResponse.json(
      { error: message },
      { status: 400 },
    );
  }
}
