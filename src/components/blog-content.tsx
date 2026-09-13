import type { ContentBlock } from "@/lib/blog-posts";

export function BlogContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="pt-6 font-serif text-3xl leading-snug text-text-primary"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="pt-4 text-xl font-medium text-text-primary"
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p
                key={i}
                className="text-base leading-relaxed text-text-secondary sm:text-[17px]"
              >
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-3">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-base leading-relaxed text-text-secondary sm:text-[17px]"
                  >
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-gold-muted/70 py-1 pl-6 font-serif text-2xl italic leading-snug text-gold-light"
              >
                {block.text}
              </blockquote>
            );
          case "code":
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-xl border border-border-subtle bg-graphite p-5 text-sm leading-relaxed text-text-primary"
              >
                <code className="font-mono">{block.code}</code>
              </pre>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
