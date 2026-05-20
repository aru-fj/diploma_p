"use client";

import { useEffect, useState } from "react";
import { Check, Plus } from "lucide-react";
import { motion } from "framer-motion";
import {
  isProfileSaved,
  toggleSavedProfile,
  SAVED_PROFILES_CHANGED_EVENT,
} from "@/components/mediahire/saved-profiles-storage";

type SaveProfileButtonProps = {
  profileId: string;
};

export function SaveProfileButton({ profileId }: SaveProfileButtonProps) {
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const syncSavedState = () => {
      setSaved(isProfileSaved(profileId));
    };

    syncSavedState();

    window.addEventListener(SAVED_PROFILES_CHANGED_EVENT, syncSavedState);
    window.addEventListener("storage", syncSavedState);

    return () => {
      window.removeEventListener(SAVED_PROFILES_CHANGED_EVENT, syncSavedState);
      window.removeEventListener("storage", syncSavedState);
    };
  }, [profileId]);

  function handleSaveClick() {
    try {
      const nextSaved = toggleSavedProfile(profileId);

      setSaved(nextSaved);

      setMessage(
        nextSaved
          ? "Profile saved successfully."
          : "Profile removed from saved."
      );

      window.setTimeout(() => {
        setMessage("");
      }, 2500);
    } catch {
      setMessage("Saving failed. Please try again.");
    }
  }

  return (
    <div className="grid gap-2">
      <motion.button
        className={`flex h-11 items-center justify-center gap-2 rounded-full text-sm font-black shadow-[0_16px_34px_rgba(15,23,42,0.14)] transition ${
          saved
            ? "bg-emerald-500 text-white hover:bg-emerald-600"
            : "bg-[#0B63E5] text-white hover:bg-[#0958cc]"
        }`}
        onClick={handleSaveClick}
        type="button"
        whileTap={{ scale: 0.98 }}
      >
        {saved ? <Check size={18} /> : <Plus size={18} />}
        {saved ? "Saved" : "Save"}
      </motion.button>

      {message ? (
        <p
          className={`text-center text-xs font-black ${
            saved ? "text-emerald-600" : "text-slate-500"
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
