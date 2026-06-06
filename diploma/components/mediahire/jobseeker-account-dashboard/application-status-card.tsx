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
  const [activeTab, setActiveTab] = useState<"Application Status" | "Job Offers">(
    "Application Status",
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
      className={`p-4 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(2)}
      variants={fadeInUp}
    >
      <div className="flex w-fit rounded-xl bg-slate-100 p-1">
        {(["Application Status", "Job Offers"] as const).map((tab) => (
          <button
            className={`rounded-lg px-3 py-1.5 text-[11px] font-black transition ${
              activeTab === tab
                ? "bg-white text-[#0B63E5] shadow-sm"
                : "text-slate-400 hover:text-[#0B63E5]"
            }`}
            key={tab}
            onClick={() => setActiveTab(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {applicationFilters.map((item) => (
            <button
              className={`h-8 rounded-lg px-3 text-[11px] font-black transition ${
                filter === item
                  ? "bg-[#0B63E5] text-white"
                  : "bg-[#eef4ff] text-[#0B63E5] hover:bg-[#dcecff]"
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
          className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700 outline-none focus:border-[#0B63E5] focus:ring-4 focus:ring-[#0B63E5]/10"
          onChange={(event) => setSort(event.target.value)}
          value={sort}
        >
          <option>Newest</option>
          <option>Oldest</option>
        </select>
      </div>

      <div className="mt-4 grid gap-3">
        {visibleApplications.map((application) => {
          const isExpanded = expandedId === application.id;

          return (
            <article
              className="rounded-2xl border border-slate-100 bg-white p-3"
              key={application.id}
            >
              <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div className="flex items-center gap-4">
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-xl text-xs font-black ${application.logoClass}`}
                  >
                    {application.logoText}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-400">
                      {application.company}
                    </p>
                    <h3 className="text-sm font-black text-slate-950">
                      {application.title}
                    </h3>
                    <button
                      className="mt-2 rounded-md border border-amber-300 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-500"
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
                  className="grid h-8 w-8 place-items-center rounded-full text-slate-700 transition hover:bg-[#eef4ff] hover:text-[#0B63E5]"
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
