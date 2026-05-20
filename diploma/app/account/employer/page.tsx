import Link from "next/link";
import { Building2, CircleHelp, LogOut, Settings, UserCog } from "lucide-react";

export default function EmployerAccountPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1320px] gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="flex min-h-[calc(100vh-3rem)] flex-col rounded-[2rem] border border-slate-100 bg-white p-5 shadow-[0_22px_70px_rgba(15,23,42,0.06)]">
          <Link className="flex items-center gap-3" href="/account/employer">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#252525] text-white shadow-[0_16px_36px_rgba(15,23,42,0.18)]">
              <span className="text-2xl font-black leading-none">M</span>
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-black text-slate-950">
                <span className="text-[#0B63E5]">Media</span>Hire
              </span>
              <span className="block text-[11px] font-bold text-slate-400">
                Employer
              </span>
            </span>
          </Link>

          <p className="mt-10 px-4 text-xs font-bold text-slate-400">Main</p>
          <nav className="mt-3 grid gap-2">
            <Link
              className="flex h-12 items-center gap-3 rounded-2xl bg-[#252525] px-4 text-sm font-black text-white shadow-[0_16px_34px_rgba(15,23,42,0.18)]"
              href="/account/employer"
            >
              <Building2 size={18} />
              Dashboard
            </Link>
            <Link
              className="flex h-12 items-center gap-3 rounded-2xl px-4 text-sm font-black text-slate-600 transition hover:bg-slate-100"
              href="/signup/employer/company-details"
            >
              <UserCog size={18} />
              Company Details
            </Link>
            <Link
              className="flex h-12 items-center gap-3 rounded-2xl px-4 text-sm font-black text-slate-600 transition hover:bg-slate-100"
              href="/settings/employer"
            >
              <Settings size={18} />
              Settings
            </Link>
          </nav>

          <div className="mt-auto grid gap-2 border-t border-slate-100 pt-5">
            <Link
              className="flex h-12 items-center gap-3 rounded-2xl px-4 text-sm font-black text-red-500 transition hover:bg-red-50"
              href="/"
            >
              <LogOut size={18} />
              Log out
            </Link>
            <Link
              className="flex h-12 items-center gap-3 rounded-2xl px-4 text-sm font-black text-slate-500 transition hover:bg-slate-100"
              href="#help"
            >
              <CircleHelp size={18} />
              Help
            </Link>
          </div>
        </aside>

        <section className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_22px_70px_rgba(15,23,42,0.06)] sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#0B63E5]">
            Employer account
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-slate-500">
            Your employer authentication is ready. Company details, job posts,
            candidates, and hiring activity can be managed from this account area.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["Company profile", "Job posts", "Applications"].map((item) => (
              <div
                className="rounded-3xl border border-slate-100 bg-[#f8fafc] p-5"
                key={item}
              >
                <p className="text-sm font-black text-slate-950">{item}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                  Connected to your employer account.
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
