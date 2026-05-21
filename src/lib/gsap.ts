'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Sync GSAP ScrollTrigger with Lenis if present
  const lenis = window.__lenis;
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
  }
}

export { gsap, ScrollTrigger };
