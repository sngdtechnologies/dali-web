import { cn } from '@/lib/utils';

const STORES = [
  { name: 'App Store', href: 'https://apps.apple.com/app/dali', img: '/badges/app-store.svg' },
  { name: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.example.dali', img: '/badges/google-play.svg' },
];

export function StoreBadges({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {STORES.map((s) => (
        <a key={s.name} href={s.href} target="_blank" rel="noreferrer" aria-label={s.name} className="inline-block transition-transform hover:-translate-y-0.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.img} alt={s.name} className="h-12 w-auto" />
        </a>
      ))}
    </div>
  );
}
