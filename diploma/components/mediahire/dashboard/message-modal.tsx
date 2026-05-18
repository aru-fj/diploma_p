"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { DashboardPerson } from "./dashboard-data";
import {
  fadeIn,
  fadeInUp,
  mediaHireClassNames,
  mediaHireMotion,
} from "../ui/design-system";

type MessageModalProps = {
  onClose: () => void;
  person: DashboardPerson | null;
};

export function MessageModal({ onClose, person }: MessageModalProps) {
  return (
    <AnimatePresence>
      {person ? (
        <motion.div
          animate="show"
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/35 px-4 backdrop-blur-sm"
          exit={{ opacity: 0 }}
          initial="hidden"
          transition={mediaHireMotion.fast}
          variants={fadeIn}
        >
          <motion.div
            animate="show"
            className="w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-[0_28px_90px_rgba(15,23,42,0.22)]"
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            initial="hidden"
            transition={mediaHireMotion.fast}
            variants={fadeInUp}
          >
            <button
              aria-label="Close message dialog"
              className="ml-auto grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-[#eef4ff] hover:text-[#0B63E5]"
              onClick={onClose}
              type="button"
            >
              <X size={20} />
            </button>
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Message {person.name}
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm font-medium leading-6 text-slate-500">
              Chat routing is prepared for{" "}
              <span className="font-black text-[#0B63E5]">
                /messages/{person.id}
              </span>
              . This placeholder will become the message composer.
            </p>
            <button
              className={`mt-7 w-full ${mediaHireClassNames.primaryButton}`}
              onClick={onClose}
              type="button"
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
