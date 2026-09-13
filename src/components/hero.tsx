"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ArchitectureVisual } from "@/components/architecture-visual";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE_OUT },
  }),
};

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center pt-32 pb-20">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.p
              initial="hidden"
              animate="show"
              custom={0}
              variants={fadeUp}
              className="text-xs font-medium uppercase tracking-[0.3em] text-gold"
            >
              Full-Stack Developer / Software Engineer
            </motion.p>

            <motion.h1
              initial="hidden"
              animate="show"
              custom={0.1}
              variants={fadeUp}
              className="text-balance mt-6 font-serif text-5xl leading-[1.05] text-text-primary sm:text-6xl lg:text-7xl"
            >
              Building the systems
              <br />
              behind <span className="italic text-gold-light">ambitious</span>
              <br />
              businesses.
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="show"
              custom={0.22}
              variants={fadeUp}
              className="mt-8 max-w-lg text-lg leading-relaxed text-text-secondary"
            >
              I build reliable business applications, ERP systems, and
              financial software — connecting thoughtful frontend experiences
              with robust backend architecture and real-world business logic.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              custom={0.34}
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-obsidian transition-transform hover:-translate-y-0.5"
              >
                Explore My Work
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border-subtle-strong px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:border-gold/60 hover:text-gold-light"
              >
                Let&apos;s Build Something
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="show"
              custom={0.46}
              variants={fadeUp}
              className="mt-14 flex flex-col gap-1 border-t border-border-subtle pt-6 text-sm text-text-muted"
            >
              <p>ERP Systems · Financial Software · Business Applications</p>
              <p>
                Based in Peru · Open to professional opportunities and
                selected projects
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT }}
            className="flex justify-center lg:justify-end"
          >
            <ArchitectureVisual />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
