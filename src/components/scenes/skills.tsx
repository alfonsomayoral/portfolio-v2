'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/section';
import { SKILLS, SKILL_CATEGORIES, type Skill } from '@/data/skills';

const SkillsConstellation = dynamic(
  () => import('@/components/three/skills-constellation').then((m) => m.SkillsConstellation),
  { ssr: false, loading: () => <div className="aspect-square md:aspect-[5/4] max-w-2xl mx-auto bg-bg-elevated rounded-lg animate-pulse" /> }
);

export function SkillsScene() {
  const [hovered, setHovered] = useState<Skill | null>(null);

  const grouped = (Object.keys(SKILL_CATEGORIES) as (keyof typeof SKILL_CATEGORIES)[]).map(
    (key) => ({
      key,
      ...SKILL_CATEGORIES[key],
      skills: SKILLS.filter((s) => s.category === key),
    })
  );

  return (
    <Section id="skills" label="02 — Skills" fullHeight>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
            What I work with,<br />
            <span className="text-accent">every day.</span>
          </h2>
          <p className="text-fg-secondary leading-relaxed mb-10">
            A constellation of the technologies I ship in production. Hover a
            node to identify it, drag to rotate, sizes reflect depth.
          </p>

          <div className="space-y-5">
            {grouped.map((g) => (
              <div key={g.key}>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: g.color }}
                  />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-fg-muted">
                    {g.label}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {g.skills.map((s) => (
                    <span
                      key={s.id}
                      className={`inline-flex items-center px-2.5 py-1 text-xs font-mono rounded-md border transition-all duration-300 ${
                        hovered?.id === s.id
                          ? 'border-accent text-accent bg-accent-subtle'
                          : 'border-border text-fg-secondary bg-bg-elevated'
                      }`}
                    >
                      {s.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2 relative">
          <SkillsConstellation onHover={setHovered} />

          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="mt-6 mx-auto max-w-md p-4 rounded-md border border-border bg-bg-elevated"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-1">
                  {SKILL_CATEGORIES[hovered.category].label} · {hovered.level}
                </p>
                <p className="text-lg font-semibold text-fg mb-2">{hovered.label}</p>
                <p className="text-sm text-fg-secondary leading-relaxed">
                  {hovered.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
