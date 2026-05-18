import Image from "next/image";
import type { ReactNode } from "react";
import {
  BadgeCheck,
  BriefcaseBusiness,
  ChevronDown,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import { avatars } from "./data";
import { MotionDiv, MotionSection } from "./motion-section";
import {
  slideInLeft,
  mediaHireMotion,
} from "./ui/design-system";

export function HeroSection() {
  return (
    <section className="-mt-20 overflow-hidden bg-[#eaf2ff] pt-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 md:pb-20 lg:grid-cols-[1fr_0.94fr] lg:px-8 lg:pb-24 lg:pt-16">
        <MotionDiv
          className="relative z-10 mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
          animate="show"
          initial="hidden"
          transition={mediaHireMotion.slowPanel}
          variants={slideInLeft}
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-bold text-[#2563ff] shadow-sm backdrop-blur">
            <Sparkles size={16} />
            Creative careers, curated
          </p>
          <h1 className="text-[3.35rem] font-black leading-[0.96] tracking-tight text-slate-950 sm:text-7xl lg:text-[5.6rem]">
            Your Future Starts with{" "}
            <span className="text-[#2563ff]">MEDIAHIRE!</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg lg:mx-0">
            Discover jobs that match your skills and passion. Explore media
            projects, creative teams, and portfolio opportunities in one place.
          </p>

          <div className="mt-8 rounded-2xl border border-white/80 bg-white p-2 shadow-[0_24px_70px_rgba(37,99,255,0.16)]">
            <div className="grid gap-2 md:grid-cols-[1fr_0.8fr_auto]">
              <label className="flex items-center gap-3 rounded-xl bg-[#f5f7fb] px-4 py-3.5 text-sm text-slate-500">
                <Search size={18} className="text-slate-400" />
                <input
                  className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                  placeholder="Job title or keywords"
                  type="text"
                />
              </label>
              <button className="flex items-center justify-between gap-3 rounded-xl bg-[#f5f7fb] px-4 py-3.5 text-left text-sm font-semibold text-slate-500 transition hover:bg-[#edf3ff]">
                <span className="inline-flex items-center gap-3">
                  <MapPin size={18} className="text-slate-400" />
                  Location
                </span>
                <ChevronDown size={16} />
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563ff] px-8 py-3.5 text-sm font-black text-white shadow-[0_15px_32px_rgba(37,99,255,0.26)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0f52f5]">
                <Search size={18} />
                Search
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <div className="flex -space-x-3">
              {avatars.map((avatar, index) => (
                <Image
                  alt=""
                  className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
                  height={40}
                  key={avatar}
                  priority={index === 0}
                  src={avatar}
                  width={40}
                />
              ))}
            </div>
            <p className="text-sm font-semibold text-slate-600">
              Over <span className="font-black text-[#2563ff]">100k</span>{" "}
              jobseekers are successfully hired
            </p>
          </div>
        </MotionDiv>

        <MotionSection
          className="relative mx-auto h-[470px] w-full max-w-[560px] lg:h-[590px]"
          delay={0.1}
        >
          <div className="absolute -right-6 top-6 h-36 w-36 rounded-full bg-[#2563ff]/10 blur-3xl" />
          <div className="absolute -left-10 bottom-10 h-44 w-44 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="absolute inset-x-7 bottom-6 top-16 rounded-full bg-white/80 shadow-inner" />

          <Image
            alt="Smiling creative professional"
            className="absolute bottom-0 left-1/2 z-10 h-[91%] w-[78%] -translate-x-1/2 rounded-b-[190px] object-cover object-top shadow-[0_35px_80px_rgba(15,23,42,0.12)]"
            height={860}
            priority
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=90"
            width={700}
          />

          <FloatingCard className="left-2 top-28 max-sm:left-0 max-sm:top-36">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#edf4ff] text-[#2563ff]">
              <BriefcaseBusiness size={19} />
            </span>
            <span>
              <strong className="block text-base text-slate-950">1k</strong>
              <span className="text-xs font-semibold text-slate-500">
                Assisted Candidates
              </span>
            </span>
          </FloatingCard>

          <FloatingCard className="right-0 top-24 max-sm:right-0 max-sm:top-12">
            <span className="grid h-14 w-14 place-items-center rounded-full border-4 border-[#dbe8ff] text-sm font-black text-[#2563ff]">
              15k
            </span>
            <span>
              <strong className="block text-base text-slate-950">
                Successful Hires
              </strong>
              <span className="text-xs font-semibold text-slate-500">
                media specialists
              </span>
            </span>
          </FloatingCard>

          <FloatingCard className="bottom-16 left-1/2 -translate-x-1/2">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-100 text-amber-500">
              <BadgeCheck size={20} />
            </span>
            <span>
              <strong className="block text-base text-slate-950">
                Congratulations
              </strong>
              <span className="text-xs font-semibold text-slate-500">
                You have been hired
              </span>
            </span>
          </FloatingCard>
        </MotionSection>
      </div>
    </section>
  );
}

function FloatingCard({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <div
      className={`absolute z-20 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-[0_20px_55px_rgba(37,99,255,0.18)] backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}
