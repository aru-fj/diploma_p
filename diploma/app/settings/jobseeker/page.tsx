import Link from "next/link";
import type { Metadata } from "next";
import { Bell, Lock, UserRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Settings | MediaHire",
  description: "Manage your MediaHire job seeker settings.",
};

const settings = [
  {
    icon: UserRound,
    title: "Profile Preferences",
    description: "Control how your profile appears to employers and creatives.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Choose which job, message, and application updates you receive.",
  },
  {
    icon: Lock,
    title: "Security",
    description: "Prepare password, session, and account protection settings.",
  },
];

export default function JobSeekerSettingsPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-8 text-[#111827] sm:px-6 lg:px-10">
      <section className="mx-auto max-w-5xl rounded-[32px] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-10">
        <Link
          href="/home/jobseeker"
          className="text-sm font-semibold text-[#0B63E5] transition hover:text-[#084fb8]"
        >
          Back to Home
        </Link>

        <div className="mt-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#0B63E5]">
            MediaHire Settings
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Settings
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-500">
            This page is ready for account preferences, notification controls,
            and security settings.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {settings.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-3xl border border-slate-200 bg-[#f8fbff] p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0B63E5]">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-xl font-bold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
