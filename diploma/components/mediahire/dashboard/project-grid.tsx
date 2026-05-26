"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Bookmark, CalendarDays } from "lucide-react";

import { publicWorks } from "@/components/mediahire/public/public-works-data";
import type { SortOption } from "./filter-modal";

type ProjectGridProps = {
  activeCategory: string;
  activeSort: SortOption;
  search: string;
};

const bestWorkSlugs = [
  "tales-from-the-river",
  "chubby-characters",
  "minimal-brand-identity",
  "music-video-production",
];

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

export function ProjectGrid({
  activeCategory,
  activeSort,
  search,
}: ProjectGridProps) {
  const [savedWorkSlugs, setSavedWorkSlugs] = useState<string[]>([]);

  useEffect(() => {
    setSavedWorkSlugs(readStorageList("mediahire_jobseeker_saved_projects"));
  }, []);

  function toggleSavedWork(slug: string) {
    setSavedWorkSlugs((current) => {
      const next = current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug];

      window.localStorage.setItem(
        "mediahire_jobseeker_saved_projects",
        JSON.stringify(next),
      );

      return next;
    });
  }

  const filteredWorks = useMemo(() => {
    let works = [...publicWorks];

    if (activeCategory === "Following") {
      works = works.filter((work) => savedWorkSlugs.includes(work.slug));
    }

    if (activeCategory === "The Best of MediaHire") {
      works = works.filter((work) => bestWorkSlugs.includes(work.slug));
    }

    if (activeCategory === "Graphic Design") {
      works = works.filter((work) => work.category === "Graphic Design");
    }

    if (activeCategory === "Photography") {
      works = works.filter((work) => work.category === "Photography");
    }

    if (activeCategory === "Animation") {
      works = works.filter((work) => work.category === "3D / Animation");
    }

    const normalizedSearch = search.trim().toLowerCase();

    if (normalizedSearch) {
      works = works.filter((work) => {
        const searchableText = [
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
          .toLowerCase();

        return searchableText.includes(normalizedSearch);
      });
    }

    if (activeSort === "Recently Added") {
      works = [...works].reverse();
    }

    return works;
  }, [activeCategory, activeSort, search, savedWorkSlugs]);

  return (
    <section className="mx-auto mt-8 w-full max-w-6xl">
      {filteredWorks.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredWorks.map((work) => {
            const isSaved = savedWorkSlugs.includes(work.slug);

            return (
              <article
                key={work.slug}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(37,99,235,0.18)]"
              >
                <Link href={`/home/jobseeker/work/${work.slug}`} className="block">
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
                  <Link href={`/home/jobseeker/work/${work.slug}`} className="block">
                    <h3 className="text-xl font-black text-slate-950 transition group-hover:text-blue-600">
                      {work.title}
                    </h3>
                  </Link>

                  <p className="mt-1 text-sm font-bold text-slate-500">
                    {work.authorSlug ? (
                      <Link
                        href={`/home/jobseeker/people/${work.authorSlug}`}
                        className="transition hover:text-blue-600"
                      >
                        {work.author}
                      </Link>
                    ) : (
                      <span>{work.author}</span>
                    )}{" "}
                    · {work.role}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <CalendarDays className="h-4 w-4 text-blue-500" />
                    {work.createdAt}
                  </div>

                  <div className="mt-5 flex gap-3">
                    <Link
                      href={`/home/jobseeker/work/${work.slug}`}
                      className="flex h-11 flex-1 items-center justify-center rounded-2xl bg-blue-600 px-4 text-sm font-black text-white transition hover:bg-blue-700"
                    >
                      View details
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleSavedWork(work.slug)}
                      title={isSaved ? "Remove from saved" : "Save project"}
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Bookmark
                        className={`h-5 w-5 ${
                          isSaved ? "fill-blue-600 text-blue-600" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No projects found"
          text={
            activeCategory === "Following"
              ? "Save projects first, then they will appear here."
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