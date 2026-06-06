import Image from "next/image";
import { ImagePlus } from "lucide-react";

type JobSeekerAvatarProps = {
  alt?: string;
  className: string;
  iconSize?: number;
  size: number;
  src?: string;
};

export function JobSeekerAvatar({
  alt = "Job seeker avatar",
  className,
  iconSize = 18,
  size,
  src,
}: JobSeekerAvatarProps) {
  if (src) {
    return (
      <Image
        alt={alt}
        className={`${className} object-cover`}
        height={size}
        src={src}
        unoptimized={src.startsWith("data:")}
        width={size}
      />
    );
  }

  return (
    <span
      aria-label="No profile picture uploaded"
      className={`${className} grid place-items-center border border-dashed border-slate-300 bg-[#f8fbff] text-slate-500`}
      role="img"
    >
      <ImagePlus size={iconSize} />
    </span>
  );
}
