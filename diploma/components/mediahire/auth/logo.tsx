import Link from "next/link";

export function AuthLogo() {
  return (
    <Link
      aria-label="MediaHire home"
      className="inline-flex text-3xl font-black tracking-tight sm:text-4xl"
      href="/"
    >
      <span className="text-[#0B63E5]">Media</span>
      <span className="text-black">Hire</span>
    </Link>
  );
}
