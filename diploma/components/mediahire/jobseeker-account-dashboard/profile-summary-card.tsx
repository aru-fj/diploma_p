"use client";

import { Eye, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { StatsCard } from "./stats-card";
import { fadeInUp, mediaHireClassNames, mediaHireMotion } from "../ui/design-system";
import { getStoredJobSeekerProfile } from "../account-settings/profile-store";
import { JobSeekerAvatar } from "../jobseeker-avatar-placeholder";

export function ProfileSummaryCard() {
  const [profile, setProfile] = useState(() => getStoredJobSeekerProfile());
  const fullName =
    profile.fullName ||
    [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
    "Job Seeker";
  const avatarSrc = profile.avatarPreview;
  const role =
    profile.jobTitle || profile.role || "Creative Specialist";

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
    <motion.section
      animate="show"
      className={`p-4 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(0)}
      variants={fadeInUp}
    >
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <JobSeekerAvatar
            alt={fullName}
            className="h-14 w-14 rounded-2xl ring-4 ring-[#eef4ff]"
            iconSize={22}
            size={56}
            src={avatarSrc}
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-black text-slate-950">
              {fullName}
            </h2>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              {role}, 4+ years of experience
            </p>
            <div className="mt-3 h-1.5 max-w-sm rounded-full bg-slate-100">
              <div className="h-full w-[92%] rounded-full bg-[#0B63E5]" />
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <StatsCard
            count={3}
            icon={Eye}
            label="Viewed your profile"
            tone="green"
          />
          <StatsCard
            count={0}
            icon={Heart}
            label="Liked your resume"
            tone="red"
          />
        </div>
      </div>
    </motion.section>
  );
}
