"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import Link from "next/link";
import {
  BriefcaseBusiness,
  FileText,
  GraduationCap,
  Grid2X2,
  ImageIcon,
  Languages,
  Link as LinkIcon,
  Mail,
  MapPin,
  Plus,
  Type,
  Upload,
  UserRound,
  Video,
} from "lucide-react";

import { supabase } from "@/lib/supabase-client";
import {
  createProjectId,
  demoProfile,
  demoProjects,
  getStoredProjects,
  setStoredProjects,
  type MediaHireProject,
  type ProjectBlockType,
  type ProjectMediaBlock,
  type ProfileSummary,
} from "../projects-data";
import { JobSeekerNavbar } from "../jobseeker-navbar";
import {
  getCurrentUserProfile,
  getResumeData,
  getSettings,
  type ResumeData,
} from "../shared/user-state";
import { JobSeekerAvatar } from "../jobseeker-avatar-placeholder";

type ProfileTab = "portfolio" | "reviews" | "add" | "resume";

type DraftBlock = ProjectMediaBlock & {
  file?: File;
};

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(String(reader.result || ""));
};

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(file);
  });
}

function splitList(value?: string | string[] | null) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function localProfileSummary(): ProfileSummary {
  const profile = getCurrentUserProfile();
  const fullName =
    profile.fullName ||
    [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
    profile.email?.split("@")[0] ||
    "Job Seeker";
  const location =
    profile.location ||
    [profile.city, profile.country].filter(Boolean).join(", ") ||
    "Location not added";
  const skills = splitList(profile.skills);
  const software = splitList(profile.software);

  return {
    avatarUrl: profile.avatarPreview,
    availableStatus: "Available for Freelance",
    bio: profile.bio || "",
    email: profile.email || "Email not added",
    fullName,
    id: profile.email || "local-jobseeker-profile",
    location,
    profession: profile.jobTitle || profile.role || "Role not added",
    skills,
    software,
  };
}

const projectFallbackCover =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=90";

function isValidProjectImage(url?: string) {
  return Boolean(
    url &&
      !url.startsWith("blob:") &&
      !url.includes("undefined") &&
      !url.includes("null"),
  );
}

function projectCover(project: MediaHireProject) {
  const mediaCover = project.media.find(
    (block) =>
      (block.type === "image" || block.type === "photo_grid") &&
      isValidProjectImage(block.url),
  )?.url;

  if (isValidProjectImage(project.coverUrl)) {
    return project.coverUrl;
  }

  return mediaCover || projectFallbackCover;
}

async function loadProfile() {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  const localProfile = getCurrentUserProfile();
  const localFullName =
    localProfile.fullName ||
    [localProfile.firstName, localProfile.lastName].filter(Boolean).join(" ");
  const localLocation =
    localProfile.location ||
    [localProfile.city, localProfile.country].filter(Boolean).join(", ");
  const localSkills = splitList(localProfile.skills);
  const localSoftware = splitList(localProfile.software);

  if (!user) {
    return localProfileSummary();
  }

  let profileData = null;
  const byUserId = await supabase
    .from("profiles")
    .select(
      "id,full_name,first_name,last_name,email,avatar_url,location,city,country,profession,job_title,bio,skills,software,available_status",
    )
    .eq("user_id", user.id)
    .maybeSingle();

  if (byUserId.error) {
    const byId = await supabase
      .from("profiles")
      .select(
        "id,full_name,first_name,last_name,email,avatar_url,location,city,country,profession,job_title,bio,skills,software,available_status",
      )
      .eq("id", user.id)
      .maybeSingle();

    profileData = byId.data;
  } else {
    profileData = byUserId.data;
  }

  const profile = profileData as
    | {
        available_status?: string | null;
        avatar_url?: string | null;
        bio?: string | null;
        city?: string | null;
        country?: string | null;
        email?: string | null;
        first_name?: string | null;
        full_name?: string | null;
        id?: string | null;
        job_title?: string | null;
        last_name?: string | null;
        location?: string | null;
        profession?: string | null;
        skills?: string[] | string | null;
        software?: string[] | string | null;
      }
    | null;

  const fullName =
    localFullName ||
    profile?.full_name ||
    [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") ||
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    localProfileSummary().fullName;

  return {
    avatarUrl:
      localProfile.avatarPreview ||
      profile?.avatar_url ||
      user.user_metadata?.avatar_url ||
      localProfileSummary().avatarUrl,
    availableStatus: profile?.available_status || "Available for Freelance",
    bio: localProfile.bio || profile?.bio || localProfileSummary().bio,
    email: localProfile.email || profile?.email || user.email || localProfileSummary().email,
    fullName,
    id: user.id,
    location:
      localLocation ||
      profile?.location ||
      [profile?.city, profile?.country].filter(Boolean).join(", ") ||
      localProfileSummary().location,
    profession:
      localProfile.jobTitle ||
      localProfile.role ||
      profile?.profession ||
      profile?.job_title ||
      localProfileSummary().profession,
    skills: localSkills.length
      ? localSkills
      : splitList(profile?.skills).length
      ? splitList(profile?.skills)
      : [],
    software: localSoftware.length
      ? localSoftware
      : splitList(profile?.software).length
      ? splitList(profile?.software)
      : [],
  } satisfies ProfileSummary;
}

async function loadProjectsFromSupabase(profile: ProfileSummary) {
  const { data: rows, error } = await supabase
    .from("projects")
    .select(
      "id,title,description,status,cover_url,created_at,updated_at,published_at,author_id",
    )
    .eq("author_id", profile.id)
    .order("created_at", { ascending: false });

  if (error || !rows?.length) {
    return [] as MediaHireProject[];
  }

  const projectIds = rows.map((row) => row.id).filter(Boolean);
  const { data: mediaRows } = projectIds.length
    ? await supabase
        .from("project_media")
        .select(
          "id,project_id,type,url,text_content,file_name,order_index,created_at",
        )
        .in("project_id", projectIds)
        .order("order_index", { ascending: true })
    : { data: [] };

  return rows.map((row) => {
    const media = (mediaRows || [])
      .filter((mediaRow) => mediaRow.project_id === row.id)
      .map((mediaRow) => ({
        fileName: mediaRow.file_name || undefined,
        id: mediaRow.id,
        orderIndex: mediaRow.order_index ?? 0,
        textContent: mediaRow.text_content || undefined,
        type: mediaRow.type,
        url: mediaRow.url || undefined,
      })) as ProjectMediaBlock[];

    return {
      authorAvatar: profile.avatarUrl,
      authorId: profile.id,
      authorName: profile.fullName,
      coverUrl: row.cover_url || undefined,
      createdAt: row.created_at || new Date().toISOString(),
      description: row.description || "",
      id: row.id,
      media,
      publishedAt: row.published_at || undefined,
      status: row.status,
      title: row.title,
      updatedAt: row.updated_at || row.created_at || new Date().toISOString(),
    } satisfies MediaHireProject;
  });
}

function ProfileSidebar({ profile }: { profile: ProfileSummary }) {
  const rows = [
    { icon: MapPin, label: profile.location },
    { icon: BriefcaseBusiness, label: profile.profession },
    { icon: Mail, label: profile.email },
  ];

  return (
    <aside className="-mt-12 lg:-mt-16">
      <div className="sticky top-5 rounded-2xl bg-white p-4">
        <JobSeekerAvatar
          className="h-20 w-20 overflow-hidden rounded-xl shadow-lg"
          iconSize={30}
          size={80}
          src={profile.avatarUrl}
        />

        <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-950">
          {profile.fullName}
        </h1>

        <p className="mt-1 text-xs font-semibold text-slate-500">
          {profile.availableStatus}
        </p>

        <div className="mt-4 space-y-2.5 text-xs font-semibold text-slate-600">
          {rows.map((row) => (
            <div className="flex items-center gap-3" key={row.label}>
              <row.icon className="h-3.5 w-3.5 shrink-0 text-slate-600" />
              <span className="break-words">{row.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-black text-slate-950">Skills</h2>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {profile.skills.map((skill) => (
              <span
                className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600"
                key={skill}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-black text-slate-950">Software</h2>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {profile.software.map((software) => (
              <span
                className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600"
                key={software}
              >
                {software}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function PortfolioGrid({
  onAddProject,
  projects,
}: {
  onAddProject: () => void;
  projects: MediaHireProject[];
}) {
  return (
    <div className="grid gap-x-6 gap-y-7 rounded-2xl bg-white/85 p-3 shadow-[0_18px_55px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/70 backdrop-blur sm:p-4 md:grid-cols-2">
      <AddProjectCard onAddProject={onAddProject} />

      {projects.map((project) => (
        <Link
          className="group block min-h-[285px] w-full rounded-2xl bg-white p-2.5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(37,99,235,0.13)]"
          href={`/home/jobseeker/work/${project.id}`}
          key={project.id}
        >
          <div className="h-52 overflow-hidden rounded-xl bg-slate-100 shadow-sm">
            <img
              alt={project.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              onError={(event) => {
                event.currentTarget.src = projectFallbackCover;
              }}
              src={projectCover(project)}
            />
          </div>

          <h3 className="mt-3 text-base font-black text-slate-950 group-hover:text-blue-600">
            {project.title}
          </h3>

          <p className="mt-1 text-xs font-semibold text-slate-500">
            {project.authorName}
          </p>
        </Link>
      ))}
    </div>
  );
}

function AddProjectCard({ onAddProject }: { onAddProject: () => void }) {
  return (
    <button
      className="group block min-h-[285px] w-full rounded-2xl bg-white p-2.5 text-left shadow-[0_12px_30px_rgba(15,23,42,0.06)] ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(37,99,235,0.13)]"
      onClick={onAddProject}
      type="button"
    >
      <div className="flex h-52 items-center justify-center rounded-xl border border-dashed border-blue-300 bg-blue-50/60 shadow-sm transition group-hover:bg-blue-50">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm transition group-hover:scale-105">
          <Plus size={28} />
        </span>
      </div>

      <h3 className="mt-3 text-base font-black text-slate-950 group-hover:text-blue-600">
        Add project
      </h3>

      <p className="mt-1 text-xs font-semibold text-slate-500">
        Upload photos, video, PDF or project details
      </p>
    </button>
  );
}

function AddProjectForm({
  onProjectSaved,
  profile,
}: {
  onProjectSaved: (project: MediaHireProject) => void;
  profile: ProfileSummary;
}) {
  const [blocks, setBlocks] = useState<DraftBlock[]>([]);
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");

  function addTextBlock() {
    setBlocks((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        orderIndex: current.length,
        textContent: "",
        type: "text",
      },
    ]);
    setIsExpanded(true);
  }

  function addFileBlock(
    type: ProjectBlockType,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const files = Array.from(event.target.files || []);

    if (!files.length) {
      return;
    }

    setBlocks((current) => [
      ...current,
      ...files.map((file, index) => ({
        file,
        fileName: file.name,
        id: crypto.randomUUID(),
        orderIndex: current.length + index,
        type,
        url: URL.createObjectURL(file),
      })),
    ]);
    setIsExpanded(true);
    event.target.value = "";
  }

  function addDroppedFiles(files: File[]) {
    if (!files.length) {
      return;
    }

    setBlocks((current) => [
      ...current,
      ...files.map((file, index) => {
        const type: ProjectBlockType = file.type.startsWith("video/")
          ? "video"
          : file.type === "application/pdf"
            ? "pdf"
            : "image";

        return {
          file,
          fileName: file.name,
          id: crypto.randomUUID(),
          orderIndex: current.length + index,
          type,
          url: URL.createObjectURL(file),
        };
      }),
    ]);
    setIsExpanded(true);
  }

  function updateTextBlock(id: string, value: string) {
    setBlocks((current) =>
      current.map((block) =>
        block.id === id ? { ...block, textContent: value } : block,
      ),
    );
  }

  async function uploadBlockFile(projectId: string, block: DraftBlock) {
    if (!block.file) {
      return block.url;
    }

    const fallbackDataUrl = await fileToDataUrl(block.file);

    try {
      const extension = block.file.name.split(".").pop() || "file";
      const path = `${profile.id}/${projectId}/${block.id}.${extension}`;

      const { error } = await supabase.storage
        .from("project-media")
        .upload(path, block.file, { upsert: true });

      if (error) {
        return fallbackDataUrl;
      }

      const { data } = supabase.storage.from("project-media").getPublicUrl(path);
      return data.publicUrl || fallbackDataUrl;
    } catch {
      return fallbackDataUrl;
    }
  }

  async function persistProject(status: "draft" | "published") {
    const projectTitle = title.trim();

    if (!projectTitle) {
      return;
    }

    const now = new Date().toISOString();
    const id = createProjectId(projectTitle);
    const media = await Promise.all(
      blocks.map(async (block, index) => ({
        fileName: block.fileName,
        id: block.id,
        orderIndex: index,
        textContent: block.textContent,
        type: block.type,
        url: await uploadBlockFile(id, block),
      })),
    );

    const coverUrl =
      media.find((block) => block.type === "image" && block.url)?.url ||
      media.find((block) => block.type === "photo_grid" && block.url)?.url;

    const project: MediaHireProject = {
      authorAvatar: profile.avatarUrl,
      authorId: profile.id,
      authorName: profile.fullName,
      coverUrl,
      createdAt: now,
      description,
      id,
      media,
      publishedAt: status === "published" ? now : undefined,
      status,
      title: projectTitle,
      updatedAt: now,
    };

    const stored = getStoredProjects();
    setStoredProjects([project, ...stored]);

    try {
      await supabase.from("projects").insert({
        author_id: profile.id,
        cover_url: coverUrl,
        description,
        id,
        published_at: project.publishedAt,
        status,
        title: project.title,
      });

      if (media.length) {
        await supabase.from("project_media").insert(
          media.map((block) => ({
            file_name: block.fileName,
            id: block.id,
            order_index: block.orderIndex,
            project_id: id,
            text_content: block.textContent,
            type: block.type,
            url: block.url,
          })),
        );
      }
    } catch {
      // The local draft/published flow still works when the schema is not installed yet.
    }

    setTitle("");
    setDescription("");
    setBlocks([]);
    setIsExpanded(false);
    onProjectSaved(project);
  }

  if (!isExpanded) {
    return (
      <div className="max-w-md rounded-[1.8rem] border border-slate-200 bg-white p-5 text-center shadow-sm">
        <h3 className="text-xl font-black text-slate-950">Create project</h3>
        <p className="mt-2 text-sm font-semibold text-slate-400">
          Start building your creative portfolio
        </p>
        <button
          className="mt-6 grid h-32 w-full place-items-center rounded-2xl border border-dashed border-slate-300 text-[#0B63E5] transition hover:bg-[#eef4ff]"
          onClick={() => setIsExpanded(true)}
          type="button"
        >
          <Plus size={38} />
        </button>
        <button
          className="mt-4 h-11 w-full rounded-xl border border-[#0B63E5] text-sm font-black text-[#0B63E5] transition hover:bg-[#eef4ff]"
          onClick={() => setIsExpanded(true)}
          type="button"
        >
          Add
        </button>
      </div>
    );
  }

  const fileButtons = [
    { accept: "image/*", icon: ImageIcon, label: "Image", type: "image" },
    {
      accept: "image/*",
      icon: Grid2X2,
      label: "Photo grid",
      type: "photo_grid",
    },
    { accept: "video/*", icon: Video, label: "Video", type: "video" },
    { accept: "application/pdf", icon: FileText, label: "PDF", type: "pdf" },
  ] as const;

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="h-12 rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-[#0B63E5]"
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Project title"
          value={title}
        />
        <input
          className="h-12 rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-[#0B63E5]"
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Project description"
          value={description}
        />
      </div>

      <div className="mt-7 flex flex-wrap justify-center gap-4">
        {fileButtons.map((button) => (
          <label
            className="grid h-20 w-24 cursor-pointer place-items-center rounded-2xl bg-[#eef4ff] text-center text-xs font-black text-slate-700 transition hover:-translate-y-1 hover:text-[#0B63E5]"
            key={button.label}
          >
            <button.icon className="text-[#0B63E5]" size={22} />
            {button.label}
            <input
              accept={button.accept}
              className="sr-only"
              multiple
              onChange={(event) => addFileBlock(button.type, event)}
              type="file"
            />
          </label>
        ))}

        <button
          className="grid h-20 w-24 place-items-center rounded-2xl bg-[#eef4ff] text-xs font-black text-slate-700 transition hover:-translate-y-1 hover:text-[#0B63E5]"
          onClick={addTextBlock}
          type="button"
        >
          <Type className="text-[#0B63E5]" size={22} />
          Text
        </button>
      </div>

      <div
        className="mx-auto mt-8 grid min-h-[180px] max-w-xl place-items-center rounded-2xl border border-dashed border-slate-300 p-6 text-center transition hover:border-[#0B63E5] hover:bg-[#f8fbff]"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          addDroppedFiles(Array.from(event.dataTransfer.files || []));
        }}
      >
        <Upload className="text-[#0B63E5]" size={34} />
        <p className="mt-3 text-sm font-semibold text-slate-400">
          Drag & Drop or Choose file. Add images, video, text, photo grid, or
          PDF.
        </p>
      </div>

      {blocks.length ? (
        <div className="mt-8 grid gap-4">
          <h4 className="text-lg font-black text-slate-950">Preview</h4>

          {blocks.map((block) => (
            <div
              className="rounded-2xl border border-slate-200 p-4"
              key={block.id}
            >
              {block.type === "text" ? (
                <textarea
                  className="min-h-28 w-full resize-y rounded-xl border border-slate-200 p-4 text-sm font-semibold outline-none focus:border-[#0B63E5]"
                  onChange={(event) =>
                    updateTextBlock(block.id, event.target.value)
                  }
                  placeholder="Write text block..."
                  value={block.textContent}
                />
              ) : null}

              {(block.type === "image" || block.type === "photo_grid") &&
              block.url ? (
                <img
                  alt={block.fileName || "Project image"}
                  className="max-h-[420px] w-full rounded-xl object-cover"
                  src={block.url}
                />
              ) : null}

              {block.type === "video" && block.url ? (
                <video className="w-full rounded-xl" controls src={block.url} />
              ) : null}

              {block.type === "pdf" ? (
                <div className="flex items-center gap-3 text-sm font-black text-slate-600">
                  <FileText className="text-[#0B63E5]" />
                  {block.fileName || "PDF file"}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-8 flex justify-end gap-3">
        <button
          className="h-11 rounded-xl bg-[#0B63E5] px-8 text-sm font-black text-white transition hover:bg-[#0958cc]"
          onClick={() => void persistProject("draft")}
          type="button"
        >
          Save
        </button>
        <button
          className="h-11 rounded-xl bg-emerald-600 px-8 text-sm font-black text-white transition hover:bg-emerald-700"
          onClick={() => void persistProject("published")}
          type="button"
        >
          Publish
        </button>
      </div>
    </div>
  );
}

function unwrapElement(element: Element) {
  const parent = element.parentNode;

  if (!parent) {
    return;
  }

  while (element.firstChild) {
    parent.insertBefore(element.firstChild, element);
  }

  parent.removeChild(element);
}

function sanitizeRichText(html: string) {
  if (typeof window === "undefined" || !html) {
    return html;
  }

  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(`<div>${html}</div>`, "text/html");
  const root = parsedDocument.body.firstElementChild;
  const allowedTags = new Set(["B", "BR", "DIV", "EM", "I", "P", "STRONG"]);

  if (!root) {
    return "";
  }

  Array.from(root.querySelectorAll("*")).forEach((element) => {
    Array.from(element.attributes).forEach((attribute) =>
      element.removeAttribute(attribute.name),
    );

    if (!allowedTags.has(element.tagName)) {
      unwrapElement(element);
    }
  });

  return root.innerHTML.trim();
}

function RichTextContent({ html }: { html: string }) {
  return (
    <div
      className="rich-text-content whitespace-pre-wrap text-xs font-medium leading-5 text-slate-700"
      dangerouslySetInnerHTML={{ __html: sanitizeRichText(html) }}
    />
  );
}

function ResumeSection({
  children,
  icon: Icon,
  title,
}: {
  children: React.ReactNode;
  icon: typeof UserRound;
  title: string;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
      <div className="mb-4 flex items-center gap-2 text-slate-800">
        <Icon className="h-4 w-4 text-slate-500" />
        <h3 className="text-sm font-black">{title}</h3>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs font-medium leading-5 text-slate-700">
        {children}
      </div>
    </section>
  );
}

function ResumePanel({
  profile,
  resume,
}: {
  profile: ProfileSummary;
  resume: ResumeData;
}) {
  const hasResume =
    Boolean(resume.about) ||
    Boolean(resume.skills) ||
    Boolean(resume.experience) ||
    Boolean(resume.education) ||
    Boolean(resume.links) ||
    Boolean(resume.languages) ||
    Boolean(resume.jobPreferences) ||
    Boolean(resume.benefits) ||
    Boolean(resume.pdfName || resume.pdfUrl);

  if (!hasResume) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
        <h3 className="text-xl font-black text-slate-950">
          No resume information added yet
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm font-semibold leading-6 text-slate-500">
          Fill out My Resume from your account section and it will appear here.
        </p>
        <Link
          className="mt-6 inline-flex rounded-full bg-[#0B63E5] px-7 py-3 text-sm font-black text-white transition hover:bg-[#0958cc]"
          href="/account/jobseeker/resume"
        >
          Open My Resume
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-4">
      <section className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-slate-800">
          <UserRound className="h-4 w-4 text-slate-500" />
          <h3 className="text-sm font-black">Personal Information</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-[11px] font-bold text-slate-400">Full Name</p>
            <p className="mt-1 text-xs font-black text-slate-700">
              {profile.fullName || "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold text-slate-400">City</p>
            <p className="mt-1 text-xs font-black text-slate-700">
              {profile.location || "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold text-slate-400">Email</p>
            <p className="mt-1 break-words text-xs font-black text-slate-700">
              {profile.email || "Available after login"}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold text-slate-400">Profession</p>
            <p className="mt-1 text-xs font-black text-slate-700">
              {profile.profession || "Not specified"}
            </p>
          </div>
        </div>
      </section>

      {resume.about ? (
        <ResumeSection icon={UserRound} title="About me">
          <RichTextContent html={resume.about} />
        </ResumeSection>
      ) : null}

      {resume.skills ? (
        <ResumeSection icon={FileText} title="Professional Skill">
          <p className="whitespace-pre-line text-xs font-medium leading-5 text-slate-700">
            {resume.skills}
          </p>
        </ResumeSection>
      ) : null}

      {resume.experience ? (
        <ResumeSection icon={BriefcaseBusiness} title="Work Experience">
          <RichTextContent html={resume.experience} />
        </ResumeSection>
      ) : null}

      {resume.education ? (
        <ResumeSection icon={GraduationCap} title="Education">
          <RichTextContent html={resume.education} />
        </ResumeSection>
      ) : null}

      {resume.links ? (
        <ResumeSection icon={LinkIcon} title="Links">
          <RichTextContent html={resume.links} />
        </ResumeSection>
      ) : null}

      {resume.languages ? (
        <ResumeSection icon={Languages} title="Languages">
          <RichTextContent html={resume.languages} />
        </ResumeSection>
      ) : null}

      {resume.jobPreferences ? (
        <ResumeSection icon={BriefcaseBusiness} title="Job Preferences">
          <RichTextContent html={resume.jobPreferences} />
        </ResumeSection>
      ) : null}

      {resume.benefits ? (
        <ResumeSection icon={FileText} title="Preferred Job Benefits">
          <RichTextContent html={resume.benefits} />
        </ResumeSection>
      ) : null}

      {resume.pdfName || resume.pdfUrl ? (
        <a
          className="block rounded-xl border border-slate-200 bg-white p-3.5 text-xs font-black text-[#0B63E5] shadow-sm"
          href={resume.pdfUrl || "#"}
          rel="noreferrer"
          target="_blank"
        >
          PDF Resume: {resume.pdfName || "Open resume"}
        </a>
      ) : null}
    </div>
  );
}

export function MyProfileProjectsPage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("portfolio");
  const [profile, setProfile] = useState<ProfileSummary>(() =>
    localProfileSummary(),
  );
  const [projects, setProjects] = useState<MediaHireProject[]>([]);
  const [resume, setResume] = useState<ResumeData>(() => getResumeData());
  const [settings, setSettings] = useState(() => getSettings());

  const publishedProjects = useMemo(
    () => projects.filter((project) => project.status === "published"),
    [projects],
  );

  useEffect(() => {
    let isMounted = true;

    async function hydrate() {
      const loadedProfile = await loadProfile();

      const storedProjects = getStoredProjects().filter(
        (project) => project.authorId === loadedProfile.id,
      );

      const supabaseProjects = await loadProjectsFromSupabase(loadedProfile);

      const mergedProjects = [
        ...supabaseProjects,
        ...storedProjects.filter(
          (storedProject) =>
            !supabaseProjects.some(
              (supabaseProject) => supabaseProject.id === storedProject.id,
            ),
        ),
      ];

      const initialProjects =
        mergedProjects.length || loadedProfile.id !== demoProfile.id
          ? mergedProjects
          : demoProjects;
      const initialProjectsWithCurrentAuthor = initialProjects.map((project) => ({
        ...project,
        authorAvatar: loadedProfile.avatarUrl,
        authorName: loadedProfile.fullName,
      }));

      if (!isMounted) {
        return;
      }

      setProfile(loadedProfile);
      setProjects(initialProjectsWithCurrentAuthor);
      setActiveTab("portfolio");
    }

    void hydrate();

    function handleSharedStateUpdate() {
      setResume(getResumeData());
      setSettings(getSettings());
    }

    function handleProfileUpdate() {
      void hydrate();
    }

    window.addEventListener("mediahire:resume-updated", handleSharedStateUpdate);
    window.addEventListener(
      "mediahire:settings-updated",
      handleSharedStateUpdate,
    );
    window.addEventListener(
      "mediahire:jobseeker-profile-updated",
      handleProfileUpdate,
    );

    return () => {
      isMounted = false;

      window.removeEventListener(
        "mediahire:resume-updated",
        handleSharedStateUpdate,
      );
      window.removeEventListener(
        "mediahire:settings-updated",
        handleSharedStateUpdate,
      );
      window.removeEventListener(
        "mediahire:jobseeker-profile-updated",
        handleProfileUpdate,
      );
    };
  }, []);

  function handleProjectSaved(project: MediaHireProject) {
    setProjects((current) => [project, ...current]);
    setActiveTab(project.status === "published" ? "portfolio" : "add");
  }

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="relative overflow-hidden bg-[#eef4ff]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(11,99,229,0.16),transparent_32%),linear-gradient(180deg,#eef4ff_0%,#f8fbff_65%,#ffffff_100%)]" />
  
        <div className="relative z-10 pb-24 pt-4 sm:pt-5">
          <JobSeekerNavbar active="My Profile" />
        </div>
      </section>
  
      <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 pb-16 sm:px-6 lg:grid-cols-[230px_1fr] lg:px-5">
        <ProfileSidebar profile={profile} />

        <section className="pt-6 lg:pt-8">
          <div className="mb-6 flex items-center gap-5 border-b border-slate-200">
            {[
              ["portfolio", "Portfolio"],
              ["resume", "Resume"],
              ["reviews", "Reviews"],
            ].map(([tab, label]) => (
              <button
                className={`relative pb-3 text-sm font-black transition ${
                  activeTab === tab
                    ? "text-blue-600"
                    : "text-slate-400 hover:text-slate-700"
                }`}
                key={tab}
                onClick={() => setActiveTab(tab as ProfileTab)}
                type="button"
              >
                {label}

                {activeTab === tab ? (
                  <span className="absolute bottom-[-1px] left-0 h-0.5 w-full rounded-full bg-blue-600" />
                ) : null}
              </button>
            ))}
          </div>

          {activeTab === "portfolio" ? (
            settings.profileVisibility && settings.publicPortfolio ? (
              <PortfolioGrid
                onAddProject={() => setActiveTab("add")}
                projects={publishedProjects}
              />
            ) : (
              <div className="rounded-2xl bg-amber-50 p-8 text-center text-sm font-black text-amber-700">
                {settings.profileVisibility
                  ? "Public portfolio is turned off in Settings."
                  : "Profile visibility is turned off in Settings."}
              </div>
            )
          ) : null}

          {activeTab === "add" ? (
            <AddProjectForm
              onProjectSaved={handleProjectSaved}
              profile={profile}
            />
          ) : null}

          {activeTab === "resume" ? (
            <ResumePanel profile={profile} resume={resume} />
          ) : null}

          {activeTab === "reviews" ? (
            <div className="max-w-2xl space-y-4">
              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="text-base font-black text-slate-950">
                  No reviews yet
                </h3>

                <p className="mt-3 text-xs font-medium leading-6 text-slate-600">
                  Reviews will appear here after completed collaborations.
                </p>
              </article>
            </div>
          ) : null}
        </section>
      </section>
    </main>
  );
}
