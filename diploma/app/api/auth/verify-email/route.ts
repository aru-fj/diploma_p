type VerifyEmailPayload = {
  code?: string;
  email?: string;
  role?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as VerifyEmailPayload;
  const code = payload.code ?? "";

  if (!/^\d{4}$/.test(code)) {
    return Response.json(
      { message: "Invalid verification code" },
      { status: 400 },
    );
  }

  return Response.json({
    ok: true,
    verified: true,
    user: {
      email: payload.email ?? null,
      role: payload.role ?? "jobseeker",
    },
  });
}
