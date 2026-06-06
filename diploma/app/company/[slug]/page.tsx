import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BriefcaseBusiness,
  ChevronRight,
  Clock3,
  Globe2,
  MapPin,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import { Header } from "@/components/mediahire/header";
import { publicJobs } from "@/components/mediahire/public/public-jobs-data";

type CompanyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function createCompanySlug(company: string) {
  return company
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const companies = Array.from(
  new Map(
    publicJobs.map((job) => [
      createCompanySlug(job.company),
      {
        slug: createCompanySlug(job.company),
        name: job.company,
        logo: job.logo,
        location: job.location,
      },
    ]),
  ).values(),
);

export function generateStaticParams() {
  return companies.map((company) => ({
    slug: company.slug,
  }));
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params;

  const company = companies.find((item) => item.slug === slug);

  if (!company) {
    notFound();
  }

  const companyJobs = publicJobs.filter(
    (job) => createCompanySlug(job.company) === slug,
  );

  const otherJobs = publicJobs
    .filter((job) => createCompanySlug(job.company) !== slug)
    .slice(0, 3);

    return (
      <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
        <section className="relative overflow-hidden bg-[#f5f7fb] pt-4">
          <div className="relative z-10">
            <Header role="jobseeker" activeItem="Search Job" />
          </div>
        </section>
    
        <section className="mx-auto w-full max-w-6xl px-4 pb-14 pt-8 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-white px-5 py-6 text-sm shadow-sm ring-1 ring-slate-200 sm:px-6">
          <div className="rounded-2xl bg-slate-100 px-5 py-5 text-slate-950 ring-1 ring-slate-200 sm:px-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ShieldCheck className="h-8 w-8 text-white" />
                  )}
                </div>

                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Company Profile
                  </p>

                  <h1 className="mt-1.5 text-xl font-black tracking-tight text-slate-950 md:text-2xl">
                    {company.name}
                  </h1>

                  <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <MapPin className="h-3.5 w-3.5" />
                    {company.location}
                  </p>
                </div>
              </div>

              <Link
                href="/search-job"
                className="inline-flex h-9 items-center justify-center rounded-xl bg-white px-5 text-xs font-black text-blue-600 ring-1 ring-slate-200 transition hover:bg-slate-50"
              >
                Back to jobs
              </Link>
            </div>
          </div>

          <div className="grid gap-5 px-5 py-5 lg:grid-cols-[minmax(0,1fr)_300px] sm:px-5">
            <div>
              <section>
                <h2 className="text-base font-black text-slate-950">
                  About company
                </h2>

                <p className="mt-3 text-xs font-medium leading-6 text-slate-600 md:text-[13px]">
                  {company.name} is a company working with creative, media, and
                  digital projects. The company creates opportunities for
                  specialists who want to work with visual content, design,
                  communication, production, and digital campaigns. It values
                  fresh ideas, professional responsibility, and teamwork.
                </p>
              </section>

              <section className="mt-7">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-black text-slate-950">
                    Active vacancies from {company.name}
                  </h2>

                  <p className="text-xs font-black text-slate-400">
                    {companyJobs.length} jobs
                  </p>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {companyJobs.map((job) => (
                    <Link
                      key={job.slug}
                      href={`/search-job/${job.slug}`}
                      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_14px_40px_rgba(37,99,235,0.10)]"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="h-10 w-10 rounded-lg object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-semibold text-slate-400">
                            {job.company}
                          </p>

                          <h3 className="mt-1 text-sm font-black text-slate-950">
                            {job.title}
                          </h3>

                          <div className="mt-2 flex flex-wrap gap-1.5">
                            <span className="rounded-md bg-blue-50 px-2 py-1 text-[11px] font-black text-blue-600">
                              {job.jobType}
                            </span>

                            <span className="rounded-md bg-blue-50 px-2 py-1 text-[11px] font-black text-blue-600">
                              {job.experience}
                            </span>

                            <span className="rounded-md bg-blue-50 px-2 py-1 text-[11px] font-black text-blue-600">
                              {job.workMode}
                            </span>
                          </div>

                          <p className="mt-3 flex items-center gap-1 text-xs font-semibold text-slate-500">
                            <MapPin className="h-3.5 w-3.5" />
                            {job.location}
                          </p>

                          <div className="mt-3 flex items-center justify-between">
                            <p className="text-xs font-black text-blue-600">
                              {job.salary}
                            </p>

                            <span className="inline-flex items-center gap-1 text-xs font-black text-blue-600">
                              Details
                              <ChevronRight className="h-4 w-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-4">
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <h3 className="text-sm font-black text-slate-950">
                  Company information
                </h3>

                <div className="mt-4 space-y-3">
                  <InfoRow label="Company" value={company.name} />
                  <InfoRow label="Location" value={company.location} />
                  <InfoRow label="Open vacancies" value={`${companyJobs.length}`} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function CompanyStat({
  icon,
  title,
  label,
}: {
  icon: React.ReactNode;
  title: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div>
        <p className="text-base font-black text-slate-950">{title}</p>
        <p className="text-xs font-semibold text-slate-400">{label}</p>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-black text-slate-800">{value}</p>
    </div>
  );
}