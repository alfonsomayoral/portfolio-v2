'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const SECTIONS = [
  { id: 'about', label: 'About', chapter: '01' },
  { id: 'projects', label: 'Projects', chapter: '02' },
  { id: 'experience', label: 'Experience', chapter: '03' },
  { id: 'education', label: 'Education', chapter: '04' },
  { id: 'contact', label: 'Contact', chapter: '·' },
];

export function SectionNav() {
  const [active, setActive] = useState('about');

  useEffect(() => {
    const targets = SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { threshold: [0.3, 0.5], rootMargin: '-25% 0px -25% 0px' }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.6 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Section navigation"
      className="fixed top-1/2 right-4 md:right-8 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-4 font-mono"
    >
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => handleClick(s.id)}
          data-cursor="hover"
          className="group flex items-center gap-3 outline-none"
          aria-label={`Go to ${s.label}`}
        >
          <span
            className={cn(
              'text-[10px] uppercase tracking-[0.25em] transition-all duration-300',
              active === s.id ? 'text-white opacity-100' : 'text-white/40 opacity-0 group-hover:opacity-100'
            )}
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}
          >
            {s.label}
          </span>
          <span
            className={cn(
              'text-[10px] uppercase tracking-widest transition-colors duration-300',
              active === s.id ? 'text-white' : 'text-white/40 group-hover:text-white/80'
            )}
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}
          >
            {s.chapter}
          </span>
          <span
            className={cn(
              'block h-px transition-all duration-300',
              active === s.id ? 'w-10 bg-white' : 'w-5 bg-white/40 group-hover:bg-white/80'
            )}
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
          />
        </button>
      ))}
    </nav>
  );
}
