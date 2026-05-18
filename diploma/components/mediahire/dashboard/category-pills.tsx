"use client";

import { motion } from "framer-motion";
import { categoryPills } from "./dashboard-data";
import { mediaHireMotion } from "../ui/design-system";

type CategoryPillsProps = {
  activeCategory: string;
  onChange: (category: string) => void;
};

export function CategoryPills({
  activeCategory,
  onChange,
}: CategoryPillsProps) {
  return (
    <section className="mx-auto mt-6 w-full max-w-6xl overflow-x-auto pb-1">
      <div className="flex w-max gap-2.5 md:mx-auto md:w-full md:flex-wrap md:justify-center lg:gap-3">
        {categoryPills.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.label;

          return (
            <motion.button
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg px-4 text-[13px] font-black text-white shadow-[0_14px_34px_-22px_rgba(11,99,229,0.85)] transition hover:shadow-[0_18px_44px_-26px_rgba(11,99,229,0.95)] sm:h-12 sm:px-5 sm:text-sm ${
                isActive
                  ? "bg-[#0B63E5]"
                  : "bg-[#0B63E5] hover:bg-[#0758cf]"
              }`}
              key={category.label}
              onClick={() => onChange(category.label)}
              type="button"
              whileHover={{ y: -2, transition: mediaHireMotion.fast }}
              whileTap={{ scale: 0.98 }}
            >
              {Icon ? <Icon className="h-4 w-4 sm:h-[17px] sm:w-[17px]" /> : null}
              {category.label}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
