"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { DashboardHeader } from "../dashboard/dashboard-header";
import { fadeInUp, mediaHireMotion } from "../ui/design-system";

type JobSearchHeroProps = {
  isMenuOpen: boolean;
  isUserMenuOpen: boolean;
  onToggleMenu: () => void;
  onToggleUserMenu: () => void;
};

export function JobSearchHero({
  isMenuOpen,
  isUserMenuOpen,
  onToggleMenu,
  onToggleUserMenu,
}: JobSearchHeroProps) {
  return (
    <motion.section
      animate="show"
      className="relative min-h-[310px] overflow-hidden rounded-none"
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
      <div className="absolute inset-0 bg-gradient-to-r from-red-950/35 via-slate-950/10 to-blue-950/35" />

      <div className="relative z-10 px-4 pt-10 sm:px-8 lg:px-12">
        <DashboardHeader
          activeItem="Search Job"
          isMenuOpen={isMenuOpen}
          isUserMenuOpen={isUserMenuOpen}
          onToggleMenu={onToggleMenu}
          onToggleUserMenu={onToggleUserMenu}
        />

        <div className="mx-auto mt-16 max-w-2xl text-center text-white">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Creative Professions
          </h1>
          <p className="mt-4 text-lg font-semibold">
            Browse and find a new job
          </p>
        </div>
      </div>
    </motion.section>
  );
}
