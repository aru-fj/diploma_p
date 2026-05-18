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
  preview: string;
  time: string;
  unread: number;
};

export const conversations: Conversation[] = [
  {
    color: "bg-black text-orange-500",
    id: "salem-entertainment",
    initials: "S",
    lastSeen: "Last seen 2 minutes ago",
    messages: [
      {
        duration: "0:15",
        id: "salem-voice-1",
        sender: "contact",
        time: "19:15",
        type: "voice",
      },
      {
        id: "salem-text-1",
        sender: "contact",
        text: "We prefer to interview with you. Thank you for your application. We will be in touch with you.",
        time: "19:15",
        type: "text",
      },
    ],
    name: "Salem Entertainment",
    preview:
      "We prefer to interview with you. Thank you for your application. We will call you...",
    time: "Just Now",
    unread: 2,
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=85",
    color: "bg-slate-200 text-slate-900",
    id: "alem-koskanay",
    initials: "A",
    lastSeen: "Online",
    messages: [
      {
        id: "alem-text-1",
        sender: "contact",
        text: "Hi! Let's do a collab and make a social video.",
        time: "20:45",
        type: "text",
      },
      {
        fileName: "collab-brief.pdf",
        id: "alem-file-1",
        sender: "contact",
        time: "20:46",
        type: "file",
      },
    ],
    name: "Alem Koskanay",
    preview: "Hi! Let's do a collab and make a social video.",
    time: "20:45",
    unread: 1,
  },
];
