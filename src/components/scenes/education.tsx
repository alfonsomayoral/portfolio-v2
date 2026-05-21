'use client';

import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { EDUCATION } from '@/data/education';

export function EducationScene() {
  return (
    <Section id="education" label="05 — Education">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
        <div className="md:col-span-5">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            <span className="text-accent">Madrid</span> to
            <br />
            <span className="text-accent">Riverside</span>, and back.
          </h2>
        </div>
        <div className="md:col-span-7 md:pt-3">
          <p className="text-fg-secondary leading-relaxed">
            Telecommunications Engineering at UC3M with an exchange year at UC
            Riverside on the Bourns College of Engineering. Two GPAs, two
            languages, one trajectory.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EDUCATION.map((e, i) => (
          <motion.article
            key={e.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative p-7 md:p-8 rounded-xl border border-border bg-bg-elevated hover:border-border-strong transition-colors duration-300"
          >
            <header className="mb-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2 text-accent">
                  <GraduationCap className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase tracking-widest">
                    {e.short}
                  </span>
                </div>
                <p className="font-mono text-xs text-fg-muted whitespace-nowrap">
                  {e.period}
                </p>
              </div>
              <h3 className="text-lg font-bold text-fg leading-tight mb-1">
                {e.institution}
              </h3>
              <p className="text-sm text-fg-secondary">{e.degree}</p>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-fg-muted">
                <MapPin className="h-3 w-3" />
                {e.location}
              </div>
            </header>

            <div className="mb-5 space-y-1.5">
              {e.honors.map((h, idx) => (
                <p
                  key={idx}
                  className="text-sm text-fg flex gap-2 items-start"
                >
                  <span className="text-accent select-none">★</span>
                  <span>{h}</span>
                </p>
              ))}
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-fg-muted mb-2">
                Relevant coursework
              </p>
              <div className="flex flex-wrap gap-1.5">
                {e.coursework.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center px-2 py-0.5 text-[11px] font-mono rounded border border-border text-fg-secondary bg-bg"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
