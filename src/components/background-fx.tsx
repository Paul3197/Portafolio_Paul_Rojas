"use client";

import { useEffect, useRef } from "react";

export function BackgroundFx() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (mediaQuery.matches || isCoarsePointer) return;

    let raf = 0;
    let targetX = 50;
    let targetY = 30;
    let x = 50;
    let y = 30;

    const onMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
    };

    const tick = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      el.style.setProperty("--spotlight-x", `${x}%`);
      el.style.setProperty("--spotlight-y", `${y}%`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    >
      <div className="architecture-grid absolute inset-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)]" />
      <div className="spotlight" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep-black" />
    </div>
  );
}
