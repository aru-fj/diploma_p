import Image from "next/image";

type TestimonialCardProps = {
  avatar?: string;
  name?: string;
  role?: string;
  text?: string;
};

const defaultText =
  "Sandro taught me that fashion isn't just about clothes—it's about people, culture, and storytelling. The interview felt more like a conversation about vision and creativity than a test of experience. I left the process inspired.";

export function TestimonialCard({
  avatar = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
  name = "Aruzhan Rauan",
  role = "Job Seeker",
  text = defaultText,
}: TestimonialCardProps) {
  return (
    <div className="rounded-2xl border border-white/45 bg-white/88 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-md sm:p-6">
      <div className="flex items-center gap-3">
        <Image
          alt={name}
          className="h-11 w-11 rounded-full object-cover ring-2 ring-white"
          height={44}
          src={avatar}
          width={44}
        />
        <div>
          <h3 className="text-base font-black text-slate-950">{name}</h3>
          <p className="text-xs font-semibold text-slate-500">{role}</p>
        </div>
      </div>
      <p className="mt-6 text-sm leading-7 text-slate-800 sm:text-base">
        {text}
      </p>
      <div className="mt-6 flex justify-center gap-1.5">
        {[0, 1, 2, 3, 4].map((dot) => (
          <span
            className={`h-2 rounded-full transition ${
              dot === 0 ? "w-2 bg-slate-950" : "w-2 bg-slate-300"
            }`}
            key={dot}
          />
        ))}
      </div>
    </div>
  );
}
