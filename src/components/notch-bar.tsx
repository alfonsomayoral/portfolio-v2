'use client';

import { useEffect, useState } from 'react';
import { SCENE_ORDER, type SceneId } from '@/lib/waypoints';

const LABELS: Record<SceneId, string> = {
  hero: 'INTRO',
  about: 'ABOUT',
  skills: 'SKILLS',
  experience: 'EXPERIENCE',
  projects: 'PROJECTS',
  education: 'EDUCATION',
  contact: 'CONTACT',
};

export function NotchBar() {
  const [active, setActive] = useState<SceneId>('hero');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = SCENE_ORDER
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id as SceneId);
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: '-15% 0px -15% 0px' }
    );
    sections.forEach((s) => io.observe(s));

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p = total > 0 ? window.scrollY / total : 0;
      setProgress(Math.max(0, Math.min(1, p)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const idx = SCENE_ORDER.indexOf(active);

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 rounded-full border border-border bg-bg/80 backdrop-blur-md px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-secondary shadow-2xl shadow-black/40"
      role="status"
      aria-live="polite"
    >
      <span className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-slow" aria-hidden="true" />
        <span className="text-fg">{LABELS[active]}</span>
      </span>
      <span className="opacity-30">/</span>
      <span className="text-fg-muted">{String(idx + 1).padStart(2, '0')} · {String(SCENE_ORDER.length).padStart(2, '0')}</span>
      <span className="opacity-30">/</span>
      <span className="text-fg-muted">{Math.round(progress * 100).toString().padStart(2, '0')}%</span>

      <span className="relative ml-1 h-px w-14 bg-border overflow-hidden">
        <span
          className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-300"
          style={{ width: `${progress * 100}%` }}
        />
      </span>
    </div>
  );
}
