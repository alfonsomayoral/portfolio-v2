'use client';

import Image from 'next/image';
import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { SCENES, type SceneId } from '@/data/scenes';

interface SceneSectionProps {
  id: SceneId;
  className?: string;
  children: ReactNode;
}

const OVERLAY_STRENGTH: Record<'soft' | 'medium' | 'strong', string> = {
  soft:
    'linear-gradient(to bottom, rgba(10,10,11,0.25) 0%, rgba(10,10,11,0.15) 40%, rgba(10,10,11,0.45) 100%)',
  medium:
    'linear-gradient(to bottom, rgba(10,10,11,0.45) 0%, rgba(10,10,11,0.25) 35%, rgba(10,10,11,0.6) 100%)',
  strong:
    'linear-gradient(to bottom, rgba(10,10,11,0.7) 0%, rgba(10,10,11,0.45) 30%, rgba(10,10,11,0.85) 100%)',
};

export function SceneSection({ id, className, children }: SceneSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const scene = SCENES[id];

  // Image transform params (Unsplash CDN handles auto-format + crop)
  const imgUrl = `${scene.photoUrl}?auto=format&fit=crop&w=2400&q=80`;

  return (
    <section
      ref={ref}
      id={id}
      data-scene={id}
      className={cn('relative w-full min-h-screen overflow-hidden', className)}
    >
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imgUrl}
          alt=""
          fill
          priority={id === 'about'}
          quality={85}
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Darkening overlay for text legibility */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{ background: OVERLAY_STRENGTH[scene.overlay] }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {children}
      </div>

      {/* Photo credit (tiny, bottom-right) */}
      <a
        href={scene.photoBy.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-4 z-20 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 hover:text-white/70 transition-colors"
        data-cursor="hover"
      >
        Photo · {scene.photoBy.name}
      </a>
    </section>
  );
}
