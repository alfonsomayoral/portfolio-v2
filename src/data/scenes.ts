export type SceneId = 'about' | 'projects' | 'experience' | 'education';

export interface SceneTheme {
  /** Unsplash photo CDN URL (root, no transform params). */
  photoUrl: string;
  /** Credit info — used in a tiny credit footer per scene. */
  photoBy: { name: string; url: string };
  /** Tailwind text color for body content overlaying this scene. */
  textTone: 'light' | 'dark';
  /** Whether scene needs a stronger darkening overlay for legibility. */
  overlay: 'soft' | 'medium' | 'strong';
  /** Accent color hex used for small marks (chapter dot, focus). */
  accent: string;
  /** Short label shown in the nav rail (one word). */
  navLabel: string;
}

/**
 * Photo URLs come from Unsplash CDN with their published transform syntax.
 * All photos picked are under Unsplash License (free for commercial use,
 * no attribution required — we still credit out of courtesy).
 */
export const SCENES: Record<SceneId, SceneTheme> = {
  about: {
    photoUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    photoBy: { name: 'Tobias Tullius', url: 'https://unsplash.com/@tobiastu' },
    textTone: 'light',
    overlay: 'medium',
    accent: '#cfe3ee',
    navLabel: 'About',
  },
  projects: {
    photoUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    photoBy: { name: 'Pierre Leverrier', url: 'https://unsplash.com/@pierre_leverrier' },
    textTone: 'light',
    overlay: 'strong',
    accent: '#10b981',
    navLabel: 'Projects',
  },
  experience: {
    photoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    photoBy: { name: 'Sean Oulashin', url: 'https://unsplash.com/@oulashin' },
    textTone: 'light',
    overlay: 'medium',
    accent: '#ffd29b',
    navLabel: 'Experience',
  },
  education: {
    photoUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    photoBy: { name: 'Lukasz Szmigiel', url: 'https://unsplash.com/@szmigieldesign' },
    textTone: 'light',
    overlay: 'medium',
    accent: '#a7e3a5',
    navLabel: 'Education',
  },
};
