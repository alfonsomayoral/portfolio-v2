'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/section';
import { HudFrame } from '@/components/hud-frame';
import { AppearingText } from '@/components/appearing-text';
import { SocialIcons } from '@/components/social-icons';
import { PROFILE } from '@/data/profile';

export function ContactScene() {
  return (
    <Section id="contact" label="06 — Contact.signal" className="pb-20">
      <HudFrame
        label="//signal.open"
        meta="ready · listening"
        className="bg-bg-elevated/80 backdrop-blur-md p-10 md:p-20"
      >
        <div className="absolute inset-0 spotlight pointer-events-none" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="relative text-center max-w-3xl mx-auto"
        >
          <p className="font-hud text-xs uppercase tracking-[0.25em] text-accent mb-6">
            Let&apos;s build something
          </p>

          <AppearingText
            as="h2"
            className="text-4xl md:text-7xl font-black tracking-tight leading-[0.95] mb-8"
            stagger={0.05}
          >
            Building something interesting?
          </AppearingText>

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
      </HudFrame>

      <footer className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-hud text-[10px] uppercase tracking-[0.25em] text-fg-muted">
        <div>
          <p>
            <span className="text-accent">©</span> {new Date().getFullYear()} Alfonso Mayoral · Madrid
          </p>
          <p className="mt-1 opacity-70 normal-case tracking-normal font-mono">
            Built with Next.js, Tailwind, GSAP, and three.js.
          </p>
        </div>
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
    </Section>
  );
}
