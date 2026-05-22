'use client';

import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import { SceneSection } from './scene-section';
import { EDUCATION } from '@/data/education';

export function EducationSection() {
  return (
    <SceneSection id="education">
      <div className="flex-1 flex items-center px-6 md:px-12 py-24">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/80 mb-6 drop-shadow">
              <span className="text-emerald-300">◆</span>&nbsp;&nbsp;Chapter 04 — Roots
            </p>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-white mb-6"
              style={{ textShadow: '0 4px 24px rgba(0,0,0,0.6)' }}
            >
              Education
              <span className="text-emerald-300">.</span>
            </h2>
            <p className="text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed drop-shadow">
              Telecommunications Engineering at UC3M with an exchange year at UC
              Riverside. Two GPAs, two languages, one trajectory.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDUCATION.map((e, i) => (
              <motion.article
                key={e.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative p-7 md:p-8 rounded-md bg-black/55 backdrop-blur-md border border-white/15 hover:border-emerald-300/40 transition-colors"
              >
                <header className="mb-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2 text-emerald-300">
                      <GraduationCap className="h-4 w-4" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
                        {e.short}
                      </span>
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 whitespace-nowrap">
                      {e.period}
                    </p>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-tight mb-1">
                    {e.institution}
                  </h3>
                  <p className="text-sm text-white/80">{e.degree}</p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-white/60">
                    <MapPin className="h-3 w-3" />
                    {e.location}
                  </div>
                </header>

                <div className="mb-5 space-y-1.5">
                  {e.honors.map((h, idx) => (
                    <p key={idx} className="text-sm text-white flex gap-2 items-start">
                      <span className="text-emerald-300 select-none">★</span>
                      <span>{h}</span>
                    </p>
                  ))}
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60 mb-2">
                    Coursework
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {e.coursework.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center px-2 py-0.5 text-[11px] font-mono rounded border border-white/15 text-white/80 bg-white/5"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </SceneSection>
  );
}
