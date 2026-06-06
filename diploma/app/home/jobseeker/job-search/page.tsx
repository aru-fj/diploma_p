import { JobSearchPage } from "@/components/mediahire/jobseeker-jobs/job-search-page";

type JobSearchRoutePageProps = {
  searchParams?: Promise<{
    location?: string;
    q?: string;
    query?: string;
  }>;
};

export default async function JobSearchRoutePage({
  searchParams,
}: JobSearchRoutePageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <JobSearchPage
      initialLocation={resolvedSearchParams?.location || "All Kazakhstan"}
      initialQuery={resolvedSearchParams?.query || resolvedSearchParams?.q || ""}
    />
  );
}
