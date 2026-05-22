'use client';

import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';
import { SceneSection } from './scene-section';
import { EXPERIENCE } from '@/data/experience';

export function ExperienceSection() {
  return (
    <SceneSection id="experience">
      <div className="flex-1 flex items-start px-6 md:px-12 py-24">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/80 mb-6 drop-shadow">
              <span className="text-amber-200">◆</span>&nbsp;&nbsp;Chapter 03 — The journey
            </p>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-white mb-6"
              style={{ textShadow: '0 4px 24px rgba(0,0,0,0.6)' }}
            >
              Work
              <br />
              experience
              <span className="text-amber-200">.</span>
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed drop-shadow">
              Four years of compounding work — internship, exchange, founding a
              student community, and shipping enterprise AI at a Fortune 500.
            </p>
          </motion.div>

          <div className="space-y-6">
            {EXPERIENCE.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative p-7 md:p-8 rounded-md bg-black/50 backdrop-blur-md border border-white/15 hover:border-white/30 transition-colors"
              >
                <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-3">
                  <div className="flex items-center gap-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/70">
                      {item.period}
                    </p>
                    {item.current && (
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-amber-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-200 animate-pulse-slow" />
                        Active
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-white/60 uppercase tracking-[0.2em]">
                    <MapPin className="h-3 w-3" />
                    {item.location}
                  </div>
                </header>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{item.role}</h3>
                <p className="text-base md:text-lg text-white/85 mb-4 flex items-center gap-2 flex-wrap">
                  {item.orgUrl ? (
                    <a
                      href={item.orgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-200 hover:underline inline-flex items-center gap-1"
                      data-cursor="hover"
                    >
                      {item.org}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="text-amber-200">{item.org}</span>
                  )}
                </p>

                <p className="text-white/85 leading-relaxed mb-5 max-w-3xl">{item.summary}</p>

                <ul className="space-y-2 mb-5 max-w-3xl">
                  {item.highlights.map((h, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-white/80 leading-relaxed">
                      <span className="font-mono text-amber-200 select-none mt-0.5 shrink-0">→</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-1 text-xs font-mono rounded-md border border-white/20 text-white/80 bg-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </SceneSection>
  );
}
