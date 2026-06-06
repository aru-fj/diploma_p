"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Bookmark, CalendarDays } from "lucide-react";

import { publicWorks } from "@/components/mediahire/public/public-works-data";
import {
  getSavedProjectIds,
  SAVED_PROJECTS_CHANGED_EVENT,
  toggleSavedProject,
} from "@/components/mediahire/saved-projects-storage";
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

export function ProjectGrid({
  activeCategory,
  activeSort,
  search,
}: ProjectGridProps) {
  const [savedWorkSlugs, setSavedWorkSlugs] = useState<string[]>([]);

  useEffect(() => {
    const syncSavedProjects = () => {
      setSavedWorkSlugs(getSavedProjectIds());
    };

    syncSavedProjects();
    window.addEventListener(SAVED_PROJECTS_CHANGED_EVENT, syncSavedProjects);
    window.addEventListener("storage", syncSavedProjects);

    return () => {
      window.removeEventListener(
        SAVED_PROJECTS_CHANGED_EVENT,
        syncSavedProjects,
      );
      window.removeEventListener("storage", syncSavedProjects);
    };
  }, []);

  function toggleSavedWork(slug: string) {
    const isSaved = toggleSavedProject(slug);

    setSavedWorkSlugs((current) =>
      isSaved
        ? Array.from(new Set([...current, slug]))
        : current.filter((item) => item !== slug),
    );
  }

  const filteredWorks = useMemo(() => {
    let works = [...publicWorks];

    if (activeCategory === "Saved" || activeCategory === "Following") {
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

    const scoreBySlug = (slug: string) =>
      slug.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);

    if (activeSort === "Top Rated") {
      works = [...works].sort((a, b) => scoreBySlug(b.slug) - scoreBySlug(a.slug));
    } else if (activeSort === "Most Viewed") {
      works = [...works].sort((a, b) => b.title.length - a.title.length);
    } else if (activeSort === "Popular Now") {
      works = [...works].sort((a, b) => b.tools.length - a.tools.length);
    } else if (activeSort === "Most Discussed") {
      works = [...works].sort(
        (a, b) => b.responsibilities.length - a.responsibilities.length,
      );
    } else if (activeSort === "Recently Added") {
      works = [...works].reverse();
    }

    return works;
  }, [activeCategory, activeSort, search, savedWorkSlugs]);

  return (
    <section className="mx-auto mt-6 w-full max-w-none">
      {filteredWorks.length > 0 ? (
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredWorks.map((work) => {
            const isSaved = savedWorkSlugs.includes(work.slug);

            return (
              <article
                key={work.slug}
                className="group overflow-hidden rounded-[1.15rem] border border-slate-200 bg-white shadow-[0_12px_36px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(37,99,235,0.12)]"
              >
                <Link href={`/home/jobseeker/work/${work.slug}`} className="block">
                  <div className="relative h-36 overflow-hidden bg-slate-100">
                    <img
                      src={work.coverImage}
                      alt={work.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-black text-slate-900 shadow-lg backdrop-blur">
                      {work.category}
                    </div>

                    <div className="absolute bottom-3 left-3 rounded-full bg-slate-950/80 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">
                      {work.type}
                    </div>
                  </div>
                </Link>

                <div className="p-3.5">
                  <Link href={`/home/jobseeker/work/${work.slug}`} className="block">
                    <h3 className="text-sm font-black text-slate-950 transition group-hover:text-blue-600">
                      {work.title}
                    </h3>
                  </Link>

                  <p className="mt-1 text-xs font-bold text-slate-500">
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

                  <div className="mt-2.5 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                    <CalendarDays className="h-4 w-4 text-blue-500" />
                    {work.createdAt}
                  </div>

                  <div className="mt-3.5 flex gap-2">
                    <Link
                      href={`/home/jobseeker/work/${work.slug}`}
                      className="flex h-9 flex-1 items-center justify-center rounded-lg bg-blue-600 px-3 text-[11px] font-black text-white transition hover:bg-blue-700"
                    >
                      View details
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleSavedWork(work.slug)}
                      title={isSaved ? "Remove from saved" : "Save project"}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Bookmark
                        className={`h-4 w-4 ${
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
              || activeCategory === "Saved"
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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
      <h3 className="text-xl font-black text-slate-950">{title}</h3>
      <p className="mt-3 text-sm font-medium text-slate-500">{text}</p>
    </div>
  );
}
