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

const freedomMediaLogo =
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=240&q=85";
const btsDigitalLogo =
  "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=240&q=85";
const kaspiLogo =
  "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=240&q=85";

export const mediaHireCompanies: MediaHireCompany[] = [
  {
    description:
      "Freedom Media is a modern creative company specializing in digital content, film production, media projects, and entertainment experiences. The team builds high-quality visual stories for brands and young audiences.",
    id: "freedom-media",
    location: "Astana, Kazakhstan",
    logo: freedomMediaLogo,
    name: "Freedom Media",
  },
  {
    description:
      "BTS Digital creates digital products, service platforms, and design systems for fast-growing technology teams. The company values clean product thinking and practical creative execution.",
    id: "bts-digital",
    location: "Astana, Kazakhstan",
    logo: btsDigitalLogo,
    name: "BTS Digital",
  },
  {
    description:
      "Kaspi.kz builds consumer products used by millions of people every day. Their product teams combine research, design, engineering, and business thinking to create simple digital services.",
    id: "kaspi-kz",
    location: "Almaty, Kazakhstan",
    logo: kaspiLogo,
    name: "Kaspi.kz",
  },
];

export const mediaHireJobs: MediaHireJob[] = [
  {
    companyId: "kaspi-kz",
    companyLogo: kaspiLogo,
    companyName: "Kaspi.kz",
    description:
      "We are looking for a Product Designer who can turn research insights into clear product flows, simple interfaces, and polished mobile experiences for a large digital audience.",
    id: "product-designer",
    level: "Middle",
    location: "Almaty, Kazakhstan",
    offer: [
      "Competitive compensation package",
      "Product team with strong research culture",
      "Flexible working schedule",
      "Mentorship from senior product designers",
      "Clear growth path inside the design team",
    ],
    postedAt: "1 hour ago",
    responsibilities: [
      "Design user flows, wireframes, and high-fidelity product interfaces",
      "Collaborate with product managers and engineers on product decisions",
      "Run usability reviews and improve existing user journeys",
      "Maintain consistent UI patterns and product design documentation",
      "Use research and analytics to support design decisions",
    ],
    salary: "500$ / Month",
    tags: ["Full-Time", "Product Design", "Mobile", "Figma", "Research"],
    title: "Product Designer",
    type: "Full-Time",
  },
  {
    companyId: "bts-digital",
    companyLogo: btsDigitalLogo,
    companyName: "BTS Digital",
    description:
      "BTS Digital is hiring a Graphic Designer to create clean visual assets, brand materials, campaign graphics, and presentation systems for digital product teams.",
    id: "graphic-designer",
    level: "Senior",
    location: "Astana, Kazakhstan",
    offer: [
      "Stable creative workflow with product and marketing teams",
      "Modern office and hybrid collaboration",
      "Opportunity to shape visual communication for digital products",
      "Professional development and design community support",
      "Strong portfolio-building projects",
    ],
    postedAt: "1 hour ago",
    responsibilities: [
      "Create brand visuals, social assets, presentations, and campaign graphics",
      "Develop layouts for digital and print communication",
      "Prepare production-ready files and design guidelines",
      "Collaborate with marketing, product, and content teams",
      "Keep visual quality consistent across channels",
    ],
    salary: "455$ / Month",
    tags: ["Full-Time", "Senior", "Branding", "Adobe Illustrator", "Figma"],
    title: "Graphic Designer",
    type: "Full-Time",
  },
  {
    companyId: "freedom-media",
    companyLogo: freedomMediaLogo,
    companyName: "Freedom Media",
    description:
      "A Senior UX Designer is a pivotal member of product development teams, responsible for ensuring that digital products and applications provide users with intuitive, efficient, and enjoyable interactions.",
    id: "ui-ux-designer",
    level: "2-3 Years",
    location: "Astana, Kazakhstan",
    offer: [
      "Competitive compensation package",
      "Convenient office location in Astana",
      "Significant responsibilities and autonomy",
      "Participation in a well-funded startup poised for international growth",
      "Collaborative work environment with an experienced team",
    ],
    postedAt: "1 hour ago",
    responsibilities: [
      "Develop precise user flows and wireframes",
      "Create prototypes and conduct usability tests to address user challenges",
      "Adhere to design system guidelines",
      "Investigate optimal methods for generating thorough documentation",
      "Guide junior team members through design execution",
    ],
    salary: "500$ / Month",
    tags: ["Full-Time", "UX/UI", "Figma", "Research", "Remote"],
    title: "UI/UX Designer",
    type: "Full-Time",
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
