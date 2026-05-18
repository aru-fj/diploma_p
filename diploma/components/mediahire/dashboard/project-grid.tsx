"use client";

import { dashboardProjects } from "./dashboard-data";
import { ProjectCard } from "./project-card";

type ProjectGridProps = {
  search: string;
};

export function ProjectGrid({ search }: ProjectGridProps) {
  const normalizedSearch = search.trim().toLowerCase();
  const visibleProjects = normalizedSearch
    ? dashboardProjects.filter(
        (project) =>
          project.title.toLowerCase().includes(normalizedSearch) ||
          project.author.toLowerCase().includes(normalizedSearch),
      )
    : dashboardProjects;

  return (
    <section className="mx-auto mt-10 w-full max-w-5xl pb-16" id="latest-work">
      <h2 className="text-center text-3xl font-black tracking-tight text-[#252525]">
        Latest work
      </h2>

      <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project, index) => (
          <ProjectCard
            index={index}
            key={`${project.title}-${project.author}`}
            project={project}
          />
        ))}
      </div>

      {visibleProjects.length === 0 ? (
        <div className="mx-auto mt-12 max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <h3 className="text-xl font-black text-slate-950">
            No projects found
          </h3>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Try another keyword or clear your search.
          </p>
        </div>
      ) : null}
    </section>
  );
}
