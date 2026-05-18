"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  fadeIn,
  mediaHireClassNames,
  mediaHireMotion,
  slideInRight,
} from "../ui/design-system";

type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function FilterModal({ isOpen, onClose }: FilterModalProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          animate="show"
          className="fixed inset-0 z-50 bg-slate-950/35 px-4 py-6 backdrop-blur-sm"
          exit={{ opacity: 0 }}
          initial="hidden"
          transition={mediaHireMotion.fast}
          variants={fadeIn}
        >
          <motion.aside
            animate="show"
            className="ml-auto flex h-full w-full max-w-sm flex-col rounded-3xl bg-white p-6 shadow-[0_28px_90px_rgba(15,23,42,0.22)]"
            exit={{ opacity: 0, x: 28 }}
            initial="hidden"
            transition={mediaHireMotion.fast}
            variants={slideInRight}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-950">Filter</h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Placeholder controls for future search filters.
                </p>
              </div>
              <button
                aria-label="Close filter"
                className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-[#eef4ff] hover:text-[#0B63E5]"
                onClick={onClose}
                type="button"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-8 grid gap-5">
              {["Creative field", "Experience level", "Location", "Budget"].map(
                (label) => (
                  <label className="grid gap-2" key={label}>
                    <span className="text-sm font-black text-slate-800">
                      {label}
                    </span>
                    <input
                      className={mediaHireClassNames.input}
                      placeholder={`Select ${label.toLowerCase()}`}
                      type="text"
                    />
                  </label>
                ),
              )}
            </div>

            <button
              className={`mt-auto ${mediaHireClassNames.primaryButton}`}
              onClick={onClose}
              type="button"
            >
              Apply filters
            </button>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
