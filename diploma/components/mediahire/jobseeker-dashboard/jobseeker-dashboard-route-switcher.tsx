"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import {
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  Globe2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Search,
  Star,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";

import {
  getStoredJobSeekerProfile,
  jobSeekerProfileStorageKey,
} from "../account-settings/profile-store";
import { supabase } from "@/lib/supabase-client";
import { SaveProfileButton } from "@/components/mediahire/save-profile-button";

const accountAccessKey = "mediahire.jobseeker.accountAccess";

type ProfileRow = {
  avatar_url?: string | null;
  bio?: string | null;
  city?: string | null;
  country?: string | null;
  email?: string | null;
  expected_salary?: number | string | null;
  first_name?: string | null;
  full_name?: string | null;
  job_title?: string | null;
  last_name?: string | null;
  location?: string | null;
  minimum_salary?: number | string | null;
  payment_period?: string | null;
  postal_code?: string | null;
  resume_url?: string | null;
  skills?: string | null;
};

function profileFullName(profile: ProfileRow) {
  return (
    profile.full_name ||
    [profile.first_name, profile.last_name].filter(Boolean).join(" ") ||
    ""
  );
}

function profileLocation(profile: ProfileRow) {
  return (
    profile.location ||
    [profile.city, profile.country].filter(Boolean).join(", ") ||
    ""
  );
}

type SpecialistPortfolioItem = {
  category: string;
  href: string;
  image: string;
  title: string;
};

type SpecialistReview = {
  author: string;
  role: string;
  rating: number;
  text: string;
};

type SpecialistProfile = {
  avatar: string;
  email: string;
  experience: string;
  id: string;
  location: string;
  name: string;
  phone?: string;
  portfolio: SpecialistPortfolioItem[];
  portfolioLink?: string;
  reviews: SpecialistReview[];
  role: string;
  skills: string[];
  software: string[];
  status: string;
};

const specialistProfiles: Record<string, SpecialistProfile> = {
  "dimash-hasenov": {
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=85",
    email: "dimashasenov@gmail.com",
    experience: "3+ years of experience",
    id: "dimash-hasenov",
    location: "Astana, Kazakhstan",
    name: "Dimash Hasenov",
    phone: "No phone added",
    portfolio: [
      {
        category: "3D Animation",
        href: "/home/jobseeker/work/chubby-characters",
        image: "/projects/image-3.1.png",
        title: "Chubby Characters",
      },
    ],
    portfolioLink: "Portfolio available",
    reviews: [
      {
        author: "Salem Entertainment",
        rating: 5,
        role: "Creative Studio",
        text: "Dimash delivered a polished 3D animation concept with strong visual rhythm and clear storytelling.",
      },
    ],
    role: "3D Animator",
    skills: [
      "3D animation",
      "motion design",
      "visual storytelling",
      "creative direction",
      "content creation",
    ],
    software: ["Blender", "Adobe After Effects", "Adobe Premiere Pro"],
    status: "Available for Freelance",
  },

  "alex-fernandez": {
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=85",
    email: "alexfernandezdp@gmail.com",
    experience: "3+ years of experience",
    id: "alex-fernandez",
    location: "Madrid, Spain",
    name: "Alex Fernández",
    phone: "No phone added",
    portfolio: [
      {
        category: "Photography",
        href: "/home/jobseeker/work/tales-from-the-river",
        image: "/projects/image-1.1.png",
        title: "Tales from the River",
      },
      {
        category: "Photography",
        href: "/home/jobseeker/work/festival-of-light",
        image: "/projects/image-2.1.png",
        title: "Festival of Light",
      },
    ],
    portfolioLink: "Portfolio available",
    reviews: [
      {
        author: "Alem Koskanay",
        rating: 5,
        role: "Content Producer",
        text: "Alex has a calm cinematic eye and makes every location feel considered, warm, and precise.",
      },
    ],
    role: "Photographer / Cinematographer",
    skills: [
      "photography & videography",
      "color grading",
      "retouching",
      "video editing",
      "creative direction",
      "content creation",
    ],
    software: ["Adobe Photoshop", "Adobe Lightroom", "Adobe Premiere Pro"],
    status: "Available for Freelance",
  },
};

const peopleProfileLinks = new Map([
  ["alex fernández", "/home/jobseeker/people/alex-fernandez"],
  ["alex fernàndez", "/home/jobseeker/people/alex-fernandez"],
  ["alex fernandez", "/home/jobseeker/people/alex-fernandez"],
  ["dimash hasenov", "/home/jobseeker/people/dimash-hasenov"],
]);

const hiddenPeopleNames = [
  "Aruzhan Kanatkyzy",
  "Aidos Kabanbay",
  "Aliya Kairatkyzy",
  "Galym Korkurov",
  "Raim Baltabek",
  "Artem Kirov",
  "Milana Timurova",
  "Nazym Garaeva",
  "Kanatbek Didar",
  "Vadim Burnagaz",
];

function normalizePersonName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function MediaHireProfileNavbar() {
  const navLinks = [
    { href: "/home/jobseeker", label: "Home" },
    { href: "/search-job", label: "Search Job" },
    { href: "/profile/jobseeker", label: "My Profile" },
    { href: "/community", label: "Community" },
  ];

  return (
    <nav className="relative z-20 mx-auto flex min-h-[68px] w-[min(1320px,calc(100%-32px))] items-center justify-between gap-6 rounded-2xl border border-white/70 bg-white px-7 py-3 shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
      <Link
        className="shrink-0 text-xl font-black tracking-tight"
        href="/home/jobseeker"
      >
        <span className="text-[#0B63E5]">Media</span>
        <span className="text-slate-950">Hire</span>
      </Link>

      <div className="hidden items-center gap-8 lg:flex">
        {navLinks.map((link) => (
          <Link
            className={`text-sm font-black transition hover:text-[#0B63E5] ${
              link.label === "Home" ? "text-[#0B63E5]" : "text-slate-600"
            }`}
            href={link.href}
            key={link.label}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-4 text-slate-600">
        <button
          aria-label="Search"
          className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-[#eef4ff] hover:text-[#0B63E5]"
          type="button"
        >
          <Search size={20} />
        </button>
        <button
          aria-label="Notifications"
          className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-[#eef4ff] hover:text-[#0B63E5]"
          type="button"
        >
          <Bell size={19} />
        </button>
        <span className="hidden h-9 w-px bg-slate-200 sm:block" />
        <span className="hidden text-sm font-black text-slate-600 sm:block">
          Job Seeker
        </span>
        <div className="flex items-center gap-2">
          <span className="relative block h-11 w-11 overflow-hidden rounded-full ring-2 ring-white">
            <img
              alt="Dana Muhtarova"
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=85"
            />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
          </span>
          <span className="hidden max-w-[150px] text-sm font-black text-slate-700 md:block">
            Dana Muhtarova
          </span>
          <ChevronDown className="text-[#0B63E5]" size={16} />
        </div>
      </div>
    </nav>
  );
}

function SpecialistFooter() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-[min(1320px,calc(100%-32px))] gap-10 py-12 md:grid-cols-4">
        <div>
          <h3 className="text-3xl font-black tracking-tight">
            <span className="text-[#0B63E5]">Media</span>
            <span className="text-slate-950">Hire</span>
          </h3>
          <p className="mt-4 max-w-xs text-sm font-medium leading-6 text-slate-500">
            MediaHire is a smart job search and recruitment platform that connects
            job seekers with employers. With fast search, professional resume
            building, and intelligent matching, hiring and job hunting stay simple.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-950">Our services</h4>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-500">
            <Link href="/search-job">Find job</Link>
            <Link href="/account/jobseeker/resume">Create resume</Link>
            <Link href="/search-job">Search company</Link>
            <Link href="#pricing">Pricing Plan</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-950">Links</h4>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-500">
            <Link href="#blog">Blog</Link>
            <Link href="#help">Help center</Link>
            <Link href="#contact">Contact us</Link>
            <Link href="#privacy">Privacy Policy</Link>
            <Link href="#about">About us</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-950">Contact Us</h4>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-500">
            <span>Instagram  WhatsApp</span>
            <span>1500 Marilla St, Dallas, TX 75201</span>
            <span>1(647)558-5560</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SpecialistSidebar({ profile }: { profile: SpecialistProfile }) {
  const contactRows = [
    { icon: MapPin, label: profile.location },
    { icon: UserRound, label: profile.role },
    { icon: BriefcaseBusiness, label: profile.experience },
    { icon: Mail, label: profile.email },
    { icon: Phone, label: profile.phone || "No phone added" },
    { icon: Globe2, label: profile.portfolioLink || "Portfolio not added" },
  ];

  return (
    <motion.aside
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[2rem] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] ring-1 ring-slate-100"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <img
        alt={profile.name}
        className="h-32 w-32 rounded-3xl border-[6px] border-white object-cover shadow-[0_18px_48px_rgba(15,23,42,0.18)]"
        src={profile.avatar}
      />
      <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-950">
        {profile.name}
      </h1>
      <p className="mt-2 text-sm font-bold text-slate-500">{profile.status}</p>

      <div className="mt-7 grid gap-4">
        {contactRows.map((row) => (
          <div className="flex items-center gap-3" key={row.label}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eef4ff] text-[#0B63E5]">
              <row.icon size={18} />
            </span>
            <span className="text-sm font-black leading-5 text-slate-600">
              {row.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-7 grid gap-3">
        <SaveProfileButton profileId={profile.id} />
        <motion.button
          className="flex h-11 items-center justify-center gap-2 rounded-full border border-[#0B63E5] bg-white text-sm font-black text-slate-700 transition hover:bg-[#eef4ff] hover:text-[#0B63E5]"
          type="button"
          whileTap={{ scale: 0.98 }}
        >
          <MessageSquare size={17} />
          Message
        </motion.button>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-black text-slate-950">Skills</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.skills.length ? (
            profile.skills.map((skill) => (
              <span
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-600"
                key={skill}
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-sm font-semibold text-slate-500">
              No skills added
            </span>
          )}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-black text-slate-950">Software</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.software.length ? (
            profile.software.map((software) => (
              <span
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-600"
                key={software}
              >
                {software}
              </span>
            ))
          ) : (
            <span className="text-sm font-semibold text-slate-500">
              No software added
            </span>
          )}
        </div>
      </section>
    </motion.aside>
  );
}

function SpecialistPortfolioCard({
  item,
  profileName,
}: {
  item: SpecialistPortfolioItem;
  profileName: string;
}) {
  return (
    <Link href={item.href} className="block cursor-pointer">
      <motion.article
        className="group overflow-hidden rounded-[1.7rem] bg-white p-4 text-left shadow-[0_18px_48px_rgba(15,23,42,0.07)] ring-1 ring-slate-100 transition focus:outline-none focus:ring-4 focus:ring-[#0B63E5]/20"
        transition={{ duration: 0.2 }}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="overflow-hidden rounded-[1.25rem] bg-slate-100">
          <img
            alt={item.title}
            className="h-[260px] w-full object-cover transition duration-500 group-hover:scale-105 lg:h-[300px]"
            loading="lazy"
            src={item.image}
          />
        </div>

        <h3 className="mt-5 text-xl font-black leading-tight text-slate-950">
          {item.title}
        </h3>

        <p className="mt-2 text-base font-black text-slate-500">
          {profileName}
        </p>

        <span className="mt-4 inline-flex rounded-full bg-[#eef4ff] px-4 py-2 text-sm font-black text-[#0B63E5]">
          {item.category}
        </span>
      </motion.article>
    </Link>
  );
}

function SpecialistReviews({ reviews }: { reviews: SpecialistReview[] }) {
  if (!reviews.length) {
    return (
      <div className="rounded-[1.7rem] bg-white p-8 text-center shadow-[0_18px_48px_rgba(15,23,42,0.07)] ring-1 ring-slate-100">
        <p className="text-lg font-black text-slate-950">No reviews yet</p>
        <p className="mt-2 text-sm font-semibold text-slate-500">
          Reviews will appear here after completed collaborations.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {reviews.map((review) => (
        <motion.article
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[1.7rem] bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.07)] ring-1 ring-slate-100"
          initial={{ opacity: 0, y: 12 }}
          key={review.author}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-slate-950">
                {review.author}
              </h3>
              <p className="text-sm font-semibold text-slate-500">
                {review.role}
              </p>
            </div>
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  fill={index < review.rating ? "currentColor" : "none"}
                  key={index}
                  size={18}
                />
              ))}
            </div>
          </div>
          <p className="mt-4 text-base font-medium leading-7 text-slate-600">
            {review.text}
          </p>
        </motion.article>
      ))}
    </div>
  );
}

export function SpecialistProfilePage({
  profile,
  profileId,
}: {
  profile?: SpecialistProfile;
  profileId?: string;
}) {
  const [activeTab, setActiveTab] = useState<"portfolio" | "reviews">(
    "portfolio",
  );

  const selectedProfile =
    profile || (profileId ? specialistProfiles[profileId] : undefined);

  if (!selectedProfile) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] px-5 py-16">
        <div className="mx-auto max-w-xl rounded-[2rem] bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-black text-slate-950">
            Profile not found
          </h1>
          <p className="mt-3 text-sm font-semibold text-slate-500">
            This specialist profile does not exist.
          </p>
          <Link
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#0B63E5] px-6 text-sm font-black text-white"
            href="/home/jobseeker"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <section className="relative min-h-[360px] overflow-hidden bg-[#0B63E5]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-95"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0.18), rgba(11,99,229,0.18)), url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1800&q=85')",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.34),transparent_25%),linear-gradient(120deg,rgba(255,255,255,0.18),rgba(17,24,39,0.16))]" />
        <div className="relative z-10 pt-10">
          <MediaHireProfileNavbar />
        </div>
      </section>

      <section className="mx-auto -mt-20 grid w-[min(1320px,calc(100%-32px))] grid-cols-1 gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <SpecialistSidebar profile={selectedProfile} />

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="min-w-0 rounded-[2rem] bg-white/70 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.06)] ring-1 ring-white/80 backdrop-blur md:p-7"
          initial={{ opacity: 0, y: 18 }}
          transition={{ delay: 0.08, duration: 0.45, ease: "easeOut" }}
        >
          <div className="relative z-10 flex items-center gap-10 border-b border-slate-200">
            {(["portfolio", "reviews"] as const).map((tab) => (
              <button
                className={`relative pb-4 text-base font-black transition ${
                  activeTab === tab ? "text-[#0B63E5]" : "text-slate-400"
                }`}
                key={tab}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {tab === "portfolio" ? "Portfolio" : "Reviews"}
                {activeTab === tab ? (
                  <motion.span
                    className="absolute bottom-[-1px] left-0 h-[3px] w-full rounded-full bg-[#0B63E5]"
                    layoutId="specialist-profile-tab"
                  />
                ) : null}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {activeTab === "portfolio" ? (
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                {selectedProfile.portfolio.map((item) => (
                  <SpecialistPortfolioCard
                    item={item}
                    key={item.title}
                    profileName={selectedProfile.name}
                  />
                ))}
              </div>
            ) : (
              <SpecialistReviews reviews={selectedProfile.reviews} />
            )}
          </div>
        </motion.div>
      </section>

      <SpecialistFooter />
    </main>
  );
}

export function JobSeekerDashboardRouteSwitcher({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isSpecialistProfilePath =
    pathname.startsWith("/home/jobseeker/people/") ||
    pathname.startsWith("/home/jobseeker/specialists/");

  useEffect(() => {
    const shouldNormalize =
      pathname.startsWith("/home/jobseeker") ||
      pathname.startsWith("/search-job") ||
      pathname.startsWith("/community") ||
      pathname.startsWith("/profile/") ||
      pathname.startsWith("/account/jobseeker");
    const isProfilePage = pathname.startsWith("/profile/");
    const isPeopleProfilePage = pathname.startsWith("/home/jobseeker/people/");
    const styleId = "mediahire-consistent-ui";
    let styleTag = document.getElementById(styleId) as HTMLStyleElement | null;

    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      styleTag.textContent = `
        body[data-mediahire-normalized="true"] {
          background: #f5f7fb;
        }
        body[data-mediahire-normalized="true"] :where(button, input, select, textarea) {
          transition: all 0.2s ease;
        }
        body[data-mediahire-normalized="true"] :where(button) {
          font-size: 0.95rem;
          font-weight: 700;
        }
        body[data-mediahire-profile-view="true"] main {
          max-width: 1500px !important;
          padding-inline: clamp(16px, 2.4vw, 32px) !important;
          padding-bottom: 48px !important;
        }
        body[data-mediahire-profile-view="true"] [data-mediahire-hero="true"] {
          min-height: 180px !important;
          max-height: 210px !important;
          height: clamp(180px, 24vw, 210px) !important;
          border-radius: 24px !important;
          overflow: hidden !important;
        }
        body[data-mediahire-profile-view="true"] [data-mediahire-hero="true"] img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }
        body[data-mediahire-profile-view="true"] [data-mediahire-profile-avatar-wrap="true"] {
          width: clamp(120px, 10.5vw, 140px) !important;
          height: clamp(120px, 10.5vw, 140px) !important;
          border-radius: 22px !important;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.12) !important;
          overflow: hidden !important;
        }
        body[data-mediahire-profile-view="true"] [data-mediahire-profile-avatar="true"] {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          border-radius: inherit !important;
        }
        body[data-mediahire-profile-view="true"] h1 {
          font-size: clamp(2rem, 3vw, 2.85rem) !important;
          line-height: 1.08 !important;
        }
        body[data-mediahire-profile-view="true"] h2 {
          font-size: clamp(1.3rem, 2vw, 1.9rem) !important;
          line-height: 1.2 !important;
        }
        body[data-mediahire-profile-view="true"] p {
          line-height: 1.5;
        }
        body[data-mediahire-profile-view="true"] [data-mediahire-portfolio-grid="true"] {
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          gap: clamp(14px, 2vw, 22px) !important;
        }
        body[data-mediahire-people-profile-view="true"] main {
          width: 100% !important;
          max-width: none !important;
          margin-inline: 0 !important;
          padding-inline: 0 !important;
          padding-bottom: 52px !important;
        }
        body[data-mediahire-people-profile-view="true"] [data-mediahire-people-layout="true"] {
          display: grid !important;
          grid-template-columns: minmax(250px, 320px) minmax(0, 1fr) !important;
          align-items: start !important;
          gap: clamp(18px, 2.2vw, 32px) !important;
          width: min(1500px, 100%) !important;
          margin-inline: auto !important;
          padding-inline: clamp(16px, 2.4vw, 32px) !important;
        }
        body[data-mediahire-people-profile-view="true"] [data-mediahire-people-sidebar="true"] {
          position: sticky !important;
          top: 18px !important;
        }
        body[data-mediahire-people-profile-view="true"] [data-mediahire-portfolio-grid="true"] {
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          gap: clamp(14px, 2vw, 22px) !important;
        }
        body[data-mediahire-people-profile-view="true"] :where(h1) {
          font-size: clamp(1.95rem, 2.8vw, 2.7rem) !important;
          line-height: 1.1 !important;
        }
        body[data-mediahire-people-profile-view="true"] :where(h2) {
          font-size: clamp(1.2rem, 1.9vw, 1.8rem) !important;
        }
        @media (max-width: 768px) {
          body[data-mediahire-profile-view="true"] [data-mediahire-portfolio-grid="true"] {
            grid-template-columns: minmax(0, 1fr) !important;
          }
          body[data-mediahire-profile-view="true"] [data-mediahire-profile-avatar-wrap="true"] {
            width: 120px !important;
            height: 120px !important;
          }
          body[data-mediahire-people-profile-view="true"] [data-mediahire-people-layout="true"] {
            grid-template-columns: minmax(0, 1fr) !important;
            width: 100% !important;
            padding-inline: 16px !important;
          }
          body[data-mediahire-people-profile-view="true"] [data-mediahire-people-sidebar="true"] {
            position: static !important;
          }
          body[data-mediahire-people-profile-view="true"] [data-mediahire-portfolio-grid="true"] {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `;
      document.head.appendChild(styleTag);
    }

    if (shouldNormalize) {
      document.body.dataset.mediahireNormalized = "true";
    } else {
      delete document.body.dataset.mediahireNormalized;
    }

    if (isProfilePage) {
      document.body.dataset.mediahireProfileView = "true";
    } else {
      delete document.body.dataset.mediahireProfileView;
    }

    if (isPeopleProfilePage) {
      document.body.dataset.mediahirePeopleProfileView = "true";
    } else {
      delete document.body.dataset.mediahirePeopleProfileView;
    }

    return () => {
      if (!shouldNormalize) {
        delete document.body.dataset.mediahireNormalized;
      }
      if (!isProfilePage) {
        delete document.body.dataset.mediahireProfileView;
      }
      if (!isPeopleProfilePage) {
        delete document.body.dataset.mediahirePeopleProfileView;
      }
    };
  }, [pathname]);

  useEffect(() => {
    if (isSpecialistProfilePath) {
      return;
    }

    const isAnyProfilePath =
      pathname.startsWith("/profile/") ||
      pathname.startsWith("/home/jobseeker/people/");
    if (!isAnyProfilePath) {
      return;
    }

    let frame = 0;

    const applyProfileElementSizing = () => {
      const main = document.querySelector("main");

      if (!main) {
        return;
      }

      const elements = Array.from(
        main.querySelectorAll<HTMLElement>("section, header, article, div"),
      );
      const images = Array.from(main.querySelectorAll<HTMLImageElement>("img"));

      elements.forEach((element) => {
        element.removeAttribute("data-mediahire-hero");
        element.removeAttribute("data-mediahire-portfolio-grid");
        element.removeAttribute("data-mediahire-people-layout");
        element.removeAttribute("data-mediahire-people-sidebar");
      });
      images.forEach((image) => {
        image.removeAttribute("data-mediahire-profile-avatar");
        image.parentElement?.removeAttribute("data-mediahire-profile-avatar-wrap");
      });

      const heroCandidate = elements.find((element) => {
        const rect = element.getBoundingClientRect();
        const topBoundary = window.innerHeight * 0.55;
        const minWidth = window.innerWidth * 0.62;
        return rect.top < topBoundary && rect.width > minWidth && rect.height > 220;
      });

      if (heroCandidate) {
        heroCandidate.setAttribute("data-mediahire-hero", "true");
      }

      const avatarCandidate = images.find((image) => {
        const rect = image.getBoundingClientRect();
        const src = image.getAttribute("src")?.toLowerCase() || "";
        const alt = image.getAttribute("alt")?.toLowerCase() || "";
        const likelyAvatar =
          alt.includes("avatar") ||
          alt.includes("profile") ||
          src.includes("avatar") ||
          src.includes("profile") ||
          src.includes("dana");
        return (
          likelyAvatar &&
          rect.width >= 56 &&
          rect.width <= 220 &&
          rect.height >= 56 &&
          rect.height <= 220 &&
          rect.left < window.innerWidth * 0.46
        );
      });

      if (avatarCandidate) {
        avatarCandidate.setAttribute("data-mediahire-profile-avatar", "true");
        avatarCandidate.parentElement?.setAttribute(
          "data-mediahire-profile-avatar-wrap",
          "true",
        );
      }

      const portfolioGridCandidate = elements.find((element) => {
        const imageCount = element.querySelectorAll("img").length;
        const linkCount = element.querySelectorAll("a").length;
        return imageCount >= 6 && linkCount >= 4;
      });

      if (portfolioGridCandidate) {
        portfolioGridCandidate.setAttribute(
          "data-mediahire-portfolio-grid",
          "true",
        );
      }

      if (pathname.startsWith("/home/jobseeker/people/")) {
        const avatarWrap = avatarCandidate?.parentElement as HTMLElement | null;
        const portfolioGrid = portfolioGridCandidate as HTMLElement | undefined;

        if (avatarWrap && portfolioGrid) {
          let layoutCandidate: HTMLElement | null = avatarWrap;

          while (layoutCandidate && !layoutCandidate.contains(portfolioGrid)) {
            layoutCandidate = layoutCandidate.parentElement;
          }

          if (layoutCandidate) {
            layoutCandidate.setAttribute("data-mediahire-people-layout", "true");

            const sidebarCandidate = Array.from(layoutCandidate.children).find(
              (child) => (child as HTMLElement).contains(avatarWrap),
            ) as HTMLElement | undefined;

            sidebarCandidate?.setAttribute(
              "data-mediahire-people-sidebar",
              "true",
            );
          }
        }
      }
    };

    const scheduleApply = () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      frame = requestAnimationFrame(applyProfileElementSizing);
    };

    scheduleApply();

    const observer = new MutationObserver(scheduleApply);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    window.addEventListener("resize", scheduleApply);

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      observer.disconnect();
      window.removeEventListener("resize", scheduleApply);
    };
  }, [isSpecialistProfilePath, pathname]);

  useEffect(() => {
    if (isSpecialistProfilePath) {
      return;
    }

    const isAnyProfilePath =
      pathname.startsWith("/profile/") ||
      pathname.startsWith("/home/jobseeker/people/");

    if (!isAnyProfilePath) {
      return;
    }

    const styleId = "mediahire-profile-tabs";
    let styleTag = document.getElementById(styleId) as HTMLStyleElement | null;

    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      styleTag.textContent = `
        [data-mediahire-tab-control="true"] {
          cursor: pointer;
          user-select: none;
        }
        [data-mediahire-tab-control="true"][data-active="true"] {
          color: #2563ff !important;
        }
        [data-mediahire-tab-control="true"][data-active="false"] {
          color: #6b7280 !important;
        }
        [data-mediahire-reviews-panel="true"] {
          display: none;
        }
        [data-mediahire-tab-root="true"][data-active-tab="reviews"] [data-mediahire-reviews-panel="true"] {
          display: block;
        }
        [data-mediahire-tab-root="true"][data-active-tab="reviews"] [data-mediahire-portfolio-panel="true"] {
          display: none;
        }
      `;
      document.head.appendChild(styleTag);
    }

    let frame = 0;

    const applyTabs = () => {
      const allElements = Array.from(document.querySelectorAll<HTMLElement>("*"));
      const portfolioLabel = allElements.find(
        (element) =>
          element.textContent?.trim().toLowerCase() === "portfolio" &&
          element.getBoundingClientRect().top > 120,
      );
      const reviewsLabel = allElements.find(
        (element) =>
          element.textContent?.trim().toLowerCase() === "reviews" &&
          element.getBoundingClientRect().top > 120,
      );

      if (!portfolioLabel || !reviewsLabel) {
        return;
      }

      let tabRoot: HTMLElement | null = portfolioLabel.parentElement;
      while (tabRoot && !tabRoot.contains(reviewsLabel)) {
        tabRoot = tabRoot.parentElement;
      }

      if (!tabRoot) {
        return;
      }

      tabRoot.setAttribute("data-mediahire-tab-root", "true");
      if (!tabRoot.dataset.activeTab) {
        tabRoot.dataset.activeTab = "portfolio";
      }

      const tabControls: HTMLElement[] = [portfolioLabel, reviewsLabel];
      tabControls.forEach((tabControl, index) => {
        tabControl.setAttribute("data-mediahire-tab-control", "true");
        tabControl.setAttribute("role", "button");
        tabControl.setAttribute("tabindex", "0");
        tabControl.dataset.active =
          tabRoot?.dataset.activeTab === (index === 0 ? "portfolio" : "reviews")
            ? "true"
            : "false";
      });

      const portfolioPanel =
        tabRoot
          .querySelector<HTMLElement>("[data-mediahire-portfolio-grid='true']")
          ?.closest<HTMLElement>("section, article, div") || null;

      if (!portfolioPanel) {
        return;
      }

      portfolioPanel.setAttribute("data-mediahire-portfolio-panel", "true");

      let reviewsPanel =
        tabRoot.querySelector<HTMLElement>(
          "[data-mediahire-reviews-panel='true']",
        ) || null;

      if (!reviewsPanel) {
        reviewsPanel = document.createElement("section");
        reviewsPanel.setAttribute("data-mediahire-reviews-panel", "true");
        reviewsPanel.className =
          "mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm";
        reviewsPanel.innerHTML = `
          <h3 class="text-lg font-black text-slate-900">Reviews</h3>
          <p class="mt-3 text-sm font-semibold text-slate-500">No reviews yet</p>
        `;
        portfolioPanel.insertAdjacentElement("afterend", reviewsPanel);
      }

      const setActiveTab = (tab: "portfolio" | "reviews") => {
        tabRoot!.dataset.activeTab = tab;
        portfolioLabel.dataset.active = tab === "portfolio" ? "true" : "false";
        reviewsLabel.dataset.active = tab === "reviews" ? "true" : "false";
      };

      if (!portfolioLabel.dataset.mediahireTabBound) {
        portfolioLabel.dataset.mediahireTabBound = "true";
        portfolioLabel.addEventListener("click", () =>
          setActiveTab("portfolio"),
        );
        portfolioLabel.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setActiveTab("portfolio");
          }
        });
      }

      if (!reviewsLabel.dataset.mediahireTabBound) {
        reviewsLabel.dataset.mediahireTabBound = "true";
        reviewsLabel.addEventListener("click", () => setActiveTab("reviews"));
        reviewsLabel.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setActiveTab("reviews");
          }
        });
      }
    };

    const scheduleApply = () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      frame = requestAnimationFrame(applyTabs);
    };

    scheduleApply();

    const observer = new MutationObserver(scheduleApply);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      observer.disconnect();
    };
  }, [isSpecialistProfilePath, pathname]);

  useEffect(() => {
    function replaceTextNode(node: Node) {
      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          child.textContent =
            child.textContent?.replace("My Profile", "Account") ?? "";
          return;
        }

        replaceTextNode(child);
      });
    }

    function renameDropdownProfileItem() {
      const controls = document.querySelectorAll("a, button");

      controls.forEach((control) => {
        if (control.textContent?.trim() === "My Profile") {
          const isMainNav = Boolean(control.getAttribute("href"));

          if (!isMainNav) {
            replaceTextNode(control);
          }
        }
      });
    }

    renameDropdownProfileItem();

    const observer = new MutationObserver(renameDropdownProfileItem);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleDropdownProfileClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const control = target.closest("a, button");
      const label = control?.textContent?.trim();

      if (label === "Home") {
        event.preventDefault();
        router.push("/home/jobseeker");
      }

      if (label === "Search Job") {
        event.preventDefault();
        router.push("/search-job");
      }

      if (label === "Community") {
        event.preventDefault();
        router.push("/community");
      }

      if (label === "Dashboard") {
        event.preventDefault();
        router.push("/account/jobseeker");
      }

      if (label === "My Resume") {
        event.preventDefault();
        router.push("/account/jobseeker/resume");
      }

      if (label === "My Profile") {
        event.preventDefault();
        if (!control?.getAttribute("href")) {
          window.sessionStorage.setItem(accountAccessKey, "true");
          router.push("/account/jobseeker");
          return;
        }

        router.push("/profile/jobseeker");
      }

      if (label === "Account") {
        event.preventDefault();
        window.sessionStorage.setItem(accountAccessKey, "true");
        router.push("/account/jobseeker");
      }

      if (label === "Settings") {
        event.preventDefault();
        router.push("/settings/jobseeker");
      }

      if (label === "Account Setting") {
        event.preventDefault();
        router.push("/account/jobseeker/settings");
      }

      if (label === "Logout" || label === "Log out") {
        event.preventDefault();
        window.sessionStorage.removeItem(accountAccessKey);
        void supabase.auth.signOut().finally(() => {
          router.replace("/");
        });
      }
    }

    document.addEventListener("click", handleDropdownProfileClick);

    return () => {
      document.removeEventListener("click", handleDropdownProfileClick);
    };
  }, [router]);

  useEffect(() => {
    if (pathname !== "/dashboard/jobseeker") {
      return;
    }

    const isDashboardRequestedFromMenu =
      window.sessionStorage.getItem(accountAccessKey) === "true";

    if (isDashboardRequestedFromMenu) {
      router.replace("/account/jobseeker");
      return;
    }

    router.replace("/home/jobseeker");
  }, [pathname, router]);

  useEffect(() => {
    if (pathname !== "/home/jobseeker") {
      return;
    }

    function findPeopleCard(element: HTMLElement) {
      let current: HTMLElement | null = element;

      for (let depth = 0; current && depth < 8; depth += 1) {
        const text = current.textContent || "";
        const rect = current.getBoundingClientRect();
        const looksLikePeopleCard =
          text.includes("Message") ||
          text.includes("Freelance") ||
          (text.includes("score") && text.includes("views"));

        if (looksLikePeopleCard && rect.width > 120 && rect.height > 120) {
          return current;
        }

        current = current.parentElement;
      }

      return element.closest<HTMLElement>("article, a, button, li, div");
    }

    function applyPeopleListRules() {
      const allElements = Array.from(document.querySelectorAll<HTMLElement>("*"));

      allElements.forEach((element) => {
        const label = element.textContent?.trim() || "";
        const normalized = normalizePersonName(label);
        const href = peopleProfileLinks.get(normalized);

        if (href) {
          const card = findPeopleCard(element);

          if (card) {
            card.dataset.mediahirePersonCard = "true";
            card.dataset.mediahirePersonHref = href;
            card.style.cursor = "pointer";
            card.style.pointerEvents = "auto";
          }
        }
      });

      hiddenPeopleNames.forEach((name) => {
        const hiddenName = normalizePersonName(name);

        allElements.forEach((element) => {
          if (normalizePersonName(element.textContent || "") !== hiddenName) {
            return;
          }

          const card = findPeopleCard(element);

          if (card) {
            card.dataset.mediahireHiddenPersonCard = "true";
            card.style.display = "none";
          }
        });
      });
    }

    function handlePeopleCardClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const card = target.closest<HTMLElement>(
        "[data-mediahire-person-card='true']",
      );
      const href = card?.dataset.mediahirePersonHref;

      if (!href) {
        return;
      }

      event.preventDefault();
      router.push(href);
    }

    applyPeopleListRules();

    const observer = new MutationObserver(applyPeopleListRules);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    document.addEventListener("click", handlePeopleCardClick, true);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", handlePeopleCardClick, true);
      document
        .querySelectorAll<HTMLElement>(
          "[data-mediahire-person-card='true'], [data-mediahire-hidden-person-card='true']",
        )
        .forEach((element) => {
          element.style.cursor = "";
          element.style.display = "";
          element.style.pointerEvents = "";
          delete element.dataset.mediahirePersonCard;
          delete element.dataset.mediahirePersonHref;
          delete element.dataset.mediahireHiddenPersonCard;
        });
    };
  }, [pathname, router]);

  useEffect(() => {
    const shouldHydrate =
      pathname.startsWith("/home/jobseeker") ||
      pathname.startsWith("/search-job") ||
      pathname.startsWith("/community") ||
      pathname.startsWith("/profile/jobseeker") ||
      pathname.startsWith("/account/jobseeker") ||
      pathname.startsWith("/dashboard/jobseeker");

    if (isSpecialistProfilePath) {
      return;
    }

    if (!shouldHydrate) {
      return;
    }

    async function getProfileForHydration() {
      const fallbackProfile = getStoredJobSeekerProfile();
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        return fallbackProfile;
      }

      const { data } = await supabase
        .from("profiles")
        .select(
          "avatar_url,bio,city,country,email,expected_salary,first_name,full_name,job_title,last_name,location,payment_period,postal_code,minimum_salary,resume_url,skills",
        )
        .eq("user_id", userData.user.id)
        .maybeSingle();

      const profile = data as ProfileRow | null;
      const authEmail = userData.user.email || "";

      if (!profile) {
        return {
          ...fallbackProfile,
          email: authEmail || fallbackProfile.email,
        };
      }

      return {
        ...fallbackProfile,
        avatarPreview: profile.avatar_url || fallbackProfile.avatarPreview,
        bio: profile.bio || fallbackProfile.bio,
        city: profile.city || fallbackProfile.city,
        country: profile.country || fallbackProfile.country,
        email: profile.email || authEmail || fallbackProfile.email,
        expectedSalary:
          profile.expected_salary?.toString() ||
          profile.minimum_salary?.toString() ||
          fallbackProfile.expectedSalary,
        firstName: profile.first_name || fallbackProfile.firstName,
        fullName: profileFullName(profile) || fallbackProfile.fullName,
        jobTitle: profile.job_title || fallbackProfile.jobTitle,
        lastName: profile.last_name || fallbackProfile.lastName,
        location: profileLocation(profile) || fallbackProfile.location,
        minimumSalary:
          profile.minimum_salary?.toString() || fallbackProfile.minimumSalary,
        paymentPeriod: profile.payment_period || fallbackProfile.paymentPeriod,
        postalCode: profile.postal_code || fallbackProfile.postalCode,
        resumeUrl: profile.resume_url || fallbackProfile.resumeUrl,
        role: profile.job_title || fallbackProfile.role,
        skills: profile.skills || fallbackProfile.skills,
      };
    }

    async function hydratePublicProfile() {
      const profile = await getProfileForHydration();
      try {
        window.localStorage.setItem(
          jobSeekerProfileStorageKey,
          JSON.stringify(profile),
        );
        window.dispatchEvent(
          new CustomEvent("mediahire:jobseeker-profile-updated", {
            detail: { ...profile, source: "supabase-hydration" },
          }),
        );
      } catch {
        // Local storage can be unavailable in private browser contexts.
      }

      const replacements = new Map([
        ["Dana Muhtarova", profile.fullName],
        ["Motion & Designer", profile.role],
        ["Astana, Kazakhstan", profile.location],
        ["dana.muhtarova@gmail.com", profile.email],
        ["danamuhtarova@gmail.com", profile.email],
        ["+7 707 418 2857", profile.mobile],
      ]);

      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
      );
      let node = walker.nextNode();

      while (node) {
        const text = node.textContent?.trim();

        if (text && replacements.has(text)) {
          node.textContent = replacements.get(text) ?? text;
        }

        node = walker.nextNode();
      }

      document.querySelectorAll("input").forEach((input) => {
        const placeholder = input.getAttribute("placeholder")?.toLowerCase() || "";
        const label = input.getAttribute("aria-label")?.toLowerCase() || "";
        const name = input.getAttribute("name")?.toLowerCase() || "";
        const haystack = `${placeholder} ${label} ${name}`;

        if (!input.value && haystack.includes("first")) {
          input.value = profile.firstName;
        }

        if (!input.value && haystack.includes("last")) {
          input.value = profile.lastName;
        }

        if (!input.value && haystack.includes("email")) {
          input.value = profile.email;
        }

        if (!input.value && haystack.includes("location")) {
          input.value = profile.location;
        }

        if (!input.value && haystack.includes("postal")) {
          input.value = profile.postalCode;
        }

        if (!input.value && haystack.includes("salary")) {
          input.value = profile.expectedSalary || profile.minimumSalary;
        }
      });

      if (profile.avatarPreview) {
        document.querySelectorAll("img").forEach((image) => {
          const alt = image.getAttribute("alt") || "";
          const src = image.getAttribute("src") || "";
          const isLocalAvatar =
            src.includes("avatar") ||
            src.includes("profile") ||
            src.includes("dana");

          if (
            alt.includes("Dana") ||
            alt.includes("Muhtarova") ||
            alt.toLowerCase().includes("avatar") ||
            (alt.toLowerCase().includes("profile") && isLocalAvatar)
          ) {
            image.setAttribute("src", profile.avatarPreview);
          }
        });
      }
    }

    function handleProfileUpdate(event: Event) {
      const detail = (event as CustomEvent<{ source?: string }>).detail;

      if (detail?.source === "supabase-hydration") {
        return;
      }

      void hydratePublicProfile();
    }

    void hydratePublicProfile();

    window.addEventListener(
      "mediahire:jobseeker-profile-updated",
      handleProfileUpdate,
    );

    return () => {
      window.removeEventListener(
        "mediahire:jobseeker-profile-updated",
        handleProfileUpdate,
      );
    };
  }, [isSpecialistProfilePath, pathname]);

  if (pathname === "/dashboard/jobseeker") {
    return null;
  }

  if (isSpecialistProfilePath) {
    const slug = pathname.split("/").filter(Boolean).pop() || "";

    return <SpecialistProfilePage profile={specialistProfiles[slug]} />;
  }

  return <>{children}</>;
}