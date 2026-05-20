"use client";

import { useEffect, useState } from "react";
import { dashboardProjects } from "./dashboard-data";
import type { SortOption } from "./filter-modal";
import { ProjectCard } from "./project-card";
import {
  getSavedProfileIds,
  SAVED_PROFILES_CHANGED_EVENT,
} from "@/components/mediahire/saved-profiles-storage";

type ProjectGridProps = {
  activeCategory: string;
  activeSort: SortOption;
  search: string;
};

const emptyMessages: Record<string, string> = {
  Saved: "Saved projects will appear here after you save a creator profile.",
  "Graphic design": "There are no portfolios related to Graphic design yet.",
  "3D Animation": "There are no portfolios related to 3D Animation yet.",
  Marketing: "There are no portfolios related to Marketing yet.",
  Production: "There are no portfolios related to Production yet.",
  Photography: "There are no portfolios related to Photography yet.",
};

function getProfileIdFromHref(profileHref: string) {
  return profileHref.split("/").filter(Boolean).pop() || "";
}

export function ProjectGrid({
  activeCategory,
  activeSort,
  search,
}: ProjectGridProps) {
  const [savedProfileIds, setSavedProfileIds] = useState<string[]>([]);

  useEffect(() => {
    const syncSavedProfiles = () => {
      setSavedProfileIds(getSavedProfileIds());
    };

    syncSavedProfiles();

    window.addEventListener(SAVED_PROFILES_CHANGED_EVENT, syncSavedProfiles);
    window.addEventListener("storage", syncSavedProfiles);

    return () => {
      window.removeEventListener(SAVED_PROFILES_CHANGED_EVENT, syncSavedProfiles);
      window.removeEventListener("storage", syncSavedProfiles);
    };
  }, []);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredByCategory =
    activeCategory === "For You"
      ? dashboardProjects
      : activeCategory === "Saved"
        ? dashboardProjects.filter((project) =>
            savedProfileIds.includes(getProfileIdFromHref(project.profileHref)),
          )
        : dashboardProjects.filter(
            (project) => project.category === activeCategory,
          );

  const visibleProjects = filteredByCategory.filter(
    (project) =>
      !normalizedSearch ||
      project.title.toLowerCase().includes(normalizedSearch) ||
      project.author.toLowerCase().includes(normalizedSearch) ||
      project.category?.toLowerCase().includes(normalizedSearch),
  );

  const sortedProjects = [...visibleProjects].sort((a, b) => {
    if (activeSort === "Top Rated") {
      return a.title.localeCompare(b.title);
    }

    if (activeSort === "Popular Now") {
      return b.author.localeCompare(a.author);
    }

    if (activeSort === "Most Viewed") {
      return b.id.localeCompare(a.id);
    }

    if (activeSort === "Most Discussed") {
      return a.author.localeCompare(b.author);
    }

    if (activeSort === "Recently Added") {
      return b.title.localeCompare(a.title);
    }

    return 0;
  });

  const emptyMessage =
    activeCategory === "For You"
      ? "No recommended portfolios found."
      : emptyMessages[activeCategory] ??
        `There are no portfolios related to ${activeCategory} yet.`;

  return (
    <section className="mx-auto mt-10 w-full max-w-5xl pb-16" id="latest-work">
      <h2 className="text-center text-3xl font-black tracking-tight text-[#252525]">
        Latest work
      </h2>

      {sortedProjects.length > 0 ? (
        <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProjects.map((project, index) => (
            <ProjectCard index={index} key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-dashed border-[#0B63E5]/30 bg-[#0B63E5]/5 px-8 py-12 text-center">
          <p className="text-lg font-black text-slate-900">{emptyMessage}</p>

          <p className="mt-3 text-sm font-semibold text-slate-500">
            {activeCategory === "Saved"
              ? "Open a person profile and click Save. Their works will appear here."
              : "Explore other categories or come back later to see new portfolios."}
          </p>
        </div>
      )}
    </section>
  );
}
