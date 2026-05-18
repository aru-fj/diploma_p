"use client";

import type { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export type RoleType = "jobseeker" | "employer";

type RoleCardProps = {
  description: string;
  icon: LucideIcon;
  isSelected: boolean;
  onSelect: (role: RoleType) => void;
  role: RoleType;
  title: string;
};

export function RoleCard({
  description,
  icon: Icon,
  isSelected,
  onSelect,
  role,
  title,
}: RoleCardProps) {
  return (
    <motion.button
      aria-pressed={isSelected}
      className={`group relative flex w-full items-center gap-5 rounded-2xl border bg-white p-5 text-left outline-none transition duration-300 focus:ring-4 focus:ring-[#2563ff]/20 sm:p-6 ${
        isSelected
          ? "border-[#2563ff] shadow-[0_18px_45px_rgba(37,99,255,0.22)]"
          : "border-slate-200 shadow-sm hover:border-[#2563ff]/55 hover:shadow-[0_16px_40px_rgba(37,99,255,0.12)]"
      }`}
      onClick={() => onSelect(role)}
      type="button"
      whileHover={{ y: -3 }}
      animate={{ scale: isSelected ? 1.025 : 1 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <span
        className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl transition duration-300 ${
          isSelected
            ? "bg-[#2563ff] text-white"
            : "bg-[#eef4ff] text-slate-400 group-hover:text-[#2563ff]"
        }`}
      >
        <Icon size={30} strokeWidth={1.9} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-base font-black text-slate-950 sm:text-lg">
          {title}
        </span>
        <span className="mt-1 block text-sm font-semibold text-slate-400 sm:text-base">
          {description}
        </span>
      </span>

      <span
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition duration-300 ${
          isSelected ? "scale-100 bg-[#2563ff] text-white" : "scale-75 bg-slate-100 text-transparent"
        }`}
      >
        <CheckCircle2 size={18} />
      </span>
    </motion.button>
  );
}
