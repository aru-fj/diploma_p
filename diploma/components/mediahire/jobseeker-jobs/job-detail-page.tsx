"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import {
  Bookmark,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Clock3,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import {
  getMediaHireCompany,
  getSimilarJobs,
  type MediaHireJob,
} from "../jobs-data";
import { JobSeekerNav } from "./job-shared-ui";
import {
  applyJob,
  getApplicationForJob,
  isJobSaved,
  toggleSavedJob,
} from "../shared/user-state";
import {
  hasMediaHireSession,
  requireJobSeekerAuth,
} from "../shared/guest-permissions";

export function JobDetailPage({ job }: { job: MediaHireJob }) {
  const router = useRouter();
  const company = getMediaHireCompany(job.companyId);
  const similarJobs = getSimilarJobs(job.id).slice(0, 6);
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
      <div className="bg-white py-6">
        <JobSeekerNav active="Search Job" />
      </div>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white px-5 py-6 shadow-sm ring-1 ring-slate-200 sm:px-6">
          <section className="flex flex-col gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-start">
            <Link
              href={`/home/jobseeker/company/${job.companyId}`}
              className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-400 to-blue-600 transition hover:scale-105"
            >
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={job.companyName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <ShieldCheck className="h-10 w-10 text-white" />
              )}
            </Link>

            <div className="min-w-0 flex-1">
              <Link
                href={`/home/jobseeker/company/${job.companyId}`}
                className="inline-flex flex-wrap items-center gap-2 transition hover:text-blue-600"
              >
                <p className="text-sm font-semibold text-slate-500">
                  {job.companyName}
                </p>
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
              </Link>

              <div className="mt-1 flex items-center gap-3">
                <h1 className="text-xl font-black tracking-tight text-slate-950 md:text-2xl">
                  {job.title}
                </h1>

                <button
                  aria-label={
                    isAuthenticated && saved ? "Unsave job" : "Save job"
                  }
                  className={`grid h-8 w-8 place-items-center rounded-full transition ${
                    isAuthenticated && saved
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 text-blue-600 hover:bg-blue-100"
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
                    className="h-4 w-4"
                  />
                </button>
              </div>

              <p className="mt-3 max-w-2xl text-xs font-medium leading-5 text-slate-500 md:text-[13px]">
                {job.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  className={`inline-flex h-9 items-center justify-center rounded-lg px-5 text-xs font-black text-white transition ${
                    isAuthenticated && applied
                      ? "bg-emerald-600"
                      : "bg-blue-600 hover:bg-blue-700"
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
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-blue-600 bg-white px-5 text-xs font-black text-blue-600 transition hover:bg-blue-50"
                  onClick={() => {
                    void (async () => {
                      if (!(await requireJobSeekerAuth("message employers"))) {
                        return;
                      }

                      router.push(
                        `/dashboard/jobseeker/community?chat=${job.companyId}`,
                      );
                    })();
                  }}
                  type="button"
                >
                  <MessageSquare className="h-4 w-4" />
                  Message
                </button>
              </div>
            </div>
          </section>

          <section className="grid gap-4 border-b border-slate-200 py-6 sm:grid-cols-2 lg:grid-cols-4">
            <InfoIconCard
              icon={<Clock3 className="h-5 w-5" />}
              title={job.type}
              label="Employment Type"
            />

            <InfoIconCard
              icon={<CalendarClock className="h-5 w-5" />}
              title={job.level}
              label="Experience Level"
            />

            <InfoIconCard
              icon={<MapPin className="h-5 w-5" />}
              title={job.location}
              label="Location"
            />

            <InfoIconCard
              icon={<Wallet className="h-5 w-5" />}
              title={job.salary}
              label="Salary"
            />
          </section>

          <section className="pt-8">
            <h2 className="text-base font-black text-slate-950">Overview</h2>

            <p className="mt-3 text-xs font-medium leading-6 text-slate-600 md:text-[13px]">
              {job.description}
            </p>
          </section>

          <section className="pt-8">
            <h2 className="text-base font-black text-slate-950">
              Job Description
            </h2>

            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-xs font-medium leading-6 text-slate-600 md:text-[13px]">
              {job.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="pt-8">
            <h2 className="text-base font-black text-slate-950">
              What we offer
            </h2>

            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-xs font-medium leading-6 text-slate-600 md:text-[13px]">
              {job.offer.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="pt-7">
            <div className="flex flex-wrap gap-2">
              <Tag>{job.type}</Tag>
              <Tag>{job.level}</Tag>
              {job.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </section>

          {company ? (
            <section className="pt-12">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-base font-black text-slate-950">
                  About Company
                </h2>

                <Link
                  href={`/home/jobseeker/company/${company.id}`}
                  className="inline-flex items-center gap-1 text-xs font-black text-blue-600"
                >
                  More
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <Link
                href={`/home/jobseeker/company/${company.id}`}
                className="mt-4 flex w-fit items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-10 w-10 rounded-xl object-cover"
                />

                <div>
                  <p className="text-sm font-black text-slate-950">
                    {company.name}
                  </p>
                  <p className="text-xs font-semibold text-slate-500">
                    {company.location}
                  </p>
                </div>
              </Link>

              <p className="mt-4 text-xs font-medium leading-6 text-slate-600 md:text-[13px]">
                {company.description}
              </p>
            </section>
          ) : null}

          <section className="pt-12">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-base font-black text-slate-950">
                Similar jobs
              </h2>

              <Link
                href="/home/jobseeker/job-search"
                className="inline-flex items-center gap-1 text-xs font-black text-blue-600"
              >
                More
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {similarJobs.map((similarJob) => (
                <Link
                  key={similarJob.id}
                  href={`/home/jobseeker/jobs/${similarJob.id}`}
                  className="rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_14px_40px_rgba(37,99,235,0.10)]"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={similarJob.companyLogo}
                      alt={similarJob.companyName}
                      className="h-10 w-10 rounded-lg object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-semibold text-slate-400">
                        {similarJob.companyName}
                      </p>

                      <h3 className="mt-1 truncate text-sm font-black text-slate-950">
                        {similarJob.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <span className="rounded-md bg-blue-50 px-2 py-1 text-[11px] font-black text-blue-600">
                          {similarJob.type}
                        </span>

                        <span className="rounded-md bg-blue-50 px-2 py-1 text-[11px] font-black text-blue-600">
                          {similarJob.level}
                        </span>
                      </div>

                      <p className="mt-3 flex items-center gap-1 text-xs font-semibold text-slate-500">
                        <MapPin className="h-3.5 w-3.5" />
                        {similarJob.location}
                      </p>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <p className="text-xs font-black text-blue-600">
                          {similarJob.salary}
                        </p>

                        <p className="text-[11px] font-medium text-slate-400">
                          {similarJob.postedAt}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function InfoIconCard({
  icon,
  title,
  label,
}: {
  icon: ReactNode;
  title: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 border-r border-slate-200 last:border-r-0">
      <div className="text-slate-950">{icon}</div>

      <div>
        <p className="text-xs font-black text-slate-950">{title}</p>
        <p className="text-[11px] font-medium text-slate-400">{label}</p>
      </div>
    </div>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500">
      {children}
    </span>
  );
}
