"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { href: "#perfil", label: "Perfil" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#stack", label: "Stack" },
];

export default function Nav({ started }: { started: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!barRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <header
      className={`nav-enter fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        started ? "started" : ""
      } ${
        scrolled
          ? "border-b border-line bg-bg/90 md:bg-bg/80 md:backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div
        ref={barRef}
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-accent/60"
      />
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        <a
          href="#"
          className="font-mono text-sm font-bold tracking-widest text-ink"
        >
          LF<span className="text-accent">/</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-line font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contacto"
          className="group inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-accent hover:text-accent"
        >
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-green-400" />
          Disponible
        </a>
      </nav>
    </header>
  );
}
