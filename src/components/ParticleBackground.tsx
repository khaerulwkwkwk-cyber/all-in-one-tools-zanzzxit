"use client";
import { useEffect, useRef } from "react";

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  pulse: number;
  pulseSpeed: number;
}

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
    let nodes: Node[] = [];

    // Palette merah
    const RED = "244, 63, 94";        // rose-500
    const RED_LIGHT = "251, 113, 133"; // rose-400
    const RED_DEEP = "190, 18, 60";    // rose-700

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width || window.innerWidth;
      h = rect.height || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Node density tinggi seperti referensi
      const count = Math.min(110, Math.floor((w * h) / 14000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.8 + 0.8,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
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

      // ==== 1. GARIS PENGHUBUNG (digambar dulu, biar di belakang) ====
      const maxDist = 160;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist * maxDist) {
            const dist = Math.sqrt(d2);
            const alpha = (1 - dist / maxDist);
            // Garis lebih tebal & menyala
            const lineW = 0.4 + alpha * 1.1;
            ctx.strokeStyle = `rgba(${RED}, ${alpha * 0.55})`;
            ctx.lineWidth = lineW;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            // Highlight yang lebih dekat
            if (dist < maxDist * 0.5) {
              ctx.strokeStyle = `rgba(${RED_LIGHT}, ${alpha * 0.35})`;
              ctx.lineWidth = 0.4;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      // ==== 2. NODE DENGAN GLOW & PULSE ====
      for (const p of nodes) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.pulse += p.pulseSpeed * dt;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 150 * 150) {
          const d = Math.sqrt(d2) || 1;
          const f = (150 - d) / 150;
          p.x += (dx / d) * f * 2;
          p.y += (dy / d) * f * 2;
        }

        const pulseScale = 1 + Math.sin(p.pulse) * 0.5;
        const outerR = p.r * 8 * pulseScale;

        // Outer glow (soft)
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, outerR);
        grad.addColorStop(0, `rgba(${RED_LIGHT}, 0.55)`);
        grad.addColorStop(0.4, `rgba(${RED}, 0.25)`);
        grad.addColorStop(1, `rgba(${RED_DEEP}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, outerR, 0, Math.PI * 2);
        ctx.fill();

        // Core dot (terang)
        ctx.fillStyle = `rgba(${RED_LIGHT}, 1)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pulseScale, 0, Math.PI * 2);
        ctx.fill();

        // Inner hot spot
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.5 * pulseScale, 0, Math.PI * 2);
        ctx.fill();
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
