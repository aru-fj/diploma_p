"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { mediaHireClassNames, mediaHireMotion } from "../ui/design-system";

type PrimaryButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"
> & {
  children: ReactNode;
  compact?: boolean;
  isLoading?: boolean;
};

export function PrimaryButton({
  children,
  className = "",
  compact = false,
  disabled,
  isLoading = false,
  ...props
}: PrimaryButtonProps) {
  const compactClass =
    "h-12 rounded-lg text-base shadow-[0_12px_28px_rgba(11,99,229,0.20)]";

  return (
    <motion.button
      className={`w-full ${mediaHireClassNames.primaryButton} ${
        compact ? compactClass : ""
      } ${className}`}
      disabled={disabled || isLoading}
      type="button"
      whileHover={
        disabled || isLoading ? undefined : { y: -2, transition: mediaHireMotion.fast }
      }
      whileTap={disabled || isLoading ? undefined : { scale: 0.985 }}
      {...props}
    >
      <span className="inline-flex items-center justify-center gap-2">
        {isLoading ? <Loader2 className="animate-spin" size={18} /> : null}
        {children}
      </span>
    </motion.button>
  );
}
