"use client";

import React, { useEffect, useRef } from "react";
import { TechLogos } from "./tech-logos";

/* ------------------------------------------------------------------ */
/*  Types + default data                                              */
/* ------------------------------------------------------------------ */

export type Tech = {
  /** Display name shown under the logo */
  name: string;
  /** Category label (Frontend / Backend / Database / Data / DevOps …) */
  category: string;
  /** Brand color — drives the glow, accent line and category text */
  color: string;
  /** Key into `TechLogos` (see tech-logos.tsx) */
  logo: string;
};

/** Curated 12-tech core stack. Swap freely or pass your own via the `items` prop. */
export const DEFAULT_STACK: Tech[] = [
  { name: "React", category: "Frontend", color: "#61DAFB", logo: "react" },
  { name: "Next.js", category: "Frontend", color: "#ededed", logo: "next" },
  { name: "TypeScript", category: "Frontend", color: "#3178C6", logo: "typescript" },
  { name: "TailwindCSS", category: "Frontend", color: "#38BDF8", logo: "tailwind" },
  { name: "Node.js", category: "Backend", color: "#3C873A", logo: "node" },
  { name: "Express", category: "Backend", color: "#9aa0a6", logo: "express" },
  { name: "MySQL", category: "Database", color: "#009bb5", logo: "mysql" },
  { name: "Supabase", category: "Database", color: "#3ECF8E", logo: "supabase" },
  { name: "Firebase", category: "Database", color: "#FFA000", logo: "firebase" },
  { name: "Python", category: "Data", color: "#FFD43B", logo: "python" },
  { name: "Git / GitHub", category: "DevOps", color: "#F05032", logo: "git" },
  { name: "Vercel", category: "DevOps", color: "#ffffff", logo: "vercel" },
];

/* ------------------------------------------------------------------ */
/*  Props                                                             */
/* ------------------------------------------------------------------ */

export type TechRingProps = {
  /** Cards to render around the ring. Defaults to `DEFAULT_STACK`. */
  items?: Tech[];
  /** Ring radius in px (bigger = wider ring / more spacing). Default 408. */
  radius?: number;
  /** View tilt in degrees. Default 19. */
  tilt?: number;
  /** Roll / axis rotation (rotateZ) in degrees — banks the ring diagonally. Default -6. */
  roll?: number;
  /** Uniform size multiplier. Default 0.45. */
  scale?: number;
  /** Rotation speed in degrees / second. Set 0 to freeze. Default 15. */
  speed?: number;
  /** Card width / height in px. Default 188 × 264. */
  cardWidth?: number;
  cardHeight?: number;
  /** Vertical nudge of the whole ring in px (keeps it visually centered). Default -58. */
  lift?: number;
  /** Optional image placed at the centre of the ring (e.g. a portrait cut-out, transparent PNG). */
  centerImage?: string;
  /** Width of the centre figure in px (local, before scale). Default 560. */
  centerWidth?: number;
  /** Vertical offset of the centre figure in px (local). Default 205. */
  centerOffset?: number;
  /** Extra classes on the outer stage. */
  className?: string;
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function TechRing({
  items = DEFAULT_STACK,
  radius = 372,
  tilt = 19,
  roll = -6,
  scale = 0.45,
  speed = 15,
  cardWidth = 166,
  cardHeight = 234,
  lift = -58,
  centerImage,
  centerWidth = 560,
  centerOffset = 205,
  className = "",
}: TechRingProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rotRef = useRef(0);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const N = items.length;
  const step = 360 / N;

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let last = performance.now();

    const update = () => {
      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const theta = rotRef.current + i * step;
        const t = (Math.cos((theta * Math.PI) / 180) + 1) / 2; // 1 = front, 0 = back
        el.style.transform = `rotateY(${theta}deg) translateZ(${radius}px)`;
        el.style.opacity = (0.6 + 0.4 * t).toFixed(3);
        el.style.filter = `brightness(${(0.62 + 0.5 * t).toFixed(3)}) blur(${((1 - t) * 1.2).toFixed(2)}px)`;
        el.style.zIndex = String(Math.round(t * 100));
        el.style.pointerEvents = t > 0.5 ? "auto" : "none"; // solo las del frente
      }
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      rotRef.current = (rotRef.current + speed * dt) % 360; // gira siempre
      update();
      raf = requestAnimationFrame(frame);
    };

    update(); // paint a full ring immediately (correct first frame / SSR hydration)
    if (!reduce && speed !== 0) raf = requestAnimationFrame(frame);

    // —— interacción: hover de sección + tarjetas ——
    const stage = stageRef.current;
    const ring = ringRef.current;
    const onEnter = () => { stage?.classList.add("awake"); };
    const onLeave = () => {
      stage?.classList.remove("awake");
      cardRefs.current.forEach((c) => c?.classList.remove("hot"));
    };
    const onOver = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest(".tr-card") as HTMLElement | null;
      if (!card) return;
      cardRefs.current.forEach((c) => c?.classList.toggle("hot", c === card));
    };
    const onOut = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest(".tr-card") as HTMLElement | null;
      if (card && !card.contains(e.relatedTarget as Node)) card.classList.remove("hot");
    };
    stage?.addEventListener("pointerenter", onEnter);
    stage?.addEventListener("pointerleave", onLeave);
    ring?.addEventListener("pointerover", onOver);
    ring?.addEventListener("pointerout", onOut);

    return () => {
      cancelAnimationFrame(raf);
      stage?.removeEventListener("pointerenter", onEnter);
      stage?.removeEventListener("pointerleave", onLeave);
      ring?.removeEventListener("pointerover", onOver);
      ring?.removeEventListener("pointerout", onOut);
    };
  }, [N, step, radius, speed]);

  return (
    <div
      data-techring
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ perspective: "1500px", perspectiveOrigin: "50% 42%" }}
    >
      {/* hover interactions (scoped) */}
      <style>{`
        [data-techring] .tr-card-inner{
          transition:transform .42s cubic-bezier(.22,1,.36,1),
                     box-shadow .42s ease, border-color .42s ease, filter .42s ease;
        }
        [data-techring] .tr-sheen{
          position:absolute;top:0;left:-120%;width:90%;height:100%;
          transform:skewX(-18deg);pointer-events:none;transition:left .7s ease;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent);
        }
        [data-techring] .tr-logo{ transition:transform .42s cubic-bezier(.22,1,.36,1); }
        [data-techring] .tr-cat{ transition:letter-spacing .42s ease; }
        [data-techring] .awake .tr-card-inner{ filter:brightness(1.04); }
        [data-techring] .tr-card.hot{ z-index:999 !important; }
        [data-techring] .tr-card.hot .tr-card-inner{
          transform:scale(1.13) translateY(-8px);
          filter:brightness(1.35) saturate(1.15);
        }
        [data-techring] .tr-card.hot .tr-sheen{ left:130%; }
        [data-techring] .tr-card.hot .tr-logo{ transform:translateY(-2px) scale(1.08); }
        [data-techring] .tr-card.hot .tr-cat{ letter-spacing:.3em; }
      `}</style>
      {/* atmospheric glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-[46%] h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(60,80,140,.16), rgba(20,30,60,.05) 38%, transparent 62%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 42%, transparent 40%, rgba(0,0,0,.55) 78%, #000 100%)",
        }}
      />

      {/* 3D stage */}
      <div ref={stageRef} className="absolute inset-0 flex items-center justify-center">
        <div
          ref={ringRef}
          className="relative h-px w-px [transform-style:preserve-3d]"
          style={{ transform: `translateY(${lift}px) scale(${scale}) rotateZ(${roll}deg) rotateX(${tilt}deg)` }}
        >
          {/* optional centre figure — stays upright by cancelling tilt + roll */}
          {centerImage && (
            <div
              className="pointer-events-none absolute left-1/2 top-1/2"
              style={{
                width: centerWidth,
                transform: `translate(-50%, calc(-50% + ${centerOffset}px)) rotateX(${-tilt}deg) rotateZ(${-roll}deg)`,
              }}
            >
              <div
                className="absolute left-1/2 top-[44%] -z-10 -translate-x-1/2 -translate-y-1/2 blur-2xl"
                style={{
                  width: "150%",
                  height: "118%",
                  background:
                    "radial-gradient(ellipse 42% 48% at 50% 50%, rgba(64,96,176,.30), transparent 70%)",
                }}
              />
              <img
                src={centerImage}
                alt=""
                className="block w-full"
                style={{
                  filter:
                    "drop-shadow(0 30px 42px rgba(0,0,0,.72)) drop-shadow(0 0 22px rgba(110,140,220,.16))",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, #000 54%, rgba(0,0,0,.45) 74%, rgba(0,0,0,.12) 86%, transparent 94%)",
                  maskImage:
                    "linear-gradient(to bottom, #000 54%, rgba(0,0,0,.45) 74%, rgba(0,0,0,.12) 86%, transparent 94%)",
                }}
              />
            </div>
          )}
          {items.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="tr-card absolute left-1/2 top-1/2 will-change-transform [backface-visibility:visible]"
              style={{
                width: cardWidth,
                height: cardHeight,
                marginLeft: -cardWidth / 2,
                marginTop: -cardHeight / 2,
              }}
            >
              <TechCard tech={tech} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card                                                              */
/* ------------------------------------------------------------------ */

function TechCard({ tech }: { tech: Tech }) {
  const c = tech.color;
  return (
    <div
      className="tr-card-inner absolute inset-0 flex flex-col items-center overflow-hidden rounded-[28px] border"
      style={{
        borderColor: "#2c2c30",
        background: `linear-gradient(180deg, color-mix(in srgb, ${c} 22%, transparent) 0%, transparent 42%), linear-gradient(180deg,#161618 0%,#111113 60%,#0c0c0e 100%)`,
        boxShadow: `0 24px 50px -18px rgba(0,0,0,.85), inset 0 1px 0 rgba(255,255,255,.06), 0 0 22px -8px color-mix(in srgb, ${c} 34%, transparent)`,
      }}
    >
      {/* top brand accent line */}
      <span
        className="absolute left-[26px] right-[26px] top-0 h-0.5"
        style={{ background: `linear-gradient(90deg,transparent,${c},transparent)`, opacity: 0.85 }}
      />
      {/* sheen barrido en hover */}
      <span className="tr-sheen" aria-hidden="true" />
      {/* logo */}
      <div
        className="tr-logo flex flex-1 items-center justify-center px-5 pb-2 pt-[34px] [&>svg]:h-[78px] [&>svg]:w-[78px]"
        style={{ filter: `drop-shadow(0 6px 16px color-mix(in srgb, ${c} 55%, transparent))` }}
      >
        {TechLogos[tech.logo]}
      </div>
      {/* meta */}
      <div className="w-full px-[18px] pb-6 text-center">
        <div className="text-[20px] font-semibold tracking-tight text-white">{tech.name}</div>
        <div
          className="tr-cat mt-[7px] font-mono text-[10.5px] font-medium uppercase tracking-[0.22em]"
          style={{ color: c, filter: "brightness(1.25)" }}
        >
          {tech.category}
        </div>
      </div>
    </div>
  );
}
