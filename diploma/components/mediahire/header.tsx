"use client";

import Link from "next/link";
import { Bell, Menu, Search } from "lucide-react";

export type PublicRole = "jobseeker" | "employer";

const publicNavByRole: Record<
  PublicRole,
  {
    label: string;
    href: string;
  }[]
> = {
  jobseeker: [
    { label: "Home", href: "/" },
    { label: "Search Job", href: "/search-job" },
    { label: "My Profile", href: "/guest/my-profile?role=jobseeker" },
    { label: "Community", href: "/guest/community?role=jobseeker" },
  ],
  employer: [
    { label: "Home", href: "/?role=employer" },
    {
      label: "Posted Jobs",
      href: "/auth-required?feature=posted-jobs&role=employer",
    },
    { label: "Search CV", href: "/search-cv" },
    { label: "Community", href: "/guest/community?role=employer" },
  ],
};

type HeaderProps = {
  role?: PublicRole;
  onRoleChange?: (role: PublicRole) => void;
  activeItem?: string;
};

export function Header({
  role = "jobseeker",
  onRoleChange,
  activeItem,
}: HeaderProps) {
  const navLinks = publicNavByRole[role];
  const loginHref = role === "employer" ? "/login/employer" : "/login/jobseeker";
  const signupHref =
    role === "employer" ? "/signup/employer" : "/signup/jobseeker";

  function handleRoleChange(nextRole: PublicRole) {
    if (onRoleChange) {
      onRoleChange(nextRole);
      return;
    }

    window.location.href = nextRole === "employer" ? "/?role=employer" : "/";
  }

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-none px-4 sm:px-6 lg:px-10">
      <div className="flex items-center justify-between rounded-xl border border-white/70 bg-white/85 px-4 py-2 shadow-[0_14px_40px_rgba(37,99,255,0.1)] backdrop-blur-xl sm:px-5">
        <Link
          className="shrink-0 text-base font-black tracking-tight text-slate-950"
          href={role === "employer" ? "/?role=employer" : "/"}
        >
          <span className="text-[#2563ff]">Media</span>Hire
        </Link>

        <nav className="hidden items-center gap-5 text-xs font-semibold text-slate-600 lg:flex">
          {navLinks.map((link) => (
            <Link
              className={`transition duration-200 hover:-translate-y-0.5 hover:text-[#2563ff] ${
                activeItem === link.label ? "text-[#2563ff]" : ""
              }`}
              href={link.href}
              key={link.label}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            aria-label="Search"
            className="hidden h-8 w-8 place-items-center rounded-full text-slate-500 transition hover:bg-[#eef4ff] hover:text-[#2563ff] sm:grid"
            href={role === "employer" ? "/search-cv" : "/search-job"}
          >
            <Search size={16} />
          </Link>

          <Link
            aria-label="Notifications"
            className="hidden h-8 w-8 place-items-center rounded-full text-slate-500 transition hover:bg-[#eef4ff] hover:text-[#2563ff] sm:grid"
            href={`/auth-required?feature=notifications&role=${role}`}
          >
            <Bell size={16} />
          </Link>

          <div className="hidden rounded-full bg-slate-100 p-1 text-[11px] font-black text-slate-600 md:grid md:grid-cols-2">
            {(["jobseeker", "employer"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleRoleChange(item)}
                className={`rounded-full px-2.5 py-1.5 transition ${
                  role === item
                    ? "bg-white text-[#2563ff] shadow-sm"
                    : "hover:text-slate-950"
                }`}
              >
                {item === "jobseeker" ? "Job Seeker" : "Employer"}
              </button>
            ))}
          </div>

          <Link
            className="hidden rounded-full px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-[#eef4ff] hover:text-[#2563ff] md:inline-flex"
            href={loginHref}
          >
            Login
          </Link>

          <Link
            className="rounded-full bg-[#2563ff] px-3.5 py-1.5 text-xs font-black text-white shadow-[0_12px_24px_rgba(37,99,255,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0f52f5]"
            href={signupHref}
          >
            Sign Up
          </Link>

          <button
            aria-label="Open menu"
            className="grid h-9 w-9 place-items-center rounded-full text-slate-600 transition hover:bg-[#eef4ff] lg:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
