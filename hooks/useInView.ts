"use client";

import { useEffect, useState } from "react";

export function useInView(
  ref: React.RefObject<Element | null>,
  { once = true, margin = "0px" }: { once?: boolean; margin?: string } = {},
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, margin]);

  return inView;
}
