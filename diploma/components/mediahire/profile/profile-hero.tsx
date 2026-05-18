"use client";

import Image from "next/image";
import { DashboardHeader } from "@/components/mediahire/dashboard/dashboard-header";

type ProfileHeroProps = {
  isMenuOpen: boolean;
  isUserMenuOpen: boolean;
  onToggleMenu: () => void;
  onToggleUserMenu: () => void;
};

export function ProfileHero({
  isMenuOpen,
  isUserMenuOpen,
  onToggleMenu,
  onToggleUserMenu,
}: ProfileHeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-200">
      <Image
        alt="Colorful abstract creative portfolio banner"
        className="object-cover"
        fill
        priority
        sizes="100vw"
        src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1800&q=90"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-indigo-950/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-slate-950/10" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-0">
        <DashboardHeader
          activeItem="My Profile"
          isMenuOpen={isMenuOpen}
          isUserMenuOpen={isUserMenuOpen}
          onToggleMenu={onToggleMenu}
          onToggleUserMenu={onToggleUserMenu}
        />
      </div>

      <div className="relative z-10 h-40 sm:h-52 lg:h-56" />
    </section>
  );
}
