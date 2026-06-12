import Reveal from "./Reveal";

/** Cabecera de sección: número mono + etiqueta + línea. */
export default function SectionHead({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  return (
    <Reveal className="mb-14 flex items-center gap-5 md:mb-20">
      <span className="font-mono text-sm font-medium text-hot">{index}</span>
      <h2 className="font-mono text-sm font-medium uppercase tracking-[0.3em] text-muted">
        {label}
      </h2>
      <span className="h-px flex-1 bg-line" />
    </Reveal>
  );
}
