"use client";

import { ChevronUp, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  fadeIn,
  mediaHireClassNames,
  mediaHireMotion,
} from "../ui/design-system";
import type { DashboardMode } from "./search-filter-bar";

export type SortOption =
  | "Recommended"
  | "Top Rated"
  | "Popular Now"
  | "Most Viewed"
  | "Most Discussed"
  | "Recently Added"
  | "Most Hired"
  | "Most Experienced"
  | "Most Popular"
  | "Recently Active";

type FilterModalProps = {
  activeSort: SortOption;
  isOpen: boolean;
  mode: DashboardMode;
  onClose: () => void;
  onSortChange: (sort: SortOption) => void;
};

export const projectSortOptions: SortOption[] = [
  "Recommended",
  "Top Rated",
  "Popular Now",
  "Most Viewed",
  "Most Discussed",
  "Recently Added",
];

export const peopleSortOptions: SortOption[] = [
  "Recommended",
  "Top Rated",
  "Most Hired",
  "Most Experienced",
  "Most Popular",
  "Recently Active",
];

export function FilterModal({
  activeSort,
  isOpen,
  mode,
  onClose,
  onSortChange,
}: FilterModalProps) {
  const sortOptions =
    mode === "People" ? peopleSortOptions : projectSortOptions;

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          animate="show"
          className="fixed inset-0 z-50"
          exit={{ opacity: 0 }}
          initial="hidden"
          transition={mediaHireMotion.fast}
          variants={fadeIn}
        >
          <button
            aria-label="Close filter overlay"
            className="absolute inset-0 bg-transparent"
            onClick={onClose}
            type="button"
          />

          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-4 top-[120px] z-50 w-[290px] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.14)] sm:left-8 sm:top-[132px] sm:w-[320px] lg:left-[78px] lg:top-[162px]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-[18px] font-semibold text-slate-900">
                  All Filters
                </h2>
              </div>

              <button
                aria-label="Close filter"
                className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-[#eef4ff] hover:text-[#0B63E5]"
                onClick={onClose}
                type="button"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-3 h-px bg-slate-200" />

            <div className="mt-4 flex items-center justify-between">
              <h3 className="text-[16px] font-semibold text-slate-900">
                Sort By
              </h3>
              <ChevronUp size={18} className="text-slate-700" />
            </div>

            <div className="mt-4 grid gap-3">
              {sortOptions.map((option) => {
                const isChecked = activeSort === option;

                return (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-3 text-[15px] font-medium text-slate-600"
                  >
                    <input
                      checked={isChecked}
                      className="h-5 w-5 appearance-none rounded-full border-2 border-slate-300 bg-white checked:border-[#0B63E5] checked:bg-[#0B63E5]"
                      name={`sort-${mode}`}
                      onChange={() => onSortChange(option)}
                      type="radio"
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>

            <div className="mt-4 space-y-2 border-t border-slate-200 pt-3">
              <div className="h-px bg-slate-100" />
              <div className="h-px bg-slate-100" />
            </div>

            <button
              className={`mt-4 w-full ${mediaHireClassNames.primaryButton}`}
              onClick={onClose}
              type="button"
            >
              Apply filters
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
