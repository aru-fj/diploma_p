"use client";

import type { InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { mediaHireClassNames } from "../ui/design-system";

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement> & {
  compact?: boolean;
  error?: string;
  isVisible: boolean;
  label: string;
  onToggleVisibility: () => void;
};

export function PasswordInput({
  compact = false,
  error,
  id,
  isVisible,
  label,
  onToggleVisibility,
  ...props
}: PasswordInputProps) {
  const Icon = isVisible ? EyeOff : Eye;

  return (
    <div>
      <label
        className={`block font-bold text-slate-800 ${
          compact ? "mb-1.5 ml-3 text-xs" : "mb-2 ml-4 text-sm"
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <input
          className={`w-full border bg-white font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0B63E5] focus:ring-4 focus:ring-[#0B63E5]/10 ${mediaHireClassNames.focus} ${
            compact
              ? "h-12 rounded-lg px-3 pr-10 text-sm"
              : "h-14 rounded-xl px-4 pr-12 text-sm"
          } ${
            error ? "border-red-400" : "border-slate-300"
          }`}
          id={id}
          type={isVisible ? "text" : "password"}
          {...props}
        />
        <button
          aria-label={isVisible ? "Hide password" : "Show password"}
          className={`absolute top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#0B63E5] ${
            compact ? "right-3" : "right-4"
          }`}
          onClick={onToggleVisibility}
          type="button"
        >
          <Icon size={compact ? 17 : 19} />
        </button>
      </div>
      {error ? (
        <p
          className={`font-semibold text-red-500 ${
            compact ? "mt-1.5 text-xs" : "mt-2 text-sm"
          }`}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
