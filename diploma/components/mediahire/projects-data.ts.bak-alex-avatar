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

const hiddenScratchProjectTitles = ["qqwq", "lflfl", "lflflf"];

export function isHiddenScratchProjectTitle(title: string) {
  const normalizedTitle = title.trim().toLowerCase().replace(/\s+/g, " ");

  return hiddenScratchProjectTitles.some(
    (hiddenTitle) =>
      normalizedTitle === hiddenTitle || normalizedTitle.includes(hiddenTitle),
  );
}

export function isHiddenScratchProject(project: Pick<MediaHireProject, "title">) {
  return isHiddenScratchProjectTitle(project.title);
}

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

export const homeProjectDetails: MediaHireProject[] = [
  {
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=85",
    authorId: "alex-fernandez",
    authorName: "Alex Fernández",
    coverUrl: "/projects/image-1.1.png",
    createdAt: "2025-10-23T00:00:00.000Z",
    description:
      "A young woman who dreams, a man who hesitates, and an old man who remembers -- three echoes of a life shaped by time and the quiet pursuit of meaning.",
    id: "tales-from-the-river",
    media: [
      {
        id: "tales-from-the-river-cover",
        orderIndex: 0,
        type: "image",
        url: "/projects/image-1.1.png",
      },
      {
        id: "tales-from-the-river-scene-2",
        orderIndex: 1,
        type: "image",
        url: "/projects/image-1.2.png",
      },
      {
        id: "tales-from-the-river-scene-3",
        orderIndex: 2,
        type: "image",
        url: "/projects/image-1.3.png",
      },
      {
        id: "tales-from-the-river-scene-4",
        orderIndex: 3,
        type: "image",
        url: "/projects/image-1.4.png",
      },
      {
        id: "tales-from-the-river-poster",
        orderIndex: 4,
        type: "image",
        url: "/projects/image-1.5.png",
      },
    ],
    publishedAt: "2025-10-23T00:00:00.000Z",
    status: "published",
    title: "Tales from the River",
    updatedAt: "2025-10-23T00:00:00.000Z",
  },
  {
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=85",
    authorId: "alex-fernandez",
    authorName: "Alex Fernández",
    coverUrl: "/projects/image-2.1.png",
    createdAt: "2025-09-18T00:00:00.000Z",
    description:
      "A cinematic photography series about reflection, travel, and quiet moments of light across open landscapes.",
    id: "festival-of-light",
    media: [
      {
        id: "festival-of-light-cover",
        orderIndex: 0,
        type: "image",
        url: "/projects/image-2.1.png",
      },
      {
        id: "festival-of-light-scene-2",
        orderIndex: 1,
        type: "image",
        url: "/projects/image-2.2.png",
      },
      {
        id: "festival-of-light-scene-3",
        orderIndex: 2,
        type: "image",
        url: "/projects/image-2.3.png",
      },
      {
        id: "festival-of-light-scene-4",
        orderIndex: 3,
        type: "image",
        url: "/projects/image-2.4.png",
      },
      {
        id: "festival-of-light-scene-5",
        orderIndex: 4,
        type: "image",
        url: "/projects/image-2.5.png",
      },
    ],
    publishedAt: "2025-09-18T00:00:00.000Z",
    status: "published",
    title: "Festival of Light",
    updatedAt: "2025-09-18T00:00:00.000Z",
  },
  {
    authorAvatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=85",
    authorId: "dimash-hasenov",
    authorName: "Dimash Hasenov",
    coverUrl: "/projects/image-3.1.png",
    createdAt: "2025-08-05T00:00:00.000Z",
    description:
      "A playful 3D character set built around soft shapes, expressive color, and friendly animated details.",
    id: "chubby-characters",
    media: [
      {
        id: "chubby-characters-cover",
        orderIndex: 0,
        type: "image",
        url: "/projects/image-3.1.png",
      },
      {
        id: "chubby-characters-scene-2",
        orderIndex: 1,
        type: "image",
        url: "/projects/image-3.2.png",
      },
      {
        id: "chubby-characters-scene-3",
        orderIndex: 2,
        type: "image",
        url: "/projects/image-3.3.png",
      },
      {
        id: "chubby-characters-scene-4",
        orderIndex: 3,
        type: "image",
        url: "/projects/image-3.4.png",
      },
      {
        id: "chubby-characters-scene-5",
        orderIndex: 4,
        type: "image",
        url: "/projects/image-3.5.png",
      },
    ],
    publishedAt: "2025-08-05T00:00:00.000Z",
    status: "published",
    title: "Chubby Characters",
    updatedAt: "2025-08-05T00:00:00.000Z",
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
  return getStoredProjects().filter(
    (project) =>
      project.status === "published" && !isHiddenScratchProject(project),
  );
}
