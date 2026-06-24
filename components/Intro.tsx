"use client";

import { useEffect, useRef, useState } from "react";

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

export default function Intro({ onReveal }: { onReveal: () => void }) {
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);
  const revealedRef = useRef(false);

  const startExit = () => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setExiting(true);
    onReveal();
    // fallback: si transitionend no dispara (navegador viejo, tab oculta,
    // CSS bloqueado), forzar la remocion del overlay tras 1.2s
    setTimeout(() => setHidden(true), 1200);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealedRef.current = true;
      setHidden(true);
      onReveal();
      return;
    }

    const duration = 1700;
    const start = performance.now();
    let raf = 0;

    const tick = () => {
      const t = Math.min((performance.now() - start) / duration, 1);
      if (counterRef.current)
        counterRef.current.textContent = String(
          Math.round(easeInOut(t) * 100),
        ).padStart(3, "0");
      if (t < 1) raf = requestAnimationFrame(tick);
      else startExit();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[100] cursor-pointer overflow-hidden"
      style={{ width: "100vw", height: "100dvh" }}
      onClick={startExit}
      aria-hidden="true"
    >
      {/* cortinas */}
      <div
        className={`intro-curtain absolute inset-x-0 top-0 h-1/2 bg-bg ${exiting ? "exiting-top" : ""}`}
        onTransitionEnd={() => exiting && setHidden(true)}
      />
      <div
        className={`intro-curtain absolute inset-x-0 bottom-0 h-1/2 bg-bg ${exiting ? "exiting-bottom" : ""}`}
      />

      {/* contenido central */}
      <div
        className={`intro-content absolute inset-0 flex flex-col items-center justify-center gap-6 ${exiting ? "exiting" : ""}`}
      >
        <p className="intro-subtitle font-mono text-[11px] uppercase tracking-[0.5em] text-muted">
          Portfolio — 2026
        </p>

        <div className="overflow-hidden">
          <h1 className="intro-title font-display text-[clamp(34px,6vw,72px)] font-semibold tracking-tight">
            Luciano&nbsp;Flores
          </h1>
        </div>

        {/* linea de progreso */}
        <div className="h-px w-[min(420px,70vw)] overflow-hidden bg-line">
          <div className="intro-bar h-full bg-accent" />
        </div>

        <span className="font-mono text-sm text-muted">
          <span ref={counterRef} className="text-accent">
            000
          </span>
          &nbsp;/ 100
        </span>
      </div>
    </div>
  );
}
