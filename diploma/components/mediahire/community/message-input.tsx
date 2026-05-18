"use client";

import { FormEvent, useState } from "react";
import { Mic, Paperclip, Send, Smile } from "lucide-react";

type MessageInputProps = {
  onSend: (message: string) => void;
};

export function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = message.trim();

    if (!trimmed) {
      return;
    }

    onSend(trimmed);
    setMessage("");
  }

  return (
    <form
      className="flex items-center gap-2 border-t border-slate-100 px-4 py-4 sm:px-5"
      onSubmit={handleSubmit}
    >
      <button
        aria-label="Attach file"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-slate-500 transition hover:bg-[#eef4ff] hover:text-[#0B63E5]"
        type="button"
      >
        <Paperclip size={18} />
      </button>
      <div className="flex h-12 min-w-0 flex-1 items-center rounded-full border border-slate-200 bg-white px-4 transition focus-within:border-[#0B63E5] focus-within:ring-4 focus-within:ring-[#0B63E5]/10">
        <input
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Write a message..."
          value={message}
        />
        <button
          aria-label="Choose emoji"
          className="grid h-8 w-8 place-items-center rounded-full text-slate-400 transition hover:text-[#0B63E5]"
          type="button"
        >
          <Smile size={18} />
        </button>
      </div>
      <button
        aria-label="Record voice message"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-slate-500 transition hover:bg-[#eef4ff] hover:text-[#0B63E5]"
        type="button"
      >
        <Mic size={18} />
      </button>
      <button
        aria-label="Send message"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B63E5] text-white shadow-[0_12px_28px_rgba(11,99,229,0.22)] transition hover:-translate-y-0.5 hover:bg-[#0958cf]"
        type="submit"
      >
        <Send size={17} />
      </button>
    </form>
  );
}
