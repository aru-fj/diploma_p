"use client";

export type EmployerCandidate = {
  avatar: string;
  bio: string;
  category: string;
  city: string;
  education: string;
  email: string;
  experience: string;
  id: string;
  languages: string[];
  location: string;
  name: string;
  portfolio: EmployerProject[];
  rating: number;
  resume: {
    about: string;
    education: string;
    experience: string;
    jobPreferences: string;
    languages: string;
    links: string;
    skills: string;
  };
  reviews: EmployerReview[];
  role: string;
  skills: string[];
  software: string[];
};

export type EmployerProject = {
  authorAvatar: string;
  authorId: string;
  authorName: string;
  category: string;
  description: string;
  id: string;
  image: string;
  media?: Array<{ type: "image" | "video" | "pdf" | "text"; url?: string; text?: string; fileName?: string }>;
  title: string;
};

export type PostedJob = {
  applications: number;
  benefits: string[];
  category: string;
  city: string;
  closed?: boolean;
  createdAt: string;
  description: string;
  employmentType: string[];
  experience: string;
  id: string;
  level: string;
  salary: string;
  skills: string[];
  status: "Active" | "Closed";
  title: string;
};

export type ApplicationStatus = "Applied" | "Interview" | "Accepted" | "Rejected";

export type EmployerApplication = {
  candidateId: string;
  jobId: string;
  status: ApplicationStatus;
  updatedAt: string;
};

export type EmployerChatMessage = {
  fileName?: string;
  id: string;
  sender: "candidate" | "employer";
  text: string;
  time: string;
  type: "text" | "file" | "voice";
};

export type EmployerChat = {
  candidateId: string;
  id: string;
  messages: EmployerChatMessage[];
  status?: ApplicationStatus;
  unread: number;
};

export type EmployerReview = {
  company: string;
  id: string;
  rating: number;
  text: string;
};

export type EmployerProfile = {
  avatar: string;
  companyDescription: string;
  companyField: string;
  companyName: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

export type EmployerSettings = {
  companyVisibility: boolean;
  googleIntegration: boolean;
  interviewUpdates: boolean;
  language: string;
  messages: boolean;
  newApplications: boolean;
  publicJobPosts: boolean;
  theme: string;
};

const keys = {
  applications: "mediahire.employer.applications",
  chats: "mediahire.employer.chats",
  comments: "mediahire.employer.projectComments",
  hired: "mediahire.employer.hired",
  jobs: "mediahire.employer.postedJobs",
  profile: "mediahire.employer.profile",
  reviews: "mediahire.employer.reviews",
  savedCandidates: "mediahire.employer.savedCandidates",
  savedProjects: "mediahire.employer.savedProjects",
  settings: "mediahire.employer.settings",
};

const now = () => new Date().toISOString();

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? ({ ...fallback, ...JSON.parse(raw) } as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeReadArray<T>(key: string, fallback: T[]): T[] {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : fallback;
  } catch {
    return fallback;
  }
}

function safeWrite<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("mediahire:employer-updated"));
}

export const employerProjects: EmployerProject[] = [
  {
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=90",
    authorId: "alex-fernandez",
    authorName: "Alex Fernández",
    category: "Photography",
    description: "A cinematic photo story about memory, hesitation, and the quiet pursuit of meaning.",
    id: "tales-from-the-river",
    image: "/projects/image-1.1.png",
    media: [
      { type: "image", url: "/projects/image-1.1.png" },
      { type: "image", url: "/projects/image-1.2.png" },
      { type: "image", url: "/projects/image-1.3.png" },
      { type: "text", text: "A visual essay built with soft atmosphere, documentary framing, and poetic pacing." },
    ],
    title: "Tales from the River",
  },
  {
    authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=90",
    authorId: "dimash-hasenov",
    authorName: "Dimash Hasenov",
    category: "Videographer",
    description: "A light-driven visual study for brand film and editorial campaigns.",
    id: "festival-of-light",
    image: "/projects/image-2.1.png",
    media: [
      { type: "image", url: "/projects/image-2.1.png" },
      { type: "image", url: "/projects/image-2.2.png" },
      { type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    title: "Festival of Light",
  },
  {
    authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=90",
    authorId: "dimash-hasenov",
    authorName: "Dimash Hasenov",
    category: "3D Artist",
    description: "A playful character design set for animated campaign storytelling.",
    id: "chubby-characters",
    image: "/projects/image-3.1.png",
    media: [{ type: "image", url: "/projects/image-3.1.png" }],
    title: "Chubby Characters",
  },
];

export const employerCandidates: EmployerCandidate[] = [
  {
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=90",
    bio: "Photographer and cinematographer focused on documentary light, urban atmosphere, and campaign storytelling.",
    category: "Photographer",
    city: "Madrid",
    education: "Madrid School of Visual Arts",
    email: "alexfernandezdp@gmail.com",
    experience: "3+ years of experience",
    id: "alex-fernandez",
    languages: ["English", "Spanish"],
    location: "Madrid, Spain",
    name: "Alex Fernández",
    portfolio: employerProjects.filter((project) => project.authorId === "alex-fernandez"),
    rating: 4.8,
    resume: {
      about: "Creative photographer with experience in branded editorial and cinematic campaigns.",
      education: "Madrid School of Visual Arts, Photography",
      experience: "Freelance campaigns, documentaries, short films, and commercial photo shoots.",
      jobPreferences: "Open to contract, remote editing, and campaign production roles.",
      languages: "English, Spanish",
      links: "behance.net/alexfernandez",
      skills: "Photography, cinematography, color grading, retouching",
    },
    reviews: [
      { company: "Freedom Media", id: "alex-review-1", rating: 5, text: "Alex delivered a beautiful campaign with excellent visual discipline." },
    ],
    role: "Photographer / Cinematographer",
    skills: ["photography", "videography", "color grading", "retouching"],
    software: ["Adobe Photoshop", "Adobe Lightroom", "Premiere Pro"],
  },
  {
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=90",
    bio: "Videographer and motion creator with a strong eye for brand films, music edits, and social-first content.",
    category: "Videographer",
    city: "Astana",
    education: "Astana IT University, Media Technology",
    email: "dimashasenov@gmail.com",
    experience: "3+ years of experience",
    id: "dimash-hasenov",
    languages: ["Kazakh", "Russian", "English"],
    location: "Astana, Kazakhstan",
    name: "Dimash Hasenov",
    portfolio: employerProjects.filter((project) => project.authorId === "dimash-hasenov"),
    rating: 4.7,
    resume: {
      about: "Videographer building modern social videos, brand content, and short-form edits.",
      education: "Astana IT University, Media Technology",
      experience: "Brand films, music clips, motion campaigns, and social content editing.",
      jobPreferences: "Open to full-time or project-based creative roles.",
      languages: "Kazakh, Russian, English",
      links: "behance.net/dimashhasenov",
      skills: "Videography, editing, creative direction, lighting",
    },
    reviews: [
      { company: "BTS Digital", id: "dimash-review-1", rating: 5, text: "Dimash is fast, thoughtful, and understands visual rhythm." },
    ],
    role: "Videographer",
    skills: ["videography", "video editing", "creative direction", "content creation"],
    software: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve"],
  },
];

export const defaultEmployerProfile: EmployerProfile = {
  avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=240&q=85",
  companyDescription: "A creative company hiring media specialists for modern digital campaigns.",
  companyField: "Media & Creative Production",
  companyName: "MediaHire Studio",
  email: "employer@mediahire.com",
  firstName: "Employer",
  lastName: "Account",
  role: "Creative Recruiter",
};

export const defaultEmployerSettings: EmployerSettings = {
  companyVisibility: true,
  googleIntegration: false,
  interviewUpdates: true,
  language: "English",
  messages: true,
  newApplications: true,
  publicJobPosts: true,
  theme: "Light",
};

export const seedJobs: PostedJob[] = [
  {
    applications: 2,
    benefits: ["Flexible Working Hour", "Insurance"],
    category: "Design",
    city: "Astana",
    createdAt: now(),
    description: "Design polished interfaces and visual systems for digital products.",
    employmentType: ["Full-time"],
    experience: "1-3 year",
    id: "ui-ux-designer",
    level: "Middle",
    salary: "500$ / Month",
    skills: ["Figma", "UX/UI", "Research"],
    status: "Active",
    title: "UI/UX Designer",
  },
  {
    applications: 1,
    benefits: ["Promotion Opportunity"],
    category: "Graphic Design",
    city: "Almaty",
    createdAt: now(),
    description: "Create brand visuals, campaigns, and social media assets.",
    employmentType: ["Part-time", "Remote"],
    experience: "+3 year",
    id: "graphic-designer",
    level: "Senior",
    salary: "455$ / Month",
    skills: ["Photoshop", "Illustrator", "Branding"],
    status: "Active",
    title: "Graphic Designer",
  },
];

export const seedApplications: EmployerApplication[] = [
  { candidateId: "alex-fernandez", jobId: "ui-ux-designer", status: "Applied", updatedAt: now() },
  { candidateId: "dimash-hasenov", jobId: "ui-ux-designer", status: "Interview", updatedAt: now() },
  { candidateId: "dimash-hasenov", jobId: "graphic-designer", status: "Applied", updatedAt: now() },
];

export function getEmployerProfile() {
  return safeRead(keys.profile, defaultEmployerProfile);
}

export function saveEmployerProfile(profile: EmployerProfile) {
  safeWrite(keys.profile, profile);
}

export function getEmployerSettings() {
  return safeRead(keys.settings, defaultEmployerSettings);
}

export function saveEmployerSettings(settings: EmployerSettings) {
  safeWrite(keys.settings, settings);
}

export function getSavedCandidates() {
  return safeReadArray<string>(keys.savedCandidates, []);
}

export function toggleSavedCandidate(id: string) {
  const saved = getSavedCandidates();
  const next = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id];
  safeWrite(keys.savedCandidates, next);
  return next.includes(id);
}

export function getSavedProjects() {
  return safeReadArray<string>(keys.savedProjects, []);
}

export function toggleSavedProject(id: string) {
  const saved = getSavedProjects();
  const next = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id];
  safeWrite(keys.savedProjects, next);
  return next.includes(id);
}

export function getPostedJobs() {
  return safeReadArray<PostedJob>(keys.jobs, seedJobs);
}

export function savePostedJob(job: PostedJob) {
  const jobs = getPostedJobs();
  const next = jobs.some((item) => item.id === job.id)
    ? jobs.map((item) => (item.id === job.id ? job : item))
    : [job, ...jobs];
  safeWrite(keys.jobs, next);
}

export function updateJobStatus(jobId: string, status: PostedJob["status"]) {
  safeWrite(
    keys.jobs,
    getPostedJobs().map((job) => (job.id === jobId ? { ...job, status, closed: status === "Closed" } : job)),
  );
}

export function deletePostedJob(jobId: string) {
  safeWrite(keys.jobs, getPostedJobs().filter((job) => job.id !== jobId));
}

export function getApplications() {
  return safeReadArray<EmployerApplication>(keys.applications, seedApplications);
}

export function getApplicationsForJob(jobId: string) {
  return getApplications().filter((application) => application.jobId === jobId);
}

export function updateApplicationStatus(jobId: string, candidateId: string, status: ApplicationStatus) {
  const applications = getApplications();
  const next = applications.map((application) =>
    application.jobId === jobId && application.candidateId === candidateId
      ? { ...application, status, updatedAt: now() }
      : application,
  );
  safeWrite(keys.applications, next);

  if (status === "Accepted") {
    const hired = getHiredSpecialists();
    if (!hired.includes(candidateId)) {
      safeWrite(keys.hired, [...hired, candidateId]);
    }
  }

  const chat = getOrCreateChat(candidateId);
  safeWrite(
    keys.chats,
    getChats().map((item) => (item.id === chat.id ? { ...item, status } : item)),
  );
}

export function getHiredSpecialists() {
  const accepted = getApplications()
    .filter((application) => application.status === "Accepted")
    .map((application) => application.candidateId);
  return Array.from(new Set([...safeReadArray<string>(keys.hired, []), ...accepted]));
}

export function getChats() {
  return safeReadArray<EmployerChat>(keys.chats, [
    {
      candidateId: "alex-fernandez",
      id: "chat-alex-fernandez",
      messages: [
        { id: "m-1", sender: "candidate", text: "Hello! I can share my portfolio for your campaign.", time: "10:15", type: "text" },
      ],
      status: "Applied",
      unread: 1,
    },
  ]);
}

export function getOrCreateChat(candidateId: string) {
  const chats = getChats();
  const existing = chats.find((chat) => chat.candidateId === candidateId);

  if (existing) {
    return existing;
  }

  const chat: EmployerChat = {
    candidateId,
    id: `chat-${candidateId}`,
    messages: [],
    unread: 0,
  };
  safeWrite(keys.chats, [chat, ...chats]);
  return chat;
}

export function saveMessage(chatId: string, message: Omit<EmployerChatMessage, "id" | "time">) {
  const nextMessage: EmployerChatMessage = {
    ...message,
    id: `message-${Date.now()}`,
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
  safeWrite(
    keys.chats,
    getChats().map((chat) =>
      chat.id === chatId
        ? { ...chat, messages: [...chat.messages, nextMessage], unread: 0 }
        : chat,
    ),
  );
}

export function getProjectComments(projectId: string) {
  const comments = safeRead<Record<string, EmployerChatMessage[]>>(keys.comments, {});
  return comments[projectId] || [];
}

export function saveProjectComment(projectId: string, text: string) {
  const comments = safeRead<Record<string, EmployerChatMessage[]>>(keys.comments, {});
  const nextComment: EmployerChatMessage = {
    id: `comment-${Date.now()}`,
    sender: "employer",
    text,
    time: new Date().toLocaleDateString(),
    type: "text",
  };
  safeWrite(keys.comments, {
    ...comments,
    [projectId]: [...(comments[projectId] || []), nextComment],
  });
}

export function getReviews() {
  return safeRead<Record<string, EmployerReview[]>>(keys.reviews, {});
}

export function saveReview(candidateId: string, review: Omit<EmployerReview, "id" | "company">) {
  const profile = getEmployerProfile();
  const reviews = getReviews();
  const nextReview: EmployerReview = {
    ...review,
    company: profile.companyName,
    id: `review-${Date.now()}`,
  };
  safeWrite(keys.reviews, {
    ...reviews,
    [candidateId]: [...(reviews[candidateId] || []), nextReview],
  });
}

export function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
