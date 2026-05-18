"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { ChatListItem } from "./chat-list-item";
import type { Conversation } from "./community-data";
import {
  mediaHireClassNames,
  mediaHireMotion,
  slideInLeft,
} from "../ui/design-system";

type ChatSidebarProps = {
  conversations: Conversation[];
  query: string;
  selectedId: string | null;
  onQueryChange: (value: string) => void;
  onSelect: (conversationId: string) => void;
};

export function ChatSidebar({
  conversations,
  query,
  selectedId,
  onQueryChange,
  onSelect,
}: ChatSidebarProps) {
  return (
    <motion.aside
      animate="show"
      className={`h-full p-4 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.panel}
      variants={slideInLeft}
    >
      <label className="relative block">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          className={`${mediaHireClassNames.input} w-full pl-12 pr-4`}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search"
          type="search"
          value={query}
        />
      </label>

      <div className="mt-4 space-y-1">
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
            <ChatListItem
              conversation={conversation}
              isActive={conversation.id === selectedId}
              key={conversation.id}
              onSelect={onSelect}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 p-5 text-center text-sm font-semibold text-slate-400">
            No conversations found
          </div>
        )}
      </div>
    </motion.aside>
  );
}
