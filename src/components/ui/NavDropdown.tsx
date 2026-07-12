'use client';
import { useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

type Item = { label: string; href: string };

export function NavDropdown({ label, items }: { label: string; items: Item[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 py-2 text-sm"
      >
        {label}
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className={cn('transition-transform duration-200', open && 'rotate-180')}>
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 min-w-[240px] rounded-dali-md border border-encre/10 bg-white p-2 shadow-lg">
          {items.map((it) => (
            <Link key={it.label} href={it.href} className="block rounded-dali-sm px-3 py-2 text-sm hover:bg-foret-50">
              {it.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
