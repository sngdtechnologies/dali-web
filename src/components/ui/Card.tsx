import { cn } from '@/lib/utils';

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('rounded-dali-lg border border-encre/10 bg-white p-6 shadow-sm', className)}>
      {children}
    </div>
  );
}
