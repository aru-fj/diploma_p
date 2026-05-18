import type { Metadata } from "next";
import Link from "next/link";
import { UserRoundCog } from "lucide-react";

export const metadata: Metadata = {
  title: "Job Seeker Profile Setup | MediaHire",
};

export default function JobSeekerProfileSetupPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f5f7fb] px-4 py-10 text-slate-950">
      <section className="w-full max-w-xl rounded-[2rem] border border-[#0B63E5]/20 bg-white p-8 text-center shadow-[0_24px_80px_rgba(11,99,229,0.12)] sm:p-12">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#eef4ff] text-[#0B63E5]">
          <UserRoundCog size={30} />
        </span>
        <h1 className="mt-6 text-3xl font-black tracking-tight">
          Profile setup
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-500">
          Step 2 is ready for avatar, bio, skills, interests, portfolio links,
          and viewing preferences.
        </p>
        <Link
          className="mt-8 inline-flex rounded-full bg-[#0B63E5] px-6 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(11,99,229,0.24)] transition hover:-translate-y-0.5 hover:bg-[#0758cf]"
          href="/signup/jobseeker"
        >
          Back to personal information
        </Link>
      </section>
    </main>
  );
}
