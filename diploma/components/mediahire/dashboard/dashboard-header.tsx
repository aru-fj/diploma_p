"use client";

import Link from "next/link";
import { Bell, Menu, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { JobSeekerUserMenu } from "../jobseeker-user-menu";
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

const jobSeekerNavItems = [
  { href: "/home/jobseeker", label: "Home" },
  { href: "/home/jobseeker/job-search", label: "Search Job" },
  { href: "/profile/jobseeker", label: "My Profile" },
  { href: "/dashboard/jobseeker/community", label: "Community" },
];

function Logo() {
  return (
    <Link
      aria-label="MediaHire home"
      className="shrink-0 text-base font-black tracking-tight"
      href="/home/jobseeker"
    >
      <span className="text-[#0B63E5]">Media</span>
      <span className="text-slate-950">Hire</span>
    </Link>
  );
}

export function DashboardHeader({
  activeItem = "Home",
  isMenuOpen,
  isUserMenuOpen,
  onToggleMenu,
  onToggleUserMenu,
}: DashboardHeaderProps) {
  return (
    <header className="relative left-1/2 z-50 w-[min(1320px,calc(100vw-32px))] -translate-x-1/2">
      <nav className="flex min-h-[52px] items-center justify-between gap-5 rounded-xl border border-white/70 bg-white/90 px-5 py-2 shadow-[0_14px_40px_rgba(37,99,255,0.1)] backdrop-blur-xl">
        <Logo />

        <div className="hidden items-center gap-5 lg:flex">
          {jobSeekerNavItems.map((item) => (
            <Link
              className={`text-xs font-semibold transition hover:text-[#0B63E5] ${
                item.label === activeItem ? "text-[#0B63E5]" : "text-slate-700"
              }`}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            aria-label="Search"
            className="grid h-8 w-8 place-items-center rounded-full text-slate-700 transition hover:bg-[#eef4ff] hover:text-[#0B63E5]"
            type="button"
          >
            <Search size={16} />
          </button>
          <button
            aria-label="Notifications"
            className="grid h-8 w-8 place-items-center rounded-full text-slate-700 transition hover:bg-[#eef4ff] hover:text-[#0B63E5]"
            type="button"
          >
            <Bell size={16} />
          </button>
          <span className="hidden h-7 w-px bg-slate-200 sm:block" />
          <span className="text-xs font-semibold text-slate-600">
            Job Seeker
          </span>
          <JobSeekerUserMenu
            avatarClassName="relative block h-8 w-8 overflow-hidden rounded-full ring-2 ring-white"
            buttonClassName="inline-flex min-h-9 items-center gap-2 rounded-xl px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-[#eef4ff]"
            chevronSize={14}
            isOpen={isUserMenuOpen}
            nameClassName="hidden max-w-[130px] truncate text-xs font-semibold text-slate-700 md:block"
            onToggle={onToggleUserMenu}
          />
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
              {jobSeekerNavItems.map((item) => (
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
          <JobSeekerUserMenu isOpen={isUserMenuOpen} onToggle={onToggleUserMenu} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
