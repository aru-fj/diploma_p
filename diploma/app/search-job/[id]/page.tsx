import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarClock,
  ChevronRight,
  Clock3,
  MapPin,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import { Header } from "@/components/mediahire/header";
import { publicJobs } from "@/components/mediahire/public/public-jobs-data";
import { publicAuthLinks } from "@/components/mediahire/public/public-works-data";

type JobDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function createCompanySlug(company: string) {
  return company
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function generateStaticParams() {
  return publicJobs.map((job) => ({
    id: job.slug,
  }));
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params;

  const job = publicJobs.find((item) => item.slug === id);

  if (!job) {
    notFound();
  }

  const companySlug = createCompanySlug(job.company);

  const similarJobs = publicJobs
    .filter((item) => item.slug !== job.slug)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Header />

        <div className="mt-16 rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-slate-200 sm:px-8">
          <section className="flex flex-col gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-start">
            <Link
              href={`/company/${companySlug}`}
              className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-400 to-blue-600 transition hover:scale-105"
            >
              {job.logo ? (
                <img
                  src={job.logo}
                  alt={job.company}
                  className="h-full w-full object-cover"
                />
              ) : (
                <ShieldCheck className="h-10 w-10 text-white" />
              )}
            </Link>

            <div className="min-w-0 flex-1">
              <Link
                href={`/company/${companySlug}`}
                className="inline-flex flex-wrap items-center gap-2 transition hover:text-blue-600"
              >
                <p className="text-sm font-semibold text-slate-500">
                  {job.company}
                </p>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              </Link>

              <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950">
                {job.title}
              </h1>

              <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-500">
                {job.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={publicAuthLinks.login}
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-7 text-sm font-black text-white transition hover:bg-blue-700"
                >
                  Apply Now
                </Link>

                <Link
                  href={publicAuthLinks.login}
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-blue-600 bg-white px-7 text-sm font-black text-blue-600 transition hover:bg-blue-50"
                >
                  Message
                </Link>
              </div>
            </div>
          </section>

          <section className="grid gap-5 border-b border-slate-200 py-8 sm:grid-cols-2 lg:grid-cols-4">
            <InfoIconCard
              icon={<Clock3 className="h-7 w-7" />}
              title={job.jobType}
              label="Employment Type"
            />

            <InfoIconCard
              icon={<CalendarClock className="h-7 w-7" />}
              title={job.experience}
              label="Experience Level"
            />

            <InfoIconCard
              icon={<MapPin className="h-7 w-7" />}
              title={job.location}
              label="Location"
            />

            <InfoIconCard
              icon={<Wallet className="h-7 w-7" />}
              title={job.salary}
              label="Salary"
            />
          </section>

          <section className="pt-8">
            <h2 className="text-lg font-black text-slate-950">Overview</h2>

            <p className="mt-4 text-sm font-medium leading-7 text-slate-600">
              {job.description}
            </p>
          </section>

          <section className="pt-8">
            <h2 className="text-lg font-black text-slate-950">
              Job Description
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm font-medium leading-7 text-slate-600">
              <li>Develop creative solutions according to project requirements.</li>
              <li>Collaborate with managers, designers, and other team members.</li>
              <li>Prepare high-quality work within deadlines.</li>
              <li>Support digital projects and maintain professional communication.</li>
              <li>Use creative tools and research to improve final results.</li>
            </ul>
          </section>

          <section className="pt-8">
            <h2 className="text-lg font-black text-slate-950">
              What we offer
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm font-medium leading-7 text-slate-600">
              <li>Competitive compensation package.</li>
              <li>Creative and collaborative working environment.</li>
              <li>Opportunities for portfolio development.</li>
              <li>Participation in media, design, and digital projects.</li>
              <li>Professional growth inside the company.</li>
            </ul>
          </section>

          <section className="pt-7">
            <div className="flex flex-wrap gap-2">
              <Tag>{job.jobType}</Tag>
              <Tag>{job.workMode}</Tag>
              <Tag>{job.experience}</Tag>
              <Tag>{job.language}</Tag>
              <Tag>{job.education}</Tag>
              {job.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </section>

          <section className="pt-12">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-black text-slate-950">
                About Company
              </h2>

              <Link
                href={`/company/${companySlug}`}
                className="inline-flex items-center gap-1 text-sm font-black text-blue-600"
              >
                More
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <Link
              href={`/company/${companySlug}`}
              className="mt-5 flex w-fit items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <img
                src={job.logo}
                alt={job.company}
                className="h-14 w-14 rounded-2xl object-cover"
              />

              <div>
                <p className="text-base font-black text-slate-950">
                  {job.company}
                </p>
                <p className="text-sm font-semibold text-slate-500">
                  {job.location}
                </p>
              </div>
            </Link>

            <p className="mt-5 text-sm font-medium leading-7 text-slate-600">
              {job.company} is a company working with creative, media, and
              digital projects. The company is looking for motivated specialists
              who can contribute to high-quality visual content, communication,
              and professional project results. It supports fresh ideas,
              collaboration, and growth within the creative industry.
            </p>
          </section>

          <section className="pt-12">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-black text-slate-950">
                Similar jobs
              </h2>

              <Link
                href="/search-job"
                className="inline-flex items-center gap-1 text-sm font-black text-blue-600"
              >
                More
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {similarJobs.map((similarJob) => (
                <Link
                  key={similarJob.slug}
                  href={`/search-job/${similarJob.slug}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_50px_rgba(37,99,235,0.12)]"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={similarJob.logo}
                      alt={similarJob.company}
                      className="h-14 w-14 rounded-xl object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-slate-400">
                        {similarJob.company}
                      </p>

                      <h3 className="mt-1 truncate text-base font-black text-slate-950">
                        {similarJob.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <span className="rounded-md bg-blue-50 px-2 py-1 text-[11px] font-black text-blue-600">
                          {similarJob.jobType}
                        </span>

                        <span className="rounded-md bg-blue-50 px-2 py-1 text-[11px] font-black text-blue-600">
                          {similarJob.experience}
                        </span>
                      </div>

                      <p className="mt-3 flex items-center gap-1 text-xs font-semibold text-slate-500">
                        <MapPin className="h-3.5 w-3.5" />
                        {similarJob.location}
                      </p>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <p className="text-sm font-black text-blue-600">
                          {similarJob.salary}
                        </p>

                        <p className="text-xs font-medium text-slate-400">
                          {similarJob.createdAt}
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
  icon: React.ReactNode;
  title: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-4 border-r border-slate-200 last:border-r-0">
      <div className="text-slate-950">{icon}</div>

      <div>
        <p className="text-sm font-black text-slate-950">{title}</p>
        <p className="text-xs font-medium text-slate-400">{label}</p>
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
      {children}
    </span>
  );
}