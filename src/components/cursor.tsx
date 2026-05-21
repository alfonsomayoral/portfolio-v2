'use client';

import { useEffect, useRef, useState } from 'react';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const touch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(touch);
    if (touch) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    const lerp = 0.18;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = !!target.closest('a, button, [data-cursor="hover"], [role="button"]');
      setIsHovering(isInteractive);
    };

    let rafId = 0;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      ringX += (mouseX - ringX) * lerp;
      ringY += (mouseY - ringY) * lerp;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;
      }
    };
    tick();

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(16,185,129,0.8)]"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[99] rounded-full border border-accent/60 transition-[width,height,opacity,border-color] duration-300 ${
          isHovering ? 'h-12 w-12 border-accent opacity-100' : 'h-8 w-8 opacity-70'
        }`}
        aria-hidden="true"
      />
    </>
  );
}
