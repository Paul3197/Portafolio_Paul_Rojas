"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GithubIcon } from "@/components/icons";
import { SOCIAL_LINKS } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-border-subtle bg-graphite px-8 py-16 sm:px-16 sm:py-20"
        >
          <div className="architecture-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />

          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Let&apos;s Build Something Meaningful
            </p>
            <h2 className="text-balance mt-6 font-serif text-4xl leading-tight text-text-primary sm:text-5xl">
              Have a complex business problem?
              <br />
              Let&apos;s turn it into reliable software.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-text-secondary sm:text-lg">
              Whether you&apos;re building an ERP, financial platform, SaaS
              product, or custom business application, let&apos;s discuss the
              requirements, the architecture, and the best way to approach
              the project.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-obsidian transition-transform hover:-translate-y-0.5"
              >
                Start a Conversation
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              {SOCIAL_LINKS.github && (
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border-subtle-strong px-7 py-3 text-sm font-medium text-text-primary transition-colors hover:border-gold/60 hover:text-gold-light"
                >
                  <GithubIcon size={16} />
                  View My GitHub
                </a>
              )}
            </div>

            <p className="mt-6 text-sm text-text-muted">
              Or write directly to{" "}
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="text-gold-light transition-colors hover:text-gold"
              >
                {SOCIAL_LINKS.email}
              </a>
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
