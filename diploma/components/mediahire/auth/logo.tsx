import Link from "next/link";

export function AuthLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      aria-label="MediaHire home"
      className={`inline-flex font-black tracking-tight ${
        compact ? "text-3xl" : "text-3xl sm:text-4xl"
      }`}
      href="/"
    >
      <span className="text-[#0B63E5]">Media</span>
      <span className="text-black">Hire</span>
    </Link>
  );
}
