"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { ChevronDown, LogOut, Settings, UserRound } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { mediaHireMotion } from "../ui/design-system";

type UserDropdownProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const avatar =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=85";

export function UserDropdown({ isOpen, onToggle }: UserDropdownProps) {
  const router = useRouter();

  async function handleLogout() {
    window.localStorage.removeItem("mediahire.pendingProfile");
    window.localStorage.removeItem("mediahire.jobseeker.googleProfile");
    window.localStorage.removeItem("mediahire.employer.companyDetails");

    await signOut({ callbackUrl: "/", redirect: false });
    router.push("/");
  }

  return (
    <div className="relative">
      <button
        aria-expanded={isOpen}
        className="inline-flex items-center gap-2 rounded-full px-2 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        onClick={onToggle}
        type="button"
      >
        <Image
          alt="Dana Muhtarova"
          className="h-9 w-9 rounded-full object-cover ring-2 ring-[#0B63E5]/15"
          height={36}
          src={avatar}
          width={36}
        />
        <span className="hidden max-w-32 truncate lg:inline">
          Dana Muhtarova
        </span>
        <ChevronDown
          className={`transition ${isOpen ? "rotate-180" : ""}`}
          size={16}
        />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute right-0 top-12 z-30 w-48 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_22px_70px_rgba(15,23,42,0.16)]"
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={mediaHireMotion.fast}
          >
            {[
              { icon: UserRound, label: "My Profile" },
              { icon: Settings, label: "Settings" },
              { icon: LogOut, label: "Logout" },
            ].map((item) => (
              <button
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-slate-700 transition hover:bg-[#eef4ff] hover:text-[#0B63E5]"
                key={item.label}
                onClick={item.label === "Logout" ? handleLogout : undefined}
                type="button"
              >
                <item.icon size={17} />
                {item.label}
              </button>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
