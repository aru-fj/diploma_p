"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronDown,
  FileText,
  ImageIcon,
  Paperclip,
  Search,
  Send,
  Star,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  defaultEmployerProfile,
  deletePostedJob,
  employerCandidates,
  employerProjects,
  getApplications,
  getApplicationsForJob,
  getChats,
  getEmployerProfile,
  getEmployerSettings,
  getHiredSpecialists,
  getOrCreateChat,
  getPostedJobs,
  getProjectComments,
  getReviews,
  getSavedCandidates,
  getSavedProjects,
  saveEmployerProfile,
  saveEmployerSettings,
  saveMessage,
  savePostedJob,
  saveProjectComment,
  saveReview,
  slugify,
  toggleSavedCandidate,
  toggleSavedProject,
  updateApplicationStatus,
  updateJobStatus,
  type ApplicationStatus,
  type EmployerCandidate,
  type EmployerProfile,
  type EmployerSettings,
  type PostedJob,
} from "./employer-store";
import {
  CandidateCard,
  EmployerDashboardShell,
  EmployerShell,
  ProjectCard,
  StarRating,
} from "./employer-ui";

type Tab = "projects" | "people";
type ProfileTab = "portfolio" | "resume" | "reviews";
type FavoriteTab = "candidates" | "projects";

const categories = ["All", "Graphic Design", "Screenwriter", "Marketer", "3D Artist", "Videographer", "Photographer", "Following"];

function cardMotion(index = 0) {
  return {
    animate: { opacity: 1, y: 0 },
    initial: { opacity: 0, y: 18 },
    transition: { delay: index * 0.035, duration: 0.35 },
  };
}

function useEmployerRefresh() {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const sync = () => setVersion((current) => current + 1);
    window.addEventListener("mediahire:employer-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("mediahire:employer-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return version;
}

function openChat(router: ReturnType<typeof useRouter>, candidateId: string) {
  getOrCreateChat(candidateId);
  router.push(`/home/employer/community?chat=${candidateId}`);
}

function filterCandidates(query: string, city: string, category: string, saved: string[]) {
  return employerCandidates.filter((candidate) => {
    const search = `${candidate.name} ${candidate.role} ${candidate.category} ${candidate.city} ${candidate.skills.join(" ")}`.toLowerCase();
    const matchesQuery = !query || search.includes(query.toLowerCase());
    const matchesCity = !city || candidate.city.toLowerCase().includes(city.toLowerCase());
    const matchesCategory = category === "All" || candidate.category === category || candidate.role.includes(category);
    const matchesFollowing = category !== "Following" || saved.includes(candidate.id);
    return matchesQuery && matchesCity && matchesCategory && matchesFollowing;
  });
}

function filterProjects(query: string, category: string, saved: string[]) {
  return employerProjects.filter((project) => {
    const search = `${project.title} ${project.authorName} ${project.category}`.toLowerCase();
    const matchesQuery = !query || search.includes(query.toLowerCase());
    const matchesCategory = category === "All" || project.category === category;
    const matchesFollowing = category !== "Following" || saved.includes(project.id);
    return matchesQuery && matchesCategory && matchesFollowing;
  });
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm font-bold text-slate-500">
      {text}
    </div>
  );
}

function ButtonRow({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>;
}

function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex h-11 items-center justify-center rounded-xl bg-[#0B63E5] px-5 text-sm font-black text-white transition hover:bg-[#0958cc] disabled:cursor-not-allowed disabled:bg-slate-300 ${props.className || ""}`}
    />
  );
}

function OutlineButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex h-11 items-center justify-center rounded-xl border border-[#0B63E5] px-5 text-sm font-black text-[#0B63E5] transition hover:bg-[#eef4ff] ${props.className || ""}`}
    />
  );
}

export function EmployerHomePage() {
  const router = useRouter();
  const version = useEmployerRefresh();
  const [tab, setTab] = useState<Tab>("projects");
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("All");
  const savedProjects = useMemo(() => getSavedProjects(), [version]);
  const savedCandidates = useMemo(() => getSavedCandidates(), [version]);
  const projects = filterProjects(query, category, savedProjects);
  const candidates = filterCandidates(query, city, category, savedCandidates);

  return (
    <EmployerShell active="Home">
      <section className="mx-auto mt-10 w-[min(1320px,calc(100%-32px))]">
        <div className="rounded-[32px] bg-white p-6 shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
            <label className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm font-bold outline-none focus:border-[#0B63E5]" onChange={(event) => setQuery(event.target.value)} placeholder="Profession or position" value={query} />
            </label>
            <input className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none focus:border-[#0B63E5]" onChange={(event) => setCity(event.target.value)} placeholder="City" value={city} />
            <button className="h-14 rounded-2xl bg-[#0B63E5] px-6 text-sm font-black text-white transition hover:bg-[#0958cc]" type="button">
              Consideration of the candidate
            </button>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {categories.map((item) => (
              <button className={`rounded-2xl px-5 py-3 text-sm font-black transition ${category === item ? "bg-[#0B63E5] text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-[#eef4ff]"}`} key={item} onClick={() => setCategory(item)} type="button">
                {item}
              </button>
            ))}
          </div>
          <div className="mt-5 inline-flex rounded-2xl bg-slate-100 p-1">
            {(["projects", "people"] as const).map((item) => (
              <button className={`h-11 rounded-xl px-8 text-sm font-black capitalize ${tab === item ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`} key={item} onClick={() => setTab(item)} type="button">
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto mt-10 w-[min(1320px,calc(100%-32px))]">
        <h1 className="text-center text-3xl font-black">{tab === "projects" ? "Creative projects" : "Creative specialists"}</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tab === "projects"
            ? projects.map((project, index) => (
                <motion.div key={project.id} {...cardMotion(index)}>
                  <ProjectCard onSave={() => toggleSavedProject(project.id)} project={project} saved={savedProjects.includes(project.id)} />
                </motion.div>
              ))
            : candidates.map((candidate, index) => (
                <motion.div key={candidate.id} {...cardMotion(index)}>
                  <CandidateCard candidate={candidate} onMessage={() => openChat(router, candidate.id)} onSave={() => toggleSavedCandidate(candidate.id)} saved={savedCandidates.includes(candidate.id)} />
                </motion.div>
              ))}
        </div>
        {(tab === "projects" && projects.length === 0) || (tab === "people" && candidates.length === 0) ? (
          <div className="mt-8"><EmptyState text="Nothing matches these filters yet." /></div>
        ) : null}
      </section>
    </EmployerShell>
  );
}

export function EmployerProjectDetailPage({ slug }: { slug: string }) {
  const router = useRouter();
  const version = useEmployerRefresh();
  const [comment, setComment] = useState("");
  const project = employerProjects.find((item) => item.id === slug);
  const savedProjects = useMemo(() => getSavedProjects(), [version]);
  const comments = useMemo(() => (project ? getProjectComments(project.id) : []), [project, version]);

  if (!project) {
    return (
      <EmployerShell active="Home">
        <div className="mx-auto mt-14 w-[min(760px,calc(100%-32px))] rounded-3xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-black">Project not found</h1>
          <Link className="mt-6 inline-flex h-12 items-center rounded-2xl bg-[#0B63E5] px-6 text-sm font-black text-white" href="/home/employer">Back Home</Link>
        </div>
      </EmployerShell>
    );
  }

  function postComment() {
    if (!project) return;
    if (!comment.trim()) return;
    saveProjectComment(project.id, comment.trim());
    setComment("");
  }

  return (
    <EmployerShell active="Home">
      <section className="mx-auto mt-10 w-[min(980px,calc(100%-32px))]">
        <button className="mb-5 inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-[#0B63E5]" onClick={() => router.back()} type="button">
          <ArrowLeft size={18} />
          Back
        </button>
        <article className="rounded-[32px] bg-white p-6 shadow-sm md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <Link className="flex items-center gap-4" href={`/home/employer/people/${project.authorId}`}>
              <Image alt={project.authorName} className="h-16 w-16 rounded-2xl object-cover" height={64} src={project.authorAvatar} width={64} />
              <div>
                <p className="text-sm font-black text-[#0B63E5]">{project.category}</p>
                <h1 className="text-3xl font-black">{project.title}</h1>
                <p className="text-sm font-bold text-slate-500">{project.authorName}</p>
              </div>
            </Link>
            <OutlineButton onClick={() => toggleSavedProject(project.id)}>{savedProjects.includes(project.id) ? "Saved" : "Save"}</OutlineButton>
          </div>
          <p className="mt-8 max-w-3xl text-base font-semibold leading-8 text-slate-600">{project.description}</p>
          <div className="mt-8 grid gap-6">
            {(project.media || [{ type: "image", url: project.image }]).map((media, index) => {
              if (media.type === "video" && media.url) {
                return <iframe className="aspect-video w-full rounded-3xl border border-slate-200" key={`${media.type}-${index}`} src={media.url} title={project.title} />;
              }
              if (media.type === "pdf") {
                return <a className="flex items-center gap-3 rounded-2xl border border-slate-200 p-5 font-black text-[#0B63E5]" href={media.url || "#"} key={`${media.type}-${index}`}><FileText />{media.fileName || "Project PDF"}</a>;
              }
              if (media.type === "text") {
                return <p className="rounded-2xl bg-slate-50 p-5 text-sm font-semibold leading-7 text-slate-600" key={`${media.type}-${index}`}>{media.text}</p>;
              }
              return <Image alt={project.title} className="w-full rounded-3xl object-cover" height={680} key={`${media.type}-${index}`} src={media.url || project.image} width={980} />;
            })}
          </div>
        </article>
        <section className="mt-8 rounded-[32px] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Comments</h2>
          <div className="mt-5 flex gap-3">
            <textarea className="min-h-24 flex-1 resize-none rounded-2xl border border-slate-200 p-4 text-sm font-semibold outline-none focus:border-[#0B63E5]" onChange={(event) => setComment(event.target.value)} placeholder="Write a comment as employer..." value={comment} />
            <PrimaryButton className="self-end" onClick={postComment}>Post</PrimaryButton>
          </div>
          <div className="mt-6 grid gap-4">
            {comments.length ? comments.map((item) => (
              <div className="rounded-2xl bg-slate-50 p-4" key={item.id}>
                <p className="text-sm font-black">Employer</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">{item.text}</p>
              </div>
            )) : <p className="text-sm font-semibold text-slate-400">No comments yet.</p>}
          </div>
        </section>
      </section>
    </EmployerShell>
  );
}

export function EmployerPeopleProfilePage({ slug }: { slug: string }) {
  const router = useRouter();
  const version = useEmployerRefresh();
  const [tab, setTab] = useState<ProfileTab>("portfolio");
  const candidate = employerCandidates.find((item) => item.id === slug);
  const saved = useMemo(() => getSavedCandidates(), [version]);
  const extraReviews = useMemo(() => getReviews()[slug] || [], [slug, version]);

  if (!candidate) {
    return (
      <EmployerShell active="Search CV">
        <div className="mx-auto mt-14 w-[min(760px,calc(100%-32px))] rounded-3xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-black">Specialist not found</h1>
          <Link className="mt-6 inline-flex h-12 items-center rounded-2xl bg-[#0B63E5] px-6 text-sm font-black text-white" href="/home/employer/search-cv">Back to Search CV</Link>
        </div>
      </EmployerShell>
    );
  }

  const reviews = [...candidate.reviews, ...extraReviews];

  return (
    <EmployerShell active="Search CV">
      <section className="mt-[-96px]">
        <div className="h-64 bg-[linear-gradient(120deg,#80d8e8,#2563eb,#1f1b5f)] pt-32" />
      </section>
      <section className="mx-auto -mt-20 grid w-[min(1320px,calc(100%-32px))] gap-8 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-[32px] bg-white p-6 shadow-xl">
          <Image alt={candidate.name} className="h-32 w-32 rounded-3xl object-cover ring-4 ring-white" height={128} src={candidate.avatar} width={128} />
          <h1 className="mt-5 text-3xl font-black">{candidate.name}</h1>
          <p className="mt-1 text-sm font-bold text-slate-500">{candidate.role}</p>
          <div className="mt-4"><StarRating value={candidate.rating} /></div>
          <div className="mt-6 grid gap-3 text-sm font-bold text-slate-600">
            <span>{candidate.location}</span>
            <span>{candidate.experience}</span>
            <span>{candidate.email}</span>
          </div>
          <div className="mt-6 grid gap-2">
            <PrimaryButton onClick={() => toggleSavedCandidate(candidate.id)}>{saved.includes(candidate.id) ? "Saved" : "Save"}</PrimaryButton>
            <OutlineButton onClick={() => openChat(router, candidate.id)}>Message</OutlineButton>
          </div>
          <ProfileChips title="Skills" values={candidate.skills} />
          <ProfileChips title="Software" values={candidate.software} />
        </aside>
        <div className="rounded-[32px] bg-white p-6 shadow-sm">
          <div className="flex border-b border-slate-200">
            {(["portfolio", "resume", "reviews"] as const).map((item) => (
              <button className={`px-6 pb-4 text-sm font-black capitalize ${tab === item ? "border-b-2 border-[#0B63E5] text-[#0B63E5]" : "text-slate-400"}`} key={item} onClick={() => setTab(item)} type="button">
                {item}
              </button>
            ))}
          </div>
          {tab === "portfolio" ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {candidate.portfolio.map((project, index) => (
                <motion.div key={project.id} {...cardMotion(index)}>
                  <ProjectCard onSave={() => toggleSavedProject(project.id)} project={project} saved={getSavedProjects().includes(project.id)} />
                </motion.div>
              ))}
            </div>
          ) : null}
          {tab === "resume" ? <ResumeBlock candidate={candidate} /> : null}
          {tab === "reviews" ? <ReviewsBlock reviews={reviews} /> : null}
        </div>
      </section>
    </EmployerShell>
  );
}

function ProfileChips({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-black">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {values.map((value) => <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-500" key={value}>{value}</span>)}
      </div>
    </div>
  );
}

function ResumeBlock({ candidate }: { candidate: EmployerCandidate }) {
  const rows = [
    ["About", candidate.resume.about],
    ["Professional Skills", candidate.resume.skills],
    ["Work Experience", candidate.resume.experience],
    ["Education", candidate.resume.education],
    ["Languages", candidate.resume.languages],
    ["Links", candidate.resume.links],
    ["Job Preferences", candidate.resume.jobPreferences],
  ];
  return <div className="mt-8 grid gap-4">{rows.map(([label, value]) => <div className="rounded-2xl border border-slate-200 p-5" key={label}><h3 className="font-black">{label}</h3><p className="mt-2 text-sm font-semibold leading-7 text-slate-500">{value}</p></div>)}</div>;
}

function ReviewsBlock({ reviews }: { reviews: Array<{ company: string; id: string; rating: number; text: string }> }) {
  if (!reviews.length) return <div className="mt-8"><EmptyState text="No reviews yet." /></div>;
  return (
    <div className="mt-8 grid gap-4">
      {reviews.map((review) => (
        <div className="rounded-2xl border border-slate-200 p-5" key={review.id}>
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-black">{review.company}</h3>
            <StarRating value={review.rating} />
          </div>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-500">{review.text}</p>
        </div>
      ))}
    </div>
  );
}

export function EmployerPostedJobsPage() {
  const version = useEmployerRefresh();
  const jobs = useMemo(() => getPostedJobs(), [version]);
  const applications = useMemo(() => getApplications(), [version]);
  const chats = useMemo(() => getChats(), [version]);

  return (
    <EmployerShell active="Posted Jobs">
      <section className="mx-auto mt-10 w-[min(1320px,calc(100%-32px))]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black">Activity / Posted Jobs</h1>
            <p className="mt-2 text-sm font-semibold text-slate-500">Track posted jobs, applicants, interviews, and messages.</p>
          </div>
          <Link className="inline-flex h-12 items-center rounded-2xl bg-[#0B63E5] px-6 text-sm font-black text-white" href="/home/employer/post-job">Post a Job</Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            ["Candidates to review", applications.filter((item) => item.status === "Applied").length],
            ["Messages received", chats.reduce((sum, chat) => sum + chat.unread, 0)],
            ["Interviews", applications.filter((item) => item.status === "Interview").length],
          ].map(([label, value]) => <div className="rounded-3xl bg-white p-6 shadow-sm" key={label}><p className="text-sm font-bold text-slate-500">{label}</p><p className="mt-3 text-4xl font-black">{value}</p></div>)}
        </div>
        <div className="mt-8 rounded-[32px] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black">Recently Posted Jobs</h2>
          <div className="mt-5 grid gap-4">
            {jobs.map((job) => (
              <div className="grid gap-4 rounded-2xl border border-slate-200 p-5 lg:grid-cols-[1fr_140px_120px_140px_160px] lg:items-center" key={job.id}>
                <div>
                  <h3 className="text-lg font-black">{job.title}</h3>
                  <p className="text-sm font-semibold text-slate-500">{job.employmentType.join(" • ")} • {job.city}</p>
                </div>
                <span className="text-sm font-black">{job.salary}</span>
                <span className={`rounded-full px-3 py-1 text-center text-xs font-black ${job.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{job.status}</span>
                <span className="text-sm font-black">{getApplicationsForJob(job.id).length} applications</span>
                <div className="flex gap-2">
                  <Link className="rounded-xl border border-[#0B63E5] px-3 py-2 text-xs font-black text-[#0B63E5]" href={`/home/employer/posted-jobs/${job.id}/applications`}>Applications</Link>
                  <button className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-black" onClick={() => updateJobStatus(job.id, job.status === "Active" ? "Closed" : "Active")} type="button">{job.status === "Active" ? "Close" : "Open"}</button>
                  <button className="rounded-xl border border-red-100 px-3 py-2 text-xs font-black text-red-600" onClick={() => deletePostedJob(job.id)} type="button"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </EmployerShell>
  );
}

export function EmployerApplicationsPage({ jobId }: { jobId: string }) {
  const router = useRouter();
  const version = useEmployerRefresh();
  const job = useMemo(() => getPostedJobs().find((item) => item.id === jobId), [jobId, version]);
  const applications = useMemo(() => getApplicationsForJob(jobId), [jobId, version]);

  if (!job) {
    return <EmployerShell active="Posted Jobs"><div className="mx-auto mt-12 w-[min(760px,calc(100%-32px))] rounded-3xl bg-white p-10 text-center"><h1 className="text-3xl font-black">Job not found</h1></div></EmployerShell>;
  }

  return (
    <EmployerShell active="Posted Jobs">
      <section className="mx-auto mt-10 w-[min(1120px,calc(100%-32px))]">
        <Link className="inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-[#0B63E5]" href="/home/employer/posted-jobs"><ArrowLeft size={18} />Back to Posted Jobs</Link>
        <h1 className="mt-5 text-4xl font-black">{job.title} Applications</h1>
        <div className="mt-8 grid gap-5">
          {applications.map((application) => {
            const candidate = employerCandidates.find((item) => item.id === application.candidateId);
            if (!candidate) return null;
            return <ApplicantCard applicationStatus={application.status} candidate={candidate} jobId={job.id} key={candidate.id} onMessage={() => openChat(router, candidate.id)} />;
          })}
        </div>
        {!applications.length ? <div className="mt-8"><EmptyState text="No candidates applied to this job yet." /></div> : null}
      </section>
    </EmployerShell>
  );
}

function ApplicantCard({ applicationStatus, candidate, jobId, onMessage }: { applicationStatus: ApplicationStatus; candidate: EmployerCandidate; jobId: string; onMessage: () => void }) {
  return (
    <article className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
        <Link href={`/home/employer/people/${candidate.id}`}><Image alt={candidate.name} className="h-24 w-24 rounded-3xl object-cover" height={96} src={candidate.avatar} width={96} /></Link>
        <div>
          <Link className="text-2xl font-black hover:text-[#0B63E5]" href={`/home/employer/people/${candidate.id}`}>{candidate.name}</Link>
          <p className="text-sm font-bold text-slate-500">{candidate.role}</p>
          <div className="mt-2"><StarRating value={candidate.rating} /></div>
          <div className="mt-3 flex flex-wrap gap-2">{candidate.skills.slice(0, 4).map((skill) => <span className="rounded-full bg-[#eef4ff] px-3 py-1 text-xs font-black text-[#0B63E5]" key={skill}>{skill}</span>)}</div>
        </div>
        <div className="grid gap-2">
          <span className="rounded-full bg-amber-50 px-4 py-2 text-center text-xs font-black text-amber-700">{applicationStatus}</span>
          <ButtonRow>
            <PrimaryButton onClick={() => updateApplicationStatus(jobId, candidate.id, "Interview")}>Interview</PrimaryButton>
            <OutlineButton onClick={() => updateApplicationStatus(jobId, candidate.id, "Accepted")}>Accept</OutlineButton>
            <OutlineButton className="border-red-200 text-red-600 hover:bg-red-50" onClick={() => updateApplicationStatus(jobId, candidate.id, "Rejected")}>Reject</OutlineButton>
            <OutlineButton onClick={onMessage}>Message</OutlineButton>
          </ButtonRow>
        </div>
      </div>
    </article>
  );
}

export function EmployerPostJobPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    ageMax: "",
    ageMin: "",
    benefits: [] as string[],
    category: "",
    city: "",
    country: "",
    description: "",
    education: "",
    employmentType: [] as string[],
    experience: "",
    fieldOfStudy: "",
    gender: "Other",
    languages: "",
    level: "",
    salary: "",
    showSalary: true,
    skills: "",
    software: "",
    title: "",
    travel: "No Travel",
    workingHours: [] as string[],
  });
  const [error, setError] = useState("");

  function setValue<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toggleList(key: "benefits" | "employmentType" | "workingHours", value: string) {
    setForm((current) => ({ ...current, [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value] }));
  }

  function save() {
    if (!form.title || !form.category || !form.level || !form.salary || !form.country || !form.city || !form.description) {
      setError("Please fill required fields before saving.");
      return;
    }

    const job: PostedJob = {
      applications: 0,
      benefits: form.benefits,
      category: form.category,
      city: form.city,
      createdAt: new Date().toISOString(),
      description: form.description,
      employmentType: form.employmentType.length ? form.employmentType : ["Full-time"],
      experience: form.experience || "No experience",
      id: slugify(form.title),
      level: form.level,
      salary: form.showSalary ? form.salary : "Hidden",
      skills: [...form.skills.split(",").map((item) => item.trim()).filter(Boolean), ...form.software.split(",").map((item) => item.trim()).filter(Boolean)],
      status: "Active",
      title: form.title,
    };
    savePostedJob(job);
    router.push("/home/employer/posted-jobs");
  }

  return (
    <EmployerShell active="Posted Jobs">
      <section className="mx-auto mt-10 w-[min(980px,calc(100%-32px))] rounded-[32px] bg-white p-6 shadow-sm md:p-10">
        <h1 className="text-4xl font-black">Post a Job</h1>
        <p className="mt-2 text-sm font-semibold text-slate-500">Create a job post and start reviewing creative candidates.</p>
        {error ? <p className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-black text-red-600">{error}</p> : null}
        <div className="mt-8 grid gap-8">
          <FormSection title="Job Introduction">
            <Input label="Job title*" onChange={(value) => setValue("title", value)} value={form.title} />
            <Input label="Job category*" onChange={(value) => setValue("category", value)} value={form.category} />
            <Input label="Organizational level*" onChange={(value) => setValue("level", value)} value={form.level} />
          </FormSection>
          <FormSection title="Salary & benefits">
            <Input label="Minimum Salary Amount*" onChange={(value) => setValue("salary", value)} value={form.salary} />
            <Checkbox checked={form.showSalary} label="Displaying salary in the job post" onChange={(checked) => setValue("showSalary", checked)} />
            <CheckGroup items={["Promotion Opportunity", "Transportation Service", "Flexible Working Hour", "Insurance"]} selected={form.benefits} toggle={(value) => toggleList("benefits", value)} />
          </FormSection>
          <FormSection title="Work experience">
            <RadioGroup items={["No experience", "Less than 1 year", "1-3 year", "+3 year"]} onChange={(value) => setValue("experience", value)} selected={form.experience} />
          </FormSection>
          <FormSection title="Employment Type">
            <CheckGroup items={["Full-time", "Part-time", "Remote", "Internship"]} selected={form.employmentType} toggle={(value) => toggleList("employmentType", value)} />
          </FormSection>
          <FormSection title="Work Location">
            <Input label="Country*" onChange={(value) => setValue("country", value)} value={form.country} />
            <Input label="City*" onChange={(value) => setValue("city", value)} value={form.city} />
          </FormSection>
          <FormSection title="Completion Requirements">
            <Input label="Minimum Age" onChange={(value) => setValue("ageMin", value)} value={form.ageMin} />
            <Input label="Maximum Age" onChange={(value) => setValue("ageMax", value)} value={form.ageMax} />
            <RadioGroup items={["Female", "Male", "Other"]} onChange={(value) => setValue("gender", value)} selected={form.gender} />
            <Input label="Field of Study" onChange={(value) => setValue("fieldOfStudy", value)} value={form.fieldOfStudy} />
            <Input label="Educational Level" onChange={(value) => setValue("education", value)} value={form.education} />
          </FormSection>
          <FormSection title="Skills">
            <Input label="Languages + add" onChange={(value) => setValue("languages", value)} value={form.languages} />
            <Input label="Software + add" onChange={(value) => setValue("software", value)} value={form.software} />
            <Input label="Field input" onChange={(value) => setValue("skills", value)} value={form.skills} />
          </FormSection>
          <FormSection title="Job Description">
            <CheckGroup items={["4 Hours / Day", "6 Hours / Day", "8 Hours / Day", "10 Hours / Day", "Flexible Working Hours"]} selected={form.workingHours} toggle={(value) => toggleList("workingHours", value)} />
            <RadioGroup items={["No Travel", "Occasional Travel", "Frequent Travel", "Travel Required"]} onChange={(value) => setValue("travel", value)} selected={form.travel} />
            <label className="block">
              <span className="text-sm font-black">Job Description & Required Skills*</span>
              <textarea className="mt-2 min-h-36 w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm font-semibold outline-none focus:border-[#0B63E5]" maxLength={720} onChange={(event) => setValue("description", event.target.value)} value={form.description} />
              <span className="mt-1 block text-right text-xs font-bold text-slate-400">{form.description.length}/720</span>
            </label>
          </FormSection>
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <OutlineButton onClick={() => router.push("/home/employer/posted-jobs")}>Cancel</OutlineButton>
          <PrimaryButton onClick={save}>Save</PrimaryButton>
        </div>
      </section>
    </EmployerShell>
  );
}

function FormSection({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="rounded-3xl border border-slate-200 p-5">
      <h2 className="text-xl font-black">{title}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Input({ label, onChange, value }: { label: string; onChange: (value: string) => void; value: string }) {
  return (
    <label className="block">
      <span className="text-sm font-black">{label}</span>
      <input className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-[#0B63E5]" onChange={(event) => onChange(event.target.value)} value={value} />
    </label>
  );
}

function Checkbox({ checked, label, onChange }: { checked: boolean; label: string; onChange: (checked: boolean) => void }) {
  return <label className="flex items-center gap-2 text-sm font-bold text-slate-600"><input checked={checked} onChange={(event) => onChange(event.target.checked)} type="checkbox" />{label}</label>;
}

function CheckGroup({ items, selected, toggle }: { items: string[]; selected: string[]; toggle: (value: string) => void }) {
  return <div className="flex flex-wrap gap-2">{items.map((item) => <button className={`rounded-full px-3 py-2 text-xs font-black ${selected.includes(item) ? "bg-[#0B63E5] text-white" : "bg-slate-100 text-slate-500"}`} key={item} onClick={() => toggle(item)} type="button">{item}</button>)}</div>;
}

function RadioGroup({ items, onChange, selected }: { items: string[]; onChange: (value: string) => void; selected: string }) {
  return <div className="flex flex-wrap gap-2">{items.map((item) => <button className={`rounded-full px-3 py-2 text-xs font-black ${selected === item ? "bg-[#0B63E5] text-white" : "bg-slate-100 text-slate-500"}`} key={item} onClick={() => onChange(item)} type="button">{item}</button>)}</div>;
}

export function EmployerSearchCvPage() {
  const router = useRouter();
  const version = useEmployerRefresh();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("All");
  const saved = useMemo(() => getSavedCandidates(), [version]);
  const candidates = filterCandidates(query, city, category, saved);

  return (
    <EmployerShell active="Search CV">
      <section className="mx-auto mt-10 w-[min(1320px,calc(100%-32px))] rounded-[32px] bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-black">Want to hire a creative professional?</h1>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
          <input className="h-14 rounded-2xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-[#0B63E5]" onChange={(event) => setQuery(event.target.value)} placeholder="Profession and position" value={query} />
          <input className="h-14 rounded-2xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-[#0B63E5]" onChange={(event) => setCity(event.target.value)} placeholder="City" value={city} />
          <PrimaryButton>Consideration of the candidate</PrimaryButton>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">{categories.map((item) => <button className={`rounded-2xl px-5 py-3 text-sm font-black ${category === item ? "bg-[#0B63E5] text-white" : "bg-slate-50 text-slate-500 ring-1 ring-slate-200"}`} key={item} onClick={() => setCategory(item)} type="button">{item}</button>)}</div>
      </section>
      <section className="mx-auto mt-8 grid w-[min(1320px,calc(100%-32px))] gap-6 md:grid-cols-2 xl:grid-cols-3">
        {candidates.map((candidate, index) => <motion.div key={candidate.id} {...cardMotion(index)}><CandidateCard candidate={candidate} onMessage={() => openChat(router, candidate.id)} onSave={() => toggleSavedCandidate(candidate.id)} saved={saved.includes(candidate.id)} /></motion.div>)}
      </section>
    </EmployerShell>
  );
}

export function EmployerCommunityPage() {
  const version = useEmployerRefresh();
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const chats = useMemo(() => getChats(), [version]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const candidate = params.get("chat");
    const nextId = candidate ? getOrCreateChat(candidate).id : chats[0]?.id;
    if (!nextId || activeId) return;
    const timer = window.setTimeout(() => setActiveId(nextId), 0);
    return () => window.clearTimeout(timer);
  }, [activeId, chats]);

  const filtered = chats.filter((chat) => {
    const candidate = employerCandidates.find((item) => item.id === chat.candidateId);
    return candidate?.name.toLowerCase().includes(query.toLowerCase());
  });
  const active = chats.find((chat) => chat.id === activeId) || filtered[0];
  const activeCandidate = active ? employerCandidates.find((item) => item.id === active.candidateId) : null;

  function send(type: "text" | "file" = "text", fileName?: string) {
    if (!active) return;
    const text = type === "file" ? fileName || "Attachment" : message.trim();
    if (!text) return;
    saveMessage(active.id, { fileName, sender: "employer", text, type });
    setMessage("");
  }

  return (
    <EmployerShell active="Community">
      <section className="mx-auto mt-10 w-[min(1320px,calc(100%-32px))]">
        <h1 className="text-4xl font-black">Message</h1>
        <p className="mt-2 text-sm font-semibold text-slate-500">Communicate with candidates and keep hiring updates in one place.</p>
        <div className="mt-8 grid min-h-[680px] gap-5 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-[32px] bg-white p-5 shadow-sm">
            <label className="relative block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
              <input className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm font-bold outline-none focus:border-[#0B63E5]" onChange={(event) => setQuery(event.target.value)} placeholder="Search" value={query} />
            </label>
            <div className="mt-4 grid gap-2">
              {filtered.map((chat) => {
                const candidate = employerCandidates.find((item) => item.id === chat.candidateId);
                if (!candidate) return null;
                const last = chat.messages.at(-1);
                return (
                  <button className={`rounded-2xl p-3 text-left transition ${active?.id === chat.id ? "bg-[#eef4ff]" : "hover:bg-slate-50"}`} key={chat.id} onClick={() => setActiveId(chat.id)} type="button">
                    <div className="flex gap-3">
                      <Image alt={candidate.name} className="h-12 w-12 rounded-2xl object-cover" height={48} src={candidate.avatar} width={48} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-black">{candidate.name}</p>
                          {chat.unread ? <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-black text-white">{chat.unread}</span> : null}
                        </div>
                        <p className="mt-1 truncate text-xs font-semibold text-slate-500">{last?.text || "No messages yet"}</p>
                        {chat.status ? <span className="mt-2 inline-flex rounded-full bg-amber-50 px-2 py-1 text-[11px] font-black text-amber-700">{chat.status}</span> : null}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>
          <section className="flex rounded-[32px] bg-white shadow-sm">
            {active && activeCandidate ? (
              <div className="flex w-full flex-col">
                <header className="flex items-center gap-4 border-b border-slate-100 p-5">
                  <Image alt={activeCandidate.name} className="h-12 w-12 rounded-2xl object-cover" height={48} src={activeCandidate.avatar} width={48} />
                  <div>
                    <h2 className="font-black">{activeCandidate.name}</h2>
                    <p className="text-xs font-bold text-slate-400">Last seen 2 minutes ago</p>
                  </div>
                  {active.status ? <span className="ml-auto rounded-full bg-[#eef4ff] px-3 py-1 text-xs font-black text-[#0B63E5]">{active.status}</span> : null}
                </header>
                <div className="flex-1 space-y-4 overflow-y-auto p-6">
                  {active.messages.map((item) => (
                    <div className={`flex ${item.sender === "employer" ? "justify-end" : "justify-start"}`} key={item.id}>
                      <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm font-semibold ${item.sender === "employer" ? "bg-[#0B63E5] text-white" : "bg-slate-100 text-slate-600"}`}>
                        {item.type === "file" ? <span className="inline-flex items-center gap-2"><FileText size={16} />{item.fileName || item.text}</span> : item.text.startsWith("http") ? <a className="underline" href={item.text}>{item.text}</a> : item.text}
                        <span className="mt-1 block text-[11px] opacity-70">{item.time}</span>
                      </div>
                    </div>
                  ))}
                  {!active.messages.length ? <p className="text-center text-sm font-semibold text-slate-400">Start the conversation.</p> : null}
                </div>
                <footer className="flex items-center gap-3 border-t border-slate-100 p-5">
                  <input className="hidden" onChange={(event) => send("file", event.target.files?.[0]?.name)} ref={fileRef} type="file" />
                  <button className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-slate-500" onClick={() => fileRef.current?.click()} type="button"><Paperclip size={18} /></button>
                  <input className="h-12 flex-1 rounded-2xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-[#0B63E5]" onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") send(); }} placeholder="Write a message..." value={message} />
                  <button className="grid h-11 w-11 place-items-center rounded-full bg-[#0B63E5] text-white" onClick={() => send()} type="button"><Send size={18} /></button>
                </footer>
              </div>
            ) : <div className="grid flex-1 place-items-center text-sm font-bold text-slate-400">Select a chat to start messaging</div>}
          </section>
        </div>
      </section>
    </EmployerShell>
  );
}

export function EmployerHiredSpecialistsPage() {
  const version = useEmployerRefresh();
  const hired = useMemo(() => getHiredSpecialists().map((id) => employerCandidates.find((candidate) => candidate.id === id)).filter(Boolean) as EmployerCandidate[], [version]);
  const [open, setOpen] = useState<string | null>(hired[0]?.id || null);

  return (
    <EmployerDashboardShell active="Hired Specialists" subtitle="Manage accepted specialists and leave reviews." title="Hired Specialists">
      <div className="grid gap-5">
        {hired.map((candidate) => <HiredSpecialistCard candidate={candidate} expanded={open === candidate.id} key={candidate.id} onToggle={() => setOpen(open === candidate.id ? null : candidate.id)} />)}
        {!hired.length ? <EmptyState text="Accepted candidates will appear here." /> : null}
      </div>
    </EmployerDashboardShell>
  );
}

function HiredSpecialistCard({ candidate, expanded, onToggle }: { candidate: EmployerCandidate; expanded: boolean; onToggle: () => void }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const submitted = Boolean((getReviews()[candidate.id] || []).length);

  function submit() {
    if (!text.trim()) return;
    saveReview(candidate.id, { rating, text: text.trim() });
    setText("");
  }

  return (
    <article className="rounded-3xl bg-white p-6 shadow-sm">
      <button className="flex w-full items-center gap-4 text-left" onClick={onToggle} type="button">
        <Image alt={candidate.name} className="h-20 w-20 rounded-3xl object-cover" height={80} src={candidate.avatar} width={80} />
        <div className="flex-1">
          <h3 className="text-xl font-black">{candidate.name}</h3>
          <p className="text-sm font-bold text-slate-500">{candidate.role}</p>
          <StarRating value={candidate.rating} />
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">Accepted</span>
        <ChevronDown className={expanded ? "rotate-180" : ""} />
      </button>
      {expanded ? (
        <div className="mt-5 rounded-2xl bg-slate-50 p-5">
          <p className="font-black">{submitted ? "Review Submitted" : "Write Review"}</p>
          <div className="mt-3 flex gap-1">{[1, 2, 3, 4, 5].map((star) => <button className={star <= rating ? "text-amber-400" : "text-slate-300"} key={star} onClick={() => setRating(star)} type="button"><Star className="fill-current" size={20} /></button>)}</div>
          <textarea className="mt-3 min-h-24 w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm font-semibold outline-none focus:border-[#0B63E5]" onChange={(event) => setText(event.target.value)} placeholder="Share your hiring experience..." value={text} />
          <PrimaryButton className="mt-3" onClick={submit}>Save review</PrimaryButton>
        </div>
      ) : null}
    </article>
  );
}

export function EmployerFavoritesPage() {
  const router = useRouter();
  const version = useEmployerRefresh();
  const [tab, setTab] = useState<FavoriteTab>("candidates");
  const savedCandidates = useMemo(() => getSavedCandidates(), [version]);
  const savedProjects = useMemo(() => getSavedProjects(), [version]);
  const candidates = employerCandidates.filter((candidate) => savedCandidates.includes(candidate.id));
  const projects = employerProjects.filter((project) => savedProjects.includes(project.id));

  return (
    <EmployerDashboardShell active="Favorites" subtitle="Saved candidates and creative posts." title="Favorites">
      <div className="mb-6 inline-flex rounded-2xl bg-slate-100 p-1">
        {(["candidates", "projects"] as const).map((item) => <button className={`h-11 rounded-xl px-8 text-sm font-black capitalize ${tab === item ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`} key={item} onClick={() => setTab(item)} type="button">{item === "projects" ? "Posts / Projects" : item}</button>)}
      </div>
      {tab === "candidates" ? (
        <div className="grid gap-5 md:grid-cols-2">
          {candidates.map((candidate) => <CandidateCard candidate={candidate} key={candidate.id} onMessage={() => openChat(router, candidate.id)} onSave={() => toggleSavedCandidate(candidate.id)} saved />)}
          {!candidates.length ? <EmptyState text="No saved candidates yet." /> : null}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => <ProjectCard key={project.id} onSave={() => toggleSavedProject(project.id)} project={project} saved />)}
          {!projects.length ? <EmptyState text="No saved projects yet." /> : null}
        </div>
      )}
    </EmployerDashboardShell>
  );
}

export function EmployerAccountSettingsPage() {
  const [profile, setProfile] = useState<EmployerProfile>(() => getEmployerProfile());
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const sync = () => setProfile(getEmployerProfile());
    window.addEventListener("mediahire:employer-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("mediahire:employer-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function update<K extends keyof EmployerProfile>(key: K, value: EmployerProfile[K]) {
    setSaved(false);
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function upload(file?: File) {
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type) || file.size > 10 * 1024 * 1024) {
      setError("Use PNG or JPEG under 10MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => update("avatar", String(reader.result));
    reader.readAsDataURL(file);
  }

  function save() {
    if (!profile.firstName || !profile.lastName || !profile.email || !profile.companyDescription) {
      setError("Please fill required fields.");
      return;
    }
    saveEmployerProfile(profile);
    setSaved(true);
    setError("");
  }

  return (
    <EmployerDashboardShell active="Account Setting" subtitle="Update your company and account settings." title="Account Setting">
      <div className="rounded-[32px] bg-white p-6 shadow-sm md:p-10">
        <div className="flex flex-col gap-5 border-b border-slate-100 pb-8 md:flex-row md:items-center">
          <label className="grid h-32 w-32 cursor-pointer place-items-center overflow-hidden rounded-3xl border border-dashed border-slate-300 bg-slate-50">
            {profile.avatar ? <Image alt={profile.companyName} className="h-full w-full object-cover" height={128} src={profile.avatar} unoptimized={profile.avatar.startsWith("data:")} width={128} /> : <ImageIcon className="text-slate-400" />}
            <input className="hidden" onChange={(event) => upload(event.target.files?.[0])} type="file" />
          </label>
          <div>
            <h2 className="text-xl font-black text-[#0B63E5]">Profile Picture</h2>
            <p className="mt-1 text-sm font-semibold text-slate-500">We support PNGs and JPEGs under 10MB</p>
            <div className="mt-4 flex gap-3">
              <label className="inline-flex h-11 cursor-pointer items-center rounded-xl bg-[#0B63E5] px-5 text-sm font-black text-white">
                Upload Picture
                <input className="hidden" onChange={(event) => upload(event.target.files?.[0])} type="file" />
              </label>
              <OutlineButton onClick={() => update("avatar", defaultEmployerProfile.avatar)}>Remove</OutlineButton>
            </div>
          </div>
        </div>
        {error ? <p className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-black text-red-600">{error}</p> : null}
        {saved ? <p className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm font-black text-emerald-700">Saved successfully.</p> : null}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Input label="First Name*" onChange={(value) => update("firstName", value)} value={profile.firstName} />
          <Input label="Last Name*" onChange={(value) => update("lastName", value)} value={profile.lastName} />
          <Input label="Role" onChange={(value) => update("role", value)} value={profile.role} />
          <Input label="Company Name" onChange={(value) => update("companyName", value)} value={profile.companyName} />
          <Input label="Email*" onChange={(value) => update("email", value)} value={profile.email} />
          <Input label="Company Field" onChange={(value) => update("companyField", value)} value={profile.companyField} />
          <label className="md:col-span-2">
            <span className="text-sm font-black">Company Description*</span>
            <textarea className="mt-2 min-h-36 w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm font-semibold outline-none focus:border-[#0B63E5]" maxLength={512} onChange={(event) => update("companyDescription", event.target.value)} value={profile.companyDescription} />
            <span className="mt-1 block text-right text-xs font-bold text-slate-400">{profile.companyDescription.length}/512</span>
          </label>
        </div>
        <div className="mt-8 flex gap-3">
          <OutlineButton onClick={() => setProfile(getEmployerProfile())}>Cancel</OutlineButton>
          <PrimaryButton onClick={save}>Save</PrimaryButton>
        </div>
      </div>
    </EmployerDashboardShell>
  );
}

export function EmployerSettingsPage() {
  const [settings, setSettings] = useState<EmployerSettings>(() => getEmployerSettings());
  const [password, setPassword] = useState({ confirm: "", next: "" });
  const [message, setMessage] = useState("");

  function update<K extends keyof EmployerSettings>(key: K, value: EmployerSettings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  function save() {
    if ((password.next || password.confirm) && password.next !== password.confirm) {
      setMessage("Passwords do not match.");
      return;
    }
    saveEmployerSettings(settings);
    setMessage("Settings saved.");
  }

  return (
    <EmployerDashboardShell active="Settings" subtitle="Manage employer notifications, privacy, integrations, and security." title="Settings">
      <div className="rounded-[32px] bg-white p-6 shadow-sm md:p-10">
        {message ? <p className="mb-6 rounded-2xl bg-[#eef4ff] p-4 text-sm font-black text-[#0B63E5]">{message}</p> : null}
        <div className="grid gap-8">
          <SettingsSection title="Notification">
            <Toggle checked={settings.messages} label="Messages" onChange={(value) => update("messages", value)} />
            <Toggle checked={settings.interviewUpdates} label="Interview Updates" onChange={(value) => update("interviewUpdates", value)} />
            <Toggle checked={settings.newApplications} label="New Applications" onChange={(value) => update("newApplications", value)} />
          </SettingsSection>
          <SettingsSection title="Privacy">
            <Toggle checked={settings.companyVisibility} label="Company Visibility" onChange={(value) => update("companyVisibility", value)} />
            <Toggle checked={settings.publicJobPosts} label="Public Job Posts" onChange={(value) => update("publicJobPosts", value)} />
          </SettingsSection>
          <SettingsSection title="Integrations">
            <Toggle checked={settings.googleIntegration} label="Google integration" onChange={(value) => update("googleIntegration", value)} />
          </SettingsSection>
          <SettingsSection title="Preferences">
            <Select label="Select Language" onChange={(value) => update("language", value)} options={["English", "Kazakh", "Russian"]} value={settings.language} />
            <Select label="Select Theme" onChange={(value) => update("theme", value)} options={["Light", "Dark", "System"]} value={settings.theme} />
          </SettingsSection>
          <SettingsSection title="Security">
            <Input label="New Password" onChange={(value) => setPassword((current) => ({ ...current, next: value }))} value={password.next} />
            <Input label="Confirm Password" onChange={(value) => setPassword((current) => ({ ...current, confirm: value }))} value={password.confirm} />
          </SettingsSection>
        </div>
        <div className="mt-8 flex gap-3">
          <OutlineButton onClick={() => setSettings(getEmployerSettings())}>Cancel</OutlineButton>
          <PrimaryButton onClick={save}>Save</PrimaryButton>
        </div>
      </div>
    </EmployerDashboardShell>
  );
}

function SettingsSection({ children, title }: { children: React.ReactNode; title: string }) {
  return <section className="rounded-3xl border border-slate-200 p-5"><h2 className="text-xl font-black">{title}</h2><div className="mt-5 grid gap-4 md:grid-cols-2">{children}</div></section>;
}

function Toggle({ checked, label, onChange }: { checked: boolean; label: string; onChange: (value: boolean) => void }) {
  return <button className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 text-sm font-black" onClick={() => onChange(!checked)} type="button"><span>{label}</span><span className={`relative h-7 w-12 rounded-full transition ${checked ? "bg-[#0B63E5]" : "bg-slate-300"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${checked ? "left-6" : "left-1"}`} /></span></button>;
}

function Select({ label, onChange, options, value }: { label: string; onChange: (value: string) => void; options: string[]; value: string }) {
  return <label className="block"><span className="text-sm font-black">{label}</span><select className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-[#0B63E5]" onChange={(event) => onChange(event.target.value)} value={value}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}
