import { cn } from '@/lib/utils';

const STORES = [
  { name: 'App Store', href: 'https://apps.apple.com/app/dali' },
  { name: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.example.dali' },
];

function DownloadGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" />
    </svg>
  );
}

export function StoreBadges({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {STORES.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          aria-label={s.name}
          className="inline-flex h-12 items-center gap-2 rounded-dali-md bg-encre px-4 text-ivoire transition-transform hover:-translate-y-0.5"
        >
          <DownloadGlyph />
          <span className="text-sm font-medium">{s.name}</span>
        </a>
      ))}
    </div>
  );
}
