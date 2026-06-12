"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const LINKS = [
  { href: "#perfil", label: "Perfil" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#stack", label: "Stack" },
];

export default function Nav({ started }: { started: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={started ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-line bg-bg/90 md:bg-bg/80 md:backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
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
          className="group inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-all hover:border-accent hover:text-accent"
        >
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-green-400" />
          Disponible
        </a>
      </nav>
    </motion.header>
  );
}
