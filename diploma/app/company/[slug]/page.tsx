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
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Header />

        <div className="mt-12 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
          <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 px-6 py-12 text-white sm:px-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_35%)]" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-white/20 ring-1 ring-white/40 backdrop-blur">
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ShieldCheck className="h-12 w-12 text-white" />
                  )}
                </div>

                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-white/75">
                    Company Profile
                  </p>

                  <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
                    {company.name}
                  </h1>

                  <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-white/85">
                    <MapPin className="h-4 w-4" />
                    {company.location}
                  </p>
                </div>
              </div>

              <Link
                href="/search-job"
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-white px-6 text-sm font-black text-blue-600 transition hover:bg-blue-50"
              >
                Back to jobs
              </Link>
            </div>
          </div>

          <div className="grid gap-5 border-b border-slate-200 px-6 py-7 sm:grid-cols-2 lg:grid-cols-4 sm:px-8">
            <CompanyStat
              icon={<BriefcaseBusiness className="h-6 w-6" />}
              title={`${companyJobs.length}`}
              label="Active vacancies"
            />

            <CompanyStat
              icon={<UsersRound className="h-6 w-6" />}
              title="Creative Team"
              label="Company type"
            />

            <CompanyStat
              icon={<Globe2 className="h-6 w-6" />}
              title="MediaHire"
              label="Platform"
            />

            <CompanyStat
              icon={<Clock3 className="h-6 w-6" />}
              title="Recently active"
              label="Hiring status"
            />
          </div>

          <div className="grid gap-8 px-6 py-8 lg:grid-cols-[minmax(0,1fr)_340px] sm:px-8">
            <div>
              <section>
                <h2 className="text-2xl font-black text-slate-950">
                  About company
                </h2>

                <p className="mt-4 text-sm font-medium leading-7 text-slate-600">
                  {company.name} is a company working with creative, media, and
                  digital projects. The company creates opportunities for
                  specialists who want to work with visual content, design,
                  communication, production, and digital campaigns. It values
                  fresh ideas, professional responsibility, and teamwork.
                </p>
              </section>

              <section className="mt-10">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-black text-slate-950">
                    Active vacancies from {company.name}
                  </h2>

                  <p className="text-sm font-black text-slate-400">
                    {companyJobs.length} jobs
                  </p>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {companyJobs.map((job) => (
                    <Link
                      key={job.slug}
                      href={`/search-job/${job.slug}`}
                      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_70px_rgba(37,99,235,0.14)]"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="h-14 w-14 rounded-2xl object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-black text-slate-400">
                            {job.company}
                          </p>

                          <h3 className="mt-1 text-xl font-black text-slate-950">
                            {job.title}
                          </h3>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-black text-blue-600">
                              {job.jobType}
                            </span>

                            <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-black text-blue-600">
                              {job.experience}
                            </span>

                            <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-black text-blue-600">
                              {job.workMode}
                            </span>
                          </div>

                          <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </p>

                          <div className="mt-4 flex items-center justify-between">
                            <p className="text-base font-black text-blue-600">
                              {job.salary}
                            </p>

                            <span className="inline-flex items-center gap-1 text-sm font-black text-blue-600">
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

            <aside className="space-y-5">
              <div className="rounded-[2rem] bg-slate-50 p-6 ring-1 ring-slate-200">
                <h3 className="text-lg font-black text-slate-950">
                  Company information
                </h3>

                <div className="mt-5 space-y-4">
                  <InfoRow label="Company" value={company.name} />
                  <InfoRow label="Location" value={company.location} />
                  <InfoRow label="Open vacancies" value={`${companyJobs.length}`} />
                  <InfoRow label="Industry" value="Media and Creative" />
                </div>
              </div>

              <div className="rounded-[2rem] bg-slate-50 p-6 ring-1 ring-slate-200">
                <h3 className="text-lg font-black text-slate-950">
                  Other actual jobs
                </h3>

                <div className="mt-4 space-y-3">
                  {otherJobs.map((job) => (
                    <Link
                      key={job.slug}
                      href={`/search-job/${job.slug}`}
                      className="block rounded-2xl bg-white p-4 ring-1 ring-slate-200 transition hover:ring-blue-200"
                    >
                      <p className="font-black text-slate-900">{job.title}</p>

                      <p className="mt-1 text-sm font-semibold text-slate-500">
                        {job.company}
                      </p>

                      <p className="mt-2 text-sm font-black text-blue-600">
                        {job.salary}
                      </p>
                    </Link>
                  ))}
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
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
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
      <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-black text-slate-800">{value}</p>
    </div>
  );
}