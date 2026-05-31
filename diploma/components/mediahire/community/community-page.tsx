"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/mediahire/dashboard/dashboard-header";
import { ChatSidebar } from "./chat-sidebar";
import { ChatWindow } from "./chat-window";
import { EmptyChatState } from "./empty-chat-state";
import {
  conversations as initialConversations,
  type ChatMessage,
  type Conversation,
} from "./community-data";
import { publicPeople } from "@/components/mediahire/public/public-people-data";
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

const jobSeekerChatsStorageKey = "mediahire_jobseeker_chats";

function readStoredConversations() {
  if (typeof window === "undefined") {
    return initialConversations;
  }

  try {
    const raw = window.localStorage.getItem(jobSeekerChatsStorageKey);
    const parsed = raw ? JSON.parse(raw) : null;

    return Array.isArray(parsed) ? parsed : initialConversations;
  } catch {
    return initialConversations;
  }
}

function persistConversations(conversations: Conversation[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    jobSeekerChatsStorageKey,
    JSON.stringify(conversations),
  );
}

function createConversationFromSlug(slug: string): Conversation | null {
  const person = publicPeople.find((item) => item.slug === slug);

  if (!person) {
    return null;
  }

  return {
    avatar: person.avatar,
    color: "bg-blue-50 text-blue-700",
    id: person.slug,
    initials: person.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    lastSeen: "Online",
    messages: [],
    name: person.name,
    preview: "Start the conversation.",
    time: "Now",
    unread: 0,
  };
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

  useEffect(() => {
    const storedConversations = readStoredConversations();
    const params = new URLSearchParams(window.location.search);
    const chatSlug = params.get("chat");

    let nextConversations = storedConversations;

    if (chatSlug && !nextConversations.some((item) => item.id === chatSlug)) {
      const createdConversation = createConversationFromSlug(chatSlug);

      if (createdConversation) {
        nextConversations = [createdConversation, ...nextConversations];
      }
    }

    setConversations(nextConversations);

    if (chatSlug) {
      setSelectedId(chatSlug);
    }
  }, []);

  function handleSelect(conversationId: string) {
    setSelectedId(conversationId);
    setConversations((currentConversations) =>
      {
        const nextConversations = currentConversations.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, unread: 0 }
          : conversation,
        );

        persistConversations(nextConversations);
        return nextConversations;
      },
    );
  }

  function handleSend(message: string) {
    if (!selectedConversation) {
      return;
    }

    setConversations((currentConversations) => {
      const nextConversations = currentConversations.map((conversation) =>
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
                } satisfies ChatMessage,
              ],
              preview: message,
              time: "Now",
            }
          : conversation,
      );

      persistConversations(nextConversations);
      return nextConversations;
    });
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
