import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const GROUPS: { title: string; accent: string; items: string[] }[] = [
  {
    title: "Frontend",
    accent: "#61DAFB",
    items: [
      "React.js",
      "Next.js (App Router)",
      "TypeScript",
      "TailwindCSS v4",
      "PWA · Service Workers",
      "TanStack Query",
      "IndexedDB / Dexie.js",
      "Vite · HLS.js",
    ],
  },
  {
    title: "Backend",
    accent: "#3C873A",
    items: [
      "Node.js · Express",
      "APIs REST · Microservicios",
      "Python · Django · Flask",
      "Firebase Auth · Google Auth",
      "Web Crypto API (AES-GCM)",
      "Playwright (E2E / scraping)",
    ],
  },
  {
    title: "Datos",
    accent: "#FFD43B",
    items: [
      "MySQL · SQL",
      "Supabase (PostgreSQL)",
      "Firebase Firestore",
      "Pandas · Pipelines ETL",
      "Power BI",
      "Web scraping",
    ],
  },
  {
    title: "DevOps & IA",
    accent: "#ffb054",
    items: [
      "Git / GitHub",
      "Vercel · CI/CD",
      "n8n · Zapier · Make",
      "Prompt engineering",
      "IA generativa",
      "Agile / Scrum",
    ],
  },
];

export default function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHead index="04" label="Stack tecnológico" />

      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {GROUPS.map((g, i) => (
          <div key={g.title} className="bg-panel p-8">
            <Reveal delay={i * 0.08}>
              <h3
                className="font-mono text-[11px] font-bold uppercase tracking-[0.3em]"
                style={{ color: g.accent }}
              >
                {g.title}
              </h3>
              <ul className="mt-6 space-y-3">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="group flex items-center gap-3 text-sm text-ink/80 transition-colors hover:text-ink"
                  >
                    <span
                      className="h-px w-3 shrink-0 bg-line transition-all group-hover:w-5"
                      style={{ backgroundColor: `${g.accent}55` }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
