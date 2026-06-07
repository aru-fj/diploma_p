"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  BriefcaseBusiness,
  Clock3,
  MapPin,
} from "lucide-react";

import type { MediaHireJob } from "../jobs-data";
import {
  applyJob,
  getApplicationForJob,
  isJobSaved,
  toggleSavedJob,
} from "../shared/user-state";
import { hasMediaHireSession, requireJobSeekerAuth } from "../shared/guest-permissions";
import { JobSeekerNavbar } from "../jobseeker-navbar";

export function JobSeekerNav({ active = "Search Job" }: { active?: string }) {
  return <JobSeekerNavbar active={active} />;
}

export function MediaHireFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-[min(1320px,calc(100%-32px))] gap-8 py-9 md:grid-cols-4">
        <div>
          <h3 className="text-2xl font-black tracking-tight">
            <span className="text-[#0B63E5]">Media</span>
            <span className="text-slate-950">Hire</span>
          </h3>
          <p className="mt-3 max-w-xs text-xs font-medium leading-5 text-slate-500">
            MediaHire is a smart job search and recruitment platform that connects
            job seekers with employers. With fast search, professional resume
            building, and intelligent matching, hiring and job hunting stay simple.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-950">Our services</h4>
          <div className="mt-3 grid gap-2 text-xs font-semibold text-slate-500">
            <Link href="/home/jobseeker/job-search">Find job</Link>
            <Link href="/account/jobseeker/resume">Create resume</Link>
            <Link href="/home/jobseeker/job-search">Search company</Link>
            <Link href="#pricing">Pricing Plan</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-950">Links</h4>
          <div className="mt-3 grid gap-2 text-xs font-semibold text-slate-500">
            <Link href="#blog">Blog</Link>
            <Link href="#help">Help center</Link>
            <Link href="#contact">Contact us</Link>
            <Link href="#privacy">Privacy Policy</Link>
            <Link href="#about">About us</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-950">Contact Us</h4>
          <div className="mt-3 grid gap-2 text-xs font-semibold text-slate-500">
            <span>Instagram  WhatsApp</span>
            <span>1500 Marilla St, Dallas, TX 75201</span>
            <span>1(647)558-5560</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function JobCard({ job }: { job: MediaHireJob }) {
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    function syncAuthenticatedState(sessionExists: boolean) {
      setIsAuthenticated(sessionExists);
      setSaved(sessionExists ? isJobSaved(job.id) : false);
      setApplied(sessionExists ? Boolean(getApplicationForJob(job.id)) : false);
    }

    void hasMediaHireSession().then((sessionExists) => {
      if (isMounted) {
        syncAuthenticatedState(sessionExists);
      }
    });

    function handleUpdate() {
      void hasMediaHireSession().then((sessionExists) => {
        if (isMounted) {
          syncAuthenticatedState(sessionExists);
        }
      });
    }

    window.addEventListener("mediahire:saved-jobs-updated", handleUpdate);
    window.addEventListener("mediahire:applications-updated", handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener("mediahire:saved-jobs-updated", handleUpdate);
      window.removeEventListener("mediahire:applications-updated", handleUpdate);
    };
  }, [job.id]);

  const cardTags = [job.type, job.level, job.tags[0]].filter(Boolean);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(37,99,235,0.12)]">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={job.companyLogo}
            alt={job.companyName}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-black text-slate-400">
            {job.companyName}
          </p>

          <h3 className="mt-0.5 text-base font-black leading-tight text-slate-950">
            {job.title}
          </h3>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {cardTags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-black text-blue-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-xs font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {job.location}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" />
              {job.postedAt}
            </span>
          </div>

          <p className="mt-3 text-sm font-black text-blue-600">
            {job.salary}
          </p>

          {isAuthenticated && applied ? (
            <span className="mt-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-600">
              Applied
            </span>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className={`inline-flex h-9 items-center justify-center rounded-xl px-4 text-xs font-black text-white transition ${
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
              {isAuthenticated && applied ? "Applied" : "Apply"}
            </button>

            <Link
              href={`/home/jobseeker/jobs/${job.id}`}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-blue-600 px-4 text-xs font-black text-blue-600 transition hover:bg-blue-50"
            >
              Details
            </Link>
          </div>
        </div>

        <button
          aria-label={isAuthenticated && saved ? "Unsave job" : "Save job"}
          title={isAuthenticated && saved ? "Unsave job" : "Save job"}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
            isAuthenticated && saved
              ? "bg-blue-600 text-white"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100"
          }`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();

            void (async () => {
              if (!(await requireJobSeekerAuth("save jobs"))) {
                return;
              }

              setSaved(toggleSavedJob(job.id).includes(job.id));
            })();
          }}
          type="button"
        >
          {isAuthenticated && saved ? (
            <BookmarkCheck className="h-4 w-4" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </button>
      </div>
    </article>
  );
}

export function JobFacts({ job }: { job: MediaHireJob }) {
  const facts = [
    { icon: BriefcaseBusiness, label: "Employment Type", value: job.type },
    { icon: Clock3, label: "Experience Level", value: job.level },
    { icon: MapPin, label: "Location", value: job.location },
    { icon: BriefcaseBusiness, label: "Salary", value: job.salary },
  ];

  return (
    <div className="grid gap-4 border-y border-slate-200 py-8 sm:grid-cols-2 lg:grid-cols-4">
      {facts.map((fact) => (
        <div className="flex items-center gap-3" key={fact.label}>
          <span className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-slate-900">
            <fact.icon size={20} />
          </span>
          <div>
            <p className="text-sm font-black text-slate-950">{fact.value}</p>
            <p className="text-xs font-semibold text-slate-400">{fact.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
