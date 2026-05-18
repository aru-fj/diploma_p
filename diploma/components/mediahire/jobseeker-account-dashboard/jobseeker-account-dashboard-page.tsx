"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ApplicationStatusCard } from "./application-status-card";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardTopbar } from "./dashboard-topbar";
import { MessagesPreviewCard } from "./messages-preview-card";
import { ProfileSummaryCard } from "./profile-summary-card";
import { SavedJobsCard } from "./saved-jobs-card";
import { StatusDonutCard } from "./status-donut-card";
import {
  fadeIn,
  mediaHireClassNames,
  mediaHireMotion,
  slideInLeft,
} from "../ui/design-system";

export function JobSeekerAccountDashboardPage() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <motion.main
      animate="show"
      className={`${mediaHireClassNames.appShell} p-4 sm:p-6`}
      initial="hidden"
      transition={mediaHireMotion.page}
      variants={fadeIn}
    >
      <div className="mx-auto grid max-w-[1480px] gap-6 lg:grid-cols-[245px_1fr]">
        <div className="hidden lg:block">
          <DashboardSidebar
            activeItem={activeItem}
            onNavigate={() => setActiveItem("Dashboard")}
          />
        </div>

        <AnimatePresence>
          {isSidebarOpen ? (
            <motion.div
              animate="show"
              className="fixed inset-0 z-50 bg-slate-950/35 p-4 backdrop-blur-sm lg:hidden"
              exit={{ opacity: 0 }}
              initial="hidden"
              transition={mediaHireMotion.fast}
              variants={fadeIn}
            >
              <motion.div
                animate="show"
                className="relative h-full max-w-xs"
                exit={{ opacity: 0, x: -18 }}
                initial="hidden"
                transition={mediaHireMotion.fast}
                variants={slideInLeft}
              >
                <button
                  aria-label="Close dashboard menu"
                  className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-700"
                  onClick={() => setIsSidebarOpen(false)}
                  type="button"
                >
                  <X size={18} />
                </button>
                <DashboardSidebar
                  activeItem={activeItem}
                  onNavigate={() => setIsSidebarOpen(false)}
                />
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <section className="min-w-0">
          <DashboardTopbar
            onOpenSidebar={() => setIsSidebarOpen(true)}
            onSearchChange={setSearch}
            search={search}
          />

          <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_350px]">
            <div className="grid gap-6">
              <ProfileSummaryCard />
              <SavedJobsCard />
              <ApplicationStatusCard />
            </div>

            <aside className="grid content-start gap-6">
              <StatusDonutCard />
              <MessagesPreviewCard />
            </aside>
          </div>
        </section>
      </div>
    </motion.main>
  );
}
