import crypto from "node:crypto";
import nodemailer from "nodemailer";

import { getSupabaseAdmin } from "@/lib/supabase-admin";

type VerificationRole = "jobseeker" | "employer";
type VerificationProvider = "email" | "google";

export type VerificationCodePayload = {
  email: string;
  provider?: VerificationProvider;
  role: VerificationRole;
  userId?: string;
};

const codeTtlMinutes = 5;
const maxAttempts = 5;

function getVerificationSecret() {
  return (
    process.env.VERIFICATION_CODE_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ""
  );
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function hashCode(email: string, code: string) {
  const secret = getVerificationSecret();

  if (!secret) {
    throw new Error("Missing VERIFICATION_CODE_SECRET environment variable");
  }

  return crypto
    .createHmac("sha256", secret)
    .update(`${normalizeEmail(email)}:${code}`)
    .digest("hex");
}

function createCode() {
  return crypto.randomInt(100000, 1000000).toString();
}

function getMailTransporter() {
  const user = process.env.GMAIL_SMTP_USER;
  const pass = process.env.GMAIL_SMTP_APP_PASSWORD?.replace(/\s/g, "");

  if (!user || !pass) {
    throw new Error(
      "Gmail SMTP is not configured. Add GMAIL_SMTP_USER and GMAIL_SMTP_APP_PASSWORD to .env.local.",
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });
}

async function sendVerificationEmail(email: string, code: string) {
  const fromEmail =
    process.env.MAIL_FROM ||
    `MediaHire <${process.env.GMAIL_SMTP_USER || ""}>`;

  const transporter = getMailTransporter();

  await transporter.sendMail({
    from: fromEmail,
    to: email,
    subject: "Your MediaHire verification code",
    text: `Your MediaHire verification code is ${code}. It expires in ${codeTtlMinutes} minutes.`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <h2>Your MediaHire verification code</h2>
        <p>Enter this code to continue your MediaHire registration:</p>
        <p style="font-size:32px;font-weight:800;letter-spacing:8px;color:#0B63E5">${code}</p>
        <p>This code expires in ${codeTtlMinutes} minutes.</p>
        <p>If you did not request this code, you can safely ignore this email.</p>
      </div>
    `,
  });
}

export async function createAndSendVerificationCode({
  email,
  provider = "email",
  role,
  userId,
}: VerificationCodePayload) {
  const normalizedEmail = normalizeEmail(email);
  const code = createCode();
  const supabaseAdmin = getSupabaseAdmin();

  await supabaseAdmin
    .from("verification_codes")
    .update({ consumed_at: new Date().toISOString() })
    .eq("email", normalizedEmail)
    .is("consumed_at", null);

  const expiresAt = new Date(
    Date.now() + codeTtlMinutes * 60 * 1000,
  ).toISOString();

  const { error } = await supabaseAdmin.from("verification_codes").insert({
    code_hash: hashCode(normalizedEmail, code),
    email: normalizedEmail,
    expires_at: expiresAt,
    provider,
    role,
    user_id: userId || null,
  });

  if (error) {
    throw error;
  }

  await sendVerificationEmail(normalizedEmail, code);

  return { expiresAt };
}

export async function verifyRegistrationCode(email: string, code: string) {
  const normalizedEmail = normalizeEmail(email);
  const sanitizedCode = code.trim();

  if (!/^\d{6}$/.test(sanitizedCode)) {
    throw new Error("Enter a valid 6-digit verification code.");
  }

  const supabaseAdmin = getSupabaseAdmin();

  const { data: codeRows, error } = await supabaseAdmin
    .from("verification_codes")
    .select("id,user_id,email,role,provider,code_hash,expires_at,attempts,consumed_at")
    .eq("email", normalizedEmail)
    .is("consumed_at", null)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    throw error;
  }

  const verification = codeRows?.[0];

  if (!verification) {
    throw new Error("Verification code was not found. Please resend a new code.");
  }

  if (new Date(verification.expires_at).getTime() < Date.now()) {
    await supabaseAdmin
      .from("verification_codes")
      .update({ consumed_at: new Date().toISOString() })
      .eq("id", verification.id);

    throw new Error("Verification code expired");
  }

  if ((verification.attempts || 0) >= maxAttempts) {
    throw new Error("Too many invalid attempts. Please resend a new code.");
  }

  const expectedHash = hashCode(normalizedEmail, sanitizedCode);

  if (verification.code_hash !== expectedHash) {
    await supabaseAdmin
      .from("verification_codes")
      .update({ attempts: (verification.attempts || 0) + 1 })
      .eq("id", verification.id);

    throw new Error("The code you entered is incorrect");
  }

  const verifiedAt = new Date().toISOString();

  await supabaseAdmin
    .from("verification_codes")
    .update({ consumed_at: verifiedAt })
    .eq("id", verification.id);

  if (verification.user_id) {
    await supabaseAdmin.auth.admin.updateUserById(verification.user_id, {
      email_confirm: true,
      user_metadata: {
        registration_verified: true,
      },
    });

    await supabaseAdmin
      .from("profiles")
      .update({
        is_verified: true,
        verified_at: verifiedAt,
      })
      .eq("user_id", verification.user_id);
  } else {
    await supabaseAdmin
      .from("profiles")
      .update({
        is_verified: true,
        verified_at: verifiedAt,
      })
      .eq("email", normalizedEmail);
  }

  return {
    provider: verification.provider as VerificationProvider,
    role: verification.role as VerificationRole,
    userId: verification.user_id as string | null,
  };
}