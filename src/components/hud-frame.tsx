import { cn } from '@/lib/utils';

interface HudFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  meta?: string;
  variant?: 'default' | 'flush';
  children: React.ReactNode;
}

/**
 * Sci-fi corner brackets wrapper. Adds 4 L-shaped corner brackets to any
 * block to evoke a HUD/terminal aesthetic. Optional label and meta render
 * on the top-left and top-right inside the bracket grid.
 */
export function HudFrame({
  label,
  meta,
  variant = 'default',
  className,
  children,
  ...props
}: HudFrameProps) {
  return (
    <div
      className={cn(
        'relative',
        variant === 'default' && 'p-6 md:p-10 border border-border/60 bg-bg/40 backdrop-blur-sm rounded-md',
        className
      )}
      {...props}
    >
      {/* Corner brackets */}
      <span
        className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-t border-l border-accent"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute top-0 right-0 h-4 w-4 border-t border-r border-accent"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-accent"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-accent"
        aria-hidden="true"
      />

      {(label || meta) && (
        <header className="flex items-center justify-between mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-muted">
          {label && (
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
              <span>{label}</span>
            </span>
          )}
          {meta && <span className="text-fg-muted/70">{meta}</span>}
        </header>
      )}
      {children}
    </div>
  );
}
