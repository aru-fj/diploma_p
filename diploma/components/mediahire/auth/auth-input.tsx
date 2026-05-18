import type { InputHTMLAttributes } from "react";
import { mediaHireClassNames } from "../ui/design-system";

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  label: string;
};

export function AuthInput({ error, id, label, ...props }: AuthInputProps) {
  return (
    <div>
      <label
        className="mb-2 ml-4 block text-sm font-bold text-slate-800"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`h-14 w-full rounded-xl border bg-white px-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0B63E5] focus:ring-4 focus:ring-[#0B63E5]/10 ${mediaHireClassNames.focus} ${
          error ? "border-red-400" : "border-slate-300"
        }`}
        id={id}
        {...props}
      />
      {error ? (
        <p className="mt-2 text-sm font-semibold text-red-500">{error}</p>
      ) : null}
    </div>
  );
}
