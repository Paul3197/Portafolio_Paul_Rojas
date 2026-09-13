"use client";

import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { TECH_STACK, SOCIAL_LINKS } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeading index="05" label="About the Engineer" title="I don't just write code. I understand the system behind it." />

        <div className="mt-16 grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto w-full max-w-xs lg:mx-0"
          >
            <div className="architecture-grid relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border-subtle bg-graphite">
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-6xl text-gold/20">PR</span>
              </div>
              <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.2em] text-text-muted">
                Add portrait
              </span>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-text-secondary">
              <MapPin size={15} className="text-gold-muted" />
              Peru · Open to opportunities
            </div>

            <div className="mt-4 flex items-center gap-3">
              {SOCIAL_LINKS.github && (
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-colors hover:border-gold/50 hover:text-gold-light"
                  aria-label="GitHub"
                >
                  <GithubIcon size={17} />
                </a>
              )}
              {SOCIAL_LINKS.linkedin && (
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-colors hover:border-gold/50 hover:text-gold-light"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={17} />
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="space-y-5 text-base leading-relaxed text-text-secondary sm:text-lg">
              <p>
                I&apos;m a Full-Stack Developer focused on building business
                applications, ERP systems, and financial software.
              </p>
              <p>
                I work across the frontend and backend using React, Angular,
                TypeScript, .NET, PostgreSQL, SQL, and Docker.
              </p>
              <p>
                My approach begins with understanding the business problem,
                the workflows involved, and the technical constraints. From
                there, I build software that is reliable, maintainable, and
                designed to evolve.
              </p>
              <p>
                I care about clean architecture, thoughtful engineering
                decisions, and creating software that delivers real
                operational value.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border-subtle pt-8 sm:grid-cols-3">
              {Object.entries(TECH_STACK).map(([category, items]) => (
                <div key={category}>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gold-muted">
                    {category}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {items.map((item) => (
                      <li key={item} className="text-sm text-text-primary">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
