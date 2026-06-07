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
    <Link className="flex items-center gap-2.5" href="/home/jobseeker">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0B63E5] text-xl font-black text-white">
        M
      </span>
      <span>
        <span className="block text-[11px] font-black tracking-tight">
          <span className="text-[#0B63E5]">Media</span>
          <span className="text-slate-950">Hire</span>
        </span>
        <span className="text-[10px] font-semibold text-slate-400">
          Activity
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
        className={`flex h-9 items-center gap-2 rounded-xl px-3 text-[11px] font-black transition ${
          item.color === "red"
            ? "text-red-500 hover:bg-red-50"
            : isActive
              ? "bg-[#0B63E5] text-white shadow-[0_12px_26px_rgba(11,99,229,0.18)]"
              : "text-slate-700 hover:bg-[#eef4ff] hover:text-[#0B63E5]"
        }`}
        href={item.href}
        onClick={onNavigate}
      >
        <Icon size={15} />
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
    <aside className="flex h-full min-h-[calc(100vh-2rem)] max-h-[760px] flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_14px_44px_rgba(15,23,42,0.045)]">
      <Logo />
      <div className="my-6 h-px bg-slate-100" />

      <p className="px-3 text-[11px] font-bold text-slate-400">Main</p>
      <nav className="mt-2 grid gap-1.5">
        {primarySidebarItems.map((item) => (
          <SidebarLink
            activeItem={activeItem}
            item={item}
            key={item.label}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <nav className="mt-auto grid gap-1.5 border-t border-slate-100 pt-4">
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
