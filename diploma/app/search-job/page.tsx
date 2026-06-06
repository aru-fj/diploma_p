"use client";

import { Suspense } from "react";
import { useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bookmark,
  ChevronUp,
  Clock3,
  GraduationCap,
  Languages,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Footer } from "@/components/mediahire/footer";
import { Header } from "@/components/mediahire/header";
import {
  kazakhstanCities,
  publicJobs,
  type PublicJob,
} from "@/components/mediahire/public/public-jobs-data";
import { publicAuthLinks } from "@/components/mediahire/public/public-works-data";

type FilterState = {
  city: string;
  currency: SalaryCurrency;
  jobTypes: string[];
  languages: string[];
  maxSalary: number;
  minSalary: number;
  publicationDates: string[];
  workModes: string[];
};

type SalaryCurrency = "KZT" | "USD" | "RUB";

const salaryCurrencyRates: Record<SalaryCurrency, number> = {
  KZT: 500,
  USD: 1,
  RUB: 90,
};

const salaryRanges: Record<
  SalaryCurrency,
  {
    max: number;
    min: number;
    step: number;
  }
> = {
  KZT: { min: 50000, max: 400000, step: 5000 },
  USD: { min: 100, max: 800, step: 25 },
  RUB: { min: 10000, max: 70000, step: 1000 },
};

const emptyFilters: FilterState = {
  city: "All Kazakhstan",
  currency: "KZT",
  jobTypes: [],
  languages: [],
  maxSalary: salaryRanges.KZT.max,
  minSalary: salaryRanges.KZT.min,
  publicationDates: [],
  workModes: [],
};

const languageOptions = ["Kazakh", "Russian", "English"];
const publicationDateOptions = [
  "Last 24 hours",
  "Last 3 days",
  "Last 7 days",
  "Last 14 days",
];
const cityOptions = ["Astana", "Almaty", "Shymkent", "Aktobe"];
const jobTypeOptions = ["Full-Time", "Part-Time", "Contract"];
const salaryCurrencyOptions: SalaryCurrency[] = ["KZT", "USD", "RUB"];
const workModeOptions = ["Remote", "Hybrid", "Onsite"];

function SearchJobPageContent() {
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("query") || searchParams.get("q") || "";
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

      const matchesCity =
        filters.city === "All Kazakhstan"
          ? true
          : getJobCity(job.location) === filters.city;

      const matchesJobType =
        filters.jobTypes.length === 0
          ? true
          : filters.jobTypes.some(
              (type) => getFilterJobType(job.jobType) === type,
            );

      const matchesWorkMode =
        filters.workModes.length === 0
          ? true
          : filters.workModes.includes(job.workMode);

      const matchesLanguage =
        filters.languages.length === 0
          ? true
          : filters.languages.some((language) =>
              job.language.toLowerCase().includes(language.toLowerCase()),
            );

      const matchesPublicationDate =
        filters.publicationDates.length === 0
          ? true
          : filters.publicationDates.some(
              (date) => getPostedAgeHours(job.createdAt) <= getPublicationHours(date),
            );

      const salary = convertUsdSalary(
        getSalaryUsd(job.salary),
        filters.currency,
      );
      const matchesSalary =
        salary >= filters.minSalary && salary <= filters.maxSalary;

      return (
        matchesQuery &&
        matchesLocation &&
        matchesCity &&
        matchesJobType &&
        matchesWorkMode &&
        matchesLanguage &&
        matchesPublicationDate &&
        matchesSalary
      );
    });
  }, [query, location, filters]);

  const hasActiveFilters =
    query ||
    location !== "All Kazakhstan" ||
    filters.city !== "All Kazakhstan" ||
    filters.currency !== emptyFilters.currency ||
    filters.jobTypes.length > 0 ||
    filters.languages.length > 0 ||
    filters.publicationDates.length > 0 ||
    filters.workModes.length > 0 ||
    filters.minSalary !== salaryRanges[filters.currency].min ||
    filters.maxSalary !== salaryRanges[filters.currency].max;

  const activeFilterLabels = getActiveFilterLabels(filters);

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

        <div className="relative z-10">
          <Header role="jobseeker" activeItem="Search Job" />

          <div className="px-4 pb-14 pt-12 sm:px-6 lg:px-8">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-10 max-w-3xl text-center"
              initial={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                Discover the Best Job
              </h1>

              <p className="mt-3 text-sm font-semibold text-white/90 md:text-base">
                Browse and find a new job
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-[0_16px_50px_rgba(15,23,42,0.08)] md:flex-row">
          <div className="flex h-10 flex-1 items-center gap-2 rounded-xl bg-slate-50 px-3">
            <Search className="h-4 w-4 text-slate-400" />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Job title or keywords"
              className="h-full flex-1 bg-transparent text-xs font-bold text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex h-10 flex-1 items-center gap-2 rounded-xl bg-slate-50 px-3 md:max-w-[250px]">
            <MapPin className="h-4 w-4 text-slate-400" />

            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="h-full flex-1 bg-transparent text-xs font-black text-slate-700 outline-none"
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
                params.set("query", query.trim());
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
            className="h-10 rounded-xl bg-blue-600 px-5 text-sm font-black text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="h-fit max-h-[calc(100vh-120px)] overflow-y-auto rounded-lg border border-slate-200 bg-white px-4 py-5 shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
              <SlidersHorizontal className="h-4 w-4 text-slate-900" />

              <h3 className="text-base font-black text-slate-950">
                All Filters
              </h3>
            </div>

            {activeFilterLabels.length > 0 ? (
              <section className="border-b border-slate-200 py-4">
                <h4 className="text-sm font-black text-slate-950">
                  Active Filters
                </h4>

                <div className="mt-3 flex flex-wrap gap-2">
                  {activeFilterLabels.map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setFilters((prev) => removeFilter(prev, label))}
                      className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-200"
                    >
                      {label}
                      <X className="h-3 w-3" />
                    </button>
                  ))}
                </div>
              </section>
            ) : null}

            <FilterSection title="Work Language">
              <CheckboxGroup
                options={languageOptions}
                selected={filters.languages}
                onToggle={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    languages: toggleArrayValue(prev.languages, value),
                  }))
                }
              />
            </FilterSection>

            <FilterSection title="Publication date">
              <CheckboxGroup
                options={publicationDateOptions}
                selected={filters.publicationDates}
                onToggle={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    publicationDates: toggleArrayValue(
                      prev.publicationDates,
                      value,
                    ),
                  }))
                }
              />
            </FilterSection>

            <FilterSection title="City">
              <RadioGroup
                name="city"
                options={cityOptions}
                selected={filters.city}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, city: value }))
                }
              />
            </FilterSection>

            <FilterSection title="Job type">
              <CheckboxGroup
                options={jobTypeOptions}
                selected={filters.jobTypes}
                onToggle={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    jobTypes: toggleArrayValue(prev.jobTypes, value),
                  }))
                }
              />
            </FilterSection>

            <FilterSection title="Salary">
              <RadioGroup
                name="salary-currency"
                options={salaryCurrencyOptions}
                selected={filters.currency}
                onChange={(value) =>
                  setFilters((prev) => {
                    const currency = value as SalaryCurrency;
                    const range = salaryRanges[currency];

                    return {
                      ...prev,
                      currency,
                      minSalary: range.min,
                      maxSalary: range.max,
                    };
                  })
                }
              />

              <SalaryRangeControl
                currency={filters.currency}
                maxSalary={filters.maxSalary}
                minSalary={filters.minSalary}
                onChange={(minSalary, maxSalary) =>
                  setFilters((prev) => ({
                    ...prev,
                    minSalary,
                    maxSalary,
                  }))
                }
              />
            </FilterSection>

            <FilterSection title="Work modes">
              <CheckboxGroup
                options={workModeOptions}
                selected={filters.workModes}
                onToggle={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    workModes: toggleArrayValue(prev.workModes, value),
                  }))
                }
              />
            </FilterSection>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setLocation("All Kazakhstan");
                  setFilters(emptyFilters);
                }}
                className="mt-5 h-10 w-full rounded-xl bg-slate-950 text-xs font-black text-white transition hover:bg-blue-600"
              >
                Reset filters
              </button>
            )}
          </aside>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-black text-slate-500">
                {filteredJobs.length} jobs found
              </p>

              <p className="text-xs font-bold text-slate-400">
                Guest mode: details only
              </p>
            </div>

            {filteredJobs.length > 0 ? (
              <div className="grid gap-5 xl:grid-cols-2">
                {filteredJobs.map((job) => (
                  <JobCard key={job.slug} job={job} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <h3 className="text-xl font-black text-slate-950">
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
                  className="mt-5 h-10 rounded-xl bg-blue-600 px-4 text-sm font-black text-white transition hover:bg-blue-700"
                >
                  Reset search
                </button>
              </div>
            )}
          </section>
        </div>
      </section>

      <Footer role="jobseeker" />
    </main>
  );
}

function JobCard({ job }: { job: PublicJob }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(37,99,235,0.12)]">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={job.logo}
            alt={job.company}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-black text-slate-400">{job.company}</p>

          <h3 className="mt-0.5 text-base font-black leading-tight text-slate-950">
            {job.title}
          </h3>

          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-black text-blue-600">
              {job.jobType}
            </span>

            <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-black text-blue-600">
              {job.experience}
            </span>

            <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-black text-blue-600">
              {job.workMode}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-xs font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {job.location}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" />
              {job.createdAt}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Languages className="h-3.5 w-3.5" />
              {job.language}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5" />
              {job.education}
            </span>
          </div>

          <p className="mt-3 text-sm font-black text-blue-600">
            {job.salary}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={publicAuthLinks.login}
              className="inline-flex h-9 items-center justify-center rounded-xl bg-blue-600 px-4 text-xs font-black text-white transition hover:bg-blue-700"
            >
              Apply
            </Link>

            <Link
              href={`/search-job/${job.slug}`}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-blue-600 px-4 text-xs font-black text-blue-600 transition hover:bg-blue-50"
            >
              Details
            </Link>
          </div>
        </div>

        <Link
          href={publicAuthLinks.login}
          title="Sign in to save"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition hover:bg-blue-100"
        >
          <Bookmark className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function FilterSection({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="border-b border-slate-200 py-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="text-sm font-black text-slate-950">{title}</h4>
        <ChevronUp className="h-4 w-4 text-slate-600" />
      </div>
      {children}
    </section>
  );
}

function CheckboxGroup({
  onToggle,
  options,
  selected,
}: {
  onToggle: (value: string) => void;
  options: string[];
  selected: string[];
}) {
  return (
    <div className="grid gap-2.5">
      {options.map((option) => (
        <label
          key={option}
          className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-700"
        >
          <input
            checked={selected.includes(option)}
            onChange={() => onToggle(option)}
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-blue-600"
          />
          {option}
        </label>
      ))}
    </div>
  );
}

function RadioGroup({
  name,
  onChange,
  options,
  selected,
}: {
  name: string;
  onChange: (value: string) => void;
  options: string[];
  selected: string;
}) {
  return (
    <div className="grid gap-2.5">
      {options.map((option) => (
        <label
          key={option}
          className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-700"
        >
          <input
            checked={selected === option}
            name={name}
            onChange={() => onChange(option)}
            type="radio"
            className="h-4 w-4 border-slate-300 text-blue-600"
          />
          {option}
        </label>
      ))}
    </div>
  );
}

function SalaryRangeControl({
  currency,
  maxSalary,
  minSalary,
  onChange,
}: {
  currency: SalaryCurrency;
  maxSalary: number;
  minSalary: number;
  onChange: (minSalary: number, maxSalary: number) => void;
}) {
  const range = salaryRanges[currency];

  function updateMin(value: number) {
    onChange(Math.min(value, maxSalary), maxSalary);
  }

  function updateMax(value: number) {
    onChange(minSalary, Math.max(value, minSalary));
  }

  return (
    <div className="mt-5">
      <h5 className="text-sm font-black text-slate-950">Price Range</h5>
      <p className="mt-2 text-[11px] font-medium text-slate-600">
        Use slider or enter min and max price
      </p>

      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-[11px] font-semibold text-slate-700">
        <label className="grid grid-cols-[auto_1fr] items-center gap-2">
          Min
          <input
            min={range.min}
            max={range.max}
            step={range.step}
            type="number"
            value={minSalary}
            onChange={(event) => updateMin(Number(event.target.value))}
            className="h-8 min-w-0 rounded border border-slate-200 px-2 text-xs font-semibold outline-none focus:border-blue-300"
          />
        </label>

        <span className="text-slate-400">-</span>

        <label className="grid grid-cols-[auto_1fr] items-center gap-2">
          Max
          <input
            min={range.min}
            max={range.max}
            step={range.step}
            type="number"
            value={maxSalary}
            onChange={(event) => updateMax(Number(event.target.value))}
            className="h-8 min-w-0 rounded border border-slate-200 px-2 text-xs font-semibold outline-none focus:border-blue-300"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-2">
        <input
          min={range.min}
          max={range.max}
          step={range.step}
          type="range"
          value={minSalary}
          onChange={(event) => updateMin(Number(event.target.value))}
          className="h-1 w-full accent-blue-600"
          aria-label="Minimum salary"
        />
        <input
          min={range.min}
          max={range.max}
          step={range.step}
          type="range"
          value={maxSalary}
          onChange={(event) => updateMax(Number(event.target.value))}
          className="h-1 w-full accent-blue-600"
          aria-label="Maximum salary"
        />
      </div>
    </div>
  );
}

function toggleArrayValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

function getJobCity(location: string) {
  return location.split(",")[0]?.trim() || location;
}

function getFilterJobType(jobType: string) {
  return jobType === "Freelance" ? "Contract" : jobType;
}

function getSalaryUsd(salary: string) {
  const amount = Number(salary.match(/\d+/)?.[0] || 0);
  return Number.isFinite(amount) ? amount : 0;
}

function convertUsdSalary(salaryUsd: number, currency: SalaryCurrency) {
  return Math.round(salaryUsd * salaryCurrencyRates[currency]);
}

function getPostedAgeHours(postedAt: string) {
  const normalized = postedAt.toLowerCase();

  if (normalized.includes("today")) {
    return 12;
  }

  const amount = Number(normalized.match(/\d+/)?.[0] || 0);

  if (normalized.includes("hour")) {
    return amount;
  }

  if (normalized.includes("day")) {
    return amount * 24;
  }

  return 24 * 14;
}

function getPublicationHours(label: string) {
  if (label === "Last 24 hours") {
    return 24;
  }

  const days = Number(label.match(/\d+/)?.[0] || 14);
  return days * 24;
}

function getActiveFilterLabels(filters: FilterState) {
  const range = salaryRanges[filters.currency];
  const salaryChanged =
    filters.minSalary !== range.min || filters.maxSalary !== range.max;

  return [
    ...filters.languages,
    ...filters.publicationDates,
    filters.city !== "All Kazakhstan" ? filters.city : null,
    ...filters.jobTypes,
    filters.currency !== emptyFilters.currency ? filters.currency : null,
    salaryChanged ? `${filters.minSalary}-${filters.maxSalary}` : null,
    ...filters.workModes,
  ].filter((label): label is string => Boolean(label));
}

function removeFilter(filters: FilterState, label: string): FilterState {
  const range = salaryRanges[filters.currency];

  if (filters.languages.includes(label)) {
    return {
      ...filters,
      languages: filters.languages.filter((item) => item !== label),
    };
  }

  if (filters.publicationDates.includes(label)) {
    return {
      ...filters,
      publicationDates: filters.publicationDates.filter((item) => item !== label),
    };
  }

  if (filters.jobTypes.includes(label)) {
    return {
      ...filters,
      jobTypes: filters.jobTypes.filter((item) => item !== label),
    };
  }

  if (filters.workModes.includes(label)) {
    return {
      ...filters,
      workModes: filters.workModes.filter((item) => item !== label),
    };
  }

  if (filters.city === label) {
    return {
      ...filters,
      city: "All Kazakhstan",
    };
  }

  if (label === filters.currency) {
    return {
      ...filters,
      currency: emptyFilters.currency,
      maxSalary: salaryRanges[emptyFilters.currency].max,
      minSalary: salaryRanges[emptyFilters.currency].min,
    };
  }

  if (label === `${filters.minSalary}-${filters.maxSalary}`) {
    return {
      ...filters,
      maxSalary: range.max,
      minSalary: range.min,
    };
  }

  return filters;
}

export default function SearchJobPage() {
  return (
    <Suspense fallback={null}>
      <SearchJobPageContent />
    </Suspense>
  );
}
