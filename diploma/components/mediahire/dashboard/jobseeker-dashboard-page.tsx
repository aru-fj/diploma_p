"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CategoryPills } from "./category-pills";
import { DashboardFooter } from "./dashboard-footer";
import type { DashboardPerson } from "./dashboard-data";
import { DashboardHeader } from "./dashboard-header";
import {
  peopleSortOptions,
  projectSortOptions,
  type SortOption,
} from "./filter-modal";
import { MessageModal } from "./message-modal";
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
};

export function JobSeekerDashboardPage({
  initialMode = "Projects",
}: JobSeekerDashboardPageProps) {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<DashboardMode>(initialMode);
  const [activeCategory, setActiveCategory] = useState("For You");
  const [activeSort, setActiveSort] = useState<SortOption>("Recommended");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [messagePerson, setMessagePerson] = useState<DashboardPerson | null>(
    null,
  );

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
        className="mx-auto min-h-screen w-full px-4 py-6 sm:px-5 lg:px-12"
        initial="hidden"
        transition={mediaHireMotion.page}
        variants={fadeInUp}
      >
        <DashboardHeader
          isMenuOpen={isMenuOpen}
          isUserMenuOpen={isUserMenuOpen}
          onToggleMenu={() => setIsMenuOpen((current) => !current)}
          onToggleUserMenu={() => setIsUserMenuOpen((current) => !current)}
        />

        <section
          className={`mx-auto mt-8 w-full max-w-5xl p-4 sm:p-5 ${mediaHireClassNames.sectionCard}`}
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
            onMessage={setMessagePerson}
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

      <DashboardFooter />

      <MessageModal
        onClose={() => setMessagePerson(null)}
        person={messagePerson}
      />
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
    <div className="mt-4 flex flex-wrap justify-center gap-2 rounded-2xl bg-slate-50 p-2.5">
      {sortOptions.map((option) => {
        const isActive = activeSort === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onSortChange(option)}
            className={`h-8 rounded-full px-3.5 text-[11px] font-black transition hover:-translate-y-0.5 ${
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
