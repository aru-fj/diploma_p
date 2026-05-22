"use client";

import Image from "next/image";
import { Bell, Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { mediaHireClassNames } from "../ui/design-system";
import { getStoredJobSeekerProfile } from "../account-settings/profile-store";

type DashboardTopbarProps = {
  onOpenSidebar: () => void;
  onSearchChange: (value: string) => void;
  search: string;
};

const avatar =
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=160&q=85";

export function DashboardTopbar({
  onOpenSidebar,
  onSearchChange,
  search,
}: DashboardTopbarProps) {
  const [profile, setProfile] = useState(() => getStoredJobSeekerProfile());
  const fullName =
    profile.fullName ||
    [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
    "Job Seeker";
  const avatarSrc = profile.avatarPreview || avatar;
  const email = profile.email || "No email added";

  useEffect(() => {
    const syncProfile = () => {
      setProfile(getStoredJobSeekerProfile());
    };

    syncProfile();
    window.addEventListener("mediahire:jobseeker-profile-updated", syncProfile);
    window.addEventListener("mediahire:user-state-updated", syncProfile);
    window.addEventListener("storage", syncProfile);

    return () => {
      window.removeEventListener("mediahire:jobseeker-profile-updated", syncProfile);
      window.removeEventListener("mediahire:user-state-updated", syncProfile);
      window.removeEventListener("storage", syncProfile);
    };
  }, []);

  return (
    <header className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex items-start gap-3">
        <button
          aria-label="Open dashboard menu"
          className="mt-1 grid h-10 w-10 place-items-center rounded-xl bg-white text-slate-800 shadow-sm lg:hidden"
          onClick={onOpenSidebar}
          type="button"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            View your activity, applications, and latest updates in one place
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative block w-full sm:w-80">
          <input
            className={`${mediaHireClassNames.input} w-full pr-12`}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search"
            type="search"
            value={search}
          />
          <Search
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-950"
            size={20}
          />
        </label>

        <button
          aria-label="Notifications"
          className="relative grid h-12 w-12 place-items-center rounded-2xl bg-white text-slate-700 shadow-sm transition hover:text-[#0B63E5]"
          type="button"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white">
            1
          </span>
        </button>

        <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2 shadow-sm">
          <Image
            alt={fullName}
            className="h-12 w-12 rounded-xl object-cover"
            height={48}
            src={avatarSrc}
            unoptimized={avatarSrc.startsWith("data:")}
            width={48}
          />
          <div>
            <p className="text-sm font-black text-slate-950">{fullName}</p>
            <p className="text-xs font-medium text-slate-400">
              {email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
