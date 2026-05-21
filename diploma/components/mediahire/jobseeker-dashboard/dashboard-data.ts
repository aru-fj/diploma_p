import {
  Bell,
  CircleHelp,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  SlidersHorizontal,
  UserCog,
  type LucideIcon,
} from "lucide-react";

export type DashboardMenuItem = {
  icon: LucideIcon;
  label: string;
};

export type SavedJob = {
  companyColor: string;
  companyLogo: string;
  date: string;
  id: string;
  location: string;
  skill: string;
  title: string;
  type: string;
};

export type MessagePreview = {
  avatarColor: string;
  id: string;
  initials: string;
  name: string;
  preview: string;
  unread: number;
};

export type ApplicationHistoryItem = {
  label: string;
  time: string;
};

export type Application = {
  company: string;
  history: ApplicationHistoryItem[];
  id: string;
  role: string;
  status: "Applied" | "Under Review" | "Interviewed" | "Accepted" | "Rejected";
};

export const sidebarMenuItems: DashboardMenuItem[] = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: FileText, label: "My Resume" },
  { icon: Settings, label: "Settings" },
  { icon: UserCog, label: "Account Setting" },
];

export const sidebarBottomItems: DashboardMenuItem[] = [
  { icon: LogOut, label: "Log out" },
  { icon: CircleHelp, label: "Help" },
];

export const savedJobs: SavedJob[] = [
  {
    companyColor: "bg-[#eef4ff] text-[#0B63E5]",
    companyLogo: "A",
    date: "6 may",
    id: "adobe-uiux-1",
    location: "Astana",
    skill: "Adobe Photoshop",
    title: "UI/UX Designer",
    type: "Full Time",
  },
  {
    companyColor: "bg-violet-50 text-violet-600",
    companyLogo: "F",
    date: "4 may",
    id: "figma-uiux-2",
    location: "Astana",
    skill: "Figma",
    title: "UI/UX Designer",
    type: "Full Time",
  },
  {
    companyColor: "bg-amber-50 text-amber-600",
    companyLogo: "I",
    date: "28 april",
    id: "indesign-graphic-3",
    location: "Astana",
    skill: "Adobe InDesign",
    title: "Graphic Designer",
    type: "Part Time",
  },
  {
    companyColor: "bg-rose-50 text-rose-600",
    companyLogo: "P",
    date: "25 april",
    id: "photoshop-graphic-4",
    location: "Astana",
    skill: "Adobe Photoshop",
    title: "Graphic Designer",
    type: "Part Time",
  },
  {
    companyColor: "bg-emerald-50 text-emerald-600",
    companyLogo: "Ai",
    date: "20 april",
    id: "illustrator-graphic-5",
    location: "Astana",
    skill: "Adobe Illustrator",
    title: "Graphic Designer",
    type: "Full Time",
  },
];

export const messages: MessagePreview[] = [
  {
    avatarColor: "bg-black text-orange-500",
    id: "salem-entertainment",
    initials: "S",
    name: "Salem Entertainment",
    preview: "We prefer to interview with you. Thank you fo...",
    unread: 2,
  },
  {
    avatarColor: "bg-slate-200 text-slate-900",
    id: "alem-koskanay",
    initials: "A",
    name: "Alem Koskanay",
    preview: "Hi! Let's do a collab and make a social video.",
    unread: 1,
  },
];

export const applications: Application[] = [
  {
    company: "Salem Entertainment",
    history: [
      { label: "Interviewed", time: "Just Now" },
      { label: "Applied", time: "1 days ago" },
    ],
    id: "salem-uiux",
    role: "UI/UX Designer",
    status: "Interviewed",
  },
];

export const filterPills = [
  "All",
  "Applied",
  "Under Review",
  "Interviewed",
  "Accepted",
  "Rejected",
];

export const statusSummary = [
  { color: "bg-[#0B63E5]", label: "Total job", value: 2 },
  { color: "bg-amber-400", label: "Under Review", value: 2 },
  { color: "bg-emerald-400", label: "Accepted", value: 0 },
  { color: "bg-rose-400", label: "Rejected", value: 0 },
];

export const profileAvatar =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=85";

export const notificationIcon = Bell;
export const filterIcon = SlidersHorizontal;
