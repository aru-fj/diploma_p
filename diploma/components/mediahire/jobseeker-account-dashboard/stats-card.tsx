import type { LucideIcon } from "lucide-react";

type StatsCardProps = {
  count: number;
  icon: LucideIcon;
  label: string;
  tone: "green" | "red";
};

export function StatsCard({ count, icon: Icon, label, tone }: StatsCardProps) {
  const toneClass = tone === "green" ? "text-green-500" : "text-red-500";

  return (
    <div className="rounded-2xl border border-slate-100 bg-[#f8fbff] p-3">
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-white shadow-sm">
        <Icon className={toneClass} size={15} />
      </span>
      <p className="mt-2 text-base font-black text-slate-950">
        {count} <span className="text-xs font-bold text-slate-500">people</span>
      </p>
      <p className="text-[11px] font-medium text-slate-400">{label}</p>
    </div>
  );
}
