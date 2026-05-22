"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  profileContacts,
  profileSkills,
  profileSoftware,
  profileUser,
} from "./profile-data";
import {
  mediaHireClassNames,
  mediaHireMotion,
  slideInLeft,
} from "../ui/design-system";

function TagList({ items }: { items: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-[#0B63E5]/40 hover:text-[#0B63E5]"
          key={item}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function ProfileSidebar() {
  return (
    <motion.aside
      animate="show"
      className={`p-6 lg:bg-transparent lg:p-0 lg:shadow-none ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.panel}
      variants={slideInLeft}
    >
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        <Image
          alt="Profile avatar"
          className="h-32 w-32 rounded-2xl object-cover ring-4 ring-white"
          height={128}
          src={profileUser.avatar}
          width={128}
        />
        <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950">
          {profileUser.name}
        </h1>
        <p className="mt-2 text-lg font-bold text-slate-500">
          {profileUser.profession}
        </p>
      </div>

      <div className="mt-7 space-y-4">
        {profileContacts.map((item) => (
          <Link
            className="flex items-center justify-center gap-4 text-base font-bold text-slate-600 transition hover:text-[#0B63E5] lg:justify-start"
            href={item.href}
            key={item.label}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#eef4ff] text-[#0B63E5]">
              <item.icon size={18} />
            </span>
            <span className="truncate">{item.label}</span>
          </Link>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-black text-slate-950">Skills</h2>
        <TagList items={profileSkills} />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-black text-slate-950">Software</h2>
        <TagList items={profileSoftware} />
      </section>
    </motion.aside>
  );
}
