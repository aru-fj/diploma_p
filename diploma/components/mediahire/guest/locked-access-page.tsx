import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { Header, type PublicRole } from "@/components/mediahire/header";

type LockedAccessPageProps = {
  message: string;
  role?: PublicRole;
  title: string;
};

export function LockedAccessPage({
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
      <Header role={role} />

      <section className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <Link
          className="mb-6 inline-flex h-10 w-fit items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          href={backHref}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white px-6 py-10 text-center shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:px-10">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <LockKeyhole className="h-8 w-8" />
            </span>
            <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              {title}
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base font-bold leading-7 text-slate-500">
              {message}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                className="inline-flex h-12 min-w-[140px] items-center justify-center rounded-2xl bg-blue-600 px-6 text-base font-black text-white transition hover:bg-blue-700"
                href={loginHref}
              >
                Login
              </Link>
              <Link
                className="inline-flex h-12 min-w-[140px] items-center justify-center rounded-2xl border-2 border-blue-600 bg-white px-6 text-base font-black text-blue-600 transition hover:bg-blue-50"
                href={signupHref}
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
