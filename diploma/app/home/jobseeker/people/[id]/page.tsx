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
import {
  getPublicPersonBySlug,
  publicPeople,
} from "@/components/mediahire/public/public-people-data";
import { publicWorks } from "@/components/mediahire/public/public-works-data";

type ProfileTab = "portfolio" | "resume" | "reviews";

export default function JobSeekerPersonProfilePage() {
  const params = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<ProfileTab>("portfolio");

  const person = getPublicPersonBySlug(params.id);

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

  const software =
  person.slug === "dana-murat"
    ? ["Adobe Photoshop", "Adobe Lightroom", "Adobe InDesign"]
    : person.slug === "aruzhan-kanatkyzy"
      ? ["Blender", "Cinema 4D", "Autodesk Maya", "Adobe After Effects", "Unreal Engine"]
      : person.slug === "amina-saparova"
        ? ["Meta Business Suite", "Google Analytics", "Canva", "Notion", "Figma"]
        : person.slug === "madina-omar"
          ? ["Final Draft", "Celtx", "Google Docs", "Notion", "Microsoft Word"]
          : person.slug === "dimash-karim"
            ? ["Adobe Premiere Pro", "DaVinci Resolve", "Adobe After Effects", "Final Cut Pro", "CapCut"]
            : person.slug === "amir-tulegenov"
              ? ["Adobe Lightroom", "Adobe Photoshop", "Capture One", "DaVinci Resolve", "Adobe Premiere Pro"]
              : person.slug === "ruslan-aitov"
                ? ["Notion", "Google Workspace", "Trello", "Microsoft Excel", "StudioBinder"]
                : person.slug === "arman-nurlan"
                  ? ["Adobe Premiere Pro", "DaVinci Resolve", "Adobe After Effects", "Final Cut Pro", "CapCut"]
                  : person.slug === "alina-karimova"
                    ? ["Adobe After Effects", "Adobe Illustrator", "Adobe Photoshop", "Cinema 4D", "Figma"]
                    : person.slug === "timur-saten"
                      ? ["Final Draft", "StudioBinder", "DaVinci Resolve", "Adobe Premiere Pro", "Notion"]
                      : getSoftwareByCategory(person.category);
  const resumeItems = getResumeItems(person);
  const reviews = getReviews(person);

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
                className="h-full w-full object-cover object-[center_10%]"
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

function getResumeItems(person: { slug: string; role: string }) {
  if (person.slug === "amina-saparova") {
    return [
      {
        period: "2023 — Present",
        title: "Marketing Specialist",
        company: "Freelance / Small Business Projects",
        description:
          "Created content plans, social media strategies, campaign ideas, and promotional materials for local brands.",
      },
      {
        period: "2022 — 2023",
        title: "SMM Assistant",
        company: "Digital Marketing Agency",
        description:
          "Assisted with Instagram content planning, competitor analysis, audience research, and campaign reports.",
      },
    ];
  }
  if (person.slug === "dana-murat") {
    return [
      {
        period: "2024 — Present",
        title: "Graphic Designer",
        company: "Freelance / Creative Projects",
        description:
          "Designed visual materials for social media, brand presentations, banners, packaging concepts, and promotional graphics.",
      },
      {
        period: "2023 — 2024",
        title: "Design Assistant",
        company: "University Media Projects",
        description:
          "Supported layout, typography, presentations, and visual content for academic and creative work.",
      },
      {
        period: "2022 — 2026",
        title: "Media Technologies",
        company: "Astana IT University",
        description:
          "Focus on digital media, visual communication, and interactive platforms.",
      },
    ];
  }
  if (person.slug === "aruzhan-kanatkyzy") {
    return [
      {
        period: "2023 — Present",
        title: "3D Animator",
        company: "Freelance Projects",
        description:
          "Created 3D character animations, product animations, animated loops, and promotional videos.",
      },
      {
        period: "2022 — 2023",
        title: "Junior 3D Artist",
        company: "Creative Animation Studio",
        description:
          "Assisted with modeling, lighting, rendering, and preparing animated scenes for client projects.",
      },
      {
        period: "2021 — 2025",
        title: "Animation and Digital Graphics",
        company: "Kazakh National Academy of Arts",
        description:
          "Focus on 3D animation, character design, and visual storytelling.",
      },
    ];
  }
  if (person.slug === "madina-omar") {
    return [
      {
        period: "2023 — Present",
        title: "Screenwriter",
        company: "Freelance Projects",
        description:
          "Wrote scripts for short films, social media videos, commercials, and documentary narration.",
      },
      {
        period: "2022 — 2023",
        title: "Script Assistant",
        company: "Student Film Projects",
        description:
          "Assisted with story development, dialogue editing, and scene structure for short productions.",
      },
      {
        period: "2021 — 2025",
        title: "Film and Screenwriting",
        company: "Kazakh National Academy of Arts",
        description:
          "Focus on storytelling, script structure, character development, and film language.",
      },
    ];
  }
  if (person.slug === "dimash-karim") {
    return [
      {
        period: "2022 — Present",
        title: "Videographer",
        company: "Freelance / Commercial Projects",
        description:
          "Filmed promotional videos, events, interviews, music videos, and social media content for local brands and clients.",
      },
      {
        period: "2021 — 2022",
        title: "Camera Assistant",
        company: "Media Production Team",
        description:
          "Assisted with camera setup, lighting, shooting preparation, and equipment organization.",
      },
      {
        period: "2020 — 2024",
        title: "Media Technologies",
        company: "Astana IT University",
        description:
          "Focus on video production, digital media, editing, and visual communication.",
      },
    ];
  }
  if (person.slug === "ruslan-aitov") {
    return [
      {
        period: "2020 — Present",
        title: "Producer",
        company: "Creative Production Projects",
        description:
          "Organized commercial videos, fashion campaigns, music videos, and event productions.",
      },
      {
        period: "2019 — 2020",
        title: "Production Assistant",
        company: "Film and Media Studio",
        description:
          "Assisted with scheduling, documents, location search, team coordination, and communication with clients.",
      },
      {
        period: "2017 — 2021",
        title: "Film Production",
        company: "Kazakh National Academy of Arts",
        description:
          "Focus on production management, film planning, and creative project organization.",
      },
    ];
  }
  if (person.slug === "arman-nurlan") {
    return [
      {
        period: "2022 — Present",
        title: "Video Editor",
        company: "Freelance / Media Projects",
        description:
          "Edited event videos, Instagram Reels, interviews, YouTube content, and promotional videos.",
      },
      {
        period: "2021 — 2022",
        title: "Editing Assistant",
        company: "Student Media Team",
        description:
          "Assisted with cutting footage, syncing sound, adding subtitles, and preparing videos for publication.",
      },
      {
        period: "2021 — 2025",
        title: "Media Technologies",
        company: "Astana IT University",
        description:
          "Focus on video production, editing, digital media, and visual storytelling.",
      },
    ];
  }
  if (person.slug === "alina-karimova") {
    return [
      {
        period: "2022 — Present",
        title: "Motion Designer",
        company: "Freelance / Brand Projects",
        description:
          "Created logo animations, animated posters, product ads, motion packs, and short promotional videos.",
      },
      {
        period: "2021 — 2022",
        title: "Junior Designer",
        company: "Creative Digital Studio",
        description:
          "Assisted with graphic design, animation preparation, storyboards, and motion templates.",
      },
      {
        period: "2020 — 2024",
        title: "Digital Design",
        company: "International IT University",
        description:
          "Focus on motion graphics, animation, digital design, and visual communication.",
      },
    ];
  }
  if (person.slug === "timur-saten") {
    return [
      {
        period: "2021 — Present",
        title: "Director",
        company: "Film and Commercial Projects",
        description:
          "Directed short films, music videos, brand videos, social campaigns, and commercial projects.",
      },
      {
        period: "2020 — 2021",
        title: "Assistant Director",
        company: "Production Studio",
        description:
          "Assisted with scene planning, shooting schedules, actor coordination, and production organization.",
      },
      {
        period: "2018 — 2022",
        title: "Film Directing",
        company: "Kazakh National Academy of Arts",
        description:
          "Focus on directing, cinematography, script analysis, and film production.",
      },
    ];
  }

  return [
    {
      period: "2024 — Present",
      title: person.role,
      company: "Freelance Media Specialist",
      description:
        "Works with creative projects, visual content, portfolio development, and client-focused media production.",
    },
    {
      period: "2022 — 2024",
      title: "Junior Creative Specialist",
      company: "Creative Studio",
      description:
        "Supported visual projects, content production, editing, and design preparation for clients.",
    },
  ];
}

function getReviews(person: { slug: string; name: string }) {
  if (person.slug === "amina-saparova") {
    return [
      {
        company: "Urban Coffee Astana",
        role: "Client Review",
        text:
          "Amina prepared a full social media promotion plan for our cafe. Her strategy included content ideas, posting schedule, audience analysis, and campaign direction. The plan was clear, practical, and easy for our team to follow.",
      },
      {
        company: "Qazaq Market Agency",
        role: "Client Review",
        text:
          "Amina worked on a brand awareness campaign for one of our clients. She showed strong research skills and created a clear communication plan. Her ideas helped improve the structure and direction of the campaign.",
      },
      {
        company: "Luna Fashion Store",
        role: "Client Review",
        text:
          "Amina helped us promote a seasonal collection through Instagram content and influencer collaboration. The campaign was organized, creative, and effective. She understood the brand’s audience and created ideas that matched our visual style.",
      },
    ];
  }
  if (person.slug === "dana-murat") {
    return [
      {
        company: "Astana Creative Studio",
        role: "Client Review",
        text:
          "Dana worked with our team on social media visuals and presentation materials. She created clean, modern, and well-structured designs that matched our brand style. Her work with typography, colors, and layout was very professional. She understood the task quickly and helped turn simple ideas into attractive visual content.",
      },
      {
        company: "Qazaq Fashion Lab",
        role: "Client Review",
        text:
          "Dana helped us develop visual materials for a fashion-related project, including moodboards, layout concepts, and promotional graphics. Her design style is minimal, clean, and modern. She was responsible, patient with revisions, and able to keep the final design elegant and professional.",
      },
      {
        company: "Digital Step Agency",
        role: "Client Review",
        text:
          "Dana created several social media design sets for our client projects. Her visuals were neat, readable, and adapted well for different formats. She followed the brief carefully and suggested useful improvements when needed. The final result helped improve the overall appearance of the client’s online presence.",
      },
    ];
  }
  if (person.slug === "aruzhan-kanatkyzy") {
    return [
      {
        company: "Nomad Animation Studio",
        role: "Client Review",
        text:
          "Aruzhan created a series of 3D animation scenes for our digital campaign. Her work showed strong attention to movement, timing, lighting, and visual rhythm. She understood the creative direction well and delivered animation that looked professional and engaging.",
      },
      {
        company: "Pixel Frame Lab",
        role: "Client Review",
        text:
          "We worked with Aruzhan on a product animation project. She understood the concept quickly and turned a simple idea into a dynamic and professional 3D video. The final animation was smooth, visually clean, and suitable for promotional use.",
      },
      {
        company: "Game Art KZ",
        role: "Client Review",
        text:
          "Aruzhan helped us animate a character for a game prototype. The animation was smooth, expressive, and well-prepared for further development. She was responsible during the process and communicated clearly with the team.",
      },
    ];
  }
  if (person.slug === "madina-omar") {
    return [
      {
        company: "Steppe Film Production",
        role: "Client Review",
        text:
          "Madina wrote a short film script for our student production. The story was clear, emotional, and well-structured. She created natural dialogue and helped us improve the characters’ motivation.",
      },
      {
        company: "Astana Media Lab",
        role: "Client Review",
        text:
          "Madina helped us create scripts for social media videos. Her texts were easy to understand, creative, and suitable for short video formats. She adapted the ideas quickly and kept the message clear.",
      },
      {
        company: "Qazaq Documentary Studio",
        role: "Client Review",
        text:
          "Madina prepared narration text for our documentary project. She understood the topic deeply and made the story sound professional and natural. Her writing helped make the project more emotional and engaging.",
      },
    ];
  }
  if (person.slug === "dimash-karim") {
    return [
      {
        company: "Steppe Media Agency",
        role: "Client Review",
        text:
          "Dimash filmed a promotional video for our client. He worked professionally with camera angles, lighting, and composition. The final video looked cinematic and matched the brand’s mood.",
      },
      {
        company: "Soprano Karaoke",
        role: "Client Review",
        text:
          "Dimash created short video content for our event promotion. The final videos were dynamic, stylish, and suitable for Instagram Reels. He captured the atmosphere of the place very well.",
      },
      {
        company: "Astana Event Group",
        role: "Client Review",
        text:
          "Dimash filmed our corporate event and prepared a highlight video. He captured important moments clearly and delivered the final video on time. The video was emotional, clean, and professional.",
      },
    ];
  }
  if (person.slug === "ruslan-aitov") {
    return [
      {
        company: "Qazaq Production House",
        role: "Client Review",
        text:
          "Ruslan organized a commercial video shoot for our client. He managed the schedule, team, and production process very professionally. Communication was clear, and the shooting day was well organized.",
      },
      {
        company: "Astana Creative Hub",
        role: "Client Review",
        text:
          "Ruslan helped us coordinate a media project with several specialists. He kept the team informed, controlled deadlines, and solved organizational issues quickly. The project was completed on time.",
      },
      {
        company: "Nomad Film Group",
        role: "Client Review",
        text:
          "Ruslan worked as a producer for our short film. He handled planning, budget, locations, and team coordination with great responsibility. His work helped the production process run smoothly.",
      },
    ];
  }
  if (person.slug === "arman-nurlan") {
    return [
      {
        company: "Digital Media Astana",
        role: "Client Review",
        text:
          "Arman edited several short videos for our social media campaign. The pacing, transitions, and music selection were very well done. The final videos looked modern and were ready for publication.",
      },
      {
        company: "Steppe Events",
        role: "Client Review",
        text:
          "Arman prepared a highlight video from our event. He selected the best moments and created a clear, emotional final edit. The video was delivered on time and matched our expectations.",
      },
      {
        company: "Media Content Lab",
        role: "Client Review",
        text:
          "Arman helped us edit interview videos for YouTube. The final result was clean, professional, and easy to watch. He worked carefully with sound, subtitles, and video structure.",
      },
    ];
  }
  if (person.slug === "timur-saten") {
    return [
      {
        company: "Nomad Film Studio",
        role: "Client Review",
        text:
          "Timur directed a short commercial video for our client. He developed a strong visual concept and guided the team clearly during production. The final video looked cinematic and professional.",
      },
      {
        company: "Almaty Music Label",
        role: "Client Review",
        text:
          "Timur directed a music video for one of our artists. The final video had a strong atmosphere, beautiful shots, and clear storytelling. He worked well with the artist and production team.",
      },
      {
        company: "Steppe Creative Agency",
        role: "Client Review",
        text:
          "Timur worked with us on a brand story video. He understood the client’s idea and turned it into a cinematic and emotional visual piece. His directing helped make the brand message stronger.",
      },
    ];
  }

  return [
    {
      company: "MediaHire Client",
      role: "Project Review",
      text: `${person.name} created high-quality work and communicated clearly during the project process.`,
    },
    {
      company: "Creative Partner",
      role: "Collaboration Review",
      text: `${person.name} showed strong creative skills, responsibility, and attention to detail.`,
    },
  ];
}
