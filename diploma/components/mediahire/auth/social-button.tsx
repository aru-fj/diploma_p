"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { mediaHireMotion } from "../ui/design-system";

type SocialButtonProps = {
  children: ReactNode;
  compact?: boolean;
  disabled?: boolean;
  icon: ReactNode;
  onClick?: () => void;
  tone?: "blue" | "dark";
};

export function SocialButton({
  children,
  compact = false,
  icon,
  tone = "blue",
  ...props
}: SocialButtonProps) {
  const toneClass =
    tone === "dark"
      ? "border-[#252525] text-[#252525] hover:bg-slate-50 focus:ring-[#252525]/10"
      : "border-[#0B63E5] text-[#0B63E5] hover:bg-[#f2f7ff] focus:ring-[#0B63E5]/10";

  return (
    <motion.button
      className={`flex w-full items-center justify-center border bg-white font-bold transition focus:outline-none focus:ring-4 ${
        compact
          ? "h-12 gap-2 rounded-lg px-4 text-sm"
          : "h-14 gap-3 rounded-xl px-5 text-base"
      } ${toneClass}`}
      type="button"
      whileHover={{ y: -2, transition: mediaHireMotion.fast }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {icon}
      {children}
    </motion.button>
  );
}

export function GoogleIcon() {
  return (
    <span className="relative grid h-6 w-6 place-items-center rounded-full bg-white text-lg font-black">
      <span className="text-[#4285F4]">G</span>
    </span>
  );
}
