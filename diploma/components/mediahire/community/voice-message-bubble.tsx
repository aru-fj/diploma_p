"use client";

import { Play } from "lucide-react";
import { motion } from "framer-motion";
import type { ChatMessage } from "./community-data";
import { fadeInUp, mediaHireMotion } from "../ui/design-system";

const waveform = [
  8, 13, 9, 16, 11, 22, 12, 17, 26, 14, 20, 10, 15, 23, 12, 19, 9, 16, 12, 8,
];

type VoiceMessageBubbleProps = {
  message: ChatMessage;
};

export function VoiceMessageBubble({ message }: VoiceMessageBubbleProps) {
  return (
    <motion.div
      animate="show"
      className="flex justify-start"
      initial="hidden"
      transition={mediaHireMotion.fast}
      variants={fadeInUp}
    >
      <div className="flex max-w-[82%] items-center gap-3 rounded-2xl rounded-bl-md bg-[#dcecff] px-3 py-2 text-[#0B63E5]">
        <button
          aria-label="Play voice message"
          className="grid h-8 w-8 place-items-center rounded-full bg-[#0B63E5] text-white transition hover:scale-105"
          type="button"
        >
          <Play fill="currentColor" size={14} />
        </button>
        <div className="flex h-8 items-center gap-0.5">
          {waveform.map((height, index) => (
            <span
              className="w-1 rounded-full bg-[#0B63E5]/55"
              key={`${height}-${index}`}
              style={{ height }}
            />
          ))}
        </div>
        <span className="text-[10px] font-black text-slate-500">
          {message.duration ?? "0:15"}
        </span>
      </div>
    </motion.div>
  );
}
