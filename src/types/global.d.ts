import type Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
  // VanillaTilt mutates DOM elements
  interface HTMLElement {
    vanillaTilt?: { destroy: () => void };
  }
}

export {};
