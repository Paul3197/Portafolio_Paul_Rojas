import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { BackgroundFx } from "@/components/background-fx";
import { Footer } from "@/components/footer";
import { Container } from "@/components/ui/container";
import { BlogContent } from "@/components/blog-content";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog-posts";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <div className="relative flex flex-1 flex-col">
      <BackgroundFx />
      <Navigation />
      <main className="relative z-10 flex-1 pt-40 pb-28">
        <Container>
        <div className="mx-auto max-w-[820px]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-gold-light"
          >
            <ArrowLeft size={15} />
            All articles
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="text-balance mt-4 font-serif text-4xl leading-[1.1] text-text-primary sm:text-5xl">
            {post.title}
          </h1>

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

          <div className="mt-12 border-t border-border-subtle pt-12">
            <BlogContent blocks={post.content} />
          </div>

          <div className="mt-16 flex items-center justify-between border-t border-border-subtle pt-8">
            <p className="text-sm text-text-secondary">
              Written by <span className="text-text-primary">Paul Rojas</span>
            </p>
            <Link
              href="/blog"
              className="text-sm font-medium text-gold-light transition-colors hover:text-gold"
            >
              More articles
            </Link>
          </div>
        </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
