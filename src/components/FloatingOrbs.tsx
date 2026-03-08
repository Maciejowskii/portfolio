"use client";

import { useEffect, useRef } from "react";

export default function FloatingOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const orbs = [
      { x: 0.3, y: 0.2, r: 350, color: [139, 92, 246], speedX: 0.015, speedY: 0.012, phase: 0 },
      { x: 0.7, y: 0.3, r: 300, color: [6, 182, 212], speedX: -0.012, speedY: 0.018, phase: 1.5 },
      { x: 0.5, y: 0.7, r: 400, color: [109, 40, 217], speedX: 0.01, speedY: -0.014, phase: 3.0 },
      { x: 0.2, y: 0.8, r: 250, color: [6, 182, 212], speedX: 0.018, speedY: 0.01, phase: 4.5 },
      { x: 0.8, y: 0.6, r: 280, color: [139, 92, 246], speedX: -0.014, speedY: -0.016, phase: 2.2 },
    ];

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      for (const orb of orbs) {
        const time = t * 0.001;
        const cx = w * orb.x + Math.sin(time * orb.speedX * 10 + orb.phase) * w * 0.15;
        const cy = h * orb.y + Math.cos(time * orb.speedY * 10 + orb.phase) * h * 0.12;
        const scale = 1 + 0.15 * Math.sin(time * 0.5 + orb.phase);
        const radius = orb.r * scale;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        const [r, g, b] = orb.color;
        grad.addColorStop(0, `rgba(${r},${g},${b},0.18)`);
        grad.addColorStop(0.4, `rgba(${r},${g},${b},0.08)`);
        grad.addColorStop(0.7, `rgba(${r},${g},${b},0.02)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
