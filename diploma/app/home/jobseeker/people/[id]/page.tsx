/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bell,
  Briefcase,
  ChevronDown,
  Globe2,
  Mail,
  MapPin,
  Plus,
  Search,
  UserRound,
} from "lucide-react";

import { specialists } from "@/lib/mediahire/specialists";

type PublicSpecialistProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PublicSpecialistProfilePage({
  params,
}: PublicSpecialistProfilePageProps) {
  const { id } = await params;

  const specialist = specialists.find((item) => item.id === id);

  if (!specialist) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F3F6FB] text-slate-950">
      <section
        className="h-[285px] w-full bg-cover bg-center pt-6"
        style={{
          backgroundImage: `url(${specialist.cover})`,
        }}
      >
        <header className="mx-auto max-w-[960px] px-4">
          <div className="flex items-center justify-between rounded-2xl border border-white/70 bg-white/90 px-5 py-3 shadow-[0_18px_55px_rgba(37,99,255,0.12)] backdrop-blur-xl">
            <Link
              className="text-lg font-black tracking-tight text-slate-950"
              href="/home/jobseeker"
            >
              <span className="text-[#2563ff]">Media</span>Hire
            </Link>

            <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 lg:flex">
              <Link
                className="text-[#2563ff] transition hover:text-[#2563ff]"
                href="/home/jobseeker"
              >
                Home
              </Link>

              <Link
                className="transition hover:text-[#2563ff]"
                href="/dashboard/jobseeker/search-job"
              >
                Search Job
              </Link>

              <Link
                className="transition hover:text-[#2563ff]"
                href="/dashboard/jobseeker/my-profile"
              >
                My Profile
              </Link>

              <Link
                className="transition hover:text-[#2563ff]"
                href="/dashboard/jobseeker/community"
              >
                Community
              </Link>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                aria-label="Search"
                className="hidden h-10 w-10 place-items-center rounded-full text-slate-500 transition hover:bg-[#eef4ff] hover:text-[#2563ff] sm:grid"
                type="button"
              >
                <Search size={18} />
              </button>

              <button
                aria-label="Notifications"
                className="hidden h-10 w-10 place-items-center rounded-full text-slate-500 transition hover:bg-[#eef4ff] hover:text-[#2563ff] sm:grid"
                type="button"
              >
                <Bell size={18} />
              </button>

              <span className="hidden h-8 w-px bg-slate-200 md:block" />

              <span className="hidden rounded-full px-3 py-2 text-sm font-bold text-slate-600 md:inline-flex">
                Job Seeker
              </span>

              <div className="flex items-center gap-2 rounded-full px-2 py-1 text-sm font-bold text-slate-600 transition hover:bg-[#eef4ff]">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=90"
                    alt="aisha aa"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-white bg-green-500" />
                </div>

                <span className="hidden md:inline">aisha aa</span>
                <ChevronDown size={16} className="text-[#2563ff]" />
              </div>
            </div>
          </div>
        </header>
      </section>

      <section className="mx-auto grid max-w-[930px] grid-cols-1 gap-10 px-5 pb-20 md:grid-cols-[230px_1fr]">
        <aside className="-mt-[52px]">
          <div className="mb-5 inline-flex rounded-2xl border-[7px] border-white bg-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.5)]">
            <img
              src={specialist.avatar}
              alt={specialist.name}
              className="h-[96px] w-[96px] rounded-xl object-cover"
            />
          </div>

          <h1 className="text-[24px] font-black leading-tight text-black">
            {specialist.name}
          </h1>

          <p className="mt-2 text-sm font-semibold text-slate-500">
            {specialist.status}
          </p>

          <div className="mt-7 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF]">
                <MapPin size={18} className="text-[#0B63E5]" strokeWidth={2.4} />
              </div>

              <span className="text-sm font-bold leading-snug text-slate-600">
                {specialist.location}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF]">
                <Mail size={18} className="text-[#0B63E5]" strokeWidth={2.4} />
              </div>

              <span className="break-all text-sm font-bold leading-snug text-slate-600">
                {specialist.email}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF]">
                <UserRound
                  size={18}
                  className="text-[#0B63E5]"
                  strokeWidth={2.4}
                />
              </div>

              <span className="text-sm font-bold leading-snug text-slate-600">
                {specialist.role}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF]">
                <Briefcase
                  size={18}
                  className="text-[#0B63E5]"
                  strokeWidth={2.4}
                />
              </div>

              <span className="text-sm font-bold leading-snug text-slate-600">
                {specialist.experience}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF]">
                <Globe2
                  size={18}
                  className="text-[#0B63E5]"
                  strokeWidth={2.4}
                />
              </div>

              <span className="text-sm font-bold leading-snug text-slate-600">
                Portfolio available
              </span>
            </div>
          </div>

          <div className="mt-7 space-y-2">
            <button
              className="flex h-9 w-full items-center justify-center gap-2 rounded-full bg-[#0B63E5] text-sm font-black text-white transition hover:bg-[#0758cf]"
              type="button"
            >
              <Plus size={18} />
              Save
            </button>

            <button
              className="flex h-9 w-full items-center justify-center gap-2 rounded-full border border-[#0B63E5] bg-[#EAF3FF] text-sm font-black text-slate-800 transition hover:bg-[#DDEEFF]"
              type="button"
            >
              <Mail size={16} />
              Message
            </button>
          </div>

          <div className="mt-14">
            <h2 className="mb-4 text-[22px] font-black text-black">Skills</h2>

            <div className="flex flex-wrap gap-2">
              {specialist.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex w-fit max-w-full shrink-0 rounded-full border border-[#C9D3E2] bg-white px-3.5 py-2 text-xs font-bold leading-none text-slate-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="mb-4 text-[22px] font-black text-black">
              Software
            </h2>

            <div className="flex flex-wrap gap-2">
              {specialist.software.map((item) => (
                <span
                  key={item}
                  className="inline-flex w-fit max-w-full shrink-0 rounded-full border border-[#C9D3E2] bg-white px-3.5 py-2 text-xs font-bold leading-none text-slate-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </aside>

        <section className="pt-9">
          <div className="mb-7 flex gap-12 border-b border-slate-200">
            <button
              className="border-b-2 border-[#0B63E5] px-3 pb-3 text-base font-black text-[#0B63E5]"
              type="button"
            >
              Portfolio
            </button>

            <button
              className="px-3 pb-3 text-base font-black text-slate-400"
              type="button"
            >
              Reviews
            </button>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
            {specialist.projects.map((project) => (
              <article
                key={project.title}
                className="group rounded-2xl bg-white p-2.5 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-[0_22px_50px_-28px_rgba(15,23,42,0.55)]"
              >
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-[175px] w-full rounded-xl object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-3 text-base font-black leading-tight text-slate-950 transition group-hover:text-[#0B63E5]">
                  {project.title}
                </h3>

                <p className="mt-1.5 text-sm font-semibold text-slate-500">
                  {specialist.name}
                </p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <footer className="mt-10 border-t border-slate-200 bg-white px-8 py-12">
        <div className="mx-auto grid max-w-[1040px] grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <h2 className="mb-5 text-3xl font-black">
              <span className="text-[#0B63E5]">Media</span>
              <span className="text-slate-950">Hire</span>
            </h2>

            <p className="text-sm leading-6 text-slate-600">
              MediaHire is a smart job search and recruitment platform that
              connects job seekers with employers. With fast search,
              professional resume building, and intelligent matching, MediaHire
              makes hiring and job hunting easy and efficient.
            </p>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-slate-950">Our services</h3>
            <div className="space-y-3 text-sm text-slate-600">
              <p>Find job</p>
              <p>Create resume</p>
              <p>Search company</p>
              <p>Pricing Plan</p>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-slate-950">Links</h3>
            <div className="space-y-3 text-sm text-slate-600">
              <p>Blog</p>
              <p>Help center</p>
              <p>Contact us</p>
              <p>Privacy Policy</p>
              <p>About us</p>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-slate-950">Contact Us</h3>
            <div className="space-y-3 text-sm text-slate-600">
              <p>📷 🟢</p>
              <p>📍 1500 Marilla St, Dallas, TX 75201</p>
              <p>📞 1(647)558-5560</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}