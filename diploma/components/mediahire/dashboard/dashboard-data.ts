import {
  Bell,
  Bookmark,
  Camera,
  Compass,
  Heart,
  LayoutGrid,
  MessageCircle,
  Palette,
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
  { icon: Compass, label: "For You" },
  { icon: Heart, label: "Following" },
  { icon: LayoutGrid, label: "The best of MediaHire" },
  { icon: Palette, label: "Graphic design" },
  { icon: Camera, label: "Photography" },
  { icon: Bookmark, label: "Animation" },
];

export const dashboardProjects: DashboardProject[] = [
  {
    id: "tales-from-the-river",
    author: "Alex Fernàndez",
    image:
      "/projects/image-1.1.png",
    title: "Tales from the River",
    category: "Photography",
    tags: ["Photography"],
  },
  
  {
    id: "festival-of-light",
    author: "Dimesh Hasenov",
    image:
      "/projects/image-2.1.png",
    title: "festival of light",
    category: "Animation",
    tags: ["Animation"],
  },
  
  {
    id: "chubby-characters",
    author: "Aruzhan Kanatkyzy",
    image:
      "/projects/image-3.1.png",
    title: "Chubby characters",
    category: "Graphic design",
    tags: ["Graphic design"],
  },
];

export const dashboardPeople: DashboardPerson[] = [
  {
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=85",
    id: "alex-fernandez",
    name: "Alex Fernàndez",
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
    skill: "Videographer",
    views: "34k",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=85",
    id: "aruzhan-kanatkyzy",
    name: "Aruzhan Kanatkyzy",
    rating: 5,
    score: "47,6k",
    skill: "3D Artist",
    views: "110k",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=160&q=85",
    id: "aidos-kabanbay",
    name: "Aidos Kabanbay",
    rating: 4,
    score: "12,2k",
    skill: "Graphic Designer",
    views: "33,9k",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=85",
    id: "aliya-kairatkyzy",
    name: "Aliya Kairatkyzy",
    rating: 5,
    score: "67,3k",
    skill: "Film Director",
    views: "220,9k",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&q=85",
    id: "galym-korkurov",
    name: "Galym Korkurov",
    rating: 4,
    score: "57,4k",
    skill: "Photographer",
    views: "79,4k",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=85",
    id: "raim-baltabek",
    name: "Raim Baltabek",
    rating: 4,
    score: "89,4k",
    skill: "Graphic Designer",
    views: "119,9k",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=85",
    id: "artem-kirov",
    name: "Artem Kirov",
    rating: 4,
    score: "12,2k",
    skill: "Marketer",
    views: "33,9k",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=85",
    id: "milana-timurova",
    name: "Milana Timurova",
    rating: 3,
    score: "12,2k",
    skill: "Marketer",
    views: "33,9k",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=160&q=85",
    id: "nazym-garaeva",
    name: "Nazym Garaeva",
    rating: 4,
    score: "12,2k",
    skill: "Photographer",
    views: "33,9k",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=85",
    id: "kanatbek-didar",
    name: "Kanatbek Didar",
    rating: 3,
    score: "12,2k",
    skill: "Graphic Designer",
    views: "33,9k",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=85",
    id: "vadim-burnagaz",
    name: "Vadim Burnagaz",
    rating: 5,
    score: "121,2k",
    skill: "Screenwriter",
    views: "206,3k",
  },
];

export const socialLinks = [
  { icon: MessageCircle, label: "Instagram" },
  { icon: Users, label: "Facebook" },
  { icon: Send, label: "Twitter" },
  { icon: Bell, label: "Updates" },
];
