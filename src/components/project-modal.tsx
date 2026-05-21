'use client';

import { ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { Project } from '@/data/projects';

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <header className="space-y-3">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-fg-muted">
            <span>{project.year}</span>
            <span className="opacity-50">·</span>
            <span style={{ color: project.accent }}>{project.status}</span>
            {project.nda && (
              <>
                <span className="opacity-50">·</span>
                <span className="text-amber-400">NDA · sanitized</span>
              </>
            )}
          </div>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.tagline}</DialogDescription>
        </header>

        <section className="space-y-2 mt-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-fg-muted">
            Context
          </p>
          <p className="text-sm text-fg-secondary leading-relaxed">{project.context}</p>
        </section>

        <section className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-fg-muted">
            My role
          </p>
          <p className="text-sm text-fg">{project.role}</p>
        </section>

        <section className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-fg-muted">
            Tech
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="inline-flex items-center px-2.5 py-1 text-xs font-mono rounded-md border border-border text-fg-secondary bg-bg"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-fg-muted">
            Highlights
          </p>
          <ul className="space-y-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-2 text-sm text-fg-secondary leading-relaxed">
                <span className="font-mono select-none mt-0.5 shrink-0" style={{ color: project.accent }}>
                  →
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </section>

        {project.links.length > 0 && (
          <section className="space-y-2 pt-2 border-t border-border">
            <p className="font-mono text-[10px] uppercase tracking-widest text-fg-muted">
              Links
            </p>
            <div className="flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
                >
                  {link.label}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </section>
        )}

        {project.nda && (
          <section className="mt-2 p-4 rounded-md border border-border bg-bg text-xs text-fg-muted leading-relaxed">
            <p className="font-mono uppercase tracking-widest text-[10px] mb-1.5">
              NDA disclaimer
            </p>
            Sanitized representation of work at a private company. Product names,
            customers, absolute metrics, screenshots, and code have been mocked,
            abstracted, or omitted.
          </section>
        )}
      </DialogContent>
    </Dialog>
  );
}
