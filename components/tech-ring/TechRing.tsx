"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { TechLogos } from "./tech-logos";

export type Tech = {
  name: string;
  category: string;
  color: string;
  logo: string;
  project?: string;
};

export const DEFAULT_STACK: Tech[] = [
  { name: "React", category: "Frontend", color: "#61DAFB", logo: "react", project: "miamigofiel" },
  { name: "Next.js", category: "Frontend", color: "#ededed", logo: "next", project: "eziptv" },
  { name: "TypeScript", category: "Frontend", color: "#3178C6", logo: "typescript", project: "portal-empleos" },
  { name: "TailwindCSS", category: "Frontend", color: "#38BDF8", logo: "tailwind", project: "eziptv" },
  { name: "Node.js", category: "Backend", color: "#3C873A", logo: "node", project: "inventario-pymes" },
  { name: "Express", category: "Backend", color: "#9aa0a6", logo: "express", project: "portal-empleos" },
  { name: "MySQL", category: "Database", color: "#009bb5", logo: "mysql", project: "inventario-pymes" },
  { name: "Supabase", category: "Database", color: "#3ECF8E", logo: "supabase", project: "miamigofiel" },
  { name: "Firebase", category: "Database", color: "#FFA000", logo: "firebase", project: "portal-empleos" },
  { name: "Python", category: "Data", color: "#FFD43B", logo: "python", project: "drive-scraper" },
  { name: "Git / GitHub", category: "DevOps", color: "#F05032", logo: "git", project: "miamigofiel" },
  { name: "Vercel", category: "DevOps", color: "#ffffff", logo: "vercel", project: "portal-empleos" },
];

export type TechRingProps = {
  items?: Tech[];
  radius?: number;
  tilt?: number;
  roll?: number;
  scale?: number;
  speed?: number;
  cardWidth?: number;
  cardHeight?: number;
  lift?: number;
  centerImage?: string;
  centerWidth?: number;
  centerOffset?: number;
  className?: string;
};

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
  const rootRef = useRef<HTMLDivElement | null>(null);
  const spinnerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const N = items.length;
  const step = 360 / N;

  useEffect(() => {
    const spinner = spinnerRef.current;
    const root = rootRef.current;
    if (!spinner || !root) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const spinning = !reduce && speed !== 0;

    const rot = { y: 0 };
    let isDragging = false;
    let dragTotal = 0;
    let velocity = 0;
    let lastX = 0;
    let lastTime = 0;
    let downTarget: HTMLElement | null = null;
    let autoTween: gsap.core.Tween | null = null;
    let momentumTween: gsap.core.Tween | null = null;

    const updateRing = () => {
      spinner.style.transform = `rotateY(${rot.y}deg)`;
      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const theta = rot.y + i * step;
        const t = (Math.cos((theta * Math.PI) / 180) + 1) / 2;
        el.style.opacity = (0.35 + 0.65 * t).toFixed(3);
        el.style.zIndex = String(Math.round(t * 100));
        el.style.pointerEvents = t > 0.5 ? "auto" : "none";
      }
    };

    const startAuto = () => {
      if (!spinning) return;
      autoTween = gsap.to(rot, {
        y: `+=${speed > 0 ? 360 : -360}`,
        duration: 360 / Math.abs(speed),
        ease: "none",
        repeat: -1,
        onUpdate: updateRing,
      });
    };

    updateRing();
    startAuto();

    // pause off-screen
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) autoTween?.resume();
      else autoTween?.pause();
    });
    io.observe(root);

    // --- drag / swipe interaction ---
    const onDown = (e: PointerEvent) => {
      isDragging = true;
      dragTotal = 0;
      lastX = e.clientX;
      lastTime = Date.now();
      velocity = 0;
      downTarget = e.target as HTMLElement;
      autoTween?.pause();
      momentumTween?.kill();
      root.style.cursor = "grabbing";
    };

    const onMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const now = Date.now();
      const dx = e.clientX - lastX;
      const dt = Math.max(now - lastTime, 1);
      velocity = dx / dt;
      dragTotal += Math.abs(dx);
      lastX = e.clientX;
      lastTime = now;
      rot.y += dx * 0.4;
      updateRing();
    };

    const onUp = () => {
      if (!isDragging) return;
      isDragging = false;
      root.style.cursor = "grab";

      // click (not drag) → flip card then navigate to project
      if (dragTotal < 5 && downTarget) {
        const card = downTarget.closest(".tr-card");
        if (card) {
          const idx = cardRefs.current.indexOf(card as HTMLDivElement);
          if (idx >= 0 && items[idx]?.project) {
            const inner = card.querySelector(".tr-card-inner") as HTMLElement;
            const tech = items[idx];
            const scrollToProject = () => {
              if (inner) gsap.set(inner, { rotateY: 0 });
              const target = document.getElementById(
                `proyecto-${tech.project}`,
              );
              if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "center" });
                gsap.fromTo(
                  target,
                  {
                    boxShadow: `0 0 0 2px ${tech.color}, 0 0 28px ${tech.color}44`,
                  },
                  {
                    boxShadow:
                      "0 0 0 0px transparent, 0 0 0px transparent",
                    duration: 2,
                    ease: "power2.out",
                    delay: 0.5,
                  },
                );
              }
              startAuto();
            };

            if (inner) {
              gsap.to(inner, {
                rotateY: 360,
                duration: 0.55,
                ease: "power2.inOut",
                onComplete: scrollToProject,
              });
            } else {
              scrollToProject();
            }
            downTarget = null;
            return;
          }
        }
        startAuto();
        downTarget = null;
        return;
      }
      downTarget = null;

      // momentum
      const dist = velocity * 180;
      if (Math.abs(dist) > 2) {
        momentumTween = gsap.to(rot, {
          y: `+=${dist}`,
          duration: Math.min(Math.abs(velocity) * 1.5, 1.5),
          ease: "power3.out",
          onUpdate: updateRing,
          onComplete: () => {
            rot.y = ((rot.y % 360) + 360) % 360;
            autoTween?.kill();
            startAuto();
          },
        });
      } else {
        autoTween?.kill();
        startAuto();
      }
    };

    root.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    // hover effects
    const stage = stageRef.current;
    const onLeave = () => {
      cardRefs.current.forEach((c) => c?.classList.remove("hot"));
    };
    const onOver = (e: PointerEvent) => {
      if (isDragging) return;
      const card = (e.target as HTMLElement).closest(
        ".tr-card",
      ) as HTMLElement | null;
      if (!card) return;
      cardRefs.current.forEach((c) => c?.classList.toggle("hot", c === card));
    };
    const onOut = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest(
        ".tr-card",
      ) as HTMLElement | null;
      if (card && !card.contains(e.relatedTarget as Node))
        card.classList.remove("hot");
    };
    stage?.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerover", onOver);
    root.addEventListener("pointerout", onOut);

    return () => {
      autoTween?.kill();
      momentumTween?.kill();
      io.disconnect();
      root.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      stage?.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerout", onOut);
    };
  }, [N, step, speed, radius, items]);

  return (
    <div
      ref={rootRef}
      data-techring
      className={`relative h-full w-full select-none overflow-hidden ${className}`}
      style={{
        perspective: "1500px",
        perspectiveOrigin: "50% 42%",
        touchAction: "pan-y",
        cursor: "grab",
      }}
    >
      <style>{`
        [data-techring] .tr-card{ transition:opacity .3s linear; cursor:pointer; }
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
        [data-techring] .tr-card.hot{ z-index:999 !important; }
        [data-techring] .tr-card.hot .tr-card-inner{
          transform:scale(1.13) translateY(-8px);
          filter:brightness(1.35) saturate(1.15);
        }
        [data-techring] .tr-card.hot .tr-sheen{ left:130%; }
        [data-techring] .tr-card.hot .tr-logo{ transform:translateY(-2px) scale(1.08); }
        [data-techring] .tr-card.hot .tr-cat{ letter-spacing:.3em; }
        @media (prefers-reduced-motion:reduce){
          [data-techring] .tr-card{ transition:none; }
        }
      `}</style>

      {/* atmospheric glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-[46%] h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full"
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
      <div
        ref={stageRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="relative h-px w-px [transform-style:preserve-3d]"
          style={{
            transform: `translateY(${lift}px) scale(${scale}) rotateZ(${roll}deg) rotateX(${tilt}deg)`,
          }}
        >
          {centerImage && (
            <div
              className="pointer-events-none absolute left-1/2 top-1/2"
              style={{
                width: centerWidth,
                transform: `translate(-50%, calc(-50% + ${centerOffset}px)) rotateX(${-tilt}deg) rotateZ(${-roll}deg)`,
              }}
            >
              <div
                className="absolute left-1/2 top-[44%] -z-10 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: "170%",
                  height: "130%",
                  background:
                    "radial-gradient(ellipse 48% 54% at 50% 50%, rgba(64,96,176,.18), rgba(64,96,176,.06) 55%, transparent 80%)",
                }}
              />
              <img
                src={centerImage}
                alt=""
                fetchPriority="high"
                decoding="async"
                className="block w-full"
                style={{
                  filter:
                    "drop-shadow(0 30px 42px rgba(0,0,0,.72)) drop-shadow(0 0 30px rgba(110,140,220,.10))",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, #000 46%, rgba(0,0,0,.6) 62%, rgba(0,0,0,.28) 76%, rgba(0,0,0,.08) 88%, transparent 96%)",
                  maskImage:
                    "linear-gradient(to bottom, #000 46%, rgba(0,0,0,.6) 62%, rgba(0,0,0,.28) 76%, rgba(0,0,0,.08) 88%, transparent 96%)",
                }}
              />
            </div>
          )}

          {/* GSAP controls rotateY on this wrapper */}
          <div
            ref={spinnerRef}
            className="absolute left-0 top-0 h-px w-px [transform-style:preserve-3d]"
          >
            {items.map((tech, i) => {
              const t0 = (Math.cos((i * step * Math.PI) / 180) + 1) / 2;
              return (
                <div
                  key={`${tech.name}-${i}`}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="tr-card absolute left-1/2 top-1/2 [backface-visibility:visible]"
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    marginLeft: -cardWidth / 2,
                    marginTop: -cardHeight / 2,
                    transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
                    opacity: 0.35 + 0.65 * t0,
                    zIndex: Math.round(t0 * 100),
                    pointerEvents: t0 > 0.5 ? "auto" : "none",
                  }}
                >
                  <TechCard tech={tech} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <span
        className="absolute left-[26px] right-[26px] top-0 h-0.5"
        style={{
          background: `linear-gradient(90deg,transparent,${c},transparent)`,
          opacity: 0.85,
        }}
      />
      <span className="tr-sheen" aria-hidden="true" />
      <div
        className="tr-logo flex flex-1 items-center justify-center px-5 pb-2 pt-[34px] [&>svg]:h-[78px] [&>svg]:w-[78px]"
        style={{
          filter: `drop-shadow(0 6px 16px color-mix(in srgb, ${c} 55%, transparent))`,
        }}
      >
        {TechLogos[tech.logo]}
      </div>
      <div className="w-full px-[18px] pb-6 text-center">
        <div className="text-[20px] font-semibold tracking-tight text-white">
          {tech.name}
        </div>
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
