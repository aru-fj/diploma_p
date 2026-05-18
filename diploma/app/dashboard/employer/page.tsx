import type { Metadata } from "next";
import Link from "next/link";
import { Building2, UsersRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Employer Dashboard | MediaHire",
};

export default function EmployerDashboardPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f5f7fb] px-4 py-10 text-slate-950">
      <section className="w-full max-w-2xl rounded-[2rem] border border-[#252525]/10 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.10)] sm:p-12">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-slate-100 text-[#252525]">
          <Building2 size={30} />
        </span>
        <h1 className="mt-6 text-3xl font-black tracking-tight">
          Employer Dashboard
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-500">
          Employer login routing is ready. This dashboard can grow into company
          profile, job posting, candidate search, saved talent, analytics, and
          recruiter notifications.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#252525] px-6 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(37,37,37,0.18)] transition hover:-translate-y-0.5 hover:bg-black"
            href="/"
          >
            <UsersRound size={18} />
            Find talent
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700 transition hover:border-[#252525] hover:text-[#252525]"
            href="/login/employer"
          >
            Back to login
          </Link>
        </div>
      </section>
    </main>
  );
}
