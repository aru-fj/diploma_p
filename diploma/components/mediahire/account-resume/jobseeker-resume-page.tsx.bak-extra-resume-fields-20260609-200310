"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  CircleHelp,
  Download,
  Eye,
  FileText,
  GraduationCap,
  House,
  ImagePlus,
  Languages,
  LayoutDashboard,
  Link2,
  LogOut,
  Menu,
  PencilLine,
  Search,
  Settings,
  Upload,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import {
  fadeIn,
  fadeInUp,
  mediaHireClassNames,
  mediaHireMotion,
  slideInLeft,
} from "../ui/design-system";
import {
  defaultJobSeekerProfile,
  getStoredJobSeekerProfile,
  getStoredJobSeekerProfileForEmail,
  saveJobSeekerProfile,
  setActiveJobSeekerEmail,
  type JobSeekerProfile,
} from "../account-settings/profile-store";
import { JobSeekerAvatar } from "../jobseeker-avatar-placeholder";
import { syncStoredProjectAuthorsForProfile } from "../projects-data";
import { supabase } from "@/lib/supabase-client";
import { upsertProfile } from "../supabase-auth/auth-service";
import {
  defaultResumeData,
  getResumeData,
  getResumeDataForEmail,
  updateResumeDataForEmail,
  updateResumeData,
  type ResumeData,
} from "../shared/user-state";

type SidebarItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

type PersonalInfo = {
  label: string;
  name: keyof JobSeekerProfile;
  inputMode?: "decimal" | "numeric" | "search" | "tel" | "text";
  options?: string[];
  placeholder?: string;
  readOnly?: boolean;
  tagInput?: boolean;
  type?: string;
};

type ResumeSection = {
  icon: LucideIcon;
  id: keyof ResumeFormState;
  title: string;
};

type ResumeFormState = {
  about: string;
  benefits: string;
  education: string;
  experience: string;
  jobPreferences: string;
  languages: string;
  links: string;
  skills: string;
};

type ResumeProfileRow = {
  resume_name?: string | null;
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
  skills?: string | string[] | null;
};

type ResumeRow = {
  about?: string | null;
  education?: string | null;
  job_preferences?: string | null;
  languages?: string | null;
  links?: string | null;
  preferred_job_benefits?: string | null;
  professional_skill?: string | null;
  work_experience?: string | null;
};

function resumeDataToFormState(resume: ResumeData): ResumeFormState {
  return {
    about: resume.about,
    benefits: resume.benefits,
    education: resume.education,
    experience: resume.experience,
    jobPreferences: resume.jobPreferences,
    languages: resume.languages,
    links: resume.links,
    skills: resume.skills,
  };
}

function formStateToResumeData(formState: ResumeFormState, current: ResumeData) {
  return {
    ...current,
    about: formState.about,
    benefits: formState.benefits,
    education: formState.education,
    experience: formState.experience,
    jobPreferences: formState.jobPreferences,
    languages: formState.languages,
    links: formState.links,
    skills: formState.skills,
  } satisfies ResumeData;
}

function buildEditableProfile(profile: JobSeekerProfile): JobSeekerProfile {
  const firstName = profile.firstName.trim();
  const lastName = profile.lastName.trim();
  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const city = profile.city.trim();
  const country = profile.country.trim() || "Kazakhstan";
  const jobTitle = profile.jobTitle || profile.role;

  return {
    ...profile,
    city,
    country,
    expectedSalary: profile.expectedSalary || profile.minimumSalary,
    fullName: fullName || profile.fullName,
    jobTitle,
    location: [city, country].filter(Boolean).join(", "),
    role: jobTitle,
  };
}

function slugifyProfileName(value?: string | null) {
  return (value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stringifyProfileList(value?: string | string[] | null) {
  return Array.isArray(value) ? value.filter(Boolean).join(", ") : value || "";
}

function mergeProfileFromSupabase({
  authEmail,
  current,
  row,
}: {
  authEmail: string;
  current: JobSeekerProfile;
  row: ResumeProfileRow | null;
}) {
  if (!row) {
    return buildEditableProfile({
      ...current,
      email: current.email || authEmail,
    });
  }

  const firstName = current.firstName || row.first_name || "";
  const lastName = current.lastName || row.last_name || "";
  const city = current.city || row.city || row.location || "";
  const country = current.country || row.country || (city ? "Kazakhstan" : "");
  const minimumSalary =
    current.minimumSalary ||
    row.minimum_salary?.toString() ||
    row.expected_salary?.toString() ||
    "";
  const jobTitle = current.jobTitle || row.job_title || "";

  return buildEditableProfile({
    ...current,
    avatarPreview: current.avatarPreview || row.avatar_url || "",
    bio: current.bio || row.bio || "",
    city,
    country,
    email: current.email || row.email || authEmail,
    expectedSalary: current.expectedSalary || minimumSalary,
    firstName,
    fullName:
      current.fullName ||
      row.full_name ||
      [firstName, lastName].filter(Boolean).join(" "),
    jobTitle,
    lastName,
    location:
      current.location ||
      row.location ||
      [city, country].filter(Boolean).join(", "),
    minimumSalary,
    paymentPeriod: current.paymentPeriod || row.payment_period || "",
    postalCode: current.postalCode || row.postal_code || "",
    resumeUrl: current.resumeUrl || row.resume_url || "",
    role: current.role || jobTitle,
    skills: current.skills || stringifyProfileList(row.skills),
  });
}

function mergeResumeFromSupabase(current: ResumeData, row: ResumeRow | null) {
  if (!row) {
    return current;
  }

  return {
    ...current,
    about: current.about || row.about || "",
    benefits: current.benefits || row.preferred_job_benefits || "",
    education: current.education || row.education || "",
    experience: current.experience || row.work_experience || "",
    jobPreferences: current.jobPreferences || row.job_preferences || "",
    languages: current.languages || row.languages || "",
    links: current.links || row.links || "",
    skills: current.skills || row.professional_skill || "",
  } satisfies ResumeData;
}

const sidebarItems: SidebarItem[] = [
  { href: "/home/jobseeker", icon: House, label: "Home" },
  { href: "/account/jobseeker", icon: LayoutDashboard, label: "Activity" },
  { href: "/account/jobseeker/resume", icon: FileText, label: "My Resume" },
  { href: "/settings/jobseeker", icon: Settings, label: "Settings" },
];

const resumeSections: ResumeSection[] = [
  { icon: UserRound, id: "about", title: "About me" },
  { icon: Building2, id: "experience", title: "Work Experience" },
  { icon: GraduationCap, id: "education", title: "Education" },
  { icon: Link2, id: "links", title: "Links" },
  { icon: Languages, id: "languages", title: "Languages" },
  { icon: BriefcaseBusiness, id: "jobPreferences", title: "Job Preferences" },
  { icon: PencilLine, id: "benefits", title: "Preferred Job Benefits" },
];

function readProfileImageFile({
  file,
  onImageChange,
  onImageError,
}: {
  file: File;
  onImageChange: (file: File, preview: string) => void | Promise<void>;
  onImageError: (message: string) => void;
}) {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
  const maxSize = 10 * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    onImageError("Please upload a PNG or JPEG image.");
    return;
  }

  if (file.size > maxSize) {
    onImageError("Image must be under 10MB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    onImageChange(file, typeof reader.result === "string" ? reader.result : "");
  };
  reader.readAsDataURL(file);
}

function DashboardLogo() {
  return (
    <Link className="flex items-center gap-2.5" href="/home/jobseeker">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0B63E5] text-white shadow-[0_12px_28px_rgba(11,99,229,0.18)]">
        <span className="text-xl font-black leading-none">M</span>
      </span>
      <span className="leading-tight">
        <span className="block text-[11px] font-black text-slate-950">
          <span className="text-[#0B63E5]">Media</span>Hire
        </span>
        <span className="block text-[10px] font-bold text-slate-400">
          Activity
        </span>
      </span>
    </Link>
  );
}

function AccountSidebar({
  active,
  isOpen,
  onClose,
}: {
  active: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const sidebar = (
    <motion.aside
      animate="show"
      className="flex h-full w-full flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_14px_44px_rgba(15,23,42,0.045)]"
      initial="hidden"
      transition={mediaHireMotion.panel}
      variants={slideInLeft}
    >
      <div className="flex items-center justify-between gap-4">
        <DashboardLogo />
        <button
          aria-label="Close menu"
          className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 lg:hidden"
          onClick={onClose}
          type="button"
        >
          <X size={18} />
        </button>
      </div>

      <p className="mt-6 px-3 text-[11px] font-bold text-slate-400">Main</p>
      <nav className="mt-2 grid gap-1.5">
        {sidebarItems.map((item) => {
          const isActive = item.label === active;

          return (
            <Link
              className={`flex h-9 items-center gap-2 rounded-xl px-3 text-[11px] font-black transition ${
                isActive
                  ? "bg-[#0B63E5] text-white shadow-[0_12px_26px_rgba(11,99,229,0.18)]"
                  : "text-slate-600 hover:bg-[#eef4ff] hover:text-[#0B63E5]"
              }`}
              href={item.href}
              key={item.label}
              onClick={onClose}
            >
              <item.icon size={15} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto grid gap-1.5 border-t border-slate-100 pt-4">
        <Link
          className="flex h-9 items-center gap-2 rounded-xl px-3 text-[11px] font-black text-red-500 transition hover:bg-red-50"
          href="/"
        >
          <LogOut size={15} />
          Log out
        </Link>
        <Link
          className="flex h-9 items-center gap-2 rounded-xl px-3 text-[11px] font-black text-slate-500 transition hover:bg-[#eef4ff] hover:text-[#0B63E5]"
          href="#help"
        >
          <CircleHelp size={15} />
          Help
        </Link>
      </div>
    </motion.aside>
  );

  return (
    <>
      <div className="hidden lg:block">
        <div className="fixed left-[max(1.5rem,calc((100vw-1240px)/2))] top-4 z-20 h-[calc(100vh-2rem)] max-h-[760px] w-[220px]">
          {sidebar}
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            animate="show"
            className="fixed inset-0 z-50 bg-slate-950/35 p-4 backdrop-blur-sm lg:hidden"
            exit={{ opacity: 0 }}
            initial="hidden"
            transition={mediaHireMotion.fast}
            variants={fadeIn}
          >
            <div className="h-full max-w-[310px]">{sidebar}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function DashboardTopbar({
  onOpenSidebar,
  profile,
  search,
  setSearch,
}: {
  onOpenSidebar: () => void;
  profile: JobSeekerProfile;
  search: string;
  setSearch: (value: string) => void;
}) {
  const avatarSrc = profile.avatarPreview;

  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-start gap-3">
        <button
          aria-label="Open menu"
          className="mt-1 grid h-10 w-10 place-items-center rounded-xl bg-white text-slate-800 shadow-sm lg:hidden"
          onClick={onOpenSidebar}
          type="button"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-950">
            My Resume
          </h1>
          <p className="mt-1 max-w-xl text-sm font-medium leading-5 text-slate-500">
            Manage your resume, portfolio, and professional information
          </p>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex h-9 min-w-0 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 shadow-[0_10px_26px_rgba(15,23,42,0.035)] sm:w-64 lg:w-56 xl:w-64">
          <input
            className="min-w-0 flex-1 bg-transparent text-xs font-semibold text-slate-900 outline-none placeholder:text-slate-400"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search"
            type="search"
            value={search}
          />
          <Search className="text-slate-400" size={16} />
        </label>

        <div className="flex min-w-0 items-center gap-2 rounded-xl bg-white p-1.5 shadow-[0_10px_26px_rgba(15,23,42,0.035)] sm:max-w-[220px]">
          <Link
            aria-label="Notifications"
            className="relative grid h-8 w-8 place-items-center rounded-full bg-[#eef4ff] text-[#0B63E5]"
            href="/dashboard/jobseeker/community?chat=mediahire-welcome"
          >
            <Bell size={15} />
          </Link>
          <Link
            className="flex min-w-0 items-center gap-2 rounded-lg pr-1.5 transition hover:bg-[#f8fbff]"
            href="/home/jobseeker"
          >
            <JobSeekerAvatar
              alt="Job seeker avatar"
              className="h-8 w-8 rounded-full"
              iconSize={15}
              size={32}
              src={avatarSrc}
            />
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate text-[11px] font-black text-slate-950">
                {profile.fullName}
              </span>
              <span className="block truncate text-[10px] font-semibold text-slate-400">
                {profile.email}
              </span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

function ProfilePictureUpload({
  error,
  onImageChange,
  onImageError,
  preview,
}: {
  error?: string;
  onImageChange: (file: File, preview: string) => void | Promise<void>;
  onImageError: (message: string) => void;
  preview: string;
}) {
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    readProfileImageFile({ file, onImageChange, onImageError });
    event.target.value = "";
  }

  return (
    <div>
      <label className="group relative grid h-16 w-16 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-[#fafcff] text-slate-500 transition hover:border-[#0B63E5] hover:bg-[#eef4ff]">
        {preview ? (
          <Image
            alt="Profile preview"
            className="h-full w-full object-cover"
            height={64}
            src={preview}
            width={64}
            unoptimized
          />
        ) : (
          <ImagePlus size={22} />
        )}
        <input
          accept="image/png,image/jpeg,image/jpg"
          className="sr-only"
          onChange={handleFileChange}
          type="file"
        />
      </label>
      {error ? (
        <p className="mt-2 max-w-[220px] text-[11px] font-bold text-red-500">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ResumeHeaderCard({
  avatarError,
  onAvatarChange,
  onAvatarError,
  onAvatarRemove,
  profile,
}: {
  avatarError?: string;
  onAvatarChange: (file: File, preview: string) => void | Promise<void>;
  onAvatarError: (message: string) => void;
  onAvatarRemove: () => void;
  profile: JobSeekerProfile;
}) {
  return (
    <motion.section
      animate="show"
      className={mediaHireClassNames.card}
      initial="hidden"
      transition={mediaHireMotion.item(0)}
      variants={fadeInUp}
    >
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
        <ProfilePictureUpload
          error={avatarError}
          onImageChange={onAvatarChange}
          onImageError={onAvatarError}
          preview={profile.avatarPreview}
        />

        <div className="min-w-0 flex-1">
          <h2 className="text-base font-black text-[#0B63E5]">
            {profile.fullName}
          </h2>
          <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
            {profile.jobTitle || profile.role} •{" "}
            {profile.city || "Location not added"}
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <motion.label
              className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0B63E5] px-4 text-xs font-black text-white shadow-[0_12px_26px_rgba(11,99,229,0.18)] transition hover:bg-[#0957ca]"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Upload size={16} />
              Upload Picture
              <input
                accept="image/png,image/jpeg,image/jpg"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (!file) {
                    return;
                  }

                  readProfileImageFile({
                    file,
                    onImageChange: onAvatarChange,
                    onImageError: onAvatarError,
                  });
                  event.target.value = "";
                }}
                type="file"
              />
            </motion.label>
            <button
              className="h-9 rounded-xl border border-[#0B63E5] bg-white px-4 text-xs font-black text-[#0B63E5] transition hover:bg-[#eef4ff]"
              onClick={onAvatarRemove}
              type="button"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

const personalInfoFields: PersonalInfo[] = [
  { label: "First name", name: "firstName", placeholder: "First name" },
  { label: "Last name", name: "lastName", placeholder: "Last name" },
  {
    label: "Email Address",
    name: "email",
    placeholder: "Email address",
    readOnly: true,
    type: "email",
  },
  { label: "Mobile Number", name: "mobile", placeholder: "Mobile number" },
  { label: "Role", name: "jobTitle", placeholder: "Role" },
  {
    inputMode: "numeric",
    label: "Experience in years",
    name: "experienceYears",
    placeholder: "Years of experience",
    type: "text",
  },
  { label: "Location", name: "city", placeholder: "Location" },
  {
    label: "Year of Birth",
    name: "yearOfBirth",
    placeholder: "Year of birth",
    type: "number",
  },
  {
    label: "Gender",
    name: "gender",
    options: ["Female", "Male", "Other", "Prefer not to say"],
  },
  {
    label: "Minimum Salary Amount",
    name: "minimumSalary",
    placeholder: "Minimum salary",
    type: "number",
  },
  {
    label: "Payment Period",
    name: "paymentPeriod",
    options: ["Monthly", "Weekly", "Daily", "Hourly", "Project-based"],
  },
  {
    label: "Preferred work type",
    name: "preferredWorkType",
    options: ["Fulltime", "Freelance", "Project-based"],
  },
  { label: "Postal code", name: "postalCode", placeholder: "Postal code" },
  {
    label: "Skills",
    name: "skills",
    placeholder: "Type a skill and press Enter",
    tagInput: true,
  },
  {
    label: "Software",
    name: "software",
    placeholder: "Type software and press Enter",
    tagInput: true,
  },
];

const salaryCurrencies = [
  { label: "Dollar", symbol: "$", value: "Dollar" },
  { label: "Tenge", symbol: "₸", value: "Tenge" },
  { label: "Ruble", symbol: "₽", value: "Ruble" },
];

function splitProfileTags(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function joinProfileTags(tags: string[]) {
  return tags.join(", ");
}

function unwrapElement(element: Element) {
  const parent = element.parentNode;

  if (!parent) {
    return;
  }

  while (element.firstChild) {
    parent.insertBefore(element.firstChild, element);
  }

  parent.removeChild(element);
}

function replaceStyledSpan(element: Element) {
  const style = element.getAttribute("style") || "";
  const fontWeight = style.match(/font-weight\s*:\s*([^;]+)/i)?.[1] || "";
  const isBold =
    element.tagName === "SPAN" &&
    (fontWeight.trim().toLowerCase() === "bold" ||
      Number.parseInt(fontWeight, 10) >= 600);
  const isItalic =
    element.tagName === "SPAN" && /font-style\s*:\s*italic/i.test(style);

  if (!isBold && !isItalic) {
    return element;
  }

  const parent = element.parentNode;

  if (!parent) {
    return element;
  }

  const replacement = element.ownerDocument.createElement(
    isBold ? "strong" : "em",
  );
  const contentTarget =
    isBold && isItalic
      ? element.ownerDocument.createElement("em")
      : replacement;

  if (contentTarget !== replacement) {
    replacement.appendChild(contentTarget);
  }

  while (element.firstChild) {
    contentTarget.appendChild(element.firstChild);
  }

  parent.replaceChild(replacement, element);

  return replacement;
}

function sanitizeRichText(html: string) {
  if (typeof window === "undefined" || !html) {
    return html;
  }

  const parser = new DOMParser();
  const documentFragment = parser.parseFromString(`<div>${html}</div>`, "text/html");
  const root = documentFragment.body.firstElementChild;
  const allowedTags = new Set(["B", "BR", "DIV", "EM", "I", "P", "STRONG"]);

  if (!root) {
    return "";
  }

  Array.from(root.querySelectorAll("*")).forEach((rawElement) => {
    const element = replaceStyledSpan(rawElement);

    Array.from(element.attributes).forEach((attribute) =>
      element.removeAttribute(attribute.name),
    );

    if (!allowedTags.has(element.tagName)) {
      unwrapElement(element);
    }
  });

  return root.innerHTML.trim();
}

function richTextToPlainText(html: string) {
  if (typeof window === "undefined" || !html) {
    return html;
  }

  const container = document.createElement("div");
  container.innerHTML = sanitizeRichText(html);

  return container.innerText.trim();
}

function TagInput({
  name,
  onChange,
  placeholder,
  value,
}: {
  name: keyof JobSeekerProfile;
  onChange: (name: keyof JobSeekerProfile, value: string) => void;
  placeholder?: string;
  value: string;
}) {
  const [draft, setDraft] = useState("");
  const tags = useMemo(() => splitProfileTags(value), [value]);

  function addTag(rawValue = draft) {
    const nextTag = rawValue.trim();

    if (!nextTag) {
      setDraft("");
      return;
    }

    const nextTags = tags.some(
      (tag) => tag.toLowerCase() === nextTag.toLowerCase(),
    )
      ? tags
      : [...tags, nextTag];

    onChange(name, joinProfileTags(nextTags));
    setDraft("");
  }

  function removeTag(tagToRemove: string) {
    onChange(
      name,
      joinProfileTags(tags.filter((tag) => tag !== tagToRemove)),
    );
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    }
  }

  return (
    <div className="mt-1">
      <input
        className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-950 outline-none transition placeholder:text-slate-300 focus:border-[#0B63E5] focus:ring-4 focus:ring-blue-100"
        onBlur={() => addTag()}
        onChange={(event) => setDraft(event.target.value.replace(",", ""))}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        type="text"
        value={draft}
      />
      {tags.length ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-slate-100 px-3 text-xs font-black text-slate-600"
              key={`${tag}-${index}`}
            >
              {tag}
              <button
                aria-label={`Remove ${tag}`}
                className="grid h-4 w-4 place-items-center rounded-full text-slate-400 transition hover:bg-white hover:text-slate-700"
                onClick={() => removeTag(tag)}
                type="button"
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function PersonalInfoGrid({
  onChange,
  onDownloadResume,
  onResumeFileChange,
  profile,
  resumeFileName,
}: {
  onChange: (name: keyof JobSeekerProfile, value: string) => void;
  onDownloadResume: () => void;
  onResumeFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  profile: JobSeekerProfile;
  resumeFileName: string;
}) {
  const selectedCurrency =
    salaryCurrencies.find(
      (currency) => currency.value === profile.minimumSalaryCurrency,
    ) ?? salaryCurrencies[0];

  return (
    <motion.section
      animate="show"
      className={`p-4 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(0.04)}
      variants={fadeInUp}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <UserRound className="text-[#0B63E5]" size={18} />
          <h2 className="text-sm font-black text-slate-950">Personal Information</h2>
        </div>
        <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
          <Link
            className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-[#0B63E5] px-4 text-xs font-black text-white shadow-[0_12px_26px_rgba(11,99,229,0.18)] transition hover:bg-[#0957ca]"
            href="/profile/jobseeker"
          >
            <Eye size={16} />
            View resume
          </Link>
        </motion.div>
      </div>

      <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {personalInfoFields.map((item) => (
          <div key={item.label}>
            <label className="block text-[11px] font-bold text-slate-400">
              {item.label}
            </label>
            {item.tagInput ? (
              <TagInput
                name={item.name}
                onChange={onChange}
                placeholder={item.placeholder}
                value={String(profile[item.name] || "")}
              />
            ) : item.name === "minimumSalary" ? (
              <div className="relative mt-1">
                <input
                  className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 pr-20 text-xs font-black text-slate-950 outline-none transition placeholder:text-slate-300 focus:border-[#0B63E5] focus:ring-4 focus:ring-blue-100"
                inputMode="decimal"
                  onChange={(event) => onChange(item.name, event.target.value)}
                  pattern="[0-9]*[.]?[0-9]*"
                  placeholder={item.placeholder}
                  type="text"
                  value={profile.minimumSalary || ""}
                />
                <div className="absolute right-1.5 top-1/2 flex h-7 min-w-14 -translate-y-1/2 items-center justify-center rounded-lg border border-slate-200 bg-[#f8fbff] px-2 text-[11px] font-black text-slate-700 transition hover:border-[#0B63E5]/40 hover:bg-[#eef4ff]">
                  <span aria-hidden="true">{selectedCurrency.symbol}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className="ml-1 text-slate-400"
                    size={13}
                  />
                  <select
                    aria-label="Currency"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={(event) =>
                      onChange("minimumSalaryCurrency", event.target.value)
                    }
                    value={profile.minimumSalaryCurrency}
                  >
                    {salaryCurrencies.map((currency) => (
                      <option key={currency.value} value={currency.value}>
                        {currency.symbol} {currency.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : item.options ? (
              <select
                className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-950 outline-none transition focus:border-[#0B63E5] focus:ring-4 focus:ring-blue-100"
                onChange={(event) => onChange(item.name, event.target.value)}
                value={profile[item.name] || ""}
              >
                <option value="">Not added</option>
                {item.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className={`mt-1 h-9 w-full rounded-xl border border-slate-200 px-3 text-xs font-black outline-none transition placeholder:text-slate-300 ${
                  item.readOnly
                    ? "cursor-not-allowed bg-slate-50 text-slate-400"
                    : "bg-white text-slate-950 focus:border-[#0B63E5] focus:ring-4 focus:ring-blue-100"
                }`}
                disabled={item.readOnly}
                inputMode={item.inputMode}
                onChange={(event) => onChange(item.name, event.target.value)}
                placeholder={item.placeholder}
                readOnly={item.readOnly}
                type={item.type || "text"}
                value={profile[item.name] || ""}
              />
            )}
          </div>
        ))}
        <div className="flex flex-col justify-end gap-1.5">
          <div className="flex flex-col gap-2 sm:flex-row">
            <motion.button
              className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[#0B63E5] bg-white px-4 text-xs font-black text-[#0B63E5] transition hover:bg-[#eef4ff]"
              onClick={onDownloadResume}
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={16} />
              Open resume file
            </motion.button>

            <label className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0B63E5] px-4 text-xs font-black text-white shadow-[0_12px_26px_rgba(11,99,229,0.18)] transition hover:bg-[#0957ca]">
              <Upload size={16} />
              Change file
              <input
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="sr-only"
                onChange={onResumeFileChange}
                type="file"
              />
            </label>
          </div>

          {resumeFileName ? (
            <p className="truncate text-[11px] font-bold text-slate-400">
              Saved file: {resumeFileName}
            </p>
          ) : (
            <p className="text-[11px] font-bold text-slate-400">
              No resume file uploaded yet.
            </p>
          )}
        </div>
      </div>
    </motion.section>
  );
}

function RichTextEditor({
  id,
  onChange,
  value,
}: {
  id: keyof ResumeFormState;
  onChange: (id: keyof ResumeFormState, value: string) => void;
  value: string;
}) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [isEmpty, setIsEmpty] = useState(!richTextToPlainText(value));

  useEffect(() => {
    const editor = editorRef.current;

    if (!editor || document.activeElement === editor) {
      return;
    }

    const sanitizedValue = sanitizeRichText(value);

    if (editor.innerHTML !== sanitizedValue) {
      editor.innerHTML = sanitizedValue;
      setIsEmpty(!richTextToPlainText(sanitizedValue));
    }
  }, [value]);

  function updateValue() {
    const editor = editorRef.current;

    if (!editor) {
      return;
    }

    const nextValue = sanitizeRichText(editor.innerHTML);
    setIsEmpty(!richTextToPlainText(nextValue));
    onChange(id, nextValue);
  }

  function applyFormat(command: "bold" | "italic") {
    editorRef.current?.focus();
    document.execCommand(command);
    updateValue();
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-[#0B63E5] focus-within:ring-4 focus-within:ring-blue-100">
      <div className="flex items-center gap-1 border-b border-slate-100 bg-[#f8fbff] px-2 py-1.5">
        <button
          aria-label="Bold selected text"
          className="grid h-7 w-7 place-items-center rounded-lg text-xs font-black text-slate-700 transition hover:bg-white hover:text-[#0B63E5]"
          onMouseDown={(event) => {
            event.preventDefault();
            applyFormat("bold");
          }}
          type="button"
        >
          B
        </button>
        <button
          aria-label="Italic selected text"
          className="grid h-7 w-7 place-items-center rounded-lg text-xs font-black italic text-slate-700 transition hover:bg-white hover:text-[#0B63E5]"
          onMouseDown={(event) => {
            event.preventDefault();
            applyFormat("italic");
          }}
          type="button"
        >
          I
        </button>
      </div>

      <div className="relative">
        {isEmpty ? (
          <span className="pointer-events-none absolute left-3 top-3 text-xs font-semibold text-slate-300">
            Write Your description
          </span>
        ) : null}
        <motion.div
          className="rich-text-editor min-h-20 w-full px-3 py-3 text-xs font-semibold leading-5 text-slate-900 outline-none [&_b]:font-[1000] [&_b]:text-slate-950 [&_em]:italic [&_i]:italic [&_strong]:font-[1000] [&_strong]:text-slate-950"
          contentEditable
          onBlur={updateValue}
          onInput={updateValue}
          ref={editorRef}
          suppressContentEditableWarning
          whileFocus={{ scale: 1.005 }}
        />
      </div>
    </div>
  );
}

function ResumeSectionCard({
  section,
  value,
  onChange,
  index,
}: {
  index: number;
  onChange: (id: keyof ResumeFormState, value: string) => void;
  section: ResumeSection;
  value: string;
}) {
  return (
    <motion.section
      animate="show"
      className={`p-4 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(index * 0.035)}
      variants={fadeInUp}
    >
      <div className="flex items-center gap-2">
        <section.icon className="text-[#0B63E5]" size={18} />
        <h2 className="text-sm font-black text-slate-950">{section.title}</h2>
      </div>
      <div className="mt-3">
        <RichTextEditor id={section.id} onChange={onChange} value={value} />
      </div>
    </motion.section>
  );
}

function ActionButtons({
  hasUnsavedChanges,
  isSaving,
  onCancel,
  onSave,
}: {
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
    <div className="flex flex-col gap-2 pb-8 sm:flex-row sm:justify-end">
      <motion.button
        className="h-9 rounded-xl border border-[#0B63E5] bg-white px-4 text-xs font-black text-[#0B63E5] transition hover:bg-[#eef4ff] disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!hasUnsavedChanges || isSaving}
        onClick={onCancel}
        type="button"
        whileHover={{ y: hasUnsavedChanges ? -1 : 0 }}
        whileTap={{ scale: hasUnsavedChanges ? 0.98 : 1 }}
      >
        Cancel
      </motion.button>
      <motion.button
        className="h-9 rounded-xl bg-[#0B63E5] px-5 text-xs font-black text-white shadow-[0_12px_26px_rgba(11,99,229,0.18)] transition hover:bg-[#0957ca] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={!hasUnsavedChanges || isSaving}
        onClick={onSave}
        type="button"
        whileHover={{ y: hasUnsavedChanges ? -1 : 0 }}
        whileTap={{ scale: hasUnsavedChanges ? 0.98 : 1 }}
      >
        {isSaving ? "Saving..." : "Save"}
      </motion.button>
    </div>
  );
}

export function JobSeekerResumePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState<JobSeekerProfile>(
    defaultJobSeekerProfile,
  );
  const [savedProfile, setSavedProfile] = useState<JobSeekerProfile>(profile);
  const [formState, setFormState] = useState<ResumeFormState>(() =>
    resumeDataToFormState(defaultResumeData),
  );
  const [resumeData, setResumeData] = useState<ResumeData>(
    defaultResumeData,
  );
  const [savedState, setSavedState] = useState<ResumeFormState>(() =>
    resumeDataToFormState(defaultResumeData),
  );
  const [avatarError, setAvatarError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveMessageTone, setSaveMessageTone] = useState<
    "success" | "warning"
  >("success");

  const hasUnsavedChanges = useMemo(
    () =>
      JSON.stringify(formState) !== JSON.stringify(savedState) ||
      JSON.stringify(profile) !== JSON.stringify(savedProfile),
    [formState, profile, savedProfile, savedState],
  );

  useEffect(() => {
    let isMounted = true;

    async function hydrateAccountResume() {
      const { data } = await supabase.auth.getUser();
      const authEmail = data.user?.email?.trim().toLowerCase() || "";

      if (authEmail) {
        setActiveJobSeekerEmail(authEmail);
      }

      const storedProfile = authEmail
        ? getStoredJobSeekerProfileForEmail(authEmail)
        : getStoredJobSeekerProfile();
      const storedResume = authEmail
        ? getResumeDataForEmail(authEmail)
        : getResumeData();

      let nextProfile = storedProfile;
      let nextResumeData = storedResume;

      if (data.user) {
        let profileRow: ResumeProfileRow | null = null;
        const byUserId = await supabase
          .from("profiles")
          .select(
            "avatar_url,bio,city,country,email,expected_salary,first_name,full_name,job_title,last_name,location,payment_period,postal_code,minimum_salary,resume_url,resume_name,skills",
          )
          .eq("user_id", data.user.id)
          .maybeSingle();

        if (byUserId.error) {
          const byId = await supabase
            .from("profiles")
            .select(
              "avatar_url,bio,city,country,email,expected_salary,first_name,full_name,job_title,last_name,location,payment_period,postal_code,minimum_salary,resume_url,resume_name,skills",
            )
            .eq("id", data.user.id)
            .maybeSingle();

          profileRow = (byId.data || null) as ResumeProfileRow | null;
        } else {
          profileRow = (byUserId.data || null) as ResumeProfileRow | null;
        }

        const { data: resumeRow } = await supabase
          .from("jobseeker_resumes")
          .select(
            "about,education,job_preferences,languages,links,preferred_job_benefits,professional_skill,work_experience",
          )
          .eq("user_id", data.user.id)
          .maybeSingle();

        nextProfile = mergeProfileFromSupabase({
          authEmail,
          current: storedProfile,
          row: profileRow,
        });
        nextResumeData = mergeResumeFromSupabase(
          storedResume,
          (resumeRow || null) as ResumeRow | null,
        );
        if (profileRow?.resume_url) {
          nextResumeData = {
            ...nextResumeData,
            pdfUrl: profileRow.resume_url,
            pdfName: profileRow.resume_name || nextResumeData.pdfName || "Uploaded resume",
          };
        }

        if (authEmail) {
          saveJobSeekerProfile(nextProfile);
          updateResumeDataForEmail(authEmail, nextResumeData);
        }
      }

      if (!isMounted) {
        return;
      }

      const nextFormState = resumeDataToFormState(nextResumeData);

      setProfile(nextProfile);
      setSavedProfile(nextProfile);
      setResumeData(nextResumeData);
      setFormState(nextFormState);
      setSavedState(nextFormState);
    }

    function handleProfileUpdate() {
      const storedProfile = getStoredJobSeekerProfile();

      setProfile(storedProfile);
      setSavedProfile(storedProfile);
    }

    function handleResumeUpdate() {
      const storedResume = getResumeData();

      setResumeData(storedResume);
      setFormState(resumeDataToFormState(storedResume));
      setSavedState(resumeDataToFormState(storedResume));
    }

    void hydrateAccountResume();
    window.addEventListener("mediahire:jobseeker-profile-updated", handleProfileUpdate);
    window.addEventListener("mediahire:resume-updated", handleResumeUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener(
        "mediahire:jobseeker-profile-updated",
        handleProfileUpdate,
      );
      window.removeEventListener("mediahire:resume-updated", handleResumeUpdate);
    };
  }, []);

  async function uploadProfileAsset(
    file: File,
    folder: "avatar" | "resume" | "cover",
  ) {
    const { data, error } = await supabase.auth.getUser();
  
    if (error || !data.user) {
      throw new Error("User is not logged in");
    }
  
    const extension = file.name.split(".").pop() || "file";
    const safeName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .slice(0, 40);
  
    const path = `${data.user.id}/${folder}/${Date.now()}-${safeName}.${extension}`;
  
    const { error: uploadError } = await supabase.storage
      .from("profile-assets")
      .upload(path, file, {
        upsert: true,
      });
  
    if (uploadError) {
      throw uploadError;
    }
  
    const { data: publicUrlData } = supabase.storage
      .from("profile-assets")
      .getPublicUrl(path);
  
    return {
      publicUrl: publicUrlData.publicUrl,
      userId: data.user.id,
    };
  }
  
  async function updateCurrentUserProfile(
    userId: string,
    values: Record<string, unknown>,
  ) {
    const { data: userData } = await supabase.auth.getUser();
    const email = userData.user?.email || "";
  
    const payload = {
      ...values,
      email,
      role: "jobseeker",
      user_id: userId,
      public_slug: slugifyProfileName(
        typeof values.full_name === "string" ? values.full_name : email.split("@")[0],
      ),
      updated_at: new Date().toISOString(),
    };
  
    const byUserId = await supabase
      .from("profiles")
      .select("id,user_id")
      .eq("user_id", userId)
      .maybeSingle();
  
    if (byUserId.data) {
      await supabase.from("profiles").update(payload).eq("user_id", userId);
      return;
    }
  
    const byId = await supabase
      .from("profiles")
      .select("id,user_id")
      .eq("id", userId)
      .maybeSingle();
  
    if (byId.data) {
      await supabase.from("profiles").update(payload).eq("id", userId);
      return;
    }
  
    await supabase.from("profiles").insert(payload);
  }

  async function syncProfileAvatar(nextProfile: JobSeekerProfile) {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      return;
    }

    try {
      await upsertProfile({
        avatarUrl: nextProfile.avatarPreview,
        bio: nextProfile.bio,
        city: nextProfile.city,
        country: nextProfile.country,
        email: nextProfile.email,
        expectedSalary: nextProfile.expectedSalary,
        firstName: nextProfile.firstName,
        jobTitle: nextProfile.jobTitle,
        lastName: nextProfile.lastName,
        location: nextProfile.location,
        minimumSalary: nextProfile.minimumSalary,
        paymentPeriod: nextProfile.paymentPeriod,
        postalCode: nextProfile.postalCode || nextProfile.preferredPostalCode,
        provider: "email",
        resumeUrl: nextProfile.resumeUrl,
        role: "jobseeker",
        skills: nextProfile.skills,
        userId: data.user.id,
      });
    } catch {
      setAvatarError("Picture saved locally, but could not sync online.");
      setSaveMessageTone("warning");
      setSaveMessage("Picture saved locally, but could not sync online.");
    }
  }

  function showPageMessage(
    message: string,
    tone: "success" | "warning" = "success",
  ) {
    setSaveMessageTone(tone);
    setSaveMessage(message);
  }

  function clearPageMessage() {
    setSaveMessage("");
  }

  function handleAvatarError(message: string) {
    setAvatarError(message);
    showPageMessage(message, "warning");
  }

  async function updateAvatar(
    file: File,
    preview: string,
    message = "Profile picture saved successfully.",
  ) {
    const previewProfile = { ...profile, avatarPreview: preview };
  
    setAvatarError("");
    setProfile(previewProfile);
    showPageMessage("Uploading profile picture...");
  
    try {
      const { publicUrl, userId } = await uploadProfileAsset(file, "avatar");
  
      const nextProfile = {
        ...previewProfile,
        avatarPreview: publicUrl,
      };
  
      setProfile(nextProfile);
      setSavedProfile(nextProfile);
      saveJobSeekerProfile(nextProfile);
  
      await updateCurrentUserProfile(userId, {
        avatar_url: publicUrl,
      });
  
      window.dispatchEvent(new Event("mediahire:jobseeker-profile-updated"));
      window.dispatchEvent(new Event("mediahire:settings-updated"));
  
      showPageMessage(message);
    } catch (error) {
      console.error("Could not upload avatar:", error);
      setProfile(profile);
      setAvatarError("Could not upload profile picture.");
      showPageMessage("Could not upload profile picture.", "warning");
    }
  }

  async function handleAvatarRemove() {
    const nextProfile = {
      ...profile,
      avatarPreview: "",
    };
  
    setAvatarError("");
    setProfile(nextProfile);
    setSavedProfile(nextProfile);
    saveJobSeekerProfile(nextProfile);
  
    try {
      const { data } = await supabase.auth.getUser();
  
      if (data.user) {
        await updateCurrentUserProfile(data.user.id, {
          avatar_url: null,
        });
      }
  
      window.dispatchEvent(new Event("mediahire:jobseeker-profile-updated"));
      window.dispatchEvent(new Event("mediahire:settings-updated"));
  
      showPageMessage("Profile picture removed.");
    } catch {
      showPageMessage("Profile picture removed locally.", "warning");
    }
  }

  function handleDownloadResume() {
    const resumeUrl = resumeData.pdfUrl || profile.resumeUrl;

    if (!resumeUrl) {
      showPageMessage(
        resumeData.pdfName
          ? `${resumeData.pdfName} is saved, but the file is not available.`
          : "No resume file has been uploaded yet.",
        "warning",
      );
      return;
    }

    const downloadLink = document.createElement("a");
    downloadLink.href = resumeUrl;
    downloadLink.rel = "noopener noreferrer";
    downloadLink.target = "_blank";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();

    showPageMessage("Resume file opened.");
  }

  async function handleResumeFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const allowedByName =
      file.name.toLowerCase().endsWith(".pdf") ||
      file.name.toLowerCase().endsWith(".doc") ||
      file.name.toLowerCase().endsWith(".docx");

    if (!allowedTypes.includes(file.type) && !allowedByName) {
      showPageMessage("Please upload a PDF, DOC, or DOCX resume file.", "warning");
      event.target.value = "";
      return;
    }

    try {
      showPageMessage("Uploading resume file...");

      const { publicUrl, userId } = await uploadProfileAsset(file, "resume");

      const nextProfile = {
        ...profile,
        resumeUrl: publicUrl,
      };

      const nextResumeData = {
        ...resumeData,
        pdfUrl: publicUrl,
        pdfName: file.name,
      };

      setProfile(nextProfile);
      setSavedProfile(nextProfile);
      setResumeData(nextResumeData);

      saveJobSeekerProfile(nextProfile);

      if (nextProfile.email) {
        updateResumeDataForEmail(nextProfile.email, nextResumeData);
      } else {
        updateResumeData(nextResumeData);
      }

      await updateCurrentUserProfile(userId, {
        resume_url: publicUrl,
        resume_name: file.name,
      });

      window.dispatchEvent(new Event("mediahire:jobseeker-profile-updated"));
      window.dispatchEvent(new Event("mediahire:resume-updated"));

      showPageMessage("Resume file uploaded successfully.");
    } catch (error) {
      console.error("Could not upload resume file:", error);
      showPageMessage("Could not upload resume file.", "warning");
    } finally {
      event.target.value = "";
    }
  }

  function updateProfileField(name: keyof JobSeekerProfile, value: string) {
    if (name === "email") {
      return;
    }

    setProfile((current) =>
      buildEditableProfile({
        ...current,
        [name]: value,
        ...(name === "minimumSalary" ? { expectedSalary: value } : {}),
      }),
    );
    if (name === "skills") {
      setFormState((current) => ({ ...current, skills: value }));
    }
    clearPageMessage();
  }

  function updateSection(id: keyof ResumeFormState, value: string) {
    setFormState((current) => ({ ...current, [id]: value }));
    if (id === "skills") {
      setProfile((current) => buildEditableProfile({ ...current, skills: value }));
    }
    clearPageMessage();
  }

  function handleCancel() {
    setFormState(savedState);
    setProfile(savedProfile);
    clearPageMessage();
  }

  async function handleSave() {
    setIsSaving(true);
    clearPageMessage();

    const plainAbout = richTextToPlainText(formState.about);
    const updatedProfile = buildEditableProfile({
      ...profile,
      bio: plainAbout || profile.bio,
      resumeUrl: profile.resumeUrl,
      skills: profile.skills || formState.skills,
    });
    const nextResumeData = formStateToResumeData(
      { ...formState, skills: profile.skills || formState.skills },
      resumeData,
    );

    saveJobSeekerProfile(updatedProfile);
    setProfile(updatedProfile);
    setSavedProfile(updatedProfile);
    if (updatedProfile.email) {
      updateResumeDataForEmail(updatedProfile.email, nextResumeData);
    } else {
      updateResumeData(nextResumeData);
    }
    setResumeData(nextResumeData);
    saveJobSeekerProfile(updatedProfile);
    setProfile(updatedProfile);
    setSavedProfile(updatedProfile);
    setSavedState(formState);

    try {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        showPageMessage("Resume changes saved successfully.");
        return;
      }

      syncStoredProjectAuthorsForProfile({
        id: data.user.id,
        fullName:
          updatedProfile.fullName ||
          [updatedProfile.firstName, updatedProfile.lastName]
            .filter(Boolean)
            .join(" "),
        avatarUrl: updatedProfile.avatarPreview,
        profession: updatedProfile.jobTitle || updatedProfile.role,
        preferredWorkType: updatedProfile.preferredWorkType,
      });

      const { error: resumeError } = await supabase.from("jobseeker_resumes").upsert(
        {
          about: formState.about || null,
          education: formState.education || null,
          job_preferences: formState.jobPreferences || null,
          languages: formState.languages || null,
          links: formState.links || null,
          preferred_job_benefits: formState.benefits || null,
          professional_skill: updatedProfile.skills || null,
          user_id: data.user.id,
          work_experience: formState.experience || null,
        },
        { onConflict: "user_id" },
      );

      if (resumeError) {
        throw resumeError;
      }

      const { error: profileError } = await supabase
      .from("profiles")
      .update({
        avatar_url: updatedProfile.avatarPreview || null,
        bio: plainAbout || null,
        city: updatedProfile.city || null,
        country: updatedProfile.country || null,
        email: updatedProfile.email || null,
        first_name: updatedProfile.firstName || null,
        full_name:
          updatedProfile.fullName ||
          [updatedProfile.firstName, updatedProfile.lastName].filter(Boolean).join(" ") ||
          null,
        job_title: updatedProfile.jobTitle || updatedProfile.role || null,
        last_name: updatedProfile.lastName || null,
        location: updatedProfile.location || updatedProfile.city || null,
        resume_url: updatedProfile.resumeUrl || resumeData.pdfUrl || null,
        resume_name: resumeData.pdfName || null,
        skills: updatedProfile.skills || null,
        public_slug: slugifyProfileName(
          updatedProfile.fullName ||
            [updatedProfile.firstName, updatedProfile.lastName]
              .filter(Boolean)
              .join(" "),
        ) || null,
      updated_at: new Date().toISOString(),
      })
        .eq("user_id", data.user.id);

      if (profileError) {
        // Some projects keep the profile owner in `id` instead of `user_id`.
        await supabase
        .from("profiles")
        .update({
          avatar_url: updatedProfile.avatarPreview || null,
          bio: plainAbout || null,
          city: updatedProfile.city || null,
          country: updatedProfile.country || null,
          email: updatedProfile.email || null,
          first_name: updatedProfile.firstName || null,
          full_name:
            updatedProfile.fullName ||
            [updatedProfile.firstName, updatedProfile.lastName].filter(Boolean).join(" ") ||
            null,
          job_title: updatedProfile.jobTitle || updatedProfile.role || null,
          last_name: updatedProfile.lastName || null,
          location: updatedProfile.location || updatedProfile.city || null,
          resume_url: updatedProfile.resumeUrl || resumeData.pdfUrl || null,
          resume_name: resumeData.pdfName || null,
          skills: updatedProfile.skills || null,
        public_slug: slugifyProfileName(
          updatedProfile.fullName ||
            [updatedProfile.firstName, updatedProfile.lastName]
              .filter(Boolean)
              .join(" "),
        ) || null,
      updated_at: new Date().toISOString(),
        })
          .eq("id", data.user.id);
      }

      await upsertProfile({
        avatarUrl: updatedProfile.avatarPreview,
        bio: updatedProfile.bio,
        city: updatedProfile.city,
        country: updatedProfile.country,
        email: updatedProfile.email,
        expectedSalary: updatedProfile.expectedSalary,
        firstName: updatedProfile.firstName,
        jobTitle: updatedProfile.jobTitle,
        lastName: updatedProfile.lastName,
        location: updatedProfile.location,
        minimumSalary: updatedProfile.minimumSalary,
        paymentPeriod: updatedProfile.paymentPeriod,
        postalCode: updatedProfile.postalCode || updatedProfile.preferredPostalCode,
        provider: "email",
        resumeUrl: updatedProfile.resumeUrl,
        role: "jobseeker",
        skills: updatedProfile.skills,
        userId: data.user.id,
      });

      showPageMessage("Resume changes saved successfully.");
    } catch {
      showPageMessage("Resume changes saved successfully.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <motion.main
      animate="show"
      className="min-h-screen overflow-x-hidden bg-[#f5f7fb] px-4 py-4 text-slate-950 sm:px-5 lg:px-6"
      initial="hidden"
      variants={fadeIn}
    >
      <div className="mx-auto grid w-full max-w-[1240px] gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
        <AccountSidebar
          active="My Resume"
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="min-w-0">
          <DashboardTopbar
            onOpenSidebar={() => setIsSidebarOpen(true)}
            profile={profile}
            search={search}
            setSearch={setSearch}
          />

          <div className="mt-5 max-w-[860px] space-y-4">
            <ResumeHeaderCard
              avatarError={avatarError}
              onAvatarChange={updateAvatar}
              onAvatarError={handleAvatarError}
              onAvatarRemove={handleAvatarRemove}
              profile={profile}
            />
            <PersonalInfoGrid
              onChange={updateProfileField}
              onDownloadResume={handleDownloadResume}
              onResumeFileChange={handleResumeFileChange}
              profile={profile}
              resumeFileName={resumeData.pdfName}
            />

            {resumeSections.map((section, index) => (
              <ResumeSectionCard
                index={index + 2}
                key={section.id}
                onChange={updateSection}
                section={section}
                value={formState[section.id]}
              />
            ))}

            {saveMessage ? (
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl px-4 py-3 text-xs font-black ${
                  saveMessageTone === "success"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
                initial={{ opacity: 0, y: 8 }}
              >
                {saveMessage}
              </motion.p>
            ) : null}

            <ActionButtons
              hasUnsavedChanges={hasUnsavedChanges}
              isSaving={isSaving}
              onCancel={handleCancel}
              onSave={handleSave}
            />
          </div>
        </div>
      </div>
    </motion.main>
  );
}
