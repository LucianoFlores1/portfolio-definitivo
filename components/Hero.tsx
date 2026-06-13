"use client";

import { useEffect, useState } from "react";
import TechRing from "./tech-ring/TechRing";

export default function Hero({ started }: { started: boolean }) {
  const [ringScale, setRingScale] = useState(0.73);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setRingScale(w < 640 ? 0.48 : w < 1024 ? 0.62 : 0.73);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section className={`relative h-screen h-[100svh] overflow-hidden ${started ? "started" : ""}`}>
      {/* nombre gigante — capa trasera */}
      <div className="absolute inset-x-0 top-[13%] z-0 select-none text-center md:top-[11%]">
        <div className="overflow-hidden">
          <div className="hero-slide hero-slide-1 font-display text-[clamp(64px,13vw,185px)] font-bold leading-[0.92] tracking-[-0.03em]">
            LUCIANO
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="hero-slide hero-slide-2 text-outline font-display text-[clamp(64px,13vw,185px)] font-bold leading-[0.92] tracking-[-0.03em]">
            FLORES
          </div>
        </div>
      </div>

      {/* anillo 3D — capa media */}
      <div className="hero-ring absolute inset-0 z-10">
        <TechRing
          tilt={20}
          roll={-6}
          radius={408}
          scale={ringScale}
          centerImage="/center-figure.webp"
        />
      </div>

      {/* overlay de informacion — capa frontal */}
      <div className="hero-overlay pointer-events-none absolute inset-0 z-20">
        {/* texto vertical lateral */}
        <p className="absolute left-6 top-1/2 hidden -translate-y-1/2 rotate-180 font-mono text-[10px] uppercase tracking-[0.4em] text-muted [writing-mode:vertical-rl] lg:block">
          Full Stack Developer — Salta, Argentina
        </p>
        <p className="absolute right-6 top-1/2 hidden -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-muted [writing-mode:vertical-rl] lg:block">
          React · Node.js · TypeScript · Python
        </p>

        {/* franja inferior */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 px-6 pb-8 md:flex-row md:items-end md:justify-between md:px-10">
          <div className="max-w-sm">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
              Full Stack Developer
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              3+ años construyendo aplicaciones web escalables end-to-end —
              de la API al pixel. Remoto desde Salta, Argentina.
            </p>
          </div>

          {/* indicador de scroll */}
          <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted">
              Scroll
            </span>
            <span className="relative block h-9 w-px overflow-hidden bg-line">
              <span className="scroll-hint-bar absolute left-0 top-0 h-4 w-px bg-accent" />
            </span>
          </div>

          <div className="pointer-events-auto flex items-center gap-4">
            <a
              href="#proyectos"
              className="rounded-full bg-accent px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-bg transition-transform hover:scale-105"
            >
              Ver proyectos
            </a>
            <a
              href="#contacto"
              className="rounded-full border border-line px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Contactar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
