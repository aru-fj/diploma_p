import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { Header, type PublicRole } from "@/components/mediahire/header";

type AuthRequiredPageProps = {
  searchParams?: Promise<{
    role?: string;
  }>;
};

function resolveRole(role?: string): PublicRole {
  return role === "employer" ? "employer" : "jobseeker";
}

export default async function AuthRequiredPage({
  searchParams,
}: AuthRequiredPageProps) {
  const resolvedSearchParams = await searchParams;
  const role = resolveRole(resolvedSearchParams?.role);
  const backHref = role === "employer" ? "/?role=employer" : "/";
  const loginHref = role === "employer" ? "/login/employer" : "/login/jobseeker";
  const signupHref =
    role === "employer" ? "/signup/employer" : "/signup/jobseeker";

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <Header role={role} />

      <section className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href={backHref}
          className="mb-6 inline-flex h-10 w-fit items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white px-6 py-10 text-center shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <LockKeyhole className="h-8 w-8" />
            </div>

            <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              Sign in required
            </h1>

            <p className="mx-auto mt-4 max-w-md text-base font-bold leading-7 text-slate-500">
              Sign in or create an account to access this feature.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href={loginHref}
                className="inline-flex h-12 min-w-[140px] items-center justify-center rounded-2xl bg-blue-600 px-6 text-base font-black text-white transition hover:bg-blue-700"
              >
                Login
              </Link>

              <Link
                href={signupHref}
                className="inline-flex h-12 min-w-[140px] items-center justify-center rounded-2xl border-2 border-blue-600 bg-white px-6 text-base font-black text-blue-600 transition hover:bg-blue-50"
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
