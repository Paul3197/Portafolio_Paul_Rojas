"use client";

import { useEffect, useRef } from "react";
import { ParticleNetwork } from "@/components/particle-network";

export function BackgroundFx() {
  const gridRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const spotlightEl = spotlightRef.current;
    if (!grid) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const allowPointerFx = !mediaQuery.matches && !isCoarsePointer;

    let raf = 0;
    let targetX = 50;
    let targetY = 30;
    let x = 50;
    let y = 30;

    const onMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
    };

    const tickSpotlight = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      spotlightEl?.style.setProperty("--spotlight-x", `${x}%`);
      spotlightEl?.style.setProperty("--spotlight-y", `${y}%`);
      raf = requestAnimationFrame(tickSpotlight);
    };

    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        const depth = Math.min(window.scrollY * 0.04, 60);
        grid.style.transform = `translateY(${depth}px)`;
        scrollRaf = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    if (allowPointerFx) {
      window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(tickSpotlight);
    }

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollRaf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div
        ref={gridRef}
        className="architecture-grid absolute inset-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)]"
      />
      <ParticleNetwork />
      <div ref={spotlightRef} className="spotlight" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep-black" />
    </div>
  );
}
