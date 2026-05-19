"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Mail, RotateCcw, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const verificationLength = 6;

function Logo() {
  return (
    <Link className="inline-flex items-center text-4xl font-black" href="/">
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
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-8 text-slate-950">
      <motion.section
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center"
        initial={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full max-w-2xl rounded-[2rem] border border-blue-100 bg-white px-5 py-10 text-center shadow-[0_24px_90px_rgba(11,99,229,0.10)] sm:px-10 lg:px-14">
          <div className="mx-auto mb-7 grid h-20 w-20 place-items-center rounded-[1.5rem] bg-[#eef4ff] text-[#0B63E5]">
            <Mail size={34} />
          </div>

          <Logo />

          <h1 className="mt-8 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Verify your email address
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-7 text-slate-500 sm:text-base">
            We sent a 6-digit verification code to your email. Please enter the
            code below to verify your account.
          </p>

          <div className="mt-8 flex justify-center gap-2 sm:gap-4">
            {digits.map((digit, index) => (
              <input
                aria-label={`Verification digit ${index + 1}`}
                autoComplete="one-time-code"
                className="h-14 w-12 rounded-2xl border border-slate-200 bg-white text-center text-xl font-black text-slate-950 outline-none transition focus:border-[#0B63E5] focus:ring-4 focus:ring-blue-100 sm:h-16 sm:w-14"
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

          <p className="mt-5 text-xs font-bold text-slate-400">
            Your verification code expires in 5 minutes.
          </p>

          <button
            className="mt-8 inline-flex h-14 w-full max-w-sm items-center justify-center gap-2 rounded-2xl bg-[#0B63E5] px-8 text-sm font-black text-white shadow-[0_18px_38px_rgba(11,99,229,0.24)] transition hover:bg-[#0957ca] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={digits.join("").length !== verificationLength}
            type="button"
          >
            <ShieldCheck size={18} />
            Verify
          </button>

          <p className="mt-5 text-sm font-semibold text-slate-500">
            Didn't receive the code?{" "}
            <button
              className="inline-flex items-center gap-1 font-black text-[#0B63E5] transition hover:text-[#094fb9]"
              type="button"
            >
              <RotateCcw size={14} />
              Resend
            </button>
          </p>

          <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-xs font-black text-emerald-700">
            <CheckCircle2 size={16} />
            MediaHire never asks for your email password.
          </div>
        </div>
      </motion.section>
    </main>
  );
}
