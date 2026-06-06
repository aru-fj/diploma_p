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
        className="grid grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-2.5 rounded-xl px-2.5 py-2 transition hover:bg-slate-50"
        href={`/jobs/${job.id}`}
      >
        <span
          className={`grid h-9 w-9 place-items-center rounded-xl text-[11px] font-black ${job.logoClass}`}
        >
          {job.logoText}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-xs font-black text-slate-950">
            {job.title}
          </span>
          <span className="mt-0.5 block truncate text-xs font-medium text-slate-500">
            {job.skill} • {job.type} • {job.location}
          </span>
        </span>
        <span className="rounded-md bg-[#eef4ff] px-2 py-1 text-[11px] font-bold text-[#0B63E5]">
          {job.date}
        </span>
      </Link>
    </motion.div>
  );
}
