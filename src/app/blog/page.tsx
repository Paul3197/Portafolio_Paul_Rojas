import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { BackgroundFx } from "@/components/background-fx";
import { Footer } from "@/components/footer";
import { Container } from "@/components/ui/container";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on Clean Architecture, REST API design, and backend engineering for ERP and financial software.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <BackgroundFx />
      <Navigation />
      <main className="relative z-10 flex-1 pt-40 pb-28">
        <Container>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
            Field Notes
          </p>
          <h1 className="text-balance mt-6 max-w-2xl font-serif text-5xl leading-[1.1] text-text-primary sm:text-6xl">
            Backend engineering, written down.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
            Notes on architecture, APIs, and the business logic behind ERP
            and financial software.
          </p>

          <div className="mt-16 flex flex-col divide-y divide-border-subtle border-t border-border-subtle">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group grid gap-3 py-10 transition-colors sm:grid-cols-[140px_1fr_auto] sm:items-center sm:gap-8"
              >
                <time
                  dateTime={post.date}
                  className="text-sm text-text-muted"
                >
                  {formatDate(post.date)}
                </time>
                <div>
                  <h2 className="font-serif text-2xl text-text-primary transition-colors group-hover:text-gold-light sm:text-3xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border-subtle px-3 py-1 text-xs text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight
                  size={20}
                  className="hidden shrink-0 text-gold-light transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:block"
                />
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
