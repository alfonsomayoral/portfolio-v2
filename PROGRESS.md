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

## Phase 2 — 3D embedding visualizer (NEXT)

Per locked decisions: build-time embedding gen with OpenAI fallback to
mock, three.js point cloud, lazy-loaded, mobile fallback, reduced-motion
fallback.

---

## Phase 3 — Content + design (PENDING)

Landing sections, projects index, case study template, About page,
3 blog drafts. Content questions tracked in
`../portfolio-v2-prep/01-project-descriptions.md`.

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
