'use client';

import { cn } from '@/lib/utils';

export function ArrayField<T>({
  items, onChange, renderItem, newItem, label, className,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number, onItemChange: (next: T) => void) => React.ReactNode;
  newItem: () => T;
  label?: string;
  className?: string;
}) {
  function update(i: number, next: T) {
    onChange(items.map((it, idx) => (idx === i ? next : it)));
  }
  function remove(i: number) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {label ? <span className="text-sm font-medium text-encre">{label}</span> : null}
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2 rounded-dali-md border border-encre/10 p-3">
          <div className="flex-1">{renderItem(item, i, (next) => update(i, next))}</div>
          <div className="flex flex-col gap-1">
            <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="text-xs text-sable-700 hover:text-encre disabled:opacity-30" aria-label="Monter">↑</button>
            <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="text-xs text-sable-700 hover:text-encre disabled:opacity-30" aria-label="Descendre">↓</button>
            <button type="button" onClick={() => remove(i)} className="text-xs text-terre-700 hover:underline" aria-label="Supprimer">✕</button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, newItem()])}
        className="self-start rounded-dali-full border border-encre/15 bg-white px-4 py-1.5 text-xs font-medium text-encre hover:bg-encre/5"
      >
        + Ajouter
      </button>
    </div>
  );
}
