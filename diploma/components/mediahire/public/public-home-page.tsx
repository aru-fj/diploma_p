"use client";

import { useEffect, useState } from "react";
import { EmployerCta } from "@/components/mediahire/employer-cta";
import { Footer } from "@/components/mediahire/footer";
import { Header, type PublicRole } from "@/components/mediahire/header";
import { HeroSection } from "@/components/mediahire/hero-section";
import { PublicWorksSection } from "@/components/mediahire/public/public-works-section";

export function PublicHomePage() {
  const [role, setRole] = useState<PublicRole>("jobseeker");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRole(params.get("role") === "employer" ? "employer" : "jobseeker");
  }, []);

  function handleRoleChange(nextRole: PublicRole) {
    setRole(nextRole);
    window.history.replaceState(
      null,
      "",
      nextRole === "employer" ? "/?role=employer" : "/",
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <div className="bg-[#eaf3ff]">
        <Header role={role} onRoleChange={handleRoleChange} />
        <HeroSection role={role} />
      </div>

      <PublicWorksSection role={role} />
      {role === "jobseeker" && <EmployerCta />}
      {role === "employer" && <EmployerPublicCta />}
      <Footer role={role} />
    </main>
  );
}

function EmployerPublicCta() {
  return (
    <section className="bg-[#eaf2ff]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/70 bg-white p-8 text-center shadow-[0_24px_80px_rgba(37,99,255,0.08)] md:p-12">
          <p className="mx-auto mb-4 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-600">
            Employer access
          </p>
          <h2 className="text-4xl font-black tracking-tight text-slate-950">
            Ready to post a job?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-slate-500">
            Public visitors can browse candidates and projects. To post jobs,
            review applications, save candidates, or send messages, create an
            employer account.
          </p>
          <a
            href="/auth-required?feature=post-job&role=employer"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-2xl bg-blue-600 px-8 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Post a job
          </a>
        </div>
      </div>
    </section>
  );
}
