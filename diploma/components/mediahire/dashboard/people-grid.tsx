"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Bookmark,
  BriefcaseBusiness,
  MapPin,
  Star,
  Users,
} from "lucide-react";

import { publicPeople } from "@/components/mediahire/public/public-people-data";
import {
  getSavedProfileIds,
  SAVED_PROFILES_CHANGED_EVENT,
  toggleSavedProfile,
} from "@/components/mediahire/saved-profiles-storage";
import type { DashboardPerson } from "./dashboard-data";
import type { SortOption } from "./filter-modal";

type PeopleGridProps = {
  activeCategory: string;
  activeSort: SortOption;
  search: string;
  onMessage: (person: DashboardPerson) => void;
};

const bestPeopleSlugs = ["madina-omar", "dimash-karim", "amina-saparova"];

function readStorageList(key: string) {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(key);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [];
  }
}

export function PeopleGrid({
  activeCategory,
  activeSort,
  search,
  onMessage,
}: PeopleGridProps) {
  const [savedPeopleSlugs, setSavedPeopleSlugs] = useState<string[]>([]);

  useEffect(() => {
    const syncSavedPeople = () => {
      const legacySaved = readStorageList("mediahire_jobseeker_saved_people");
      const savedProfiles = getSavedProfileIds();
      setSavedPeopleSlugs(Array.from(new Set([...savedProfiles, ...legacySaved])));
    };

    syncSavedPeople();
    window.addEventListener(SAVED_PROFILES_CHANGED_EVENT, syncSavedPeople);
    window.addEventListener("storage", syncSavedPeople);

    return () => {
      window.removeEventListener(SAVED_PROFILES_CHANGED_EVENT, syncSavedPeople);
      window.removeEventListener("storage", syncSavedPeople);
    };
  }, []);

  function toggleSavedPerson(slug: string) {
    const isSaved = toggleSavedProfile(slug);

    setSavedPeopleSlugs((current) =>
      isSaved
        ? Array.from(new Set([...current, slug]))
        : current.filter((item) => item !== slug),
    );
  }

  const filteredPeople = useMemo(() => {
    let people = [...publicPeople];

    if (activeCategory === "Saved" || activeCategory === "Following") {
      people = people.filter((person) => savedPeopleSlugs.includes(person.slug));
    }

    if (activeCategory === "The Best of MediaHire") {
      people = people.filter((person) => bestPeopleSlugs.includes(person.slug));
    }

    if (activeCategory === "Graphic Design") {
      people = people.filter((person) => person.category === "Graphic Design");
    }

    if (activeCategory === "Photography") {
      people = people.filter((person) => person.category === "Photography");
    }

    if (activeCategory === "Animation") {
      people = people.filter((person) => person.category === "3D / Animation");
    }

    const normalizedSearch = search.trim().toLowerCase();

    if (normalizedSearch) {
      people = people.filter((person) => {
        const searchableText = [
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
          .toLowerCase();

        return searchableText.includes(normalizedSearch);
      });
    }

    if (activeSort === "Top Rated") {
      people = [...people].sort((a, b) => b.rating - a.rating);
    } else if (activeSort === "Most Hired") {
      people = [...people].sort((a, b) => b.projectsCount - a.projectsCount);
    } else if (activeSort === "Most Experienced") {
      people = [...people].sort(
        (a, b) => parseInt(b.experience, 10) - parseInt(a.experience, 10),
      );
    } else if (activeSort === "Most Popular") {
      people = [...people].sort((a, b) => b.skills.length - a.skills.length);
    } else if (activeSort === "Recently Active") {
      people = [...people].reverse();
    }

    return people;
  }, [activeCategory, activeSort, search, savedPeopleSlugs]);

  return (
    <section className="mx-auto mt-7 w-full max-w-5xl">
      {filteredPeople.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPeople.map((person) => {
            const isSaved = savedPeopleSlugs.includes(person.slug);

            return (
              <article
                key={person.slug}
                className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(37,99,235,0.16)]"
              >
                <div className="relative h-28 overflow-hidden bg-slate-100">
                  <img
                    src={person.coverImage}
                    alt={person.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-black text-slate-900 shadow-lg backdrop-blur">
                    {person.category}
                  </div>
                </div>

                <div className="relative p-4 pt-10">
                  <div className="absolute -top-5 left-4 h-12 w-12 overflow-hidden rounded-2xl border-4 border-white bg-slate-200 shadow-lg">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-black text-amber-600">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    {person.rating}
                  </div>

                  <h3 className="text-lg font-black text-slate-950">
                    {person.name}
                  </h3>

                  <p className="mt-1 text-xs font-bold text-blue-600">
                    {person.role}
                  </p>

                  <p className="mt-2 line-clamp-2 text-xs font-medium leading-5 text-slate-500">
                    {person.shortBio}
                  </p>

                  <div className="mt-3 space-y-1.5 text-xs font-semibold text-slate-500">
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

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {person.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-black text-blue-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 rounded-xl bg-slate-50 px-3 py-2.5 text-xs font-black text-slate-700">
                    {person.availability}
                  </div>

                  <div className="mt-4 flex gap-2.5">
                    <Link
                      href={`/home/jobseeker/people/${person.slug}`}
                      className="flex h-10 flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 text-xs font-black text-white transition hover:bg-blue-700"
                    >
                      View profile
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleSavedPerson(person.slug)}
                      title={isSaved ? "Remove from saved" : "Save person"}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Bookmark
                        className={`h-5 w-5 ${
                          isSaved ? "fill-blue-600 text-blue-600" : ""
                        }`}
                      />
                    </button>
                  </div>

                    <button
                      type="button"
                      onClick={() =>
                        onMessage({
                          avatar: person.avatar,
                          id: person.slug,
                          name: person.name,
                          profileHref: `/home/jobseeker/people/${person.slug}`,
                          rating: person.rating,
                          score: `${person.projectsCount}`,
                          skill: person.role,
                          views: person.location,
                        })
                      }
                      className="mt-2.5 flex h-10 w-full items-center justify-center rounded-xl border border-blue-100 bg-blue-50 px-4 text-xs font-black text-blue-600 transition hover:bg-blue-100"
                    >
                    Message
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No people found"
          text={
            activeCategory === "Following"
              || activeCategory === "Saved"
              ? "Save people first, then they will appear here."
              : "Try another category or search keyword."
          }
        />
      )}
    </section>
  );
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
      <h3 className="text-2xl font-black text-slate-950">{title}</h3>
      <p className="mt-3 text-sm font-medium text-slate-500">{text}</p>
    </div>
  );
}
