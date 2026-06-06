"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CategoryPills } from "./category-pills";
import { DashboardFooter } from "./dashboard-footer";
import { DashboardHeader } from "./dashboard-header";
import {
  peopleSortOptions,
  projectSortOptions,
  type SortOption,
} from "./filter-modal";
import { PeopleGrid } from "./people-grid";
import { ProjectGrid } from "./project-grid";
import {
  fadeInUp,
  mediaHireClassNames,
  mediaHireMotion,
} from "../ui/design-system";
import {
  SearchFilterBar,
  type DashboardMode,
} from "./search-filter-bar";

type JobSeekerDashboardPageProps = {
  initialMode?: DashboardMode;
  showFooter?: boolean;
};

export function JobSeekerDashboardPage({
  initialMode = "Projects",
  showFooter = true,
}: JobSeekerDashboardPageProps) {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<DashboardMode>(initialMode);
  const [activeCategory, setActiveCategory] = useState("For You");
  const [activeSort, setActiveSort] = useState<SortOption>("Recommended");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  function handleModeChange(nextMode: DashboardMode) {
    setMode(nextMode);
    setActiveSort("Recommended");
    setSearch("");

    const url = new URL(window.location.href);

    if (nextMode === "People") {
      url.searchParams.set("tab", "people");
    } else {
      url.searchParams.delete("tab");
    }

    window.history.replaceState(null, "", url);
  }

  return (
    <main className={mediaHireClassNames.appShell}>
      <motion.div
        animate="show"
        className="mx-auto min-h-screen w-full px-4 py-6 sm:px-6 lg:px-10"
        initial="hidden"
        transition={mediaHireMotion.page}
        variants={fadeInUp}
      >
        <DashboardHeader
          compact
          isMenuOpen={isMenuOpen}
          isUserMenuOpen={isUserMenuOpen}
          onToggleMenu={() => setIsMenuOpen((current) => !current)}
          onToggleUserMenu={() => setIsUserMenuOpen((current) => !current)}
          wide
        />

        <section
          className="jobseeker-home-filter-panel mx-auto mt-8 w-full max-w-none rounded-[1.25rem] border border-slate-100 bg-white p-3 shadow-[0_14px_45px_rgba(15,23,42,0.06)] md:p-3.5"
        >
          <SearchFilterBar
            mode={mode}
            onModeChange={handleModeChange}
            onOpenFilter={() => setIsFilterOpen((current) => !current)}
            onSearchChange={setSearch}
            search={search}
          />

          {isFilterOpen ? (
            <SortPills
              activeSort={activeSort}
              mode={mode}
              onSortChange={setActiveSort}
            />
          ) : null}

          <CategoryPills
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        </section>

        {mode === "People" ? (
          <PeopleGrid
            activeCategory={activeCategory}
            activeSort={activeSort}
            search={search}
          />
        ) : (
          <ProjectGrid
            activeCategory={activeCategory}
            activeSort={activeSort}
            search={search}
          />
        )}
      </motion.div>

      {showFooter ? <DashboardFooter /> : null}
    </main>
  );
}

function SortPills({
  activeSort,
  mode,
  onSortChange,
}: {
  activeSort: SortOption;
  mode: DashboardMode;
  onSortChange: (sort: SortOption) => void;
}) {
  const sortOptions = mode === "People" ? peopleSortOptions : projectSortOptions;

  return (
    <div className="mt-2.5 flex flex-wrap justify-center gap-1.5 rounded-2xl bg-slate-50 p-2">
      {sortOptions.map((option) => {
        const isActive = activeSort === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onSortChange(option)}
            className={`jobseeker-filter-text h-7 rounded-full px-2.5 text-[9px] font-semibold leading-none transition hover:-translate-y-0.5 ${
              isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white text-slate-600 hover:text-blue-600"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
