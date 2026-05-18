"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Clapperboard,
  Lightbulb,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";
import { BackButton } from "./back-button";
import {
  BlenderSticker,
  FloatingDecoration,
  MagazineSticker,
} from "./floating-decoration";
import { OnboardingLogo } from "./logo";
import { RoleCard, type RoleType } from "./role-card";

const routeByRole: Record<RoleType, string> = {
  jobseeker: "/login/jobseeker",
  employer: "/login/employer",
};

const roles = [
  {
    description: "Job Seeker profile",
    icon: UserRound,
    role: "jobseeker" as const,
    title: "I'm looking for a job",
  },
  {
    description: "Employer profile",
    icon: Building2,
    role: "employer" as const,
    title: "I'm looking for employees",
  },
];

export function RoleSelectionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);

  function handleContinue() {
    if (!selectedRole) {
      return;
    }

    router.push(routeByRole[selectedRole]);
  }

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#f5f7fb] px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_18%,rgba(37,99,255,0.08),transparent_34%),radial-gradient(circle_at_74%_78%,rgba(96,165,250,0.10),transparent_28%)]" />

      <FloatingDecoration className="bottom-[23%] left-[22%]" delay={0.15} rotate={-8}>
        <BlenderSticker />
      </FloatingDecoration>
      <FloatingDecoration className="bottom-[17%] left-[25%]" delay={0.35} rotate={-16}>
        <div className="rounded-xl bg-slate-950 p-2 text-white shadow-[0_18px_35px_rgba(15,23,42,0.24)]">
          <Clapperboard size={58} strokeWidth={1.8} />
        </div>
      </FloatingDecoration>
      <FloatingDecoration className="right-[23%] top-[22%]" delay={0.2} rotate={12}>
        <MagazineSticker />
      </FloatingDecoration>
      <FloatingDecoration className="right-[18%] top-[27%]" delay={0.45} rotate={9}>
        <div className="grid h-24 w-24 place-items-center rounded-full bg-white text-amber-400 shadow-[0_22px_45px_rgba(15,23,42,0.16)]">
          <Lightbulb size={55} strokeWidth={1.5} />
        </div>
      </FloatingDecoration>

      <motion.section
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative z-10 m-auto w-full max-w-[780px] rounded-[2rem] border border-[#2563ff]/45 bg-white/96 px-5 py-8 shadow-[0_28px_90px_rgba(37,99,255,0.14)] backdrop-blur sm:px-10 sm:py-12 lg:px-16"
        initial={{ opacity: 0, y: 26, scale: 0.985 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid grid-cols-[44px_1fr_44px] items-center">
          <BackButton />
          <div className="justify-self-center">
            <OnboardingLogo />
          </div>
          <div />
        </div>

        <div className="mx-auto mt-8 max-w-lg text-center sm:mt-10">
          <motion.h1
            className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            Entrance
          </motion.h1>
          <motion.p
            className="mt-4 text-sm leading-6 text-slate-400 sm:text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
          >
            Please enter your personal details to set up your account and
            personalize your experience
          </motion.p>
        </div>

        <div className="mx-auto mt-9 grid max-w-[560px] gap-4 sm:mt-10">
          {roles.map((role, index) => (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.22 + index * 0.08 }}
              key={role.role}
            >
              <RoleCard
                description={role.description}
                icon={role.icon}
                isSelected={selectedRole === role.role}
                onSelect={setSelectedRole}
                role={role.role}
                title={role.title}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mx-auto mt-8 max-w-[560px]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.42 }}
        >
          <button
            className={`w-full rounded-2xl px-6 py-4 text-base font-black transition duration-300 focus:outline-none focus:ring-4 focus:ring-[#2563ff]/20 ${
              selectedRole
                ? "bg-[#2563ff] text-white shadow-[0_18px_42px_rgba(37,99,255,0.28)] hover:-translate-y-0.5 hover:bg-[#0f52f5]"
                : "cursor-not-allowed bg-slate-100 text-slate-400"
            }`}
            disabled={!selectedRole}
            onClick={handleContinue}
            type="button"
          >
            Continue
          </button>
        </motion.div>
      </motion.section>
    </main>
  );
}
