"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion } from "motion/react";

const EASE_PANEL = [0.83, 0, 0.17, 1] as const;

/**
 * Secuencia de apertura: contador 0→100 con el nombre revelándose,
 * luego la pantalla se parte en dos cortinas que liberan el hero.
 * `onReveal` se dispara cuando las cortinas EMPIEZAN a abrirse, para que
 * el hero anime su entrada en paralelo.
 */
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
  };

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      revealedRef.current = true;
      setHidden(true);
      onReveal();
      return;
    }
    const controls = animate(0, 100, {
      duration: 1.7,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (counterRef.current)
          counterRef.current.textContent = String(Math.round(v)).padStart(
            3,
            "0",
          );
      },
      onComplete: startExit,
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[100] cursor-pointer"
      onClick={startExit}
      aria-hidden="true"
    >
      {/* cortinas */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-bg"
        animate={exiting ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.9, ease: EASE_PANEL }}
        onAnimationComplete={() => exiting && setHidden(true)}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-bg"
        animate={exiting ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.9, ease: EASE_PANEL }}
      />

      {/* contenido central */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6"
        animate={exiting ? { opacity: 0, scale: 0.96 } : { opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.p
          className="font-mono text-[11px] uppercase tracking-[0.5em] text-muted"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Portfolio — 2026
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            className="font-display text-[clamp(34px,6vw,72px)] font-semibold tracking-tight"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.25,
            }}
          >
            Luciano&nbsp;Flores
          </motion.h1>
        </div>

        {/* línea de progreso */}
        <div className="h-px w-[min(420px,70vw)] overflow-hidden bg-line">
          <motion.div
            className="h-full bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: 1.7, ease: [0.65, 0, 0.35, 1] }}
          />
        </div>

        <span className="font-mono text-sm text-muted">
          <span ref={counterRef} className="text-accent">
            000
          </span>
          &nbsp;/ 100
        </span>
      </motion.div>
    </div>
  );
}
