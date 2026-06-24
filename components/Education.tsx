import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const EDUCATION: { org: string; program: string; period: string }[] = [
  { org: "UPATecO", program: "Tecnicatura en Desarrollo de Software", period: "2022 — 2024" },
  { org: "Coderhouse", program: "Analista de Datos", period: "2023 — 2024" },
  { org: "Fundación Forge", program: "Programa Tu Futuro", period: "2023 — 2024" },
  { org: "UNSa", program: "Cursado universitario", period: "2022" },
];

const CERTS: { name: string; issuer: string; year: string }[] = [
  { name: "Cybersecurity Foundations", issuer: "Google", year: "2025" },
  { name: "Generative AI", issuer: "Microsoft & Eidos", year: "2025" },
  { name: "QA Manual & Agile Testing", issuer: "Fundación Coca-Cola", year: "2024" },
  { name: "Testing QA con Playwright", issuer: "", year: "2024" },
  { name: "Automatización con n8n", issuer: "", year: "2023" },
  { name: "Procesamiento en Excel", issuer: "Coderhouse", year: "2023" },
];

export default function Education() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <SectionHead index="05" label="Formación" />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal variant="fade-right">
          <div className="space-y-3">
            {EDUCATION.map((e) => (
              <div
                key={e.program}
                className="flex items-baseline justify-between gap-4 rounded-lg border border-line bg-panel px-5 py-4 transition-colors hover:border-accent/30"
              >
                <div>
                  <p className="text-sm font-medium text-ink">{e.program}</p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {e.org}
                  </p>
                </div>
                <p className="shrink-0 font-mono text-[11px] text-muted">{e.period}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal variant="fade-left" delay={0.1}>
          <h3 className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-hot">
            Certificaciones
          </h3>
          <div className="flex flex-wrap gap-2">
            {CERTS.map((c) => (
              <span
                key={c.name}
                className="rounded-lg border border-line bg-panel px-3 py-2 text-[13px] text-ink/80 transition-colors hover:border-accent/40 hover:text-ink"
              >
                {c.name}
                {c.issuer && (
                  <span className="ml-1.5 text-[10px] text-muted">· {c.issuer}</span>
                )}
                <span className="ml-1.5 font-mono text-[10px] text-hot">{c.year}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
