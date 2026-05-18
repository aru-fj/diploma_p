import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export function SignupPlaceholder({
  description,
  icon: Icon,
  title,
}: {
  description: string;
  icon: LucideIcon;
  title: string;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f5f7fb] px-4 py-10 text-slate-950">
      <section className="w-full max-w-xl rounded-[2rem] border border-[#2563ff]/20 bg-white p-8 text-center shadow-[0_24px_80px_rgba(37,99,255,0.12)] sm:p-12">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#eef4ff] text-[#2563ff]">
          <Icon size={30} />
        </span>
        <h1 className="mt-6 text-3xl font-black tracking-tight">{title}</h1>
        <p className="mt-4 text-base leading-7 text-slate-500">{description}</p>
        <Link
          className="mt-8 inline-flex rounded-full bg-[#2563ff] px-6 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(37,99,255,0.24)] transition hover:-translate-y-0.5 hover:bg-[#0f52f5]"
          href="/signup"
        >
          Back to role selection
        </Link>
      </section>
    </main>
  );
}
