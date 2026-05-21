"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import Link from "next/link";
import {
  FileText,
  Grid2X2,
  ImageIcon,
  Mail,
  MapPin,
  Plus,
  Type,
  Upload,
  UserRound,
  Video,
} from "lucide-react";
import { motion } from "framer-motion";

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
import { JobSeekerNav, MediaHireFooter } from "../jobseeker-jobs/job-shared-ui";
import {
  getCurrentUserProfile,
  getResumeData,
  getSettings,
  type ResumeData,
} from "../shared/user-state";

type ProfileTab = "portfolio" | "reviews" | "add" | "resume";

type DraftBlock = ProjectMediaBlock & {
  file?: File;
};

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
    demoProfile.fullName;

  return {
    avatarUrl: profile.avatarPreview || demoProfile.avatarUrl,
    availableStatus: "Available for Freelance",
    bio: profile.bio || demoProfile.bio,
    email: profile.email || demoProfile.email,
    fullName,
    id: profile.email || "local-jobseeker-profile",
    location:
      profile.location ||
      [profile.city, profile.country].filter(Boolean).join(", ") ||
      demoProfile.location,
    profession: profile.jobTitle || profile.role || demoProfile.profession,
    skills: splitList(profile.skills).length
      ? splitList(profile.skills)
      : demoProfile.skills,
    software: demoProfile.software,
  };
}

const projectFallbackCover =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=90";

function projectCover(project: MediaHireProject) {
  return (
    project.coverUrl ||
    project.media.find((block) => block.type === "image" && block.url)?.url ||
    projectFallbackCover
  );
}

async function loadProfile() {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

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
    profile?.full_name ||
    [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") ||
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    demoProfile.fullName;

  return {
    avatarUrl:
      profile?.avatar_url ||
      user.user_metadata?.avatar_url ||
      localProfileSummary().avatarUrl,
    availableStatus: profile?.available_status || demoProfile.availableStatus,
    bio: profile?.bio || localProfileSummary().bio,
    email: profile?.email || user.email || localProfileSummary().email,
    fullName,
    id: user.id,
    location:
      profile?.location ||
      [profile?.city, profile?.country].filter(Boolean).join(", ") ||
      localProfileSummary().location,
    profession:
      profile?.profession || profile?.job_title || localProfileSummary().profession,
    skills: splitList(profile?.skills).length
      ? splitList(profile?.skills)
      : demoProfile.skills,
    software: splitList(profile?.software).length
      ? splitList(profile?.software)
      : demoProfile.software,
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
    { icon: UserRound, label: profile.profession },
    { icon: Mail, label: profile.email },
  ];

  return (
    <aside className="self-start rounded-[2rem] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] ring-1 ring-slate-100">
      <img
        alt={profile.fullName}
        className="h-32 w-32 rounded-3xl border-[6px] border-white object-cover shadow-[0_18px_48px_rgba(15,23,42,0.18)]"
        src={profile.avatarUrl}
      />
      <h1 className="mt-5 text-3xl font-black leading-tight text-slate-950">
        {profile.fullName}
      </h1>
      <p className="mt-2 text-sm font-bold text-slate-500">
        {profile.availableStatus}
      </p>

      <div className="mt-6 grid gap-3">
        {rows.map((row) => (
          <div className="flex items-center gap-3" key={row.label}>
            <row.icon className="text-[#0B63E5]" size={18} />
            <span className="text-sm font-semibold text-slate-600">
              {row.label}
            </span>
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-2xl font-black">Skills</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {profile.skills.map((skill) => (
          <span
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-600"
            key={skill}
          >
            {skill}
          </span>
        ))}
      </div>

      <h2 className="mt-8 text-2xl font-black">Software</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {profile.software.map((software) => (
          <span
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-600"
            key={software}
          >
            {software}
          </span>
        ))}
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
  if (!projects.length) {
    return (
      <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
        <h3 className="text-2xl font-black text-slate-950">
          No published projects yet
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm font-semibold leading-6 text-slate-500">
          Create your first project and publish it to show your portfolio on
          MediaHire.
        </p>
        <button
          className="mt-6 h-11 rounded-xl bg-[#0B63E5] px-8 text-sm font-black text-white transition hover:bg-[#0958cc]"
          onClick={onAddProject}
          type="button"
        >
          Go to Add Project
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {projects.map((project) => (
        <Link
          className="group block rounded-[1.7rem] bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.07)] ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1"
          href={`/home/jobseeker/work/${project.id}`}
          key={project.id}
        >
          <div className="aspect-[4/3] w-full overflow-hidden rounded-[1.35rem] bg-slate-100">
            <img
              alt={project.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              onError={(event) => {
                event.currentTarget.src = projectFallbackCover;
              }}
              src={projectCover(project)}
            />
          </div>

          <div className="mt-5">
            <h3 className="text-xl font-black leading-tight text-slate-950">
              {project.title}
            </h3>
            <p className="mt-2 text-base font-black text-slate-500">
              {project.authorName}
            </p>
          </div>
        </Link>
      ))}
    </div>
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

    const extension = block.file.name.split(".").pop() || "file";
    const path = `${profile.id}/${projectId}/${block.id}.${extension}`;
    const { error } = await supabase.storage
      .from("project-media")
      .upload(path, block.file, { upsert: true });

    if (error) {
      return block.url;
    }

    const { data } = supabase.storage.from("project-media").getPublicUrl(path);
    return data.publicUrl || block.url;
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

function ResumePanel({ resume }: { resume: ResumeData }) {
  const rows = [
    ["About me", resume.about],
    ["Professional Skill", resume.skills],
    ["Work Experience", resume.experience],
    ["Education", resume.education],
    ["Links", resume.links],
    ["Languages", resume.languages],
    ["Job Preferences", resume.jobPreferences],
    ["Preferred Job Benefits", resume.benefits],
  ];
  const hasResume =
    rows.some(([, value]) => Boolean(value)) || Boolean(resume.pdfName || resume.pdfUrl);

  if (!hasResume) {
    return (
      <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center">
        <h3 className="text-2xl font-black text-slate-950">
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
    <div className="grid gap-5">
      {rows.map(([label, value]) =>
        value ? (
          <section
            className="rounded-[1.5rem] bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] ring-1 ring-slate-100"
            key={label}
          >
            <h3 className="text-lg font-black text-slate-950">{label}</h3>
            <p className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">
              {value}
            </p>
          </section>
        ) : null,
      )}
      {resume.pdfName || resume.pdfUrl ? (
        <a
          className="rounded-[1.5rem] bg-white p-6 text-sm font-black text-[#0B63E5] shadow-[0_18px_48px_rgba(15,23,42,0.06)] ring-1 ring-slate-100"
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
  const [activeTab, setActiveTab] = useState<ProfileTab>("add");
  const [profile, setProfile] = useState<ProfileSummary>(demoProfile);
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

      if (!isMounted) {
        return;
      }

      setProfile(loadedProfile);
      setProjects(initialProjects);
      setActiveTab(
        initialProjects.some((project) => project.status === "published")
          ? "portfolio"
          : "add",
      );
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
    window.addEventListener("mediahire:settings-updated", handleSharedStateUpdate);
    window.addEventListener("mediahire:jobseeker-profile-updated", handleProfileUpdate);

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
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <section
        className="min-h-[320px] bg-cover bg-center pt-8"
        style={{
          backgroundImage:
            "linear-gradient(90deg,rgba(255,255,255,0.18),rgba(255,255,255,0.1)),url('https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=1800&q=90')",
        }}
      >
        <JobSeekerNav active="My Profile" />
      </section>

      <section className="mx-auto -mt-16 grid w-[min(1320px,calc(100%-32px))] grid-cols-1 items-start gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        <ProfileSidebar profile={profile} />

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="min-h-[760px] overflow-hidden rounded-[2rem] bg-white/70 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.06)] ring-1 ring-white/80 backdrop-blur md:p-7"
          initial={{ opacity: 0, y: 16 }}
        >
          <div className="flex gap-10 border-b border-slate-200">
            {[
              ["portfolio", "Portfolio"],
              ["reviews", "Reviews"],
              ["add", "Add Project"],
              ["resume", "Resume"],
            ].map(([tab, label]) => (
              <button
                className={`relative pb-4 text-base font-black transition ${
                  activeTab === tab ? "text-[#0B63E5]" : "text-slate-400"
                }`}
                key={tab}
                onClick={() => setActiveTab(tab as ProfileTab)}
                type="button"
              >
                {label}
                {activeTab === tab ? (
                  <span className="absolute bottom-[-1px] left-0 h-[3px] w-full rounded-full bg-[#0B63E5]" />
                ) : null}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {activeTab === "portfolio" ? (
              settings.profileVisibility && settings.publicPortfolio ? (
                <PortfolioGrid
                  onAddProject={() => setActiveTab("add")}
                  projects={publishedProjects}
                />
              ) : (
                <div className="rounded-[2rem] bg-amber-50 p-8 text-center text-sm font-black text-amber-700">
                  {settings.profileVisibility
                    ? "Public portfolio is turned off in Settings."
                    : "Profile visibility is turned off in Settings."}
                </div>
              )
            ) : null}

            {activeTab === "reviews" ? (
              <div className="rounded-[2rem] bg-white p-8 text-center text-sm font-black text-slate-500 shadow-sm">
                No reviews yet
              </div>
            ) : null}

            {activeTab === "add" ? (
              <AddProjectForm
                onProjectSaved={handleProjectSaved}
                profile={profile}
              />
            ) : null}

            {activeTab === "resume" ? <ResumePanel resume={resume} /> : null}
          </div>
        </motion.div>
      </section>

      <MediaHireFooter />
    </main>
  );
}
