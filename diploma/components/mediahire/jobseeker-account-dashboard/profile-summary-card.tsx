import Image from "next/image";
import { Eye, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { StatsCard } from "./stats-card";
import { fadeInUp, mediaHireClassNames, mediaHireMotion } from "../ui/design-system";

const avatar =
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=240&q=85";

export function ProfileSummaryCard() {
  return (
    <motion.section
      animate="show"
      className={`p-6 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(0)}
      variants={fadeInUp}
    >
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
          <Image
            alt="Dana Muhtarova"
            className="h-24 w-24 rounded-full object-cover"
            height={96}
            src={avatar}
            width={96}
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-black text-slate-950">
              Dana Muhtarova
            </h2>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              Graphic Designer, 4+ years of experience
            </p>
            <div className="mt-4 h-1.5 max-w-sm rounded-full bg-slate-100">
              <div className="h-full w-[92%] rounded-full bg-[#0B63E5]" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <StatsCard
            count={3}
            icon={Eye}
            label="Viewed your profile"
            tone="green"
          />
          <StatsCard
            count={0}
            icon={Heart}
            label="Liked your resume"
            tone="red"
          />
        </div>
      </div>
    </motion.section>
  );
}
