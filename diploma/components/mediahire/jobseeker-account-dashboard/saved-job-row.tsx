import Link from "next/link";
import { motion } from "framer-motion";
import type { SavedJob } from "./dashboard-data";
import { mediaHireMotion } from "../ui/design-system";

type SavedJobRowProps = {
  job: SavedJob;
};

export function SavedJobRow({ job }: SavedJobRowProps) {
  return (
    <motion.div whileHover={{ x: 3, transition: mediaHireMotion.fast }}>
      <Link
        className="grid grid-cols-[44px_1fr_auto] items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-slate-50"
        href={`/jobs/${job.id}`}
      >
        <span
          className={`grid h-11 w-11 place-items-center rounded-full text-xs font-black ${job.logoClass}`}
        >
          {job.logoText}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-black text-slate-950">
            {job.title}
          </span>
          <span className="mt-1 block truncate text-xs font-medium text-slate-500">
            {job.skill} • {job.type} • {job.location}
          </span>
        </span>
        <span className="rounded-md bg-red-50 px-2.5 py-1 text-xs font-bold text-red-500">
          {job.date}
        </span>
      </Link>
    </motion.div>
  );
}
