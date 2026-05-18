"use client";

import type { InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { mediaHireClassNames } from "../ui/design-system";

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  isVisible: boolean;
  label: string;
  onToggleVisibility: () => void;
};

export function PasswordInput({
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
        className="mb-2 ml-4 block text-sm font-bold text-slate-800"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <input
          className={`h-14 w-full rounded-xl border bg-white px-4 pr-12 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0B63E5] focus:ring-4 focus:ring-[#0B63E5]/10 ${mediaHireClassNames.focus} ${
            error ? "border-red-400" : "border-slate-300"
          }`}
          id={id}
          type={isVisible ? "text" : "password"}
          {...props}
        />
        <button
          aria-label={isVisible ? "Hide password" : "Show password"}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#0B63E5]"
          onClick={onToggleVisibility}
          type="button"
        >
          <Icon size={19} />
        </button>
      </div>
      {error ? (
        <p className="mt-2 text-sm font-semibold text-red-500">{error}</p>
      ) : null}
    </div>
  );
}
