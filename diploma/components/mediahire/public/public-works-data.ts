import {
  getStoredProjects,
  type MediaHireProject,
  type ProjectMediaBlock,
} from "../projects-data";
import { getCurrentUserProfile, getSettings } from "../shared/user-state";

export type PublicWorkMedia =
  | {
      type: "image";
      src: string;
      alt?: string;
    }
  | {
      type: "text";
      text: string;
    }
  | {
      type: "youtube";
      src: string;
      title: string;
    }
  | {
      type: "video";
      src: string;
      title: string;
    }
  | {
      type: "vimeo";
      src: string;
      title: string;
    }
  | {
      type: "pdf";
      src: string;
      title: string;
    };

export type PublicWork = {
  slug: string;
  title: string;
  author: string;
  authorSlug: string;
  role: string;
  company: string;
  category: string;
  type: string;
  location: string;
  createdAt: string;
  coverImage: string;
  authorAvatar?: string;
  gallery: PublicWorkMedia[];
  description: string;
  responsibilities: string[];
  tools: string[];
};

export const publicWorks: PublicWork[] = [
  {
    slug: "fashion-brand-campaign",
    title: "Fashion Brand Campaign",
    author: "Amina Saparova",
    authorSlug: "amina-saparova",
    role: "Marketing Specialist",
    company: "Freelance / Small Business Projects",
    category: "Marketing",
    type: "Fulltime",
    location: "Astana, Kazakhstan",
    createdAt: "April 2026",
    coverImage:
      "/photo/amina-saparova/amina-saparova-1.png",
    authorAvatar:
      "/photo/amina-saparova/aminasaparova.jpg",
    gallery: [
      {
        type: "image",
        src: "/photo/amina-saparova/amina-saparova-1.png",
        alt: "Fashion Brand Campaign social media strategy",
      },
      {
        type: "image",
        src: "/photo/amina-saparova/amina-saparova-2.png",
        alt: "Fashion campaign content planning",
      },
      {
        type: "image",
        src: "/photo/amina-saparova/amina-saparova-3.png",
        alt: "Fashion brand digital visuals",
      },
      {
        type: "image",
        src: "/photo/amina-saparova/amina-saparova-4.png",
        alt: "Fashion brand digital visuals",
      },
      {
        type: "image",
        src: "/photo/amina-saparova/amina-saparova-5.png",
        alt: "Fashion brand digital visuals",
      },
      {
        type: "image",
        src: "/photo/amina-saparova/amina-saparova-6.png",
        alt: "Fashion brand digital visuals",
      },
    ],
    description:
      "A digital marketing campaign created to promote a new fashion collection on social media.",
    responsibilities: [
      "Digital marketing strategy",
      "SMM content planning",
      "Campaign idea development",
      "Audience and competitor research",
    ],
    tools: ["Meta Business Suite", "Google Analytics", "Canva", "Notion", "Figma"],
  },
  {
    slug: "tales-from-the-river",
    title: "Tales from the River",
    author: "Amir Tulegenov",
    authorSlug: "amir-tulegenov",
    role: "Photographer / Cinematographer",
    company: "Freelance Projects",
    category: "Photography / Cinematography",
    type: "Project-based",
    location: "Astana, Kazakhstan",
    createdAt: "September 2023",
    coverImage:
      "/photo/amir-tulegenov/amir-tulegenov-1.png",
    authorAvatar:
      "/photo/amir-tulegenov/amirtulegenov.jpg",
    gallery: [
      {
        type: "image",
        src: "/photo/amir-tulegenov/amir-tulegenov-1.png",
        alt: "Tales from the River main scene",
      },
      {
        type: "image",
        src: "/photo/amir-tulegenov/amir-tulegenov-2.png",
        alt: "River visual campaign scene",
      },
      {
        type: "image",
        src: "/photo/amir-tulegenov/amir-tulegenov-3.png",
        alt: "Cinematic portrait scene",
      },
      {
        type: "image",
        src: "/photo/amir-tulegenov/amir-tulegenov-4.png",
        alt: "Cinematic portrait scene",
      },
      {
        type: "image",
        src: "/photo/amir-tulegenov/amir-tulegenov-5.png",
        alt: "Cinematic portrait scene",
      },
      {
        type: "image",
        src: "/photo/amir-tulegenov/amir-tulegenov-6.png",
        alt: "Cinematic portrait scene",
      },
    ],
    description:
      "A young woman who dreams, a man who hesitates, an old man who remembers -- three echoes of a life shaped by time and the quiet pursuit of meaning.",
    responsibilities: [
      "Photography and cinematography",
      "Lighting and composition",
      "Visual campaign shooting",
      "Color correction and final editing",
    ],
    tools: [
      "Adobe Lightroom",
      "Adobe Photoshop",
      "Capture One",
      "DaVinci Resolve",
      "Adobe Premiere Pro",
    ],
  },
  {
    slug: "festival-of-light",
    title: "Festival of Light",
    author: "Ruslan Aitov",
    authorSlug: "ruslan-aitov",
    role: "Producer",
    company: "Creative Production Projects",
    category: "Production",
    type: "Fulltime",
    location: "Almaty, Kazakhstan",
    createdAt: "May 2026",
    coverImage:
      "/photo/ruslan-aitov/ruslan-aitov-1.png",
    authorAvatar:
      "/photo/ruslan-aitov/ruslanaitov.jpg",
    gallery: [
      {
        type: "image",
        src: "/photo/ruslan-aitov/ruslan-aitov-1.png",
        alt: "Festival of Light event production",
      },
      {
        type: "image",
        src: "/photo/ruslan-aitov/ruslan-aitov-2.png",
        alt: "Festival production and event coordination",
      },
      {
        type: "image",
        src: "/photo/ruslan-aitov/ruslan-aitov-3.png",
        alt: "Creative event lighting and production",
      },
      {
        type: "image",
        src: "/photo/ruslan-aitov/ruslan-aitov-4.png",
        alt: "Creative event lighting and production",
      },
      {
        type: "image",
        src: "/photo/ruslan-aitov/ruslan-aitov-5.png",
        alt: "Creative event lighting and production",
      },
    ],
    description:
      "I organized a creative media production for a public cultural event, including planning, team coordination, shooting schedule, and communication with the client.",
    responsibilities: [
      "Event production planning",
      "Team coordination",
      "Shooting schedule preparation",
      "Client communication",
      "Creative production management",
    ],
    tools: ["Notion", "Google Workspace", "Trello", "Microsoft Excel", "StudioBinder"],
  },
  {
    slug: "soz-mocktails",
    title: "SOZ - Mocktails",
    author: "Dana Muhtarova",
    authorSlug: "dana-murat",
    role: "Graphic Designer",
    company: "Freelance / Creative Projects",
    category: "Graphic Design",
    type: "Project-based",
    location: "Astana, Kazakhstan",
    createdAt: "March 2026",
    coverImage: "/photo/dana-muhtarova/dana-muhtarova-1.png",
    authorAvatar: "/photo/dana-muhtarova/danamuhtarova.jpg",
    gallery: [
      {
        type: "image",
        src: "/photo/dana-muhtarova/dana-muhtarova-1.png",
        alt: "SOZ Mocktails brand identity",
      },
      {
        type: "image",
        src: "/photo/dana-muhtarova/dana-muhtarova-2.png",
        alt: "SOZ Mocktails packaging design",
      },
      {
        type: "image",
        src: "/photo/dana-muhtarova/dana-muhtarova-3.png",
        alt: "SOZ Mocktails social media visual",
      },
      {
        type: "image",
        src: "/photo/dana-muhtarova/dana-muhtarova-4.png",
        alt: "SOZ Mocktails visual concept",
      },
      {
        type: "image",
        src: "/photo/dana-muhtarova/dana-muhtarova-5.png",
        alt: "SOZ Mocktails presentation",
      },
    ],
    description:
      "SOZ is a modern mocktail brand created for people who want a stylish drink experience without alcohol.",
    responsibilities: [
      "Brand identity design",
      "Packaging design",
      "Social media visual design",
      "Presentation and layout preparation",
    ],
    tools: ["Adobe Photoshop", "Adobe Lightroom", "Adobe InDesign"],
  },
  {
    slug: "ford-commercial-video-script",
    title: "FORD: TV Commercial Video Script",
    author: "Madina Omar",
    authorSlug: "madina-omar",
    role: "Screenwriter",
    company: "Freelance / Film Projects",
    category: "Screenwriting",
    type: "Project-based",
    location: "Almaty, Kazakhstan",
    createdAt: "February 2026",
    coverImage:
      "/photo/madina-omar/madina-omar-1.png",
    authorAvatar:
      "/photo/madina-omar/madinaomar.jpg",
    gallery: [
      
      {
        type: "pdf",
        src: "/photo/madina-omar/madina-omar-2.pdf",
        title: "FORD TV commercial script concept",
      },
      {
        type: "youtube",
        src: "https://youtu.be/sBybwVuIVbg?si=OtmtpN_EKi-4aqRb",
        title: "FORD TV commercial script concept",
      },
    ],
    description:
      "Hired to write inspiring, high-concept copy/script for a TV commercial for Ford, based on the provided director's cut that was already edited.",
    responsibilities: [
      "Commercial script writing",
      "High-concept copy development",
      "Story structure improvement",
      "Narrative and voice-over preparation",
    ],
    tools: ["Final Draft", "Celtx", "Google Docs", "Notion", "Microsoft Word"],
  },
  {
    slug: "event-highlight-edit",
    title: "Event Highlight Edit",
    author: "Arman Nurlan",
    authorSlug: "arman-nurlan",
    role: "Video Editor",
    company: "Freelance / Media Projects",
    category: "Video Editing",
    type: "Freelance",
    location: "Astana, Kazakhstan",
    createdAt: "April 2026",
    coverImage:
      "/photo/arman-nurlan/arman-nurlan-1.png",
    authorAvatar:
      "/photo/arman-nurlan/armannurlan.jpg",
    gallery: [
      {
        type: "vimeo",
        src: "https://vimeo.com/1133033086?fl=pl&fe=sh",
        title: "Video editing workspace",
      },
      {
        type: "image",
        src: "/photo/arman-nurlan/arman-nurlan-1.png",
        alt: "Event highlight video editing",
      },
      {
        type: "image",
        src: "/photo/arman-nurlan/arman-nurlan-2.png",
        alt: "Event recap editing process",
      },
      {
        type: "image",
        src: "/photo/arman-nurlan/arman-nurlan-3.png",
        alt: "Video editing workspace",
      },
      {
        type: "image",
        src: "/photo/arman-nurlan/arman-nurlan-4.png",
        alt: "Video editing workspace",
      },
      {
        type: "image",
        src: "/photo/arman-nurlan/arman-nurlan-5.png",
        alt: "Video editing workspace",
      },
      {
        type: "image",
        src: "/photo/arman-nurlan/arman-nurlan-6.png",
        alt: "Video editing workspace",
      },
    ],
    description:
      "I edited a dynamic event highlight video using the best moments, music rhythm, transitions, and clean pacing for social media publication.",
    responsibilities: [
      "Video editing",
      "Music rhythm synchronization",
      "Transitions and pacing",
      "Color correction",
      "Final export for social media",
    ],
    tools: [
      "Adobe Premiere Pro",
      "DaVinci Resolve",
      "Adobe After Effects",
      "Final Cut Pro",
      "CapCut",
    ],
  },
  {
    slug: "motion-poster",
    title: "Motion Poster",
    author: "Alina Karimova",
    authorSlug: "alina-karimova",
    role: "Motion Designer",
    company: "Freelance / Brand Projects",
    category: "Motion Design",
    type: "Project-based",
    location: "Almaty, Kazakhstan",
    createdAt: "April 2026",
    coverImage:
      "/photo/alina-karimova/alina-karimova-1.png",
    authorAvatar:
      "/photo/alina-karimova/alinakarimova.jpg",
    gallery: [
      {
        type: "image",
        src: "/photo/alina-karimova/alina-karimova-1.png",
        alt: "Motion Poster animated campaign visual",
      },
      {
        type: "image",
        src: "/photo/alina-karimova/alina-karimova-2.png",
        alt: "Motion design visual rhythm",
      },
      {
        type: "image",
        src: "/photo/alina-karimova/alina-karimova-3.png",
        alt: "Animated typography and digital design",
      },
    ],
    description:
      "I created an animated poster for a digital campaign using typography movement, smooth transitions, and clean visual rhythm.",
    responsibilities: [
      "Animated poster design",
      "Typography animation",
      "Motion rhythm and transitions",
      "Social media motion export",
    ],
    tools: [
      "Adobe After Effects",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Cinema 4D",
      "Figma",
    ],
  },
  {
    slug: "music-video-production",
    title: "Music Video Production",
    author: "Dimash Hasenov",
    authorSlug: "dimash-karim",
    role: "Videographer",
    company: "Freelance / Commercial Projects",
    category: "Videography",
    type: "Fulltime",
    location: "Astana, Kazakhstan",
    createdAt: "September 2023",
    coverImage:
      "/photo/dimash-hasenov/dimash-hasenov-1.png",
    authorAvatar:
      "/photo/dimash-hasenov/dimashhasenov.jpg",
    gallery: [
      {
        type: "image",
        src: "/photo/dimash-hasenov/dimash-hasenov-1.png",
        alt: "Music video production scene",
      },
      {
        type: "image",
        src: "/photo/dimash-hasenov/dimash-hasenov-2.png",
        alt: "Music video camera work",
      },
      {
        type: "image",
        src: "/photo/dimash-hasenov/dimash-hasenov-3.png",
        alt: "Music video lighting and atmosphere",
      },
      {
        type: "image",
        src: "/photo/dimash-hasenov/dimash-hasenov-4.png",
        alt: "Music video lighting and atmosphere",
      },
      {
        type: "vimeo",
        src: "https://vimeo.com/184036140?fl=pl&fe=sh",
        title: "Music video lighting and atmosphere",
      },
    ],
    description:
      "One distant forest, small river bank, early autumn evening. September 2023.",
    responsibilities: [
      "Camera operation",
      "Lighting setup",
      "Video shooting",
      "Color grading",
      "Final video editing",
    ],
    tools: [
      "Adobe Premiere Pro",
      "DaVinci Resolve",
      "Adobe After Effects",
      "Final Cut Pro",
      "CapCut",
    ],
  },
  {
    slug: "chubby-characters",
    title: "Chubby characters",
    author: "Aruzhan Kanatkyzy",
    authorSlug: "aruzhan-kanatkyzy",
    role: "3D Animator",
    company: "Freelance",
    category: "3D Animator",
    type: "Part-time",
    location: "Almaty",
    createdAt: "September 2025",
    coverImage:
      "/photo/aruzhan-kanatkyzy/aruzhan-kanatkyzy-1.png",
    authorAvatar:
      "/photo/aruzhan-kanatkyzy/aruzhankanatkyzy.jpg",
    gallery: [
      {
        type: "image",
        src: "/photo/aruzhan-kanatkyzy/aruzhan-kanatkyzy-1.png",
        alt: "Social media visuals",
      },
      {
        type: "image",
        src: "/photo/aruzhan-kanatkyzy/aruzhan-kanatkyzy-2.png",
        alt: "Digital content design",
      },
      {
        type: "image",
        src: "/photo/aruzhan-kanatkyzy/aruzhan-kanatkyzy-3.png",
        alt: "Content design screen",
      },
      {
        type: "image",
        src: "/photo/aruzhan-kanatkyzy/aruzhan-kanatkyzy-4.png",
        alt: "Content design screen",
      },
      {
        type: "image",
        src: "/photo/aruzhan-kanatkyzy/aruzhan-kanatkyzy-5.png",
        alt: "Content design screen",
      },
      {
        type: "vimeo",
        src: "https://vimeo.com/1175354597?fl=pl&fe=sh",
        title: "Social Media Visuals PDF",
      },
    ],
    description:
      "I created a video for the collaboration case between CASETIFY and BBNEXDO. I focused on attractively showcasing the design concept of the case and the BBNEXDO characters.",
    responsibilities: [
      "Character animation",
      "3D modeling",
      "Lighting and rendering",
      "Video presentation preparation",
    ],
    tools: ["Blender", "Cinema 4D", "Autodesk Maya", "Adobe After Effects", "Unreal Engine"],
  },
  {
    slug: "brand-story-video",
    title: "Brand Story Video",
    author: "Timur Saten",
    authorSlug: "timur-saten",
    role: "Director",
    company: "Film and Commercial Projects",
    category: "Directing",
    type: "Freelancer",
    location: "Almaty, Kazakhstan",
    createdAt: "April 2026",
    coverImage:
      "/photo/timur-saten/timur-saten-1.png",
    authorAvatar:
      "/photo/timur-saten/timursaten.jpg",
    gallery: [
      {
        type: "image",
        src: "/photo/timur-saten/timur-saten-1.png",
        alt: "Brand Story Video directing concept",
      },
      {
        type: "image",
        src: "/photo/timur-saten/timur-saten-2.png",
        alt: "Creative direction planning",
      },
      {
        type: "image",
        src: "/photo/timur-saten/timur-saten-3.png",
        alt: "Commercial video production scene",
      },
      {
        type: "image",
        src: "/photo/timur-saten/timur-saten-4.png",
        alt: "Commercial video production scene",
      },
    ],
    description:
      "I directed a cinematic brand story video that shows the company’s values, atmosphere, and message through visual storytelling.",
    responsibilities: [
      "Creative direction",
      "Scene planning",
      "Actor direction",
      "Shot composition",
      "Visual storytelling",
    ],
    tools: [
      "Final Draft",
      "StudioBinder",
      "DaVinci Resolve",
      "Adobe Premiere Pro",
      "Notion",
    ],
  },
];

function formatProjectDate(value?: string) {
  if (!value) {
    return "Recently added";
  }

  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function projectMediaToPublicMedia(
  block: ProjectMediaBlock,
  title: string,
): PublicWorkMedia | null {
  if ((block.type === "image" || block.type === "photo_grid") && block.url) {
    return {
      alt: block.fileName || title,
      src: block.url,
      type: "image",
    };
  }

  if (block.type === "youtube" && block.url) {
    return {
      src: block.url,
      title: block.fileName || `${title} video`,
      type: "youtube",
    };
  }

  if (block.type === "video" && block.url) {
    return {
      src: block.url,
      title: block.fileName || `${title} video`,
      type: "video",
    };
  }

  if (block.type === "pdf" && block.url) {
    return {
      src: block.url,
      title: block.fileName || `${title} PDF`,
      type: "pdf",
    };
  }

  if (block.type === "text" && block.textContent) {
    return {
      text: block.textContent,
      type: "text",
    };
  }

  return null;
}

export function projectToPublicWork(project: MediaHireProject): PublicWork {
  const sortedMedia = project.media
    .slice()
    .sort((first, second) => first.orderIndex - second.orderIndex);
  const gallery = sortedMedia
    .map((block) => projectMediaToPublicMedia(block, project.title))
    .filter(Boolean) as PublicWorkMedia[];
  const coverImage =
    sortedMedia.find(
      (block) =>
        (block.type === "image" || block.type === "photo_grid") && block.url,
    )?.url ||
    project.coverUrl ||
    "/projects/image-1.1.png";
  const currentProfile = getCurrentUserProfile();
  const authorRole =
    project.authorRole ||
    currentProfile.jobTitle ||
    currentProfile.role ||
    "Creative Specialist";
  const workType =
    project.workType ||
    currentProfile.preferredWorkType ||
    (project.status === "published" ? "Project-based" : "Draft");

  return {
    author: project.authorName,
    authorAvatar: project.authorAvatar,
    authorSlug: "jobseeker",
    category: authorRole,
    company: "Independent Creator",
    coverImage,
    createdAt: formatProjectDate(project.publishedAt || project.updatedAt),
    description: project.description,
    gallery,
    location: "Astana, Kazakhstan",
    responsibilities: project.description ? [project.description] : [],
    role: authorRole,
    slug: project.id,
    title: project.title,
    tools: sortedMedia.map((block) => block.type),
    type: workType,
  };
}

export function getStoredPublicWorks(options?: { includeDrafts?: boolean }) {
  if (!options?.includeDrafts && !getSettings().publicPortfolio) {
    return [];
  }

  return getStoredProjects()
    .filter((project) =>
      options?.includeDrafts ? true : project.status === "published",
    )
    .map(projectToPublicWork);
}

export function getAllPublicWorks() {
  const storedWorks = getStoredPublicWorks();

  return [
    ...storedWorks,
    ...publicWorks.filter(
      (work) => !storedWorks.some((storedWork) => storedWork.slug === work.slug),
    ),
  ];
}

export function getPublicWorkBySlug(slug: string) {
  return (
    getStoredPublicWorks({ includeDrafts: true }).find(
      (work) => work.slug === slug,
    ) || publicWorks.find((work) => work.slug === slug)
  );
}

export const publicAuthLinks = {
    login: "/auth-required",
    signup: "/auth-required",
  };
