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
    setSavedPeopleSlugs(readStorageList("mediahire_jobseeker_saved_people"));
  }, []);

  function toggleSavedPerson(slug: string) {
    setSavedPeopleSlugs((current) => {
      const next = current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug];

      window.localStorage.setItem(
        "mediahire_jobseeker_saved_people",
        JSON.stringify(next),
      );

      return next;
    });
  }

  const filteredPeople = useMemo(() => {
    let people = [...publicPeople];

    if (activeCategory === "Following") {
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

    if (activeSort === "Recently Active") {
      people = [...people].reverse();
    }

    return people;
  }, [activeCategory, activeSort, search, savedPeopleSlugs]);

  return (
    <section className="mx-auto mt-8 w-full max-w-6xl">
      {filteredPeople.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPeople.map((person) => {
            const isSaved = savedPeopleSlugs.includes(person.slug);

            return (
              <article
                key={person.slug}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(37,99,235,0.18)]"
              >
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

                  <h3 className="text-xl font-black text-slate-950">
                    {person.name}
                  </h3>

                  <p className="mt-1 text-sm font-bold text-blue-600">
                    {person.role}
                  </p>

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
                      href={`/home/jobseeker/people/${person.slug}`}
                      className="flex h-11 flex-1 items-center justify-center rounded-2xl bg-blue-600 px-4 text-sm font-black text-white transition hover:bg-blue-700"
                    >
                      View profile
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleSavedPerson(person.slug)}
                      title={isSaved ? "Remove from saved" : "Save person"}
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
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
                    onClick={() => onMessage(person as unknown as DashboardPerson)}
                    className="mt-3 flex h-11 w-full items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 px-4 text-sm font-black text-blue-600 transition hover:bg-blue-100"
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
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h3 className="text-2xl font-black text-slate-950">{title}</h3>
      <p className="mt-3 text-sm font-medium text-slate-500">{text}</p>
    </div>
  );
}