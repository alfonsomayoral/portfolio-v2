import { Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/alfonsomayoral',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/alfonsomayoral',
    icon: Linkedin,
  },
  {
    label: 'Email',
    href: 'mailto:alfonsomayoral29@gmail.com',
    icon: Mail,
  },
];

interface SocialIconsProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SocialIcons({ size = 'md', className }: SocialIconsProps) {
  const sizes = {
    sm: 'h-9 w-9',
    md: 'h-11 w-11',
    lg: 'h-14 w-14',
  };
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <ul className={cn('flex items-center gap-3', className)}>
      {SOCIALS.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            aria-label={label}
            className={cn(
              'flex items-center justify-center rounded-full border border-border bg-bg-elevated text-fg-secondary transition-all duration-300',
              'hover:border-accent hover:text-accent hover:scale-110 hover:bg-accent-subtle',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
              sizes[size]
            )}
          >
            <Icon className={iconSizes[size]} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
