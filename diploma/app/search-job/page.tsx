import type { Metadata } from "next";

import { JobSearchPage } from "@/components/mediahire/search-job/job-search-page";

export const metadata: Metadata = {
  title: "Search Job | MediaHire",
  description:
    "Search creative and media jobs in Kazakhstan. Browse vacancies, companies, salaries, and job details.",
};

export default function SearchJobRoute() {
  return <JobSearchPage />;
}