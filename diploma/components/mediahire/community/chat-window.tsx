"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChatHeader } from "./chat-header";
import { MessageBubble } from "./message-bubble";
import { MessageInput } from "./message-input";
import { VoiceMessageBubble } from "./voice-message-bubble";
import type { ChatMessage, Conversation } from "./community-data";
import {
  mediaHireClassNames,
  mediaHireMotion,
  slideInRight,
} from "../ui/design-system";

type ChatWindowProps = {
  conversation: Conversation;
  onBack: () => void;
  onSend: (message: string) => void;
};

export function ChatWindow({ conversation, onBack, onSend }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [conversation.messages]);

  return (
    <motion.section
      animate="show"
      className={`flex h-[calc(100vh-190px)] min-h-[520px] flex-col overflow-hidden lg:h-full lg:min-h-0 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.panel}
      variants={slideInRight}
    >
      <ChatHeader conversation={conversation} onBack={onBack} />

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="flex min-h-full flex-col justify-end gap-3">
          {conversation.messages.map((message: ChatMessage) =>
            message.type === "voice" ? (
              <VoiceMessageBubble key={message.id} message={message} />
            ) : (
              <MessageBubble key={message.id} message={message} />
            ),
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <MessageInput onSend={onSend} />
    </motion.section>
  );
}
