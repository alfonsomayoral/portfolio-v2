'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SceneSection } from './scene-section';
import { ProjectModal } from '@/components/project-modal';
import { PROJECTS, type Project } from '@/data/projects';

export function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <SceneSection id="projects" variant="tech" overlay="both">
        <div className="flex-1 flex items-center px-6 md:px-12 py-24">
          <div className="mx-auto w-full max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-16"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent/90 mb-6">
                <span>◆</span>&nbsp;&nbsp;Chapter 02 — Work shipped
              </p>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-white mb-6">
                Projects
                <span className="text-accent">.</span>
              </h2>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                Five projects across consumer iOS, enterprise GenAI, computer
                vision research, and community. Click a card for the full case
                study.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROJECTS.map((p, i) => (
                <motion.button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setActive(p);
                    setOpen(true);
                  }}
                  data-cursor="hover"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative text-left p-6 md:p-7 rounded-md bg-black/50 backdrop-blur-md border border-accent/20 hover:border-accent/60 hover:bg-black/65 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
                      <span>{p.year}</span>
                      <span className="opacity-40">·</span>
                      <span style={{ color: p.accent }}>{p.status}</span>
                      {p.nda && (
                        <>
                          <span className="opacity-40">·</span>
                          <span className="text-amber-300">NDA</span>
                        </>
                      )}
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-white/40 group-hover:text-accent transition-colors" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed mb-5">
                    {p.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center px-2 py-0.5 text-[11px] font-mono rounded border border-accent/25 text-accent/90 bg-accent/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div
                    className="absolute inset-x-0 bottom-0 h-px"
                    style={{ background: p.accent }}
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </SceneSection>

      <ProjectModal project={active} open={open} onOpenChange={setOpen} />
    </>
  );
}
