"use client";

import { Suspense } from "react";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Bookmark,
  Clock3,
  GraduationCap,
  Languages,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Header } from "@/components/mediahire/header";
import {
  kazakhstanCities,
  publicJobs,
  type PublicJob,
} from "@/components/mediahire/public/public-jobs-data";
import { publicAuthLinks } from "@/components/mediahire/public/public-works-data";

type FilterState = {
  jobType: string;
  workMode: string;
  experience: string;
  language: string;
  education: string;
};

const emptyFilters: FilterState = {
  jobType: "All",
  workMode: "All",
  experience: "All",
  language: "All",
  education: "All",
};

function SearchJobPageContent() {
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const initialLocation = searchParams.get("location") || "All Kazakhstan";

  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [filters, setFilters] = useState<FilterState>(emptyFilters);

  const filteredJobs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return publicJobs.filter((job) => {
      const searchText = [
        job.title,
        job.company,
        job.location,
        job.jobType,
        job.experience,
        job.workMode,
        job.description,
        ...job.tags,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = normalizedQuery
        ? searchText.includes(normalizedQuery)
        : true;

      const matchesLocation =
        location === "All Kazakhstan" ? true : job.location === location;

      const matchesJobType =
        filters.jobType === "All" ? true : job.jobType === filters.jobType;

      const matchesWorkMode =
        filters.workMode === "All" ? true : job.workMode === filters.workMode;

      const matchesExperience =
        filters.experience === "All"
          ? true
          : job.experience === filters.experience;

      const matchesLanguage =
        filters.language === "All"
          ? true
          : job.language.toLowerCase().includes(filters.language.toLowerCase());

      const matchesEducation =
        filters.education === "All"
          ? true
          : job.education === filters.education;

      return (
        matchesQuery &&
        matchesLocation &&
        matchesJobType &&
        matchesWorkMode &&
        matchesExperience &&
        matchesLanguage &&
        matchesEducation
      );
    });
  }, [query, location, filters]);

  const hasActiveFilters =
    query ||
    location !== "All Kazakhstan" ||
    Object.values(filters).some((value) => value !== "All");

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=90"
            alt="Creative professions"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/50" />
        </div>

        <div className="relative z-10 px-4 pb-24 pt-8 sm:px-6 lg:px-8">
          <Header />

          <div className="mx-auto mt-24 max-w-4xl text-center">
            <h1 className="text-5xl font-black tracking-tight text-white md:text-6xl">
              Creative Professions
            </h1>

            <p className="mt-5 text-xl font-semibold text-white/90">
              Browse and find a new job
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-black tracking-tight text-slate-950">
            Discover the Best Job
          </h2>

          <p className="mt-3 text-base font-medium text-slate-500">
            Public job search is available before registration. Apply and save
            actions require an account.
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-3 rounded-3xl bg-white p-3 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:flex-row">
          <div className="flex h-14 flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5">
            <Search className="h-5 w-5 text-slate-400" />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Job title or keywords"
              className="h-full flex-1 bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex h-14 flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5 md:max-w-[310px]">
            <MapPin className="h-5 w-5 text-slate-400" />

            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="h-full flex-1 bg-transparent text-sm font-black text-slate-700 outline-none"
            >
              {kazakhstanCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {location !== "All Kazakhstan" && (
              <button
                type="button"
                onClick={() => setLocation("All Kazakhstan")}
                className="rounded-full bg-slate-200 p-1 text-slate-500 transition hover:bg-slate-300"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              const params = new URLSearchParams();

              if (query.trim()) {
                params.set("q", query.trim());
              }

              if (location !== "All Kazakhstan") {
                params.set("location", location);
              }

              window.history.replaceState(
                null,
                "",
                params.toString()
                  ? `/search-job?${params.toString()}`
                  : "/search-job",
              );
            }}
            className="h-14 rounded-2xl bg-blue-600 px-8 text-base font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[300px_1fr]">
          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
              <SlidersHorizontal className="h-5 w-5 text-slate-900" />

              <h3 className="text-lg font-black text-slate-950">
                All Filters
              </h3>
            </div>

            <div className="space-y-1">
              <FilterSelect
                label="Job type"
                value={filters.jobType}
                options={[
                  "All",
                  "Full-Time",
                  "Part-Time",
                  "Freelance",
                  "Internship",
                ]}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, jobType: value }))
                }
              />

              <FilterSelect
                label="Work modes"
                value={filters.workMode}
                options={["All", "Onsite", "Remote", "Hybrid"]}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, workMode: value }))
                }
              />

              <FilterSelect
                label="Experience"
                value={filters.experience}
                options={["All", "Junior", "Middle", "Senior", "2-3 Years"]}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, experience: value }))
                }
              />

              <FilterSelect
                label="Work Language"
                value={filters.language}
                options={["All", "Kazakh", "Russian", "English"]}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, language: value }))
                }
              />

              <FilterSelect
                label="Education level"
                value={filters.education}
                options={["All", "Bachelor degree", "Not required"]}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, education: value }))
                }
              />

              <div className="border-b border-slate-200 py-5">
                <p className="text-sm font-black text-slate-600">
                  Salary (Monthly)
                </p>

                <p className="mt-2 text-xs font-semibold text-slate-400">
                  Salary range can be connected later.
                </p>
              </div>

              <div className="border-b border-slate-200 py-5">
                <p className="text-sm font-black text-slate-600">
                  Publication date
                </p>

                <p className="mt-2 text-xs font-semibold text-slate-400">
                  Latest jobs are shown first.
                </p>
              </div>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setLocation("All Kazakhstan");
                  setFilters(emptyFilters);
                }}
                className="mt-6 h-11 w-full rounded-2xl bg-slate-950 text-sm font-black text-white transition hover:bg-blue-600"
              >
                Reset filters
              </button>
            )}
          </aside>

          <section>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-black text-slate-500">
                {filteredJobs.length} jobs found
              </p>

              <p className="text-sm font-bold text-slate-400">
                Guest mode: details only
              </p>
            </div>

            {filteredJobs.length > 0 ? (
              <div className="grid gap-6 xl:grid-cols-2">
                {filteredJobs.map((job) => (
                  <JobCard key={job.slug} job={job} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <h3 className="text-2xl font-black text-slate-950">
                  No jobs found
                </h3>

                <p className="mt-3 text-sm font-medium text-slate-500">
                  Try another keyword, location, or filter.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setLocation("All Kazakhstan");
                    setFilters(emptyFilters);
                  }}
                  className="mt-6 h-12 rounded-2xl bg-blue-600 px-6 text-sm font-black text-white transition hover:bg-blue-700"
                >
                  Reset search
                </button>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

function JobCard({ job }: { job: PublicJob }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(37,99,235,0.14)]">
      <div className="flex items-start gap-5">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
          <img
            src={job.logo}
            alt={job.company}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-black text-slate-400">{job.company}</p>

          <h3 className="mt-1 text-2xl font-black leading-tight text-slate-950">
            {job.title}
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-black text-blue-600">
              {job.jobType}
            </span>

            <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-black text-blue-600">
              {job.experience}
            </span>

            <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-black text-blue-600">
              {job.workMode}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {job.location}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-4 w-4" />
              {job.createdAt}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Languages className="h-4 w-4" />
              {job.language}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4" />
              {job.education}
            </span>
          </div>

          <p className="mt-4 text-lg font-black text-blue-600">
            {job.salary}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={publicAuthLinks.login}
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-blue-600 px-6 text-sm font-black text-white transition hover:bg-blue-700"
            >
              Apply
            </Link>

            <Link
              href={`/search-job/${job.slug}`}
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-blue-600 px-6 text-sm font-black text-blue-600 transition hover:bg-blue-50"
            >
              Details
            </Link>
          </div>
        </div>

        <Link
          href={publicAuthLinks.login}
          title="Sign in to save"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition hover:bg-blue-100"
        >
          <Bookmark className="h-5 w-5" />
        </Link>
      </div>
    </article>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block border-b border-slate-200 py-5">
      <span className="text-sm font-black text-slate-600">{label}</span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 h-10 w-full rounded-xl bg-slate-50 px-3 text-sm font-bold text-slate-700 outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function SearchJobPage() {
  return (
    <Suspense fallback={null}>
      <SearchJobPageContent />
    </Suspense>
  );
}