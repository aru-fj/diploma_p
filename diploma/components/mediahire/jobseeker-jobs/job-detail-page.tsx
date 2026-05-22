"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bookmark, CheckCircle2, MessageSquare } from "lucide-react";

import {
  getMediaHireCompany,
  getSimilarJobs,
  type MediaHireJob,
} from "../jobs-data";
import {
  JobCard,
  JobFacts,
  JobSeekerNav,
  MediaHireFooter,
} from "./job-shared-ui";
import {
  applyJob,
  getApplicationForJob,
  isJobSaved,
  toggleSavedJob,
} from "../shared/user-state";
import { hasMediaHireSession, requireJobSeekerAuth } from "../shared/guest-permissions";

export function JobDetailPage({ job }: { job: MediaHireJob }) {
  const company = getMediaHireCompany(job.companyId);
  const similarJobs = getSimilarJobs(job.id);
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    void hasMediaHireSession().then((sessionExists) => {
      if (!isMounted) {
        return;
      }

      setIsAuthenticated(sessionExists);
      setSaved(sessionExists ? isJobSaved(job.id) : false);
      setApplied(sessionExists ? Boolean(getApplicationForJob(job.id)) : false);
    });

    return () => {
      isMounted = false;
    };
  }, [job.id]);

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <div className="bg-white py-8">
        <JobSeekerNav active="Search Job" />
      </div>

      <section className="mx-auto w-[min(1320px,calc(100%-32px))] rounded-[2rem] bg-white p-6 shadow-[0_22px_70px_rgba(15,23,42,0.06)] md:p-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-start">
          <Link
            className="block h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-slate-100"
            href={`/home/jobseeker/company/${job.companyId}`}
          >
            <img
              alt={job.companyName}
              className="h-full w-full object-cover transition duration-300 hover:scale-105"
              src={job.companyLogo}
            />
          </Link>
          <div className="min-w-0 flex-1">
            <Link
              className="inline-flex items-center gap-1 text-sm font-black text-slate-400 transition hover:text-[#0B63E5]"
              href={`/home/jobseeker/company/${job.companyId}`}
            >
              {job.companyName}
              <CheckCircle2 size={15} className="text-[#0B63E5]" />
            </Link>
            <div className="mt-1 flex items-center gap-3">
              <h1 className="text-3xl font-black tracking-tight text-slate-950">
                {job.title}
              </h1>
              <button
                aria-label={isAuthenticated && saved ? "Unsave job" : "Save job"}
                className={`grid h-10 w-10 place-items-center rounded-full transition ${
                  isAuthenticated && saved
                    ? "bg-[#0B63E5] text-white"
                    : "bg-[#eef4ff] text-[#0B63E5] hover:bg-[#dcecff]"
                }`}
                onClick={() => {
                  void (async () => {
                    if (!(await requireJobSeekerAuth("save jobs"))) {
                      return;
                    }

                    setSaved(toggleSavedJob(job.id).includes(job.id));
                  })();
                }}
                type="button"
              >
                <Bookmark
                  fill={isAuthenticated && saved ? "currentColor" : "none"}
                  size={20}
                />
              </button>
            </div>
            <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-slate-500">
              {job.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className={`h-11 rounded-xl px-7 text-sm font-black text-white transition ${
                  isAuthenticated && applied
                    ? "bg-emerald-600"
                    : "bg-[#0B63E5] hover:bg-[#0958cc]"
                }`}
                onClick={() => {
                  void (async () => {
                    if (!(await requireJobSeekerAuth("apply for jobs"))) {
                      return;
                    }

                    applyJob(job.id, "Applied");
                    setApplied(true);
                  })();
                }}
                type="button"
              >
                {isAuthenticated && applied ? "Already Applied" : "Apply Now"}
              </button>
              <button
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#0B63E5] px-7 text-sm font-black text-[#0B63E5] transition hover:bg-[#eef4ff]"
                onClick={() => {
                  void requireJobSeekerAuth("message employers");
                }}
                type="button"
              >
                <MessageSquare size={17} />
                Message
              </button>
            </div>
          </div>
        </div>

        <div className="mt-9">
          <JobFacts job={job} />
        </div>

        <div className="mt-10 grid gap-9">
          <section>
            <h2 className="text-xl font-black text-slate-950">Overview</h2>
            <p className="mt-4 text-base font-medium leading-8 text-slate-600">
              {job.description}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-950">Job Description</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base font-medium leading-7 text-slate-600">
              {job.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-950">What we offer</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base font-medium leading-7 text-slate-600">
              {job.offer.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <span
                className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-600"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>

          {company ? (
            <section>
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-black text-slate-950">About Company</h2>
                <Link
                  className="text-sm font-black text-[#0B63E5]"
                  href={`/home/jobseeker/company/${company.id}`}
                >
                  More
                </Link>
              </div>
              <p className="mt-4 text-base font-medium leading-8 text-slate-600">
                {company.description}
              </p>
            </section>
          ) : null}

          <section>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-black text-slate-950">Similar jobs</h2>
              <Link className="text-sm font-black text-[#0B63E5]" href="/home/jobseeker/job-search">
                More
              </Link>
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {similarJobs.map((similarJob) => (
                <JobCard job={similarJob} key={similarJob.id} />
              ))}
            </div>
          </section>
        </div>
      </section>

      <MediaHireFooter />
    </main>
  );
}
