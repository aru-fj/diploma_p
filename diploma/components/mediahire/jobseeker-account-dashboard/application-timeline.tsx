import { CheckCircle2 } from "lucide-react";
import type { ApplicationHistoryItem } from "./dashboard-data";

type ApplicationTimelineProps = {
  history: ApplicationHistoryItem[];
};

export function ApplicationTimeline({ history }: ApplicationTimelineProps) {
  return (
    <div className="mt-5 grid gap-3">
      {history.map((item, index) => (
        <div className="grid grid-cols-[22px_1fr_auto] items-center gap-2" key={item.label}>
          <CheckCircle2
            className={index === 0 ? "text-[#0B63E5]" : "text-slate-400"}
            size={16}
          />
          <div className="h-8 rounded-md bg-slate-100 px-3 text-sm font-semibold leading-8 text-slate-600">
            {item.label}
          </div>
          <span className="rounded-md bg-slate-100 px-3 text-xs font-semibold leading-8 text-slate-500">
            {item.date}
          </span>
        </div>
      ))}
    </div>
  );
}
