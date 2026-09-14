"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";

const NODES = [
  { id: "a", x: 60, y: 60, r: 5 },
  { id: "b", x: 220, y: 40, r: 4 },
  { id: "c", x: 340, y: 110, r: 6 },
  { id: "d", x: 120, y: 170, r: 4 },
  { id: "e", x: 260, y: 210, r: 5 },
  { id: "f", x: 60, y: 280, r: 4 },
  { id: "g", x: 200, y: 320, r: 6 },
  { id: "h", x: 340, y: 290, r: 4 },
  { id: "core", x: 190, y: 175, r: 9 },
];

const LINKS: [string, string][] = [
  ["a", "core"],
  ["b", "core"],
  ["c", "core"],
  ["d", "core"],
  ["e", "core"],
  ["f", "core"],
  ["g", "core"],
  ["h", "core"],
  ["a", "b"],
  ["b", "c"],
  ["d", "f"],
  ["g", "h"],
];

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));

export function ArchitectureVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cursorNodeRef = useRef<SVGCircleElement>(null);
  const cursorGlowRef = useRef<SVGCircleElement>(null);
  const nodeRefs = useRef<Record<string, SVGCircleElement | null>>({});

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || isCoarsePointer) return;

    let rotX = 0;
    let rotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let svgX = -100;
    let svgY = -100;
    let targetSvgX = -100;
    let targetSvgY = -100;
    let hovering = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      targetRotY = (px - 0.5) * 18;
      targetRotX = -(py - 0.5) * 18;
      targetSvgX = px * 400;
      targetSvgY = py * 400;
      hovering = true;
    };

    const onLeave = () => {
      hovering = false;
      targetRotX = 0;
      targetRotY = 0;
    };

    const tick = () => {
      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;
      svgX += (targetSvgX - svgX) * 0.12;
      svgY += (targetSvgY - svgY) * 0.12;

      stage.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

      if (cursorGlowRef.current) {
        cursorGlowRef.current.setAttribute("cx", String(svgX));
        cursorGlowRef.current.setAttribute("cy", String(svgY));
        cursorGlowRef.current.setAttribute("opacity", hovering ? "1" : "0");
      }
      if (cursorNodeRef.current) {
        cursorNodeRef.current.setAttribute("cx", String(svgX));
        cursorNodeRef.current.setAttribute("cy", String(svgY));
        cursorNodeRef.current.setAttribute("opacity", hovering ? "1" : "0");
      }

      for (const n of NODES) {
        const el = nodeRefs.current[n.id];
        if (!el) continue;
        const dist = Math.hypot(n.x - svgX, n.y - svgY);
        const proximity = hovering ? Math.max(0, 1 - dist / 130) : 0;
        const scale = 1 + proximity * 0.6;
        el.setAttribute(
          "transform",
          `translate(${n.x} ${n.y}) scale(${scale}) translate(${-n.x} ${-n.y})`,
        );
      }

      raf = requestAnimationFrame(tick);
    };

    wrap.addEventListener("pointermove", onMove, { passive: true });
    wrap.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative aspect-square w-full max-w-[440px]"
      style={{ perspective: 900 }}
    >
      <div ref={stageRef} className="h-full w-full" style={{ transformStyle: "preserve-3d" }}>
        <svg
          viewBox="0 0 400 400"
          className="h-full w-full overflow-visible"
          role="img"
          aria-label="Abstract diagram of interconnected software modules representing system architecture, reacting to pointer movement"
        >
          <defs>
            <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e5c987" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#e5c987" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="cursor-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e5c987" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#e5c987" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="190" cy="175" r="150" stroke="rgba(255,255,255,0.06)" fill="none" />
          <circle cx="190" cy="175" r="105" stroke="rgba(255,255,255,0.05)" fill="none" />

          {LINKS.map(([from, to], i) => {
            const a = byId[from];
            const b = byId[to];
            return (
              <motion.line
                key={`${from}-${to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="rgba(201,164,92,0.35)"
                strokeWidth={1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.06, ease: "easeInOut" }}
              />
            );
          })}

          <circle
            ref={cursorGlowRef}
            cx="-100"
            cy="-100"
            r="70"
            fill="url(#cursor-glow)"
            opacity="0"
          />

          <circle cx="190" cy="175" r="46" fill="url(#core-glow)" />

          {NODES.map((n, i) => (
            <motion.g
              key={n.id}
              ref={(el) => {
                nodeRefs.current[n.id] = el?.querySelector("circle") ?? null;
              }}
            >
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill={n.id === "core" ? "#e5c987" : "#0d0d0d"}
                stroke={n.id === "core" ? "#e5c987" : "rgba(201,164,92,0.7)"}
                strokeWidth={1.5}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
              />
              {n.id !== "core" && (
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r}
                  fill="none"
                  stroke="rgba(201,164,92,0.4)"
                  strokeWidth={1}
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeOut",
                  }}
                />
              )}
            </motion.g>
          ))}

          <circle
            ref={cursorNodeRef}
            cx="-100"
            cy="-100"
            r="2.5"
            fill="#f2efe8"
            opacity="0"
          />
        </svg>
      </div>

      <div className="absolute -bottom-8 left-0 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-text-muted">
        <span className="h-px w-6 bg-gold-muted" />
        System Architecture / 01
      </div>
    </div>
  );
}
