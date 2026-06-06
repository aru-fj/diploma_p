export type MediaHireCompany = {
  description: string;
  id: string;
  location: string;
  logo: string;
  name: string;
};

export type MediaHireJob = {
  companyId: string;
  companyLogo: string;
  companyName: string;
  description: string;
  id: string;
  level: string;
  location: string;
  offer: string[];
  postedAt: string;
  responsibilities: string[];
  salary: string;
  tags: string[];
  title: string;
  type: string;
};

export const mediaHireCompanies: MediaHireCompany[] = [
  {
    id: "kaspi-kz",
    name: "Kaspi.kz",
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=300&q=90",
    location: "Almaty, Kazakhstan",
    description:
      "Kaspi.kz builds digital products used by millions of people every day. The company works with product design, research, financial services, marketplace solutions, and user-friendly digital experiences.",
  },
  {
    id: "bts-digital",
    name: "BTS Digital",
    logo: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=300&q=90",
    location: "Astana, Kazakhstan",
    description:
      "BTS Digital creates digital products, service platforms, design systems, and brand communication materials for modern technology teams.",
  },
  {
    id: "freedom-media",
    name: "Freedom Media",
    logo: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=300&q=90",
    location: "Astana, Kazakhstan",
    description:
      "Freedom Media works with web interfaces, dashboards, landing pages, media platforms, and digital communication projects.",
  },
  {
    id: "frame-production",
    name: "Frame Production",
    logo: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=300&q=90",
    location: "Almaty, Kazakhstan",
    description:
      "Frame Production creates commercial videos, interviews, reels, social media content, and visual production projects for brands.",
  },
  {
    id: "bright-agency",
    name: "Bright Agency",
    logo: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=300&q=90",
    location: "Astana, Kazakhstan",
    description:
      "Bright Agency is a creative agency focused on motion graphics, animated banners, short videos, campaign visuals, and digital advertising content.",
  },
  {
    id: "digital-room",
    name: "Digital Room",
    logo: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=300&q=90",
    location: "Online",
    description:
      "Digital Room creates social media visuals, Instagram posts, stories, campaign layouts, and simple visual templates for digital communication.",
  },
  {
    id: "gpus",
    name: "GPUS",
    logo: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=300&q=90",
    location: "Almaty, Kazakhstan",
    description:
      "GPUS works with product pages, mobile layouts, small interaction improvements, prototypes, and user flow documentation.",
  },
  {
    id: "tromp-group",
    name: "Tromp Group",
    logo: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=300&q=90",
    location: "Shymkent, Kazakhstan",
    description:
      "Tromp Group develops landing pages, dashboards, responsive interfaces, and remote digital design projects.",
  },
  {
    id: "swift-ziemann",
    name: "Swift-Ziemann",
    logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=300&q=90",
    location: "Shymkent, Kazakhstan",
    description:
      "Swift-Ziemann supports creative service deals, client communication, sales offers, and project request management.",
  },
  {
    id: "mediapro",
    name: "MediaPro",
    logo: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?auto=format&fit=crop&w=300&q=90",
    location: "Astana, Kazakhstan",
    description:
      "MediaPro creates social media layouts, posters, simple brand materials, and visual content for digital platforms.",
  },
];

export const mediaHireJobs: MediaHireJob[] = [
  {
    id: "product-designer-kaspi",
    companyId: "kaspi-kz",
    companyName: "Kaspi.kz",
    companyLogo:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=300&q=90",
    title: "Product Designer",
    location: "Almaty, Kazakhstan",
    salary: "500$ / Month",
    postedAt: "1 hour ago",
    type: "Full-Time",
    level: "Middle",
    description:
      "Kaspi.kz is looking for a Product Designer to create user-friendly digital interfaces for financial and marketplace products.",
    responsibilities: [
      "Design clean and modern product interfaces",
      "Create wireframes, user flows, and prototypes",
      "Work with product managers and developers",
      "Improve user experience based on feedback",
    ],
    offer: [
      "Competitive compensation package",
      "Creative and collaborative working environment",
      "Opportunities for portfolio development",
      "Professional growth inside the company",
      "Participation in digital product projects",
    ],
    tags: [
      "Hybrid",
      "Kazakh, Russian",
      "Bachelor degree",
      "UI Design",
      "UX",
      "Figma",
    ],
  },
  {
    id: "graphic-designer-bts-digital",
    companyId: "bts-digital",
    companyName: "BTS Digital",
    companyLogo:
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=300&q=90",
    title: "Graphic Designer",
    location: "Astana, Kazakhstan",
    salary: "455$ / Month",
    postedAt: "1 hour ago",
    type: "Full-Time",
    level: "Senior",
    description:
      "BTS Digital is hiring a Graphic Designer to create brand visuals, marketing materials, social media graphics, and presentation assets.",
    responsibilities: [
      "Create visual materials for digital campaigns",
      "Develop layouts for social media and presentations",
      "Support brand identity consistency",
      "Prepare final design files for publication",
    ],
    offer: [
      "Stable creative workflow with product and marketing teams",
      "Modern office and team collaboration",
      "Professional development opportunities",
      "Strong portfolio-building projects",
      "Creative and collaborative working environment",
    ],
    tags: [
      "Onsite",
      "Kazakh, Russian, English",
      "Bachelor degree",
      "Graphic Design",
      "Branding",
      "Adobe",
    ],
  },
  {
    id: "ui-ux-designer-freedom-media",
    companyId: "freedom-media",
    companyName: "Freedom Media",
    companyLogo:
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=300&q=90",
    title: "UI/UX Designer",
    location: "Astana, Kazakhstan",
    salary: "500$ / Month",
    postedAt: "1 hour ago",
    type: "Full-Time",
    level: "2-3 Years",
    description:
      "Freedom Media is looking for a UI/UX Designer who can design modern web pages, dashboards, landing pages, and media platform interfaces.",
    responsibilities: [
      "Design website and dashboard interfaces",
      "Prepare prototypes and design documentation",
      "Analyze user behavior and improve usability",
      "Collaborate with frontend developers",
    ],
    offer: [
      "Competitive compensation package",
      "Convenient office location in Astana",
      "Participation in media platform projects",
      "Collaborative work environment",
      "Professional growth inside the company",
    ],
    tags: [
      "Hybrid",
      "Russian, English",
      "Not required",
      "UI/UX",
      "Web Design",
      "Figma",
    ],
  },
  {
    id: "video-editor-frame-production",
    companyId: "frame-production",
    companyName: "Frame Production",
    companyLogo:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=300&q=90",
    title: "Video Editor",
    location: "Almaty, Kazakhstan",
    salary: "600$ / Month",
    postedAt: "2 hours ago",
    type: "Freelance",
    level: "Middle",
    description:
      "Frame Production needs a Video Editor for short commercial videos, reels, interviews, and creative social media content.",
    responsibilities: [
      "Edit short videos for social media",
      "Work with sound, color correction, and subtitles",
      "Prepare final exports for different platforms",
      "Follow creative direction and deadlines",
    ],
    offer: [
      "Remote-friendly project workflow",
      "Creative commercial video projects",
      "Flexible working schedule",
      "Opportunities for portfolio development",
      "Collaboration with production teams",
    ],
    tags: [
      "Remote",
      "Russian",
      "Not required",
      "Video",
      "Premiere Pro",
      "Editing",
    ],
  },
  {
    id: "motion-designer-bright-agency",
    companyId: "bright-agency",
    companyName: "Bright Agency",
    companyLogo:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=300&q=90",
    title: "Motion Designer",
    location: "Astana, Kazakhstan",
    salary: "700$ / Month",
    postedAt: "3 hours ago",
    type: "Part-Time",
    level: "Middle",
    description:
      "Bright Agency is searching for a Motion Designer to create animated banners, short videos, and visual effects for campaigns.",
    responsibilities: [
      "Create motion graphics for campaigns",
      "Animate social media and advertising content",
      "Prepare video assets for digital platforms",
      "Collaborate with designers and marketers",
    ],
    offer: [
      "Creative advertising projects",
      "Flexible part-time workflow",
      "Collaboration with designers and marketers",
      "Portfolio development opportunities",
      "Professional growth in motion design",
    ],
    tags: [
      "Hybrid",
      "Kazakh, Russian",
      "Bachelor degree",
      "Motion",
      "Animation",
      "After Effects",
    ],
  },
  {
    id: "content-designer-digital-room",
    companyId: "digital-room",
    companyName: "Digital Room",
    companyLogo:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=300&q=90",
    title: "Content Designer",
    location: "Online",
    salary: "350$ / Month",
    postedAt: "Today",
    type: "Part-Time",
    level: "Junior",
    description:
      "Digital Room needs a Content Designer for Instagram posts, stories, small campaign layouts, and simple visual templates.",
    responsibilities: [
      "Create social media visuals",
      "Adapt content for different formats",
      "Prepare templates for posts and stories",
      "Support content planning",
    ],
    offer: [
      "Remote work format",
      "Simple and clear content tasks",
      "Flexible working schedule",
      "Experience with social media projects",
      "Opportunity to grow creative skills",
    ],
    tags: [
      "Remote",
      "Kazakh, Russian",
      "Not required",
      "SMM",
      "Content",
      "Canva",
    ],
  },
  {
    id: "ui-ux-designer-gpus",
    companyId: "gpus",
    companyName: "GPUS",
    companyLogo:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=300&q=90",
    title: "UI/UX Designer",
    location: "Almaty, Kazakhstan",
    salary: "255$ / Month",
    postedAt: "Today",
    type: "Full-Time",
    level: "Junior",
    description:
      "GPUS is hiring a UI/UX Designer to support product pages, mobile layouts, and small interaction improvements.",
    responsibilities: [
      "Create UI layouts in Figma",
      "Prepare clickable prototypes",
      "Support user flow documentation",
      "Work with product feedback",
    ],
    offer: [
      "Junior-friendly product tasks",
      "Opportunity to learn product design",
      "Team support and feedback",
      "Portfolio development",
      "Professional growth inside the company",
    ],
    tags: [
      "Onsite",
      "Kazakh, Russian",
      "Not required",
      "UI/UX",
      "Figma",
      "Product",
    ],
  },
  {
    id: "ui-ux-designer-tromp-group",
    companyId: "tromp-group",
    companyName: "Tromp Group",
    companyLogo:
      "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=300&q=90",
    title: "UI/UX Designer",
    location: "Shymkent, Kazakhstan",
    salary: "255$ / Month",
    postedAt: "Today",
    type: "Full-Time",
    level: "Middle",
    description:
      "Tromp Group needs a remote UI/UX Designer for landing pages, dashboards, and user research support.",
    responsibilities: [
      "Design responsive interfaces",
      "Improve existing page flows",
      "Create design documentation",
      "Collaborate remotely with developers",
    ],
    offer: [
      "Remote workflow",
      "Landing page and dashboard projects",
      "Flexible collaboration",
      "Portfolio development",
      "Professional growth opportunities",
    ],
    tags: [
      "Remote",
      "Russian, English",
      "Not required",
      "UI/UX",
      "Web",
      "Responsive Design",
    ],
  },
  {
    id: "sales-manager-swift-ziemann",
    companyId: "swift-ziemann",
    companyName: "Swift-Ziemann",
    companyLogo:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=300&q=90",
    title: "Sales Manager",
    location: "Shymkent, Kazakhstan",
    salary: "255$ / Month",
    postedAt: "1 hour ago",
    type: "Full-Time",
    level: "Middle",
    description:
      "Swift-Ziemann is looking for a Sales Manager to communicate with clients and support creative service deals.",
    responsibilities: [
      "Contact new clients",
      "Prepare offers",
      "Track client requests",
      "Support sales reporting",
    ],
    offer: [
      "Stable work with clients",
      "Experience in creative service sales",
      "Team support",
      "Professional communication practice",
      "Growth inside the sales team",
    ],
    tags: [
      "Onsite",
      "Kazakh, Russian",
      "Bachelor degree",
      "Sales",
      "Clients",
      "CRM",
    ],
  },
  {
    id: "graphic-designer-mediapro",
    companyId: "mediapro",
    companyName: "MediaPro",
    companyLogo:
      "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?auto=format&fit=crop&w=300&q=90",
    title: "Graphic Designer",
    location: "Astana, Kazakhstan",
    salary: "300$ / Month",
    postedAt: "2 hours ago",
    type: "Part-Time",
    level: "Junior",
    description:
      "MediaPro needs a part-time Graphic Designer for social layouts, posters, and simple brand materials.",
    responsibilities: [
      "Design social media posts",
      "Create posters and banners",
      "Adapt templates for campaigns",
      "Prepare files for publishing",
    ],
    offer: [
      "Part-time creative workflow",
      "Remote-friendly design tasks",
      "Social media design experience",
      "Portfolio development",
      "Flexible working schedule",
    ],
    tags: [
      "Remote",
      "Kazakh, Russian",
      "Not required",
      "Graphic Design",
      "Canva",
      "Figma",
    ],
  },
];

export function getMediaHireJob(id: string) {
  return mediaHireJobs.find((job) => job.id === id);
}

export function getMediaHireCompany(id: string) {
  return mediaHireCompanies.find((company) => company.id === id);
}

export function getJobsByCompany(companyId: string) {
  return mediaHireJobs.filter((job) => job.companyId === companyId);
}

export function getSimilarJobs(jobId: string) {
  return mediaHireJobs.filter((job) => job.id !== jobId);
}