import { cn } from '@/lib/utils';

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-dali-full bg-foret-50 px-3 py-1 text-xs font-medium text-foret-700', className)}>
      {children}
    </span>
  );
}
