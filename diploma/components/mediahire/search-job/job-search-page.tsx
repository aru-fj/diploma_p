"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { DashboardFooter } from "../dashboard/dashboard-footer";
import { FilterSidebar } from "./filter-sidebar";
import { JobList } from "./job-list";
import { JobSearchBar } from "./job-search-bar";
import { JobSearchHero } from "./job-search-hero";
import { jobVacancies } from "./job-search-data";
import {
  fadeInUp,
  mediaHireClassNames,
  mediaHireMotion,
} from "../ui/design-system";

export function JobSearchPage() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [submittedKeyword, setSubmittedKeyword] = useState("");
  const [submittedLocation, setSubmittedLocation] = useState("");
  const [openFilters, setOpenFilters] = useState<string[]>([
    "Work Language",
    "Job type",
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const visibleJobs = useMemo(() => {
    const normalizedKeyword = submittedKeyword.trim().toLowerCase();
    const normalizedLocation = submittedLocation.trim().toLowerCase();

    return jobVacancies.filter((job) => {
      const matchesKeyword =
        !normalizedKeyword ||
        job.title.toLowerCase().includes(normalizedKeyword) ||
        job.company.toLowerCase().includes(normalizedKeyword) ||
        job.location.toLowerCase().includes(normalizedKeyword);
      const matchesLocation =
        !normalizedLocation ||
        job.location.toLowerCase().includes(normalizedLocation);

      return matchesKeyword && matchesLocation;
    });
  }, [submittedKeyword, submittedLocation]);

  function handleSearch() {
    setSubmittedKeyword(keyword);
    setSubmittedLocation(location);
    setCurrentPage(1);
  }

  function handleToggleFilter(filter: string) {
    setOpenFilters((current) =>
      current.includes(filter)
        ? current.filter((item) => item !== filter)
        : [...current, filter],
    );
  }

  return (
    <main className={mediaHireClassNames.appShell}>
      <motion.div
        animate="show"
        className="mx-auto w-full overflow-hidden"
        initial="hidden"
        transition={mediaHireMotion.page}
        variants={fadeInUp}
      >
        <JobSearchHero
          isMenuOpen={isMenuOpen}
          isUserMenuOpen={isUserMenuOpen}
          onToggleMenu={() => setIsMenuOpen((current) => !current)}
          onToggleUserMenu={() => setIsUserMenuOpen((current) => !current)}
        />

        <div className="px-4 pb-20 sm:px-8 lg:px-12">
          <JobSearchBar
            keyword={keyword}
            location={location}
            onKeywordChange={setKeyword}
            onLocationChange={setLocation}
            onSearch={handleSearch}
          />

          <button
            className="mx-auto mt-8 flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-sm font-black text-slate-800 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-[#0B63E5]/35 hover:text-[#0B63E5] lg:hidden"
            onClick={() => setIsFilterDrawerOpen(true)}
            type="button"
          >
            <SlidersHorizontal size={17} />
            Open filters
          </button>

          <div className="mx-auto mt-10 grid max-w-6xl gap-5 lg:grid-cols-[250px_1fr]">
            <FilterSidebar
              isDrawerOpen={isFilterDrawerOpen}
              onCloseDrawer={() => setIsFilterDrawerOpen(false)}
              onToggleFilter={handleToggleFilter}
              openFilters={openFilters}
            />

            <JobList
              currentPage={currentPage}
              jobs={visibleJobs}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </motion.div>

      <DashboardFooter />
    </main>
  );
}
