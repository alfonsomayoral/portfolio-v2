'use client';

import dynamic from 'next/dynamic';
import { useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { MountainVariant } from '@/components/three/mountain-scene';

const MountainScene = dynamic(
  () => import('@/components/three/mountain-scene').then((m) => m.MountainScene),
  { ssr: false }
);

interface SceneSectionProps {
  id: string;
  variant: MountainVariant;
  overlay?: 'top-fade' | 'bottom-fade' | 'both' | 'none';
  className?: string;
  children: ReactNode;
}

const OVERLAY_GRADIENTS: Record<NonNullable<SceneSectionProps['overlay']>, string> = {
  none: '',
  'top-fade':
    'linear-gradient(to bottom, rgba(10,10,11,0.35) 0%, transparent 25%, transparent 100%)',
  'bottom-fade':
    'linear-gradient(to top, rgba(10,10,11,0.65) 0%, transparent 35%, transparent 100%)',
  both:
    'linear-gradient(to bottom, rgba(10,10,11,0.5) 0%, transparent 25%, transparent 75%, rgba(10,10,11,0.6) 100%)',
};

export function SceneSection({
  id,
  variant,
  overlay = 'both',
  className,
  children,
}: SceneSectionProps) {
  const ref = useRef<HTMLElement>(null);
  // Render the canvas only when section is near the viewport (perf)
  const inView = useInView(ref, { margin: '50% 0px 50% 0px' });

  return (
    <section
      ref={ref}
      id={id}
      data-scene={id}
      className={cn('relative w-full min-h-screen overflow-hidden', className)}
    >
      <div className="absolute inset-0 z-0">
        {inView && <MountainScene variant={variant} />}
      </div>

      {overlay !== 'none' && (
        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{ background: OVERLAY_GRADIENTS[overlay] }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {children}
      </div>
    </section>
  );
}
