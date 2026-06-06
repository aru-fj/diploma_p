"use client";

/* eslint-disable @next/next/no-img-element */

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  Globe2,
  GraduationCap,
  Heart,
  LinkIcon,
  Mail,
  MapPin,
  MessageCircle,
  Star,
  Sparkles,
  UserRound,
} from "lucide-react";

import { SaveProfileButton } from "@/components/mediahire/save-profile-button";
import { JobSeekerNavbar } from "@/components/mediahire/jobseeker-navbar";
import { publicPeople } from "@/components/mediahire/public/public-people-data";
import { publicWorks } from "@/components/mediahire/public/public-works-data";

type ProfileTab = "portfolio" | "resume" | "reviews";

export default function JobSeekerPersonProfilePage() {
  const params = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<ProfileTab>("portfolio");

  const person = publicPeople.find((item) => item.slug === params.id);

  if (!person) {
    return (
      <main className="min-h-screen bg-white text-slate-950">
        <JobSeekerNavbar active="Home" />

        <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <UserRound className="h-8 w-8" />
          </div>

          <h1 className="text-2xl font-black tracking-tight">
            Profile not found
          </h1>

          <p className="mt-4 max-w-xl text-base font-medium leading-7 text-slate-500">
            This profile does not exist or may have been removed.
          </p>

          <Link
            href="/home/jobseeker"
            className="mt-8 inline-flex h-10 items-center justify-center rounded-2xl bg-blue-600 px-6 text-sm font-black text-white transition hover:bg-blue-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to homepage
          </Link>
        </section>
      </main>
    );
  }

  const portfolioWorks = getPortfolioWorks({
    slug: person.slug,
    name: person.name,
    category: person.category,
    featuredWorkSlugs: person.featuredWorkSlugs,
  });

  const software = getSoftwareByCategory(person.category);
  const resumeItems = getResumeItems(person.role);
  const reviews = getReviews(person.name);

  return (
    <main className="min-h-screen bg-white text-slate-950">

      <section className="relative overflow-hidden bg-slate-100">
        <div className="absolute inset-0">
          <img
            src={person.coverImage}
            alt={person.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 pb-24 pt-4 sm:pt-5">
          <JobSeekerNavbar active="Home" />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 pb-16 sm:px-6 lg:grid-cols-[230px_1fr] lg:px-5">
        <aside className="-mt-12 lg:-mt-16">
          <div className="sticky top-5 rounded-2xl bg-white p-4">
            <div className="h-20 w-20 overflow-hidden rounded-xl bg-slate-200 shadow-lg">
              <img
                src={person.avatar}
                alt={person.name}
                className="h-full w-full object-cover"
              />
            </div>

            <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-950">
              {person.name}
            </h1>

            <p className="mt-1 text-xs font-semibold text-slate-500">
              {person.availability}
            </p>

            <div className="mt-4 space-y-2.5 text-xs font-semibold text-slate-600">
              <ProfileInfoRow icon={<MapPin />} text={person.location} />
              <ProfileInfoRow icon={<BriefcaseBusiness />} text={person.role} />
              <ProfileInfoRow icon={<CalendarDays />} text={person.experience} />
              <ProfileInfoRow
                icon={<Mail />}
                text={`${person.slug}@mediahire.kz`}
              />
            </div>

            <div className="mt-5 space-y-2.5">
              <SaveProfileButton profileId={person.slug} />

              <Link
                href={`/dashboard/jobseeker/community?chat=${person.slug}`}
                className="flex h-9 w-full items-center justify-center gap-2 rounded-full border border-blue-500 bg-blue-50 text-xs font-black text-blue-600 transition hover:bg-blue-100"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Message
              </Link>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-black text-slate-950">Skills</h2>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {person.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-black text-slate-950">Software</h2>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {software.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <section className="pt-6 lg:pt-8">
          <Link
            href="/home/jobseeker"
            className="mb-5 inline-flex h-9 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-xs font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <ArrowLeft className="mr-2 h-3.5 w-3.5" />
            Back
          </Link>

          <div className="mb-6 flex items-center gap-5 border-b border-slate-200">
            <TabButton
              label="Portfolio"
              active={activeTab === "portfolio"}
              onClick={() => setActiveTab("portfolio")}
            />

            <TabButton
              label="Resume"
              active={activeTab === "resume"}
              onClick={() => setActiveTab("resume")}
            />

            <TabButton
              label="Reviews"
              active={activeTab === "reviews"}
              onClick={() => setActiveTab("reviews")}
            />
          </div>

          {activeTab === "portfolio" && (
            <div className="portfolio-panel-bg grid gap-x-6 gap-y-7 rounded-2xl bg-white/85 p-3 shadow-[0_18px_55px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/70 backdrop-blur sm:p-4 md:grid-cols-2">
              {portfolioWorks.map((work) => (
                <Link
                  key={work.slug}
                  href={`/home/jobseeker/work/${work.slug}`}
                  className="portfolio-project-card group block rounded-2xl bg-white p-2.5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(37,99,235,0.13)]"
                >
                  <div className="h-52 overflow-hidden rounded-xl bg-slate-100 shadow-sm">
                    <img
                      src={work.coverImage}
                      alt={work.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-3 text-base font-black text-slate-950 group-hover:text-blue-600">
                    {work.title}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    {person.name}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {activeTab === "resume" && (
            <div className="max-w-2xl space-y-4">
              <ResumeCard
                icon={<UserRound className="h-5 w-5" />}
                title="Personal Information"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <ResumeField label="Year of Birth" value="2005" />
                  <ResumeField
                    label="City"
                    value={person.location.split(",")[0] || person.location}
                  />
                  <ResumeField
                    label="Mobile Number"
                    value="Available after login"
                  />
                  <ResumeField label="Gender" value="Not specified" />
                </div>
              </ResumeCard>

              <ResumeCard
                icon={<UserRound className="h-5 w-5" />}
                title="About me"
              >
                <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs font-medium leading-5 text-slate-700">
                  {person.about || person.shortBio}
                </div>
              </ResumeCard>

              <ResumeCard
                icon={<BriefcaseBusiness className="h-5 w-5" />}
                title="Work Experience"
              >
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <div className="space-y-4">
                    {resumeItems.map((item) => (
                      <div key={`${item.period}-${item.title}`}>
                        <p className="text-xs font-black text-slate-800">
                          {item.period}
                        </p>
                        <p className="text-xs font-bold text-slate-700">
                          {item.title}
                        </p>
                        <p className="text-xs font-semibold text-slate-500">
                          {item.company}
                        </p>
                        <p className="mt-1 text-xs font-medium leading-5 text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ResumeCard>

              <ResumeCard
                icon={<GraduationCap className="h-5 w-5" />}
                title="Education"
              >
                <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs leading-5 text-slate-700">
                  <p className="font-black">Astana IT University</p>
                  <p>Media Technology</p>
                  <p>2022 — 2026</p>
                  <p className="mt-1">
                    Focus on digital media, visual communication, and
                    interactive platforms.
                  </p>
                </div>
              </ResumeCard>

              <ResumeCard icon={<LinkIcon className="h-5 w-5" />} title="Links">
                <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs leading-5 text-slate-700">
                  <p className="font-black">Portfolio</p>
                  <p className="break-all text-slate-600">
                    https://mediahire.kz/people/{person.slug}
                  </p>
                </div>
              </ResumeCard>

              <ResumeCard icon={<Globe2 className="h-5 w-5" />} title="Languages">
                <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs leading-5 text-slate-700">
                  {person.languages.map((language, index) => (
                    <p key={language}>
                      {language} —{" "}
                      {index === 0
                        ? "Native"
                        : index === 1
                          ? "Fluent"
                          : "Intermediate"}
                    </p>
                  ))}
                </div>
              </ResumeCard>

              <ResumeCard
                icon={<BriefcaseBusiness className="h-5 w-5" />}
                title="Job Preferences"
              >
                <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs leading-5 text-slate-700">
                  <p>Preferred role: {person.role}</p>
                  <p>Work format: Remote, Hybrid, On-site</p>
                  <p>Employment type: Freelance, Part-time, Full-time</p>
                  <p>Expected salary: from 250,000 KZT</p>
                </div>
              </ResumeCard>

              <ResumeCard
                icon={<Sparkles className="h-5 w-5" />}
                title="Preferred Job Benefits"
              >
                <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs leading-5 text-slate-700">
                  <p>Flexible working hours</p>
                  <p>Remote work opportunity</p>
                  <p>Professional growth</p>
                  <p>Training and workshops</p>
                </div>
              </ResumeCard>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="max-w-2xl space-y-4">
              {reviews.map((review) => (
                <article
                  key={review.company}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-base font-black text-slate-950">
                        {review.company}
                      </h3>

                      <p className="mt-1 text-xs font-bold text-slate-500">
                        {review.role}
                      </p>
                    </div>

                    <StarRating />
                  </div>

                  <p className="mt-3 text-xs font-medium leading-6 text-slate-600">
                    {review.text}
                  </p>
                </article>
              ))}

              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-center">
                <Heart className="mx-auto h-6 w-6 text-blue-600" />

                <h2 className="mt-3 text-lg font-black text-slate-950">
                  Want to leave a review?
                </h2>

                <p className="mx-auto mt-2 max-w-xl text-xs font-medium leading-5 text-slate-600">
                  Reviews can be written only by registered employers or
                  collaborators.
                </p>

                <button
                  type="button"
                  className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-5 text-xs font-black text-white transition hover:bg-blue-700"
                >
                  Leave a review
                </button>
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}



function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative pb-3 text-sm font-black transition ${
        active ? "text-blue-600" : "text-slate-400 hover:text-slate-700"
      }`}
    >
      {label}

      {active && (
        <span className="absolute bottom-[-1px] left-0 h-0.5 w-full rounded-full bg-blue-600" />
      )}
    </button>
  );
}

function ProfileInfoRow({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-4 w-4 items-center justify-center text-slate-600 [&>svg]:h-3.5 [&>svg]:w-3.5">
        {icon}
      </span>
      <span>{text}</span>
    </div>
  );
}

function ResumeCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-black text-slate-800">
        <span className="text-slate-500 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}

function ResumeField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-bold text-slate-400">{label}</p>
      <p className="mt-1 text-xs font-black text-slate-700">{value}</p>
    </div>
  );
}

function StarRating() {
  return (
    <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
        />
      ))}
    </div>
  );
}

function getPortfolioWorks(person: {
  slug?: string;
  name?: string;
  category?: string;
  featuredWorkSlugs?: string[];
}) {
  const featuredSlugs = person.featuredWorkSlugs ?? [];

  const worksBySlugs = featuredSlugs
    .map((slug) => publicWorks.find((work) => work.slug === slug))
    .filter((work): work is (typeof publicWorks)[number] => Boolean(work));

  if (worksBySlugs.length > 0) {
    return worksBySlugs;
  }

  return publicWorks.filter(
    (work) =>
      work.authorSlug === person.slug ||
      work.author.toLowerCase() === person.name?.toLowerCase()
  );
}

function getSoftwareByCategory(category: string) {
  if (category === "Photography") {
    return ["Adobe Photoshop", "Adobe Lightroom", "Capture One"];
  }

  if (category === "Graphic Design") {
    return ["Figma", "Adobe Illustrator", "Adobe Photoshop"];
  }

  if (category === "3D / Animation") {
    return ["Blender", "Cinema 4D", "After Effects"];
  }

  if (category === "Production") {
    return ["Premiere Pro", "DaVinci Resolve", "After Effects"];
  }

  return ["Figma", "Canva", "Photoshop"];
}

function getResumeItems(role: string) {
  return [
    {
      period: "2024 — Present",
      title: role,
      company: "Freelance Media Specialist",
      description:
        "Works with creative projects, visual content, portfolio development, and client-focused media production.",
    },
    {
      period: "2022 — 2024",
      title: "Creative Assistant",
      company: "Media Production Studio",
      description:
        "Supported project planning, content preparation, editing, and communication with clients and creative teams.",
    },
    {
      period: "2021 — 2022",
      title: "Junior Content Creator",
      company: "Digital Creative Agency",
      description:
        "Created visual materials for campaigns, social media, presentations, and small brand projects.",
    },
  ];
}

function getReviews(name: string) {
  return [
    {
      company: "Freedom Media",
      role: "Creative project collaboration",
      rating: "5.0",
      text: `${name} delivered high-quality work with strong attention to detail. Communication was clear, deadlines were respected, and the final result matched the project direction very well.`,
    },
    {
      company: "Bright Agency",
      role: "Visual content production",
      rating: "4.9",
      text: `${name} showed a professional approach during the whole process. The work was visually consistent, polished, and suitable for digital media presentation.`,
    },
    {
      company: "Frame Production",
      role: "Portfolio and campaign support",
      rating: "4.8",
      text: `We appreciated ${name}'s creative thinking and ability to adapt the work to the needs of the project. The collaboration was smooth and productive.`,
    },
  ];
}
