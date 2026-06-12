"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>0</span>;
}

const STATS = [
  { value: 3, prefix: "+", suffix: "", label: "Años de experiencia" },
  { value: 40, prefix: "−", suffix: "%", label: "Tiempos operativos (cliente público)" },
  { value: 2, prefix: "", suffix: "°", label: "Lugar — Hackathon El Milagro 2025" },
  { value: 6, prefix: "", suffix: "", label: "Proyectos destacados en producción" },
];

const FACTS: [string, string][] = [
  ["Ubicación", "Salta, Argentina"],
  ["Modalidad", "Remoto / Presencial"],
  ["Disponibilidad", "Inmediata"],
  ["Idiomas", "Español (nativo) · Inglés (B1)"],
];

export default function About() {
  return (
    <section id="perfil" className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHead index="01" label="Perfil" />

      <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
        <Reveal>
          <p className="font-display text-[clamp(26px,3.4vw,46px)] font-medium leading-[1.18] tracking-tight">
            Construyo aplicaciones web{" "}
            <span className="text-accent">end-to-end</span> — de la API REST a
            la interfaz — conectando frontend y backend de forma limpia,
            eficiente y <span className="text-hot">orientada al negocio</span>.
          </p>
          <p className="mt-8 max-w-2xl leading-relaxed text-muted">
            Trabajo con React, Next.js, Node.js, TypeScript y Python en
            proyectos freelance e institucionales: desde microservicios y
            automatización de procesos hasta PWAs con soporte offline, análisis
            de datos y despliegues serverless. Me especializo en entregar
            productos reales que funcionan en producción.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <dl className="divide-y divide-line border-y border-line">
            {FACTS.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                  {k}
                </dt>
                <dd className="text-right text-sm text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* métricas */}
      <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} className="bg-panel p-7 md:p-9">
            <Reveal delay={i * 0.08}>
              <div className="font-display text-5xl font-semibold text-ink md:text-6xl">
                <span className="text-hot">{s.prefix}</span>
                <Counter to={s.value} />
                <span className="text-hot">{s.suffix}</span>
              </div>
              <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
                {s.label}
              </p>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
