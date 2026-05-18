import {
  CircleHelp,
  FileText,
  LayoutGrid,
  LogOut,
  Settings,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

export type SidebarItem = {
  color?: "red";
  href: string;
  icon: LucideIcon;
  label: string;
};

export type SavedJob = {
  date: string;
  id: string;
  location: string;
  logoClass: string;
  logoText: string;
  skill: string;
  title: string;
  type: string;
};

export type MessagePreview = {
  avatarClass: string;
  id: string;
  initials: string;
  name: string;
  preview: string;
  time: string;
  unread: number;
};

export type ApplicationHistoryItem = {
  date: string;
  label: string;
};

export type Application = {
  company: string;
  history: ApplicationHistoryItem[];
  id: string;
  logoClass: string;
  logoText: string;
  status: "Interviewed" | "Applied" | "Rejected" | "Accepted";
  title: string;
};

export const primarySidebarItems: SidebarItem[] = [
  { href: "/dashboard/jobseeker", icon: LayoutGrid, label: "Dashboard" },
  { href: "/signup/jobseeker/resume", icon: FileText, label: "My Resume" },
  { href: "#settings", icon: Settings, label: "Settings" },
  {
    href: "#account-setting",
    icon: SlidersHorizontal,
    label: "Account Setting",
  },
];

export const secondarySidebarItems: SidebarItem[] = [
  { color: "red", href: "/", icon: LogOut, label: "Log out" },
  { href: "#help", icon: CircleHelp, label: "Help" },
];

export const savedJobs: SavedJob[] = [
  {
    date: "6 may",
    id: "ui-ux-designer-photoshop",
    location: "Astana",
    logoClass: "bg-emerald-700 text-white",
    logoText: "S",
    skill: "Adobe Photoshop",
    title: "UI/UX Designer",
    type: "Full Time",
  },
  {
    date: "4 may",
    id: "ui-ux-designer-figma",
    location: "Astana",
    logoClass: "bg-orange-600 text-white",
    logoText: "F",
    skill: "Figma",
    title: "UI/UX Designer",
    type: "Full Time",
  },
  {
    date: "28 april",
    id: "graphic-designer-indesign",
    location: "Astana",
    logoClass: "bg-slate-800 text-lime-300",
    logoText: "A",
    skill: "Adobe InDesign",
    title: "Graphic Designer",
    type: "Part Time",
  },
  {
    date: "25 april",
    id: "graphic-designer-photoshop",
    location: "Astana",
    logoClass: "bg-blue-100 text-blue-700",
    logoText: "Ps",
    skill: "Adobe Photoshop",
    title: "Graphic Designer",
    type: "Part Time",
  },
  {
    date: "20 april",
    id: "graphic-designer-illustrator",
    location: "Astana",
    logoClass: "bg-stone-200 text-stone-900",
    logoText: "Sp",
    skill: "Adobe Illustrator",
    title: "Graphic Designer",
    type: "Full Time",
  },
];

export const messagePreviews: MessagePreview[] = [
  {
    avatarClass: "bg-black text-orange-500",
    id: "salem-entertainment",
    initials: "S",
    name: "Salem Entertainment",
    preview: "We prefer to interview with you. Thank you fo...",
    time: "Just Now",
    unread: 2,
  },
  {
    avatarClass: "bg-slate-700 text-white",
    id: "alem-koskanay",
    initials: "A",
    name: "Alem Koskanay",
    preview: "Hi! Let's do a collab and make a social video.",
    time: "Just Now",
    unread: 1,
  },
];

export const applications: Application[] = [
  {
    company: "Salem Entertainment",
    history: [
      { date: "Just Now", label: "Interviewed" },
      { date: "1 days ago", label: "Applied" },
    ],
    id: "salem-uiux",
    logoClass: "bg-black text-orange-500",
    logoText: "S",
    status: "Interviewed",
    title: "UI/UX Designer",
  },
];

export const applicationFilters = [
  "All",
  "Applied",
  "Rejected",
  "Accepted",
  "Interviewed",
] as const;

export type ApplicationFilter = (typeof applicationFilters)[number];
