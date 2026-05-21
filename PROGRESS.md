# Portfolio v2 — Progress

Locked decisions in `../portfolio-v2-prep/00-LOCKED-DECISIONS.md`.
Phase 0 audit in `../portfolio-v2-planning/AUDIT.md`.

---

## Phase 0 — Audit (DONE 2026-05-20)

Old portfolio at `../portfolio` is a Jekyll-rendered README using
`jekyll-theme-minimal`. No code to migrate. Will archive after v2 deploys.

---

## Phase 1 — Astro scaffold (DONE 2026-05-20)

- Astro 6.3.6 (minimal template, strict TS)
- Path alias `@/*` → `src/*`
- Tailwind v4 via `@tailwindcss/postcss` (the `@tailwindcss/vite` plugin
  hits a Rolldown resolver bug in current Astro 6; PostCSS path is stable
  and produces identical output)
- Design tokens in `src/styles/tokens.css` (dark-only)
- Global styles + Lenis CSS + reduced-motion overrides in `src/styles/global.css`
- Fonts: Inter Variable + JetBrains Mono Variable
- Base layout `BaseLayout.astro` with full SEO meta + Lenis init
- Components: `Nav`, `Footer`, `ProjectCard`, `Tag`, `Prose`
- Content collections defined: `projects`, `blog` (Astro 6 `glob` loader)
- Vercel adapter installed and wired
- Placeholder landing at `/` that demonstrates the stack works

### Known issue
- `npm audit` reports 3 high severity in `path-to-regexp` (transitive
  via `@astrojs/vercel`). Not exploitable on a static-output site.
  Will resolve when @astrojs/vercel ships a patched dep. Don't run
  `npm audit fix --force` — it would downgrade the adapter.

### Verified
- [x] `npm run build` produces `dist/` and `.vercel/output/` (4.72s, 1 page)
- [ ] `npm run dev` boots without errors (manual check before Phase 2)

---

## Phase 2 — 3D embedding visualizer (DONE 2026-05-21)

- Build-time embedding generation at `scripts/generate-embeddings.ts`
  - Reads `src/content/projects/*.mdx` if present, else
    `scripts/mock-projects.json`
  - OpenAI `text-embedding-3-small` if `OPENAI_API_KEY` is set; else
    deterministic sha256-seeded mock vectors with a loud warning
  - UMAP 1536d -> 3d, normalized to unit cube
  - Output: `public/embeddings.json`
  - Wired to `npm run embeddings` and `prebuild` hook
- Visualizer component at `src/components/EmbeddingVisualizer.astro`
  - Vanilla three.js, no R3F
  - Custom orbit controller (azimuth/polar/radius)
  - Raycaster hover with HTML tooltip overlay synced via `vector.project()`
  - Click navigates to `project.slug`
  - 5s idle -> slow Y-axis auto-rotation
  - Pauses render when off-viewport (IntersectionObserver) or tab hidden
  - Mobile (<768px) and `prefers-reduced-motion` -> static fallback
- 5 mock projects seeded: Spotter, TFG, Suntory GenAI, AISC Madrid,
  BearHack
- Landing updated to render the visualizer in the second viewport-screen
- Doc: `docs/EMBEDDING_VISUALIZER.md`

### Verified
- [x] `npm run embeddings` produces `public/embeddings.json`
- [x] `npm run build` succeeds, visualizer markup in `dist/index.html`,
      three.js bundle code-split out of main page chunk
- [ ] In-browser interaction check (manual — needs Vercel preview or
      `npm run dev`)

---

## Phase 3 — Content + design (DONE 2026-05-21, content placeholders pending)

- Landing page with: hero, embedding visualizer, featured projects,
  about preview, latest writing, CTA
- `/projects` index with grid of all 5 projects, sorted by `order`
- `/projects/[slug]` case study template via `ProjectLayout.astro`
  - Hero header, tech tags, meta row, link buttons
  - MDX body wrapped in Prose styles
  - NDA disclaimer auto-renders if `nda: true` in frontmatter
  - Related projects at bottom
- 5 project MDX files: Spotter, TFG, Suntory GenAI (NDA), AISC Madrid,
  BearHack Posture
- `/about` page with: bio, Now, Looking-for, Values (craft/service/courage),
  Experience timeline (4 entries — full work history per locked
  decisions), Education, Stack, Languages, Contact
- `/blog` index + `/blog/[slug]` posts via `BlogLayout.astro`
- 3 blog drafts (`draft: true`, hidden in production builds):
  - `shipping-spotter` — what I learned shipping an iOS app
  - `building-aisc` — building an AI student community from zero
  - `first-year-as-ai-engineer` — sanitized notes from Suntory year
- All `[REQUIRES INPUT: ...]` placeholders compiled into
  `CONTENT_QUESTIONS.md` at project root

### Verified
- [x] `npm run build` succeeds, 12 pages generated
- [ ] In-browser visual check (manual via Vercel preview or `npm run dev`)
- [ ] User fills `CONTENT_QUESTIONS.md`

---

## Phase 4 — Showcase repos (PENDING)

Three local-staged repos at `../repos-showcase/`. Push commands in
`../portfolio-v2-prep/04-repo-and-deploy-setup.md`.

---

## Phase 5 — GitHub profile (PENDING)

`alfonsomayoral/alfonsomayoral` repo with README + snake workflow.

---

## Phase 6 — Polish + deploy (PENDING)

Image optimization, Lighthouse audit, OG image generation, deploy
to Vercel, cross-linking audit.
