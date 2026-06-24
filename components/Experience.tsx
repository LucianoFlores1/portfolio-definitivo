"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const JOBS = [
  {
    role: "Full Stack Developer",
    org: "Freelance · Remoto",
    period: "2023 — Presente",
    accent: "#8fb4ff",
    tags: ["React", "Next.js", "Node.js", "Express", "Supabase", "n8n", "Python"],
    highlight: "−40% tiempos manuales · 2° Hackathon El Milagro 2025",
  },
  {
    role: "Analista de Datos",
    org: "Freelance · Remoto",
    period: "2021 — 2022",
    accent: "#FFD43B",
    tags: ["Python", "Pandas", "SQL", "Power BI", "ETL"],
  },
  {
    role: "Backend con Python",
    org: "UPATecO · Tecnicatura",
    period: "2022 — 2024",
    accent: "#3776AB",
    tags: ["Django", "Flask", "Playwright", "APIs REST"],
  },
];

export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { scaleY: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { scaleY: 0 }, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top 75%",
          end: "bottom 40%",
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="experiencia" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <SectionHead index="03" label="Experiencia" />

      <div className="relative">
        <div
          ref={lineRef}
          className="absolute left-[7px] top-0 hidden h-full w-px origin-top bg-gradient-to-b from-accent/60 via-accent/30 to-transparent md:block"
        />

        <div className="space-y-6 md:pl-10">
          {JOBS.map((job, i) => (
            <Reveal
              key={job.role}
              variant={i % 2 === 0 ? "fade-left" : "fade-right"}
              delay={i * 0.06}
            >
              <article
                className="group relative rounded-xl border border-line bg-panel p-6 transition-all duration-300 hover:border-transparent md:p-8"
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = `color-mix(in srgb, ${job.accent} 30%, transparent)`;
                  el.style.boxShadow = `0 20px 50px -15px color-mix(in srgb, ${job.accent} 15%, transparent)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "";
                  el.style.boxShadow = "";
                }}
              >
                <div className="absolute -left-10 top-8 hidden h-3.5 w-3.5 rounded-full border-2 bg-bg md:block" style={{ borderColor: job.accent }} />

                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accent md:text-2xl">
                    {job.role}
                  </h3>
                  <p className="shrink-0 font-mono text-xs tracking-[0.18em] text-muted">
                    {job.period}
                  </p>
                </div>

                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                  {job.org}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white/[.06] px-2.5 py-1 font-mono text-[10.5px] text-ink/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {job.highlight && (
                  <p className="mt-4 inline-block rounded-lg border border-hot/30 bg-hot/5 px-3 py-2 font-mono text-[11px] tracking-[0.06em] text-hot">
                    {job.highlight}
                  </p>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
