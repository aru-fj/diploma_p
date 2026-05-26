import type { Metadata } from "next";
import { JobSeekerDashboardPage } from "@/components/mediahire/dashboard/jobseeker-dashboard-page";

export const metadata: Metadata = {
  title: "Job Seeker Home | MediaHire",
  description:
    "Explore creative projects, job opportunities, and your MediaHire job seeker profile.",
};

type JobSeekerHomeRouteProps = {
  searchParams?: Promise<{
    tab?: string;
  }>;
};

export default async function JobSeekerHomeRoute({
  searchParams,
}: JobSeekerHomeRouteProps) {
  const resolvedSearchParams = await searchParams;
  const initialMode =
    resolvedSearchParams?.tab === "people" ? "People" : "Projects";

  return <JobSeekerDashboardPage initialMode={initialMode} />;
}
