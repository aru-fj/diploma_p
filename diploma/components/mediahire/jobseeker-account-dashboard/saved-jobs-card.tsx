import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { savedJobs } from "./dashboard-data";
import { SavedJobRow } from "./saved-job-row";
import { fadeInUp, mediaHireClassNames, mediaHireMotion } from "../ui/design-system";

export function SavedJobsCard() {
  return (
    <motion.section
      animate="show"
      className={`p-5 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(1)}
      variants={fadeInUp}
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-950">Save job</h2>
        <Link
          className="inline-flex items-center gap-1 text-sm font-black text-[#0B63E5] transition hover:gap-2"
          href="/saved-jobs"
        >
          View all <ChevronRight size={16} />
        </Link>
      </div>
      <div className="divide-y divide-slate-100">
        {savedJobs.map((job) => (
          <SavedJobRow job={job} key={job.id} />
        ))}
      </div>
    </motion.section>
  );
}
