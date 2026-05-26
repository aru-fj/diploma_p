"use client";

import type { ElementType } from "react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  Heart,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import type { PublicRole } from "@/components/mediahire/header";
import { publicAuthLinks, publicWorks, type PublicWork } from "./public-works-data";
import { publicPeople, type PublicPerson } from "./public-people-data";

type PublicSectionKey =
  | "for-you"
  | "saved"
  | "graphic-design"
  | "photography"
  | "animation";

type PublicFilterKey =
  | "recommended"
  | "top-rated"
  | "popular"
  | "most-viewed"
  | "most-discussed"
  | "recent";

const sectionTabs: {
  key: PublicSectionKey;
  label: string;
  icon: ElementType;
}[] = [
  { key: "for-you", label: "For You", icon: Sparkles },
  { key: "saved", label: "Saved", icon: Heart },
  { key: "graphic-design", label: "Graphic Design", icon: Sparkles },
  { key: "photography", label: "Photography", icon: Sparkles },
  { key: "animation", label: "Animation", icon: Sparkles },
];

const projectFilterLabels: Record<PublicFilterKey, string> = {
  recommended: "Recommended",
  "top-rated": "Top Rated",
  popular: "Popular Now",
  "most-viewed": "Most Viewed",
  "most-discussed": "Most Discussed",
  recent: "Recently Added",
};

const peopleFilterLabels: Record<PublicFilterKey, string> = {
  recommended: "Recommended",
  "top-rated": "Top Rated",
  popular: "Most Popular",
  "most-viewed": "Most Hired",
  "most-discussed": "Most Experienced",
  recent: "Recently Active",
};

export function PublicWorksSection({
  role = "jobseeker",
}: {
  role?: PublicRole;
}) {
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] =
    useState<PublicSectionKey>("for-you");
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<"projects" | "people">(
    role === "employer" ? "people" : "projects",
  );
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] =
    useState<PublicFilterKey>("recommended");

  useEffect(() => {
    setMode(role === "employer" ? "people" : "projects");
    setActiveSection("for-you");
    setActiveFilter("recommended");
    setSearch("");
  }, [role]);

  useEffect(() => {
    const section = searchParams.get("section");
    const searchValue = searchParams.get("search");

    if (section === "people") {
      setMode("people");
      setActiveSection("for-you");
    }

    if (section === "projects") {
      setMode("projects");
      setActiveSection("for-you");
    }

    if (searchValue !== null) {
      setSearch(searchValue);
    }
  }, [searchParams]);

  const filteredWorks = useMemo(() => {
    let works = [...publicWorks];

    if (activeSection === "saved") {
      return [];
    }

    if (activeSection === "graphic-design") {
      works = works.filter((work) => work.category === "Graphic Design");
    }

    if (activeSection === "photography") {
      works = works.filter((work) => work.category === "Photography");
    }

    if (activeSection === "animation") {
      works = works.filter((work) => work.category === "3D / Animation");
    }

    const normalizedSearch = search.trim().toLowerCase();

    if (normalizedSearch) {
      works = works.filter((work) =>
        [
          work.title,
          work.author,
          work.role,
          work.company,
          work.category,
          work.type,
          work.location,
          work.description,
          ...work.tools,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch),
      );
    }

    return sortWorks(works, activeFilter);
  }, [activeFilter, activeSection, search]);

  const filteredPeople = useMemo(() => {
    let people = [...publicPeople];

    if (activeSection === "saved") {
      return [];
    }

    if (activeSection === "graphic-design") {
      people = people.filter((person) => person.category === "Graphic Design");
    }

    if (activeSection === "photography") {
      people = people.filter((person) => person.category === "Photography");
    }

    if (activeSection === "animation") {
      people = people.filter((person) => person.category === "3D / Animation");
    }

    const normalizedSearch = search.trim().toLowerCase();

    if (normalizedSearch) {
      people = people.filter((person) =>
        [
          person.name,
          person.role,
          person.category,
          person.location,
          person.experience,
          person.availability,
          person.shortBio,
          ...person.skills,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch),
      );
    }

    return sortPeople(people, activeFilter);
  }, [activeFilter, activeSection, search]);

  const filterLabels =
    mode === "projects" ? projectFilterLabels : peopleFilterLabels;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[1.7rem] bg-white p-4 shadow-[0_18px_60px_rgba(15,23,42,0.07)] md:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <button
            type="button"
            onClick={() => setFilterMenuOpen((value) => !value)}
            className="flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-black text-slate-900 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </button>

          <div className="flex h-11 flex-1 items-center gap-3 rounded-full bg-slate-100 px-5">
            <Search className="h-5 w-5 text-slate-500" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={
                mode === "projects" ? "Search projects" : "Search people"
              }
              className="h-full flex-1 bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="grid h-11 grid-cols-2 rounded-full bg-slate-100 p-1 lg:w-[230px]">
            <button
              type="button"
              onClick={() => {
                setMode("projects");
                setActiveSection("for-you");
                setSearch("");
              }}
              className={`rounded-full text-sm font-black transition ${
                mode === "projects"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Projects
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("people");
                setActiveSection("for-you");
                setSearch("");
              }}
              className={`rounded-full text-sm font-black transition ${
                mode === "people"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              People
            </button>
          </div>
        </div>

        {filterMenuOpen && (
          <div className="mt-4 flex flex-wrap justify-center gap-2 rounded-2xl bg-slate-50 p-3">
            {Object.entries(filterLabels).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveFilter(key as PublicFilterKey)}
                className={`h-9 rounded-full px-4 text-xs font-black transition ${
                  activeFilter === key
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-600 hover:text-blue-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {sectionTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  if (tab.key === "saved") {
                    window.location.href = publicAuthLinks.login;
                    return;
                  }

                  setActiveSection(tab.key);
                }}
                className={`flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-black shadow-sm transition hover:-translate-y-0.5 ${
                  isActive
                    ? "bg-blue-700 text-white shadow-blue-600/20"
                    : "bg-blue-600 text-white shadow-blue-600/15 hover:bg-blue-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-8 mt-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-3 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600">
            {mode === "projects"
              ? "Public projects"
              : role === "employer"
                ? "Public candidates"
                : "Public people"}
          </p>

          <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            {mode === "projects"
              ? "Explore creative projects"
              : role === "employer"
                ? "Explore creative candidates"
                : "Explore media specialists"}
          </h2>

          <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-slate-500">
            {mode === "projects"
              ? "Use sections, filters, and search to browse public projects before registration."
              : role === "employer"
                ? "Browse candidate cards and public portfolios before creating an employer account."
                : "Browse public specialist cards before registration. To contact, save, or follow people, create an account."}
          </p>
        </div>

        <Link
          href={role === "employer" ? "/search-cv" : "/search-job"}
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-black text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-blue-600"
        >
          {role === "employer" ? "Search CV" : "Search jobs"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      {mode === "projects" ? (
        filteredWorks.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredWorks.map((work) => (
              <ProjectCard key={work.slug} work={work} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Saved items are locked"
            text="Sign in or create an account to access this feature."
            onReset={() => {
              setActiveSection("for-you");
              setSearch("");
            }}
          />
        )
      ) : filteredPeople.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPeople.map((person) => (
            <PersonCard key={person.slug} person={person} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Saved items are locked"
          text="Sign in or create an account to access this feature."
          onReset={() => {
            setActiveSection("for-you");
            setSearch("");
          }}
        />
      )}
    </section>
  );
}

function ProjectCard({ work }: { work: PublicWork }) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(37,99,235,0.18)]">
      <Link href={`/work/${work.slug}`} className="block">
        <div className="relative h-56 overflow-hidden bg-slate-100">
          <img
            src={work.coverImage}
            alt={work.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-black text-slate-900 shadow-lg backdrop-blur">
            {work.category}
          </div>

          <div className="absolute bottom-4 left-4 rounded-full bg-slate-950/80 px-4 py-2 text-xs font-bold text-white backdrop-blur">
            {work.type}
          </div>
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/work/${work.slug}`} className="block">
          <h3 className="text-xl font-black text-slate-950 transition group-hover:text-blue-600">
            {work.title}
          </h3>

          <p className="mt-1 text-sm font-bold text-slate-500">
            {work.author} · {work.role}
          </p>
        </Link>

        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-500">
          <CalendarDays className="h-4 w-4 text-blue-500" />
          {work.createdAt}
        </div>

        <div className="mt-5 flex gap-3">
          <Link
            href={`/work/${work.slug}`}
            className="flex h-11 flex-1 items-center justify-center rounded-2xl bg-blue-600 px-4 text-sm font-black text-white transition hover:bg-blue-700"
          >
            View details
          </Link>

          <Link
            href={publicAuthLinks.login}
            title="Sign in to save"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <Bookmark className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function PersonCard({ person }: { person: PublicPerson }) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(37,99,235,0.18)]">
      <div className="relative h-36 overflow-hidden bg-slate-100">
        <img
          src={person.coverImage}
          alt={person.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-black text-slate-900 shadow-lg backdrop-blur">
          {person.category}
        </div>
      </div>

      <div className="relative p-5 pt-12">
        <div className="absolute -top-10 left-5 h-20 w-20 overflow-hidden rounded-3xl border-4 border-white bg-slate-200 shadow-lg">
          <img
            src={person.avatar}
            alt={person.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-600">
          <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
          {person.rating}
        </div>

        <h3 className="text-xl font-black text-slate-950">{person.name}</h3>

        <p className="mt-1 text-sm font-bold text-blue-600">{person.role}</p>

        <p className="mt-3 line-clamp-2 text-sm font-medium leading-6 text-slate-500">
          {person.shortBio}
        </p>

        <div className="mt-4 space-y-2 text-sm font-semibold text-slate-500">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-500" />
            {person.location}
          </div>

          <div className="flex items-center gap-2">
            <BriefcaseBusiness className="h-4 w-4 text-blue-500" />
            {person.experience}
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-500" />
            {person.projectsCount} works in profile
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {person.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-black text-slate-700">
          {person.availability}
        </div>

        <div className="mt-5 flex gap-3">
          <Link
            href={`/people/${person.slug}`}
            className="flex h-11 flex-1 items-center justify-center rounded-2xl bg-blue-600 px-4 text-sm font-black text-white transition hover:bg-blue-700"
          >
            View profile
          </Link>

          <Link
            href={publicAuthLinks.login}
            title="Sign in to save"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <Bookmark className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function EmptyState({
  title,
  text,
  onReset,
}: {
  title: string;
  text: string;
  onReset: () => void;
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h3 className="text-2xl font-black text-slate-950">{title}</h3>

      <p className="mt-3 text-sm font-medium text-slate-500">{text}</p>

      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href={publicAuthLinks.login}
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-blue-600 px-6 text-sm font-black text-white transition hover:bg-blue-700"
        >
          Login
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="h-12 rounded-2xl border border-blue-600 bg-white px-6 text-sm font-black text-blue-600 transition hover:bg-blue-50"
        >
          Back to For You
        </button>
      </div>
    </div>
  );
}

function sortWorks(works: PublicWork[], filter: PublicFilterKey) {
  const score = (work: PublicWork) =>
    work.title.length + work.gallery.length * 20 + work.tools.length * 15;

  if (filter === "top-rated") {
    return [...works].sort((a, b) => score(b) - score(a));
  }

  if (filter === "most-viewed") {
    return [...works].sort((a, b) => b.gallery.length - a.gallery.length);
  }

  if (filter === "recent") {
    return [...works].reverse();
  }

  if (filter === "popular" || filter === "most-discussed") {
    return [...works].sort((a, b) => b.tools.length - a.tools.length);
  }

  return works;
}

function sortPeople(people: PublicPerson[], filter: PublicFilterKey) {
  if (filter === "top-rated") {
    return [...people].sort((a, b) => b.rating - a.rating);
  }

  if (filter === "most-viewed" || filter === "most-discussed") {
    return [...people].sort((a, b) => b.projectsCount - a.projectsCount);
  }

  if (filter === "recent") {
    return [...people].reverse();
  }

  if (filter === "popular") {
    return [...people].sort(
      (a, b) => b.rating * b.projectsCount - a.rating * a.projectsCount,
    );
  }

  return people;
}
