import { motion } from "framer-motion";
import { fadeInUp, mediaHireClassNames, mediaHireMotion } from "../ui/design-system";

export function StatusDonutCard() {
  return (
    <motion.section
      animate="show"
      className={`h-fit p-4 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(1)}
      variants={fadeInUp}
    >
      <div className="grid gap-4 sm:grid-cols-[120px_1fr] min-[1180px]:grid-cols-1">
        <div className="relative mx-auto grid h-32 w-32 place-items-center rounded-full bg-[conic-gradient(#0B63E5_0deg_180deg,#fbbf24_180deg_360deg)]">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-center">
            <span className="block text-lg font-black text-slate-950">2</span>
            <span className="-mt-2 block text-[10px] font-medium text-slate-500">
              Total Jobs
            </span>
          </div>
        </div>
        <div className="grid content-center gap-3">
          {[
            ["Total Jobs", 2, "bg-[#0B63E5]"],
            ["Under Review", 2, "bg-amber-400"],
            ["Accepted", 0, "bg-emerald-400"],
            ["Rejected", 0, "bg-rose-400"],
          ].map(([label, value, color]) => (
            <div className="flex items-center gap-3" key={label}>
              <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
              <span className="min-w-0 flex-1 truncate text-xs font-semibold text-slate-600">
                {label}
              </span>
              <span className="text-xs font-black text-slate-950">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <h2 className="text-sm font-black text-slate-950">Application Status</h2>
        <span className="text-xs font-semibold text-slate-500">
          January 2025
        </span>
      </div>
      <p className="mt-3 text-xs font-medium leading-5 text-slate-500">
        Track your applications and see how many jobs are currently under
        review.
      </p>
    </motion.section>
  );
}
