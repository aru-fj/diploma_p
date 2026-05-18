"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  applicationFilters,
  applications,
  type ApplicationFilter,
} from "./dashboard-data";
import { ApplicationTimeline } from "./application-timeline";
import { fadeInUp, mediaHireClassNames, mediaHireMotion } from "../ui/design-system";

export function ApplicationStatusCard() {
  const [activeTab, setActiveTab] = useState<"Apply status" | "Offered job">(
    "Apply status",
  );
  const [filter, setFilter] = useState<ApplicationFilter>("All");
  const [sort, setSort] = useState("Newest");
  const [expandedId, setExpandedId] = useState("salem-uiux");

  const visibleApplications = useMemo(() => {
    if (filter === "All") {
      return applications;
    }

    return applications.filter((application) => application.status === filter);
  }, [filter]);

  return (
    <motion.section
      animate="show"
      className={`p-5 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(2)}
      variants={fadeInUp}
    >
      <div className="flex gap-7 border-b border-slate-100">
        {(["Apply status", "Offered job"] as const).map((tab) => (
          <button
            className={`relative px-3 pb-4 text-base font-black transition ${
              activeTab === tab
                ? "text-[#0B63E5]"
                : "text-slate-400 hover:text-[#0B63E5]"
            }`}
            key={tab}
            onClick={() => setActiveTab(tab)}
            type="button"
          >
            {tab}
            {activeTab === tab ? (
              <motion.span
                className="absolute bottom-[-1px] left-0 right-0 h-0.5 rounded-full bg-[#0B63E5]"
                layoutId="jobseeker-dashboard-tab"
                transition={mediaHireMotion.fast}
              />
            ) : null}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {applicationFilters.map((item) => (
            <button
              className={`h-9 rounded-lg border px-4 text-sm font-bold transition ${
                filter === item
                  ? "border-[#0B63E5] bg-[#0B63E5] text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-[#0B63E5] hover:text-[#0B63E5]"
              }`}
              key={item}
              onClick={() => setFilter(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        <select
          className="h-10 rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700 outline-none focus:border-[#0B63E5] focus:ring-4 focus:ring-[#0B63E5]/10"
          onChange={(event) => setSort(event.target.value)}
          value={sort}
        >
          <option>Newest</option>
          <option>Oldest</option>
        </select>
      </div>

      <div className="mt-7 grid gap-4">
        {visibleApplications.map((application) => {
          const isExpanded = expandedId === application.id;

          return (
            <article
              className="rounded-2xl border border-slate-200 bg-white p-5"
              key={application.id}
            >
              <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div className="flex items-center gap-4">
                  <span
                    className={`grid h-14 w-14 place-items-center rounded-xl text-xl font-black ${application.logoClass}`}
                  >
                    {application.logoText}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-400">
                      {application.company}
                    </p>
                    <h3 className="text-lg font-black text-slate-950">
                      {application.title}
                    </h3>
                    <button
                      className="mt-2 rounded-md border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-500"
                      onClick={() =>
                        setExpandedId((current) =>
                          current === application.id ? "" : application.id,
                        )
                      }
                      type="button"
                    >
                      {application.status}
                    </button>
                  </div>
                </div>
                <button
                  aria-label={isExpanded ? "Collapse history" : "Expand history"}
                  className="grid h-10 w-10 place-items-center rounded-full text-slate-700 transition hover:bg-[#eef4ff] hover:text-[#0B63E5]"
                  onClick={() =>
                    setExpandedId((current) =>
                      current === application.id ? "" : application.id,
                    )
                  }
                  type="button"
                >
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              <AnimatePresence initial={false}>
                {isExpanded ? (
                  <motion.div
                    animate={{ height: "auto", opacity: 1 }}
                    className="overflow-hidden"
                    exit={{ height: 0, opacity: 0 }}
                    initial={{ height: 0, opacity: 0 }}
                    transition={mediaHireMotion.fast}
                  >
                    <ApplicationTimeline history={application.history} />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </motion.section>
  );
}
