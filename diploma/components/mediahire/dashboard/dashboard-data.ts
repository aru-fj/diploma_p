import {
  Bell,
  Diamond,
  MessageCircle,
  Plus,
  Send,
  type LucideIcon,
  Users,
} from "lucide-react";

export type DashboardNavItem = {
  href: string;
  label: string;
};

export type CategoryPill = {
  icon?: LucideIcon;
  label: string;
};

export type DashboardProject = {
  id: string;
  author: string;
  image: string;
  title: string;
  category?: string;
  tags?: string[];
  profileHref: string;
};

export type DashboardPerson = {
  avatar: string;
  id: string;
  name: string;
  rating: number;
  score: string;
  skill: string;
  views: string;
};

export const dashboardNavItems: DashboardNavItem[] = [
  { href: "/dashboard/jobseeker", label: "Home" },
  { href: "/dashboard/jobseeker/search-job", label: "Search Job" },
  { href: "/dashboard/jobseeker/profile", label: "My Profile" },
  { href: "/dashboard/jobseeker/community", label: "Community" },
];

export const categoryPills: CategoryPill[] = [
  { icon: Diamond, label: "For You" },
  { icon: Plus, label: "Saved" },
  { label: "Photography" },
  { label: "3D Animation" },
];

export const dashboardProjects: DashboardProject[] = [
  {
    id: "tales-from-the-river",
    author: "Alex Fernández",
    image: "/projects/image-1.1.png",
    title: "Tales from the River",
    category: "Photography",
    tags: ["Photography"],
    profileHref: "/home/jobseeker/people/alex-fernandez",
  },
  {
    id: "festival-of-light",
    author: "Alex Fernández",
    image: "/projects/image-2.1.png",
    title: "Festival of Light",
    category: "Photography",
    tags: ["Photography"],
    profileHref: "/home/jobseeker/people/alex-fernandez",
  },
  {
    id: "chubby-characters",
    author: "Dimash Hasenov",
    image: "/projects/image-3.1.png",
    title: "Chubby Characters",
    category: "3D Animation",
    tags: ["3D Animation"],
    profileHref: "/home/jobseeker/people/dimash-hasenov",
  },
];

export const dashboardPeople: DashboardPerson[] = [
  {
    avatar:
      
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=90",
    id: "alex-fernandez",
    name: "Alex Fernández",
    rating: 4,
    score: "23,4k",
    skill: "Photographer",
    views: "50k",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=85",
    id: "dimash-hasenov",
    name: "Dimash Hasenov",
    rating: 4,
    score: "15,9k",
    skill: "3D Animator",
    views: "34k",
  },
];

export const socialLinks = [
  { icon: MessageCircle, label: "Instagram" },
  { icon: Users, label: "Facebook" },
  { icon: Send, label: "Twitter" },
  { icon: Bell, label: "Updates" },
];