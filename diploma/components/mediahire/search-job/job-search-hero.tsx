"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Header } from "../header";
import { fadeInUp, mediaHireMotion } from "../ui/design-system";

type JobSearchHeroProps = {
  isMenuOpen?: boolean;
  isUserMenuOpen?: boolean;
  onToggleMenu?: () => void;
  onToggleUserMenu?: () => void;
};

export function JobSearchHero({}: JobSearchHeroProps) {
  return (
    <motion.section
      animate="show"
      className="relative min-h-[360px] overflow-hidden rounded-none"
      initial="hidden"
      transition={mediaHireMotion.page}
      variants={fadeInUp}
    >
      <Image
        alt="Abstract colorful creative background"
        className="object-cover object-center"
        fill
        priority
        sizes="100vw"
        src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1800&q=90"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/25 to-blue-950/50" />

      <div className="relative z-10 px-4 pt-6 sm:px-8 lg:px-12">
        <Header />

        <div className="mx-auto mt-20 max-w-2xl text-center text-white">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-white/80">
            Public job search
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Find creative jobs in Kazakhstan
          </h1>

          <p className="mt-4 text-lg font-semibold text-white/85">
            Browse vacancies, view company details, and explore media career
            opportunities before creating an account.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
