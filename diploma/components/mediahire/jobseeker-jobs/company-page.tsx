import {
  BriefcaseBusiness,
  Clock3,
  Globe2,
  MapPin,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import { getJobsByCompany, type MediaHireCompany } from "../jobs-data";
import { JobCard, JobSeekerNav } from "./job-shared-ui";

export function CompanyPage({ company }: { company: MediaHireCompany }) {
  const jobs = getJobsByCompany(company.id);

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <div className="bg-white py-6">
        <JobSeekerNav active="Search Job" />
      </div>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-white px-5 py-6 text-sm shadow-sm ring-1 ring-slate-200 sm:px-6">
          <div className="rounded-2xl bg-slate-100 px-5 py-5 text-slate-950 ring-1 ring-slate-200">
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
                    <ShieldCheck className="h-8 w-8 text-blue-600" />
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

              <div className="inline-flex h-9 items-center justify-center rounded-xl bg-white px-5 text-xs font-black text-blue-600 ring-1 ring-slate-200">
                Job seeker mode
              </div>
            </div>
          </div>

          <div className="grid gap-5 py-5 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div>
              <section>
                <h2 className="text-base font-black text-slate-950">
                  About company
                </h2>

                <p className="mt-3 text-xs font-medium leading-6 text-slate-600 md:text-[13px]">
                  {company.description}
                </p>
              </section>

              <section className="mt-7">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-base font-black text-slate-950">
                    Active vacancies from {company.name}
                  </h2>

                  <p className="text-xs font-black text-slate-400">
                    {jobs.length} jobs
                  </p>
                </div>

                <div className="mt-5 grid gap-5 xl:grid-cols-2">
                  {jobs.map((job) => (
                    <JobCard job={job} key={job.id} />
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
                  <InfoRow label="Open vacancies" value={`${jobs.length}`} />
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
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div>
        <p className="text-xs font-black text-slate-950">{title}</p>
        <p className="text-[11px] font-semibold text-slate-400">{label}</p>
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