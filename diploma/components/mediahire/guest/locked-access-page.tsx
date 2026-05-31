import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { Header, type PublicRole } from "@/components/mediahire/header";

type LockedAccessPageProps = {
  activeItem?: string;
  message: string;
  role?: PublicRole;
  title: string;
};

export function LockedAccessPage({
  activeItem,
  message,
  role = "jobseeker",
  title,
}: LockedAccessPageProps) {
  const backHref = role === "employer" ? "/?role=employer" : "/";
  const loginHref = role === "employer" ? "/login/employer" : "/login/jobseeker";
  const signupHref =
    role === "employer" ? "/signup/employer" : "/signup/jobseeker";

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <div className="bg-[#eaf3ff] pt-4">
        <Header activeItem={activeItem} role={role} />
      </div>

      <section className="mx-auto grid min-h-[calc(100vh-92px)] w-full max-w-6xl place-items-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white px-5 py-8 text-center shadow-[0_18px_55px_rgba(15,23,42,0.08)] md:px-8">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-600">
            <LockKeyhole className="h-6 w-6" />
          </span>
          <h1 className="mt-5 text-2xl font-black tracking-tight text-slate-950 md:text-[28px]">
            {title}
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-sm font-bold leading-6 text-slate-500">
            {message}
          </p>
          <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">
            <Link
              className="inline-flex h-10 min-w-[120px] items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700"
              href={loginHref}
            >
              Login
            </Link>
            <Link
              className="inline-flex h-10 min-w-[120px] items-center justify-center rounded-xl border border-blue-600 bg-white px-5 text-sm font-black text-blue-600 transition hover:bg-blue-50"
              href={signupHref}
            >
              Sign Up
            </Link>
          </div>

          <Link
            className="mt-5 inline-flex items-center justify-center text-xs font-black text-slate-500 transition hover:text-blue-600"
            href={backHref}
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
