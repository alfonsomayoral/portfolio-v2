'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';
import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { PROJECTS, type Project } from '@/data/projects';
import { ProjectModal } from '@/components/project-modal';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function ProjectsScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  // Horizontal pinned scroll on desktop only
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isDesktop || prefersReduced) return;

    let ctx = gsap.context(() => {
      const totalScroll = () => track.scrollWidth - window.innerWidth + 96;

      gsap.to(track, {
        x: () => -totalScroll(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${totalScroll()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  // VanillaTilt on cards
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-tilt]');
    els.forEach((el) => {
      VanillaTilt.init(el, {
        max: 6,
        speed: 600,
        glare: true,
        'max-glare': 0.15,
        scale: 1.02,
      });
    });
    return () => {
      els.forEach((el) => {
        el.vanillaTilt?.destroy();
      });
    };
  }, []);

  const handleOpen = (project: Project) => {
    setActive(project);
    setOpen(true);
  };

  return (
    <>
      <section id="projects" data-scene="projects" className="relative w-full">
        {/* Intro block (normal flow) */}
        <div className="px-6 pt-24 md:pt-32 pb-8 max-w-content mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-muted mb-6">
            <span className="text-accent">/</span> 04 — Projects
          </p>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-8">
            <div className="md:col-span-5">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                Things I have <span className="text-accent">shipped</span>.
              </h2>
            </div>
            <div className="md:col-span-7 md:pt-3">
              <p className="text-fg-secondary leading-relaxed">
                Five projects across consumer iOS, enterprise GenAI, computer
                vision research, and community. Click a card for the full
                breakdown. On desktop the reel pins as you scroll.
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal reel container (desktop pins; mobile horizontal scroll) */}
        <div ref={containerRef} className="relative h-screen lg:overflow-hidden">
          <div
            ref={trackRef}
            className="flex h-full items-center gap-6 px-6 lg:pl-24 lg:pr-24 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none hide-scrollbar"
            style={{ touchAction: 'pan-x' }}
          >
            {PROJECTS.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={() => handleOpen(project)}
              />
            ))}
            <div className="shrink-0 w-6 lg:w-24" aria-hidden="true" />
          </div>

          {/* Progress hint on desktop */}
          <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-fg-muted">
            <span>Scroll to advance</span>
            <span className="h-px w-12 bg-fg-muted" />
          </div>
        </div>
      </section>

      <ProjectModal project={active} open={open} onOpenChange={setOpen} />
    </>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <motion.button
      data-tilt
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative shrink-0 w-[85vw] md:w-[60vw] lg:w-[36rem] h-[60vh] lg:h-[70vh] snap-center text-left rounded-2xl overflow-hidden border border-border bg-bg-elevated cursor-pointer transition-all duration-300 hover:border-border-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 100%, ${project.accent}30, transparent)`,
        }}
        aria-hidden="true"
      />

      <div className="relative flex flex-col h-full p-8 md:p-10">
        {/* Top meta */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-fg-muted">
            <span>{project.year}</span>
            <span className="opacity-40">·</span>
            <span style={{ color: project.accent }}>{project.status}</span>
            {project.nda && (
              <>
                <span className="opacity-40">·</span>
                <span className="text-amber-400">NDA</span>
              </>
            )}
          </div>
          <ArrowUpRight
            className="h-5 w-5 text-fg-muted group-hover:text-accent transition-colors duration-300"
            aria-hidden="true"
          />
        </header>

        {/* Title + tagline */}
        <h3 className="text-2xl md:text-4xl font-bold text-fg leading-tight mb-4">
          {project.title}
        </h3>
        <p className="text-base md:text-lg text-fg-secondary leading-relaxed mb-auto">
          {project.tagline}
        </p>

        {/* Tech tags */}
        <div className="mt-8 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="inline-flex items-center px-2.5 py-1 text-xs font-mono rounded-md border border-border text-fg-secondary bg-bg"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Bottom accent bar */}
        <div
          className="absolute inset-x-0 bottom-0 h-1"
          style={{ background: project.accent, opacity: 0.6 }}
          aria-hidden="true"
        />
      </div>
    </motion.button>
  );
}
