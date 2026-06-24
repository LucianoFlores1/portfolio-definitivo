"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Variant = "fade-up" | "fade-left" | "fade-right" | "scale" | "clip-up";

const FROM: Record<Variant, gsap.TweenVars> = {
  "fade-up": { opacity: 0, y: 40 },
  "fade-left": { opacity: 0, x: -60 },
  "fade-right": { opacity: 0, x: 60 },
  scale: { opacity: 0, scale: 0.88 },
  "clip-up": { opacity: 0, y: 60, clipPath: "inset(20% 0% 0% 0%)" },
};

const TO: Record<Variant, gsap.TweenVars> = {
  "fade-up": { opacity: 1, y: 0 },
  "fade-left": { opacity: 1, x: 0 },
  "fade-right": { opacity: 1, x: 0 },
  scale: { opacity: 1, scale: 1 },
  "clip-up": { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
};

export default function Reveal({
  children,
  delay = 0,
  variant = "fade-up",
  duration = 0.9,
  scrub = false,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  variant?: Variant;
  duration?: number;
  scrub?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1, clipPath: "none" });
      return;
    }

    gsap.set(el, FROM[variant]);

    const ctx = gsap.context(() => {
      if (scrub) {
        gsap.to(el, {
          ...TO[variant],
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            end: "top 45%",
            scrub: 1,
          },
        });
      } else {
        gsap.to(el, {
          ...TO[variant],
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    return () => ctx.revert();
  }, [delay, variant, duration, scrub]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
