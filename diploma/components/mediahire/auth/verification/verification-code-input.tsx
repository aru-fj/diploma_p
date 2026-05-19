"use client";

import {
  ClipboardEvent,
  KeyboardEvent,
  RefObject,
  useMemo,
  useRef,
} from "react";
import { motion } from "framer-motion";

type VerificationCodeInputProps = {
  code: string[];
  disabled?: boolean;
  onChange: (nextCode: string[]) => void;
};

const verificationLength = 6;

export function VerificationCodeInput({
  code,
  disabled = false,
  onChange,
}: VerificationCodeInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const refs = inputRefs as RefObject<Array<HTMLInputElement | null>>;

  const inputIndexes = useMemo(
    () => Array.from({ length: verificationLength }, (_, index) => index),
    [],
  );

  function focusInput(index: number) {
    refs.current?.[index]?.focus();
    refs.current?.[index]?.select();
  }

  function updateDigit(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextCode = Array.from({ length: verificationLength }, (_, codeIndex) =>
      code[codeIndex] || "",
    );

    nextCode[index] = digit;
    onChange(nextCode);

    if (digit && index < verificationLength - 1) {
      focusInput(index + 1);
    }
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      focusInput(index - 1);
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();

    const pastedCode = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, verificationLength)
      .split("");

    if (!pastedCode.length) {
      return;
    }

    const nextCode = Array.from({ length: verificationLength }, () => "");

    pastedCode.forEach((digit, index) => {
      nextCode[index] = digit;
    });

    onChange(nextCode);
    focusInput(Math.min(pastedCode.length, verificationLength) - 1);
  }

  return (
    <div
      aria-label="Verification code"
      className="mt-8 flex justify-center gap-2 sm:gap-4"
      role="group"
    >
      {inputIndexes.map((index) => (
        <motion.input
          aria-label={`Verification digit ${index + 1}`}
          className="h-14 w-12 rounded-xl border border-slate-300 bg-white text-center text-xl font-black text-slate-950 outline-none transition focus:border-[#0B63E5] focus:ring-4 focus:ring-[#0B63E5]/10 disabled:bg-slate-100 sm:h-[4.25rem] sm:w-[4.25rem] sm:text-2xl"
          disabled={disabled}
          inputMode="numeric"
          key={index}
          maxLength={1}
          onChange={(event) => updateDigit(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          pattern="[0-9]*"
          ref={(node) => {
            inputRefs.current[index] = node;
          }}
          type="text"
          value={code[index] || ""}
          whileFocus={{ scale: 1.04 }}
        />
      ))}
    </div>
  );
}