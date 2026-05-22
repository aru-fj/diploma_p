"use client";

// MEDIAHIRE_HERO_ANIMATED_FIXED

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Briefcase, ChevronDown, MapPin, Search, Sparkles } from "lucide-react";
import { kazakhstanCities } from "@/components/mediahire/public/public-jobs-data";

export function HeroSection() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All Kazakhstan");

  function handleSearch() {
    const params = new URLSearchParams();

    if (query.trim()) {
      params.set("q", query.trim());
    }

    if (location !== "All Kazakhstan") {
      params.set("location", location);
    }

    router.push(
      params.toString() ? `/search-job?${params.toString()}` : "/search-job",
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#eaf3ff] px-4 pb-20 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[620px_560px] lg:justify-center">
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
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-base font-black text-blue-600 shadow-md"
          >
            <Sparkles className="h-5 w-5" />
            Creative careers, curated
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="max-w-[600px] text-[58px] font-black leading-[0.97] tracking-tight text-slate-950 md:text-[70px]"
          >
            <span className="block">Your Future</span>
            <span className="block">Starts with</span>
            <span className="block text-blue-600">MEDIAHIRE!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="mt-7 max-w-[620px] text-lg font-medium leading-8 text-slate-600 md:text-xl"
          >
            Discover jobs that match your skills and passion. Explore media
            projects, creative teams, and portfolio opportunities in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.4 }}
            className="mt-8 flex w-full max-w-[560px] flex-col gap-2 rounded-[1.2rem] bg-white p-2 shadow-[0_18px_60px_rgba(37,99,235,0.12)] md:flex-row"
          >
            <div className="flex h-11 flex-1 items-center gap-2 rounded-xl bg-slate-50 px-3">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Job title or keywords"
                className="h-full min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="relative flex h-11 w-full items-center gap-2 rounded-xl bg-slate-50 px-3 md:w-[170px] md:shrink-0">
              <MapPin className="h-4 w-4 shrink-0 text-slate-400" />

              <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="h-full min-w-0 flex-1 appearance-none bg-transparent text-sm font-black text-slate-500 outline-none"
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
              className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              <Search className="h-5 w-5" />
              Search
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.5 }}
            className="mt-7 flex items-center gap-4"
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
                  className="h-11 w-11 overflow-hidden rounded-full border-4 border-white bg-slate-200"
                >
                  <img
                    src={avatar}
                    alt="Job seeker"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            <p className="text-base font-bold text-slate-600">
              Over <span className="text-blue-600">100k</span> jobseekers are
              successfully hired
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: "easeOut" }}
          className="relative hidden h-[590px] lg:block"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-8 top-6 h-[555px] w-[435px] overflow-hidden rounded-t-[15rem] rounded-b-[2rem] bg-slate-200 shadow-[0_30px_90px_rgba(15,23,42,0.16)]"
          >
            <img
              src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1500&q=90"
              alt="Successful hire"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.65 }}
            className="absolute left-0 top-28 flex w-[245px] items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-xl"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Briefcase className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-lg font-black text-slate-950">1k</p>
              <p className="truncate text-sm font-bold text-slate-500">
                Assisted Candidates
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.8 }}
            className="absolute right-0 top-14 rounded-2xl bg-white px-6 py-4 shadow-xl"
          >
            <p className="text-lg font-black text-slate-950">
              Successful Hires
            </p>
            <p className="mt-1 text-sm font-bold text-slate-500">
              media specialists
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.95 }}
            className="absolute bottom-16 left-36 rounded-2xl bg-white px-6 py-4 shadow-xl"
          >
            <p className="text-lg font-black text-slate-950">
              Congratulations
            </p>
            <p className="mt-1 text-sm font-bold text-slate-500">
              You have been hired
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
