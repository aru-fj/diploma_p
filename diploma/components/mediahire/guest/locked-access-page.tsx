import Link from "next/link";
import { LockKeyhole, Search, Bell } from "lucide-react";

type LockedAccessPageProps = {
  message: string;
  title: string;
};

export function LockedAccessPage({ message, title }: LockedAccessPageProps) {
  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-8 text-slate-950">
      <nav className="mx-auto flex min-h-[68px] w-[min(1320px,calc(100%-32px))] items-center justify-between gap-6 rounded-2xl border border-slate-200 bg-white px-7 py-3 shadow-[0_16px_45px_rgba(15,23,42,0.08)]">
        <Link className="shrink-0 text-xl font-black tracking-tight" href="/">
          <span className="text-[#0B63E5]">Media</span>
          <span className="text-slate-950">Hire</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <Link className="text-sm font-black text-[#0B63E5]" href="/">
            Home
          </Link>
          <Link className="text-sm font-black text-slate-600 hover:text-[#0B63E5]" href="/search-job">
            Search Job
          </Link>
          <Link className="text-sm font-black text-slate-600 hover:text-[#0B63E5]" href="/guest/my-profile">
            My Profile
          </Link>
          <Link className="text-sm font-black text-slate-600 hover:text-[#0B63E5]" href="/guest/community">
            Community
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-4 text-slate-600">
          <Search size={20} />
          <Bell size={19} />
          <span className="hidden h-9 w-px bg-slate-200 sm:block" />
          <span className="hidden text-sm font-black text-slate-600 sm:block">
            Job Seeker
          </span>
          <Link
            className="h-10 rounded-xl bg-[#0B63E5] px-5 text-sm font-black leading-10 text-white transition hover:bg-[#0958cc]"
            href="/signup"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      <section className="mx-auto mt-12 grid w-[min(980px,calc(100%-16px))] place-items-center rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10">
        <div className="relative w-full overflow-hidden rounded-[1.5rem] bg-[#eef4ff] p-8">
          <div className="pointer-events-none absolute inset-0 opacity-45 blur-[2px]">
            <div className="mx-auto mt-4 h-16 w-16 rounded-full bg-white" />
            <div className="mx-auto mt-5 h-5 w-56 rounded-full bg-white" />
            <div className="mx-auto mt-4 h-4 w-72 rounded-full bg-white" />
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="h-32 rounded-2xl bg-white" key={index} />
              ))}
            </div>
          </div>

          <div className="relative z-10 mx-auto max-w-xl rounded-[1.7rem] bg-white/90 p-8 text-center shadow-[0_20px_55px_rgba(15,23,42,0.12)] backdrop-blur">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#eef4ff] text-[#0B63E5]">
              <LockKeyhole size={30} />
            </span>
            <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-950">
              {title}
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base font-semibold leading-7 text-slate-500">
              {message}
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#0B63E5] px-8 text-sm font-black text-white transition hover:bg-[#0958cc]"
                href="/login/jobseeker"
              >
                Login
              </Link>
              <Link
                className="inline-flex h-12 items-center justify-center rounded-xl border border-[#0B63E5] px-8 text-sm font-black text-[#0B63E5] transition hover:bg-[#eef4ff]"
                href="/signup"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
