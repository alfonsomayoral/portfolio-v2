import type Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
  interface HTMLElement {
    vanillaTilt?: { destroy: () => void };
  }
}

export {};
