'use client';
import { useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={dir === 'left' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
    </svg>
  );
}

export function Carousel({
  items, ariaLabel, prevLabel, nextLabel,
}: {
  items: ReactNode[];
  ariaLabel: string;
  prevLabel: string;
  nextLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const count = items.length;
  const go = (i: number) => setIndex((i + count) % count);

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label={ariaLabel}>
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${index * 100}%` }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 30 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) go(index + 1);
            else if (info.offset.x > 60) go(index - 1);
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') go(index + 1);
            if (e.key === 'ArrowLeft') go(index - 1);
          }}
        >
          {items.map((it, i) => (
            <div key={i} className="w-full shrink-0 px-2" inert={i !== index}>
              {it}
            </div>
          ))}
        </motion.div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        <button type="button" aria-label={prevLabel} onClick={() => go(index - 1)} className="rounded-dali-full border border-encre/15 p-2 text-encre transition-colors hover:bg-encre/5">
          <Chevron dir="left" />
        </button>
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className={cn('h-2 rounded-dali-full transition-all', i === index ? 'w-6 bg-foret-700' : 'w-2 bg-encre/20 hover:bg-encre/40')}
            />
          ))}
        </div>
        <button type="button" aria-label={nextLabel} onClick={() => go(index + 1)} className="rounded-dali-full border border-encre/15 p-2 text-encre transition-colors hover:bg-encre/5">
          <Chevron dir="right" />
        </button>
      </div>
    </div>
  );
}
