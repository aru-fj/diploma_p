"use client";

import { FileText } from "lucide-react";
import { motion } from "framer-motion";
import type { ChatMessage } from "./community-data";
import { fadeInUp, mediaHireMotion } from "../ui/design-system";

type MessageBubbleProps = {
  message: ChatMessage;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isMine = message.sender === "me";

  if (message.type === "file") {
    return (
      <motion.div
        animate="show"
        className={`flex ${isMine ? "justify-end" : "justify-start"}`}
        initial="hidden"
        transition={mediaHireMotion.fast}
        variants={fadeInUp}
      >
        <div
          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
            isMine
              ? "bg-[#0B63E5] text-white"
              : "bg-[#eef4ff] text-slate-700"
          }`}
        >
          <div className="flex items-center gap-2 text-sm font-black">
            <FileText size={17} />
            {message.fileName}
          </div>
          <div
            className={`mt-1 text-right text-[10px] font-bold ${
              isMine ? "text-white/75" : "text-slate-400"
            }`}
          >
            {message.time}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      animate="show"
      className={`flex ${isMine ? "justify-end" : "justify-start"}`}
      initial="hidden"
      transition={mediaHireMotion.fast}
      variants={fadeInUp}
    >
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm font-medium leading-6 ${
          isMine
            ? "rounded-br-md bg-[#0B63E5] text-white"
            : "rounded-bl-md bg-[#eef4ff] text-slate-700"
        }`}
      >
        {message.text}
        <div
          className={`mt-1 text-right text-[10px] font-bold ${
            isMine ? "text-white/75" : "text-slate-400"
          }`}
        >
          {message.time}
        </div>
      </div>
    </motion.div>
  );
}
