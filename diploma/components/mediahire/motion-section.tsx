"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeInUp, mediaHireMotion } from "./ui/design-system";

type MotionSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function MotionSection({
  children,
  className,
  delay = 0,
}: MotionSectionProps) {
  return (
    <motion.section
      className={className}
      initial="hidden"
      variants={fadeInUp}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...mediaHireMotion.slowPanel, delay }}
      whileInView="show"
    >
      {children}
    </motion.section>
  );
}

export const MotionDiv = motion.div;
export const MotionArticle = motion.article;
