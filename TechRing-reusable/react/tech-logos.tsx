import React from "react";

/**
 * Inline SVG brand marks for the tech ring.
 * Sized via the parent (the ring renders them at 78×78 by default).
 * Keys are referenced from `DEFAULT_STACK` in `TechRing.tsx`.
 */
export const TechLogos: Record<string, React.ReactNode> = {
  react: (
    <svg viewBox="-22 -20 44 40" xmlns="http://www.w3.org/2000/svg">
      <circle r="3.4" fill="#61DAFB" />
      <g fill="none" stroke="#61DAFB" strokeWidth="1.6">
        <ellipse rx="19" ry="7" />
        <ellipse rx="19" ry="7" transform="rotate(60)" />
        <ellipse rx="19" ry="7" transform="rotate(120)" />
      </g>
    </svg>
  ),
  next: (
    <svg viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="22" fill="none" stroke="#fff" strokeWidth="1.6" />
      <path d="M16 15 V33" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M16 15 L31 35" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M31.5 15 V27" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 48 48">
      <rect width="48" height="48" rx="7" fill="#3178C6" />
      <text x="24" y="33" fontFamily="ui-sans-serif, Arial" fontSize="20" fontWeight="700" fill="#fff" textAnchor="middle">
        TS
      </text>
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 54 33">
      <path
        fill="#38BDF8"
        d="M27 0C19.8 0 15.3 3.6 13.5 10.8 16.2 7.2 19.35 5.85 22.95 6.75 25 7.26 26.47 8.75 28.1 10.4 30.74 13.09 33.81 16.2 40.5 16.2 47.7 16.2 52.2 12.6 54 5.4 51.3 9 48.15 10.35 44.55 9.45 42.5 8.94 41.03 7.45 39.4 5.8 36.76 3.11 33.69 0 27 0ZM13.5 16.2C6.3 16.2 1.8 19.8 0 27 2.7 23.4 5.85 22.05 9.45 22.95 11.5 23.46 12.97 24.95 14.6 26.6 17.24 29.29 20.31 32.4 27 32.4 34.2 32.4 38.7 28.8 40.5 21.6 37.8 25.2 34.65 26.55 31.05 25.65 29 25.14 27.53 23.65 25.9 22 23.26 19.31 20.19 16.2 13.5 16.2Z"
      />
    </svg>
  ),
  node: (
    <svg viewBox="0 0 48 48">
      <path d="M24 3 42.6 13.5 V34.5 L24 45 5.4 34.5 V13.5Z" fill="#3C873A" />
      <path d="M24 3 42.6 13.5 V34.5 L24 45Z" fill="#2D6B2B" />
      <text x="24" y="29" fontFamily="ui-sans-serif, Arial" fontSize="11" fontWeight="700" fill="#fff" textAnchor="middle" letterSpacing="-.5">
        node
      </text>
    </svg>
  ),
  express: (
    <svg viewBox="0 0 48 48">
      <rect width="48" height="48" rx="9" fill="#1b1b1f" stroke="#3a3a40" strokeWidth="1.4" />
      <text x="24" y="31" fontFamily="ui-monospace, monospace" fontSize="18" fontWeight="700" fill="#fff" textAnchor="middle">
        ex
      </text>
    </svg>
  ),
  mysql: (
    <svg viewBox="0 0 48 48">
      <g fill="none" stroke="#00758F" strokeWidth="2.6">
        <ellipse cx="24" cy="13" rx="14" ry="5.4" fill="#00758F" />
        <path d="M10 13 V35 a14 5.4 0 0 0 28 0 V13" />
        <path d="M10 24 a14 5.4 0 0 0 28 0" />
      </g>
      <path d="M34 35c2 3 4 3 6 5" stroke="#F29111" strokeWidth="2.6" fill="none" strokeLinecap="round" />
    </svg>
  ),
  supabase: (
    <svg viewBox="0 0 48 48">
      <defs>
        <linearGradient id="sb-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3ECF8E" />
          <stop offset="1" stopColor="#249a64" />
        </linearGradient>
      </defs>
      <path
        d="M26 3 L11 23 a1.6 1.6 0 0 0 1.3 2.6 H22 V44 a1 1 0 0 0 1.8 .6 L39 25 a1.6 1.6 0 0 0-1.3-2.6 H28 V4 a1 1 0 0 0-2-1Z"
        fill="url(#sb-grad)"
      />
    </svg>
  ),
  firebase: (
    <svg viewBox="0 0 48 48">
      <path d="M8 38 L18 6 23 15 16 27Z" fill="#F57C00" />
      <path d="M8 38 L24 11 30 21 22 30Z" fill="#FFA000" />
      <path d="M8 38 L33 17 40 38 24 45Z" fill="#FFCA28" />
      <path d="M8 38 L40 38 24 45Z" fill="#F57C00" opacity=".45" />
    </svg>
  ),
  python: (
    <svg viewBox="0 0 48 48">
      <path
        fill="#3776AB"
        d="M23.6 5c-7.4 0-7 3.2-7 3.2v3.3h7.1v1H13.5S8.7 11 8.7 18.4 12.9 25.5 12.9 25.5h2.5v-3.5s-.13-4.3 4.2-4.3h7s4-.06 4-3.9V8.9S31.2 5 23.6 5Zm-3.9 2.2a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Z"
      />
      <path
        fill="#FFD43B"
        d="M24.4 43c7.4 0 7-3.2 7-3.2v-3.3h-7.1v-1h10.2s4.8.5 4.8-6.9-4.2-7.1-4.2-7.1h-2.5v3.5s.13 4.3-4.2 4.3h-7s-4 .06-4 3.9v6.9S16.8 43 24.4 43Zm3.9-2.2a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Z"
      />
    </svg>
  ),
  git: (
    <svg viewBox="0 0 48 48">
      <g transform="rotate(45 24 24)">
        <rect x="9" y="9" width="30" height="30" rx="5" fill="#F05032" />
      </g>
      <g fill="#F05032" stroke="#fff" strokeWidth="2.4">
        <line x1="20" y1="31" x2="20" y2="17" />
        <line x1="20" y1="24" x2="29" y2="16" />
        <circle cx="20" cy="32.5" r="2.6" />
        <circle cx="20" cy="15.5" r="2.6" />
        <circle cx="30" cy="14" r="2.6" />
      </g>
    </svg>
  ),
  vercel: (
    <svg viewBox="0 0 48 48">
      <path d="M24 7 L43 41 H5 Z" fill="#fff" />
    </svg>
  ),
};
