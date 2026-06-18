"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("custom-cursor");

    let mx = -100,
      my = -100;
    let rx = -100,
      ry = -100;
    let vx = 0,
      vy = 0;
    let visible = false;
    let hoverScale = 1;
    let pressed = false;
    let scale = 1;
    let dotTarget = 1;
    let dotCur = 1;
    let hovering = false;
    let raf = 0;

    const loop = () => {
      vx += (mx - rx) * 0.15;
      vy += (my - ry) * 0.15;
      vx *= 0.72;
      vy *= 0.72;
      rx += vx;
      ry += vy;

      const target = hoverScale * (pressed ? 0.8 : 1);
      scale += (target - scale) * 0.12;
      dotCur += (dotTarget - dotCur) * 0.15;

      dot.style.transform = `translate3d(${mx}px,${my}px,0) scale(${dotCur})`;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0) scale(${scale})`;

      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      if (!visible) {
        visible = true;
        rx = mx;
        ry = my;
        vx = 0;
        vy = 0;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }

      const t = e.target as HTMLElement;
      const interactive = t.closest(
        "a, button, [role='button'], .tr-card, .pcard",
      );

      if (interactive && !hovering) {
        hovering = true;
        hoverScale = 1.6;
        dotTarget = 0;
        ring.style.background = "rgba(255,255,255,0.06)";
        ring.style.borderColor = "rgba(255,255,255,0.6)";
      } else if (!interactive && hovering) {
        hovering = false;
        hoverScale = 1;
        dotTarget = 1;
        ring.style.background = "transparent";
        ring.style.borderColor = "rgba(255,255,255,0.35)";
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onEnter = () => {
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const onDown = () => {
      pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };

    raf = requestAnimationFrame(loop);
    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[110] opacity-0"
        style={{
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: "50%",
          background: "#fff",
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[110] opacity-0"
        style={{
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.35)",
          background: "transparent",
          mixBlendMode: "difference",
          willChange: "transform",
          transition: "background 0.3s, border-color 0.3s",
        }}
      />
    </>
  );
}
