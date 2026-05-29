"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { EmployerCta } from "@/components/mediahire/employer-cta";
import { Footer } from "@/components/mediahire/footer";
import { Header, type PublicRole } from "@/components/mediahire/header";
import { HeroSection } from "@/components/mediahire/hero-section";
import { PublicWorksSection } from "@/components/mediahire/public/public-works-section";

export function PublicHomePage() {
  const [role, setRole] = useState<PublicRole>("jobseeker");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const oauthCode = params.get("code");
    const oauthError = params.get("error");

    if (oauthCode && !oauthError) {
      let storedRole: PublicRole = "jobseeker";
      let storedMode: "login" | "signup" = "signup";

      try {
        const storedOAuth = window.localStorage.getItem("mediahire.googleOAuth");

        if (storedOAuth) {
          const parsed = JSON.parse(storedOAuth) as {
            mode?: unknown;
            role?: unknown;
          };

          storedRole = parsed.role === "employer" ? "employer" : "jobseeker";
          storedMode = parsed.mode === "login" ? "login" : "signup";
        }
      } catch {
        storedRole = "jobseeker";
        storedMode = "signup";
      }

      const callbackUrl = new URL("/auth/callback", window.location.origin);
      callbackUrl.searchParams.set("code", oauthCode);
      callbackUrl.searchParams.set("role", storedRole);
      callbackUrl.searchParams.set("mode", storedMode);

      const oauthState = params.get("state");

      if (oauthState) {
        callbackUrl.searchParams.set("state", oauthState);
      }

      window.location.replace(callbackUrl.pathname + callbackUrl.search);
      return;
    }

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
        <Header role={role} onRoleChange={handleRoleChange} activeItem="Home" />
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
        <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[#eaf2ff] px-6 shadow-[0_24px_80px_rgba(37,99,255,0.08)] sm:px-12 lg:px-16">
          <div className="pointer-events-none absolute -left-20 top-8 h-64 w-[520px] rounded-[50%] border border-slate-300/60" />
          <div className="pointer-events-none absolute right-4 top-10 h-56 w-[560px] rotate-[-8deg] rounded-[50%] border border-slate-300/70" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-[720px] rotate-[8deg] rounded-[50%] border border-slate-300/50" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
            <div className="py-14 text-center lg:text-left">
              <span className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-black text-[#2563ff] shadow-sm lg:mx-0">
                <Search className="h-4 w-4" />
                Job seeker tools
              </span>

              <h2 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Are you job seeker?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 lg:mx-0">
                Find jobs, explore creative projects, and connect with employers
                by switching back to the Job Seeker version.
              </p>
              <a
                href="/"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563ff] px-9 py-3.5 text-sm font-black text-white shadow-[0_15px_32px_rgba(37,99,255,0.25)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0f52f5]"
              >
                Find a job
                <ArrowRight className="h-[18px] w-[18px]" />
              </a>
            </div>

            <div className="relative mx-auto h-[360px] w-full max-w-md self-center">
              <Image
                alt="Job seeker switch"
                className="object-contain object-center drop-shadow-[0_26px_40px_rgba(15,23,42,0.16)]"
                fill
                sizes="(max-width: 1024px) 80vw, 36vw"
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1100&q=90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
