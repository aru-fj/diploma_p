"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      aria-label="Go back"
      className="grid h-11 w-11 place-items-center rounded-full text-slate-900 transition duration-200 hover:-translate-x-0.5 hover:bg-[#eef4ff] hover:text-[#2563ff] focus:outline-none focus:ring-4 focus:ring-[#2563ff]/20"
      onClick={() => router.back()}
      type="button"
    >
      <ArrowLeft size={24} strokeWidth={2.4} />
    </button>
  );
}
