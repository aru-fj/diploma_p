import {
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  CircleDollarSign,
  GraduationCap,
  Languages,
  MapPin,
  MonitorSmartphone,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

export type JobVacancy = {
  company: string;
  id: string;
  location: string;
  logoColor: string;
  logoText: string;
  posted: string;
  salary: string;
  tags: string[];
  title: string;
};

export type FilterGroup = {
  icon: LucideIcon;
  label: string;
};

export const filterGroups: FilterGroup[] = [
  { icon: SlidersHorizontal, label: "All Filters" },
  { icon: BriefcaseBusiness, label: "Active Filters" },
  { icon: Languages, label: "Work Language" },
  { icon: CalendarDays, label: "Publication date" },
  { icon: GraduationCap, label: "Education level" },
  { icon: BookOpen, label: "Job type" },
  { icon: MapPin, label: "Distance" },
  { icon: CircleDollarSign, label: "Salary (Monthly)" },
  { icon: MonitorSmartphone, label: "Work modes" },
];

const companies = [
  "Senkirt Group",
  "Rosarium Ltd",
  "Hexagon LLC",
  "Kramer-Miller",
  "Sampo Group",
  "Torp Group",
  "Schumm and Sons",
  "Ritchie LLC",
  "O'Connell-Satterfield",
  "Lubowitz PLC",
  "Fritsch, Fetty and Miller",
  "Brown and Sons",
  "Hudson Ltd",
  "Hirthe and Sons",
  "Becker-Abshire",
  "Swift-Ziemann",
  "Abernathy Ltd",
  "Cormier Group",
];

const logoColors = [
  "bg-lime-100 text-lime-700",
  "bg-sky-100 text-sky-700",
  "bg-yellow-100 text-yellow-700",
  "bg-slate-100 text-slate-700",
  "bg-cyan-100 text-cyan-700",
  "bg-rose-100 text-rose-700",
  "bg-emerald-100 text-emerald-700",
  "bg-indigo-100 text-indigo-700",
  "bg-zinc-100 text-zinc-700",
  "bg-blue-100 text-blue-700",
  "bg-orange-100 text-orange-700",
  "bg-stone-100 text-stone-700",
  "bg-teal-100 text-teal-700",
  "bg-purple-100 text-purple-700",
  "bg-black text-white",
  "bg-red-100 text-red-700",
  "bg-neutral-100 text-neutral-700",
  "bg-[#0B63E5] text-white",
];

export const jobVacancies: JobVacancy[] = companies.map((company, index) => ({
  company,
  id: company
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
  location: index % 3 === 0 ? "Astana" : index % 3 === 1 ? "Almaty" : "Shymkent",
  logoColor: logoColors[index],
  logoText: company
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase(),
  posted: index % 4 === 0 ? "1 hour ago" : `${(index % 4) + 1} hours ago`,
  salary: index % 5 === 0 ? "25$ / Month" : "25-55$ / Month",
  tags: index % 2 === 0 ? ["Full-Time", "Part-Time"] : ["Hybrid", "Full-Time"],
  title: index === 15 ? "Sales Manager" : "UI/UX Designer",
}));

export const jobPaginationItems = ["1", "2", "3", "...", "9", "10"];
