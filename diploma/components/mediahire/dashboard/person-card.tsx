"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import type { DashboardPerson } from "./dashboard-data";
import { fadeInUp, mediaHireMotion } from "../ui/design-system";

type PersonCardProps = {
  index: number;
  onMessage: (person: DashboardPerson) => void;
  person: DashboardPerson;
};

export function PersonCard({ index, onMessage, person }: PersonCardProps) {
  return (
    <motion.article
      className="rounded-2xl border border-[#0B63E5] bg-white px-7 py-8 text-center shadow-[0_18px_40px_-34px_rgba(11,99,229,0.9)] transition hover:shadow-[0_22px_60px_-34px_rgba(11,99,229,1)]"
      initial="hidden"
      transition={mediaHireMotion.item(index)}
      variants={fadeInUp}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={mediaHireMotion.cardHover}
      whileInView="show"
    >
      <Link
        aria-label={`Open ${person.name} profile`}
        className="mx-auto block w-fit rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#0B63E5]/15"
        href={`/profile/${person.id}`}
      >
        <Image
          alt={person.name}
          className="mx-auto h-16 w-16 rounded-xl object-cover"
          height={64}
          src={person.avatar}
          width={64}
        />
      </Link>

      <Link
        className="mt-4 block text-sm font-black text-slate-950 transition hover:text-[#0B63E5]"
        href={`/profile/${person.id}`}
      >
        {person.name}
      </Link>
      <p className="mt-1 text-xs font-medium text-slate-400">Freelance</p>

      <span className="mx-auto mt-4 inline-flex h-6 min-w-32 items-center justify-center rounded-md border border-[#0B63E5] px-4 text-xs font-semibold text-[#0B63E5]">
        {person.skill}
      </span>

      <div className="mx-auto mt-4 grid max-w-36 grid-cols-2 gap-3 text-center">
        <div>
          <p className="text-sm font-black text-slate-950">{person.score}</p>
          <p className="text-[10px] font-medium uppercase text-slate-400">
            score
          </p>
        </div>
        <div>
          <p className="text-sm font-black text-slate-950">{person.views}</p>
          <p className="text-[10px] font-medium uppercase text-slate-400">
            views
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-1">
        {Array.from({ length: 5 }).map((_, starIndex) => (
          <Star
            className={
              starIndex < person.rating
                ? "fill-[#FFD43B] text-[#FFD43B]"
                : "fill-slate-300 text-slate-300"
            }
            key={starIndex}
            size={18}
          />
        ))}
      </div>

      <motion.button
        className="mt-6 h-9 w-full rounded-full bg-[#0B63E5] text-sm font-black text-white transition hover:bg-[#0758cf] focus:outline-none focus:ring-4 focus:ring-[#0B63E5]/15"
        onClick={() => onMessage(person)}
        type="button"
        whileHover={{ y: -2, transition: mediaHireMotion.fast }}
        whileTap={{ scale: 0.98 }}
      >
        Message
      </motion.button>
    </motion.article>
  );
}
