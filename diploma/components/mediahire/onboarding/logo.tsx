import Link from "next/link";

export function OnboardingLogo() {
  return (
    <Link
      aria-label="MediaHire home"
      className="inline-flex items-center justify-center text-3xl font-black tracking-tight sm:text-4xl"
      href="/"
    >
      <span className="text-[#2563ff]">Media</span>
      <span className="text-slate-950">Hire</span>
    </Link>
  );
}
