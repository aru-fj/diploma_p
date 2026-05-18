"use client";

import Link from "next/link";
import type { MediaHireRole } from "@/lib/oauth";

export function RoleSwitchText({ role }: { role: MediaHireRole }) {
  const isEmployer = role === "employer";

  return (
    <p className="mt-5 text-center text-sm font-semibold text-slate-500">
      {isEmployer ? "Are You Job Seeker? " : "Are You Employer? "}
      <Link
        className="font-black text-[#0B63E5] underline-offset-4 transition hover:underline"
        href={isEmployer ? "/signup/jobseeker" : "/signup/employer"}
      >
        Click Here
      </Link>
    </p>
  );
}
