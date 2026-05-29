import type { InputHTMLAttributes } from "react";
import { mediaHireClassNames } from "../ui/design-system";

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  compact?: boolean;
  error?: string;
  label: string;
};

export function AuthInput({
  compact = false,
  error,
  id,
  label,
  ...props
}: AuthInputProps) {
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
      <input
        className={`w-full border bg-white font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0B63E5] focus:ring-4 focus:ring-[#0B63E5]/10 ${mediaHireClassNames.focus} ${
          compact
            ? "h-12 rounded-lg px-3 text-sm"
            : "h-14 rounded-xl px-4 text-sm"
        } ${
          error ? "border-red-400" : "border-slate-300"
        }`}
        id={id}
        {...props}
      />
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
