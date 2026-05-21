import { MapPin } from "lucide-react";

import {
  getJobsByCompany,
  type MediaHireCompany,
} from "../jobs-data";
import { JobCard, JobSeekerNav, MediaHireFooter } from "./job-shared-ui";

export function CompanyPage({ company }: { company: MediaHireCompany }) {
  const jobs = getJobsByCompany(company.id);

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <div className="bg-white py-8">
        <JobSeekerNav active="Search Job" />
      </div>

      <section className="mx-auto w-[min(1320px,calc(100%-32px))] rounded-[2rem] bg-white p-6 shadow-[0_22px_70px_rgba(15,23,42,0.06)] md:p-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <img
            alt={company.name}
            className="h-28 w-28 rounded-3xl object-cover shadow-[0_18px_48px_rgba(15,23,42,0.12)]"
            src={company.logo}
          />
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-950">
              {company.name}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-sm font-black text-slate-500">
              <MapPin size={17} />
              {company.location}
            </p>
            <p className="mt-4 max-w-4xl text-base font-medium leading-8 text-slate-600">
              {company.description}
            </p>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-black text-slate-950">
            More jobs from {company.name}
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {jobs.map((job) => (
              <JobCard job={job} key={job.id} />
            ))}
          </div>
        </section>
      </section>

      <MediaHireFooter />
    </main>
  );
}
