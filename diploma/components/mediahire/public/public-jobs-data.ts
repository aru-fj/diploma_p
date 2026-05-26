export type PublicJob = {
  slug: string;
  company: string;
  title: string;
  logo: string;
  location: string;
  salary: string;
  createdAt: string;
  jobType: "Full-Time" | "Part-Time" | "Freelance" | "Internship";
  experience: string;
  workMode: "Onsite" | "Remote" | "Hybrid";
  language: string;
  education: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  tags: string[];
};

export const publicJobs: PublicJob[] = [
  {
    slug: "product-designer-kaspi",
    company: "Kaspi.kz",
    title: "Product Designer",
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=300&q=90",
    location: "Almaty, Kazakhstan",
    salary: "500$ / Month",
    createdAt: "1 hour ago",
    jobType: "Full-Time",
    experience: "Middle",
    workMode: "Hybrid",
    language: "Kazakh, Russian",
    education: "Bachelor degree",
    description:
      "Kaspi.kz is looking for a Product Designer to create user-friendly digital interfaces for financial and marketplace products.",
    responsibilities: [
      "Design clean and modern product interfaces",
      "Create wireframes, user flows, and prototypes",
      "Work with product managers and developers",
      "Improve user experience based on feedback",
    ],
    requirements: [
      "Experience with Figma",
      "Understanding of UX/UI principles",
      "Portfolio with web or mobile projects",
      "Ability to work with design systems",
    ],
    tags: ["UI Design", "UX", "Figma"],
  },
  {
    slug: "graphic-designer-bts-digital",
    company: "BTS Digital",
    title: "Graphic Designer",
    logo: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=300&q=90",
    location: "Astana, Kazakhstan",
    salary: "455$ / Month",
    createdAt: "1 hour ago",
    jobType: "Full-Time",
    experience: "Senior",
    workMode: "Onsite",
    language: "Kazakh, Russian, English",
    education: "Bachelor degree",
    description:
      "BTS Digital is hiring a Graphic Designer to create brand visuals, marketing materials, social media graphics, and presentation assets.",
    responsibilities: [
      "Create visual materials for digital campaigns",
      "Develop layouts for social media and presentations",
      "Support brand identity consistency",
      "Prepare final design files for publication",
    ],
    requirements: [
      "Strong graphic design portfolio",
      "Adobe Photoshop and Illustrator skills",
      "Good understanding of typography and layout",
      "Experience with brand materials",
    ],
    tags: ["Graphic Design", "Branding", "Adobe"],
  },
  {
    slug: "ui-ux-designer-freedom-media",
    company: "Freedom Media",
    title: "UI/UX Designer",
    logo: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=300&q=90",
    location: "Astana, Kazakhstan",
    salary: "500$ / Month",
    createdAt: "1 hour ago",
    jobType: "Full-Time",
    experience: "2-3 Years",
    workMode: "Hybrid",
    language: "Russian, English",
    education: "Not required",
    description:
      "Freedom Media is looking for a UI/UX Designer who can design modern web pages, dashboards, landing pages, and media platform interfaces.",
    responsibilities: [
      "Design website and dashboard interfaces",
      "Prepare prototypes and design documentation",
      "Analyze user behavior and improve usability",
      "Collaborate with frontend developers",
    ],
    requirements: [
      "Good knowledge of Figma",
      "Understanding of responsive design",
      "Experience with landing pages or dashboards",
      "Attention to detail",
    ],
    tags: ["UI/UX", "Web Design", "Figma"],
  },
  {
    slug: "video-editor-frame-production",
    company: "Frame Production",
    title: "Video Editor",
    logo: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=300&q=90",
    location: "Almaty, Kazakhstan",
    salary: "600$ / Month",
    createdAt: "2 hours ago",
    jobType: "Freelance",
    experience: "Middle",
    workMode: "Remote",
    language: "Russian",
    education: "Not required",
    description:
      "Frame Production needs a Video Editor for short commercial videos, reels, interviews, and creative social media content.",
    responsibilities: [
      "Edit short videos for social media",
      "Work with sound, color correction, and subtitles",
      "Prepare final exports for different platforms",
      "Follow creative direction and deadlines",
    ],
    requirements: [
      "Experience in Premiere Pro or DaVinci Resolve",
      "Portfolio with edited videos",
      "Basic color correction skills",
      "Ability to work remotely",
    ],
    tags: ["Video", "Premiere Pro", "Editing"],
  },
  {
    slug: "motion-designer-bright-agency",
    company: "Bright Agency",
    title: "Motion Designer",
    logo: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=300&q=90",
    location: "Astana, Kazakhstan",
    salary: "700$ / Month",
    createdAt: "3 hours ago",
    jobType: "Part-Time",
    experience: "Middle",
    workMode: "Hybrid",
    language: "Kazakh, Russian",
    education: "Bachelor degree",
    description:
      "Bright Agency is searching for a Motion Designer to create animated banners, short videos, and visual effects for campaigns.",
    responsibilities: [
      "Create motion graphics for campaigns",
      "Animate social media and advertising content",
      "Prepare video assets for digital platforms",
      "Collaborate with designers and marketers",
    ],
    requirements: [
      "After Effects experience",
      "Understanding of animation principles",
      "Creative portfolio",
      "Ability to meet deadlines",
    ],
    tags: ["Motion", "Animation", "After Effects"],
  },
  {
    slug: "content-designer-digital-room",
    company: "Digital Room",
    title: "Content Designer",
    logo: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=300&q=90",
    location: "Online",
    salary: "350$ / Month",
    createdAt: "Today",
    jobType: "Part-Time",
    experience: "Junior",
    workMode: "Remote",
    language: "Kazakh, Russian",
    education: "Not required",
    description:
      "Digital Room needs a Content Designer for Instagram posts, stories, small campaign layouts, and simple visual templates.",
    responsibilities: [
      "Create social media visuals",
      "Adapt content for different formats",
      "Prepare templates for posts and stories",
      "Support content planning",
    ],
    requirements: [
      "Canva or Figma skills",
      "Basic design taste",
      "Understanding of social media formats",
      "Ability to follow brand style",
    ],
    tags: ["SMM", "Content", "Canva"],
  },
  {
    slug: "ui-ux-designer-gpus",
    company: "GPUS",
    title: "UI/UX Designer",
    logo: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=300&q=90",
    location: "Almaty, Kazakhstan",
    salary: "255$ / Month",
    createdAt: "Today",
    jobType: "Full-Time",
    experience: "Junior",
    workMode: "Onsite",
    language: "Kazakh, Russian",
    education: "Not required",
    description:
      "GPUS is hiring a UI/UX Designer to support product pages, mobile layouts, and small interaction improvements.",
    responsibilities: [
      "Create UI layouts in Figma",
      "Prepare clickable prototypes",
      "Support user flow documentation",
      "Work with product feedback",
    ],
    requirements: ["Figma skills", "Basic UX knowledge", "Portfolio required"],
    tags: ["UI/UX", "Figma", "Product"],
  },
  {
    slug: "ui-ux-designer-tromp-group",
    company: "Tromp Group",
    title: "UI/UX Designer",
    logo: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=300&q=90",
    location: "Shymkent, Kazakhstan",
    salary: "255$ / Month",
    createdAt: "Today",
    jobType: "Full-Time",
    experience: "Middle",
    workMode: "Remote",
    language: "Russian, English",
    education: "Not required",
    description:
      "Tromp Group needs a remote UI/UX Designer for landing pages, dashboards, and user research support.",
    responsibilities: [
      "Design responsive interfaces",
      "Improve existing page flows",
      "Create design documentation",
      "Collaborate remotely with developers",
    ],
    requirements: ["Remote workflow", "Figma", "Responsive design"],
    tags: ["Remote", "UI/UX", "Web"],
  },
  {
    slug: "sales-manager-swift-ziemann",
    company: "Swift-Ziemann",
    title: "Sales Manager",
    logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=300&q=90",
    location: "Shymkent, Kazakhstan",
    salary: "255$ / Month",
    createdAt: "1 hour ago",
    jobType: "Full-Time",
    experience: "Middle",
    workMode: "Onsite",
    language: "Kazakh, Russian",
    education: "Bachelor degree",
    description:
      "Swift-Ziemann is looking for a Sales Manager to communicate with clients and support creative service deals.",
    responsibilities: [
      "Contact new clients",
      "Prepare offers",
      "Track client requests",
      "Support sales reporting",
    ],
    requirements: ["Communication skills", "Sales experience", "CRM basics"],
    tags: ["Sales", "Clients", "Onsite"],
  },
  {
    slug: "graphic-designer-mediapro",
    company: "MediaPro",
    title: "Graphic Designer",
    logo: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?auto=format&fit=crop&w=300&q=90",
    location: "Astana, Kazakhstan",
    salary: "300$ / Month",
    createdAt: "2 hours ago",
    jobType: "Part-Time",
    experience: "Junior",
    workMode: "Remote",
    language: "Kazakh, Russian",
    education: "Not required",
    description:
      "MediaPro needs a part-time Graphic Designer for social layouts, posters, and simple brand materials.",
    responsibilities: [
      "Design social media posts",
      "Create posters and banners",
      "Adapt templates for campaigns",
      "Prepare files for publishing",
    ],
    requirements: ["Photoshop", "Canva or Figma", "Good visual taste"],
    tags: ["Graphic Design", "Remote", "Part-Time"],
  },
];

export function getPublicJobBySlug(slug: string) {
  return publicJobs.find((job) => job.slug === slug);
}

export const kazakhstanCities = [
  "All Kazakhstan",
  "Astana, Kazakhstan",
  "Almaty, Kazakhstan",
  "Shymkent, Kazakhstan",
  "Aktobe, Kazakhstan",
  "Karaganda, Kazakhstan",
  "Atyrau, Kazakhstan",
  "Pavlodar, Kazakhstan",
  "Taraz, Kazakhstan",
  "Kokshetau, Kazakhstan",
  "Turkistan, Kazakhstan",
  "Online",
];
