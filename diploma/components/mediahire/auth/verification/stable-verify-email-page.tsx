"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Mail, RotateCcw, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const verificationLength = 6;

function Logo() {
  return (
    <Link className="inline-flex items-center text-2xl font-black" href="/">
      <span className="text-[#0B63E5]">Media</span>
      <span className="text-slate-950">Hire</span>
    </Link>
  );
}

export function StableVerifyEmailPage() {
  const [digits, setDigits] = useState<string[]>(
    Array.from({ length: verificationLength }, () => ""),
  );
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  function updateDigit(index: number, value: string) {
    const nextValue = value.replace(/\D/g, "").slice(0, 1);

    setDigits((current) => {
      const next = [...current];
      next[index] = nextValue;
      return next;
    });

    if (nextValue && index < verificationLength - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, key: string) {
    if (key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handlePaste(value: string) {
    const pastedDigits = value.replace(/\D/g, "").slice(0, verificationLength);

    if (!pastedDigits) {
      return;
    }

    const nextDigits = Array.from({ length: verificationLength }, (_, index) =>
      pastedDigits[index] || "",
    );

    setDigits(nextDigits);
    inputsRef.current[Math.min(pastedDigits.length, verificationLength) - 1]?.focus();
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-3 text-slate-950">
      <motion.section
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-[460px] items-center justify-center"
        initial={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full max-w-[360px] rounded-2xl border border-blue-100 bg-white px-4 py-5 text-center shadow-[0_14px_40px_rgba(11,99,229,0.10)]">
          <div className="mx-auto mb-4 grid h-11 w-11 place-items-center rounded-xl bg-[#eef4ff] text-[#0B63E5]">
            <Mail size={20} />
          </div>

          <Logo />

          <h1 className="mt-4 text-lg font-black tracking-tight text-slate-950 sm:text-xl">
            Verify your email address
          </h1>
          <p className="mx-auto mt-2 max-w-[300px] text-[11px] font-semibold leading-5 text-slate-500 sm:text-xs">
            We sent a 6-digit verification code to your email. Please enter the
            code below to verify your account.
          </p>

          <div className="mt-5 flex justify-center gap-1.5">
            {digits.map((digit, index) => (
              <input
                aria-label={`Verification digit ${index + 1}`}
                autoComplete="one-time-code"
                className="h-9 w-7 rounded-lg border border-slate-200 bg-white text-center text-base font-black text-slate-950 outline-none transition focus:border-[#0B63E5] focus:ring-4 focus:ring-blue-100 sm:h-10 sm:w-8"
                inputMode="numeric"
                key={index}
                maxLength={1}
                onChange={(event) => updateDigit(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event.key)}
                onPaste={(event) => {
                  event.preventDefault();
                  handlePaste(event.clipboardData.getData("text"));
                }}
                pattern="[0-9]*"
                type="text"
                value={digit}
                ref={(node) => {
                  inputsRef.current[index] = node;
                }}
              />
            ))}
          </div>

          <p className="mt-3 text-[11px] font-bold text-slate-400">
            Your verification code expires in 5 minutes.
          </p>

          <button
            className="mt-5 inline-flex h-10 w-full max-w-[220px] items-center justify-center gap-2 rounded-xl bg-[#0B63E5] px-5 text-xs font-black text-white shadow-[0_12px_24px_rgba(11,99,229,0.18)] transition hover:bg-[#0957ca] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={digits.join("").length !== verificationLength}
            type="button"
          >
            <ShieldCheck size={14} />
            Verify
          </button>

          <p className="mt-3 text-xs font-semibold text-slate-500">
            Didn't receive the code?{" "}
            <button
              className="inline-flex items-center gap-1 font-black text-[#0B63E5] transition hover:text-[#094fb9]"
              type="button"
            >
              <RotateCcw size={14} />
              Resend
            </button>
          </p>

          <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-[11px] font-black text-emerald-700">
            <CheckCircle2 size={14} />
            MediaHire never asks for your email password.
          </div>
        </div>
      </motion.section>
    </main>
  );
}
