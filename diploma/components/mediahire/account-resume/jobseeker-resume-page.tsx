"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  CircleHelp,
  Download,
  Eye,
  FileImage,
  FileText,
  GraduationCap,
  Languages,
  LayoutDashboard,
  Link2,
  LogOut,
  Menu,
  PencilLine,
  Search,
  Settings,
  Sparkles,
  UserCog,
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
import { profileAvatar } from "../jobseeker-dashboard/dashboard-data";
import {
  getStoredJobSeekerProfile,
  saveJobSeekerProfile,
  type JobSeekerProfile,
} from "../account-settings/profile-store";
import { supabase } from "@/lib/supabase-client";
import {
  getResumeData,
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
  value: string;
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

const sidebarItems: SidebarItem[] = [
  { href: "/account/jobseeker", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/account/jobseeker/resume", icon: FileText, label: "My Resume" },
  { href: "/settings/jobseeker", icon: Settings, label: "Settings" },
  { href: "/account/jobseeker/settings", icon: UserCog, label: "Account Setting" },
];

const resumeSections: ResumeSection[] = [
  { icon: UserRound, id: "about", title: "About me" },
  { icon: Sparkles, id: "skills", title: "Professional Skill" },
  { icon: Building2, id: "experience", title: "Work Experience" },
  { icon: GraduationCap, id: "education", title: "Education" },
  { icon: Link2, id: "links", title: "Links" },
  { icon: Languages, id: "languages", title: "Languages" },
  { icon: BriefcaseBusiness, id: "jobPreferences", title: "Job Preferences" },
  { icon: PencilLine, id: "benefits", title: "Preferred Job Benefits" },
];

const initialResumeState: ResumeFormState = {
  about: "",
  benefits: "",
  education: "",
  experience: "",
  jobPreferences: "",
  languages: "",
  links: "",
  skills: "",
};

function DashboardLogo() {
  return (
    <Link className="flex items-center gap-3" href="/account/jobseeker">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0B63E5] text-white shadow-[0_16px_36px_rgba(11,99,229,0.22)]">
        <span className="text-2xl font-black leading-none">M</span>
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-black text-slate-950">
          <span className="text-[#0B63E5]">Media</span>Hire
        </span>
        <span className="block text-[11px] font-bold text-slate-400">
          Dashboard
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
      className="flex h-full w-full flex-col rounded-[2rem] border border-slate-100 bg-white p-5 shadow-[0_22px_70px_rgba(15,23,42,0.06)]"
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

      <p className="mt-10 px-4 text-xs font-bold text-slate-400">Main</p>
      <nav className="mt-3 grid gap-2">
        {sidebarItems.map((item) => {
          const isActive = item.label === active;

          return (
            <Link
              className={`flex h-12 items-center gap-3 rounded-2xl px-4 text-sm font-black transition ${
                isActive
                  ? "bg-[#0B63E5] text-white shadow-[0_16px_34px_rgba(11,99,229,0.22)]"
                  : "text-slate-600 hover:bg-[#eef4ff] hover:text-[#0B63E5]"
              }`}
              href={item.href}
              key={item.label}
              onClick={onClose}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto grid gap-2 border-t border-slate-100 pt-5">
        <Link
          className="flex h-12 items-center gap-3 rounded-2xl px-4 text-sm font-black text-red-500 transition hover:bg-red-50"
          href="/"
        >
          <LogOut size={18} />
          Log out
        </Link>
        <Link
          className="flex h-12 items-center gap-3 rounded-2xl px-4 text-sm font-black text-slate-500 transition hover:bg-[#eef4ff] hover:text-[#0B63E5]"
          href="#help"
        >
          <CircleHelp size={18} />
          Help
        </Link>
      </div>
    </motion.aside>
  );

  return (
    <>
      <div className="hidden lg:sticky lg:top-6 lg:block lg:h-[calc(100vh-3rem)]">
        {sidebar}
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
  const avatarSrc = profile.avatarPreview || profileAvatar;

  return (
    <header className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex items-start gap-3">
        <button
          aria-label="Open menu"
          className="mt-1 grid h-11 w-11 place-items-center rounded-2xl bg-white text-slate-800 shadow-sm lg:hidden"
          onClick={onOpenSidebar}
          type="button"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className={mediaHireClassNames.h1}>My Resume</h1>
          <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-slate-500">
            Manage your resume, portfolio, and professional information
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex h-12 min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-[0_12px_32px_rgba(15,23,42,0.04)] sm:w-72">
          <input
            className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search"
            type="search"
            value={search}
          />
          <Search className="text-slate-500" size={18} />
        </label>

        <div className="flex items-center gap-3 rounded-2xl bg-white p-2 shadow-[0_12px_32px_rgba(15,23,42,0.04)]">
          <button
            aria-label="Notifications"
            className="relative grid h-11 w-11 place-items-center rounded-full bg-[#eef4ff] text-[#0B63E5]"
            type="button"
          >
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
          <Image
            alt={profile.fullName}
            className="h-11 w-11 rounded-full object-cover"
            height={44}
            src={avatarSrc}
            width={44}
            unoptimized={avatarSrc.startsWith("data:")}
          />
          <div className="hidden min-w-0 pr-2 sm:block">
            <p className="truncate text-sm font-black text-slate-950">
              {profile.fullName}
            </p>
            <p className="truncate text-xs font-semibold text-slate-400">
              {profile.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

function ResumeHeaderCard({ profile }: { profile: JobSeekerProfile }) {
  return (
    <motion.section
      animate="show"
      className={mediaHireClassNames.card}
      initial="hidden"
      transition={mediaHireMotion.item(0)}
      variants={fadeInUp}
    >
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="grid h-28 w-28 shrink-0 place-items-center rounded-3xl border border-dashed border-slate-400 bg-[#fafcff] text-slate-500">
          <FileImage size={30} />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-black text-[#0B63E5]">
            {profile.fullName}
          </h2>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">
            {profile.jobTitle || profile.role} •{" "}
            {profile.city || "City not added"}
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <motion.button
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#0B63E5] px-5 text-sm font-black text-white shadow-[0_14px_30px_rgba(11,99,229,0.22)] transition hover:bg-[#0957ca]"
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye size={16} />
              View resume
            </motion.button>
            <motion.button
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#0B63E5] bg-white px-5 text-sm font-black text-[#0B63E5] transition hover:bg-[#eef4ff]"
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={16} />
              Download PDF Resume
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function getPersonalInfo(profile: JobSeekerProfile): PersonalInfo[] {
  return [
    { label: "First name", value: profile.firstName || "Not added" },
    { label: "Last name", value: profile.lastName || "Not added" },
    { label: "Email Address", value: profile.email || "Not added" },
    { label: "Mobile Number", value: profile.mobile || "Not added" },
    { label: "Role", value: profile.jobTitle || profile.role || "Not added" },
    { label: "City", value: profile.city || "Not added" },
    { label: "Year of Birth", value: profile.yearOfBirth || "Not added" },
    { label: "Gender", value: profile.gender || "Not added" },
  ];
}

function PersonalInfoGrid({ profile }: { profile: JobSeekerProfile }) {
  const personalInfo = getPersonalInfo(profile);

  return (
    <motion.section
      animate="show"
      className={`p-5 sm:p-6 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(0.04)}
      variants={fadeInUp}
    >
      <div className="flex items-center gap-2">
        <UserRound className="text-[#0B63E5]" size={18} />
        <h2 className="text-lg font-black text-slate-950">Personal Information</h2>
      </div>

      <div className="mt-6 grid gap-x-12 gap-y-6 sm:grid-cols-2">
        {personalInfo.map((item) => (
          <div key={item.label}>
            <p className="text-xs font-bold text-slate-400">{item.label}</p>
            <p className="mt-1 text-sm font-black text-slate-950">{item.value}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function ResumeTextarea({
  id,
  onChange,
  value,
}: {
  id: keyof ResumeFormState;
  onChange: (id: keyof ResumeFormState, value: string) => void;
  value: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    onChange(id, textarea.value);
  }

  return (
    <motion.textarea
      className="min-h-28 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold leading-6 text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-[#0B63E5] focus:ring-4 focus:ring-blue-100"
      onChange={handleChange}
      placeholder="Write Your description"
      ref={textareaRef}
      value={value}
      whileFocus={{ scale: 1.005 }}
    />
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
      className={`p-5 sm:p-6 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(index * 0.035)}
      variants={fadeInUp}
    >
      <div className="flex items-center gap-2">
        <section.icon className="text-[#0B63E5]" size={18} />
        <h2 className="text-lg font-black text-slate-950">{section.title}</h2>
      </div>
      <div className="mt-5">
        <ResumeTextarea id={section.id} onChange={onChange} value={value} />
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
    <div className="flex flex-col gap-3 pb-10 sm:flex-row sm:justify-end">
      <motion.button
        className="h-11 rounded-xl border border-[#0B63E5] bg-white px-8 text-sm font-black text-[#0B63E5] transition hover:bg-[#eef4ff] disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!hasUnsavedChanges || isSaving}
        onClick={onCancel}
        type="button"
        whileHover={{ y: hasUnsavedChanges ? -1 : 0 }}
        whileTap={{ scale: hasUnsavedChanges ? 0.98 : 1 }}
      >
        Cancel
      </motion.button>
      <motion.button
        className="h-11 rounded-xl bg-[#0B63E5] px-10 text-sm font-black text-white shadow-[0_14px_30px_rgba(11,99,229,0.22)] transition hover:bg-[#0957ca] disabled:cursor-not-allowed disabled:opacity-60"
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
  const [profile, setProfile] = useState<JobSeekerProfile>(() =>
    getStoredJobSeekerProfile(),
  );
  const [formState, setFormState] = useState<ResumeFormState>(() =>
    resumeDataToFormState(getResumeData()),
  );
  const [savedState, setSavedState] = useState<ResumeFormState>(() =>
    resumeDataToFormState(getResumeData()),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const hasUnsavedChanges = useMemo(
    () => JSON.stringify(formState) !== JSON.stringify(savedState),
    [formState, savedState],
  );

  useEffect(() => {
    function handleProfileUpdate() {
      setProfile(getStoredJobSeekerProfile());
      const storedResume = resumeDataToFormState(getResumeData());
      setFormState(storedResume);
      setSavedState(storedResume);
    }

    handleProfileUpdate();
    window.addEventListener("mediahire:jobseeker-profile-updated", handleProfileUpdate);

    return () => {
      window.removeEventListener(
        "mediahire:jobseeker-profile-updated",
        handleProfileUpdate,
      );
    };
  }, []);

  function updateSection(id: keyof ResumeFormState, value: string) {
    setFormState((current) => ({ ...current, [id]: value }));
    setSaveMessage("");
  }

  function handleCancel() {
    setFormState(savedState);
    setSaveMessage("");
  }

  async function handleSave() {
    setIsSaving(true);
    setSaveMessage("");

    try {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        throw error || new Error("Please sign in before saving your resume.");
      }

      const { error: resumeError } = await supabase.from("jobseeker_resumes").upsert(
        {
          about: formState.about || null,
          education: formState.education || null,
          job_preferences: formState.jobPreferences || null,
          languages: formState.languages || null,
          links: formState.links || null,
          preferred_job_benefits: formState.benefits || null,
          professional_skill: formState.skills || null,
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
          bio: formState.about || null,
          skills: formState.skills || null,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", data.user.id);

      if (profileError) {
        // Some projects keep the profile owner in `id` instead of `user_id`.
        await supabase
          .from("profiles")
          .update({
            bio: formState.about || null,
            skills: formState.skills || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", data.user.id);
      }

      updateResumeData(formStateToResumeData(formState, getResumeData()));
      const updatedProfile = {
        ...profile,
        bio: formState.about || profile.bio,
        resumeUrl: profile.resumeUrl,
        skills: formState.skills || profile.skills,
      };
      saveJobSeekerProfile(updatedProfile);
      setProfile(updatedProfile);

      setSavedState(formState);
      setSaveMessage("Resume changes saved successfully.");
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Could not save resume");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <motion.main
      animate="show"
      className="min-h-screen bg-[#f5f7fb] px-4 py-6 text-slate-950 sm:px-6 lg:px-8"
      initial="hidden"
      variants={fadeIn}
    >
      <div className="mx-auto grid max-w-[1500px] gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
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

          <div className="mt-8 max-w-4xl space-y-6">
            <ResumeHeaderCard profile={profile} />
            <PersonalInfoGrid profile={profile} />

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
                className="rounded-2xl bg-emerald-50 px-5 py-4 text-sm font-black text-emerald-700"
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
