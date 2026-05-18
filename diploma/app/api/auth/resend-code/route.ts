type ResendCodePayload = {
  email?: string;
  role?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as ResendCodePayload;

  return Response.json({
    message: "A new verification code has been sent.",
    sent: true,
    user: {
      email: payload.email ?? null,
      role: payload.role ?? "jobseeker",
    },
  });
}
