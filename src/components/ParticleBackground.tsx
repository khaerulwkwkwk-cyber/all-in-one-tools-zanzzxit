"use client";
import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1;
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    interface Node { x: number; y: number; vx: number; vy: number; r: number; hue: number; }
    let nodes: Node[] = [];

    interface Orb { x: number; y: number; r: number; vy: number; vx: number; hue: number; phase: number; }
    let orbs: Orb[] = [];

    interface Drop { x: number; y: number; speed: number; chars: string[]; hue: number; }
    let drops: Drop[] = [];
    const CHARS = "01アイウエオカキクケコABCDEF<>{}[]/*+-".split("");
    const FONT_SIZE = 14;

    interface Star { x: number; y: number; r: number; a: number; aSpeed: number; }
    let stars: Star[] = [];

    const resize = () => {
      // Ambil ukuran DARI CANVAS SENDIRI (bukan window)
      const rect = canvas.getBoundingClientRect();
      w = rect.width || window.innerWidth;
      h = rect.height || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const nodeCount = Math.min(70, Math.floor((w * h) / 26000));
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.4 + 0.6,
        hue: Math.random() > 0.5 ? 265 : 190,
      }));

      const orbCount = w < 768 ? 8 : 16;
      orbs = Array.from({ length: orbCount }, () => ({
        x: Math.random() * w,
        y: h + Math.random() * h,
        r: 40 + Math.random() * 90,
        vy: -(0.2 + Math.random() * 0.4),
        vx: (Math.random() - 0.5) * 0.15,
        hue: Math.random() > 0.5 ? 265 : 190,
        phase: Math.random() * Math.PI * 2,
      }));

      const cols = Math.floor(w / FONT_SIZE);
      drops = Array.from({ length: cols }, (_, i) => ({
        x: i,
        y: Math.random() * -h,
        speed: 1 + Math.random() * 2.5,
        chars: Array.from({ length: 10 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
        hue: Math.random() > 0.5 ? 140 : 160,
      }));

      const starCount = Math.min(120, Math.floor((w * h) / 13000));
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 0.9 + 0.2,
        a: Math.random(),
        aSpeed: (Math.random() - 0.5) * 0.02,
      }));

      console.log("✨ Particle:", nodeCount, "nodes,", orbCount, "orbs,", starCount, "stars", "| viewport:", w, "x", h);
    };

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onResize = () => resize();

    let lastTime = 0;
    const draw = (t: number) => {
      const dt = Math.min((t - lastTime) / 16.67, 3);
      lastTime = t;
      ctx.clearRect(0, 0, w, h);

      // Stars
      for (const s of stars) {
        s.a += s.aSpeed * dt;
        s.a = Math.max(0.15, Math.min(0.9, s.a));
        ctx.fillStyle = `rgba(200,210,255,${s.a * 0.7})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Matrix rain
      ctx.font = `${FONT_SIZE}px monospace`;
      ctx.textAlign = "center";
      for (const d of drops) {
        d.y += d.speed * dt;
        if (d.y > h + 200) { d.y = -200 - Math.random() * h * 0.5; d.speed = 1 + Math.random() * 2.5; }
        for (let i = 0; i < d.chars.length; i++) {
          const cy = d.y - i * FONT_SIZE;
          if (cy < -FONT_SIZE || cy > h + FONT_SIZE) continue;
          const alpha = (1 - i / d.chars.length) * 0.4;
          ctx.fillStyle = i === 0
            ? `hsla(${d.hue}, 100%, 80%, 0.85)`
            : `hsla(${d.hue}, 90%, 55%, ${alpha})`;
          ctx.fillText(d.chars[i], d.x * FONT_SIZE + FONT_SIZE / 2, cy);
        }
      }

      // Orbs
      for (const o of orbs) {
        o.y += o.vy * dt;
        o.x += o.vx * dt;
        o.phase += 0.01 * dt;
        if (o.y + o.r < -50) { o.y = h + o.r + Math.random() * 100; o.x = Math.random() * w; o.r = 40 + Math.random() * 90; }
        const wob = Math.sin(o.phase) * 8;
        const g = ctx.createRadialGradient(o.x + wob, o.y, 0, o.x + wob, o.y, o.r);
        g.addColorStop(0, `hsla(${o.hue}, 100%, 65%, 0.18)`);
        g.addColorStop(1, `hsla(${o.hue}, 100%, 60%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x + wob, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Nodes
      for (const p of nodes) {
        p.x += p.vx * dt; p.y += p.vy * dt;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 130 * 130) {
          const d = Math.sqrt(d2) || 1;
          const f = (130 - d) / 130;
          p.x += (dx / d) * f * 1.8;
          p.y += (dy / d) * f * 1.8;
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 7);
        grad.addColorStop(0, `hsla(${p.hue}, 100%, 75%, 0.95)`);
        grad.addColorStop(1, `hsla(${p.hue}, 100%, 75%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 7, 0, Math.PI * 2);
        ctx.fill();
      }

      // Connections
      const maxDist = 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist * maxDist) {
            ctx.strokeStyle = `hsla(230, 100%, 75%, ${(1 - Math.sqrt(d2) / maxDist) * 0.35})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    // Init setelah browser selesai layout
    const start = () => {
      resize();
      raf = requestAnimationFrame(draw);
    };

    if (document.readyState === "complete") {
      requestAnimationFrame(start);
    } else {
      window.addEventListener("load", start, { once: true });
      requestAnimationFrame(start); // fallback
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-particle
      aria-hidden
    />
  );
}
