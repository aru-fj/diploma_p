import Image from "next/image";
import type { ReactNode } from "react";

type EmployerAuthImagePanelProps = {
  children?: ReactNode;
};

export function EmployerAuthImagePanel({ children }: EmployerAuthImagePanelProps) {
  return (
    <div className="relative h-full min-h-[520px] overflow-hidden rounded-2xl bg-slate-200 shadow-[0_24px_80px_rgba(15,23,42,0.14)] max-sm:hidden lg:h-[calc(100vh-2.5rem)] lg:min-h-[520px]">
      <Image
        alt="Modern glass office buildings"
        className="object-cover"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 58vw"
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1500&q=90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-white/5" />
      {children}
    </div>
  );
}
