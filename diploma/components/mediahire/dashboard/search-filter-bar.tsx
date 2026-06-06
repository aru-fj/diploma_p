"use client";

import { Search, SlidersHorizontal } from "lucide-react";

export type DashboardMode = "Projects" | "People";

type SearchFilterBarProps = {
  mode: DashboardMode;
  search: string;
  onSearchChange: (value: string) => void;
  onModeChange: (mode: DashboardMode) => void;
  onOpenFilter: () => void;
};

export function SearchFilterBar({
  mode,
  search,
  onSearchChange,
  onModeChange,
  onOpenFilter,
}: SearchFilterBarProps) {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
      <button
        type="button"
        onClick={onOpenFilter}
        className="jobseeker-filter-text flex h-8 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 text-[9px] font-semibold leading-none text-slate-900 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
      >
        <SlidersHorizontal className="h-3.5 w-3.5" />
        Filter
      </button>

      <div className="flex h-8 flex-1 items-center gap-2 rounded-full bg-slate-100 px-3">
        <Search className="h-3.5 w-3.5 text-slate-500" />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={mode === "Projects" ? "Search projects" : "Search people"}
          className="jobseeker-filter-input h-full flex-1 bg-transparent text-[9px] font-medium leading-none text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="grid h-8 grid-cols-2 rounded-full bg-slate-100 p-1 lg:w-[170px]">
        <button
          type="button"
          onClick={() => onModeChange("Projects")}
          className={`jobseeker-filter-text rounded-full text-[9px] font-semibold leading-none transition ${
            mode === "Projects"
              ? "bg-white text-slate-950 shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Projects
        </button>

        <button
          type="button"
          onClick={() => onModeChange("People")}
          className={`jobseeker-filter-text rounded-full text-[9px] font-semibold leading-none transition ${
            mode === "People"
              ? "bg-white text-slate-950 shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          People
        </button>
      </div>
    </div>
  );
}
