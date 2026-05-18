import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Skills Setup | MediaHire",
};

export default function JobSeekerSkillsPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f5f7fb] px-4 py-10 text-slate-950">
      <section className="w-full max-w-xl rounded-[2rem] border border-[#0B63E5]/20 bg-white p-8 text-center shadow-[0_24px_80px_rgba(11,99,229,0.12)] sm:p-12">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#eef4ff] text-[#0B63E5]">
          <Sparkles size={30} />
        </span>
        <h1 className="mt-6 text-3xl font-black tracking-tight">
          Skills setup
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-500">
          Step 3 is ready for creative skills, interests, categories, and job
          recommendation preferences.
        </p>
        <Link
          className="mt-8 inline-flex rounded-full bg-[#0B63E5] px-6 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(11,99,229,0.24)] transition hover:-translate-y-0.5 hover:bg-[#0758cf]"
          href="/signup/jobseeker/location"
        >
          Back to location
        </Link>
      </section>
    </main>
  );
}
