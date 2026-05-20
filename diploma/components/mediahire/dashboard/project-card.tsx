"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { DashboardProject } from "./dashboard-data";
import {
  fadeInUp,
  mediaHireClassNames,
  mediaHireMotion,
} from "../ui/design-system";

type ProjectCardProps = {
  index: number;
  project: DashboardProject;
};

export function ProjectCard({ index, project }: ProjectCardProps) {
  return (
    <motion.article
      className="h-full"
      initial="hidden"
      transition={mediaHireMotion.item(index)}
      variants={fadeInUp}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={mediaHireMotion.cardHover}
      whileInView="show"
    >
      <Link
        className={`group block h-full p-3 transition duration-300 hover:shadow-[0_28px_80px_rgba(11,99,229,0.12)] ${mediaHireClassNames.card} ${mediaHireClassNames.focus}`}
        href={`/home/jobseeker/work/${project.id}`}
      >
        <div className="relative aspect-[1.2] overflow-hidden rounded-xl bg-slate-100">
          <Image
            alt={project.title}
            className="object-cover transition duration-500 group-hover:scale-105"
            fill
            loading={index < 6 ? "eager" : "lazy"}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 31vw"
            src={project.image}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

          <span className="absolute right-3 top-3 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-white/90 text-slate-950 opacity-0 shadow-lg backdrop-blur transition group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={17} />
          </span>
        </div>

        <div className="px-1 pb-3 pt-4">
          <h3 className="text-lg font-black leading-tight text-slate-950">
            {project.title}
          </h3>

          <p className="mt-2 text-sm font-bold text-slate-500">
            {project.author}
          </p>

          {project.category ? (
            <div className="mt-3 inline-flex items-center rounded-full bg-[#0B63E5]/10 px-3 py-1 text-xs font-black text-[#0B63E5]">
              {project.category}
            </div>
          ) : null}
        </div>
      </Link>
    </motion.article>
  );
}