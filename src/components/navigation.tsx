"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-6",
      )}
    >
      <Container>
        <div
          className={cn(
            "flex items-center justify-between rounded-full border transition-all duration-300",
            scrolled
              ? "border-border-subtle bg-obsidian/80 px-5 py-2.5 backdrop-blur-md"
              : "border-transparent px-2 py-2",
          )}
        >
          <Link
            href="/"
            className="font-serif text-xl tracking-wide text-text-primary"
          >
            Paul<span className="text-gold">.</span>Rojas
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
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

          <Link
            href="#contact"
            className="hidden rounded-full border border-gold-muted/60 px-5 py-2 text-sm font-medium text-gold-light transition-colors hover:border-gold hover:bg-gold/10 md:inline-block"
          >
            Let&apos;s Talk
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-text-primary md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden"
          >
            <Container>
              <div className="mt-3 flex flex-col gap-1 rounded-3xl border border-border-subtle bg-graphite p-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-xl border border-gold-muted/60 px-4 py-3 text-center text-sm font-medium text-gold-light"
                >
                  Let&apos;s Talk
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
