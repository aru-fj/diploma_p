"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
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
  applications,
  filterPills,
  messages,
  profileAvatar,
  savedJobs,
  sidebarBottomItems,
  sidebarMenuItems,
  statusSummary,
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

type DashboardTab = "Apply status" | "Offered job";

function DashboardLogo() {
  return (
    <Link className="block leading-tight" href="/dashboard/jobseeker">
      <span className="block text-xl font-black tracking-tight">
        <span className="text-[#0B63E5]">Media</span>
        <span className="text-slate-950">Hire</span>
      </span>
      <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
        Dashboard
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
      className="flex h-full w-full flex-col rounded-[2rem] border border-slate-100 bg-white p-5 shadow-[0_22px_70px_rgba(15,23,42,0.06)]"
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

      <nav className="mt-10 grid gap-2">
        {sidebarMenuItems.map((item) => {
          const isActive = item.label === "Dashboard";

          return (
            <motion.button
              className={`flex h-12 items-center gap-3 rounded-2xl px-4 text-left text-sm font-black transition ${
                isActive
                  ? "bg-[#0B63E5] text-white shadow-[0_16px_34px_rgba(11,99,229,0.22)]"
                  : "text-slate-600 hover:bg-[#eef4ff] hover:text-[#0B63E5]"
              }`}
              key={item.label}
              type="button"
              whileHover={{ x: isActive ? 0 : 2, transition: mediaHireMotion.fast }}
            >
              <item.icon size={18} />
              {item.label}
            </motion.button>
          );
        })}
      </nav>

      <div className="mt-auto grid gap-2 border-t border-slate-100 pt-5">
        {sidebarBottomItems.map((item) => {
          const isLogout = item.label === "Log out";

          return (
            <Link
              className={`flex h-12 items-center gap-3 rounded-2xl px-4 text-sm font-black transition ${
                isLogout
                  ? "text-red-500 hover:bg-red-50"
                  : "text-slate-500 hover:bg-[#eef4ff] hover:text-[#0B63E5]"
              }`}
              href={isLogout ? "/" : "#help"}
              key={item.label}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </motion.aside>
  );

  return (
    <>
      <div className="hidden lg:sticky lg:top-6 lg:block lg:h-[calc(100vh-3rem)]">
        {sidebar}
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
  search,
  onSearchChange,
}: {
  onOpenSidebar: () => void;
  onSearchChange: (value: string) => void;
  search: string;
}) {
  return (
    <header className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
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
          <h1 className={mediaHireClassNames.h1}>Dashboard</h1>
          <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-slate-500">
            View your activity, applications, and latest updates in one place
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex h-12 min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-[0_12px_32px_rgba(15,23,42,0.04)] sm:w-72">
          <Search className="text-slate-400" size={18} />
          <input
            className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search"
            type="search"
            value={search}
          />
        </label>

        <div className="flex items-center gap-3 rounded-2xl bg-white p-2 shadow-[0_12px_32px_rgba(15,23,42,0.04)]">
          <button
            aria-label="Notifications"
            className="relative grid h-11 w-11 place-items-center rounded-full bg-[#eef4ff] text-[#0B63E5]"
            type="button"
          >
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
          <Image
            alt="Dana Muhtarova"
            className="h-11 w-11 rounded-full object-cover"
            height={44}
            src={profileAvatar}
            width={44}
          />
          <div className="hidden min-w-0 pr-2 sm:block">
            <p className="truncate text-sm font-black text-slate-950">
              Dana Muhtarova
            </p>
            <p className="truncate text-xs font-semibold text-slate-400">
              danamuhtarova@gmail.com
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
    <div className="rounded-3xl border border-slate-100 bg-[#f8fbff] p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-[#0B63E5] shadow-sm">
          <Icon size={19} />
        </span>
        <div>
          <p className="text-2xl font-black text-slate-950">{value}</p>
          <p className="text-sm font-semibold leading-5 text-slate-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

function ProfileSummaryCard() {
  return (
    <motion.section
      animate="show"
      className={`p-5 sm:p-6 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(0)}
      variants={fadeInUp}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <Image
          alt="Dana Muhtarova"
          className="h-24 w-24 rounded-3xl object-cover ring-4 ring-[#eef4ff]"
          height={96}
          src={profileAvatar}
          width={96}
        />
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Dana Muhtarova
          </h2>
          <p className="mt-1 text-sm font-bold text-slate-500">
            Graphic Designer, 4+ years of experience
          </p>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[76%] rounded-full bg-[#0B63E5]" />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <StatsCard icon="eye" label="people viewed your profile" value={3} />
        <StatsCard icon="heart" label="people liked your resume" value={0} />
      </div>
    </motion.section>
  );
}

function SavedJobRow({ job, index }: { index: number; job: SavedJob }) {
  return (
    <motion.div
      animate="show"
      className="group flex items-center gap-4 rounded-3xl border border-transparent p-3 transition hover:border-[#0B63E5]/15 hover:bg-[#f8fbff]"
      initial="hidden"
      transition={mediaHireMotion.item(index)}
      variants={fadeInUp}
      whileHover={mediaHireMotion.cardHover}
    >
      <Link
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-sm font-black ${job.companyColor}`}
        href={`/jobs/${job.id}`}
      >
        {job.companyLogo}
      </Link>
      <Link className="min-w-0 flex-1" href={`/jobs/${job.id}`}>
        <h3 className="truncate text-base font-black text-slate-950">
          {job.title}
        </h3>
        <p className="mt-1 truncate text-sm font-semibold text-slate-500">
          {job.skill} • {job.type} • {job.location}
        </p>
      </Link>
      <span className="shrink-0 rounded-full bg-[#eef4ff] px-3 py-1.5 text-xs font-black text-[#0B63E5]">
        {job.date}
      </span>
    </motion.div>
  );
}

function SavedJobsCard({ search }: { search: string }) {
  const visibleJobs = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return savedJobs;

    return savedJobs.filter((job) =>
      `${job.title} ${job.skill} ${job.location} ${job.type}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [search]);

  return (
    <motion.section
      animate="show"
      className={`p-5 sm:p-6 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(1)}
      variants={fadeInUp}
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-black text-slate-950">Save job</h2>
        <Link className="text-sm font-black text-[#0B63E5]" href="/saved-jobs">
          View all
        </Link>
      </div>

      <div className="mt-5 grid gap-2">
        {visibleJobs.map((job, index) => (
          <SavedJobRow index={index} job={job} key={job.id} />
        ))}
      </div>
    </motion.section>
  );
}

function StatusDonutCard() {
  return (
    <motion.section
      animate="show"
      className={`p-5 sm:p-6 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(2)}
      variants={fadeInUp}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-950">Status of apply</h2>
          <p className="mt-1 text-sm font-bold text-slate-400">January 2025</p>
        </div>
        <button className="rounded-full bg-[#eef4ff] px-3 py-1.5 text-xs font-black text-[#0B63E5]">
          Month
        </button>
      </div>

      <div className="mt-7 grid place-items-center">
        <div
          className="relative grid h-44 w-44 place-items-center rounded-full"
          style={{
            background:
              "conic-gradient(#0B63E5 0deg 180deg, #fbbf24 180deg 360deg)",
          }}
        >
          <div className="grid h-28 w-28 place-items-center rounded-full bg-white text-center shadow-inner">
            <div>
              <p className="text-3xl font-black text-slate-950">2</p>
              <p className="text-xs font-bold text-slate-400">Total job</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7 grid gap-3">
        {statusSummary.map((item) => (
          <div className="flex items-center justify-between gap-4" key={item.label}>
            <span className="flex items-center gap-2 text-sm font-bold text-slate-600">
              <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
              {item.label}
            </span>
            <span className="text-sm font-black text-slate-950">{item.value}</span>
          </div>
        ))}
      </div>

      <p className="mt-5 text-sm font-medium leading-6 text-slate-500">
        Track your recent applications and understand which opportunities need
        your attention next.
      </p>
    </motion.section>
  );
}

function MessagePreviewItem({ message }: { message: MessagePreview }) {
  return (
    <Link
      className="flex items-center gap-3 rounded-3xl p-3 transition hover:bg-[#f8fbff]"
      href="/dashboard/jobseeker/community"
    >
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-black ${message.avatarColor}`}
      >
        {message.initials}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-black text-slate-950">
          {message.name}
        </span>
        <span className="mt-1 block truncate text-xs font-semibold text-slate-500">
          {message.preview}
        </span>
      </span>
      <span className="grid h-6 min-w-6 place-items-center rounded-full bg-red-500 px-1.5 text-xs font-black text-white">
        {message.unread}
      </span>
    </Link>
  );
}

function MessagesPreviewCard() {
  return (
    <motion.section
      animate="show"
      className={`p-5 sm:p-6 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(3)}
      variants={fadeInUp}
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-black text-slate-950">Messages</h2>
        <Link
          className="text-sm font-black text-[#0B63E5]"
          href="/dashboard/jobseeker/community"
        >
          More
        </Link>
      </div>
      <div className="mt-5 grid gap-2">
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
      <div className="mt-5 rounded-3xl bg-[#f8fbff] p-4">
        {history.map((item, index) => (
          <div
            className="grid grid-cols-[28px_1fr_auto] items-center gap-3"
            key={`${item.label}-${item.time}`}
          >
            <span className="relative grid h-7 w-7 place-items-center">
              <span
                className={`h-3 w-3 rounded-full ${
                  index === 0 ? "bg-[#0B63E5]" : "bg-slate-300"
                }`}
              />
              {index < history.length - 1 ? (
                <span className="absolute left-1/2 top-5 h-9 w-px -translate-x-1/2 bg-slate-200" />
              ) : null}
            </span>
            <span className="py-3 text-sm font-black text-slate-700">
              {item.label}
            </span>
            <span className="text-xs font-bold text-slate-400">{item.time}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ApplicationStatusCard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("Apply status");
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(applications[0]?.id ?? "");
  const visibleApplications =
    activeTab === "Offered job"
      ? []
      : applications.filter(
          (application) =>
            activeFilter === "All" || application.status === activeFilter,
        );

  return (
    <motion.section
      animate="show"
      className={`p-5 sm:p-6 ${mediaHireClassNames.card}`}
      initial="hidden"
      transition={mediaHireMotion.item(4)}
      variants={fadeInUp}
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex rounded-full bg-slate-100 p-1">
          {(["Apply status", "Offered job"] as const).map((tab) => (
            <button
              className={`rounded-full px-5 py-2 text-sm font-black transition ${
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
          className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 outline-none focus:border-[#0B63E5]"
          defaultValue="Newest"
        >
          <option>Newest</option>
          <option>Oldest</option>
        </select>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {filterPills.map((pill) => (
          <button
            className={`h-10 shrink-0 rounded-full px-4 text-sm font-black transition ${
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

      <div className="mt-6 grid gap-4">
        {visibleApplications.length > 0 ? (
          visibleApplications.map((application) => {
            const isExpanded = expandedId === application.id;

            return (
              <article
                className="rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_14px_40px_rgba(15,23,42,0.035)]"
                key={application.id}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-500">
                      {application.company}
                    </p>
                    <h3 className="mt-1 text-lg font-black text-slate-950">
                      {application.role}
                    </h3>
                  </div>
                  <button
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-amber-100 px-4 text-sm font-black text-amber-600 transition hover:bg-amber-200"
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
          <div className="rounded-3xl border border-dashed border-slate-200 bg-[#f8fbff] p-8 text-center">
            <p className="text-sm font-black text-slate-500">
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

  return (
    <motion.main
      animate="show"
      className={`${mediaHireClassNames.appShell} px-4 py-6 sm:px-6 lg:px-8`}
      initial="hidden"
      transition={mediaHireMotion.page}
      variants={fadeIn}
    >
      <div className="mx-auto grid max-w-[1500px] gap-6 lg:grid-cols-[280px_1fr]">
        <DashboardSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="min-w-0">
          <DashboardTopbar
            onOpenSidebar={() => setIsSidebarOpen(true)}
            onSearchChange={setSearch}
            search={search}
          />

          <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="grid min-w-0 gap-6">
              <ProfileSummaryCard />
              <SavedJobsCard search={search} />
              <ApplicationStatusCard />
            </div>

            <aside className="grid content-start gap-6">
              <StatusDonutCard />
              <MessagesPreviewCard />
            </aside>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
