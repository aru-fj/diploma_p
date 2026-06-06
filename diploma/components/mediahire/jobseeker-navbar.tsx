"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";

import { JobSeekerUserMenu } from "./jobseeker-user-menu";

type JobSeekerNavbarProps = {
  active?: "Home" | "Search Job" | "My Profile" | "Community" | string;
};

const jobSeekerNavLinks = [
  { href: "/home/jobseeker", label: "Home" },
  { href: "/home/jobseeker/job-search", label: "Search Job" },
  { href: "/profile/jobseeker", label: "My Profile" },
  { href: "/dashboard/jobseeker/community", label: "Community" },
];

export function JobSeekerNavbar({ active = "Home" }: JobSeekerNavbarProps) {
  return (
    <nav className="relative z-20 mx-auto flex min-h-[52px] w-[min(1320px,calc(100%-32px))] items-center justify-between gap-5 rounded-xl border border-white/70 bg-white/90 px-5 py-2 shadow-[0_14px_40px_rgba(37,99,255,0.1)] backdrop-blur-xl">
      <Link
        aria-label="MediaHire home"
        className="shrink-0 text-base font-black tracking-tight"
        href="/home/jobseeker"
      >
        <span className="text-[#0B63E5]">Media</span>
        <span className="text-slate-950">Hire</span>
      </Link>

      <div className="hidden items-center gap-5 lg:flex">
        {jobSeekerNavLinks.map((link) => (
          <Link
            className={`text-xs font-semibold transition hover:text-[#0B63E5] ${
              active === link.label ? "text-[#0B63E5]" : "text-slate-600"
            }`}
            href={link.href}
            key={link.label}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-3 text-slate-600">
        <button
          aria-label="Search"
          className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-[#eef4ff] hover:text-[#0B63E5]"
          type="button"
        >
          <Search size={16} />
        </button>
        <button
          aria-label="Notifications"
          className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-[#eef4ff] hover:text-[#0B63E5]"
          type="button"
        >
          <Bell size={16} />
        </button>
        <span className="hidden h-7 w-px bg-slate-200 sm:block" />
        <span className="hidden text-xs font-semibold text-slate-600 sm:block">
          Job Seeker
        </span>
        <JobSeekerUserMenu
          avatarClassName="relative block h-8 w-8 overflow-hidden rounded-full ring-2 ring-white"
          buttonClassName="inline-flex min-h-9 items-center gap-2 rounded-xl px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-[#eef4ff]"
          chevronSize={14}
          nameClassName="hidden max-w-[130px] truncate text-xs font-semibold text-slate-700 md:block"
        />
      </div>
    </nav>
  );
}
