/**
 * Build-time script: generate 3D embedding positions for the visualizer.
 *
 * 1. Reads projects (from src/content/projects/*.mdx if present, else mock).
 * 2. Concatenates title + tagline + description + tech into one string each.
 * 3. Embeds with OpenAI text-embedding-3-small (1536d) if OPENAI_API_KEY is
 *    set; otherwise emits a deterministic mock vector per project.
 * 4. Projects to 3D with UMAP.
 * 5. Normalizes positions to a unit cube around the origin.
 * 6. Writes public/embeddings.json.
 *
 * Usage:
 *   npm run embeddings
 *
 * Env:
 *   OPENAI_API_KEY  (optional — falls back to mock embeddings, warns loudly)
 */

import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { UMAP } from 'umap-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTENT_DIR = join(ROOT, 'src', 'content', 'projects');
const MOCK_PATH = join(ROOT, 'scripts', 'mock-projects.json');
const OUT_PATH = join(ROOT, 'public', 'embeddings.json');

const EMBED_DIM = 1536;
const EMBED_MODEL = 'text-embedding-3-small';

type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  slug: string;
  year?: number | string;
  domain?: string;
};

type EmbeddedProject = Project & { position: [number, number, number] };

async function loadProjects(): Promise<Project[]> {
  if (existsSync(CONTENT_DIR)) {
    const files = await readdir(CONTENT_DIR);
    const mdxFiles = files.filter((f) => f.endsWith('.mdx'));
    if (mdxFiles.length > 0) {
      console.log(`Reading ${mdxFiles.length} MDX project files from ${CONTENT_DIR}`);
      return Promise.all(
        mdxFiles.map(async (f) => {
          const raw = await readFile(join(CONTENT_DIR, f), 'utf-8');
          return parseFrontmatter(raw, f.replace(/\.mdx$/, ''));
        })
      );
    }
  }

  console.log(`No MDX projects found. Falling back to ${MOCK_PATH}`);
  const raw = await readFile(MOCK_PATH, 'utf-8');
  return JSON.parse(raw) as Project[];
}

function parseFrontmatter(raw: string, fallbackId: string): Project {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error(`Missing frontmatter in ${fallbackId}.mdx`);
  const fm = match[1];

  const get = (key: string): string => {
    const re = new RegExp(`^${key}:\\s*['"]?(.+?)['"]?$`, 'm');
    const m = fm.match(re);
    return m ? m[1].trim() : '';
  };

  const getArray = (key: string): string[] => {
    const re = new RegExp(`^${key}:\\s*\\[(.+?)\\]`, 'm');
    const m = fm.match(re);
    if (!m) return [];
    return m[1].split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, ''));
  };

  return {
    id: fallbackId,
    title: get('title') || fallbackId,
    tagline: get('tagline'),
    description: get('description'),
    tech: getArray('tech_stack'),
    slug: `/projects/${fallbackId}`,
    year: get('year'),
  };
}

function projectText(p: Project): string {
  return [p.title, p.tagline, p.description, p.tech.join(' ')].filter(Boolean).join(' — ');
}

/** Deterministic pseudo-random vector seeded from input string. */
function mockEmbedding(text: string): number[] {
  const seedHash = createHash('sha256').update(text).digest();
  const vec = new Array<number>(EMBED_DIM);
  for (let i = 0; i < EMBED_DIM; i++) {
    const byte = seedHash[i % seedHash.length];
    const shift = Math.floor(i / seedHash.length);
    vec[i] = ((byte + shift * 13) % 256) / 256 - 0.5;
  }
  return vec;
}

async function realEmbedding(texts: string[]): Promise<number[][]> {
  const { default: OpenAI } = await import('openai');
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.embeddings.create({
    model: EMBED_MODEL,
    input: texts,
  });
  return response.data.map((d) => d.embedding);
}

function normalizeToUnitCube(positions: number[][]): [number, number, number][] {
  const dims = 3;
  const mins = new Array(dims).fill(Infinity);
  const maxs = new Array(dims).fill(-Infinity);

  for (const p of positions) {
    for (let d = 0; d < dims; d++) {
      if (p[d] < mins[d]) mins[d] = p[d];
      if (p[d] > maxs[d]) maxs[d] = p[d];
    }
  }

  return positions.map((p) => {
    const out: number[] = [];
    for (let d = 0; d < dims; d++) {
      const range = maxs[d] - mins[d] || 1;
      const centered = (p[d] - mins[d]) / range; // [0,1]
      out.push(centered * 2 - 1); // [-1, 1]
    }
    return out as [number, number, number];
  });
}

async function main() {
  const projects = await loadProjects();
  const texts = projects.map(projectText);
  console.log(`Loaded ${projects.length} projects.`);

  let vectors: number[][];
  if (process.env.OPENAI_API_KEY) {
    console.log(`Embedding via OpenAI ${EMBED_MODEL}...`);
    vectors = await realEmbedding(texts);
  } else {
    console.warn('');
    console.warn('================================================================');
    console.warn('  OPENAI_API_KEY not set — using DETERMINISTIC MOCK EMBEDDINGS.');
    console.warn('  The visualizer will work, but cluster positions are arbitrary.');
    console.warn('  Set OPENAI_API_KEY in .env to generate real semantic positions.');
    console.warn('================================================================');
    console.warn('');
    vectors = texts.map(mockEmbedding);
  }

  console.log(`Projecting ${vectors.length} × ${vectors[0].length}d to 3D via UMAP...`);
  const umap = new UMAP({
    nComponents: 3,
    nNeighbors: Math.min(vectors.length - 1, 5),
    minDist: 0.3,
    spread: 1.0,
  });
  const raw3d = umap.fit(vectors);
  const positions = normalizeToUnitCube(raw3d);

  const embedded: EmbeddedProject[] = projects.map((p, i) => ({
    ...p,
    position: positions[i],
  }));

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(embedded, null, 2), 'utf-8');
  console.log(`Wrote ${embedded.length} embedded projects to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error('Embedding generation failed:', err);
  process.exit(1);
});
