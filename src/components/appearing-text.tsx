'use client';

import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AppearingTextProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: '120%' },
  visible: { opacity: 1, y: '0%' },
};

export function AppearingText({
  children,
  className,
  delay = 0,
  stagger = 0.04,
  as = 'p',
}: AppearingTextProps) {
  const words = children.split(/(\s+)/);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const inner = words.map((word, i) =>
    word.match(/^\s+$/) ? (
      <span key={i}>{word}</span>
    ) : (
      <span
        key={i}
        className="inline-block overflow-hidden align-bottom leading-[1.1]"
      >
        <motion.span
          variants={wordVariants}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          className="inline-block"
        >
          {word}
        </motion.span>
      </span>
    )
  );

  const common = {
    className: cn(className),
    variants: containerVariants,
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, margin: '-15%' },
  } as const;

  switch (as) {
    case 'h1':
      return <motion.h1 {...common}>{inner}</motion.h1>;
    case 'h2':
      return <motion.h2 {...common}>{inner}</motion.h2>;
    case 'h3':
      return <motion.h3 {...common}>{inner}</motion.h3>;
    case 'span':
      return <motion.span {...common}>{inner}</motion.span>;
    case 'div':
      return <motion.div {...common}>{inner}</motion.div>;
    case 'p':
    default:
      return <motion.p {...common}>{inner}</motion.p>;
  }
}
