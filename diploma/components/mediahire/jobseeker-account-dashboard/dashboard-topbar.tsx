"use client";

import Link from "next/link";
import { Bell, Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { mediaHireClassNames } from "../ui/design-system";
import { getStoredJobSeekerProfile } from "../account-settings/profile-store";
import { JobSeekerAvatar } from "../jobseeker-avatar-placeholder";

type DashboardTopbarProps = {
  onOpenSidebar: () => void;
  onSearchChange: (value: string) => void;
  search: string;
};

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
  const avatarSrc = profile.avatarPreview;
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
    <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
          <h1 className="text-2xl font-black tracking-tight text-slate-950">
            Activity
          </h1>
          <p className="mt-1 max-w-xl text-sm font-medium leading-5 text-slate-500">
            View your activity, applications, and latest updates in one place
          </p>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative block w-full min-w-0 sm:w-64 lg:w-56 xl:w-64">
          <input
            className={`${mediaHireClassNames.input} h-9 w-full pr-10 text-xs`}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search"
            type="search"
            value={search}
          />
          <Search
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-950"
            size={17}
          />
        </label>

        <Link
          aria-label="Notifications"
          className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-slate-700 shadow-sm transition hover:text-[#0B63E5]"
          href="/dashboard/jobseeker/community?chat=mediahire-welcome"
        >
          <Bell size={17} />
        </Link>

        <div className="flex min-w-0 items-center gap-2 rounded-xl bg-white px-2 py-1.5 shadow-sm sm:max-w-[220px]">
          <JobSeekerAvatar
            alt={fullName}
            className="h-8 w-8 shrink-0 rounded-xl"
            iconSize={15}
            size={32}
            src={avatarSrc}
          />
          <div className="min-w-0">
            <p className="truncate text-[11px] font-black text-slate-950">{fullName}</p>
            <p className="truncate text-[10px] font-medium text-slate-400">
              {email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
