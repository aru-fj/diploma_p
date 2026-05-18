"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import type { ProfileReview } from "./profile-data";
import {
  fadeInUp,
  mediaHireClassNames,
  mediaHireMotion,
} from "../ui/design-system";

type ReviewCardProps = {
  index: number;
  review: ProfileReview;
};

export function ReviewCard({ index, review }: ReviewCardProps) {
  return (
    <motion.article
      animate="show"
      className={`p-6 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(index)}
      variants={fadeInUp}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-black text-slate-950">{review.name}</h3>
          <p className="mt-1 text-sm font-bold text-slate-500">{review.role}</p>
        </div>
        <div className="flex text-amber-400">
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <Star
              fill={starIndex < review.rating ? "currentColor" : "none"}
              key={starIndex}
              size={17}
            />
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm font-medium leading-6 text-slate-600">
        {review.text}
      </p>
    </motion.article>
  );
}
