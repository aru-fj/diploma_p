"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  getStoredJobSeekerProfile,
  type JobSeekerProfile,
} from "./account-settings/profile-store";
import { mediaHireMotion } from "./ui/design-system";
import { JobSeekerAvatar } from "./jobseeker-avatar-placeholder";

type JobSeekerUserMenuProps = {
  buttonClassName?: string;
  avatarClassName?: string;
  nameClassName?: string;
  chevronSize?: number;
  isOpen?: boolean;
  onToggle?: () => void;
};

function displayName(profile: JobSeekerProfile | null) {
  if (!profile) {
    return "Job Seeker";
  }

  return (
    profile.fullName ||
    [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
    "Job Seeker"
  );
}

export function JobSeekerUserMenu({
  buttonClassName,
  avatarClassName,
  nameClassName,
  chevronSize = 16,
  isOpen,
  onToggle,
}: JobSeekerUserMenuProps) {
  const router = useRouter();

  const [profile, setProfile] = useState<JobSeekerProfile | null>(null);
  const [internalOpen, setInternalOpen] = useState(false);

  const open = isOpen ?? internalOpen;
  const name = displayName(profile);
  const avatarSrc = profile?.avatarPreview || "";

  useEffect(() => {
    const syncProfile = () => {
      setProfile(getStoredJobSeekerProfile());
    };

    syncProfile();

    window.addEventListener("mediahire:jobseeker-profile-updated", syncProfile);
    window.addEventListener("mediahire:user-state-updated", syncProfile);
    window.addEventListener("storage", syncProfile);

    return () => {
      window.removeEventListener(
        "mediahire:jobseeker-profile-updated",
        syncProfile,
      );
      window.removeEventListener("mediahire:user-state-updated", syncProfile);
      window.removeEventListener("storage", syncProfile);
    };
  }, []);

  function toggleMenu() {
    if (onToggle) {
      onToggle();
      return;
    }

    setInternalOpen((current) => !current);
  }

  function openAccount() {
    router.push("/account/jobseeker");
  }

  async function handleLogout() {
    window.localStorage.removeItem("mediahire.pendingProfile");
    window.localStorage.removeItem("mediahire.jobseeker.googleProfile");
    window.localStorage.removeItem("mediahire.employer.companyDetails");

    await signOut({ callbackUrl: "/", redirect: false });
    router.push("/");
  }

  return (
    <div className="relative z-[9999] inline-flex items-center overflow-visible">
      <button
        aria-label="Open job seeker account"
        className={
          buttonClassName ||
          "inline-flex min-h-12 items-center gap-3 rounded-2xl px-2.5 py-1.5 text-sm font-black text-slate-700 transition hover:bg-[#eef4ff]"
        }
        onClick={openAccount}
        type="button"
      >
        <span className="relative block">
          <JobSeekerAvatar
            className={
              avatarClassName ||
              "h-10 w-10 overflow-hidden rounded-full ring-2 ring-white"
            }
            iconSize={18}
            size={40}
            src={avatarSrc}
          />

          {avatarSrc ? (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
          ) : null}
        </span>

        <span
          className={
            nameClassName ||
            "hidden max-w-[150px] truncate text-sm font-black text-slate-700 md:block"
          }
        >
          {name}
        </span>

      </button>

      <button
        aria-expanded={open}
        aria-label="Open user menu"
        className="ml-1 grid h-8 w-8 place-items-center rounded-xl text-[#0B63E5] transition hover:bg-[#eef4ff]"
        onClick={toggleMenu}
        type="button"
      >
        <ChevronDown
          className={`transition ${open ? "rotate-180" : ""}`}
          size={chevronSize}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute right-0 top-full z-[9999] mt-4 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_22px_70px_rgba(15,23,42,0.16)]"
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={mediaHireMotion.fast}
          >
            <button
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-black text-slate-700 transition hover:bg-[#eef4ff] hover:text-[#0B63E5]"
              onClick={() => router.push("/account/jobseeker")}
              type="button"
            >
              <UserRound size={18} />
              Account
            </button>

            <button
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-black text-red-600 transition hover:bg-red-50"
              onClick={() => {
                void handleLogout();
              }}
              type="button"
            >
              <LogOut size={18} />
              Log out
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
