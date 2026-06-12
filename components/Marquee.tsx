const ROW_A = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "TailwindCSS",
  "Python",
  "Django",
  "Flask",
  "Playwright",
];

const ROW_B = [
  "Supabase",
  "Firebase",
  "MySQL",
  "PWA",
  "n8n",
  "Power BI",
  "Pandas",
  "ETL",
  "Vercel",
  "CI/CD",
];

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`flex shrink-0 items-center gap-6 pr-6 font-display text-[clamp(34px,4.5vw,64px)] font-semibold uppercase tracking-tight ${
              reverse ? "text-outline" : "text-ink/90"
            }`}
          >
            {item}
            <span className="text-[0.45em] text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Doble cinta infinita del stack, una sólida y una delineada en sentido opuesto. */
export default function Marquee() {
  return (
    <div className="space-y-4 border-y border-line py-10">
      <Row items={ROW_A} />
      <Row items={ROW_B} reverse />
    </div>
  );
}
