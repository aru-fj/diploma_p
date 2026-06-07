"use client";

import type { ReactNode } from "react";
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
import { Footer } from "@/components/mediahire/footer";
import { Header } from "@/components/mediahire/header";
import {
  getPublicWorkBySlug,
  publicAuthLinks,
  type PublicWorkMedia,
} from "@/components/mediahire/public/public-works-data";
import { publicPeople } from "@/components/mediahire/public/public-people-data";

export default function PublicWorkDetailPage() {
  const params = useParams<{ id: string }>();
  const work = getPublicWorkBySlug(params.id);

  if (!work) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
        <Header />

        <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <BriefcaseBusiness className="h-8 w-8" />
          </div>

          <h1 className="text-2xl font-black tracking-tight">
            Work not found
          </h1>

          <p className="mt-4 max-w-xl text-base font-medium leading-7 text-slate-500">
            This public project does not exist or may have been removed.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex h-10 items-center justify-center rounded-2xl bg-blue-600 px-6 text-sm font-black text-white transition hover:bg-blue-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to homepage
          </Link>
        </section>

        <Footer />
      </main>
    );
  }
  
  const authorAvatar = work.authorAvatar || work.coverImage;
  const authorProfile = publicPeople.find(
    (person) => person.name === work.author,
  );
  const authorProfileHref = `/people/${work.authorSlug}`;

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <div className="bg-[#eaf3ff] pb-6 pt-5 sm:pt-6">
        <Header />
      </div>

      <section className="mx-auto w-full max-w-4xl px-4 pb-12 pt-6 sm:px-6 lg:px-5">
        <div className="mb-5 flex flex-col gap-3 sm:grid sm:grid-cols-[auto_1fr] sm:items-center lg:grid-cols-[0px_1fr]">
          <Link
            href="/"
            className="inline-flex h-10 w-fit items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 lg:-translate-x-20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>

          <Link
            href={authorProfileHref}
            className="flex w-fit items-center gap-3.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_12px_34px_rgba(15,23,42,0.07)] transition hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-[0_16px_42px_rgba(37,99,235,0.12)] sm:justify-self-start"
          >
            <div className="h-12 w-14 overflow-hidden rounded-xl bg-slate-200">
              <img
                src={authorAvatar}
                alt={work.author}
                className="h-full w-full object-cover object-[center_10%]"
              />
            </div>

            <div>
              <h2 className="text-sm font-black text-slate-950">
                {work.title}
              </h2>
              <p className="mt-0.5 text-xs font-black text-slate-500 transition hover:text-blue-600">
                {work.author}
              </p>
            </div>
          </Link>
        </div>

        <article className="overflow-hidden rounded-2xl border border-white bg-white shadow-[0_18px_56px_rgba(15,23,42,0.08)]">
          <div className="bg-[#eaf3ff] px-4 py-5 sm:px-5">
            <header className="mx-auto max-w-2xl text-center">
              <p className="mb-3 inline-flex rounded-full bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-blue-600 shadow-sm">
                Public project
              </p>

              <h1 className="text-2xl font-black italic text-blue-600">
                {work.title}
              </h1>

              <p className="mx-auto mt-3 max-w-xl text-xs font-bold italic leading-6 text-slate-700 sm:text-sm">
                {work.description}
              </p>
            </header>

            <div className="mx-auto mt-6 flex max-w-2xl flex-col gap-4">
              {work.gallery.map((media, index) => (
                <ProjectMediaItem
                  key={`${media.type}-${
                    media.type === "text" ? media.text : media.src
                  }-${index}`}
                  media={media}
                  index={index}
                  title={work.title}
                />
              ))}
            </div>

            <footer className="mx-auto mt-6 max-w-2xl text-center">
              <div className="mx-auto h-9 w-12 overflow-hidden rounded-xl bg-slate-200 shadow-sm">
                <img
                  src={authorAvatar}
                  alt={work.author}
                  className="h-full w-full object-cover object-[center_10%]"
                />
              </div>

              <p className="mt-3 text-[11px] font-black text-slate-600">
                {work.author}
              </p>

              <h2 className="mt-1 text-lg font-black italic text-slate-950">
                {work.title}
              </h2>

              <p className="mt-1.5 text-[11px] font-semibold text-slate-500">
                Published: {work.createdAt}
              </p>

              <Link
                href={publicAuthLinks.login}
                className="mx-auto mt-5 flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition hover:scale-105 hover:bg-blue-600"
                title="Sign in to like"
              >
                <Heart className="h-5 w-5 fill-white" />
              </Link>
            </footer>
          </div>
        </article>

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
          <div className="border-b border-slate-200 p-4">
            <div className="flex gap-3">
              <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-slate-200">
                <img
                  src={authorAvatar}
                  alt={work.author}
                  className="h-full w-full object-cover object-[center_10%]"
                />
              </div>

              <div className="flex-1">
                <textarea
                  readOnly
                  placeholder="Sign in to write a comment about the project."
                  className="h-16 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-500 outline-none"
                />

                <div className="mt-2.5 flex justify-end">
                  <Link
                    href={publicAuthLinks.login}
                    className="inline-flex h-8 items-center justify-center rounded-full bg-blue-600 px-4 text-[11px] font-black text-white transition hover:bg-blue-700"
                  >
                    <Send className="mr-2 h-3.5 w-3.5" />
                    Post comment
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4">
            <CommentItem
              avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
              name="Eduardo Sánchez"
              date="December 9, 2025"
              text="Gorgeous work!"
            />

            <CommentItem
              avatar="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
              name="Gena Mylutin"
              date="November 21, 2025"
              text="Looks so great!"
            />

            <CommentItem
              avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
              name="Freddy Fabris"
              date="November 7, 2025"
              text="Cooooool!"
            />
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <InfoBox
            icon={<BriefcaseBusiness className="h-4 w-4" />}
            label="Category"
            value={work.category}
          />

          <InfoBox
            icon={<CalendarDays className="h-4 w-4" />}
            label="Type"
            value={work.type}
          />

          <InfoBox
            icon={<LockKeyhole className="h-4 w-4" />}
            label="Guest access"
            value="View only"
          />
        </section>

        <section className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-center">
          <MessageCircle className="mx-auto h-6 w-6 text-blue-600" />

          <h2 className="mt-2.5 text-lg font-black text-slate-950">
            Want to contact the creator?
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-xs font-medium leading-5 text-slate-500">
            Guests can only view project details. To save, like, comment, or
            send a message, create an account.
          </p>

          <Link
            href={publicAuthLinks.login}
            className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-5 text-xs font-black text-white transition hover:bg-blue-700"
          >
            Sign in to interact
          </Link>
        </section>
      </section>

      <Footer />
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
      <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-white">
        <img
          src={media.src}
          alt={media.alt || `${title} ${index + 1}`}
          className="block h-auto w-full rounded-2xl"
        />
      </div>
    );
  }

  if (media.type === "youtube") {
    const embedUrl = getYouTubeEmbedUrl(media.src);

    return (
      <div className="overflow-hidden rounded-2xl bg-black shadow-sm ring-1 ring-white">
        <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2.5 text-xs font-black text-white">
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
          <div className="flex aspect-video items-center justify-center bg-slate-900 px-5 text-center text-xs font-bold text-white">
            Invalid YouTube link
          </div>
        )}
      </div>
    );
  }

  if (media.type === "video") {
    return (
      <div className="overflow-hidden rounded-2xl bg-black shadow-sm ring-1 ring-white">
        <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2.5 text-xs font-black text-white">
          <Play className="h-4 w-4" />
          {media.title}
        </div>

        <video className="aspect-video w-full bg-black" controls src={media.src} />
      </div>
    );
  }

  if (media.type === "vimeo") {
    const embedUrl = getVimeoEmbedUrl(media.src);
  
    return (
      <div className="aspect-video overflow-hidden rounded-2xl bg-slate-950 shadow-sm ring-1 ring-white">
        <iframe
          src={embedUrl}
          title={media.title}
          className="h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (media.type === "text") {
    return (
      <p className="mx-auto max-w-3xl rounded-2xl bg-white px-5 py-4 text-center text-sm font-semibold italic leading-7 text-slate-700 shadow-sm ring-1 ring-slate-100">
        {media.text}
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-3.5 py-2.5">
        <div className="flex items-center gap-2 text-xs font-black text-slate-900">
          <FileText className="h-4 w-4 text-blue-600" />
          {media.title}
        </div>

        <a
          href={media.src}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-blue-600 px-3 py-1.5 text-[11px] font-black text-white transition hover:bg-blue-700"
        >
          Open PDF
        </a>
      </div>

      <iframe
        src={`${media.src}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
        title={media.title}
        className="h-[520px] w-full bg-white"
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

function getVimeoEmbedUrl(url: string) {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);

  if (match?.[1]) {
    return `https://player.vimeo.com/video/${match[1]}`;
  }

  return url;
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
    <div className="flex gap-3">
      <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-slate-200">
        <img src={avatar} alt={name} className="h-full w-full object-cover" />
      </div>

      <div>
        <p className="text-sm font-black text-slate-950">
          {name}
          <span className="ml-2 text-[11px] font-semibold text-slate-400">
            · {date}
          </span>
        </p>

        <p className="mt-1 text-xs font-medium text-slate-600">{text}</p>
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
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-black text-slate-800">{value}</p>
    </div>
  );
}
