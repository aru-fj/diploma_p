"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useJobSeekerLanguage } from "@/components/mediahire/i18n/jobseeker-language-provider";
import {
  Bell,
  CircleHelp,
  FileText,
  House,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  X,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/lib/supabase-client";

import {
  fadeIn,
  fadeInUp,
  mediaHireClassNames,
  mediaHireMotion,
  slideInLeft,
} from "../ui/design-system";
import {
  getCurrentUserProfile,
  getSettings,
  updateSettings,
  type JobSeekerSettings,
} from "../shared/user-state";
import { JobSeekerAvatar } from "../jobseeker-avatar-placeholder";

type SidebarItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

const sidebarItems: SidebarItem[] = [
  { href: "/home/jobseeker", icon: House, label: "Home" },
  { href: "/account/jobseeker", icon: LayoutDashboard, label: "Activity" },
  { href: "/account/jobseeker/resume", icon: FileText, label: "My Resume" },
  { href: "/settings/jobseeker", icon: Settings, label: "Settings" },
];

function AccountSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useJobSeekerLanguage();

  const sidebar = (
    <motion.aside
      animate="show"
      className="flex h-full w-full flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_14px_44px_rgba(15,23,42,0.045)]"
      initial="hidden"
      transition={mediaHireMotion.panel}
      variants={slideInLeft}
    >
      <div className="flex items-center justify-between gap-4">
        <Link className="flex items-center gap-2.5" href="/home/jobseeker">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0B63E5] text-xl font-black text-white shadow-[0_12px_28px_rgba(11,99,229,0.18)]">
            M
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
        <button
          aria-label={t("common.closeMenu")}
          className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 lg:hidden"
          onClick={onClose}
          type="button"
        >
          <X size={18} />
        </button>
      </div>

      <p className="mt-6 px-3 text-[11px] font-bold text-slate-400">{t("common.main")}</p>
      <nav className="mt-2 grid gap-1.5">
        {sidebarItems.map((item) => {
          const isActive = item.label === "Settings";

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
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-[#f8fbff] p-3">
      <span className="text-xs font-black text-slate-700">{label}</span>
      <button
        className={`relative h-7 w-12 rounded-full transition ${
          checked ? "bg-[#0B63E5]" : "bg-slate-300"
        }`}
        onClick={() => onChange(!checked)}
        type="button"
      >
        <span
          className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}


function slugifySettingsPublicProfileName(value?: string | null) {
  return (value || "mediahire-user")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

export function JobSeekerSettingsPage() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const { language, setLanguage, t } = useJobSeekerLanguage();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [settings, setSettings] = useState<JobSeekerSettings>(() => ({
    ...getSettings(),
    profileVisibility: false,
    publicPortfolio: false,
  }));
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [profile, setProfile] = useState<ReturnType<typeof getCurrentUserProfile> | null>(null);

  useEffect(() => {
    setProfile(getCurrentUserProfile());
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadPublicSettings() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      const byUserId = await supabase
        .from("profiles")
        .select("profile_visibility,public_portfolio")
        .eq("user_id", user.id)
        .maybeSingle();

      let profileRow = byUserId.data;

      if (!profileRow) {
        const byId = await supabase
          .from("profiles")
          .select("profile_visibility,public_portfolio")
          .eq("id", user.id)
          .maybeSingle();

        profileRow = byId.data;
      }

      if (!isMounted || !profileRow) {
        return;
      }

      setSettings((current) => ({
        ...current,
        profileVisibility: Boolean(profileRow.profile_visibility),
        publicPortfolio: Boolean(profileRow.public_portfolio),
      }));
    }

    loadPublicSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const avatarSrc = profile?.avatarPreview || "";
  const passwordError =
    settings.password && settings.password.length < 8
      ? t("settings.passwordMinError")
      : settings.password !== confirmPassword
        ? t("settings.passwordMatchError")
        : "";

  function patchSettings(patch: Partial<JobSeekerSettings>) {
    setSettings((current) => {
      const next = { ...current, ...patch };

      if (patch.profileVisibility === false) {
        next.publicPortfolio = false;
      }

      if (patch.publicPortfolio === true) {
        next.profileVisibility = true;
      }

      return next;
    });

    setSavedMessage("");
  }

  async function handleSave() {
    if (passwordError) {
      return;
    }

    const nextSettings = {
      ...settings,
      publicPortfolio:
        Boolean(settings.profileVisibility) && Boolean(settings.publicPortfolio),
    };

    updateSettings(nextSettings);
    setSettings(nextSettings);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const currentProfile = getCurrentUserProfile();
        const authEmail = user.email || currentProfile.email || "";
        const fullName =
          currentProfile.fullName ||
          [currentProfile.firstName, currentProfile.lastName]
            .filter(Boolean)
            .join(" ") ||
          authEmail.split("@")[0] ||
          "MediaHire creator";

        const publicSlug =
          (currentProfile as any).publicSlug ||
          slugifySettingsPublicProfileName(fullName || authEmail);

        const payload = {
          email: authEmail,
          full_name: fullName,
          profile_visibility: Boolean(nextSettings.profileVisibility),
          public_portfolio: Boolean(nextSettings.publicPortfolio),
          public_slug: publicSlug,
          role: "jobseeker",
          updated_at: new Date().toISOString(),
          user_id: user.id,
        };

        const byUserId = await supabase
          .from("profiles")
          .select("id,user_id")
          .eq("user_id", user.id)
          .maybeSingle();

        if (byUserId.data) {
          const { error } = await supabase
            .from("profiles")
            .update(payload)
            .eq("user_id", user.id);

          if (error) {
            throw error;
          }
        } else {
          const byId = await supabase
            .from("profiles")
            .select("id,user_id")
            .eq("id", user.id)
            .maybeSingle();

          if (byId.data) {
            const { error } = await supabase
              .from("profiles")
              .update(payload)
              .eq("id", user.id);

            if (error) {
              throw error;
            }
          } else {
            const { error } = await supabase.from("profiles").insert({
              ...payload,
              created_at: new Date().toISOString(),
            });

            if (error) {
              throw error;
            }
          }
        }
      }

      window.dispatchEvent(new Event("mediahire:settings-updated"));
      window.dispatchEvent(new Event("mediahire:jobseeker-profile-updated"));
      window.dispatchEvent(new Event("mediahire:projects-updated"));

      setSavedMessage(t("settings.savedSuccess"));
    } catch (error) {
      console.error("Could not save public settings:", error);
      setSavedMessage("Could not save settings. Please try again.");
    }
  }


  if (!isHydrated) {
    return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-4 text-slate-950 sm:px-5 lg:px-6">
      <div className="mx-auto grid w-full max-w-[1240px] gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
        <section className="min-w-0 lg:col-start-2">
          <div className="rounded-2xl bg-white p-5 text-sm font-black text-slate-400 shadow-sm">
            Loading settings...
          </div>
        </section>
      </div>
    </main>
    );
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
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="min-w-0">
          <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <button
                aria-label={t("common.openMenu")}
                className="mt-1 grid h-10 w-10 place-items-center rounded-xl bg-white text-slate-800 shadow-sm lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
                type="button"
              >
                <Menu size={20} />
              </button>
              <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-950">
  {t("settings.title")}
</h1>
                <p className="mt-1 max-w-xl text-sm font-medium leading-5 text-slate-500">
                  Manage notifications, profile visibility, integrations, and security.
                </p>
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
              <label className="flex h-9 min-w-0 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 shadow-[0_10px_26px_rgba(15,23,42,0.035)] sm:w-64 lg:w-56 xl:w-64">
                <input
                  className="min-w-0 flex-1 bg-transparent text-xs font-semibold text-slate-900 outline-none placeholder:text-slate-400"
                  placeholder={t("common.search")}
                  type="search"
                />
                <Search className="text-slate-400" size={16} />
              </label>
              <div className="flex min-w-0 items-center gap-2 rounded-xl bg-white p-1.5 shadow-[0_10px_26px_rgba(15,23,42,0.035)] sm:max-w-[220px]">
                <Link
                  aria-label={t("common.notifications")}
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
                      {profile?.fullName || t("common.jobSeeker")}
                    </span>
                    <span className="block truncate text-[10px] font-semibold text-slate-400">
                      {profile?.email || ""}
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </header>

          <motion.section
            animate="show"
            className={`mt-5 max-w-[860px] p-4 ${mediaHireClassNames.card}`}
            initial="hidden"
            transition={mediaHireMotion.item(0)}
            variants={fadeInUp}
          >
            <div className="grid gap-3 md:grid-cols-2">
              <ToggleRow
                checked={settings.jobAlerts}
                label={t("settings.jobAlerts")}
                onChange={(value) => patchSettings({ jobAlerts: value })}
              />
              <ToggleRow
                checked={settings.applicationUpdates}
                label={t("settings.applicationUpdates")}
                onChange={(value) => patchSettings({ applicationUpdates: value })}
              />
              <ToggleRow
                checked={settings.messages}
                label={t("common.messages")}
                onChange={(value) => patchSettings({ messages: value })}
              />
              <ToggleRow
                checked={settings.profileVisibility}
                label={t("settings.profileVisibility")}
                onChange={(value) => patchSettings({ profileVisibility: value })}
              />
              <ToggleRow
                checked={settings.publicPortfolio}
                label={t("settings.publicPortfolio")}
                onChange={(value) => patchSettings({ publicPortfolio: value })}
              />
              <ToggleRow
                checked={settings.googleIntegration}
                label={t("settings.googleIntegration")}
                onChange={(value) => patchSettings({ googleIntegration: value })}
              />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label>
  <span className="mb-2 block text-xs font-black text-slate-800">
    {t("settings.language")}
  </span>

  <select
    className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold outline-none focus:border-[#0B63E5] focus:ring-4 focus:ring-blue-100"
    value={language}
    onChange={(event) => {
      const nextLanguage = event.target.value as "en" | "kk" | "ru";
      setLanguage(nextLanguage);

      patchSettings({
        language:
          nextLanguage === "en"
            ? "English"
            : nextLanguage === "kk"
              ? "Kazakh"
              : "Russian",
      });
    }}
  >
    <option value="en">{t("settings.english")}</option>
    <option value="kk">{t("settings.kazakh")}</option>
    <option value="ru">{t("settings.russian")}</option>
  </select>
</label>
              <label>
                <span className="mb-2 block text-xs font-black text-slate-800">
                  Theme
                </span>
                <select
                  className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold outline-none focus:border-[#0B63E5] focus:ring-4 focus:ring-blue-100"
                  onChange={(event) => patchSettings({ theme: event.target.value })}
                  value={settings.theme}
                >
                  <option value="Light">{t("settings.light")}</option>
                  <option value="System">{t("settings.system")}</option>
                </select>
              </label>
              <label>
                <span className="mb-2 block text-xs font-black text-slate-800">
                  New Password
                </span>
                <input
                  className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold outline-none focus:border-[#0B63E5] focus:ring-4 focus:ring-blue-100"
                  onChange={(event) =>
                    patchSettings({ password: event.target.value })
                  }
                  placeholder={t("settings.enterNewPassword")}
                  type="password"
                  value={settings.password}
                />
              </label>
              <label>
                <span className="mb-2 block text-xs font-black text-slate-800">
                  Confirm Password
                </span>
                <input
                  className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold outline-none focus:border-[#0B63E5] focus:ring-4 focus:ring-blue-100"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder={t("settings.confirmPasswordPlaceholder")}
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
              <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-xs font-black text-emerald-700">
                {savedMessage}
              </p>
            ) : null}

            <div className="mt-5 flex gap-2">
              <button
                className="h-9 rounded-xl border border-[#0B63E5] bg-white px-4 text-xs font-black text-[#0B63E5] transition hover:bg-[#eef4ff]"
                onClick={() => {
                  setSettings(getSettings());
                  setConfirmPassword("");
                }}
                type="button"
              >
                {t("common.cancel")}
              </button>
              <button
                className="h-9 rounded-xl bg-[#0B63E5] px-5 text-xs font-black text-white shadow-[0_12px_26px_rgba(11,99,229,0.18)] transition hover:bg-[#0957ca] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={Boolean(passwordError)}
                onClick={handleSave}
                type="button"
              >
                {t("common.save")}
              </button>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.main>
  );
}
