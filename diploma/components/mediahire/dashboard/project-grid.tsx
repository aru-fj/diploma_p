"use client";

import { dashboardProjects } from "./dashboard-data";
import { ProjectCard } from "./project-card";

type ProjectGridProps = {
  activeCategory: string;
  search: string;
};

const savedProjectIds: string[] = [];

const emptyMessages: Record<string, string> = {
  Saved:
    "Saved projects will appear here after you follow creators and save their works.",
  "Graphic design":
    "There are no portfolios related to Graphic design yet.",
  "3D Animation":
    "There are no portfolios related to 3D Animation yet.",
  Marketing: "There are no portfolios related to Marketing yet.",
  Production: "There are no portfolios related to Production yet.",
  Photography: "There are no portfolios related to Photography yet.",
};

export function ProjectGrid({ activeCategory, search }: ProjectGridProps) {
  const normalizedSearch = search.trim().toLowerCase();

  const filteredByCategory =
    activeCategory === "For You"
      ? dashboardProjects
      : activeCategory === "Saved"
        ? dashboardProjects.filter((project) =>
            savedProjectIds.includes(project.id),
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

      {visibleProjects.length > 0 ? (
        <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <ProjectCard index={index} key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-dashed border-[#0B63E5]/30 bg-[#0B63E5]/5 px-8 py-12 text-center">
          <p className="text-lg font-black text-slate-900">{emptyMessage}</p>

          <p className="mt-3 text-sm font-semibold text-slate-500">
            Explore other categories or come back later to see new portfolios.
          </p>
        </div>
      )}
    </section>
  );
}