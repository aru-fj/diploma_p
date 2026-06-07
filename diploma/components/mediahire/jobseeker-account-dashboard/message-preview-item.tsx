"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { MessagePreview } from "./dashboard-data";
import { mediaHireMotion } from "../ui/design-system";

type MessagePreviewItemProps = {
  message: MessagePreview;
};

export function MessagePreviewItem({ message }: MessagePreviewItemProps) {
  const router = useRouter();

  return (
    <motion.button
      className="grid w-full grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-2.5 rounded-xl px-2 py-2 text-left transition hover:bg-slate-50"
      onClick={() => router.push("/dashboard/jobseeker/community")}
      type="button"
      whileHover={{ x: 3, transition: mediaHireMotion.fast }}
    >
      <span
        className={`grid h-9 w-9 place-items-center rounded-full text-xs font-black ${message.avatarClass}`}
      >
        {message.initials}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-xs font-black text-slate-950">
          {message.name}
        </span>
        <span className="mt-0.5 block truncate text-[11px] font-medium text-slate-500">
          {message.preview}
        </span>
      </span>
      <span className="grid justify-items-end gap-1">
        <span className="text-[10px] font-semibold text-slate-400">
          {message.time}
        </span>
        {message.unread > 0 ? (
          <span className="grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1.5 text-[10px] font-black text-white">
            {message.unread}
          </span>
        ) : null}
      </span>
    </motion.button>
  );
}
