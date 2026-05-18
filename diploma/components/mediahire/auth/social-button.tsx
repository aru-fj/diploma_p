"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { mediaHireMotion } from "../ui/design-system";

type SocialButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  icon: ReactNode;
  onClick?: () => void;
  tone?: "blue" | "dark";
};

export function SocialButton({
  children,
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
      className={`flex h-14 w-full items-center justify-center gap-3 rounded-xl border bg-white px-5 text-base font-bold transition focus:outline-none focus:ring-4 ${toneClass}`}
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
