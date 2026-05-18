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
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <Icon className={toneClass} size={20} />
      <p className="mt-3 text-lg font-black text-slate-950">
        {count} <span className="text-xs font-bold text-slate-500">people</span>
      </p>
      <p className="text-xs font-medium text-slate-400">{label}</p>
    </div>
  );
}
