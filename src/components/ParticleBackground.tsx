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

    interface Star { x: number; y: number; r: number; a: number; aSpeed: number; }
    let stars: Star[] = [];

    const HUES = [190, 195, 200, 210]; // neon blue → cyan → sky

    const resize = () => {
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
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.7,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
      }));

      const orbCount = w < 768 ? 6 : 12;
      orbs = Array.from({ length: orbCount }, () => ({
        x: Math.random() * w,
        y: h + Math.random() * h,
        r: 60 + Math.random() * 120,
        vy: -(0.15 + Math.random() * 0.3),
        vx: (Math.random() - 0.5) * 0.12,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
        phase: Math.random() * Math.PI * 2,
      }));

      const starCount = Math.min(140, Math.floor((w * h) / 12000));
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 0.9 + 0.2,
        a: Math.random(),
        aSpeed: (Math.random() - 0.5) * 0.02,
      }));
    };

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onResize = () => resize();

    let lastTime = 0;
    const draw = (t: number) => {
      const dt = Math.min((t - lastTime) / 16.67, 3);
      lastTime = t;
      ctx.clearRect(0, 0, w, h);

      // Stars (twinkling)
      for (const s of stars) {
        s.a += s.aSpeed * dt;
        s.a = Math.max(0.15, Math.min(0.85, s.a));
        ctx.fillStyle = `rgba(196, 181, 253, ${s.a * 0.6})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Floating orbs (soft purple glows)
      for (const o of orbs) {
        o.y += o.vy * dt;
        o.x += o.vx * dt;
        o.phase += 0.008 * dt;
        if (o.y + o.r < -50) {
          o.y = h + o.r + Math.random() * 100;
          o.x = Math.random() * w;
          o.r = 60 + Math.random() * 120;
        }
        const wob = Math.sin(o.phase) * 12;
        const g = ctx.createRadialGradient(o.x + wob, o.y, 0, o.x + wob, o.y, o.r);
        g.addColorStop(0, `hsla(${o.hue}, 85%, 65%, 0.14)`);
        g.addColorStop(0.6, `hsla(${o.hue}, 85%, 60%, 0.05)`);
        g.addColorStop(1, `hsla(${o.hue}, 85%, 60%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x + wob, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Nodes (constellation)
      for (const p of nodes) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 130 * 130) {
          const d = Math.sqrt(d2) || 1;
          const f = (130 - d) / 130;
          p.x += (dx / d) * f * 1.6;
          p.y += (dy / d) * f * 1.6;
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
        grad.addColorStop(0, `hsla(${p.hue}, 90%, 78%, 0.95)`);
        grad.addColorStop(1, `hsla(${p.hue}, 90%, 78%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2);
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
            const alpha = (1 - Math.sqrt(d2) / maxDist) * 0.3;
            ctx.strokeStyle = `hsla(195, 90%, 75%, ${alpha})`;
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

    const start = () => {
      resize();
      raf = requestAnimationFrame(draw);
    };

    if (document.readyState === "complete") requestAnimationFrame(start);
    else {
      window.addEventListener("load", start, { once: true });
      requestAnimationFrame(start);
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

  return <canvas ref={canvasRef} data-particle aria-hidden />;
}
