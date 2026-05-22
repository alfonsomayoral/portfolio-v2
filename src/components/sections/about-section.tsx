'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { SceneSection } from './scene-section';
import { SocialIcons } from '@/components/social-icons';
import { PROFILE } from '@/data/profile';

export function AboutSection() {
  return (
    <SceneSection id="about">
      <div className="flex-1 flex items-center px-6 md:px-12 py-24">
        <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/80 mb-6 drop-shadow-md">
              <span className="text-white">◆</span>&nbsp;&nbsp;Chapter 01 — Origin
            </p>
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tight leading-[0.85] text-white mb-8"
              style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}
            >
              Alfonso
              <br />
              Mayoral
            </h1>
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-3xl drop-shadow-lg">
              {PROFILE.tagline}
            </p>
            <p className="text-xl md:text-2xl text-white leading-relaxed mt-1 drop-shadow-lg">
              {PROFILE.taglineSecondary}
            </p>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
              <Stat label="Based in" value="Madrid" />
              <Stat label="Available" value="Fall 2026" />
              <Stat label="Spotter AI" value="On App Store" />
              <Stat label="AISC Madrid" value="500+ members" />
            </div>

            <div className="mt-10">
              <SocialIcons size="md" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-white/30 blur-3xl" />
              <Image
                src="/profile.png"
                alt={PROFILE.name}
                width={320}
                height={320}
                priority
                className="relative h-64 w-64 md:h-80 md:w-80 rounded-full object-cover border-2 border-white/70 shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-6 md:px-12 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl space-y-4 text-base md:text-lg text-white/90 leading-relaxed drop-shadow-md">
            {PROFILE.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 1, delay: 1.5 },
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll down to discover
        </span>
        <ArrowDown className="h-4 w-4" />
      </motion.div>
    </SceneSection>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/70 mb-1.5 drop-shadow">
        {label}
      </p>
      <p className="text-base md:text-lg text-white font-semibold drop-shadow-md">{value}</p>
    </div>
  );
}
