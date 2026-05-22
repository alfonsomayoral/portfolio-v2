'use client';

import { motion } from 'framer-motion';
import { SocialIcons } from '@/components/social-icons';
import { PROFILE } from '@/data/profile';

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full min-h-[70vh] bg-bg flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      <div className="absolute inset-0 spotlight pointer-events-none" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative text-center max-w-3xl"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent mb-6">
          <span>◆</span>&nbsp;&nbsp;Reach out
        </p>

        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95] text-fg mb-8">
          Building something interesting?
        </h2>

        <p className="text-base md:text-lg text-fg-secondary leading-relaxed mb-12 max-w-2xl mx-auto">
          Early-stage AI startup, Exponential Fellowship cohort, research
          collaboration, or just a conversation about shipping AI products
          in 2026 — I want to hear about it.
        </p>

        <a
          href={`mailto:${PROFILE.email}`}
          className="inline-block font-mono text-xl md:text-3xl text-fg hover:text-accent transition-colors duration-300 break-all"
          data-cursor="hover"
        >
          {PROFILE.email}
        </a>

        <div className="mt-12 flex items-center justify-center">
          <SocialIcons size="lg" />
        </div>
      </motion.div>

      <footer className="relative mt-20 flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted w-full max-w-6xl">
        <p>
          <span className="text-accent">©</span> {new Date().getFullYear()} Alfonso Mayoral · Madrid
        </p>
        <a
          href="https://github.com/alfonsomayoral/portfolio-v2"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-fg-secondary transition-colors"
          data-cursor="hover"
        >
          source.github →
        </a>
      </footer>
    </section>
  );
}
