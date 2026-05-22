"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";

import {
  demoProjects,
  getStoredProjects,
  homeProjectDetails,
  type MediaHireProject,
} from "../projects-data";
import { supabase } from "@/lib/supabase-client";
import { JobSeekerNav, MediaHireFooter } from "../jobseeker-jobs/job-shared-ui";
import { requireJobSeekerAuth } from "../shared/guest-permissions";

function renderBlock(project: MediaHireProject) {
  return project.media
    .slice()
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .map((block) => {
      if (block.type === "text") {
        return (
          <p
            className="mx-auto max-w-3xl text-center text-lg font-semibold italic leading-8 text-slate-700"
            key={block.id}
          >
            {block.textContent}
          </p>
        );
      }

      if ((block.type === "image" || block.type === "photo_grid") && block.url) {
        return (
          <img
            alt={block.fileName || project.title}
            className="mx-auto w-full max-w-5xl rounded-2xl object-cover"
            key={block.id}
            src={block.url}
          />
        );
      }

      if (block.type === "video" && block.url) {
        return (
          <video
            className="mx-auto w-full max-w-5xl rounded-2xl"
            controls
            key={block.id}
            src={block.url}
          />
        );
      }

      if (block.type === "pdf") {
        return (
          <a
            className="mx-auto block max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 text-center text-sm font-black text-[#0B63E5]"
            href={block.url || "#"}
            key={block.id}
            rel="noreferrer"
            target="_blank"
          >
            {block.fileName || "Open PDF"}
          </a>
        );
      }

      return null;
    });
}

export function ProjectDetailPage({ projectId }: { projectId: string }) {
  const [projects, setProjects] = useState<MediaHireProject[]>([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function hydrateProject() {
      const localProjects = [
        ...getStoredProjects(),
        ...homeProjectDetails,
        ...demoProjects,
      ];

      if (localProjects.some((candidate) => candidate.id === projectId)) {
        if (isMounted) {
          setProjects(localProjects);
        }
        return;
      }

      const { data: projectRow } = await supabase
        .from("projects")
        .select(
          "id,title,description,status,cover_url,created_at,updated_at,published_at,author_id",
        )
        .eq("id", projectId)
        .eq("status", "published")
        .maybeSingle();

      if (!projectRow) {
        if (isMounted) {
          setProjects(localProjects);
        }
        return;
      }

      const [{ data: profileRow }, { data: mediaRows }] = await Promise.all([
        supabase
          .from("profiles")
          .select("full_name,first_name,last_name,email,avatar_url")
          .eq("id", projectRow.author_id)
          .maybeSingle(),
        supabase
          .from("project_media")
          .select("id,type,url,text_content,file_name,order_index")
          .eq("project_id", projectRow.id)
          .order("order_index", { ascending: true }),
      ]);

      const authorName =
        profileRow?.full_name ||
        [profileRow?.first_name, profileRow?.last_name]
          .filter(Boolean)
          .join(" ") ||
        profileRow?.email ||
        "MediaHire creator";
      const project: MediaHireProject = {
        authorAvatar: profileRow?.avatar_url || undefined,
        authorId: projectRow.author_id,
        authorName,
        coverUrl: projectRow.cover_url || undefined,
        createdAt: projectRow.created_at,
        description: projectRow.description || "",
        id: projectRow.id,
        media: (mediaRows || []).map((mediaRow) => ({
          fileName: mediaRow.file_name || undefined,
          id: mediaRow.id,
          orderIndex: mediaRow.order_index ?? 0,
          textContent: mediaRow.text_content || undefined,
          type: mediaRow.type,
          url: mediaRow.url || undefined,
        })),
        publishedAt: projectRow.published_at || undefined,
        status: projectRow.status,
        title: projectRow.title,
        updatedAt: projectRow.updated_at || projectRow.created_at,
      };

      if (isMounted) {
        setProjects([project, ...localProjects]);
      }
    }

    void hydrateProject();

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  const project = useMemo(
    () =>
      projects.find(
        (candidate) =>
          candidate.id === projectId && candidate.status === "published",
      ),
    [projectId, projects],
  );

  if (!project) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] px-5 py-16">
        <div className="mx-auto max-w-xl rounded-[2rem] bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-black text-slate-950">Project not found</h1>
          <p className="mt-3 text-sm font-semibold text-slate-500">
            This project is not published or does not exist.
          </p>
          <Link
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#0B63E5] px-6 text-sm font-black text-white"
            href="/profile/jobseeker"
          >
            Back to My Profile
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <div className="bg-white py-8">
        <JobSeekerNav active="My Profile" />
      </div>

      <article className="mx-auto w-[min(1040px,calc(100%-32px))]">
        <header className="mb-8 flex items-center gap-3">
          <img
            alt={project.authorName}
            className="h-12 w-12 rounded-full object-cover"
            src={
              project.authorAvatar ||
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=85"
            }
          />
          <div>
            <h1 className="text-xl font-black text-slate-950">{project.title}</h1>
            <p className="text-sm font-semibold text-slate-500">
              {project.authorName}
            </p>
          </div>
        </header>

        <section className="rounded-[2rem] bg-[#edf4ff] px-6 py-12 text-center md:px-14">
          <h2 className="text-4xl font-black italic text-[#0B63E5]">
            {project.title}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base font-semibold italic leading-8 text-slate-700">
            {project.description}
          </p>
          <div className="mt-10 grid gap-7">{renderBlock(project)}</div>
          <div className="mt-12">
            <p className="text-sm font-black text-slate-600">
              {project.authorName}
            </p>
            <h3 className="text-3xl font-black text-slate-950">{project.title}</h3>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              Published{" "}
              {project.publishedAt
                ? new Date(project.publishedAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "recently"}
            </p>
            <button
              className="mx-auto mt-7 grid h-14 w-14 place-items-center rounded-full bg-[#0B63E5] text-white transition hover:scale-105"
              onClick={() => {
                void requireJobSeekerAuth("like projects");
              }}
              type="button"
            >
              <Heart fill="currentColor" size={24} />
            </button>
          </div>
        </section>

        <section className="mt-10 rounded-[1.5rem] border border-slate-200 bg-white p-6">
          <div className="flex gap-4">
            <img
              alt={project.authorName}
              className="h-11 w-11 rounded-full object-cover"
              src={
                project.authorAvatar ||
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=85"
              }
            />
            <textarea
              className="min-h-24 flex-1 rounded-xl border border-slate-200 p-4 text-sm font-semibold outline-none focus:border-[#0B63E5]"
              onChange={(event) => setComment(event.target.value)}
              onFocus={(event) => {
                const textarea = event.currentTarget;
                void (async () => {
                  if (!(await requireJobSeekerAuth("write comments"))) {
                    textarea.blur();
                  }
                })();
              }}
              placeholder="What do you think about the project?"
              value={comment}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[#0B63E5] px-5 text-xs font-black text-white"
              onClick={() => {
                void requireJobSeekerAuth("write comments");
              }}
              type="button"
            >
              <MessageCircle size={15} />
              Post comments
            </button>
          </div>
          <div className="mt-8 grid gap-5 border-t border-slate-100 pt-6">
            {["Gorgeous work!", "Looks so great!", "Cooooo"].map((text, index) => (
              <div className="flex gap-3" key={text}>
                <div className="h-10 w-10 rounded-full bg-slate-200" />
                <div>
                  <p className="text-sm font-black text-slate-950">
                    {["Eduardo Sanchez", "Gena Miyutin", "Freddy Fabris"][index] ||
                      "MediaHire user"}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>

      <MediaHireFooter />
    </main>
  );
}
