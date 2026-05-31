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
      <div className="bg-[#eaf3ff] pt-4">
        <Header role={role} />
      </div>

      <section className="mx-auto grid min-h-[calc(100vh-92px)] w-full max-w-6xl place-items-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white px-5 py-8 text-center shadow-[0_18px_55px_rgba(15,23,42,0.08)] md:px-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <LockKeyhole className="h-6 w-6" />
          </div>

          <h1 className="mt-5 text-2xl font-black tracking-tight text-slate-950 md:text-[28px]">
            Sign in required
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm font-bold leading-6 text-slate-500">
            Sign in or create an account to access this feature.
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link
              href={loginHref}
              className="inline-flex h-10 min-w-[120px] items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700"
            >
              Login
            </Link>

            <Link
              href={signupHref}
              className="inline-flex h-10 min-w-[120px] items-center justify-center rounded-xl border border-blue-600 bg-white px-5 text-sm font-black text-blue-600 transition hover:bg-blue-50"
            >
              Sign Up
            </Link>
          </div>

          <Link
            href={backHref}
            className="mt-5 inline-flex items-center justify-center text-xs font-black text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
