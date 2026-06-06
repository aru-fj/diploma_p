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
  const [activeItem, setActiveItem] = useState("Activity");
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <motion.main
      animate="show"
      className={`${mediaHireClassNames.appShell} overflow-x-hidden px-4 py-4 sm:px-5 lg:px-6`}
      initial="hidden"
      transition={mediaHireMotion.page}
      variants={fadeIn}
    >
      <div className="mx-auto grid w-full max-w-[1240px] gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="hidden lg:block">
          <div className="fixed left-[max(1.5rem,calc((100vw-1240px)/2))] top-4 z-20 h-[calc(100vh-2rem)] max-h-[760px] w-[220px]">
            <DashboardSidebar
              activeItem={activeItem}
              onNavigate={() => setActiveItem("Activity")}
            />
          </div>
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

          <div className="mt-5 grid min-w-0 gap-5 min-[1180px]:grid-cols-[minmax(0,1fr)_360px]">
            <div className="grid min-w-0 gap-4">
              <ProfileSummaryCard />
              <SavedJobsCard />
              <ApplicationStatusCard />
            </div>

            <aside className="grid min-w-0 content-start items-start gap-4">
              <StatusDonutCard />
              <MessagesPreviewCard />
            </aside>
          </div>
        </section>
      </div>
    </motion.main>
  );
}
