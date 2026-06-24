"use client";

import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const si = (slug: string, c: string) =>
  `https://cdn.simpleicons.org/${slug}/${c}`;

type Tech = { name: string; src: string; color: string };

const GROUPS: { cat: string; accent: string; items: Tech[] }[] = [
  {
    cat: "Frontend",
    accent: "#61DAFB",
    items: [
      { name: "React", src: si("react", "61DAFB"), color: "#61DAFB" },
      { name: "Next.js", src: si("nextdotjs", "ffffff"), color: "#ffffff" },
      { name: "TypeScript", src: si("typescript", "3178C6"), color: "#3178C6" },
      { name: "Tailwind", src: si("tailwindcss", "06B6D4"), color: "#06B6D4" },
      { name: "Vite", src: si("vite", "646CFF"), color: "#646CFF" },
      { name: "TanStack", src: si("reactquery", "FF4154"), color: "#FF4154" },
    ],
  },
  {
    cat: "Backend",
    accent: "#5FA04E",
    items: [
      { name: "Node.js", src: si("nodedotjs", "5FA04E"), color: "#5FA04E" },
      { name: "Express", src: si("express", "ffffff"), color: "#ffffff" },
      { name: "Python", src: si("python", "3776AB"), color: "#3776AB" },
      { name: "Django", src: si("django", "092E20"), color: "#44B78B" },
      { name: "Flask", src: si("flask", "ffffff"), color: "#ffffff" },
      { name: "Firebase", src: si("firebase", "DD2C00"), color: "#DD2C00" },
    ],
  },
  {
    cat: "Datos",
    accent: "#FFD43B",
    items: [
      { name: "MySQL", src: si("mysql", "4479A1"), color: "#4479A1" },
      { name: "Supabase", src: si("supabase", "3FCF8E"), color: "#3FCF8E" },
      { name: "PostgreSQL", src: si("postgresql", "4169E1"), color: "#4169E1" },
      { name: "Pandas", src: si("pandas", "150458"), color: "#E70488" },
      { name: "Power BI", src: si("powerbi", "F2C811"), color: "#F2C811" },
    ],
  },
  {
    cat: "DevOps & Herramientas",
    accent: "#ffb054",
    items: [
      { name: "Git", src: si("git", "F05032"), color: "#F05032" },
      { name: "GitHub", src: si("github", "ffffff"), color: "#ffffff" },
      { name: "Vercel", src: si("vercel", "ffffff"), color: "#ffffff" },
      { name: "n8n", src: si("n8n", "EA4B71"), color: "#EA4B71" },
      { name: "Playwright", src: "/playwright-logo.webp", color: "#2EAD33" },
    ],
  },
];

export default function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <SectionHead index="04" label="Stack tecnológico" />

      <div className="space-y-10">
        {GROUPS.map((g, gi) => (
          <Reveal key={g.cat} variant="fade-up" delay={gi * 0.06}>
            <h3
              className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.3em]"
              style={{ color: g.accent }}
            >
              {g.cat}
            </h3>
            <div className="flex flex-wrap gap-3">
              {g.items.map((t) => (
                <div
                  key={t.name}
                  className="group flex items-center gap-3 rounded-xl border border-line bg-panel px-4 py-3 transition-all duration-300 hover:border-transparent hover:shadow-lg"
                  style={
                    {
                      "--tc": t.color,
                    } as React.CSSProperties
                  }
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = `color-mix(in srgb, ${t.color} 40%, transparent)`;
                    el.style.boxShadow = `0 8px 30px -8px color-mix(in srgb, ${t.color} 25%, transparent)`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "";
                    el.style.boxShadow = "";
                  }}
                >
                  <img
                    src={t.src}
                    alt={t.name}
                    width={22}
                    height={22}
                    loading="lazy"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="text-sm font-medium text-ink/80 transition-colors group-hover:text-ink">
                    {t.name}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
