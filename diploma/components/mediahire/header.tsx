import Link from "next/link";
import { Bell, Menu, UserRound } from "lucide-react";
import { navLinks } from "./data";

const publicNavHref: Record<string, string> = {
  Home: "/",
  "Search Job": "/search-job",
  "My Profile": "/guest/my-profile",
  Community: "/guest/community",
};

export function Header() {
  return (
    <header className="sticky top-4 z-50 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-[0_18px_55px_rgba(37,99,255,0.12)] backdrop-blur-xl sm:px-6">
        <Link className="text-lg font-black tracking-tight text-slate-950" href="/">
          <span className="text-[#2563ff]">Media</span>Hire
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 lg:flex">
          {navLinks.map((link) => (
            <Link
              className="transition duration-200 hover:-translate-y-0.5 hover:text-[#2563ff]"
              href={publicNavHref[link] ?? "/"}
              key={link}
            >
              {link}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            aria-label="Notifications"
            className="hidden h-10 w-10 place-items-center rounded-full text-slate-500 transition hover:bg-[#eef4ff] hover:text-[#2563ff] sm:grid"
          >
            <Bell size={18} />
          </button>
          <a
            className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-[#eef4ff] hover:text-[#2563ff] md:inline-flex"
            href="#"
          >
            <UserRound size={16} />
            Join
          </a>
          <Link
            className="rounded-full bg-[#2563ff] px-5 py-2.5 text-sm font-black text-white shadow-[0_14px_30px_rgba(37,99,255,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0f52f5]"
            href="/signup"
          >
            Sign Up
          </Link>
          <button
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-full text-slate-600 transition hover:bg-[#eef4ff] lg:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
