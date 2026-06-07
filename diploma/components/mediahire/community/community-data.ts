export type ChatMessage = {
  duration?: string;
  fileName?: string;
  id: string;
  sender: "contact" | "me";
  text?: string;
  time: string;
  type: "text" | "voice" | "file";
};

export type Conversation = {
  avatar?: string;
  color: string;
  id: string;
  initials: string;
  lastSeen: string;
  messages: ChatMessage[];
  name: string;
  participantType?: "company" | "person" | "system";
  preview: string;
  profileHref?: string;
  starred?: boolean;
  time: string;
  unread: number;
};

export const conversations: Conversation[] = [
  {
    color: "bg-[#0B63E5] text-white",
    id: "mediahire-welcome",
    initials: "M",
    lastSeen: "MediaHire Support",
    messages: [
      {
        id: "mediahire-welcome-1",
        sender: "contact",
        text: "Welcome to MediaHire. Your Job Seeker account has been registered successfully.",
        time: "Now",
        type: "text",
      },
    ],
    name: "MediaHire",
    participantType: "system",
    preview: "Your Job Seeker account has been registered successfully.",
    profileHref: "/home/jobseeker",
    time: "Now",
    unread: 1,
  },
];
