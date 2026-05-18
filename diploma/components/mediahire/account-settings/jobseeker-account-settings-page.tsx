"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ChangeEvent } from "react";
import {
  Bell,
  CircleHelp,
  FileText,
  ImagePlus,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  SlidersHorizontal,
  Upload,
  UserCog,
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
  saveJobSeekerProfile,
  type JobSeekerProfile,
} from "./profile-store";
import { profileAvatar } from "../jobseeker-dashboard/dashboard-data";

type SidebarItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

type AccountInputProps = {
  error?: string;
  label: string;
  name: keyof JobSeekerProfile;
  onChange: (name: keyof JobSeekerProfile, value: string) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
  value: string;
};

const sidebarItems: SidebarItem[] = [
  { href: "/account/jobseeker", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/account/jobseeker/resume", icon: FileText, label: "My Resume" },
  { href: "/settings/jobseeker", icon: Settings, label: "Settings" },
  { href: "/account/jobseeker/settings", icon: UserCog, label: "Account Setting" },
];

function buildProfile(profile: JobSeekerProfile): JobSeekerProfile {
  return {
    ...profile,
    city: profile.city || profile.location.split(",")[0] || "Astana",
    fullName: `${profile.firstName} ${profile.lastName}`.trim(),
    location:
      profile.location ||
      [profile.city || "Astana", "Kazakhstan"].filter(Boolean).join(", "),
  };
}

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

function AccountTopbar({
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
          <h1 className={mediaHireClassNames.h1}>Account Setting</h1>
          <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-slate-500">
            Update your profile and account settings
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

function ProfilePictureUpload({
  error,
  onImageChange,
  onRemove,
  preview,
}: {
  error?: string;
  onImageChange: (preview: string) => void;
  onRemove: () => void;
  preview: string;
}) {
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onImageChange(typeof reader.result === "string" ? reader.result : "");
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <label className="group relative grid h-32 w-32 cursor-pointer place-items-center overflow-hidden rounded-3xl border border-dashed border-slate-400 bg-[#fafcff] text-slate-500 transition hover:border-[#0B63E5] hover:bg-[#eef4ff]">
          {preview ? (
            <Image
              alt="Profile preview"
              className="h-full w-full object-cover"
              height={128}
              src={preview}
              width={128}
              unoptimized
            />
          ) : (
            <ImagePlus size={34} />
          )}
          <input
            accept="image/png,image/jpeg,image/jpg"
            className="sr-only"
            onChange={handleFileChange}
            type="file"
          />
        </label>

        <div>
          <h2 className="text-xl font-black text-[#0B63E5]">Profile Picture</h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            We support PNGs and JPEGs under 10MB
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <label className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0B63E5] px-5 text-sm font-black text-white shadow-[0_14px_30px_rgba(11,99,229,0.22)] transition hover:bg-[#0957ca]">
              <Upload size={16} />
              Upload Picture
              <input
                accept="image/png,image/jpeg,image/jpg"
                className="sr-only"
                onChange={handleFileChange}
                type="file"
              />
            </label>
            <button
              className="h-11 rounded-xl border border-[#0B63E5] bg-white px-5 text-sm font-black text-[#0B63E5] transition hover:bg-[#eef4ff]"
              onClick={onRemove}
              type="button"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      {error ? <p className="mt-3 text-sm font-bold text-red-500">{error}</p> : null}
    </div>
  );
}

function AccountInput({
  error,
  label,
  name,
  onChange,
  placeholder,
  required,
  type = "text",
  value,
}: AccountInputProps) {
  return (
    <label className={name === "email" ? "md:col-span-2" : ""}>
      <span className="mb-2 block text-sm font-black text-slate-800">
        {label}
        {required ? <span className="text-red-500">*</span> : null}
      </span>
      <input
        className={`h-14 w-full rounded-2xl border bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0B63E5] focus:ring-4 focus:ring-blue-100 ${
          error ? "border-red-300" : "border-slate-200"
        }`}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error ? <span className="mt-2 block text-xs font-bold text-red-500">{error}</span> : null}
    </label>
  );
}

function AccountFormSection({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 md:grid-cols-2">{children}</div>;
}

function ActionButtons({
  disabled,
  isSaving,
  onCancel,
  onSave,
}: {
  disabled: boolean;
  isSaving: boolean;
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
      <motion.button
        className="h-11 rounded-xl border border-[#0B63E5] bg-white px-8 text-sm font-black text-[#0B63E5] transition hover:bg-[#eef4ff]"
        onClick={onCancel}
        type="button"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        Cancel
      </motion.button>
      <motion.button
        className="h-11 rounded-xl bg-[#0B63E5] px-10 text-sm font-black text-white shadow-[0_14px_30px_rgba(11,99,229,0.22)] transition hover:bg-[#0957ca] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={disabled || isSaving}
        onClick={onSave}
        type="button"
        whileHover={{ y: disabled ? 0 : -1 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
      >
        {isSaving ? "Saving..." : "Save"}
      </motion.button>
    </div>
  );
}

export function JobSeekerAccountSettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState<JobSeekerProfile>(() =>
    buildProfile(getStoredJobSeekerProfile()),
  );
  const [savedProfile, setSavedProfile] = useState<JobSeekerProfile>(profile);
  const [errors, setErrors] = useState<Partial<Record<keyof JobSeekerProfile | "avatar", string>>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const hasChanges = useMemo(
    () => JSON.stringify(profile) !== JSON.stringify(savedProfile),
    [profile, savedProfile],
  );

  function updateField(name: keyof JobSeekerProfile, value: string) {
    setProfile((current) => buildProfile({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setSaveMessage("");
  }

  function updateAvatar(preview: string) {
    setProfile((current) => ({ ...current, avatarPreview: preview }));
    setErrors((current) => ({ ...current, avatar: "" }));
    setSaveMessage("");
  }

  function validateForm() {
    const nextErrors: Partial<Record<keyof JobSeekerProfile | "avatar", string>> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!profile.firstName.trim()) {
      nextErrors.firstName = "First name is required";
    }

    if (!profile.lastName.trim()) {
      nextErrors.lastName = "Last name is required";
    }

    if (!profile.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!emailRegex.test(profile.email)) {
      nextErrors.email = "Enter a valid email";
    }

    if (profile.minimumSalary && Number.isNaN(Number(profile.minimumSalary))) {
      nextErrors.minimumSalary = "Salary must be numeric";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSave() {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    setSaveMessage("");

    window.setTimeout(() => {
      const normalizedProfile = buildProfile(profile);
      saveJobSeekerProfile(normalizedProfile);
      setSavedProfile(normalizedProfile);
      setProfile(normalizedProfile);
      setIsSaving(false);
      setSaveMessage("Account settings saved successfully.");
    }, 650);
  }

  function handleCancel() {
    setProfile(savedProfile);
    setErrors({});
    setSaveMessage("");
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
          active="Account Setting"
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="min-w-0">
          <AccountTopbar
            onOpenSidebar={() => setIsSidebarOpen(true)}
            profile={profile}
            search={search}
            setSearch={setSearch}
          />

          <motion.section
            animate="show"
            className={`mt-8 max-w-5xl p-5 sm:p-8 ${mediaHireClassNames.card}`}
            initial="hidden"
            transition={mediaHireMotion.item(0)}
            variants={fadeInUp}
          >
            <ProfilePictureUpload
              error={errors.avatar}
              onImageChange={updateAvatar}
              onRemove={() => updateAvatar("")}
              preview={profile.avatarPreview}
            />

            <div className="my-8 h-px bg-slate-100" />

            <AccountFormSection>
              <AccountInput
                error={errors.firstName}
                label="First Name"
                name="firstName"
                onChange={updateField}
                placeholder="Enter your First Name"
                required
                value={profile.firstName}
              />
              <AccountInput
                error={errors.lastName}
                label="Last Name"
                name="lastName"
                onChange={updateField}
                placeholder="Enter your Last Name"
                required
                value={profile.lastName}
              />
              <AccountInput
                label="Location"
                name="location"
                onChange={updateField}
                placeholder="Enter your location"
                value={profile.location}
              />
              <AccountInput
                label="Postal code"
                name="postalCode"
                onChange={updateField}
                placeholder="Enter your Postal code"
                value={profile.postalCode}
              />
              <AccountInput
                error={errors.email}
                label="Email"
                name="email"
                onChange={updateField}
                placeholder="Enter your Email Address"
                required
                type="email"
                value={profile.email}
              />
            </AccountFormSection>

            <div className="my-8 h-px bg-slate-100" />

            <AccountFormSection>
              <AccountInput
                label="Location"
                name="preferredLocation"
                onChange={updateField}
                placeholder="Enter your location"
                value={profile.preferredLocation}
              />
              <AccountInput
                error={errors.minimumSalary}
                label="Minimum Salary Amount"
                name="minimumSalary"
                onChange={updateField}
                placeholder="Enter Minimum Salary Amount"
                value={profile.minimumSalary}
              />
              <AccountInput
                label="Postal code"
                name="preferredPostalCode"
                onChange={updateField}
                placeholder="Enter your Postal code"
                value={profile.preferredPostalCode}
              />
              <AccountInput
                label="Payment Period"
                name="paymentPeriod"
                onChange={updateField}
                placeholder="Enter Payment Period"
                value={profile.paymentPeriod}
              />
            </AccountFormSection>

            {saveMessage ? (
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-2xl bg-emerald-50 px-5 py-4 text-sm font-black text-emerald-700"
                initial={{ opacity: 0, y: 8 }}
              >
                {saveMessage}
              </motion.p>
            ) : null}

            <div className="mt-8">
              <ActionButtons
                disabled={!hasChanges}
                isSaving={isSaving}
                onCancel={handleCancel}
                onSave={handleSave}
              />
            </div>
          </motion.section>
        </div>
      </div>
    </motion.main>
  );
}
