"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  ChevronDown,
  ChevronUp,
  Eye,
  Heart,
  Menu,
  Search,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  filterPills,
  messages,
  sidebarBottomItems,
  sidebarMenuItems,
  type Application,
  type MessagePreview,
  type SavedJob,
} from "./dashboard-data";
import {
  fadeIn,
  fadeInUp,
  mediaHireClassNames,
  mediaHireMotion,
  slideInLeft,
} from "../ui/design-system";
import { getMediaHireJob } from "../jobs-data";
import {
  getApplications,
  getCurrentUserProfile,
  getSavedJobs,
  getSettings,
  type JobApplicationRecord,
} from "../shared/user-state";
import type { JobSeekerProfile } from "../account-settings/profile-store";
import { JobSeekerAvatar } from "../jobseeker-avatar-placeholder";

type DashboardTab = "Application Status" | "Job Offers";

function formatLocationName(location: string) {
  return location
    .split(" ")
    .map((part) =>
      part ? `${part.slice(0, 1).toUpperCase()}${part.slice(1)}` : part,
    )
    .join(" ");
}

function DashboardLogo() {
  return (
    <Link className="flex items-center gap-2.5" href="/account/jobseeker">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0B63E5] text-white shadow-[0_12px_28px_rgba(11,99,229,0.18)]">
        <span className="text-xl font-black leading-none">M</span>
      </span>
      <span className="leading-tight">
        <span className="block text-[11px] font-black text-slate-950">
          <span className="text-[#0B63E5]">Media</span>Hire
        </span>
        <span className="block text-[10px] font-bold text-slate-400">
          Activity
        </span>
      </span>
    </Link>
  );
}

function DashboardSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const sidebar = (
    <motion.aside
      animate="show"
      className="flex h-full w-full flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_14px_44px_rgba(15,23,42,0.045)]"
      initial="hidden"
      transition={mediaHireMotion.panel}
      variants={slideInLeft}
    >
      <div className="flex items-center justify-between gap-4">
        <DashboardLogo />
        <button
          aria-label="Close menu"
          className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 lg:hidden"
          onClick={onClose}
          type="button"
        >
          <X size={18} />
        </button>
      </div>

      <p className="mt-6 px-3 text-[11px] font-bold text-slate-400">Main</p>
      <nav className="mt-2 grid gap-1.5">
        {sidebarMenuItems.map((item) => {
          const isActive = item.label === "Activity";
          const href =
            item.label === "Home"
              ? "/home/jobseeker"
              : item.label === "My Resume"
              ? "/account/jobseeker/resume"
              : item.label === "Settings"
                ? "/settings/jobseeker"
                : "/account/jobseeker";

          return (
            <motion.div
              className={`flex h-9 items-center gap-2 rounded-xl px-3 text-left text-[11px] font-black transition ${
                isActive
                  ? "bg-[#0B63E5] text-white shadow-[0_12px_26px_rgba(11,99,229,0.18)]"
                  : "text-slate-600 hover:bg-[#eef4ff] hover:text-[#0B63E5]"
              }`}
              key={item.label}
              whileHover={{ x: isActive ? 0 : 2, transition: mediaHireMotion.fast }}
            >
              <Link className="flex w-full items-center gap-2" href={href}>
                <item.icon size={15} />
                {item.label}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="mt-auto grid gap-1.5 border-t border-slate-100 pt-4">
        {sidebarBottomItems.map((item) => {
          const isLogout = item.label === "Log out";

          return (
            <Link
              className={`flex h-9 items-center gap-2 rounded-xl px-3 text-[11px] font-black transition ${
                isLogout
                  ? "text-red-500 hover:bg-red-50"
                  : "text-slate-500 hover:bg-[#eef4ff] hover:text-[#0B63E5]"
              }`}
              href={isLogout ? "/" : "#help"}
              key={item.label}
            >
              <item.icon size={15} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </motion.aside>
  );

  return (
    <>
      <div className="hidden lg:block">
        <div className="fixed left-[max(1.5rem,calc((100vw-1240px)/2))] top-4 z-20 h-[calc(100vh-2rem)] max-h-[760px] w-[220px]">
          {sidebar}
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            animate="show"
            className="fixed inset-0 z-50 bg-slate-950/35 p-4 backdrop-blur-sm lg:hidden"
            exit={{ opacity: 0 }}
            initial="hidden"
            transition={mediaHireMotion.fast}
            variants={fadeIn}
          >
            <div className="h-full max-w-[310px]">{sidebar}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function DashboardTopbar({
  onOpenSidebar,
  profile,
  search,
  onSearchChange,
}: {
  onOpenSidebar: () => void;
  onSearchChange: (value: string) => void;
  profile: JobSeekerProfile;
  search: string;
}) {
  const settings = getSettings();
  const avatarSrc = profile.avatarPreview;

  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-start gap-3">
        <button
          aria-label="Open menu"
          className="mt-1 grid h-11 w-11 place-items-center rounded-2xl bg-white text-slate-800 shadow-sm lg:hidden"
          onClick={onOpenSidebar}
          type="button"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
            Activity
          </h1>
          <p className="mt-1 max-w-xl text-sm font-medium leading-5 text-slate-500">
            View your activity, applications, and latest updates in one place
          </p>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex h-9 min-w-0 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 shadow-[0_10px_26px_rgba(15,23,42,0.035)] sm:w-64 lg:w-56 xl:w-64">
          <Search className="text-slate-400" size={16} />
          <input
            className="min-w-0 flex-1 bg-transparent text-xs font-semibold text-slate-900 outline-none placeholder:text-slate-400"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search"
            type="search"
            value={search}
          />
        </label>

        <div className="flex min-w-0 items-center gap-2 rounded-xl bg-white p-1.5 shadow-[0_10px_26px_rgba(15,23,42,0.035)] sm:max-w-[220px]">
          <button
            aria-label="Notifications"
            className="relative grid h-8 w-8 place-items-center rounded-full bg-[#eef4ff] text-[#0B63E5]"
            type="button"
          >
            <Bell size={15} />
            {settings.applicationUpdates || settings.messages ? (
              <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
            ) : null}
          </button>
          <JobSeekerAvatar
            alt="Job seeker avatar"
            className="h-8 w-8 rounded-full"
            iconSize={15}
            size={32}
            src={avatarSrc}
          />
          <div className="hidden min-w-0 pr-1.5 sm:block">
            <p className="truncate text-[11px] font-black text-slate-950">
              {profile.fullName}
            </p>
            <p className="truncate text-[10px] font-semibold text-slate-400">
              {profile.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

function StatsCard({
  icon,
  value,
  label,
}: {
  icon: "eye" | "heart";
  label: string;
  value: number;
}) {
  const Icon = icon === "eye" ? Eye : Heart;

  return (
    <div className="rounded-xl border border-slate-100 bg-[#f8fbff] p-3">
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-[#0B63E5] shadow-sm">
          <Icon size={15} />
        </span>
        <div>
          <p className="text-base font-black text-slate-950">{value}</p>
          <p className="text-[11px] font-semibold leading-4 text-slate-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

function ProfileSummaryCard({
  applicationsCount,
  profile,
  savedJobsCount,
}: {
  applicationsCount: number;
  profile: JobSeekerProfile;
  savedJobsCount: number;
}) {
  const avatarSrc = profile.avatarPreview;

  return (
    <motion.section
      animate="show"
      className={`p-4 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(0)}
      variants={fadeInUp}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <JobSeekerAvatar
          alt="Job seeker avatar"
          className="h-14 w-14 rounded-2xl ring-4 ring-[#eef4ff]"
          iconSize={22}
          size={56}
          src={avatarSrc}
        />
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-black tracking-tight text-slate-950">
            {profile.fullName}
          </h2>
          <p className="mt-1 text-xs font-bold text-slate-500">
            {profile.jobTitle || profile.role}, {applicationsCount} applications
          </p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[76%] rounded-full bg-[#0B63E5]" />
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <StatsCard icon="eye" label="saved jobs" value={savedJobsCount} />
        <StatsCard icon="heart" label="applications sent" value={applicationsCount} />
      </div>
    </motion.section>
  );
}

function SavedJobRow({ job, index }: { index: number; job: SavedJob }) {
  return (
    <motion.div
      animate="show"
      className="group flex items-center gap-3 rounded-xl border border-transparent px-2.5 py-2 transition hover:border-[#0B63E5]/15 hover:bg-[#f8fbff]"
      initial="hidden"
      transition={mediaHireMotion.item(index)}
      variants={fadeInUp}
      whileHover={mediaHireMotion.cardHover}
    >
      <Link
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-[11px] font-black ${job.companyColor}`}
        href={`/home/jobseeker/jobs/${job.id}`}
      >
        {job.companyLogo}
      </Link>
      <Link className="min-w-0 flex-1" href={`/home/jobseeker/jobs/${job.id}`}>
        <h3 className="truncate text-xs font-black text-slate-950">
          {job.title}
        </h3>
        <p className="mt-0.5 truncate text-xs font-semibold text-slate-500">
          {job.skill} • {job.type} • {job.location}
        </p>
      </Link>
      <span className="shrink-0 rounded-lg bg-[#eef4ff] px-2 py-1 text-[11px] font-black text-[#0B63E5]">
        {job.date}
      </span>
    </motion.div>
  );
}

function SavedJobsCard({
  search,
  savedJobItems,
}: {
  savedJobItems: SavedJob[];
  search: string;
}) {
  const visibleJobs = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return savedJobItems;

    return savedJobItems.filter((job) =>
      `${job.title} ${job.skill} ${job.location} ${job.type}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [savedJobItems, search]);

  return (
    <motion.section
      animate="show"
      className={`p-4 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(1)}
      variants={fadeInUp}
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-black text-slate-950">Saved Jobs</h2>
        <Link className="text-xs font-black text-[#0B63E5]" href="/saved-jobs">
          View all
        </Link>
      </div>

      <div className="mt-3 grid gap-1">
        {visibleJobs.length ? visibleJobs.map((job, index) => (
          <SavedJobRow index={index} job={job} key={job.id} />
        )) : (
          <div className="rounded-xl border border-dashed border-slate-200 bg-[#f8fbff] p-6 text-center text-xs font-black text-slate-500">
            No saved jobs yet.
          </div>
        )}
      </div>
    </motion.section>
  );
}

function StatusDonutCard({ items }: { items: Application[] }) {
  const summary = [
    { color: "bg-[#0B63E5]", label: "Total Jobs", value: items.length },
    {
      color: "bg-amber-400",
      label: "Under Review",
      value: items.filter((item) => item.status === "Under Review").length,
    },
    {
      color: "bg-emerald-400",
      label: "Accepted",
      value: items.filter((item) => item.status === "Accepted").length,
    },
    {
      color: "bg-rose-400",
      label: "Rejected",
      value: items.filter((item) => item.status === "Rejected").length,
    },
  ];

  return (
    <motion.section
      animate="show"
      className={`p-4 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(2)}
      variants={fadeInUp}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-black text-slate-950">Application Status</h2>
          <p className="mt-1 text-xs font-bold text-slate-400">January 2025</p>
        </div>
      </div>

      <div className="mt-4 grid place-items-center">
        <div
          className="relative grid h-32 w-32 place-items-center rounded-full"
          style={{
            background:
              "conic-gradient(#0B63E5 0deg 180deg, #fbbf24 180deg 360deg)",
          }}
        >
          <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-center shadow-inner">
            <div>
              <p className="text-lg font-black text-slate-950">{items.length}</p>
              <p className="text-[10px] font-bold text-slate-400">Total Jobs</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        {summary.map((item) => (
          <div className="flex items-center justify-between gap-3" key={item.label}>
            <span className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
              {item.label}
            </span>
            <span className="text-xs font-black text-slate-950">{item.value}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs font-medium leading-5 text-slate-500">
        Track your recent applications and understand which opportunities need
        your attention next.
      </p>
    </motion.section>
  );
}

function MessagePreviewItem({ message }: { message: MessagePreview }) {
  return (
    <Link
      className="grid grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-2.5 rounded-xl px-2.5 py-2 transition hover:bg-[#f8fbff]"
      href="/community"
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-black ${message.avatarColor}`}
      >
        {message.initials}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-black text-slate-950">
          {message.name}
        </span>
        <span className="mt-0.5 block truncate text-[11px] font-semibold text-slate-500">
          {message.preview}
        </span>
      </span>
      <span className="grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-red-500 px-1.5 text-[10px] font-black text-white">
        {message.unread}
      </span>
    </Link>
  );
}

function MessagesPreviewCard() {
  const settings = getSettings();

  if (!settings.messages) {
    return (
      <motion.section
        animate="show"
        className={`p-4 ${mediaHireClassNames.card}`}
        initial="hidden"
        transition={mediaHireMotion.item(3)}
        variants={fadeInUp}
      >
        <h2 className="text-sm font-black text-slate-950">Messages</h2>
        <p className="mt-3 text-xs font-semibold text-slate-500">
          Message notifications are turned off in Settings.
        </p>
      </motion.section>
    );
  }

  return (
    <motion.section
      animate="show"
      className={`h-fit p-4 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(3)}
      variants={fadeInUp}
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-black text-slate-950">Messages</h2>
        <Link
          className="text-xs font-black text-[#0B63E5]"
          href="/community"
        >
          More
        </Link>
      </div>
      <div className="mt-3 grid gap-1">
        {messages.map((message) => (
          <MessagePreviewItem key={message.id} message={message} />
        ))}
      </div>
    </motion.section>
  );
}

function ApplicationTimeline({ history }: { history: Application["history"] }) {
  return (
    <motion.div
      animate={{ height: "auto", opacity: 1 }}
      className="overflow-hidden"
      exit={{ height: 0, opacity: 0 }}
      initial={{ height: 0, opacity: 0 }}
      transition={mediaHireMotion.fast}
    >
      <div className="mt-4 rounded-xl bg-[#f8fbff] p-3">
        {history.map((item, index) => (
          <div
            className="grid grid-cols-[24px_1fr_auto] items-center gap-2.5"
            key={`${item.label}-${item.time}`}
          >
            <span className="relative grid h-6 w-6 place-items-center">
              <span
                className={`h-3 w-3 rounded-full ${
                  index === 0 ? "bg-[#0B63E5]" : "bg-slate-300"
                }`}
              />
              {index < history.length - 1 ? (
                <span className="absolute left-1/2 top-5 h-8 w-px -translate-x-1/2 bg-slate-200" />
              ) : null}
            </span>
            <span className="py-2 text-xs font-black text-slate-700">
              {item.label}
            </span>
            <span className="text-[11px] font-bold text-slate-400">{item.time}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ApplicationStatusCard({ items }: { items: Application[] }) {
  const [activeTab, setActiveTab] = useState<DashboardTab>("Application Status");
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(items[0]?.id ?? "");
  const visibleApplications =
    activeTab === "Job Offers"
      ? []
      : items.filter(
          (application) =>
            activeFilter === "All" || application.status === activeFilter,
        );

  return (
    <motion.section
      animate="show"
      className={`h-fit p-4 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(4)}
      variants={fadeInUp}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-fit rounded-xl bg-slate-100 p-1">
          {(["Application Status", "Job Offers"] as const).map((tab) => (
            <button
              className={`rounded-lg px-3 py-1.5 text-[11px] font-black transition ${
                activeTab === tab
                  ? "bg-white text-[#0B63E5] shadow-sm"
                  : "text-slate-500 hover:text-[#0B63E5]"
              }`}
              key={tab}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        <select
          className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700 outline-none focus:border-[#0B63E5]"
          defaultValue="Newest"
        >
          <option>Newest</option>
          <option>Oldest</option>
        </select>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 pb-1">
        {filterPills.map((pill) => (
          <button
            className={`h-8 shrink-0 rounded-lg px-2.5 text-[11px] font-black transition ${
              activeFilter === pill
                ? "bg-[#0B63E5] text-white"
                : "bg-[#eef4ff] text-[#0B63E5] hover:bg-[#dcecff]"
            }`}
            key={pill}
            onClick={() => setActiveFilter(pill)}
            type="button"
          >
            {pill}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3">
        {visibleApplications.length > 0 ? (
          visibleApplications.map((application) => {
            const isExpanded = expandedId === application.id;

            return (
              <article
                className="rounded-xl border border-slate-100 bg-white p-3 shadow-[0_10px_30px_rgba(15,23,42,0.03)]"
                key={application.id}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500">
                      {application.company}
                    </p>
                    <h3 className="mt-1 text-sm font-black text-slate-950">
                      {application.role}
                    </h3>
                  </div>
                  <button
                    className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-amber-100 px-3 text-[11px] font-black text-amber-600 transition hover:bg-amber-200"
                    onClick={() =>
                      setExpandedId((current) =>
                        current === application.id ? "" : application.id,
                      )
                    }
                    type="button"
                  >
                    {application.status}
                    {isExpanded ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                </div>

                <AnimatePresence>
                  {isExpanded ? (
                    <ApplicationTimeline history={application.history} />
                  ) : null}
                </AnimatePresence>
              </article>
            );
          })
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 bg-[#f8fbff] p-6 text-center">
            <p className="text-xs font-black text-slate-500">
              No applications in this view yet.
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
}

export function JobSeekerActivityDashboardPage() {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<JobSeekerProfile>(() =>
    getCurrentUserProfile(),
  );
  const [savedJobItems, setSavedJobItems] = useState<SavedJob[]>([]);
  const [applicationItems, setApplicationItems] = useState<Application[]>([]);

  useEffect(() => {
    function hydrateDashboard() {
      setProfile(getCurrentUserProfile());
      setSavedJobItems([
        ...getSavedJobs().map((job) => ({
          companyColor: "bg-[#eef4ff] text-[#0B63E5]",
          companyLogo: job.companyName.slice(0, 2),
          date: "Saved",
          id: job.id,
          location: formatLocationName(job.location),
          skill: job.tags[1] || job.level,
          title: job.title,
          type: job.type,
        })),
      ]);
      setApplicationItems([
        ...getApplications().map((application: JobApplicationRecord) => {
          const job = getMediaHireJob(application.jobId);

          return {
            company: job?.companyName || "MediaHire company",
            history: [
              { label: application.status, time: "Just Now" },
              { label: "Applied", time: "Saved in your activity" },
            ],
            id: application.id,
            role: job?.title || "Creative role",
            status: application.status,
          } satisfies Application;
        }),
      ]);
    }

    hydrateDashboard();

    window.addEventListener("mediahire:saved-jobs-updated", hydrateDashboard);
    window.addEventListener("mediahire:applications-updated", hydrateDashboard);
    window.addEventListener("mediahire:jobseeker-profile-updated", hydrateDashboard);

    return () => {
      window.removeEventListener("mediahire:saved-jobs-updated", hydrateDashboard);
      window.removeEventListener("mediahire:applications-updated", hydrateDashboard);
      window.removeEventListener(
        "mediahire:jobseeker-profile-updated",
        hydrateDashboard,
      );
    };
  }, []);

  return (
    <motion.main
      animate="show"
      className={`${mediaHireClassNames.appShell} overflow-x-hidden px-4 py-4 sm:px-5 lg:px-6`}
      initial="hidden"
      transition={mediaHireMotion.page}
      variants={fadeIn}
    >
      <div className="mx-auto grid w-full max-w-[1240px] gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
        <DashboardSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="min-w-0">
          <DashboardTopbar
            onOpenSidebar={() => setIsSidebarOpen(true)}
            onSearchChange={setSearch}
            profile={profile}
            search={search}
          />

          <div className="mt-5 grid min-w-0 gap-5 min-[1180px]:grid-cols-[minmax(0,1fr)_360px]">
            <div className="grid min-w-0 gap-4">
              <ProfileSummaryCard
                applicationsCount={applicationItems.length}
                profile={profile}
                savedJobsCount={savedJobItems.length}
              />
              <SavedJobsCard savedJobItems={savedJobItems} search={search} />
              <ApplicationStatusCard items={applicationItems} />
            </div>

            <aside className="grid min-w-0 content-start items-start gap-4">
              <StatusDonutCard items={applicationItems} />
              <MessagesPreviewCard />
            </aside>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
