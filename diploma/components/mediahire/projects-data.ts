export type ProjectStatus = "draft" | "published";
export type ProjectBlockType = "image" | "video" | "text" | "photo_grid" | "pdf";

export type ProjectMediaBlock = {
  fileName?: string;
  id: string;
  orderIndex: number;
  textContent?: string;
  type: ProjectBlockType;
  url?: string;
};

export type MediaHireProject = {
  authorAvatar?: string;
  authorId: string;
  authorName: string;
  coverUrl?: string;
  createdAt: string;
  description: string;
  id: string;
  media: ProjectMediaBlock[];
  publishedAt?: string;
  status: ProjectStatus;
  title: string;
  updatedAt: string;
};

export type ProfileSummary = {
  avatarUrl: string;
  availableStatus: string;
  bio: string;
  email: string;
  fullName: string;
  id: string;
  location: string;
  profession: string;
  skills: string[];
  software: string[];
};

export const projectStorageKey = "mediahire.jobseeker.projects";

export const demoProfile: ProfileSummary = {
  avatarUrl:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=85",
  availableStatus: "Available for Freelance",
  bio: "Creative media specialist focused on visual storytelling and digital brand systems.",
  email: "danamuhtarova@gmail.com",
  fullName: "Dana Muhtarova",
  id: "demo-dana",
  location: "Astana, Kazakhstan",
  profession: "Graphic Designer",
  skills: [
    "UI/UX Design",
    "branding",
    "illustration",
    "photo editing",
    "print design",
    "creative thinking",
    "motion design",
  ],
  software: ["Adobe Photoshop", "Adobe Lightroom", "Adobe InDesign"],
};

export const demoProjects: MediaHireProject[] = [
  {
    authorAvatar: demoProfile.avatarUrl,
    authorId: demoProfile.id,
    authorName: demoProfile.fullName,
    coverUrl:
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1100&q=90",
    createdAt: "2025-01-21T00:00:00.000Z",
    description:
      "SOZ is a natural mocktail brand born from the idea that the party does not stop just because alcohol does.",
    id: "soz-mocktails",
    media: [
      {
        id: "soz-cover",
        orderIndex: 0,
        type: "image",
        url: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1200&q=90",
      },
      {
        id: "soz-bottle",
        orderIndex: 1,
        type: "image",
        url: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1200&q=90",
      },
      {
        id: "soz-text",
        orderIndex: 2,
        textContent:
          "A colorful identity system with bold typography, warm gradients, and premium product visuals.",
        type: "text",
      },
    ],
    publishedAt: "2025-01-21T00:00:00.000Z",
    status: "published",
    title: "SOZ - Mocktails",
    updatedAt: "2025-01-21T00:00:00.000Z",
  },
];

export function createProjectId(title: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  const slug = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${slug || "project"}-${Date.now().toString(36)}`;
}

export function getStoredProjects() {
  if (typeof window === "undefined") {
    return [] as MediaHireProject[];
  }

  try {
    const rawProjects = window.localStorage.getItem(projectStorageKey);
    return rawProjects ? (JSON.parse(rawProjects) as MediaHireProject[]) : [];
  } catch {
    return [];
  }
}

export function setStoredProjects(projects: MediaHireProject[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(projectStorageKey, JSON.stringify(projects));
  window.dispatchEvent(
    new CustomEvent("mediahire:projects-updated", {
      detail: { projects },
    }),
  );
}

export function getPublishedStoredProjects() {
  return getStoredProjects().filter((project) => project.status === "published");
}
