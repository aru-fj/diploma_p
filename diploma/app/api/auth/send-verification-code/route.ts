import { NextResponse } from "next/server";

import { createAndSendVerificationCode } from "@/lib/verification-codes";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      provider?: "email" | "google";
      role?: "jobseeker" | "employer";
      userId?: string;
    };

    if (!body.email || !body.role) {
      return NextResponse.json(
        { error: "Email and role are required." },
        { status: 400 },
      );
    }

    const result = await createAndSendVerificationCode({
      email: body.email,
      provider: body.provider || "email",
      role: body.role,
      userId: body.userId,
    });

    return NextResponse.json({
      ok: true,
      message: "Verification code has been sent.",
      ...result,
    });
  } catch (error) {
    console.error("Send verification code error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "We could not send the verification code right now. Please try again.";

    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}