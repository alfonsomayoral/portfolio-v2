import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    hero_image: z.string().optional(),
    tech_stack: z.array(z.string()).default([]),
    role: z.string().optional(),
    year: z.union([z.number(), z.string()]).optional(),
    status: z.enum(['shipped', 'in-progress', 'archived', 'research']).default('shipped'),
    metrics: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
    links: z
      .object({
        live: z.string().url().optional(),
        repo: z.string().url().optional(),
        appstore: z.string().url().optional(),
        case_study: z.string().optional(),
      })
      .optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    nda: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pub_date: z.coerce.date(),
    updated_date: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    reading_time: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
