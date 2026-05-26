"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Bookmark,
  BriefcaseBusiness,
  MapPin,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import { Footer } from "@/components/mediahire/footer";
import { Header } from "@/components/mediahire/header";
import { kazakhstanCities } from "@/components/mediahire/public/public-jobs-data";
import { publicPeople } from "@/components/mediahire/public/public-people-data";

const candidateCategories = [
  "All",
  "Graphic Design",
  "Screenwriter",
  "Marketer",
  "3D Artist",
  "Videographer",
  "Photographer",
];

function SearchCvPageContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(
    searchParams.get("query") || searchParams.get("q") || "",
  );
  const [location, setLocation] = useState(
    searchParams.get("location") || "All Kazakhstan",
  );
  const [category, setCategory] = useState("All");

  const candidates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return publicPeople.filter((person) => {
      const text = [
        person.name,
        person.role,
        person.category,
        person.location,
        person.shortBio,
        ...person.skills,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = normalizedQuery
        ? text.includes(normalizedQuery)
        : true;
      const matchesLocation =
        location === "All Kazakhstan" ? true : person.location === location;
      const matchesCategory =
        category === "All" ? true : matchesCandidateCategory(person, category);

      return matchesQuery && matchesLocation && matchesCategory;
    });
  }, [category, location, query]);

  function handleSearch() {
    const params = new URLSearchParams();

    if (query.trim()) {
      params.set("query", query.trim());
    }

    if (location !== "All Kazakhstan") {
      params.set("location", location);
    }

    window.history.replaceState(
      null,
      "",
      params.toString() ? `/search-cv?${params.toString()}` : "/search-cv",
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <section className="bg-[#eaf3ff] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <Header role="employer" />

        <div className="mx-auto mt-16 max-w-5xl text-center">
          <p className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-blue-600 shadow-sm">
            <Sparkles className="h-4 w-4" />
            Search CV
          </p>

          <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Want to hire a creative professional?
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-600">
            You are in the right place. Tell us who and where you are looking
            for — we will show the candidates.
          </p>
        </div>

        <div className="mx-auto mt-9 flex max-w-5xl flex-col gap-3 rounded-[1.5rem] bg-white p-3 shadow-[0_24px_80px_rgba(37,99,235,0.12)] md:flex-row">
          <div className="flex h-14 flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
              list="search-cv-suggestions"
              placeholder="Profession and position"
              className="h-full flex-1 bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400"
            />
            <datalist id="search-cv-suggestions">
              {[
                "Graphic Designer",
                "Photographer",
                "Videographer",
                "Animator",
                "3D Artist",
                "Screenwriter",
                "Marketer",
              ].map((item) => (
                <option key={item} value={item} />
              ))}
            </datalist>
          </div>

          <select
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="h-14 rounded-2xl bg-slate-50 px-5 text-sm font-black text-slate-700 outline-none md:w-[260px]"
          >
            {kazakhstanCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleSearch}
            className="h-14 rounded-2xl bg-blue-600 px-8 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Consideration of the candidate
          </button>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3">
          {candidateCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`h-11 rounded-xl px-5 text-sm font-black transition hover:-translate-y-0.5 ${
                category === item
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "bg-white text-slate-600 shadow-sm hover:text-blue-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black text-blue-600">
              Public candidate search
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              {candidates.length} candidates found
            </h2>
          </div>

          <Link
            href="/auth-required?feature=saved-candidates&role=employer"
            className="hidden h-11 items-center justify-center rounded-2xl border border-blue-600 px-5 text-sm font-black text-blue-600 transition hover:bg-blue-50 sm:inline-flex"
          >
            Saved candidates
          </Link>
        </div>

        {candidates.length > 0 ? (
          <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {candidates.map((person) => (
              <article
                key={person.slug}
                className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_22px_70px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(37,99,235,0.18)]"
              >
                <div className="flex items-start gap-4">
                  <div className="h-20 w-20 overflow-hidden rounded-3xl bg-slate-200">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-black text-slate-950">
                      {person.name}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-blue-600">
                      {person.role}
                    </p>
                    <div className="mt-2 flex items-center gap-1 text-sm font-black text-amber-600">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      {person.rating}
                    </div>
                  </div>

                  <Link
                    href="/auth-required?feature=save-candidate&role=employer"
                    title="Sign in to save"
                    className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                  >
                    <Bookmark className="h-5 w-5" />
                  </Link>
                </div>

                <p className="mt-4 line-clamp-2 text-sm font-medium leading-6 text-slate-500">
                  {person.shortBio}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  {person.location}
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <BriefcaseBusiness className="h-4 w-4 text-blue-500" />
                  {person.experience}
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

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Link
                    href={`/people/${person.slug}`}
                    className="flex h-11 items-center justify-center rounded-2xl bg-blue-600 px-4 text-sm font-black text-white transition hover:bg-blue-700"
                  >
                    View Profile
                  </Link>
                  <Link
                    href="/auth-required?feature=invite-to-work&role=employer"
                    className="flex h-11 items-center justify-center rounded-2xl border border-blue-600 px-4 text-sm font-black text-blue-600 transition hover:bg-blue-50"
                  >
                    Invite
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h3 className="text-2xl font-black text-slate-950">
              No candidates found
            </h3>
            <p className="mt-3 text-sm font-medium text-slate-500">
              Try another profession, city, or category.
            </p>
          </div>
        )}
      </section>

      <Footer role="employer" />
    </main>
  );
}

function matchesCandidateCategory(
  person: (typeof publicPeople)[number],
  category: string,
) {
  if (category === "Graphic Design") {
    return person.category === "Graphic Design";
  }

  if (category === "3D Artist") {
    return person.category === "3D / Animation" || person.role.includes("3D");
  }

  if (category === "Photographer") {
    return person.category === "Photography" || person.role.includes("Photo");
  }

  if (category === "Videographer") {
    return person.category === "Production" || person.role.includes("Video");
  }

  if (category === "Marketer") {
    return person.category === "Marketing" || person.role.includes("Marketing");
  }

  if (category === "Screenwriter") {
    return person.role.includes("Screenwriter");
  }

  return true;
}

export default function SearchCvPage() {
  return (
    <Suspense fallback={null}>
      <SearchCvPageContent />
    </Suspense>
  );
}
