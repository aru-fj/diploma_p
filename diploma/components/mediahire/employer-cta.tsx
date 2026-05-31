import Image from "next/image";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { MotionSection } from "./motion-section";

export function EmployerCta() {
  return (
    <MotionSection className="bg-[#eaf2ff]">
      <div className="mx-auto w-full max-w-none px-4 py-10 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/70 bg-[#eaf2ff] px-5 shadow-[0_18px_60px_rgba(37,99,255,0.07)] sm:px-8 lg:px-12">
          <div className="pointer-events-none absolute -left-20 top-8 h-64 w-[520px] rounded-[50%] border border-slate-300/60" />
          <div className="pointer-events-none absolute right-4 top-10 h-56 w-[560px] rotate-[-8deg] rounded-[50%] border border-slate-300/70" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-[720px] rotate-[8deg] rounded-[50%] border border-slate-300/50" />
          <div className="absolute -right-10 bottom-4 h-44 w-44 rounded-full bg-[#2563ff]/10 blur-3xl" />

          <div className="relative grid items-center gap-6 lg:grid-cols-[1fr_0.75fr]">
            <div className="py-8 text-center lg:text-left">
              <p className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-[11px] font-black text-[#2563ff] shadow-sm lg:mx-0">
                <BriefcaseBusiness size={16} />
                Employer tools
              </p>
              <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Are you employer?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-xs leading-5 text-slate-600 lg:mx-0">
                Find creative specialists, review portfolios, and publish roles
                for designers, photographers, editors, and media teams with a
                polished hiring workflow.
              </p>
              <a
                className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#2563ff] px-6 text-xs font-black text-white shadow-[0_12px_26px_rgba(37,99,255,0.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0f52f5]"
                href="/?role=employer"
              >
                Post a job
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="relative mx-auto h-[250px] w-full max-w-xs self-center">
              <Image
                alt="Employer representative"
                className="object-contain object-center drop-shadow-[0_26px_40px_rgba(15,23,42,0.16)]"
                fill
                sizes="(max-width: 1024px) 80vw, 36vw"
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=90"
              />
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
