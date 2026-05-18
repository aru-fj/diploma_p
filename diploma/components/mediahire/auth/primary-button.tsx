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
  isLoading?: boolean;
};

export function PrimaryButton({
  children,
  className = "",
  disabled,
  isLoading = false,
  ...props
}: PrimaryButtonProps) {
  return (
    <motion.button
      className={`w-full ${mediaHireClassNames.primaryButton} ${className}`}
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
