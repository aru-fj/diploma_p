"use client";

import Link from "next/link";
import { Bell, Menu, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { dashboardNavItems } from "./dashboard-data";
import { UserDropdown } from "./user-dropdown";
import { fadeInUp, mediaHireMotion } from "../ui/design-system";

type DashboardHeaderProps = {
  activeItem?: string;
  compact?: boolean;
  wide?: boolean;
  isMenuOpen: boolean;
  isUserMenuOpen: boolean;
  onToggleMenu: () => void;
  onToggleUserMenu: () => void;
};

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      aria-label="MediaHire home"
      className={`font-black tracking-tight ${compact ? "text-sm" : "text-xl"}`}
      href="/home/jobseeker"
    >
      <span className="text-[#0B63E5]">Media</span>
      <span className="text-slate-950">Hire</span>
    </Link>
  );
}

export function DashboardHeader({
  activeItem = "Home",
  compact = false,
  wide = false,
  isMenuOpen,
  isUserMenuOpen,
  onToggleMenu,
  onToggleUserMenu,
}: DashboardHeaderProps) {
  return (
    <header
      className={`relative z-50 mx-auto w-full ${
        wide ? "max-w-[1540px]" : "max-w-6xl"
      }`}
    >
      <nav
        className={`flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/95 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur ${
          compact
            ? "min-h-11 gap-2 px-3 sm:px-4"
            : "min-h-[68px] gap-4 px-4 py-3 sm:px-6"
        }`}
      >
        <Logo compact={compact} />

        <div className={`hidden items-center lg:flex ${compact ? "gap-5" : "gap-8"}`}>
          {dashboardNavItems.map((item) => (
            <Link
              className={`${compact ? "text-[10px]" : "text-sm"} font-bold transition hover:text-[#0B63E5] ${
                item.label === activeItem ? "text-[#0B63E5]" : "text-slate-700"
              }`}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className={`hidden items-center lg:flex ${compact ? "gap-2" : "gap-4"}`}>
          <button
            aria-label="Search"
            className={`grid place-items-center rounded-full text-slate-700 transition hover:bg-[#eef4ff] hover:text-[#0B63E5] ${
              compact ? "h-7 w-7" : "h-9 w-9"
            }`}
            type="button"
          >
            <Search size={compact ? 13 : 18} />
          </button>
          <button
            aria-label="Notifications"
            className={`grid place-items-center rounded-full text-slate-700 transition hover:bg-[#eef4ff] hover:text-[#0B63E5] ${
              compact ? "h-7 w-7" : "h-9 w-9"
            }`}
            type="button"
          >
            <Bell size={compact ? 13 : 18} />
          </button>
          <span className={`${compact ? "text-[10px]" : "text-sm"} font-semibold text-slate-600`}>
            Job Seeker
          </span>
          <UserDropdown isOpen={isUserMenuOpen} onToggle={onToggleUserMenu} />
        </div>

        <button
          aria-label="Open navigation menu"
          className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-800 lg:hidden"
          onClick={onToggleMenu}
          type="button"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            animate="show"
            className="absolute left-0 right-0 top-20 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.12)] lg:hidden"
            exit={{ opacity: 0, y: -10 }}
            initial="hidden"
            transition={mediaHireMotion.fast}
            variants={fadeInUp}
          >
            <div className="grid gap-2">
              {dashboardNavItems.map((item) => (
                <Link
                  className={`rounded-xl px-4 py-3 text-sm font-black transition hover:bg-[#eef4ff] hover:text-[#0B63E5] ${
                    item.label === activeItem
                      ? "bg-[#eef4ff] text-[#0B63E5]"
                      : "text-slate-700"
                  }`}
                  href={item.href}
                  key={item.label}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-sm font-bold text-slate-500">
                Job Seeker
              </span>
              <UserDropdown isOpen={isUserMenuOpen} onToggle={onToggleUserMenu} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
