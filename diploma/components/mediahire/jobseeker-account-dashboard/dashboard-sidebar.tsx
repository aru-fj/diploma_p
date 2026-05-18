"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  primarySidebarItems,
  secondarySidebarItems,
  type SidebarItem,
} from "./dashboard-data";
import { mediaHireMotion } from "../ui/design-system";

type DashboardSidebarProps = {
  activeItem: string;
  onNavigate?: () => void;
};

function Logo() {
  return (
    <Link className="flex items-center gap-3" href="/dashboard/jobseeker">
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#0B63E5] text-3xl font-black text-white">
        M
      </span>
      <span>
        <span className="block text-base font-black tracking-tight">
          <span className="text-[#0B63E5]">Media</span>
          <span className="text-slate-950">Hire</span>
        </span>
        <span className="text-xs font-semibold text-slate-400">
          Dashboard
        </span>
      </span>
    </Link>
  );
}

function SidebarLink({
  activeItem,
  item,
  onNavigate,
}: {
  activeItem: string;
  item: SidebarItem;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;
  const isActive = item.label === activeItem;

  return (
    <motion.div whileHover={{ x: 3, transition: mediaHireMotion.fast }}>
      <Link
        className={`flex h-12 items-center gap-3 rounded-xl px-4 text-sm font-bold transition ${
          item.color === "red"
            ? "text-red-500 hover:bg-red-50"
            : isActive
              ? "bg-slate-100 text-slate-950"
              : "text-slate-700 hover:bg-[#eef4ff] hover:text-[#0B63E5]"
        }`}
        href={item.href}
        onClick={onNavigate}
      >
        <Icon size={18} />
        {item.label}
      </Link>
    </motion.div>
  );
}

export function DashboardSidebar({
  activeItem,
  onNavigate,
}: DashboardSidebarProps) {
  return (
    <aside className="flex h-full min-h-[calc(100vh-48px)] flex-col rounded-3xl bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.04)]">
      <Logo />
      <div className="my-6 h-px bg-slate-100" />

      <p className="px-3 text-xs font-bold text-slate-400">Main</p>
      <nav className="mt-3 grid gap-2">
        {primarySidebarItems.map((item) => (
          <SidebarLink
            activeItem={activeItem}
            item={item}
            key={item.label}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <nav className="mt-auto grid gap-2">
        {secondarySidebarItems.map((item) => (
          <SidebarLink
            activeItem={activeItem}
            item={item}
            key={item.label}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
    </aside>
  );
}
