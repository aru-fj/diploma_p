"use client";

import { categoryPills } from "./dashboard-data";

type CategoryPillsProps = {
  activeCategory: string;
  onChange: (category: string) => void;
};

export function CategoryPills({
  activeCategory,
  onChange,
}: CategoryPillsProps) {
  return (
    <div className="mt-6 w-full">
      <div className="overflow-x-auto overflow-y-visible px-1 pt-1 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max gap-3">
          {categoryPills.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.label;

            return (
              <button
                key={category.label}
                type="button"
                onClick={() => onChange(category.label)}
                className={`flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-bold transition duration-300 ${
                  isActive
                    ? "bg-[#0B63E5] text-white shadow-[0_10px_24px_rgba(11,99,229,0.20)]"
                    : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-[#0B63E5]/5 hover:text-[#0B63E5]"
                }`}
              >
                {Icon ? <Icon size={18} strokeWidth={2.4} /> : null}
                <span className="whitespace-nowrap">{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}