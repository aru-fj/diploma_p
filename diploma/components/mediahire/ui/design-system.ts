import type { Transition, Variants } from "framer-motion";

export const mediaHireTheme = {
  accent: "#0B63E5",
  background: "#f5f7fb",
  employer: "#252525",
  foreground: "#0f172a",
  muted: "#64748b",
};

export const mediaHireEase = [0.22, 1, 0.36, 1] as const;

export const mediaHireMotion = {
  cardHover: {
    y: -4,
    scale: 1.012,
    transition: { duration: 0.22, ease: mediaHireEase },
  },
  fast: {
    duration: 0.22,
    ease: mediaHireEase,
  } satisfies Transition,
  item: (index = 0): Transition => ({
    delay: Math.min(index * 0.025, 0.18),
    duration: 0.35,
    ease: mediaHireEase,
  }),
  page: {
    duration: 0.45,
    ease: mediaHireEase,
  } satisfies Transition,
  panel: {
    duration: 0.35,
    ease: mediaHireEase,
  } satisfies Transition,
  slowPanel: {
    duration: 0.5,
    ease: mediaHireEase,
  } satisfies Transition,
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -18 },
  show: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 18 },
  show: { opacity: 1, x: 0 },
};

export const mediaHireClassNames = {
  appShell: "min-h-screen bg-[#f5f7fb] text-slate-950",
  card:
    "rounded-3xl border border-slate-100 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.05)]",
  dashboardPad: "px-4 py-8 sm:px-6 lg:px-8",
  focus:
    "focus:outline-none focus:ring-4 focus:ring-[#0B63E5]/15 focus:ring-offset-0",
  h1: "text-3xl font-black tracking-tight text-slate-950 sm:text-4xl",
  h2: "text-2xl font-black tracking-tight text-slate-950 sm:text-3xl",
  input:
    "h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0B63E5] focus:ring-4 focus:ring-[#0B63E5]/10",
  pageContainer: "mx-auto w-full max-w-6xl",
  primaryButton:
    "h-14 rounded-2xl bg-[#0B63E5] text-base font-black text-white shadow-[0_16px_36px_rgba(11,99,229,0.20)] transition hover:bg-[#0758cf] focus:outline-none focus:ring-4 focus:ring-[#0B63E5]/20 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none",
  sectionCard:
    "rounded-[2rem] border border-slate-100 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.06)]",
  subtitle: "text-sm font-medium leading-6 text-slate-500 sm:text-base",
};
