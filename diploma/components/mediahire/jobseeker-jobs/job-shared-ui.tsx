"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Bell,
  Bookmark,
  BookmarkCheck,
  BriefcaseBusiness,
  ChevronDown,
  Clock3,
  MapPin,
  Search,
} from "lucide-react";

import type { MediaHireJob } from "../jobs-data";
import {
  applyJob,
  getApplicationForJob,
  getCurrentUserProfile,
  isJobSaved,
  toggleSavedJob,
} from "../shared/user-state";
import { requireJobSeekerAuth } from "../shared/guest-permissions";

export function JobSeekerNav({ active = "Search Job" }: { active?: string }) {
  const [profile, setProfile] = useState(() => getCurrentUserProfile());
  const links = [
    { href: "/home/jobseeker", label: "Home" },
    { href: "/search-job", label: "Search Job" },
    { href: "/profile/jobseeker", label: "My Profile" },
    { href: "/community", label: "Community" },
  ];
  const avatarSrc =
    profile.avatarPreview ||
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=85";

  useEffect(() => {
    function handleProfileUpdate() {
      setProfile(getCurrentUserProfile());
    }

    window.addEventListener("mediahire:jobseeker-profile-updated", handleProfileUpdate);
    window.addEventListener("mediahire:user-state-updated", handleProfileUpdate);

    return () => {
      window.removeEventListener(
        "mediahire:jobseeker-profile-updated",
        handleProfileUpdate,
      );
      window.removeEventListener("mediahire:user-state-updated", handleProfileUpdate);
    };
  }, []);

  return (
    <nav className="mx-auto flex min-h-[68px] w-[min(1320px,calc(100%-32px))] items-center justify-between gap-6 rounded-2xl border border-slate-200 bg-white px-7 py-3 shadow-[0_16px_45px_rgba(15,23,42,0.08)]">
      <Link className="shrink-0 text-xl font-black tracking-tight" href="/home/jobseeker">
        <span className="text-[#0B63E5]">Media</span>
        <span className="text-slate-950">Hire</span>
      </Link>

      <div className="hidden items-center gap-8 lg:flex">
        {links.map((link) => (
          <Link
            className={`text-sm font-black transition hover:text-[#0B63E5] ${
              active === link.label ? "text-[#0B63E5]" : "text-slate-600"
            }`}
            href={link.href}
            key={link.label}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-4 text-slate-600">
        <Search size={20} />
        <Bell size={19} />
        <span className="hidden h-9 w-px bg-slate-200 sm:block" />
        <span className="hidden text-sm font-black text-slate-600 sm:block">
          Job Seeker
        </span>
        <span className="relative block h-11 w-11 overflow-hidden rounded-full ring-2 ring-white">
          <img
            alt={profile.fullName}
            className="h-full w-full object-cover"
            src={avatarSrc}
          />
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
        </span>
        <span className="hidden max-w-[150px] text-sm font-black text-slate-700 md:block">
          {profile.fullName}
        </span>
        <ChevronDown className="text-[#0B63E5]" size={16} />
      </div>
    </nav>
  );
}

export function MediaHireFooter() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-[min(1320px,calc(100%-32px))] gap-10 py-12 md:grid-cols-4">
        <div>
          <h3 className="text-3xl font-black tracking-tight">
            <span className="text-[#0B63E5]">Media</span>
            <span className="text-slate-950">Hire</span>
          </h3>
          <p className="mt-4 max-w-xs text-sm font-medium leading-6 text-slate-500">
            MediaHire is a smart job search and recruitment platform that connects
            job seekers with employers. With fast search, professional resume
            building, and intelligent matching, hiring and job hunting stay simple.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-950">Our services</h4>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-500">
            <Link href="/home/jobseeker/job-search">Find job</Link>
            <Link href="/account/jobseeker/resume">Create resume</Link>
            <Link href="/home/jobseeker/job-search">Search company</Link>
            <Link href="#pricing">Pricing Plan</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-950">Links</h4>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-500">
            <Link href="#blog">Blog</Link>
            <Link href="#help">Help center</Link>
            <Link href="#contact">Contact us</Link>
            <Link href="#privacy">Privacy Policy</Link>
            <Link href="#about">About us</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-950">Contact Us</h4>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-500">
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

  useEffect(() => {
    setSaved(isJobSaved(job.id));
    setApplied(Boolean(getApplicationForJob(job.id)));

    function handleUpdate() {
      setSaved(isJobSaved(job.id));
      setApplied(Boolean(getApplicationForJob(job.id)));
    }

    window.addEventListener("mediahire:saved-jobs-updated", handleUpdate);
    window.addEventListener("mediahire:applications-updated", handleUpdate);

    return () => {
      window.removeEventListener("mediahire:saved-jobs-updated", handleUpdate);
      window.removeEventListener("mediahire:applications-updated", handleUpdate);
    };
  }, [job.id]);

  return (
    <article className="group relative rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#0B63E5]/40 hover:shadow-[0_22px_55px_rgba(15,23,42,0.08)]">
      <button
        aria-label={saved ? "Unsave job" : "Save job"}
        className={`absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full transition ${
          saved
            ? "bg-[#0B63E5] text-white"
            : "bg-[#eef4ff] text-[#0B63E5] hover:bg-[#dcecff]"
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
        {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
      </button>
      <Link className="block pr-10" href={`/home/jobseeker/jobs/${job.id}`}>
      <div className="flex gap-4">
        <img
          alt={job.companyName}
          className="h-16 w-16 rounded-xl object-cover"
          src={job.companyLogo}
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black text-slate-400">{job.companyName}</p>
          <h3 className="mt-1 text-lg font-black leading-tight text-slate-950 transition group-hover:text-[#0B63E5]">
            {job.title}
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {[job.type, job.level].map((tag) => (
              <span
                className="rounded-md bg-[#eef4ff] px-2 py-1 text-xs font-black text-[#0B63E5]"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500">
            <span className="inline-flex items-center gap-1">
              <MapPin size={13} />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock3 size={13} />
              {job.postedAt}
            </span>
          </div>
          <p className="mt-3 text-sm font-black text-[#0B63E5]">{job.salary}</p>
          {applied ? (
            <span className="mt-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-600">
              Applied
            </span>
          ) : null}
        </div>
      </div>
      </Link>
      <div className="mt-4 flex gap-2 pl-20">
        <button
          className={`h-9 rounded-xl px-4 text-xs font-black text-white transition ${
            applied ? "bg-emerald-600" : "bg-[#0B63E5] hover:bg-[#0958cc]"
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
          {applied ? "Applied" : "Apply"}
        </button>
        <Link
          className="inline-flex h-9 items-center rounded-xl border border-[#0B63E5] px-4 text-xs font-black text-[#0B63E5] transition hover:bg-[#eef4ff]"
          href={`/home/jobseeker/jobs/${job.id}`}
        >
          Details
        </Link>
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
