export interface Waypoint {
  pos: [number, number, number];
  look: [number, number, number];
}

/**
 * Camera waypoints per scene. The persistent 3D workspace scene tweens
 * the camera between these as the user scrolls between sections.
 *
 * Coordinates roughly form a path that loops around a central scene.
 */
export const WAYPOINTS: Record<string, Waypoint> = {
  hero: { pos: [0, 2.4, 9], look: [0, 0.4, 0] },
  about: { pos: [-3.5, 2.6, 7], look: [0.5, 0.4, 0] },
  skills: { pos: [0, 6.5, 5.5], look: [0, 0, 0] },
  experience: { pos: [4.5, 2.2, 5], look: [0, 0.4, 0] },
  projects: { pos: [0, 1.4, 3.2], look: [0, 0.4, 0] },
  education: { pos: [-3, 3.5, -3.5], look: [0, 0.4, 0] },
  contact: { pos: [0, 5.5, -7.5], look: [0, 0.5, 0] },
};

export const SCENE_ORDER = [
  'hero',
  'about',
  'skills',
  'experience',
  'projects',
  'education',
  'contact',
] as const;

export type SceneId = (typeof SCENE_ORDER)[number];
