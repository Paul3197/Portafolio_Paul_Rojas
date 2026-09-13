import Link from "next/link";
import { Container } from "@/components/ui/container";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative border-t border-border-subtle py-12">
      <Container>
        <div className="h-px w-16 bg-gradient-to-r from-gold to-transparent" />
        <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-serif text-xl text-text-primary">
              Paul<span className="text-gold">.</span>Rojas
            </p>
            <p className="mt-2 max-w-xs text-sm text-text-secondary">
              Full-Stack Developer building ERP systems, financial software,
              and business applications.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.github && (
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-colors hover:border-gold/50 hover:text-gold-light"
                aria-label="GitHub"
              >
                <GithubIcon size={15} />
              </a>
            )}
            {SOCIAL_LINKS.linkedin && (
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-colors hover:border-gold/50 hover:text-gold-light"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={15} />
              </a>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-border-subtle pt-6 text-xs text-text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Paul Rojas. All rights reserved.</p>
          <p>Designed and built with intent.</p>
        </div>
      </Container>
    </footer>
  );
}
