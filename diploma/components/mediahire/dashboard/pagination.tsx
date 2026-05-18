"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination() {
  return (
    <nav
      aria-label="People pagination"
      className="mt-16 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600"
    >
      <button
        aria-label="Previous page"
        className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-slate-100 hover:text-[#0B63E5]"
        type="button"
      >
        <ChevronLeft size={16} />
      </button>
      {["1", "2", "3", "...", "9", "10"].map((page) => (
        <button
          className={`grid h-8 min-w-8 place-items-center rounded-md px-2 transition ${
            page === "1"
              ? "border border-slate-400 bg-white text-slate-950"
              : "hover:bg-slate-100 hover:text-[#0B63E5]"
          }`}
          disabled={page === "..."}
          key={page}
          type="button"
        >
          {page}
        </button>
      ))}
      <button
        aria-label="Next page"
        className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-slate-100 hover:text-[#0B63E5]"
        type="button"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
