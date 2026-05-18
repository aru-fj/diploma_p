import Image from "next/image";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { MotionSection } from "./motion-section";

export function EmployerCta() {
  return (
    <MotionSection className="bg-[#eaf2ff]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[#eaf2ff] px-6 shadow-[0_24px_80px_rgba(37,99,255,0.08)] sm:px-12 lg:px-16">
          <div className="pointer-events-none absolute -left-20 top-8 h-64 w-[520px] rounded-[50%] border border-slate-300/60" />
          <div className="pointer-events-none absolute right-4 top-10 h-56 w-[560px] rotate-[-8deg] rounded-[50%] border border-slate-300/70" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-[720px] rotate-[8deg] rounded-[50%] border border-slate-300/50" />
          <div className="absolute -right-10 bottom-4 h-44 w-44 rounded-full bg-[#2563ff]/10 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
            <div className="py-14 text-center lg:text-left">
              <p className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-black text-[#2563ff] shadow-sm lg:mx-0">
                <BriefcaseBusiness size={16} />
                Employer tools
              </p>
              <h2 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Are you employer?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 lg:mx-0">
                Find creative specialists, review portfolios, and publish roles
                for designers, photographers, editors, and media teams with a
                polished hiring workflow.
              </p>
              <a
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563ff] px-9 py-3.5 text-sm font-black text-white shadow-[0_15px_32px_rgba(37,99,255,0.25)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0f52f5]"
                href="#"
              >
                Post a job
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="relative mx-auto h-[360px] w-full max-w-md self-end">
              <Image
                alt="Employer holding a tablet"
                className="object-contain object-bottom drop-shadow-[0_26px_40px_rgba(15,23,42,0.16)]"
                fill
                sizes="(max-width: 1024px) 80vw, 36vw"
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=90"
              />
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
