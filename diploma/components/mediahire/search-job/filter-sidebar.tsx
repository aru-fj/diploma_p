"use client";

import { ChevronDown, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { filterGroups } from "./job-search-data";
import {
  fadeIn,
  mediaHireMotion,
  slideInLeft,
} from "../ui/design-system";

type FilterSidebarProps = {
  isDrawerOpen?: boolean;
  onCloseDrawer?: () => void;
  openFilters: string[];
  onToggleFilter: (filter: string) => void;
};

function FilterContent({ openFilters, onToggleFilter }: FilterSidebarProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      {filterGroups.map((filter, index) => {
        const Icon = filter.icon;
        const isOpen = openFilters.includes(filter.label);

        return (
          <div
            className={index === 0 ? "" : "border-t border-slate-100"}
            key={filter.label}
          >
            <button
              className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left text-sm font-bold text-slate-800 transition hover:bg-[#eef4ff] hover:text-[#0B63E5]"
              onClick={() => onToggleFilter(filter.label)}
              type="button"
            >
              <span className="inline-flex items-center gap-2">
                <Icon size={15} />
                {filter.label}
              </span>
              {index > 1 ? (
                <ChevronDown
                  className={`transition ${isOpen ? "rotate-180" : ""}`}
                  size={15}
                />
              ) : null}
            </button>

            <AnimatePresence>
              {isOpen && index > 1 ? (
                <motion.div
                  animate={{ height: "auto", opacity: 1 }}
                  className="overflow-hidden"
                  exit={{ height: 0, opacity: 0 }}
                  initial={{ height: 0, opacity: 0 }}
                  transition={mediaHireMotion.fast}
                >
                  <div className="px-3 pb-3 text-xs font-medium leading-5 text-slate-500">
                    Select options will be connected to advanced job filters.
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function FilterSidebar(props: FilterSidebarProps) {
  return (
    <>
      <aside className="hidden lg:block">
        <FilterContent {...props} />
      </aside>

      <AnimatePresence>
        {props.isDrawerOpen ? (
          <motion.div
            animate="show"
            className="fixed inset-0 z-50 bg-slate-950/35 p-4 backdrop-blur-sm lg:hidden"
            exit={{ opacity: 0 }}
            initial="hidden"
            transition={mediaHireMotion.fast}
            variants={fadeIn}
          >
            <motion.aside
              animate="show"
              className="h-full w-full max-w-sm rounded-3xl bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.22)]"
              exit={{ opacity: 0, x: -18 }}
              initial="hidden"
              transition={mediaHireMotion.fast}
              variants={slideInLeft}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-950">Filters</h2>
                <button
                  aria-label="Close filters"
                  className="grid h-10 w-10 place-items-center rounded-full bg-slate-100"
                  onClick={props.onCloseDrawer}
                  type="button"
                >
                  <X size={20} />
                </button>
              </div>
              <FilterContent {...props} />
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
