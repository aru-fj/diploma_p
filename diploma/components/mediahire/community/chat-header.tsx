"use client";

import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { ChatAvatar } from "./chat-avatar";
import type { Conversation } from "./community-data";

type ChatHeaderProps = {
  conversation: Conversation;
  onBack: () => void;
  onToggleStar: (conversationId: string) => void;
};

export function ChatHeader({
  conversation,
  onBack,
  onToggleStar,
}: ChatHeaderProps) {
  const profileContent = (
    <>
      <ChatAvatar
        avatar={conversation.avatar}
        className="h-11 w-11"
        color={conversation.color}
        initials={conversation.initials}
        name={conversation.name}
      />
      <div className="min-w-0">
        <h2 className="truncate text-sm font-black text-slate-950 sm:text-base">
          {conversation.name}
        </h2>
        <p className="text-xs font-semibold text-slate-500">
          {conversation.lastSeen}
        </p>
      </div>
    </>
  );

  return (
    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <button
          aria-label="Back to conversations"
          className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-700 lg:hidden"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft size={18} />
        </button>
        {conversation.profileHref ? (
          <Link
            className="flex min-w-0 items-center gap-3 rounded-2xl transition hover:bg-slate-50"
            href={conversation.profileHref}
          >
            {profileContent}
          </Link>
        ) : (
          <div className="flex min-w-0 items-center gap-3">{profileContent}</div>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button
          aria-label={
            conversation.starred ? "Remove from highlighted chats" : "Highlight chat"
          }
          className={`grid h-9 w-9 place-items-center rounded-full transition hover:bg-[#eef4ff] hover:text-[#0B63E5] ${
            conversation.starred ? "text-amber-500" : "text-slate-500"
          }`}
          onClick={() => onToggleStar(conversation.id)}
          type="button"
        >
          <Star
            className={conversation.starred ? "fill-amber-400" : ""}
            size={18}
          />
        </button>
      </div>
    </div>
  );
}
