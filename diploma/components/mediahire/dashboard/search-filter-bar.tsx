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
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <button
        type="button"
        onClick={onOpenFilter}
        className="flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-black text-slate-900 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filter
      </button>

      <div className="flex h-11 flex-1 items-center gap-3 rounded-full bg-slate-100 px-5">
        <Search className="h-5 w-5 text-slate-500" />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={mode === "Projects" ? "Search projects" : "Search people"}
          className="h-full flex-1 bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="grid h-11 grid-cols-2 rounded-full bg-slate-100 p-1 lg:w-[230px]">
        <button
          type="button"
          onClick={() => onModeChange("Projects")}
          className={`rounded-full text-sm font-black transition ${
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
          className={`rounded-full text-sm font-black transition ${
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