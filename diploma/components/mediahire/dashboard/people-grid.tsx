"use client";

import { useEffect, useState } from "react";
import { dashboardPeople, type DashboardPerson } from "./dashboard-data";
import type { SortOption } from "./filter-modal";
import { Pagination } from "./pagination";
import { PersonCard } from "./person-card";
import {
  getSavedProfileIds,
  SAVED_PROFILES_CHANGED_EVENT,
} from "@/components/mediahire/saved-profiles-storage";

type PeopleGridProps = {
  activeCategory: string;
  activeSort: SortOption;
  onMessage: (person: DashboardPerson) => void;
  search: string;
};

function parseMetric(value: string) {
  const normalized = value.toLowerCase().replace(/,/g, "").trim();
  if (normalized.endsWith("k")) {
    return parseFloat(normalized) * 1000;
  }
  if (normalized.endsWith("m")) {
    return parseFloat(normalized) * 1_000_000;
  }
  return parseFloat(normalized) || 0;
}

function categoryMatchesPerson(category: string, person: DashboardPerson) {
  if (
    category === "For You" ||
    category === "Following" ||
    category === "The best of MediaHire"
  ) {
    return true;
  }

  if (category === "Photography") {
    return person.skill === "Photographer" || person.skill === "Videographer";
  }

  if (category === "Graphic design") {
    return person.skill === "Graphic Designer" || person.skill === "3D Artist";
  }

  if (category === "3D Animation" || category === "Animation") {
    return person.skill === "3D Artist" || person.skill === "3D Animator";
  }

  return true;
}

export function PeopleGrid({
  activeCategory,
  activeSort,
  onMessage,
  search,
}: PeopleGridProps) {
  const [savedProfileIds, setSavedProfileIds] = useState<string[]>([]);

  useEffect(() => {
    const syncSavedProfiles = () => {
      setSavedProfileIds(getSavedProfileIds());
    };

    syncSavedProfiles();

    window.addEventListener(SAVED_PROFILES_CHANGED_EVENT, syncSavedProfiles);
    window.addEventListener("storage", syncSavedProfiles);

    return () => {
      window.removeEventListener(
        SAVED_PROFILES_CHANGED_EVENT,
        syncSavedProfiles
      );
      window.removeEventListener("storage", syncSavedProfiles);
    };
  }, []);

  const normalizedSearch = search.trim().toLowerCase();

  const visiblePeople = dashboardPeople.filter((person) => {
    const matchesSearch =
      !normalizedSearch ||
      person.name.toLowerCase().includes(normalizedSearch) ||
      person.skill.toLowerCase().includes(normalizedSearch);

    const matchesCategory =
      activeCategory === "Saved"
        ? savedProfileIds.includes(person.id)
        : categoryMatchesPerson(activeCategory, person);

    return matchesSearch && matchesCategory;
  });

  const sortedPeople = [...visiblePeople].sort((a, b) => {
    if (activeSort === "Top Rated") {
      return b.rating - a.rating;
    }

    if (activeSort === "Most Hired" || activeSort === "Most Experienced") {
      return parseMetric(b.score) - parseMetric(a.score);
    }

    if (activeSort === "Most Popular") {
      return parseMetric(b.views) - parseMetric(a.views);
    }

    if (activeSort === "Recently Active") {
      return b.id.localeCompare(a.id);
    }

    return 0;
  });

  return (
    <section className="mx-auto mt-10 w-full max-w-5xl pb-16">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {sortedPeople.map((person, index) => (
          <PersonCard
            index={index}
            key={person.id}
            onMessage={onMessage}
            person={person}
          />
        ))}
      </div>

      {sortedPeople.length === 0 ? (
        <div className="mx-auto mt-12 max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <h3 className="text-xl font-black text-slate-950">
            {activeCategory === "Saved"
              ? "No saved people yet"
              : "No freelancers found"}
          </h3>
          <p className="mt-2 text-sm font-medium text-slate-500">
            {activeCategory === "Saved"
              ? "Open a person profile and click Save. Saved people will appear here."
              : "Try another keyword or select a different category."}
          </p>
        </div>
      ) : (
        <Pagination />
      )}
    </section>
  );
}