import { Heart, Search, Send, SlidersHorizontal, Sparkles } from "lucide-react";
import { categories } from "./data";
import { MotionSection } from "./motion-section";
import { mediaHireClassNames } from "./ui/design-system";

export function FilterSection() {
  return (
    <MotionSection className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className={`p-5 sm:p-6 ${mediaHireClassNames.sectionCard}`}>
        <div className="grid gap-4 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-black text-slate-800 transition hover:border-[#2563ff] hover:text-[#2563ff]">
            <SlidersHorizontal size={17} />
            Filter
          </button>

          <label className="flex items-center gap-3 rounded-full bg-[#f5f7fb] px-5 py-3.5 text-sm text-slate-500">
            <Search size={17} />
            <input
              className="w-full bg-transparent outline-none placeholder:text-slate-400"
              placeholder="Search"
              type="text"
            />
          </label>

          <div className="grid grid-cols-2 rounded-full bg-[#edf1f7] p-1 text-sm font-black text-slate-500">
            <button className="rounded-full bg-white px-9 py-3 text-slate-950 shadow-sm">
              Projects
            </button>
            <button className="rounded-full px-9 py-3 transition hover:text-[#2563ff]">
              People
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {categories.map((category, index) => (
            <button
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-black shadow-sm transition duration-200 hover:-translate-y-0.5 ${
                index === 0
                  ? "bg-[#2563ff] text-white shadow-[0_12px_24px_rgba(37,99,255,0.22)]"
                  : "bg-[#2563ff] text-white hover:bg-[#0f52f5]"
              }`}
              key={category}
            >
              {index === 0 && <Sparkles size={15} />}
              {index === 1 && <Heart size={15} />}
              {index === 2 && <Send size={15} />}
              {category}
            </button>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
