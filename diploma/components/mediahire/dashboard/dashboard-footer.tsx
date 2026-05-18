import { MapPin, Phone } from "lucide-react";
import { socialLinks } from "./dashboard-data";

export function DashboardFooter() {
  return (
    <footer className="mt-6 rounded-t-xl border border-slate-200 bg-white px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
        <div>
          <h2 className="text-3xl font-black tracking-tight">
            <span className="text-[#0B63E5]">Media</span>
            <span className="text-slate-950">Hire</span>
          </h2>
          <p className="mt-5 max-w-sm text-sm font-medium leading-6 text-slate-600">
            MediaHire is a smart job search and recruitment platform that
            connects job seekers with employers. With fast search, professional
            resume building, and intelligent matching, job hunting and hiring
            are safe and efficient.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-black text-slate-950">Our services</h3>
          <ul className="mt-5 space-y-3 text-sm font-medium text-slate-600">
            {["Find job", "Create resume", "Search company", "Pricing Plan"].map(
              (item) => (
                <li key={item}>
                  <a className="transition hover:text-[#0B63E5]" href="#">
                    {item}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-black text-slate-950">Links</h3>
          <ul className="mt-5 space-y-3 text-sm font-medium text-slate-600">
            {["Blog", "Help center", "Contact us", "Privacy Policy", "About us"].map(
              (item) => (
                <li key={item}>
                  <a className="transition hover:text-[#0B63E5]" href="#">
                    {item}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-black text-slate-950">Contact Us</h3>
          <div className="mt-5 flex gap-3">
            {socialLinks.slice(0, 3).map((item) => (
              <a
                aria-label={item.label}
                className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:border-[#0B63E5] hover:text-[#0B63E5]"
                href="#"
                key={item.label}
              >
                <item.icon size={15} />
              </a>
            ))}
          </div>
          <div className="mt-6 space-y-4 text-sm font-medium text-slate-600">
            <p className="flex items-center gap-3">
              <MapPin size={16} />
              1500 Marilla St, Dallas, TX 75201
            </p>
            <p className="flex items-center gap-3">
              <Phone size={16} />
              16477558-5560
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
