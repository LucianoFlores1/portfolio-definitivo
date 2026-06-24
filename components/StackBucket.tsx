"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

type Ball = { tech: string; src: string; color: string };

const R = 26;

function hexRgba(hex: string, a: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

export default function StackBucket({
  balls,
  switching,
  onCollision,
}: {
  balls: Ball[];
  switching: boolean;
  onCollision?: (speed: number) => void;
}) {
  const [inView, setInView] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    engine: Matter.Engine;
    runner: Matter.Runner;
    walls: Matter.Body[];
    bodies: Matter.Body[];
    mouse: Matter.Body;
    raf: number;
    images: Map<string, HTMLImageElement>;
    W: number;
    H: number;
    pmx: number;
    pmy: number;
  } | null>(null);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const W = box.clientWidth;
    const H = box.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";

    const engine = Matter.Engine.create({ gravity: { x: 0, y: 0.45 } });

    const wallOpts = { isStatic: true, restitution: 0.9, friction: 0 };
    const thick = 200;
    const walls = [
      Matter.Bodies.rectangle(W / 2, H + thick / 2, W + thick * 2, thick, wallOpts),
      Matter.Bodies.rectangle(-thick / 2, H / 2, thick, H * 3, wallOpts),
      Matter.Bodies.rectangle(W + thick / 2, H / 2, thick, H * 3, wallOpts),
      Matter.Bodies.rectangle(W / 2, -thick / 2, W + thick * 2, thick, wallOpts),
    ];
    Matter.Composite.add(engine.world, walls);

    const mouse = Matter.Bodies.circle(-200, -200, R * 2.2, {
      isStatic: true,
      restitution: 1,
    });
    Matter.Composite.add(engine.world, mouse);

    const images = new Map<string, HTMLImageElement>();
    const bodies: Matter.Body[] = [];

    balls.forEach((ball, i) => {
      const cols = Math.min(balls.length, 4);
      const usableW = W - R * 2;
      const spacing = Math.min(usableW / Math.max(cols, 1), R * 2.8);
      const startX = W / 2 - ((cols - 1) * spacing) / 2;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * spacing + (Math.random() - 0.5) * 10;
      const y = R * 2 + row * R * 3 + Math.random() * 20;

      const body = Matter.Bodies.circle(x, y, R, {
        restitution: 0.6,
        friction: 0.02,
        frictionAir: 0.006,
        density: 0.005,
      });
      (body as any)._d = ball;
      (body as any)._sq = 0;
      (body as any)._sqA = 0;
      bodies.push(body);

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = ball.src;
      images.set(ball.tech, img);
    });

    Matter.Composite.add(engine.world, bodies);
    const runner = Matter.Runner.create({ delta: 1000 / 60 });
    Matter.Runner.run(runner, engine);

    let lastSoundAt = 0;
    Matter.Events.on(engine, "collisionStart", (event) => {
      const now = performance.now();
      let soundFired = false;
      for (const pair of event.pairs) {
        const a = pair.bodyA;
        const b = pair.bodyB;
        if (a.isStatic && b.isStatic) continue;

        const movingBodies = [a, b].filter((bd) => !bd.isStatic);
        for (const bd of movingBodies) {
          const spd = bd.speed;
          if (spd < 0.3) continue;
          (bd as any)._sq = Math.min(spd * 0.025, 0.18);
          (bd as any)._sqA = Math.atan2(bd.velocity.y, bd.velocity.x);
        }

        if (!soundFired && onCollision && now - lastSoundAt >= 60) {
          const vel = a.isStatic ? b.speed : b.isStatic ? a.speed : Math.max(a.speed, b.speed);
          if (vel >= 0.6) {
            lastSoundAt = now;
            onCollision(Math.min(vel, 12));
            soundFired = true;
          }
        }
      }
    });

    function render() {
      const ctx = canvas!.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      bodies.forEach((body) => {
        const d = (body as any)._d as Ball;
        if (!d) return;
        const { x, y } = body.position;

        if (x < -R * 2 || x > W + R * 2 || y < -R * 2 || y > H + R * 2) {
          Matter.Body.setPosition(body, { x: W / 2, y: H / 2 });
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
          return;
        }

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(body.angle);

        let sq: number = (body as any)._sq || 0;
        if (Math.abs(sq) > 0.002) {
          const sqA: number = (body as any)._sqA || 0;
          const local = sqA - body.angle;
          ctx.rotate(local);
          ctx.scale(1 - sq, 1 + sq * 0.7);
          ctx.rotate(-local);
          (body as any)._sq = sq * 0.88;
        }

        ctx.shadowColor = hexRgba(d.color, 0.55);
        ctx.shadowBlur = 20;

        ctx.beginPath();
        ctx.arc(0, 0, R, 0, Math.PI * 2);
        ctx.fillStyle = hexRgba(d.color, 0.14);
        ctx.fill();

        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;

        ctx.strokeStyle = hexRgba(d.color, 0.5);
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const img = images.get(d.tech);
        if (img && img.complete && img.naturalWidth > 0) {
          const s = R * 1.15;
          ctx.drawImage(img, -s / 2, -s / 2, s, s);
        }

        ctx.restore();
      });

      st.raf = requestAnimationFrame(render);
    }

    const st = {
      engine,
      runner,
      walls,
      bodies,
      mouse,
      raf: 0,
      images,
      W,
      H,
      pmx: -200,
      pmy: -200,
    };
    stateRef.current = st;
    st.raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(st.raf);
      Matter.Events.off(engine, "collisionStart");
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      stateRef.current = null;
    };
  }, [balls, onCollision, inView]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const onResize = () => {
      const st = stateRef.current;
      const canvas = canvasRef.current;
      if (!st || !canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const W = box.clientWidth;
      const H = box.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      st.W = W;
      st.H = H;
      const thick = 200;
      Matter.Body.setPosition(st.walls[0], { x: W / 2, y: H + thick / 2 });
      Matter.Body.setPosition(st.walls[1], { x: -thick / 2, y: H / 2 });
      Matter.Body.setPosition(st.walls[2], { x: W + thick / 2, y: H / 2 });
      Matter.Body.setPosition(st.walls[3], { x: W / 2, y: -thick / 2 });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const st = stateRef.current;
    const rect = boxRef.current?.getBoundingClientRect();
    if (!st || !rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    Matter.Body.setVelocity(st.mouse, {
      x: (x - st.pmx) * 0.45,
      y: (y - st.pmy) * 0.45,
    });
    Matter.Body.setPosition(st.mouse, { x, y });
    st.pmx = x;
    st.pmy = y;
  };

  const onLeave = () => {
    const st = stateRef.current;
    if (!st) return;
    Matter.Body.setVelocity(st.mouse, { x: 0, y: 0 });
    Matter.Body.setPosition(st.mouse, { x: -200, y: -200 });
    st.pmx = -200;
    st.pmy = -200;
  };

  return (
    <div
      ref={boxRef}
      className="relative h-[220px] w-full cursor-grab active:cursor-grabbing md:h-[260px]"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ opacity: switching ? 0 : 1, transition: "opacity .3s ease" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
