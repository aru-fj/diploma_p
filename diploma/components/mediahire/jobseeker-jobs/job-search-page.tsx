"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

import { mediaHireJobs } from "../jobs-data";
import { JobCard, JobSeekerNav, MediaHireFooter } from "./job-shared-ui";

export function JobSearchPage() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("query") || params.get("q") || "");
    setLocation(params.get("location") || "");
  }, []);

  const filteredJobs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const normalizedLocation = location.trim().toLowerCase();

    return mediaHireJobs.filter((job) => {
      const titleMatch =
        !normalizedQuery ||
        job.title.toLowerCase().includes(normalizedQuery) ||
        job.companyName.toLowerCase().includes(normalizedQuery);
      const locationMatch =
        !normalizedLocation || job.location.toLowerCase().includes(normalizedLocation);

      return titleMatch && locationMatch;
    });
  }, [location, query]);

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <section className="relative overflow-hidden bg-slate-950 pb-20 pt-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{
            backgroundImage:
              "linear-gradient(120deg,rgba(80,0,0,0.44),rgba(11,99,229,0.2)),url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85')",
          }}
        />
        <div className="relative z-10">
          <JobSeekerNav active="Search Job" />
          <div className="mx-auto mt-16 w-[min(960px,calc(100%-32px))] text-center text-white">
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-black tracking-tight md:text-5xl"
              initial={{ opacity: 0, y: 18 }}
            >
              Creative Professions
            </motion.h1>
            <p className="mt-4 text-xl font-semibold text-white/90">
              Browse and find a new job
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1320px,calc(100%-32px))] py-14">
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-950">
            Discover the Best Job
          </h2>
          <div className="mx-auto mt-7 flex max-w-2xl flex-col gap-3 rounded-2xl bg-white p-2 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:flex-row">
            <label className="flex min-h-12 flex-1 items-center gap-3 rounded-xl bg-slate-50 px-4">
              <Search className="text-slate-400" size={18} />
              <input
                className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Job title or keywords"
                type="search"
                value={query}
              />
            </label>
            <label className="flex min-h-12 flex-1 items-center gap-3 rounded-xl bg-slate-50 px-4">
              <MapPin className="text-slate-400" size={18} />
              <input
                className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
                onChange={(event) => setLocation(event.target.value)}
                placeholder="location"
                type="search"
                value={location}
              />
            </label>
            <button
              className="min-h-12 rounded-xl bg-[#0B63E5] px-6 text-sm font-black text-white transition hover:bg-[#0958cc]"
              type="button"
            >
              Search
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-black text-slate-950">
              <SlidersHorizontal size={18} />
              All Filters
            </div>
            {[
              "Active Filters",
              "Work Language",
              "Publication date",
              "Education level",
              "Job type",
              "Distance",
              "Salary (Monthly)",
              "Work modes",
            ].map((filter) => (
              <div
                className="mt-4 border-t border-slate-100 pt-4 text-sm font-bold text-slate-600"
                key={filter}
              >
                {filter}
              </div>
            ))}
          </aside>

          <div className="grid gap-5 md:grid-cols-2">
            {filteredJobs.map((job) => (
              <JobCard job={job} key={job.id} />
            ))}
            {!filteredJobs.length ? (
              <div className="rounded-2xl bg-white p-8 text-center text-sm font-black text-slate-500 md:col-span-2">
                No jobs found
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <MediaHireFooter />
    </main>
  );
}
