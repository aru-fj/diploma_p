import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { JobSeekerGoogleDetailsPage } from "@/components/mediahire/auth/jobseeker-google-details-page";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Google Sign Up Details | MediaHire",
  description:
    "Complete your MediaHire job seeker profile after signing up with Google.",
};

export default async function SignupJobSeekerGoogleDetailsPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const email = user?.email;

  if (!email) {
    redirect("/auth/google?role=jobseeker&intent=signup");
  }

  return (
    <JobSeekerGoogleDetailsPage
      googleUser={{
        avatar: user.image ?? null,
        email,
        name: user.name ?? null,
      }}
    />
  );
}
