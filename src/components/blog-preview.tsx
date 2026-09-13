"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BLOG_POSTS } from "@/lib/blog-posts";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPreview() {
  return (
    <section id="blog" className="relative py-28 sm:py-36">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="06"
            label="Field Notes"
            title="Backend engineering, written down."
            description="Notes on architecture, APIs, and the business logic behind ERP and financial software."
          />
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium text-gold-light transition-colors hover:text-gold"
          >
            View all articles
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {BLOG_POSTS.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border-subtle bg-graphite p-8 transition-colors hover:border-gold-muted/50"
              >
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="mt-4 font-serif text-2xl leading-snug text-text-primary transition-colors group-hover:text-gold-light">
                  {post.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border-subtle px-3 py-1 text-xs text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-gold-light">
                  Read article
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
