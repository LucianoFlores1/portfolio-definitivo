"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "@/hooks/useInView";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const easeOut = (t: number) => 1 - (1 - t) ** 3;

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const t = Math.min((performance.now() - start) / duration, 1);
      if (ref.current) ref.current.textContent = String(Math.round(easeOut(t) * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
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
  const headlineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = el.innerText.split(" ");
    el.innerHTML = words
      .map((w) => `<span class="about-word">${w}</span>`)
      .join(" ");

    const spans = el.querySelectorAll(".about-word");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 55%",
            scrub: 1,
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="perfil" className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHead index="02" label="Perfil" />

      <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
        <div>
          <p
            ref={headlineRef}
            className="font-display text-[clamp(26px,3.4vw,46px)] font-medium leading-[1.18] tracking-tight"
          >
            Construyo aplicaciones web end-to-end — de la API REST a la interfaz — conectando frontend y backend de forma limpia, eficiente y orientada al negocio.
          </p>
        </div>

        <Reveal variant="fade-left" delay={0.1}>
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

      <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} className="bg-panel p-7 md:p-9">
            <Reveal delay={i * 0.08} variant="scale">
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
