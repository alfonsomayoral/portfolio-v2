# Content questions — fill these in before deploying for real

Every `[REQUIRES INPUT: ...]` placeholder in the codebase mapped to a
specific question, grouped by file. Answer in this file, then I (or you)
replace the placeholders with your answers.

You can answer some and skip others — the site builds either way, and
unanswered placeholders stay visible as a TODO until you replace them.

---

## src/pages/about.astro

### Outside of work (1 line)
2-3 sentences. Specific beats generic. Examples that work:
- "I run long and slow — half-marathon in Sevilla May 2026."
- "I read paper-of-the-week out loud to AISC members every Tuesday."
- "Working through every Murakami novel in publication order."

Your answer:

---

## src/content/projects/spotter.mdx

1. **Backend stack** — FastAPI + Postgres? Firebase? Supabase? Other?
2. **Payments** — RevenueCat? StoreKit direct? None yet?
3. **Analytics** — PostHog? Mixpanel? None?
4. **Metrics to share publicly** (pick any subset, omit the rest):
   - Total downloads
   - MAU / WAU
   - Day-7 / day-30 retention
   - App Store rating + review count
   - Average scans per user per week
5. **What you&apos;d do differently** — one honest reflection. Examples
   that work: scope mistakes, a feature you built and users didn&apos;t
   use, a tech choice you&apos;d reverse, an underestimated cost.
6. **App Store URL** — paste it once known.

---

## src/content/projects/tfg.mdx

1. **Ground-truth dataset construction** — how did you build it? N meals
   weighed on a calibrated scale + photographed? A public dataset? A mix?
2. **Python libraries** in the offline pipeline — PyTorch? OpenCV?
   Open3D? Mix?
3. **Reproducibility tooling** — wandb? hydra? dvc? plain make? none?
4. **Key results** — 2-3 quantitative findings. Examples:
   - Portion-volume error reduced from X% to Y% vs. baseline
   - Calibration improved across N food classes
   - End-to-end runtime: N seconds on a modern laptop
   (If results aren&apos;t final yet, say so and frame as in-progress.)
5. **What you&apos;d do differently** — one honest reflection on the
   research process.
6. **Thesis memoria PDF link** — when defended.
7. **Defense slides link** — or "available on request".

---

## src/content/projects/suntory-genai.mdx

1. **Number of distinct use cases** you led prompt engineering across.
   (Range is fine — "5+", "10-20", etc.)
2. **Cross-functional ownership** (optional) — did you also own product,
   stakeholders, rollout, mentoring? If so, brief mention.
3. **Metrics to share** (relative only, NDA-safe). Pick any subset:
   - "Reduced [generic task] from N hours to N minutes"
   - "Cost per query reduced by X% after [optimization]"
   - "Eval accuracy improved from X to Y on internal golden set"
   - "Adoption: X% of target user population active monthly"
   If everything is hard-NDA: one strong qualitative sentence works.
4. **What you&apos;d do differently** — one honest reflection. Suggested
   angles: framework vs. custom orchestrator, vector DB choice,
   evaluation timing, observability investment.

---

## src/content/projects/aisc-madrid.mdx

1. **Partner companies / labs / VC firms** you&apos;re comfortable naming.
2. **Mentorship format** — workshops? hackathon? paper-reading group?
3. **Specific community deliverable you led personally** — anything you
   want to call out.
4. **Concrete community wins** — 3-5 examples. Projects shipped by
   member teams, hackathon wins, paper presentations, job placements.
5. **Aggregate stats** — current member count, events organized to date,
   alumni placements at notable companies or graduate programs.
6. **External links** — website, LinkedIn page, Instagram, press
   coverage.
7. **What you&apos;d do differently** — honest reflection.

---

## src/content/projects/bearhack-posture.mdx

1. **N teams** in the hackathon.
2. **Pose estimation backbone** — MediaPipe? OpenPose? MoveNet?
3. **Alert delivery channel** — desktop notification? audio? web
   overlay?
4. **One-line on the slouching-detection heuristic.**

---

## src/content/blog/shipping-spotter.mdx

1. **% of scans not requiring LLM call** — what the Core ML gating
   buys you. Median latency end-to-end.
2. **Where the model gets it wrong** — favorite failure mode story.
3. **App Store submission rejections** — how many, most painful one.
4. **Cost per scan** — day-one vs. now (rough is fine).
5. **What you&apos;d do differently** — one honest reflection (can be the
   same as the Spotter case study or different).

---

## src/content/blog/building-aisc.mdx

1. **First-event anecdote** — the first event, the first speaker, the
   first time something almost fell apart. Specific story.
2. **Speakers or partner organizations** you&apos;re comfortable naming.

---

## src/content/blog/first-year-as-ai-engineer.mdx

1. **Framework used** in the orchestration layer at Suntory —
   LangChain? LlamaIndex? Custom?
2. **What this year cost you, honestly** — one-paragraph reflection on
   the trade-offs of a non-tech company, side projects sacrificed,
   parts of AI engineering you don&apos;t get to touch. Honesty here makes
   the post credible.

---

## Other things still needed (non-MDX)

- **Profile photo for About page** — `images/foto_perfil_portfolio.png`
  from the old portfolio, or `IMG_1379.JPG`? Or a new headshot?
- **LinkedIn URL** — paste exact URL. If yours has numbers/suffixes,
  edit your LinkedIn vanity URL today (it&apos;s free).
- **X / Twitter handle** — or "skip".
- **Spotter screenshots** — follow `portfolio-v2-prep/03-screenshot-script.md`,
  drop in `src/assets/projects/spotter/` when ready.
- **OG image** for social sharing — a 1200x630 PNG at `public/og-default.png`.
  Can be a simple "Alfonso Mayoral / tagline" composition. Generate later.

---

## How to use this file

When you have answers for any section, paste them inline below the
question. Then either edit the corresponding source file yourself, or
ask me to do the substitution.

Pace: aim for one MDX file per sitting. Trying to fill everything in
one batch is the failure mode — you&apos;ll write 70% and abandon. One file
done all the way is worth more than five files half-done.
