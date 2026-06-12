import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

type Job = {
  role: string;
  org: string;
  period: string;
  summary: string;
  points: string[];
  highlight?: string;
};

const JOBS: Job[] = [
  {
    role: "Full Stack Developer",
    org: "Freelance · Remoto",
    period: "2023 — Presente",
    summary:
      "Desarrollo end-to-end de aplicaciones web para clientes de sectores públicos y privados.",
    points: [
      "APIs REST con Node.js y Express: lógica de negocio, autenticación y validaciones",
      "Interfaces modernas con React, Next.js y TailwindCSS con componentes reutilizables",
      "PWAs con soporte offline, Service Workers y cifrado AES-GCM",
      "Automatización de procesos administrativos con n8n y Python",
      "Modelado y optimización de bases SQL (MySQL, Supabase) · despliegues en Vercel con CI/CD",
    ],
    highlight: "−40% en tiempos operativos manuales · 2° lugar Hackathon El Milagro 2025",
  },
  {
    role: "Analista de Datos / Desarrollador",
    org: "Freelance · Remoto",
    period: "2021 — 2022",
    summary:
      "Pipelines de datos y visualización para decisiones de negocio.",
    points: [
      "Pipelines ETL con Python y Pandas para extracción y transformación de datos",
      "Dashboards y visualizaciones interactivas en Power BI",
      "Modelado y consultas SQL · limpieza y normalización de datasets",
    ],
  },
  {
    role: "Backend con Python",
    org: "UPATecO · Tecnicatura en Desarrollo de Software",
    period: "2022 — 2024",
    summary:
      "Formación formal en backend Python aplicada en proyectos propios reales.",
    points: [
      "Django: routing, ORM, autenticación, sesiones y vistas basadas en clases",
      "Flask: blueprints, APIs ligeras y manejo de JSON",
      "Playwright: scraping, testing E2E y automatización headless de navegadores",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experiencia"
      className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40"
    >
      <SectionHead index="02" label="Experiencia" />

      <div className="divide-y divide-line border-y border-line">
        {JOBS.map((job, i) => (
          <Reveal key={job.role} delay={i * 0.05}>
            <article className="group grid gap-6 py-12 transition-colors md:grid-cols-[180px_1fr] md:gap-12">
              <p className="font-mono text-xs tracking-[0.18em] text-muted md:pt-2">
                {job.period}
              </p>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent md:text-3xl">
                  {job.role}
                </h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                  {job.org}
                </p>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
                  {job.summary}
                </p>
                <ul className="mt-5 max-w-2xl space-y-2.5">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
                {job.highlight && (
                  <p className="mt-6 inline-block rounded-lg border border-hot/30 bg-hot/5 px-4 py-2.5 font-mono text-[11px] tracking-[0.08em] text-hot">
                    ★ {job.highlight}
                  </p>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
