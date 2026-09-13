"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PRINCIPLES } from "@/lib/data";
import { cn } from "@/lib/utils";

export function EngineeringPrinciples() {
  const [active, setActive] = useState(0);

  return (
    <section id="principles" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeading
          index="04"
          label="Engineering Principles"
          title="Clean architecture. Clear business logic. Reliable systems."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-2">
            {PRINCIPLES.map((p, i) => (
              <button
                key={p.title}
                onClick={() => setActive(i)}
                className={cn(
                  "flex flex-col items-start gap-1 rounded-xl border px-6 py-5 text-left transition-colors",
                  active === i
                    ? "border-gold-muted/60 bg-graphite"
                    : "border-border-subtle hover:border-border-subtle-strong",
                )}
              >
                <span className="text-[11px] uppercase tracking-[0.2em] text-gold-muted">
                  {p.layer} Layer
                </span>
                <span
                  className={cn(
                    "text-lg font-medium",
                    active === i ? "text-gold-light" : "text-text-primary",
                  )}
                >
                  {p.title}
                </span>
              </button>
            ))}
          </div>

          <div className="relative flex min-h-[360px] items-center justify-center rounded-2xl border border-border-subtle bg-graphite p-10">
            <div className="relative flex w-full max-w-sm flex-col gap-3">
              {PRINCIPLES.map((p, i) => (
                <motion.div
                  key={p.title}
                  animate={{
                    opacity: active === i ? 1 : 0.35,
                    scale: active === i ? 1 : 0.97,
                  }}
                  transition={{ duration: 0.35 }}
                  className={cn(
                    "rounded-xl border px-5 py-4",
                    active === i
                      ? "border-gold/50 bg-obsidian"
                      : "border-border-subtle bg-obsidian/60",
                  )}
                >
                  <p className="text-sm font-medium text-text-primary">
                    {p.layer}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-x-10 bottom-6 top-10 -z-0 flex flex-col justify-between">
              {PRINCIPLES.map((_, i) =>
                i < PRINCIPLES.length - 1 ? (
                  <span
                    key={i}
                    className="mx-auto h-6 w-px bg-gradient-to-b from-gold-muted/50 to-transparent"
                  />
                ) : null,
              )}
            </div>
          </div>
        </div>

        <motion.p
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-10 max-w-2xl text-base leading-relaxed text-text-secondary"
        >
          <span className="text-gold-light">{PRINCIPLES[active].title}:</span>{" "}
          {PRINCIPLES[active].description}
        </motion.p>
      </Container>
    </section>
  );
}
