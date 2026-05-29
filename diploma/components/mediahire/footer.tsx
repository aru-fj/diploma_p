import {
  Camera,
  GraduationCap,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import Link from "next/link";
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
    { label: "Find Projects", href: "/?section=people#public-projects" },
    {
      label: "Track Applications",
      href: "/auth-required?feature=track-applications",
    },
  ],
  employer: [
    {
      label: "Post a Job",
      href: "/auth-required?feature=post-job&role=employer",
    },
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
    <footer className="bg-white px-2 py-0 sm:px-4">
      <div className="mx-auto max-w-7xl rounded-t-lg border border-slate-200 bg-white px-8 py-12 sm:px-12 lg:px-[116px]">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link
              className="text-3xl font-black tracking-tight text-slate-950"
              href={role === "employer" ? "/?role=employer" : "/"}
            >
              <span className="text-[#2563ff]">Media</span>Hire
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-6 text-slate-600">
              MediaHire is a smart job search and recruitment platform that
              connects job seekers with employers. With fast search,
              professional resume building, and intelligent matching, MediaHire
              makes hiring and job hunting easy and efficient.
            </p>
            <p className="mt-6 text-sm font-semibold text-slate-800">
              Diploma Project:{" "}
              <span className="font-medium">
                Zh. Aishat, K. Aruzhan, A. Zhanel
              </span>
            </p>
          </div>

          <FooterColumn title="Our services" links={servicesByRole[role]} />

          <div>
            <h3 className="text-base font-semibold text-slate-950">
              Contact Us
            </h3>
            <div className="mt-5 flex items-center gap-3">
              <a
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-lg bg-[#fff2f6] text-[#ff3b6b] transition hover:-translate-y-0.5"
                href="https://instagram.com/astana_it_university"
                rel="noreferrer"
                target="_blank"
              >
                <Camera size={18} />
              </a>
              <a
                aria-label="WhatsApp"
                className="grid h-9 w-9 place-items-center rounded-lg bg-[#ecfff3] text-[#22c55e] transition hover:-translate-y-0.5"
                href="https://wa.me/77714048137"
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircle size={18} />
              </a>
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-700">
                <GraduationCap size={18} />
              </span>
            </div>

            <ul className="mt-7 space-y-4 text-sm text-slate-700">
              <li className="flex items-center gap-3">
                <GraduationCap size={18} className="text-slate-600" />
                Developed at Astana IT University
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-slate-600" />
                <a
                  className="transition hover:text-[#2563ff]"
                  href="tel:+77714048137"
                >
                  8(771)404-8137
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-slate-600" />
                <a
                  className="transition hover:text-[#2563ff]"
                  href="mailto:aitumedia7@gmail.com"
                >
                  aitumedia7@gmail.com
                </a>
              </li>
            </ul>
          </div>
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
  links: {
    label: string;
    href: string;
  }[];
}) {
  return (
    <div>
      <h3 className="text-base font-semibold text-slate-950">{title}</h3>
      <ul className="mt-6 space-y-4 text-sm text-slate-700">
        {links.map((item) => (
          <li key={item.label}>
            <Link
              className="transition hover:text-[#2563ff]"
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
