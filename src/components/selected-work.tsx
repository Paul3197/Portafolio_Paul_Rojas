"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PROJECTS, type Project } from "@/lib/data";

function ProjectPlaceholder({ index }: { index: string }) {
  return (
    <div className="architecture-grid relative flex h-full min-h-[260px] w-full items-center justify-center overflow-hidden rounded-2xl border border-border-subtle bg-graphite">
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent" />
      <span className="font-serif text-7xl text-white/10 sm:text-8xl">
        {index}
      </span>
      <span className="absolute bottom-4 right-4 text-[10px] uppercase tracking-[0.2em] text-text-muted">
        Add screenshot
      </span>
    </div>
  );
}

function ProjectCard({ project, i }: { project: Project; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
      className="group grid items-center gap-10 border-b border-border-subtle py-14 first:pt-0 last:border-b-0 lg:grid-cols-2 lg:gap-16"
    >
      <div className={i % 2 === 1 ? "lg:order-2" : ""}>
        <ProjectPlaceholder index={project.index} />
      </div>

      <div className={i % 2 === 1 ? "lg:order-1" : ""}>
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-gold">
          {project.category}
        </span>
        <h3 className="mt-4 font-serif text-3xl text-text-primary sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-5 leading-relaxed text-text-secondary">
          {project.description}
        </p>

        <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="flex items-center gap-2 text-sm text-text-secondary"
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-gold" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border-subtle px-3 py-1 text-xs text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.href && (
          <a
            href={project.href}
            className="mt-7 inline-flex items-center gap-1 text-sm font-medium text-gold-light transition-colors hover:text-gold"
          >
            View case study
            <ArrowUpRight size={15} />
          </a>
        )}
      </div>
    </motion.article>
  );
}

export function SelectedWork() {
  return (
    <section id="work" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeading
          index="02"
          label="Selected Work"
          title="Software designed around real business needs."
          description="A selection of applications and systems focused on operational efficiency, financial information, and maintainable software architecture."
        />

        <div className="mt-16">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} i={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
