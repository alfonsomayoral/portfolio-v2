'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const SCENES = [
  { id: 'hero', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export function SceneDock() {
  const [active, setActive] = useState<string>('hero');

  useEffect(() => {
    const sections = SCENES
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-20% 0px -20% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.4,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-3"
    >
      {SCENES.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => handleClick(s.id)}
          aria-label={`Go to ${s.label}`}
          className="group flex items-center gap-3 outline-none"
        >
          <span
            className={cn(
              'font-mono text-[10px] uppercase tracking-widest text-fg-muted opacity-0 group-hover:opacity-100 transition-opacity',
              active === s.id && 'opacity-100 text-fg'
            )}
          >
            {s.label}
          </span>
          <span
            className={cn(
              'block h-px transition-all',
              active === s.id
                ? 'w-10 bg-accent'
                : 'w-5 bg-fg-muted group-hover:w-8 group-hover:bg-fg'
            )}
          />
        </button>
      ))}
    </nav>
  );
}
