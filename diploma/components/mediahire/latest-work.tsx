import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "./data";
import { MotionArticle, MotionSection } from "./motion-section";
import {
  fadeInUp,
  mediaHireClassNames,
  mediaHireMotion,
} from "./ui/design-system";

export function LatestWork() {
  return (
    <MotionSection className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2563ff]">
          Portfolio gallery
        </p>
        <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          Latest work
        </h2>
      </div>

      <div className="mt-11 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <MotionArticle
            className={`group overflow-hidden p-3 transition duration-300 hover:shadow-[0_28px_80px_rgba(11,99,229,0.12)] ${mediaHireClassNames.card}`}
            initial="hidden"
            key={`${project.title}-${project.creator}`}
            transition={mediaHireMotion.item(index)}
            variants={fadeInUp}
            viewport={{ once: true, margin: "-70px" }}
            whileHover={mediaHireMotion.cardHover}
            whileInView="show"
          >
            <div className="relative aspect-[1.22] overflow-hidden rounded-xl bg-slate-100">
              <Image
                alt={project.title}
                className="object-cover transition duration-500 group-hover:scale-105"
                fill
                loading={index < 3 ? "eager" : "lazy"}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                src={project.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              <span className="absolute right-4 top-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-white/90 text-slate-950 opacity-0 shadow-lg backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight size={18} />
              </span>
            </div>
            <div className="px-1 pb-2 pt-4">
              <h3 className="text-lg font-black text-slate-950">
                {project.title}
              </h3>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                {project.creator}
              </p>
            </div>
          </MotionArticle>
        ))}
      </div>
    </MotionSection>
  );
}
