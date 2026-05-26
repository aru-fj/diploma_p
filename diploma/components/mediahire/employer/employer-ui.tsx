"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Bookmark, BriefcaseBusiness, ChevronDown, HelpCircle, LogOut, MessageCircle, Search, Settings, Star, UserRound } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

import {
  getEmployerProfile,
  type EmployerCandidate,
  type EmployerProject,
} from "./employer-store";

const nav = [
  { href: "/home/employer", label: "Home" },
  { href: "/home/employer/posted-jobs", label: "Posted Jobs" },
  { href: "/home/employer/search-cv", label: "Search CV" },
  { href: "/home/employer/community", label: "Community" },
];

const sidebar = [
  { href: "/home/employer/hired-specialists", label: "Hired Specialists", icon: UserRound },
  { href: "/home/employer/favorites", label: "Favorites", icon: Star },
  { href: "/home/employer/account-settings", label: "Account Setting", icon: BriefcaseBusiness },
  { href: "/home/employer/settings", label: "Settings", icon: Settings },
];

function useEmployerProfile() {
  const [profile, setProfile] = useState(() => getEmployerProfile());

  useEffect(() => {
    const sync = () => setProfile(getEmployerProfile());
    sync();
    window.addEventListener("mediahire:employer-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("mediahire:employer-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return profile;
}

export function EmployerHeader({ active = "Home" }: { active?: string }) {
  const profile = useEmployerProfile();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function logout() {
    router.push("/");
  }

  return (
    <header className="relative z-50 mx-auto flex min-h-[68px] w-full max-w-6xl items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/95 px-4 py-3 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur sm:px-6">
      <Link className="shrink-0 text-xl font-black tracking-tight" href="/home/employer">
        <span className="text-[#0B63E5]">Media</span>
        <span className="text-slate-950">Hire</span>
      </Link>
      <nav className="hidden items-center gap-8 lg:flex">
        {nav.map((item) => (
          <Link
            className={`text-sm font-black transition hover:text-[#0B63E5] ${active === item.label ? "text-[#0B63E5]" : "text-slate-600"}`}
            href={item.href}
            key={item.label}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex shrink-0 items-center gap-4 text-slate-600">
        <button aria-label="Search" className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-[#eef4ff] hover:text-[#0B63E5]" type="button">
          <Search size={18} />
        </button>
        <button aria-label="Notifications" className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-[#eef4ff] hover:text-[#0B63E5]" type="button">
          <Bell size={18} />
        </button>
        <span className="hidden h-9 w-px bg-slate-200 sm:block" />
        <span className="hidden text-sm font-black text-slate-600 sm:block">Employer</span>
        <Link className="hidden h-10 items-center rounded-xl bg-[#0B63E5] px-4 text-sm font-black text-white transition hover:bg-[#0958cc] xl:inline-flex" href="/home/employer/post-job">
          Post a job
        </Link>
        <div className="relative">
          <button
            className="inline-flex min-h-12 items-center gap-3 rounded-2xl px-2.5 py-1.5 text-sm font-black text-slate-700 transition hover:bg-[#eef4ff]"
            onClick={() => setOpen((current) => !current)}
            type="button"
          >
            <span className="relative block h-10 w-10 overflow-hidden rounded-full ring-2 ring-white">
              <Image alt={profile.companyName} className="h-full w-full object-cover" height={40} src={profile.avatar} unoptimized={profile.avatar.startsWith("data:")} width={40} />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
            </span>
            <span className="hidden max-w-[150px] truncate text-sm font-black text-slate-700 md:block">{profile.companyName}</span>
            <ChevronDown className={`text-[#0B63E5] transition ${open ? "rotate-180" : ""}`} size={16} />
          </button>
          <AnimatePresence>
            {open ? (
              <motion.div animate={{ opacity: 1, y: 0 }} className="absolute right-0 top-14 z-50 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_22px_70px_rgba(15,23,42,0.16)]" exit={{ opacity: 0, y: -8 }} initial={{ opacity: 0, y: -8 }}>
                {[...sidebar].map((item) => (
                  <Link className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-black text-slate-700 transition hover:bg-[#eef4ff] hover:text-[#0B63E5]" href={item.href} key={item.label}>
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                ))}
                <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-black text-red-600 transition hover:bg-red-50" onClick={logout} type="button">
                  <LogOut size={18} />
                  Log out
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

export function EmployerFooter() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-[min(1320px,calc(100%-32px))] gap-10 py-12 md:grid-cols-4">
        <div>
          <h3 className="text-3xl font-black tracking-tight"><span className="text-[#0B63E5]">Media</span><span>Hire</span></h3>
          <p className="mt-4 max-w-xs text-sm font-medium leading-6 text-slate-500">MediaHire helps employers find creative specialists, review portfolios, publish jobs, and manage hiring conversations in one clean platform.</p>
        </div>
        {[
          ["Our services", "Post job", "Search CV", "Manage applications", "Hiring plan"],
          ["Links", "Blog", "Help center", "Contact us", "Privacy Policy"],
          ["Contact Us", "Instagram  WhatsApp", "1500 Marilla St, Dallas, TX 75201", "1(647)558-5560"],
        ].map((column) => (
          <div key={column[0]}>
            <h4 className="text-sm font-black text-slate-950">{column[0]}</h4>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-500">
              {column.slice(1).map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}

export function EmployerShell({ active, children }: { active?: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <div className="px-4 pt-8 sm:px-6">
        <EmployerHeader active={active} />
      </div>
      {children}
      <EmployerFooter />
    </main>
  );
}

export function EmployerDashboardShell({ active, children, title, subtitle }: { active: string; children: ReactNode; subtitle: string; title: string }) {
  const profile = useEmployerProfile();
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-[#f5f7fb] p-4 text-slate-950 md:p-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="flex min-h-[calc(100vh-4rem)] flex-col rounded-3xl bg-white p-6 shadow-sm">
          <Link className="text-2xl font-black tracking-tight" href="/home/employer">
            <span className="text-[#0B63E5]">Media</span>Hire
          </Link>
          <p className="mt-1 text-sm font-semibold text-slate-400">Employer Dashboard</p>
          <nav className="mt-10 grid gap-2">
            {sidebar.map((item) => (
              <Link className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition ${active === item.label || pathname === item.href ? "bg-slate-100 text-slate-950" : "text-slate-500 hover:bg-[#eef4ff] hover:text-[#0B63E5]"}`} href={item.href} key={item.label}>
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto grid gap-2">
            <Link className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black text-red-600 hover:bg-red-50" href="/">
              <LogOut size={18} />
              Log out
            </Link>
            <button className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black text-slate-500 hover:bg-slate-50" type="button">
              <HelpCircle size={18} />
              Help
            </button>
          </div>
        </aside>
        <section>
          <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight">{title}</h1>
              <p className="mt-2 text-sm font-semibold text-slate-500">{subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="relative hidden sm:block">
                <input className="h-12 w-72 rounded-2xl border border-slate-200 bg-white px-4 pr-11 text-sm font-semibold outline-none focus:border-[#0B63E5]" placeholder="Search" />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2" size={18} />
              </label>
              <Image alt={profile.companyName} className="h-12 w-12 rounded-2xl object-cover" height={48} src={profile.avatar} unoptimized={profile.avatar.startsWith("data:")} width={48} />
              <div className="hidden sm:block">
                <p className="text-sm font-black">{profile.companyName}</p>
                <p className="text-xs font-semibold text-slate-400">{profile.email}</p>
              </div>
            </div>
          </header>
          <div className="mt-8">{children}</div>
        </section>
      </div>
    </main>
  );
}

export function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star className={index < Math.round(value) ? "fill-current" : "text-slate-200"} key={index} size={16} />
      ))}
    </div>
  );
}

export function ProjectCard({ onSave, project, saved }: { onSave: () => void; project: EmployerProject; saved: boolean }) {
  return (
    <article className="group rounded-3xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
        <Image alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" height={360} src={project.image} width={520} />
        <button className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full ${saved ? "bg-[#0B63E5] text-white" : "bg-white text-[#0B63E5]"}`} onClick={onSave} type="button">
          <Bookmark size={18} />
        </button>
      </div>
      <div className="mt-4">
        <p className="text-xs font-black text-[#0B63E5]">{project.category}</p>
        <h3 className="mt-1 text-lg font-black">{project.title}</h3>
        <p className="mt-1 text-sm font-bold text-slate-500">{project.authorName}</p>
        <Link className="mt-4 inline-flex h-10 items-center rounded-xl bg-[#0B63E5] px-4 text-sm font-black text-white" href={`/home/employer/projects/${project.id}`}>View Details</Link>
      </div>
    </article>
  );
}

export function CandidateCard({ candidate, onMessage, onSave, saved }: { candidate: EmployerCandidate; onMessage: () => void; onSave: () => void; saved: boolean }) {
  return (
    <article className="rounded-3xl border border-[#0B63E5]/30 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <button className={`ml-auto grid h-9 w-9 place-items-center rounded-full ${saved ? "bg-[#0B63E5] text-white" : "bg-[#eef4ff] text-[#0B63E5]"}`} onClick={onSave} type="button"><Bookmark size={17} /></button>
      <Image alt={candidate.name} className="mx-auto h-20 w-20 rounded-2xl object-cover" height={80} src={candidate.avatar} width={80} />
      <h3 className="mt-3 text-lg font-black">{candidate.name}</h3>
      <p className="text-sm font-semibold text-slate-500">{candidate.role}</p>
      <div className="mt-3 flex justify-center"><StarRating value={candidate.rating} /></div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {candidate.skills.slice(0, 3).map((skill) => <span className="rounded-full bg-[#eef4ff] px-3 py-1 text-xs font-black text-[#0B63E5]" key={skill}>{skill}</span>)}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {candidate.portfolio.slice(0, 3).map((project) => <Image alt={project.title} className="h-16 w-full rounded-xl object-cover" height={64} key={project.id} src={project.image} width={90} />)}
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <Link className="inline-flex h-10 items-center justify-center rounded-xl border border-[#0B63E5] text-sm font-black text-[#0B63E5]" href={`/home/employer/people/${candidate.id}`}>View Details</Link>
        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#0B63E5] text-sm font-black text-white" onClick={onMessage} type="button">
          <MessageCircle size={16} />
          Message
        </button>
      </div>
    </article>
  );
}
