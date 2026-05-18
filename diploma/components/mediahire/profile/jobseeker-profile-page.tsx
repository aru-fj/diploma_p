"use client";

import { useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DashboardFooter } from "@/components/mediahire/dashboard/dashboard-footer";
import { PortfolioGrid } from "./portfolio-grid";
import { ProfileHero } from "./profile-hero";
import { ProfileSidebar } from "./profile-sidebar";
import { ReviewCard } from "./review-card";
import { profileReviews } from "./profile-data";
import {
  fadeIn,
  fadeInUp,
  mediaHireClassNames,
  mediaHireMotion,
} from "../ui/design-system";

type ProfileTab = "portfolio" | "reviews";

const tabs: { id: ProfileTab; label: string }[] = [
  { id: "portfolio", label: "Portfolio" },
  { id: "reviews", label: "Reviews" },
];

export function JobSeekerProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("portfolio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const resetScroll = () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      if (typeof window.scrollTo === "function") {
        window.scrollTo(0, 0);
      }
    };

    resetScroll();
    const frame = window.requestAnimationFrame(resetScroll);
    const timer = window.setTimeout(resetScroll, 150);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <main className={mediaHireClassNames.appShell}>
      <div>
        <ProfileHero
          isMenuOpen={isMenuOpen}
          isUserMenuOpen={isUserMenuOpen}
          onToggleMenu={() => setIsMenuOpen((value) => !value)}
          onToggleUserMenu={() => setIsUserMenuOpen((value) => !value)}
        />

        <motion.section
          animate="show"
          className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[300px_1fr] lg:gap-12 lg:px-0 lg:pt-12"
          initial="hidden"
          transition={mediaHireMotion.panel}
          variants={fadeIn}
        >
          <ProfileSidebar />

          <section className="min-w-0">
            <div className="mb-8 flex border-b border-slate-200">
              {tabs.map((tab) => (
                <button
                  className={`relative px-6 py-4 text-lg font-black transition ${
                    activeTab === tab.id
                      ? "text-[#0B63E5]"
                      : "text-slate-500 hover:text-[#0B63E5]"
                  }`}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                >
                  {tab.label}
                  {activeTab === tab.id ? (
                    <motion.span
                      className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#0B63E5]"
                      layoutId="profile-active-tab"
                      transition={mediaHireMotion.fast}
                    />
                  ) : null}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "portfolio" ? (
                <motion.div
                  animate="show"
                  exit={{ opacity: 0, y: 10 }}
                  initial="hidden"
                  key="portfolio"
                  transition={mediaHireMotion.fast}
                  variants={fadeInUp}
                >
                  <PortfolioGrid />
                </motion.div>
              ) : (
                <motion.div
                  animate="show"
                  className="grid gap-5"
                  exit={{ opacity: 0, y: 10 }}
                  initial="hidden"
                  key="reviews"
                  transition={mediaHireMotion.fast}
                  variants={fadeInUp}
                >
                  {profileReviews.map((review, index) => (
                    <ReviewCard index={index} key={review.id} review={review} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </motion.section>

        <DashboardFooter />
      </div>
    </main>
  );
}
