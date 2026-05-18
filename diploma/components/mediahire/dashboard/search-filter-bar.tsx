"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { mediaHireClassNames } from "../ui/design-system";

export type DashboardMode = "People" | "Projects";

type SearchFilterBarProps = {
  mode: DashboardMode;
  onModeChange: (mode: DashboardMode) => void;
  onOpenFilter: () => void;
  onSearchChange: (value: string) => void;
  search: string;
};

export function SearchFilterBar({
  mode,
  onModeChange,
  onOpenFilter,
  onSearchChange,
  search,
}: SearchFilterBarProps) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center">
      <button
        className={`inline-flex h-14 items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-8 text-base font-black text-slate-900 shadow-[0_12px_32px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#0B63E5]/35 hover:text-[#0B63E5] ${mediaHireClassNames.focus}`}
        onClick={onOpenFilter}
        type="button"
      >
        <SlidersHorizontal size={18} />
        Filter
      </button>

      <div className="flex min-h-14 flex-1 flex-col gap-3 rounded-[1.7rem] border border-slate-200 bg-white px-4 py-2 shadow-[0_12px_32px_rgba(15,23,42,0.04)] sm:flex-row sm:items-center">
        <label className="flex flex-1 items-center gap-3 px-2 text-slate-400">
          <Search size={18} />
          <input
            className="h-10 w-full bg-transparent text-base font-semibold text-slate-900 outline-none placeholder:text-slate-400"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search"
            type="search"
            value={search}
          />
        </label>

        <div className="grid rounded-full bg-slate-100 p-1 sm:w-60 sm:grid-cols-2">
          {(["Projects", "People"] as const).map((item) => (
            <button
              className={`h-10 rounded-full px-5 text-sm font-black transition ${
                mode === item
                  ? "bg-white text-slate-950 shadow-[0_8px_22px_rgba(15,23,42,0.10)]"
                  : "text-slate-500 hover:text-[#0B63E5]"
              } ${mediaHireClassNames.focus}`}
              key={item}
              onClick={() => onModeChange(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
