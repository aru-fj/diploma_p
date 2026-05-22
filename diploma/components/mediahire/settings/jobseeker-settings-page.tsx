"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Bell,
  CircleHelp,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
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
import { profileAvatar } from "../jobseeker-dashboard/dashboard-data";
import {
  getCurrentUserProfile,
  getSettings,
  updateSettings,
  type JobSeekerSettings,
} from "../shared/user-state";

type SidebarItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

const sidebarItems: SidebarItem[] = [
  { href: "/account/jobseeker", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/account/jobseeker/resume", icon: FileText, label: "My Resume" },
  { href: "/settings/jobseeker", icon: Settings, label: "Settings" },
  { href: "/account/jobseeker/settings", icon: UserCog, label: "Account Setting" },
];

function AccountSidebar({
  isOpen,
  onClose,
}: {
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
        <Link className="flex items-center gap-3" href="/account/jobseeker">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0B63E5] text-2xl font-black text-white shadow-[0_16px_36px_rgba(11,99,229,0.22)]">
            M
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
          const isActive = item.label === "Settings";

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

function ToggleRow({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-[#f8fbff] p-4">
      <span className="text-sm font-black text-slate-700">{label}</span>
      <button
        className={`relative h-8 w-14 rounded-full transition ${
          checked ? "bg-[#0B63E5]" : "bg-slate-300"
        }`}
        onClick={() => onChange(!checked)}
        type="button"
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${
            checked ? "left-7" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

export function JobSeekerSettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [settings, setSettings] = useState<JobSeekerSettings>(() => getSettings());
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const profile = useMemo(() => getCurrentUserProfile(), []);
  const avatarSrc = profile.avatarPreview || profileAvatar;
  const passwordError =
    settings.password && settings.password.length < 8
      ? "Password must be at least 8 characters"
      : settings.password !== confirmPassword
        ? "Passwords must match"
        : "";

  function patchSettings(patch: Partial<JobSeekerSettings>) {
    setSettings((current) => ({ ...current, ...patch }));
    setSavedMessage("");
  }

  function handleSave() {
    if (passwordError) {
      return;
    }

    updateSettings(settings);
    setSavedMessage("Settings saved successfully.");
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
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="min-w-0">
          <header className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-start gap-3">
              <button
                aria-label="Open menu"
                className="mt-1 grid h-11 w-11 place-items-center rounded-2xl bg-white text-slate-800 shadow-sm lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
                type="button"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className={mediaHireClassNames.h1}>Settings</h1>
                <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-slate-500">
                  Manage notifications, profile visibility, integrations, and security.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="flex h-12 min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-[0_12px_32px_rgba(15,23,42,0.04)] sm:w-72">
                <input
                  className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
                  placeholder="Search"
                  type="search"
                />
                <Search className="text-slate-500" size={18} />
              </label>
              <div className="flex items-center gap-3 rounded-2xl bg-white p-2 shadow-[0_12px_32px_rgba(15,23,42,0.04)]">
                <Bell className="text-[#0B63E5]" size={18} />
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

          <motion.section
            animate="show"
            className={`mt-8 max-w-5xl p-5 sm:p-8 ${mediaHireClassNames.card}`}
            initial="hidden"
            transition={mediaHireMotion.item(0)}
            variants={fadeInUp}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <ToggleRow
                checked={settings.jobAlerts}
                label="Job Alerts"
                onChange={(value) => patchSettings({ jobAlerts: value })}
              />
              <ToggleRow
                checked={settings.applicationUpdates}
                label="Application Updates"
                onChange={(value) => patchSettings({ applicationUpdates: value })}
              />
              <ToggleRow
                checked={settings.messages}
                label="Messages"
                onChange={(value) => patchSettings({ messages: value })}
              />
              <ToggleRow
                checked={settings.profileVisibility}
                label="Profile Visibility"
                onChange={(value) => patchSettings({ profileVisibility: value })}
              />
              <ToggleRow
                checked={settings.publicPortfolio}
                label="Public Portfolio"
                onChange={(value) => patchSettings({ publicPortfolio: value })}
              />
              <ToggleRow
                checked={settings.googleIntegration}
                label="Google integration"
                onChange={(value) => patchSettings({ googleIntegration: value })}
              />
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <label>
                <span className="mb-2 block text-sm font-black text-slate-800">
                  Language
                </span>
                <select
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-[#0B63E5] focus:ring-4 focus:ring-blue-100"
                  onChange={(event) =>
                    patchSettings({ language: event.target.value })
                  }
                  value={settings.language}
                >
                  <option>English</option>
                  <option>Russian</option>
                  <option>Kazakh</option>
                </select>
              </label>
              <label>
                <span className="mb-2 block text-sm font-black text-slate-800">
                  Theme
                </span>
                <select
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-[#0B63E5] focus:ring-4 focus:ring-blue-100"
                  onChange={(event) => patchSettings({ theme: event.target.value })}
                  value={settings.theme}
                >
                  <option>Light</option>
                  <option>System</option>
                </select>
              </label>
              <label>
                <span className="mb-2 block text-sm font-black text-slate-800">
                  New Password
                </span>
                <input
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-[#0B63E5] focus:ring-4 focus:ring-blue-100"
                  onChange={(event) =>
                    patchSettings({ password: event.target.value })
                  }
                  placeholder="Enter new password"
                  type="password"
                  value={settings.password}
                />
              </label>
              <label>
                <span className="mb-2 block text-sm font-black text-slate-800">
                  Confirm Password
                </span>
                <input
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-[#0B63E5] focus:ring-4 focus:ring-blue-100"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Confirm password"
                  type="password"
                  value={confirmPassword}
                />
                {passwordError ? (
                  <span className="mt-2 block text-xs font-bold text-red-500">
                    {passwordError}
                  </span>
                ) : null}
              </label>
            </div>

            {savedMessage ? (
              <p className="mt-6 rounded-2xl bg-emerald-50 px-5 py-4 text-sm font-black text-emerald-700">
                {savedMessage}
              </p>
            ) : null}

            <div className="mt-8 flex gap-3">
              <button
                className="h-11 rounded-xl border border-[#0B63E5] bg-white px-8 text-sm font-black text-[#0B63E5] transition hover:bg-[#eef4ff]"
                onClick={() => {
                  setSettings(getSettings());
                  setConfirmPassword("");
                }}
                type="button"
              >
                Cancel
              </button>
              <button
                className="h-11 rounded-xl bg-[#0B63E5] px-10 text-sm font-black text-white shadow-[0_14px_30px_rgba(11,99,229,0.22)] transition hover:bg-[#0957ca] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={Boolean(passwordError)}
                onClick={handleSave}
                type="button"
              >
                Save
              </button>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.main>
  );
}
