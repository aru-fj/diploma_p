"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import type { JobVacancy } from "./job-search-data";
import {
  fadeInUp,
  mediaHireClassNames,
  mediaHireMotion,
} from "../ui/design-system";

type JobCardProps = {
  index: number;
  job: JobVacancy;
};

export function JobCard({ index, job }: JobCardProps) {
  return (
    <motion.article
      initial="hidden"
      transition={mediaHireMotion.item(index)}
      variants={fadeInUp}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={mediaHireMotion.cardHover}
      whileInView="show"
    >
      <Link
        className={`block rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.035)] transition hover:border-[#0B63E5]/30 hover:shadow-[0_22px_60px_rgba(11,99,229,0.10)] ${mediaHireClassNames.focus}`}
        href={`/jobs/${job.id}`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl text-sm font-black ${job.logoColor}`}
          >
            {job.logoText}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-500">
              {job.company}
            </p>
            <h3 className="mt-1 text-lg font-black leading-tight text-slate-950">
              {job.title}
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <span
                  className="rounded-md bg-[#eef4ff] px-2 py-1 text-xs font-black text-[#0B63E5]"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <MapPin size={13} />
              {job.location}
            </p>
            <p className="mt-2 text-sm font-black text-[#0B63E5]">
              {job.salary}
            </p>
          </div>
          <span className="text-xs font-medium text-slate-400">
            {job.posted}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
