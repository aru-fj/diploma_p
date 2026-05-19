"use client";

import { dashboardProjects } from "./dashboard-data";
import { ProjectCard } from "./project-card";

type ProjectGridProps = {
  search: string;
};

export function ProjectGrid({ search }: ProjectGridProps) {
  const normalizedSearch = search.trim().toLowerCase();

  const visibleProjects = dashboardProjects
    .slice(0, 3)
    .filter(
      (project) =>
        !normalizedSearch ||
        project.title.toLowerCase().includes(normalizedSearch) ||
        project.author.toLowerCase().includes(normalizedSearch),
    );

  return (
    <section className="mx-auto mt-10 w-full max-w-5xl pb-16" id="latest-work">
      <h2 className="text-center text-3xl font-black tracking-tight text-[#252525]">
        Latest work
      </h2>

      <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project, index) => (
          <ProjectCard index={index} key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}