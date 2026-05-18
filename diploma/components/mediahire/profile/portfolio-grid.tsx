"use client";

import { PortfolioCard } from "./portfolio-card";
import { profileProjects } from "./profile-data";

export function PortfolioGrid() {
  return (
    <div className="grid gap-x-9 gap-y-8 md:grid-cols-2">
      {profileProjects.map((project, index) => (
        <PortfolioCard index={index} key={project.id} project={project} />
      ))}
    </div>
  );
}
