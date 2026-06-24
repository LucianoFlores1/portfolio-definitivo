"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHead from "./SectionHead";
import StackBucket from "./StackBucket";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  name: string;
  short: string;
  accent: string;
  tag: string;
  subtitle: string;
  impact: string;
  description: string;
  stack: string[];
  demo: string | null;
  github: string | null;
};

const PROJECTS: Project[] = [
  {
    id: "miamigofiel",
    name: "miAmigoFiel",
    short: "mAF",
    accent: "#ff9d3c",
    tag: "Hackathon · Web App",
    subtitle: "2° Lugar — Hackathon El Milagro 2025",
    impact: "Premio regional",
    description:
      "Plataforma colaborativa para reportar y encontrar mascotas perdidas con geolocalización y notificaciones en tiempo real.",
    stack: ["Next.js", "React", "Supabase", "PostgreSQL", "Geolocalización"],
    demo: null,
    github: null,
  },
  {
    id: "eziptv",
    name: "EzIPTV",
    short: "EZ",
    accent: "#a06bff",
    tag: "Open Source · PWA",
    subtitle: "Reproductor IPTV Web",
    impact: "Open source",
    description:
      "PWA instalable para reproducción IPTV con streaming adaptativo HLS, almacenamiento offline y cifrado de credenciales con Web Crypto.",
    stack: [
      "Next.js",
      "React",
      "HLS.js",
      "Dexie.js",
      "Web Crypto",
      "TanStack Query",
      "PWA",
    ],
    demo: null,
    github: null,
  },
  {
    id: "portal-empleos",
    name: "Portal de Empleos Salta",
    short: "PES",
    accent: "#3ba7ff",
    tag: "Producción · Full-Stack",
    subtitle: "Plataforma de empleo provincial",
    impact: "En producción",
    description:
      "Gestión de ofertas de empleo con panel admin seguro, SEO 'AI-First' y despliegue serverless en Vercel.",
    stack: ["React", "TypeScript", "Vite", "Tailwind", "Express", "Firebase", "Vercel"],
    demo: null,
    github: null,
  },
  {
    id: "gestion-municipal",
    name: "Gestión Municipal",
    short: "GM",
    accent: "#37d39b",
    tag: "Automatización · No-code",
    subtitle: "Automatización de procesos municipales",
    impact: "−40% tiempos manuales",
    description:
      "Dashboards internos y automatización de flujos administrativos para el sector público.",
    stack: ["n8n", "Dashboards", "Automatización"],
    demo: null,
    github: null,
  },
  {
    id: "drive-scraper",
    name: "Drive Scraper + Playwright",
    short: "DS",
    accent: "#ff6b6b",
    tag: "Script · Productividad",
    subtitle: "Scraper de Drive + comparador JSON",
    impact: "Auditoría de datos",
    description:
      "Script en Python para scraping de carpetas de Google Drive y comparación estructural de archivos JSON.",
    stack: ["Python", "Playwright", "Google Drive API", "JSON"],
    demo: null,
    github: null,
  },
  {
    id: "inventario-pymes",
    name: "Inventario PyMEs",
    short: "INV",
    accent: "#2dd4d4",
    tag: "Web App · REST",
    subtitle: "Inventario y gestión para PyMEs",
    impact: "Orientado al negocio",
    description:
      "Sistema web para gestión de inventario y técnicos en PyMEs, con API REST y frontend modular.",
    stack: ["React", "Node.js", "Express", "API REST"],
    demo: null,
    github: null,
  },
];

/* ── Icon system ─────────────────────────────────────────── */

const ICONS: Record<
  string,
  { slug?: string; fb?: string; local?: string; color: string; cat: string }
> = {
  "Next.js": { slug: "nextdotjs", color: "ffffff", cat: "Framework" },
  React: { slug: "react", color: "61DAFB", cat: "Librería UI" },
  Supabase: { slug: "supabase", color: "3FCF8E", cat: "Backend" },
  PostgreSQL: { slug: "postgresql", color: "4169E1", cat: "Base de datos" },
  TypeScript: { slug: "typescript", color: "3178C6", cat: "Lenguaje" },
  Vite: { slug: "vite", color: "646CFF", cat: "Build tool" },
  Tailwind: { slug: "tailwindcss", color: "06B6D4", cat: "Estilos" },
  Express: { slug: "express", color: "ffffff", cat: "Servidor" },
  Firebase: { slug: "firebase", color: "FFCA28", cat: "Backend" },
  Vercel: { slug: "vercel", color: "ffffff", cat: "Deploy" },
  n8n: { slug: "n8n", color: "EA4B71", cat: "Automatización" },
  Python: { slug: "python", color: "FFD43B", cat: "Lenguaje" },
  Playwright: { local: "/playwright-logo.webp", color: "2EAD33", cat: "Testing" },
  "Google Drive API": { slug: "googledrive", color: "4285F4", cat: "API" },
  JSON: { slug: "json", color: "EFEFEF", cat: "Datos" },
  "Node.js": { slug: "nodedotjs", color: "5FA04E", cat: "Runtime" },
  "TanStack Query": { slug: "reactquery", color: "FF4154", cat: "Data fetching" },
  "HLS.js": { fb: "video", color: "FF7847", cat: "Streaming" },
  "Dexie.js": { fb: "database", color: "F59E0B", cat: "Offline DB" },
  "Web Crypto": { fb: "lock", color: "34D399", cat: "Seguridad" },
  "Service Workers": { fb: "sync", color: "60A5FA", cat: "Offline" },
  Geolocalización: { fb: "pin", color: "FF6B6B", cat: "Ubicación" },
  Dashboards: { fb: "chart", color: "38BDF8", cat: "Analítica" },
  Automatización: { fb: "bolt", color: "FBBF24", cat: "Flujos" },
  PWA: { fb: "install", color: "9B6BFF", cat: "Plataforma" },
  "API REST": { fb: "api", color: "A78BFA", cat: "API" },
};

const FB: Record<string, string> = {
  video:
    '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3z"/>',
  database:
    '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15.5" r="1.4"/>',
  sync: '<path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M3 21v-5h5"/>',
  pin: '<path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  chart:
    '<path d="M4 20V11"/><path d="M10 20V4"/><path d="M16 20v-6"/><path d="M22 20H2"/>',
  bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>',
  api: '<path d="M7 8 3 12l4 4"/><path d="M17 8l4 4-4 4"/><path d="M14 4l-4 16"/>',
  install:
    '<path d="M12 3v11"/><path d="m7 9 5 5 5-5"/><path d="M4 21h16"/>',
  playwright:
    '<path d="M8 3l8 9-8 9"/><path d="M4 7l4 5-4 5"/>',
};

function fbUrl(type: string, color: string) {
  const d =
    FB[type] || '<circle cx="12" cy="12" r="8"/>';
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#${color}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`)}`;
}

function iconFor(tech: string) {
  let e = ICONS[tech];
  if (!e) e = ICONS[tech.replace(/\s*v?\d.*$/i, "").trim()];
  if (!e) return { src: fbUrl("api", "9aa0ad"), color: "#9aa0ad", cat: "Tecnología" };
  if (e.local) return { src: e.local, color: `#${e.color}`, cat: e.cat };
  if (e.fb) return { src: fbUrl(e.fb, e.color), color: `#${e.color}`, cat: e.cat };
  return {
    src: `https://cdn.simpleicons.org/${e.slug}/${e.color}`,
    color: `#${e.color}`,
    cat: e.cat,
  };
}

function hex2rgba(hex: string, a: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

/* ── Component ───────────────────────────────────────────── */

const CARD = 200;
const CARD_GAP = 14;
const STEP = CARD + CARD_GAP;
const SCALE = 1.15;
const SCALED_W = Math.round(CARD * SCALE);
const SCALE_OFFSET = Math.round(CARD * (SCALE - 1) / 2);

export default function ProjectsPS4() {
  const [sel, setSel] = useState(0);
  const [switching, setSwitching] = useState(false);
  const [fold, setFold] = useState(0);
  const acRef = useRef<AudioContext | null>(null);
  const swRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const touchX = useRef(0);
  const wheelCooldown = useRef(false);
  const scrollIdxRef = useRef(0);
  const pickRef = useRef<(i: number) => void>(() => {});
  const stRef = useRef<ScrollTrigger | null>(null);
  const scrollingToRef = useRef(false);

  const cur = PROJECTS[sel];

  const ensureAC = useCallback(() => {
    if (!acRef.current) try { acRef.current = new AudioContext(); } catch { /* no audio */ }
    if (acRef.current?.state === "suspended") acRef.current.resume();
  }, []);

  const blip = useCallback(
    (freq: number, dur: number, type: OscillatorType, gain: number) => {
      ensureAC();
      const ac = acRef.current;
      if (!ac) return;
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = type;
      o.frequency.value = freq;
      const now = ac.currentTime;
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(gain, now + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      o.connect(g);
      g.connect(ac.destination);
      o.start(now);
      o.stop(now + dur + 0.03);
    },
    [ensureAC],
  );

  const playNav = useCallback(() => blip(760, 0.1, "sine", 0.045), [blip]);
  const playSelect = useCallback(() => {
    blip(440, 0.16, "triangle", 0.06);
    setTimeout(() => blip(660, 0.12, "sine", 0.035), 45);
  }, [blip]);

  const onBallCollision = useCallback(
    (speed: number) => {
      const t = Math.min(speed / 12, 1);
      const freq = 320 + t * 480;
      const gain = 0.008 + t * 0.025;
      const dur = 0.04 + t * 0.06;
      blip(freq, dur, "sine", gain);
    },
    [blip],
  );

  const pick = useCallback(
    (i: number) => {
      if (i === sel) {
        playSelect();
        return;
      }
      scrollIdxRef.current = i;
      ensureAC();
      playNav();
      setSwitching(true);
      if (swRef.current) clearTimeout(swRef.current);
      swRef.current = setTimeout(() => {
        setSel(i);
        setSwitching(false);
      }, 200);
    },
    [sel, playNav, playSelect, ensureAC],
  );

  const move = useCallback(
    (d: number) => pick((sel + d + PROJECTS.length) % PROJECTS.length),
    [sel, pick],
  );

  useEffect(() => {
    const onSelectProject = (e: Event) => {
      const id = (e as CustomEvent).detail;
      const idx = PROJECTS.findIndex((p) => p.id === id);
      if (idx >= 0) pick(idx);
    };
    window.addEventListener("select-project", onSelectProject);
    return () => window.removeEventListener("select-project", onSelectProject);
  }, [pick]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        move(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        move(-1);
      } else if (e.key === "Enter") {
        const p = PROJECTS[sel];
        const url = p.demo || p.github;
        if (url) window.open(url, "_blank", "noopener");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move, sel]);

  pickRef.current = pick;

  const scrollToProject = useCallback((i: number) => {
    const st = stRef.current;
    if (!st || window.innerWidth < 768) return;
    scrollingToRef.current = true;
    const progress = i / (PROJECTS.length - 1);
    const target = st.start + progress * (st.end - st.start);
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.2,
        onComplete: () => { scrollingToRef.current = false; },
      });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
      setTimeout(() => { scrollingToRef.current = false; }, 700);
    }
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const isMobile = "ontouchstart" in window || window.innerWidth < 768;
    if (isMobile || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFold(2);
      return;
    }
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () => {
          setFold(1);
          setTimeout(() => setFold(2), 1200);
        },
      });
      const info = el.querySelector(".ps4-info");
      if (info) {
        gsap.from(info, {
          y: 25,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 68%", once: true },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "280px 64px",
        end: `+=${(PROJECTS.length - 1) * window.innerHeight * 0.32}`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          if (scrollingToRef.current) return;
          const i = Math.round(self.progress * (PROJECTS.length - 1));
          if (i !== scrollIdxRef.current) {
            scrollIdxRef.current = i;
            pickRef.current(i);
          }
        },
      });
      stRef.current = st;
    });
    return () => { ctx.revert(); stRef.current = null; };
  }, []);

  const openUrl = (url: string | null) => {
    playSelect();
    if (url) window.open(url, "_blank", "noopener");
  };

  const trackX = (1 - sel) * STEP;

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      className="relative overflow-hidden py-32 md:py-48"
    >
      {/* Ambient glow keyed to selected project */}
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-700"
        style={{
          background: `radial-gradient(92% 72% at 74% -8%,${hex2rgba(cur.accent, 0.12)},transparent 60%),radial-gradient(70% 62% at 10% 114%,${hex2rgba(cur.accent, 0.06)},transparent 60%)`,
        }}
      />

      <div className="relative z-[2] mx-auto max-w-7xl px-6 md:px-10">
        <SectionHead index="01" label="Proyectos" />

        {/* ── Card strip ── */}
        <div
          className="ps4-r relative overflow-x-clip overflow-y-visible"
          style={{ height: CARD * 1.22 + 24 }}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1);
          }}
          onWheel={(e) => {
            if (window.innerWidth >= 768) return;
            if (wheelCooldown.current || Math.abs(e.deltaX) < 10) return;
            wheelCooldown.current = true;
            move(e.deltaX > 0 ? 1 : -1);
            setTimeout(() => {
              wheelCooldown.current = false;
            }, 400);
          }}
        >
          <div
            className="absolute left-0 top-0 flex h-full items-center"
            style={{
              gap: CARD_GAP,
              willChange: "transform",
              transition: "transform .52s cubic-bezier(.3,.92,.28,1)",
              transform: `translateX(${trackX}px)`,
            }}
          >
            {PROJECTS.map((p, i) => {
              const active = i === sel;
              const n = PROJECTS.length;
              const ctr = Math.floor(n / 2) - 1;
              const stkX = Math.round((ctr - i) * STEP + (i - ctr) * 5);
              const stkY = (n - 1 - i) * -3;
              const stkR = (i - (n - 1) / 2) * 2.5;
              const stkOp = +(0.4 + (1 - i / (n - 1)) * 0.5).toFixed(2);
              return (
                <button
                  key={p.id}
                  onClick={() => { pick(i); scrollToProject(i); }}
                  className={`ps4-card relative flex-shrink-0 cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-accent ${active ? "ps4-card-active" : ""}`}
                  style={{
                    width: CARD,
                    height: CARD,
                    zIndex: fold < 2 ? n - i : active ? 3 : 1,
                    transform: fold === 0
                      ? `translateX(${stkX}px) translateY(${stkY}px) rotate(${stkR}deg) scale(0.88)`
                      : `scale(${active ? SCALE : 1})`,
                    transformOrigin: "center bottom",
                    opacity: fold === 0 ? stkOp : active ? 1 : 0.55,
                    transition: fold === 0
                      ? "none"
                      : fold === 1
                        ? `transform .85s cubic-bezier(.22,.82,.32,1) ${i * 70}ms, opacity .6s ease ${i * 70}ms`
                        : "transform .45s cubic-bezier(.34,1.2,.5,1), opacity .4s ease",
                  }}
                  aria-label={`Seleccionar ${p.name}`}
                  aria-pressed={active}
                >
                  <div
                    className="relative h-full w-full overflow-hidden"
                    style={{
                      boxShadow: active
                        ? `0 0 0 2px rgba(255,255,255,.85),0 30px 80px -10px ${hex2rgba(p.accent, 0.45)},0 10px 40px -5px ${hex2rgba(p.accent, 0.25)}`
                        : "0 8px 22px rgba(0,0,0,.45)",
                      transition: "box-shadow .4s ease",
                      background: `linear-gradient(150deg,color-mix(in srgb,${p.accent} 40%,#0d0e12),#0a0b0e 72%)`,
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(120% 92% at 22% 0%,color-mix(in srgb,${p.accent} 34%,transparent),transparent 58%)`,
                      }}
                    />
                    <div
                      className="absolute left-3 top-3 h-2 w-2 rounded-full"
                      style={{
                        background: p.accent,
                        boxShadow: `0 0 12px ${p.accent}`,
                      }}
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center font-display text-[52px] font-bold tracking-wide"
                      style={{
                        color: `color-mix(in srgb,${p.accent} 62%,#ffffff)`,
                      }}
                    >
                      {p.short}
                    </div>
                    <div
                      className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-6 text-left text-[12px] font-semibold leading-tight text-white"
                      style={{
                        background:
                          "linear-gradient(transparent,rgba(0,0,0,.74))",
                      }}
                    >
                      {p.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Sub-menu + Detail panel (same row) ── */}
        <div className="ps4-r ps4-info -mt-6 relative z-[2]">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-0">
            {/* Spacer: aligns sub-menu under the scaled active card */}
            <div
              className="hidden md:block"
              style={{ width: STEP - SCALE_OFFSET, flexShrink: 0 }}
            />

            {/* PS4-style sub-menu — dropdown open/close */}
            <div
              className="flex flex-row gap-1 md:flex-col md:gap-0 overflow-hidden"
              style={{
                flexShrink: 0,
                width: SCALED_W,
                maxHeight: switching ? 0 : 130,
                transition:
                  "max-height .32s cubic-bezier(.2,.85,.3,1)",
                transformOrigin: "top",
              }}
            >
              {[
                {
                  label: "Iniciar",
                  action: () => openUrl(cur.demo || cur.github),
                  primary: true,
                },
                { label: "Demo", action: () => openUrl(cur.demo) },
                { label: "Repositorio", action: () => openUrl(cur.github) },
              ].map((item, idx) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={`flex items-center gap-2.5 py-2.5 pr-3 pl-3 text-left text-[13px] ${
                    item.primary
                      ? "font-semibold text-white hover:bg-white/10"
                      : "font-medium text-muted hover:bg-white/5 hover:text-ink"
                  }`}
                  style={{
                    background: item.primary
                      ? `linear-gradient(90deg,${hex2rgba(cur.accent, 0.18)},transparent)`
                      : undefined,
                    opacity: switching ? 0 : 1,
                    transform: switching ? "translateY(-12px)" : "translateY(0)",
                    transition: switching
                      ? `opacity .15s ease ${(2 - idx) * 45}ms, transform .18s ease ${(2 - idx) * 45}ms, background .2s ease`
                      : `opacity .32s ease ${idx * 90 + 120}ms, transform .38s cubic-bezier(.16,.85,.3,1) ${idx * 90 + 120}ms, background .2s ease`,
                  }}
                >
                  {item.primary && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="flex-shrink-0"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                  {item.label}
                </button>
              ))}
            </div>

            {/* Project info + stack (to the right, same vertical start) */}
            <div
              className="flex flex-1 flex-col md:pl-10"
              style={{
                transition: "opacity .3s ease,transform .3s ease",
                opacity: switching ? 0 : 1,
                transform: switching ? "translateY(9px)" : "translateY(0)",
              }}
            >
              <h2 className="font-display text-3xl font-bold leading-none tracking-tight text-ink md:text-[48px]">
                {cur.name}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="bg-white/[.08] px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-muted">
                  {cur.tag}
                </span>
                <span
                  className="flex items-center gap-1.5 px-2.5 py-1 font-mono text-[11px] font-semibold"
                  style={{
                    background: `color-mix(in srgb,${cur.accent} 20%,transparent)`,
                    color: `color-mix(in srgb,${cur.accent} 55%,#ffffff)`,
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M5 4h14v3a5 5 0 0 1-4 4.9V14h2a1 1 0 0 1 1 1v1h1v2H6v-2h1v-1a1 1 0 0 1 1-1h2v-2.1A5 5 0 0 1 6 7zM3 6h2v1a3 3 0 0 1-2 2.8zm18 0v3.8A3 3 0 0 1 19 7V6z" />
                  </svg>
                  {cur.impact}
                </span>
              </div>
              <div
                className="mt-2 text-[15px] font-semibold"
                style={{
                  color: `color-mix(in srgb,${cur.accent} 50%,#ffffff)`,
                }}
              >
                {cur.subtitle}
              </div>
              <p className="mt-2 line-clamp-3 max-w-[480px] text-sm leading-relaxed text-muted">
                {cur.description}
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Stack bucket — anchored to the very bottom of the section */}
      <div className="absolute inset-x-0 bottom-8 z-[3] mx-auto hidden max-w-7xl px-6 md:block md:px-10">
        <div className="ml-auto w-[300px]">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
            Stack técnico
          </div>
          <StackBucket
            balls={cur.stack.map((tech) => {
              const ic = iconFor(tech);
              return { tech, src: ic.src, color: ic.color };
            })}
            switching={switching}
            onCollision={onBallCollision}
          />
        </div>
      </div>

      {/* Scroll progress dots — desktop only */}
      <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-2.5 md:flex">
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            className="h-2 w-2 rounded-full transition-all duration-300"
            style={{
              background: i === sel ? cur.accent : "rgba(255,255,255,.18)",
              boxShadow: i === sel ? `0 0 8px ${cur.accent}` : "none",
              transform: i === sel ? "scale(1.4)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </section>
  );
}

