# Embedding visualizer

## What it is

A 3D point cloud on the landing page. Each point is a project. Positions
are derived from the semantic similarity of each project's
`title + tagline + description + tech` text, embedded with OpenAI
`text-embedding-3-small` and projected from 1536d to 3d with UMAP.

Result: similar projects cluster together. Hover to see details, click to
open the case study.

## Data pipeline (build-time)

```
src/content/projects/*.mdx     scripts/mock-projects.json
  (if any exist)                 (fallback if no MDX)
            \\                      /
             \\                    /
              v                  v
       scripts/generate-embeddings.ts
              |
              +-- OPENAI_API_KEY?
              |     YES -> openai.embeddings.create(text-embedding-3-small)
              |     NO  -> deterministic sha256-seeded mock vector
              |
              v
       UMAP (1536d -> 3d, nNeighbors=5, minDist=0.3)
              |
              v
       normalize to unit cube [-1, 1]
              |
              v
       public/embeddings.json
```

The script runs automatically before every `npm run build` via the
`prebuild` script. It also runs on demand with `npm run embeddings`.

Without `OPENAI_API_KEY`, you get a working visualizer with arbitrary but
deterministic positions — fine for development, replace with real
embeddings before final deploy.

## Component (`src/components/EmbeddingVisualizer.astro`)

Vanilla three.js, no React Three Fiber. Single Astro component with an
inline `<script>` block that imports `three` (Vite handles bundling).

### Scene
- Transparent background, ambient + one directional light
- `PerspectiveCamera` (FOV 50, position (3, 2, 3))
- One `Mesh` per project: `SphereGeometry(0.05)` with HSL-shifted indigo
  material. For 5-15 projects, individual meshes are simpler than instanced
  geometry and the perf cost is negligible.

### Camera control
Custom minimal orbit controller (no OrbitControls.js dependency):
- Spherical coordinates: azimuth, polar, radius
- Pointer drag → update azimuth/polar
- Wheel → update radius (clamped to [1.8, 8])
- Touch supported via `pointer*` events (works on iPad/etc)

### Interaction
- **Hover**: Raycaster on `pointermove`. Hovered point scales 1.6x.
  Tooltip becomes visible, positioned via `vector.project(camera)` math
  in screen space.
- **Click**: navigate to `project.slug`.
- **Drag**: hides tooltip while dragging.
- **Idle**: 5s after last input, slow auto-rotation around the Y axis
  (azimuth += 0.0015 per frame ≈ one full rotation every ~70s).

### Performance
- `setPixelRatio(min(devicePixelRatio, 2))` to cap retina overhead
- `requestAnimationFrame` loop, but `renderer.render()` skipped when:
  - Component not in viewport (IntersectionObserver, threshold 0.05)
  - Tab is hidden (`document.visibilitychange`)
- `ResizeObserver` on container handles layout changes without restart

### Fallbacks
- **Mobile** (`window.matchMedia('(max-width: 768px)')`): canvas hidden,
  `#embedding-fallback` shown with a static message
- **Reduced motion** (`prefers-reduced-motion: reduce`): same fallback
- **Embeddings fetch failure**: logs error, shows fallback

## Adding a new project

When you add `src/content/projects/<slug>.mdx`, the next `npm run build`
automatically:
1. Reads the MDX frontmatter
2. Re-embeds all projects
3. Re-projects to 3D with UMAP (positions may shift slightly as the
   neighborhood changes — this is expected)
4. Writes the new `public/embeddings.json`
5. Visualizer picks it up on next page load

If you don't have an OpenAI key, the mock embedding will give you a stable
random position based on the project's text content (sha256-seeded).

## Known limitations

- **Tooltip positioning** doesn't account for tooltip width — it can clip
  the right edge of the container on small viewports. Easy fix later if
  it becomes annoying.
- **No connection lines** between nearby points (planned but skipped for
  first cut to avoid clutter).
- **No post-processing bloom** on hover — adds 100+KB and is a small
  visual gain. Skipped.
- **Three.js bundle is ~500KB.** Acceptable for a portfolio; the bundle
  is code-split out of the main page chunk via Astro's island architecture.
- **Initial UMAP positions can look clustered** when there are few
  projects (3-5). UMAP is designed for larger sets. Looks good from
  ~8 projects onward.
