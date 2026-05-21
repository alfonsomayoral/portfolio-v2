'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/section';
import { HudFrame } from '@/components/hud-frame';
import { AppearingText } from '@/components/appearing-text';
import { PROFILE } from '@/data/profile';

export function AboutScene() {
  return (
    <Section id="about" label="01 — Profile" fullHeight>
      <HudFrame label="//profile.read" meta="public · sig: 0xAM" className="bg-bg/70">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5">
            <AppearingText
              as="h2"
              className="text-3xl md:text-5xl font-black tracking-tight leading-tight"
            >
              Building at the intersection of AI, mobile, and community.
            </AppearingText>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-7 space-y-6"
          >
            {PROFILE.bio.map((paragraph, i) => (
              <p
                key={i}
                className="text-base md:text-lg text-fg-secondary leading-relaxed"
              >
                {paragraph}
              </p>
            ))}

            <div className="mt-10 grid grid-cols-3 gap-4 pt-8 border-t border-border/60">
              <Stat label="Location" value="Madrid" />
              <Stat label="Languages" value="ES · EN" />
              <Stat label="Looking for" value="Fall 2026" />
            </div>
          </motion.div>
        </div>
      </HudFrame>
    </Section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-hud text-[10px] uppercase tracking-[0.25em] text-fg-muted mb-2">
        {label}
      </p>
      <p className="text-base text-fg font-medium">{value}</p>
    </div>
  );
}
