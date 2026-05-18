"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { JobCard } from "./job-card";
import { jobPaginationItems, type JobVacancy } from "./job-search-data";

type JobListProps = {
  currentPage: number;
  jobs: JobVacancy[];
  onPageChange: (page: number) => void;
};

export function JobList({ currentPage, jobs, onPageChange }: JobListProps) {
  return (
    <section>
      <div className="grid gap-4 md:grid-cols-2">
        {jobs.map((job, index) => (
          <JobCard index={index} job={job} key={job.id} />
        ))}
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <h3 className="text-2xl font-black text-slate-950">No jobs found</h3>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Try another keyword or location.
          </p>
        </div>
      ) : null}

      <nav
        aria-label="Job pagination"
        className="mt-10 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600"
      >
        <button
          aria-label="Previous page"
          className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-slate-100 hover:text-[#0B63E5]"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          type="button"
        >
          <ChevronLeft size={16} />
        </button>
        {jobPaginationItems.map((page) => (
          <button
            className={`grid h-8 min-w-8 place-items-center rounded-md px-2 transition ${
              String(currentPage) === page
                ? "border border-slate-400 bg-white text-slate-950"
                : "hover:bg-slate-100 hover:text-[#0B63E5]"
            }`}
            disabled={page === "..."}
            key={page}
            onClick={() => page !== "..." && onPageChange(Number(page))}
            type="button"
          >
            {page}
          </button>
        ))}
        <button
          aria-label="Next page"
          className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-slate-100 hover:text-[#0B63E5]"
          onClick={() => onPageChange(currentPage + 1)}
          type="button"
        >
          <ChevronRight size={16} />
        </button>
      </nav>
    </section>
  );
}
