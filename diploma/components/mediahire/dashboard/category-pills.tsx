"use client";

import type { ElementType } from "react";
import { Heart, Sparkles } from "lucide-react";

const categoryTabs: {
  label: string;
  icon: ElementType;
}[] = [
  {
    label: "For You",
    icon: Sparkles,
  },
  {
    label: "Saved",
    icon: Heart,
  },
  {
    label: "Graphic Design",
    icon: Sparkles,
  },
  {
    label: "Photography",
    icon: Sparkles,
  },
  {
    label: "Animation",
    icon: Sparkles,
  },
];

type CategoryPillsProps = {
  activeCategory: string;
  onChange: (category: string) => void;
};

export function CategoryPills({
  activeCategory,
  onChange,
}: CategoryPillsProps) {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2.5">
      {categoryTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeCategory === tab.label;

        return (
          <button
            key={tab.label}
            type="button"
            onClick={() => onChange(tab.label)}
          className={`flex h-9 items-center gap-2 rounded-xl px-3.5 text-xs font-black shadow-sm transition hover:-translate-y-0.5 ${
              isActive
                ? "bg-blue-700 text-white shadow-blue-600/20"
                : "bg-blue-600 text-white shadow-blue-600/15 hover:bg-blue-700"
            }`}
          >
            <Icon className="h-4 w-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
