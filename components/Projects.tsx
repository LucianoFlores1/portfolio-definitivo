import type { CSSProperties } from "react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

type Project = {
  id: string;
  title: string;
  badge?: string;
  desc: string;
  impact: string;
  stack: string[];
  color: string;
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    id: "miamigofiel",
    title: "miAmigoFiel",
    badge: "2° lugar · Hackathon El Milagro 2025",
    desc: "Plataforma colaborativa para reportar y encontrar mascotas perdidas con geolocalización en tiempo real, búsqueda geolocalizada y notificaciones. Desarrollada en equipo bajo metodología ágil.",
    impact: "Premio en competencia tecnológica regional",
    stack: ["Next.js", "React", "Supabase", "PostgreSQL", "Geolocalización"],
    color: "#3ECF8E",
    featured: true,
  },
  {
    id: "eziptv",
    title: "EzIPTV",
    badge: "Open Source",
    desc: "PWA instalable para reproducción IPTV con streaming adaptativo HLS, almacenamiento offline con IndexedDB y cifrado AES-GCM de credenciales vía Web Crypto API.",
    impact: "PWA avanzada · seguridad web · streaming adaptativo",
    stack: ["Next.js 16", "React 19", "HLS.js", "Dexie.js", "TanStack Query", "PWA"],
    color: "#8fb4ff",
    featured: true,
  },
  {
    id: "portal-empleos",
    title: "Portal de Empleos Salta",
    desc: "Plataforma de gestión de ofertas laborales con panel admin seguro (Google Auth), SEO “AI-First” compatible con Perplexity y ChatGPT, Schema.org y prerenderizado en Edge.",
    impact: "Producto real en producción",
    stack: ["React 19", "TypeScript", "Firebase", "Express", "Vercel"],
    color: "#FFA000",
  },
  {
    id: "gestion-municipal",
    title: "Gestión Municipal",
    desc: "Dashboards internos y automatización de procesos administrativos municipales con n8n: digitalización de flujos antes manuales.",
    impact: "−40% en tiempos operativos manuales",
    stack: ["n8n", "Dashboards", "Automatización"],
    color: "#ffb054",
  },
  {
    id: "drive-scraper",
    title: "Drive Scraper + JSON Comparator",
    desc: "Script Python para scraping automatizado de carpetas de Google Drive y comparación estructural de JSONs: detección de diferencias y anomalías entre versiones.",
    impact: "Auditoría de datos automatizada",
    stack: ["Python", "Google Drive API", "JSON"],
    color: "#FFD43B",
  },
  {
    id: "inventario-pymes",
    title: "Inventario para PyMEs",
    desc: "Sistema web de gestión de inventario y técnicos para pequeñas y medianas empresas, con API REST y frontend modular orientado al negocio.",
    impact: "Arquitectura orientada al negocio",
    stack: ["React", "Node.js", "Express", "API REST"],
    color: "#61DAFB",
  },
];

function Card({ project, index }: { project: Project; index: number }) {
  const c = project.color;
  return (
    <article
      id={`proyecto-${project.id}`}
      className={`pcard sheen-host flex h-full flex-col rounded-[28px] border border-line bg-panel p-8 md:p-10 ${
        project.featured ? "md:col-span-1 lg:p-12" : ""
      }`}
      style={{ "--pc": c } as CSSProperties}
    >
      <span className="sheen" aria-hidden="true" />
      {/* línea de acento superior, como las tarjetas del anillo */}
      <span
        aria-hidden="true"
        className="absolute left-8 right-8 top-0 h-0.5"
        style={{
          background: `linear-gradient(90deg, transparent, ${c}, transparent)`,
          opacity: 0.85,
        }}
      />

      <div className="flex items-start justify-between gap-4">
        <span className="text-outline font-display text-5xl font-bold md:text-6xl">
          {String(index + 1).padStart(2, "0")}
        </span>
        {project.badge && (
          <span
            className="rounded-full border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{
              color: c,
              borderColor: `color-mix(in srgb, ${c} 40%, transparent)`,
              background: `color-mix(in srgb, ${c} 8%, transparent)`,
            }}
          >
            {project.badge}
          </span>
        )}
      </div>

      <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight md:text-4xl">
        {project.title}
      </h3>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
        {project.desc}
      </p>

      <p
        className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em]"
        style={{ color: c }}
      >
        ▸ {project.impact}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((t) => (
          <li
            key={t}
            className="rounded-md border border-line px-2.5 py-1 font-mono text-[10.5px] tracking-[0.06em] text-ink/70"
          >
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Projects() {
  return (
    <section
      id="proyectos"
      className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40"
    >
      <SectionHead index="03" label="Proyectos" />

      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.1} className="h-full">
            <Card project={p} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
