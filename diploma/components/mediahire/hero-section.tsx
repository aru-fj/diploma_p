"use client";

// MEDIAHIRE_HERO_ANIMATED_FIXED

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Briefcase, ChevronDown, MapPin, Search, Sparkles } from "lucide-react";
import { kazakhstanCities } from "@/components/mediahire/public/public-jobs-data";
import type { PublicRole } from "@/components/mediahire/header";

type HeroSectionProps = {
  role?: PublicRole;
};

const suggestionsByRole = {
  jobseeker: ["Graphic Designer", "Photographer", "Videographer", "Animator"],
  employer: [
    "Graphic Designer",
    "Photographer",
    "Videographer",
    "Animator",
    "3D Artist",
    "Screenwriter",
    "Marketer",
  ],
};

export function HeroSection({ role = "jobseeker" }: HeroSectionProps) {
  const router = useRouter();
  const isEmployer = role === "employer";
  const heroImage = isEmployer
    ? "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1500&q=90"
    : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1500&q=90";

  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All Kazakhstan");

  function handleSearch() {
    const params = new URLSearchParams();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      params.set("query", trimmedQuery);
      params.set("keyword", trimmedQuery);
    }

    if (location !== "All Kazakhstan") {
      params.set("location", location);
    }

    router.push(
      params.toString()
        ? `${isEmployer ? "/search-cv" : "/search-job"}?${params.toString()}`
        : isEmployer
          ? "/search-cv"
          : "/search-job",
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#eaf3ff] px-4 pb-10 pt-12 sm:px-6 lg:px-10">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(430px,560px)_minmax(360px,430px)] lg:justify-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative z-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-black text-blue-600 shadow-md"
          >
            <Sparkles className="h-4 w-4" />
            {isEmployer ? "Creative hiring, curated" : "Creative careers, curated"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="max-w-[460px] text-[38px] font-black leading-[1] tracking-tight text-slate-950 md:text-[48px]"
          >
            {isEmployer ? (
              <>
                <span className="block">Hire Creative</span>
                <span className="block">Talent with</span>
                <span className="block text-blue-600">MEDIAHIRE!</span>
              </>
            ) : (
              <>
                <span className="block">Your Future</span>
                <span className="block">Starts with</span>
                <span className="block text-blue-600">MEDIAHIRE!</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="mt-4 max-w-[500px] text-sm font-medium leading-6 text-slate-600 md:text-base"
          >
            {isEmployer
              ? "Find designers, photographers, videographers, and media specialists. Review public portfolios before creating your employer account."
              : "Discover jobs that match your skills and passion. Explore media projects, creative teams, and portfolio opportunities in one place."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.4 }}
            className={`mt-6 flex w-full flex-col gap-1.5 rounded-[1rem] bg-white p-1.5 shadow-[0_14px_45px_rgba(37,99,235,0.12)] md:flex-row ${
              isEmployer ? "max-w-[560px]" : "max-w-[480px]"
            }`}
          >
            <div className="flex h-10 flex-1 items-center gap-2 rounded-xl bg-slate-50 px-3">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder={
                  isEmployer
                    ? "Profession and position"
                    : "Job title or keywords"
                }
                list={
                  isEmployer
                    ? "employer-search-suggestions"
                    : "job-search-suggestions"
                }
                className="h-full min-w-0 flex-1 bg-transparent text-xs font-semibold text-slate-900 outline-none placeholder:text-slate-400"
              />

              <datalist
                id={
                  isEmployer
                    ? "employer-search-suggestions"
                    : "job-search-suggestions"
                }
              >
                {suggestionsByRole[role].map((suggestion) => (
                  <option key={suggestion} value={suggestion} />
                ))}
              </datalist>
            </div>

            <div className="relative flex h-10 w-full items-center gap-2 rounded-xl bg-slate-50 px-3 md:w-[150px] md:shrink-0">
              <MapPin className="h-4 w-4 shrink-0 text-slate-400" />

              <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="h-full min-w-0 flex-1 appearance-none bg-transparent text-xs font-black text-slate-500 outline-none"
              >
                {kazakhstanCities.map((city) => (
                  <option key={city} value={city}>
                    {city === "All Kazakhstan" ? "Location" : city}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none h-4 w-4 shrink-0 text-slate-500" />
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-blue-600 px-4 text-xs font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              <Search className="h-4 w-4" />
              {isEmployer ? "Search CV" : "Search"}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.5 }}
            className="mt-5 flex items-center gap-2.5"
          >
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
              ].map((avatar) => (
                <div
                  key={avatar}
                  className="h-8 w-8 overflow-hidden rounded-full border-[3px] border-white bg-slate-200"
                >
                  <img
                    src={avatar}
                    alt="Job seeker"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            <p className="text-xs font-bold text-slate-600">
              {isEmployer ? (
                <>
                  Over <span className="text-blue-600">12k</span> creative
                  specialists are ready to collaborate
                </>
              ) : (
                <>
                  Over <span className="text-blue-600">100k</span> jobseekers are
                  successfully hired
                </>
              )}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: "easeOut" }}
          className="relative hidden h-[410px] lg:block"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute right-5 top-4 h-[385px] w-[305px] overflow-hidden bg-slate-200 shadow-[0_24px_70px_rgba(15,23,42,0.15)] ${
              isEmployer
                ? "rounded-[1.8rem]"
                : "rounded-t-[12rem] rounded-b-[1.5rem]"
            }`}
          >
            <img
              src={heroImage}
              alt={isEmployer ? "Employer reviewing candidates" : "Successful hire"}
              className={`h-full w-full object-cover ${
                isEmployer ? "object-[50%_30%]" : "object-center"
              }`}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.65 }}
            className={`absolute flex items-center gap-4 rounded-2xl bg-white shadow-xl ${
              isEmployer
                ? "-left-2 top-[158px] w-[175px] px-3 py-2.5"
                : "left-0 top-[132px] w-[180px] px-3 py-2.5"
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Briefcase className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-black text-slate-950">
                {isEmployer ? "+30K" : "1k"}
              </p>
              <p className="truncate text-xs font-bold text-slate-500">
                {isEmployer ? "Job Seekers" : "Assisted Candidates"}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.8 }}
            className={`absolute bg-white shadow-xl ${
              isEmployer
                ? "right-[-18px] top-[18px] flex w-[218px] items-center gap-2.5 rounded-[1.2rem] px-3 py-2.5"
                : "right-0 top-6 rounded-xl px-4 py-2.5"
            }`}
          >
            {isEmployer ? (
              <>
                <div
                  className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background:
                      "conic-gradient(#0057c2 0 58%, #6aa8ff 58% 78%, #cfe2ff 78% 100%)",
                  }}
                >
                  <div className="flex h-9 w-9 flex-col items-center justify-center rounded-full bg-white">
                    <span className="text-xs font-black leading-none text-slate-950">
                      15
                    </span>
                    <span className="mt-0.5 text-[7px] font-semibold leading-none text-slate-500">
                      Total job
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-[10px] font-bold text-slate-600">
                  {[
                    ["#0057c2", "Under Review", "8"],
                    ["#6aa8ff", "Accepted", "4"],
                    ["#cfe2ff", "Rejected", "3"],
                  ].map(([color, label, count]) => (
                    <div className="grid grid-cols-[12px_1fr_14px] items-center gap-2" key={label}>
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span>{label}</span>
                      <span className="text-right text-slate-950">{count}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-black text-slate-950">
                  Successful Hires
                </p>
                <p className="mt-1 text-xs font-bold text-slate-500">
                  media specialists
                </p>
              </>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.95 }}
            className={`absolute rounded-2xl bg-white shadow-xl ${
              isEmployer
                ? "bottom-12 left-16 px-4 py-2.5"
                : "bottom-11 left-24 px-4 py-2.5"
            }`}
          >
            <p className="text-sm font-black text-slate-950">
              {isEmployer ? "Shortlisted" : "Congratulations"}
            </p>
            <p className="mt-1 text-xs font-bold text-slate-500">
              {isEmployer ? "Ready to interview" : "You have been hired"}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
