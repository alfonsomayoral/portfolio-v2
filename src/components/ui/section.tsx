import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  fullHeight?: boolean;
  label?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  fullHeight,
  label,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      data-scene={id}
      className={cn(
        'relative w-full px-6 py-24 md:py-32',
        fullHeight && 'min-h-screen flex items-center',
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-content">
        {label && (
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-muted mb-6">
            <span className="text-accent">/</span> {label}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
