"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type FloatingDecorationProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  rotate?: number;
};

export function FloatingDecoration({
  children,
  className = "",
  delay = 0,
  rotate = 0,
}: FloatingDecorationProps) {
  return (
    <motion.div
      aria-hidden="true"
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -10, 0],
        rotate: [rotate, rotate + 2, rotate],
      }}
      className={`pointer-events-none absolute hidden select-none md:block ${className}`}
      initial={{ opacity: 0, scale: 0.88, rotate }}
      transition={{
        delay,
        duration: 4.8,
        ease: "easeInOut",
        opacity: { duration: 0.5 },
        repeat: Infinity,
      }}
    >
      {children}
    </motion.div>
  );
}

export function BlenderSticker() {
  return (
    <div className="relative h-24 w-24">
      <div className="absolute left-2 top-8 h-9 w-16 rounded-full border-[9px] border-[#ff8517]" />
      <div className="absolute left-12 top-9 grid h-11 w-11 place-items-center rounded-full bg-[#ff8517]">
        <div className="h-7 w-7 rounded-full bg-[#2563ff] ring-4 ring-white" />
      </div>
      <div className="absolute left-0 top-4 h-3 w-14 -rotate-3 rounded-full bg-[#ff8517]" />
      <div className="absolute left-2 top-16 h-3 w-12 -rotate-45 rounded-full bg-[#ff8517]" />
    </div>
  );
}

export function MagazineSticker() {
  return (
    <div className="h-28 w-20 rotate-[-12deg] rounded-2xl border border-pink-200 bg-pink-200 p-3 shadow-[0_18px_36px_rgba(236,72,153,0.22)]">
      <p className="text-center text-[10px] font-black leading-tight text-white">
        graphic design
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {["bg-[#2563ff]", "bg-amber-400", "bg-emerald-400", "bg-slate-900"].map(
          (color) => (
            <span className={`h-3 rounded-sm ${color}`} key={color} />
          ),
        )}
      </div>
      <div className="mt-3 h-8 rounded-lg bg-white/55" />
    </div>
  );
}
