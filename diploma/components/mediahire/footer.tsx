import {
  Camera,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { footerLinks, serviceLinks } from "./data";

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.05)] sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.25fr] lg:p-12">
        <div>
          <a className="text-2xl font-black tracking-tight text-slate-950" href="#">
            <span className="text-[#2563ff]">Media</span>Hire
          </a>
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
                href="#"
                key={label}
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Services" links={serviceLinks} />
        <FooterColumn title="Links" links={footerLinks} />

        <div>
          <h3 className="text-sm font-black text-slate-950">Contact info</h3>
          <ul className="mt-5 space-y-4 text-sm font-semibold text-slate-500">
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-[#2563ff]" />
              hello@mediahire.com
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-[#2563ff]" />
              1509 Main St, Dallas, TX 75201
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-[#2563ff]" />
              1-563-568-5580
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-black text-slate-950">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm font-semibold text-slate-500">
        {links.map((link) => (
          <li key={link}>
            <a className="transition hover:text-[#2563ff]" href="#">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
