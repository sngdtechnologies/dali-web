'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-encre/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="text-lg">{item.q}</span>
              <span className={cn('transition-transform duration-200', isOpen && 'rotate-45')} aria-hidden>＋</span>
            </button>
            <div className={cn('grid transition-all duration-300', isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]')}>
              <div className="overflow-hidden text-sable-700">{item.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
