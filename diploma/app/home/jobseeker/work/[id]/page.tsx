"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  Heart,
  LockKeyhole,
  MessageCircle,
  Play,
  Send,
} from "lucide-react";

import { DashboardFooter } from "@/components/mediahire/dashboard/dashboard-footer";
import { DashboardHeader } from "@/components/mediahire/dashboard/dashboard-header";
import {
  getPublicWorkBySlug,
  type PublicWorkMedia,
} from "@/components/mediahire/public/public-works-data";
import { publicPeople } from "@/components/mediahire/public/public-people-data";

type ProjectComment = {
  avatar: string;
  name: string;
  date: string;
  text: string;
};

const defaultComments: ProjectComment[] = [
  {
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    name: "Eduardo Sánchez",
    date: "December 9, 2025",
    text: "Gorgeous work!",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    name: "Gena Mylutin",
    date: "November 21, 2025",
    text: "Looks so great!",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    name: "Freddy Fabris",
    date: "November 7, 2025",
    text: "Cooooool!",
  },
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

function readStoredComments(key: string) {
  if (typeof window === "undefined") return defaultComments;

  try {
    const stored = window.localStorage.getItem(key);
    if (!stored) return defaultComments;

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : defaultComments;
  } catch {
    return defaultComments;
  }
}

export default function JobSeekerWorkDetailPage() {
  const params = useParams<{ id: string }>();
  const work = getPublicWorkBySlug(params.id);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<ProjectComment[]>(defaultComments);
  const [isSaved, setIsSaved] = useState(false);

  const commentsStorageKey = `mediahire_jobseeker_project_comments_${params.id}`;

  useEffect(() => {
    setComments(readStoredComments(commentsStorageKey));

    const savedProjects = readStorageList("mediahire_jobseeker_saved_projects");
    setIsSaved(savedProjects.includes(params.id));
  }, [commentsStorageKey, params.id]);

  function toggleSavedProject() {
    const savedProjects = readStorageList("mediahire_jobseeker_saved_projects");

    const next = savedProjects.includes(params.id)
      ? savedProjects.filter((slug) => slug !== params.id)
      : [...savedProjects, params.id];

    window.localStorage.setItem(
      "mediahire_jobseeker_saved_projects",
      JSON.stringify(next),
    );

    setIsSaved(next.includes(params.id));
  }

  function handlePostComment() {
    const value = commentText.trim();

    if (!value) return;

    const newComment: ProjectComment = {
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      name: "You",
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      text: value,
    };

    const nextComments = [newComment, ...comments];

    setComments(nextComments);
    setCommentText("");

    window.localStorage.setItem(
      commentsStorageKey,
      JSON.stringify(nextComments),
    );
  }

  if (!work) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
        <div className="mx-auto min-h-screen w-full px-4 py-8 sm:px-8 lg:px-12">
          <DashboardHeader
            isMenuOpen={isMenuOpen}
            isUserMenuOpen={isUserMenuOpen}
            onToggleMenu={() => setIsMenuOpen((current) => !current)}
            onToggleUserMenu={() => setIsUserMenuOpen((current) => !current)}
          />

          <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
              <BriefcaseBusiness className="h-8 w-8" />
            </div>

            <h1 className="text-4xl font-black tracking-tight">
              Work not found
            </h1>

            <p className="mt-4 max-w-xl text-base font-medium leading-7 text-slate-500">
              This project does not exist or may have been removed.
            </p>

            <Link
              href="/home/jobseeker"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-2xl bg-blue-600 px-6 text-sm font-black text-white transition hover:bg-blue-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </section>
        </div>

        <DashboardFooter />
      </main>
    );
  }

  const authorAvatar = work.authorAvatar || work.coverImage;
  const authorProfile = publicPeople.find(
    (person) => person.slug === work.authorSlug || person.name === work.author,
  );

  const authorProfileHref = authorProfile
    ? `/home/jobseeker/people/${authorProfile.slug}`
    : `/home/jobseeker/people/${createSlug(work.author)}`;

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <div className="mx-auto min-h-screen w-full px-4 py-8 sm:px-8 lg:px-12">
        <DashboardHeader
          isMenuOpen={isMenuOpen}
          isUserMenuOpen={isUserMenuOpen}
          onToggleMenu={() => setIsMenuOpen((current) => !current)}
          onToggleUserMenu={() => setIsUserMenuOpen((current) => !current)}
        />

        <section className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          <Link
            href="/home/jobseeker"
            className="mb-6 inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>

          <Link
            href={authorProfileHref}
            className="mb-4 flex w-fit items-center gap-3 rounded-[1.4rem] bg-white px-4 py-3 shadow-[0_14px_40px_rgba(15,23,42,0.07)] transition hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-[0_18px_50px_rgba(37,99,235,0.12)]"
          >
            <div className="h-14 w-14 overflow-hidden rounded-[1rem] bg-slate-200">
              <img
                src={authorAvatar}
                alt={work.author}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-lg font-black text-slate-950">
                {work.title}
              </h2>

              <p className="mt-0.5 text-base font-black text-slate-500 transition hover:text-blue-600">
                {work.author}
              </p>
            </div>
          </Link>

          <article className="overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <div className="bg-[#eaf3ff] px-5 py-6 sm:px-8 md:px-8">
              <header className="mx-auto max-w-3xl text-center">
                <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-blue-600 shadow-sm">
                  Project details
                </p>

                <h1 className="text-3xl font-black italic text-blue-600 md:text-4xl">
                  {work.title}
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-sm font-bold italic leading-7 text-slate-700 md:text-base">
                  {work.description}
                </p>
              </header>

              <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-6">
                {work.gallery.map((media, index) => (
                  <ProjectMediaItem
                    key={`${media.type}-${media.src}-${index}`}
                    media={media}
                    index={index}
                    title={work.title}
                  />
                ))}
              </div>

              <footer className="mx-auto mt-10 max-w-3xl text-center">
                <div className="mx-auto h-14 w-14 overflow-hidden rounded-2xl bg-slate-200 shadow-sm">
                  <img
                    src={authorAvatar}
                    alt={work.author}
                    className="h-full w-full object-cover"
                  />
                </div>

                <p className="mt-4 text-xs font-black text-slate-600">
                  {work.author}
                </p>

                <h2 className="mt-1 text-2xl font-black italic text-slate-950">
                  {work.title}
                </h2>

                <p className="mt-2 text-xs font-semibold text-slate-500">
                  Published: {work.createdAt}
                </p>

                <button
                  type="button"
                  onClick={toggleSavedProject}
                  className="mx-auto mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition hover:scale-105 hover:bg-blue-600"
                  title={isSaved ? "Remove from saved" : "Save project"}
                >
                  <Heart className={`h-6 w-6 ${isSaved ? "fill-white" : ""}`} />
                </button>
              </footer>
            </div>
          </article>

          <section className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
            <div className="border-b border-slate-200 p-5 md:p-6">
              <div className="flex gap-4">
                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
                    alt="Current user"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <textarea
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                    placeholder="Write a comment about the project."
                    className="h-24 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-300 focus:bg-white"
                  />

                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={handlePostComment}
                      className="inline-flex h-9 items-center justify-center rounded-full bg-blue-600 px-5 text-xs font-black text-white transition hover:bg-blue-700"
                    >
                      <Send className="mr-2 h-3.5 w-3.5" />
                      Post comment
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-5 md:p-6">
              {comments.map((comment, index) => (
                <CommentItem
                  key={`${comment.name}-${comment.date}-${index}`}
                  avatar={comment.avatar}
                  name={comment.name}
                  date={comment.date}
                  text={comment.text}
                />
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-5 md:grid-cols-3">
            <InfoBox
              icon={<BriefcaseBusiness className="h-5 w-5" />}
              label="Category"
              value={work.category}
            />

            <InfoBox
              icon={<CalendarDays className="h-5 w-5" />}
              label="Type"
              value={work.type}
            />

            <InfoBox
              icon={<LockKeyhole className="h-5 w-5" />}
              label="Access"
              value="Job seeker account"
            />
          </section>

          <section className="mt-8 rounded-[2rem] border border-blue-100 bg-blue-50 p-6 text-center">
            <MessageCircle className="mx-auto h-7 w-7 text-blue-600" />

            <h2 className="mt-3 text-xl font-black text-slate-950">
              Want to contact the creator?
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm font-medium leading-6 text-slate-500">
              You can open the creator profile and start communication from
              their profile page.
            </p>

            <Link
              href={authorProfileHref}
              className="mt-5 inline-flex h-11 items-center justify-center rounded-2xl bg-blue-600 px-6 text-sm font-black text-white transition hover:bg-blue-700"
            >
              Open creator profile
            </Link>
          </section>
        </section>
      </div>

      <DashboardFooter />
    </main>
  );
}

function createSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ProjectMediaItem({
  media,
  index,
  title,
}: {
  media: PublicWorkMedia;
  index: number;
  title: string;
}) {
  if (media.type === "image") {
    return (
      <div className="overflow-hidden rounded-[1.5rem] bg-slate-100 shadow-sm ring-1 ring-white">
        <img
          src={media.src}
          alt={media.alt || `${title} ${index + 1}`}
          className="w-full object-cover"
        />
      </div>
    );
  }

  if (media.type === "youtube") {
    const embedUrl = getYouTubeEmbedUrl(media.src);

    return (
      <div className="overflow-hidden rounded-[1.5rem] bg-black shadow-sm ring-1 ring-white">
        <div className="flex items-center gap-2 bg-slate-950 px-4 py-3 text-sm font-black text-white">
          <Play className="h-4 w-4" />
          {media.title}
        </div>

        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={media.title}
            className="aspect-video w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="flex aspect-video items-center justify-center bg-slate-900 px-6 text-center text-sm font-bold text-white">
            Invalid YouTube link
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-black text-slate-900">
          <FileText className="h-5 w-5 text-blue-600" />
          {media.title}
        </div>

        <a
          href={media.src}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-blue-600 px-4 py-2 text-xs font-black text-white transition hover:bg-blue-700"
        >
          Open PDF
        </a>
      </div>

      <iframe
        src={`${media.src}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
        title={media.title}
        className="h-[85vh] min-h-[760px] w-full bg-white"
      />
    </div>
  );
}

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === "youtu.be") {
      const id = parsedUrl.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    if (
      parsedUrl.hostname === "www.youtube.com" ||
      parsedUrl.hostname === "youtube.com"
    ) {
      const watchId = parsedUrl.searchParams.get("v");

      if (watchId) {
        return `https://www.youtube.com/embed/${watchId}`;
      }

      if (parsedUrl.pathname.startsWith("/embed/")) {
        return url;
      }

      if (parsedUrl.pathname.startsWith("/shorts/")) {
        const id = parsedUrl.pathname.replace("/shorts/", "");
        return id ? `https://www.youtube.com/embed/${id}` : "";
      }
    }

    return "";
  } catch {
    return "";
  }
}

function CommentItem({
  avatar,
  name,
  date,
  text,
}: {
  avatar: string;
  name: string;
  date: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-slate-200">
        <img src={avatar} alt={name} className="h-full w-full object-cover" />
      </div>

      <div>
        <p className="text-lg font-black text-slate-950">
          {name}
          <span className="ml-2 text-xs font-semibold text-slate-400">
            · {date}
          </span>
        </p>

        <p className="mt-1 text-sm font-medium text-slate-600">{text}</p>
      </div>
    </div>
  );
}

function InfoBox({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-black text-slate-800">{value}</p>
    </div>
  );
}