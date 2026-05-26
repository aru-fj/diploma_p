import {
  Camera,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import Link from "next/link";
import { footerLinks } from "./data";
import type { PublicRole } from "./header";

const servicesByRole: Record<
  PublicRole,
  {
    label: string;
    href: string;
  }[]
> = {
  jobseeker: [
    { label: "Search Job", href: "/search-job" },
    { label: "Create Resume", href: "/auth-required?feature=create-resume" },
    { label: "Find Projects", href: "/?section=projects" },
    {
      label: "Track Applications",
      href: "/auth-required?feature=track-applications",
    },
  ],
  employer: [
    { label: "Post a Job", href: "/auth-required?feature=post-job&role=employer" },
    { label: "Search CV", href: "/search-cv" },
    {
      label: "Review Applications",
      href: "/auth-required?feature=review-applications&role=employer",
    },
    {
      label: "Save Candidates",
      href: "/auth-required?feature=save-candidates&role=employer",
    },
  ],
};

export function Footer({ role = "jobseeker" }: { role?: PublicRole }) {
  return (
    <footer className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.05)] sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.25fr] lg:p-12">
        <div>
          <Link
            className="text-2xl font-black tracking-tight text-slate-950"
            href={role === "employer" ? "/?role=employer" : "/"}
          >
            <span className="text-[#2563ff]">Media</span>Hire
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-500">
            MediaHire is a modern marketplace where creative professionals find
            meaningful work, showcase portfolios, and connect with media teams
            faster.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { icon: Camera, label: "Instagram" },
              { icon: MessageCircle, label: "Facebook" },
              { icon: Send, label: "Twitter" },
            ].map(({ icon: Icon, label }) => (
              <a
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-[#2563ff] hover:bg-[#eef4ff] hover:text-[#2563ff]"
                href={
                  label === "Instagram"
                    ? "https://instagram.com"
                    : label === "Facebook"
                      ? "https://wa.me/77714048137"
                      : "https://t.me"
                }
                key={label}
                rel="noreferrer"
                target="_blank"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Services" links={servicesByRole[role]} />
        <FooterColumn title="Links" links={footerLinks} />

        <div>
          <h3 className="text-sm font-black text-slate-950">Contact info</h3>
          <ul className="mt-5 space-y-4 text-sm font-semibold text-slate-500">
            <li className="flex items-center gap-3">
              <Camera size={16} className="text-[#2563ff]" />
              Instagram
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-[#2563ff]" />
              Astana IT University
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-[#2563ff]" />
              8(771)404-8137
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links:
    | string[]
    | {
        label: string;
        href: string;
      }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-black text-slate-950">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm font-semibold text-slate-500">
        {links.map((item) => (
          <li key={typeof item === "string" ? item : item.label}>
            <Link
              className="transition hover:text-[#2563ff]"
              href={typeof item === "string" ? "#" : item.href}
            >
              {typeof item === "string" ? item : item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
