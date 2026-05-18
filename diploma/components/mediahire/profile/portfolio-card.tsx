"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { ProfileProject } from "./profile-data";
import {
  fadeInUp,
  mediaHireClassNames,
  mediaHireMotion,
} from "../ui/design-system";

type PortfolioCardProps = {
  index: number;
  project: ProfileProject;
};

export function PortfolioCard({ index, project }: PortfolioCardProps) {
  return (
    <motion.article
      initial="hidden"
      transition={mediaHireMotion.item(index)}
      variants={fadeInUp}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={mediaHireMotion.cardHover}
      whileInView="show"
    >
      <Link
        className={`group block rounded-3xl bg-white p-3 shadow-[0_18px_60px_rgba(15,23,42,0.05)] ${mediaHireClassNames.focus}`}
        href={`/portfolio/${project.id}`}
      >
        <div className="relative aspect-[1.58] overflow-hidden rounded-2xl bg-slate-100">
          <Image
            alt={project.title}
            className="object-cover transition duration-500 group-hover:scale-105"
            fill
            loading={index < 4 ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 560px"
            src={project.image}
          />
          <span className="absolute right-4 top-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-white/90 text-slate-950 opacity-0 shadow-lg backdrop-blur transition group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={17} />
          </span>
        </div>
        <div className="px-1 pb-3 pt-4">
          <h3 className="text-lg font-black leading-tight text-slate-950">
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm font-semibold text-slate-500">
            Dana Muhtarova
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
