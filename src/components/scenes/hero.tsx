'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { PROFILE } from '@/data/profile';
import { SocialIcons } from '@/components/social-icons';

export function HeroScene() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      orbRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section
      id="hero"
      data-scene="hero"
      className="relative w-full min-h-screen overflow-hidden grid-bg flex items-center"
    >
      {/* Ambient orb */}
      <div
        ref={orbRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
        aria-hidden="true"
      >
        <div className="h-[60vmin] w-[60vmin] rounded-full bg-accent/20 blur-[120px]" />
      </div>

      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="relative mx-auto w-full max-w-content px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse-slow" />
          <p className="font-mono text-xs text-fg-secondary uppercase tracking-wider">
            {PROFILE.availability}
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
          className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[0.95] mb-6"
        >
          {PROFILE.name.split(' ').map((word, i) => (
            <span key={i} className="block">
              {word}
            </span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl"
        >
          <p className="text-xl md:text-2xl text-fg-secondary leading-relaxed mb-2">
            {PROFILE.tagline}
          </p>
          <p className="text-xl md:text-2xl text-fg leading-relaxed">
            {PROFILE.taglineSecondary}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-wrap items-center gap-8"
        >
          <SocialIcons size="md" />

          <div className="flex items-center gap-2 font-mono text-xs text-fg-muted">
            <span className="h-px w-8 bg-fg-muted" />
            <span>{PROFILE.location}</span>
          </div>
        </motion.div>

        {/* Floating portrait — small, top-right on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden md:block absolute top-1/2 right-16 -translate-y-1/2"
        >
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-accent/30 blur-2xl" />
            <Image
              src="/profile.png"
              alt={PROFILE.name}
              width={220}
              height={220}
              priority
              className="relative h-48 w-48 lg:h-56 lg:w-56 rounded-full object-cover border border-border-strong"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { duration: 1, delay: 1.2 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fg-muted"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <ArrowDown className="h-4 w-4" />
      </motion.div>
    </section>
  );
}
