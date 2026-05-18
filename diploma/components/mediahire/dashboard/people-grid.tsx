"use client";

import { dashboardPeople, type DashboardPerson } from "./dashboard-data";
import { Pagination } from "./pagination";
import { PersonCard } from "./person-card";

type PeopleGridProps = {
  activeCategory: string;
  onMessage: (person: DashboardPerson) => void;
  search: string;
};

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

  if (category === "Animation") {
    return person.skill === "3D Artist" || person.skill === "Film Director";
  }

  return true;
}

export function PeopleGrid({
  activeCategory,
  onMessage,
  search,
}: PeopleGridProps) {
  const normalizedSearch = search.trim().toLowerCase();
  const visiblePeople = dashboardPeople.filter((person) => {
    const matchesSearch =
      !normalizedSearch ||
      person.name.toLowerCase().includes(normalizedSearch) ||
      person.skill.toLowerCase().includes(normalizedSearch);

    return matchesSearch && categoryMatchesPerson(activeCategory, person);
  });

  return (
    <section className="mx-auto mt-10 w-full max-w-5xl pb-16">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePeople.map((person, index) => (
          <PersonCard
            index={index}
            key={person.id}
            onMessage={onMessage}
            person={person}
          />
        ))}
      </div>

      {visiblePeople.length === 0 ? (
        <div className="mx-auto mt-12 max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <h3 className="text-xl font-black text-slate-950">
            No freelancers found
          </h3>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Try another keyword or select a different category.
          </p>
        </div>
      ) : (
        <Pagination />
      )}
    </section>
  );
}
