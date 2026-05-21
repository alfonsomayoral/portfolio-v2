'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { AppearingText } from '@/components/appearing-text';
import { SocialIcons } from '@/components/social-icons';
import { PROFILE } from '@/data/profile';

export function HeroScene() {
  return (
    <section
      id="hero"
      data-scene="hero"
      className="relative w-full min-h-screen overflow-hidden flex items-center"
    >
      <div className="relative mx-auto w-full max-w-content px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8 font-hud text-[10px] uppercase tracking-[0.25em] text-fg-secondary"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-slow" />
          <span>{PROFILE.availability}</span>
        </motion.div>

        <AppearingText
          as="h1"
          className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[0.95] mb-6 text-fg"
          stagger={0.06}
        >
          {PROFILE.name}
        </AppearingText>

        <div className="max-w-2xl">
          <AppearingText
            as="p"
            className="text-xl md:text-2xl text-fg-secondary leading-relaxed mb-2"
            delay={0.2}
          >
            {PROFILE.tagline}
          </AppearingText>
          <AppearingText
            as="p"
            className="text-xl md:text-2xl text-fg leading-relaxed"
            delay={0.35}
          >
            {PROFILE.taglineSecondary}
          </AppearingText>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-wrap items-center gap-8"
        >
          <SocialIcons size="md" />
          <div className="flex items-center gap-2 font-hud text-[10px] uppercase tracking-[0.25em] text-fg-muted">
            <span className="h-px w-8 bg-fg-muted" />
            <span>{PROFILE.location}</span>
          </div>
        </motion.div>

        {/* Floating portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="hidden md:block absolute top-1/2 right-12 -translate-y-1/2"
        >
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-accent/30 blur-3xl" />
            {/* Corner brackets around portrait */}
            <span className="absolute -inset-4 pointer-events-none">
              <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-accent" />
              <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-accent" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-accent" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-accent" />
            </span>
            <Image
              src="/profile.png"
              alt={PROFILE.name}
              width={220}
              height={220}
              priority
              className="relative h-48 w-48 lg:h-56 lg:w-56 rounded-full object-cover border border-border-strong"
            />
          </div>
          <p className="mt-4 text-center font-hud text-[10px] uppercase tracking-[0.25em] text-fg-muted">
            id_alfonso · v1
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 1, delay: 1.2 },
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fg-muted"
        aria-hidden="true"
      >
        <span className="font-hud text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <ArrowDown className="h-4 w-4" />
      </motion.div>
    </section>
  );
}
