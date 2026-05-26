"use client";

import Image from "next/image";
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

const fallbackAvatar =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=85";

type JobSeekerUserMenuProps = {
  buttonClassName?: string;
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
  isOpen,
  onToggle,
}: JobSeekerUserMenuProps) {
  const router = useRouter();

  const [profile, setProfile] = useState<JobSeekerProfile | null>(null);
  const [internalOpen, setInternalOpen] = useState(false);

  const open = isOpen ?? internalOpen;
  const name = displayName(profile);
  const avatarSrc = profile?.avatarPreview || fallbackAvatar;

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

  async function handleLogout() {
    window.localStorage.removeItem("mediahire.pendingProfile");
    window.localStorage.removeItem("mediahire.jobseeker.googleProfile");
    window.localStorage.removeItem("mediahire.employer.companyDetails");

    await signOut({ callbackUrl: "/", redirect: false });
    router.push("/");
  }

  return (
    <div className="relative">
      <button
        aria-expanded={open}
        className={
          buttonClassName ||
          "inline-flex min-h-12 items-center gap-3 rounded-2xl px-2.5 py-1.5 text-sm font-black text-slate-700 transition hover:bg-[#eef4ff]"
        }
        onClick={toggleMenu}
        type="button"
      >
        <span className="relative block h-10 w-10 overflow-hidden rounded-full ring-2 ring-white">
          <Image
            alt="Job seeker avatar"
            className="h-full w-full object-cover"
            height={40}
            src={avatarSrc}
            unoptimized={avatarSrc.startsWith("data:")}
            width={40}
          />

          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
        </span>

        <span className="hidden max-w-[150px] truncate text-sm font-black text-slate-700 md:block">
          {name}
        </span>

        <ChevronDown
          className={`text-[#0B63E5] transition ${open ? "rotate-180" : ""}`}
          size={16}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute right-0 top-14 z-50 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_22px_70px_rgba(15,23,42,0.16)]"
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
