"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CategoryPills } from "./category-pills";
import { DashboardFooter } from "./dashboard-footer";
import type { DashboardPerson } from "./dashboard-data";
import { DashboardHeader } from "./dashboard-header";
import { FilterModal } from "./filter-modal";
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [messagePerson, setMessagePerson] = useState<DashboardPerson | null>(
    null,
  );

  function handleModeChange(nextMode: DashboardMode) {
    setMode(nextMode);

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
        className="mx-auto min-h-screen w-full px-4 py-8 sm:px-8 lg:px-12"
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

        <section className={`mx-auto mt-10 w-full max-w-6xl p-5 sm:p-6 ${mediaHireClassNames.sectionCard}`}>
          <SearchFilterBar
            mode={mode}
            onModeChange={handleModeChange}
            onOpenFilter={() => setIsFilterOpen(true)}
            onSearchChange={setSearch}
            search={search}
          />

          <CategoryPills
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        </section>

        {mode === "People" ? (
          <PeopleGrid
            activeCategory={activeCategory}
            onMessage={setMessagePerson}
            search={search}
          />
        ) : (
          <ProjectGrid search={search} />
        )}
      </motion.div>

      <DashboardFooter />

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      <MessageModal
        onClose={() => setMessagePerson(null)}
        person={messagePerson}
      />
    </main>
  );
}
