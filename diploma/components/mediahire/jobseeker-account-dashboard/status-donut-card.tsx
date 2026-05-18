import { motion } from "framer-motion";
import { fadeInUp, mediaHireClassNames, mediaHireMotion } from "../ui/design-system";

export function StatusDonutCard() {
  return (
    <motion.section
      animate="show"
      className={`p-6 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(1)}
      variants={fadeInUp}
    >
      <div className="grid gap-5 sm:grid-cols-[150px_1fr] lg:grid-cols-1 xl:grid-cols-[150px_1fr]">
        <div className="relative mx-auto grid h-36 w-36 place-items-center rounded-full bg-[conic-gradient(#0B63E5_0deg_38deg,#e5e7eb_38deg_360deg)]">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-white text-center">
            <span className="block text-2xl font-black text-slate-950">2</span>
            <span className="-mt-5 block text-xs font-medium text-slate-500">
              Total job
            </span>
          </div>
        </div>
        <div className="grid content-center gap-3">
          {[
            ["Under Review", 2, "bg-[#0B63E5]"],
            ["Accepted", 0, "bg-[#74b5ff]"],
            ["Rejected", 0, "bg-[#d8e9ff]"],
          ].map(([label, value, color]) => (
            <div className="flex items-center gap-3" key={label}>
              <span className={`h-4 w-4 rounded-full ${color}`} />
              <span className="flex-1 text-sm font-semibold text-slate-600">
                {label}
              </span>
              <span className="text-sm font-black text-slate-950">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between gap-4">
        <h2 className="text-xl font-black text-slate-950">Status of apply</h2>
        <span className="text-xs font-semibold text-slate-500">
          January 2025
        </span>
      </div>
      <p className="mt-3 text-sm font-medium leading-6 text-slate-500">
        Track your applications and see how many jobs are currently under
        review.
      </p>
    </motion.section>
  );
}
