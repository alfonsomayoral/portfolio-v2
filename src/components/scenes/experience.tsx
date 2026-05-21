'use client';

import { motion } from 'framer-motion';
import { ExternalLink, MapPin } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { EXPERIENCE } from '@/data/experience';
import { cn } from '@/lib/utils';

export function ExperienceScene() {
  return (
    <Section id="experience" label="03 — Experience">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        <div className="md:col-span-5">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            From <span className="text-accent">Talentum</span> to
            <br />
            <span className="text-accent">production GenAI</span>.
          </h2>
        </div>
        <div className="md:col-span-7 md:pt-3">
          <p className="text-fg-secondary leading-relaxed">
            Four years of compounding work — internship, exchange, founding a
            student community, and shipping enterprise AI at a Fortune 500.
            Cards stack as you scroll, oldest at the bottom.
          </p>
        </div>
      </div>

      <div className="relative">
        {EXPERIENCE.map((item, i) => {
          const stickyOffset = 100 + i * 24;
          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className={cn(
                'sticky bg-bg-elevated border border-border rounded-xl p-7 md:p-10 mb-6 shadow-2xl shadow-black/40',
                'transition-shadow duration-300 hover:border-border-strong'
              )}
              style={{ top: `${stickyOffset}px` }}
            >
              <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-3">
                <div className="flex items-center gap-3">
                  <p className="font-mono text-xs uppercase tracking-widest text-fg-muted">
                    {item.period}
                  </p>
                  {item.current && (
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-slow" />
                      Current
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 font-mono text-xs text-fg-muted">
                  <MapPin className="h-3 w-3" />
                  {item.location}
                </div>
              </header>

              <h3 className="text-xl md:text-2xl font-bold text-fg mb-1">
                {item.role}
              </h3>
              <p className="text-fg-secondary text-base md:text-lg mb-4 flex items-center gap-2 flex-wrap">
                {item.orgUrl ? (
                  <a
                    href={item.orgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline inline-flex items-center gap-1"
                  >
                    {item.org}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="text-accent">{item.org}</span>
                )}
              </p>

              <p className="text-fg-secondary leading-relaxed mb-5 max-w-3xl">
                {item.summary}
              </p>

              <ul className="space-y-2 mb-6 max-w-3xl">
                {item.highlights.map((h, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 text-sm text-fg-secondary leading-relaxed"
                  >
                    <span className="font-mono text-accent select-none mt-0.5 shrink-0">
                      →
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-1 text-xs font-mono rounded-md border border-border text-fg-secondary bg-bg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
