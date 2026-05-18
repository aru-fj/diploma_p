"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/mediahire/dashboard/dashboard-header";
import { ChatSidebar } from "./chat-sidebar";
import { ChatWindow } from "./chat-window";
import { EmptyChatState } from "./empty-chat-state";
import {
  conversations as initialConversations,
  type Conversation,
} from "./community-data";
import {
  fadeIn,
  mediaHireClassNames,
  mediaHireMotion,
} from "../ui/design-system";

function formatMessageTime() {
  return new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

export function CommunityPage() {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredConversations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return conversations;
    }

    return conversations.filter((conversation) =>
      `${conversation.name} ${conversation.preview}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [conversations, query]);

  const selectedConversation =
    conversations.find((conversation) => conversation.id === selectedId) ??
    null;

  function handleSelect(conversationId: string) {
    setSelectedId(conversationId);
    setConversations((currentConversations) =>
      currentConversations.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, unread: 0 }
          : conversation,
      ),
    );
  }

  function handleSend(message: string) {
    if (!selectedConversation) {
      return;
    }

    setConversations((currentConversations) =>
      currentConversations.map((conversation) =>
        conversation.id === selectedConversation.id
          ? {
              ...conversation,
              messages: [
                ...conversation.messages,
                {
                  id: `${conversation.id}-${Date.now()}`,
                  sender: "me",
                  text: message,
                  time: formatMessageTime(),
                  type: "text",
                },
              ],
              preview: message,
              time: "Now",
            }
          : conversation,
      ),
    );
  }

  return (
    <motion.main
      animate="show"
      className={`${mediaHireClassNames.appShell} px-4 py-8 sm:px-6`}
      initial="hidden"
      transition={mediaHireMotion.page}
      variants={fadeIn}
    >
      <div className="mx-auto max-w-6xl">
        <DashboardHeader
          activeItem="Community"
          isMenuOpen={isMenuOpen}
          isUserMenuOpen={isUserMenuOpen}
          onToggleMenu={() => setIsMenuOpen((value) => !value)}
          onToggleUserMenu={() => setIsUserMenuOpen((value) => !value)}
        />

        <section className="mt-6">
          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Message
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Communicate with employers and stay updated on job opportunities
          </p>
        </section>

        <section className="mt-4 grid gap-4 lg:h-[500px] lg:grid-cols-[470px_1fr]">
          <div className={selectedConversation ? "hidden lg:block" : "block"}>
            <ChatSidebar
              conversations={filteredConversations}
              onQueryChange={setQuery}
              onSelect={handleSelect}
              query={query}
              selectedId={selectedId}
            />
          </div>

          <div className={selectedConversation ? "block" : "hidden lg:block"}>
            {selectedConversation ? (
              <ChatWindow
                conversation={selectedConversation}
                onBack={() => setSelectedId(null)}
                onSend={handleSend}
              />
            ) : (
              <EmptyChatState />
            )}
          </div>
        </section>
      </div>
    </motion.main>
  );
}
