import Image from "next/image";
import type { ReactNode } from "react";

type AuthImagePanelProps = {
  alt: string;
  children?: ReactNode;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  src: string;
};

export function AuthImagePanel({
  alt,
  children,
  className = "",
  imageClassName = "object-center",
  priority = true,
  src,
}: AuthImagePanelProps) {
  return (
    <div
      className={`max-sm:hidden lg:sticky lg:top-5 lg:self-start ${className}`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-slate-200 shadow-[0_24px_80px_rgba(15,23,42,0.14)] max-lg:min-h-[520px] lg:h-[calc(100vh-2.5rem)] lg:min-h-[520px]">
        <Image
          alt={alt}
          className={`object-cover ${imageClassName}`}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 58vw"
          src={src}
        />
        {children}
      </div>
    </div>
  );
}
