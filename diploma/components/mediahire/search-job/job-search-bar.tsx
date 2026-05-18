"use client";

import { MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";
import { mediaHireMotion } from "../ui/design-system";

type JobSearchBarProps = {
  keyword: string;
  location: string;
  onKeywordChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSearch: () => void;
};

export function JobSearchBar({
  keyword,
  location,
  onKeywordChange,
  onLocationChange,
  onSearch,
}: JobSearchBarProps) {
  return (
    <section className="mx-auto mt-12 max-w-3xl text-center">
      <h2 className="text-2xl font-black tracking-tight text-[#252525]">
        Discover the Best Job
      </h2>

      <div className="mx-auto mt-6 flex max-w-xl flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:h-12 sm:flex-row sm:items-center">
        <label className="flex flex-1 items-center gap-2 px-4 py-3 text-slate-400 sm:py-0">
          <Search size={16} />
          <input
            className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
            onChange={(event) => onKeywordChange(event.target.value)}
            placeholder="Job title or keywords"
            type="search"
            value={keyword}
          />
        </label>

        <label className="flex border-t border-slate-100 px-4 py-3 text-slate-500 sm:h-full sm:w-44 sm:border-l sm:border-t-0">
          <span className="flex items-center gap-2">
            <MapPin size={15} />
            <input
              className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500"
              onChange={(event) => onLocationChange(event.target.value)}
              placeholder="location"
              type="text"
              value={location}
            />
          </span>
        </label>

        <motion.button
          className="h-12 bg-[#0B63E5] px-6 text-sm font-black text-white transition hover:bg-[#0758cf]"
          onClick={onSearch}
          type="button"
          whileHover={{ y: -2, transition: mediaHireMotion.fast }}
          whileTap={{ scale: 0.98 }}
        >
          Search
        </motion.button>
      </div>
    </section>
  );
}
