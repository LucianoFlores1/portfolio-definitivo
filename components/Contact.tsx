import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const CHANNELS: { label: string; value: string; href: string }[] = [
  {
    label: "Email",
    value: "lucianorafaelflores@gmail.com",
    href: "mailto:lucianorafaelflores@gmail.com",
  },
  {
    label: "Teléfono",
    value: "+54 9 3874 871320",
    href: "tel:+5493874871320",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/lucrf",
    href: "https://www.linkedin.com/in/lucrf",
  },
];

export default function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden">
      {/* glow de cierre, mismo lenguaje que el hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[68%] h-[800px] w-[1100px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(60,80,140,.18), rgba(20,30,60,.05) 42%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-28 md:px-10 md:pt-40">
        <SectionHead index="06" label="Contacto" />

        <Reveal>
          <h2 className="font-display text-[clamp(56px,10vw,150px)] font-bold leading-[0.95] tracking-[-0.03em]">
            ¿Construimos
            <br />
            <span className="text-outline">algo juntos?</span>
          </h2>
          <p className="mt-8 max-w-xl leading-relaxed text-muted">
            Busco equipos donde pueda aportar desde el día uno: producto real,
            código limpio y mejora continua. Disponibilidad inmediata, remoto o
            presencial en Salta.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="mt-16 divide-y divide-line border-y border-line">
            {CHANNELS.map((ch) => (
              <li key={ch.label}>
                <a
                  href={ch.href}
                  target={ch.href.startsWith("http") ? "_blank" : undefined}
                  rel={ch.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex flex-col gap-1 py-6 transition-colors sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted transition-colors group-hover:text-accent">
                    {ch.label}
                  </span>
                  <span className="font-display text-xl font-medium tracking-tight text-ink transition-all group-hover:translate-x-[-6px] group-hover:text-accent md:text-3xl">
                    {ch.value}
                    <span className="ml-3 inline-block opacity-0 transition-opacity group-hover:opacity-100">
                      ↗
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <footer className="mt-20 flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
            © 2026 Luciano Rafael Flores
          </p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
            Salta, Argentina — 24°47′ S · 65°25′ O
          </p>
        </footer>
      </div>
    </section>
  );
}
