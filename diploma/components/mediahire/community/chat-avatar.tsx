import Image from "next/image";

type ChatAvatarProps = {
  avatar?: string;
  className?: string;
  color: string;
  initials: string;
  name: string;
};

export function ChatAvatar({
  avatar,
  className = "h-10 w-10",
  color,
  initials,
  name,
}: ChatAvatarProps) {
  if (avatar) {
    return (
      <Image
        alt={name}
        className={`${className} rounded-full object-cover`}
        height={48}
        src={avatar}
        width={48}
      />
    );
  }

  return (
    <div
      className={`${className} grid place-items-center rounded-full text-base font-black ${color}`}
    >
      {initials}
    </div>
  );
}
