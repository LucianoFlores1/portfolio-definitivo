import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const EDUCATION: [string, string, string][] = [
  ["UPATecO", "Tecnicatura Universitaria en Desarrollo de Software", "2022 — 2024"],
  ["Coderhouse", "Programa de Analista de Datos", "2023 — 2024"],
  ["Coderhouse", "Procesamiento de Datos en Excel", "2023"],
  ["Fundación Forge", "Programa Tu Futuro", "2023 — 2024"],
  ["Universidad Nacional de Salta", "Cursado universitario", "2022"],
];

const CERTS: [string, string, string][] = [
  ["Cybersecurity Foundations", "Google", "2025"],
  ["Generative AI", "Microsoft & Eidos", "2025"],
  ["QA Manual & Agile Testing", "Fundación Coca-Cola", "2024"],
  ["Testing QA Automatizado con Playwright", "—", "2024"],
  ["Automatización con n8n", "—", "2023"],
];

export default function Education() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHead index="05" label="Formación & Certificaciones" />

      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h3 className="mb-8 font-display text-2xl font-semibold tracking-tight">
            Educación
          </h3>
          <ul className="divide-y divide-line border-y border-line">
            {EDUCATION.map(([org, program, period]) => (
              <li key={`${org}-${program}`} className="grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:gap-6">
                <div>
                  <p className="text-sm font-medium text-ink">{program}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    {org}
                  </p>
                </div>
                <p className="font-mono text-xs text-muted sm:pt-1">{period}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.12}>
          <h3 className="mb-8 font-display text-2xl font-semibold tracking-tight">
            Certificaciones
          </h3>
          <ul className="flex flex-wrap gap-3">
            {CERTS.map(([name, issuer, year]) => (
              <li
                key={name}
                className="group rounded-xl border border-line bg-panel px-4 py-3 transition-colors hover:border-accent/50"
              >
                <p className="text-sm text-ink">{name}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {issuer !== "—" ? `${issuer} · ` : ""}
                  <span className="text-hot">{year}</span>
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
