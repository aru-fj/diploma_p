import type { LucideIcon } from "lucide-react";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

export type ProfileContact = {
  href: string;
  icon: LucideIcon;
  label: string;
};

export type ProfileProject = {
  id: string;
  image: string;
  title: string;
};

export type ProfileReview = {
  id: string;
  name: string;
  rating: number;
  role: string;
  text: string;
};

export const profileUser = {
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=85",
  email: "dana.muhtarova@gmail.com",
  location: "Astana, Kazakhstan",
  name: "Dana Muhtarova",
  phone: "+7 707 418 2857",
  portfolio: "behance.net/danamuhtarova",
  profession: "Motion & Designer",
};

export const profileContacts: ProfileContact[] = [
  { href: "#", icon: MapPin, label: profileUser.location },
  { href: `mailto:${profileUser.email}`, icon: Mail, label: profileUser.email },
  { href: `tel:${profileUser.phone}`, icon: Phone, label: profileUser.phone },
  { href: "#", icon: Globe, label: profileUser.portfolio },
];

export const profileSkills = [
  "UX/UI Design",
  "Branding",
  "Photo Editing",
  "3D Design",
  "Creative Writing",
];

export const profileSoftware = [
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Figma",
  "Canva",
];

export const profileProjects: ProfileProject[] = [
  {
    id: "soz-mocktails",
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=85",
    title: "SOZ - Mocktails",
  },
  {
    id: "serneller",
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=85",
    title: "SERNELLER",
  },
  {
    id: "gourmet",
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=85",
    title: "Gourmet",
  },
  {
    id: "irmaa",
    image:
      "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&w=900&q=85",
    title: "IRMAA",
  },
  {
    id: "fertile",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=85",
    title: "Fertile",
  },
  {
    id: "everen",
    image:
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=900&q=85",
    title: "Everen",
  },
  {
    id: "vesta",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    title: "Vesta",
  },
  {
    id: "slam-burger",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
    title: "SLAM BURGER",
  },
  {
    id: "kymatio",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=900&q=85",
    title: "Kymatio",
  },
  {
    id: "packaging-design",
    image:
      "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=900&q=85",
    title: "Packaging Design",
  },
  {
    id: "book-design",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=85",
    title: "Book Design",
  },
  {
    id: "wrrst-brand",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    title: "WRRST Brand",
  },
  {
    id: "native-beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85",
    title: "Native Beauty",
  },
  {
    id: "vertice-gastrobar",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
    title: "Vertice Gastrobar",
  },
  {
    id: "fear-of-the-horse",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
    title: "Fear of the Horse",
  },
  {
    id: "isaiah",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=85",
    title: "ISAIAH",
  },
  {
    id: "gloria",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85",
    title: "Gloria",
  },
  {
    id: "derma",
    image:
      "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?auto=format&fit=crop&w=900&q=85",
    title: "DERMA",
  },
];

export const profileReviews: ProfileReview[] = [
  {
    id: "review-1",
    name: "Aruzhan Kanatkyzy",
    rating: 5,
    role: "Creative Producer",
    text: "Dana brought calm structure to a complex brand shoot. Her visual direction was sharp, fast, and easy for the whole team to follow.",
  },
  {
    id: "review-2",
    name: "Dimash Hasenov",
    rating: 5,
    role: "Videographer",
    text: "The motion concepts were polished from the first draft. Dana understands composition, rhythm, and how to make a portfolio piece feel premium.",
  },
  {
    id: "review-3",
    name: "Milana Timurova",
    rating: 4,
    role: "Marketing Lead",
    text: "We needed packaging visuals on a tight timeline and Dana delivered clean, memorable assets that worked beautifully across social media.",
  },
];
