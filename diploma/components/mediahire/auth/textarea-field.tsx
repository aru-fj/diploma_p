import type { TextareaHTMLAttributes } from "react";

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  counter?: string;
  error?: string;
  helperText?: string;
  label: string;
};

export function TextareaField({
  counter,
  error,
  helperText,
  id,
  label,
  ...props
}: TextareaFieldProps) {
  return (
    <div>
      <label
        className="mb-2 ml-4 block text-sm font-bold text-slate-800"
        htmlFor={id}
      >
        {label}
      </label>
      <textarea
        className={`min-h-28 w-full resize-none rounded-xl border bg-white px-4 py-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0B63E5] focus:ring-4 focus:ring-[#0B63E5]/10 ${
          error ? "border-red-400" : "border-slate-300"
        }`}
        id={id}
        {...props}
      />
      <div className="mt-2 flex items-start justify-between gap-4 text-xs font-semibold text-slate-400">
        <span>{error ?? helperText}</span>
        {counter ? <span className="shrink-0">{counter}</span> : null}
      </div>
    </div>
  );
}
