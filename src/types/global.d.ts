import type Lenis from 'lenis';
import type { SceneId } from '@/lib/waypoints';

declare global {
  interface Window {
    __lenis?: Lenis;
    __workspaceMoveTo?: (id: SceneId) => void;
  }
  interface HTMLElement {
    vanillaTilt?: { destroy: () => void };
  }
}

export {};
