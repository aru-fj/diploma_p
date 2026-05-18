import type { Metadata } from "next";
import { JobSearchPage } from "@/components/mediahire/search-job/job-search-page";

export const metadata: Metadata = {
  title: "Search Job | MediaHire",
  description:
    "Browse creative vacancies and find new job opportunities on MediaHire.",
};

export default function JobSeekerSearchJobRoute() {
  return <JobSearchPage />;
}
