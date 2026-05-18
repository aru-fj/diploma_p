"use client";

import { motion } from "framer-motion";
import { ChatAvatar } from "./chat-avatar";
import type { Conversation } from "./community-data";
import { mediaHireMotion } from "../ui/design-system";

type ChatListItemProps = {
  conversation: Conversation;
  isActive: boolean;
  onSelect: (conversationId: string) => void;
};

export function ChatListItem({
  conversation,
  isActive,
  onSelect,
}: ChatListItemProps) {
  return (
    <motion.button
      className={`flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition ${
        isActive ? "bg-[#eef4ff]" : "hover:bg-slate-50"
      }`}
      onClick={() => onSelect(conversation.id)}
      type="button"
      whileHover={{ x: 2, transition: mediaHireMotion.fast }}
    >
      <ChatAvatar
        avatar={conversation.avatar}
        color={conversation.color}
        initials={conversation.initials}
        name={conversation.name}
      />

      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-3">
          <span className="truncate text-sm font-black text-slate-950">
            {conversation.name}
          </span>
          <span className="shrink-0 text-[10px] font-semibold text-slate-400">
            {conversation.time}
          </span>
        </span>
        <span className="mt-1 flex items-center gap-2">
          <span className="line-clamp-1 flex-1 text-xs font-medium leading-5 text-slate-500">
            {conversation.preview}
          </span>
          {conversation.unread > 0 ? (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1.5 text-[10px] font-black text-white">
              {conversation.unread}
            </span>
          ) : null}
        </span>
      </span>
    </motion.button>
  );
}
