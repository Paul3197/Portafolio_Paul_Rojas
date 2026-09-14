"use client";

import { motion } from "motion/react";
import {
  Building2,
  LineChart,
  Layers,
  Server,
  Database,
  Wrench,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CAPABILITIES, type Capability } from "@/lib/data";

const CAPABILITY_ICONS: Record<Capability["icon"], typeof Building2> = {
  erp: Building2,
  financial: LineChart,
  fullstack: Layers,
  backend: Server,
  database: Database,
  improvements: Wrench,
};

export function Capabilities() {
  return (
    <section id="expertise" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeading
          index="03"
          label="What I Build"
          title="From business requirements to reliable software."
        />

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => {
            const Icon = CAPABILITY_ICONS[cap.icon];
            return (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group relative bg-obsidian p-8 transition-colors hover:bg-graphite"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-subtle bg-graphite text-gold-light transition-colors group-hover:border-gold-muted/60 group-hover:bg-graphite-elevated">
                  <Icon size={19} />
                </span>
                <span className="font-mono text-xs text-gold-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-medium text-text-primary">
                {cap.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {cap.description}
              </p>
              <span className="absolute bottom-0 left-8 right-8 h-px origin-left scale-x-0 bg-gradient-to-r from-gold to-transparent transition-transform duration-300 group-hover:scale-x-100" />
            </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
