import { cn } from '@/lib/utils';

type Tone = 'light' | 'dark' | 'ivoireDeep';
const toneClass: Record<Tone, string> = {
  light: 'bg-ivoire text-encre',
  dark: 'bg-foret-900 text-ivoire',
  ivoireDeep: 'bg-ivoire-deep text-encre',
};

export function Section({
  tone = 'light', className, children, id,
}: { tone?: Tone; className?: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={cn('py-20 md:py-28', toneClass[tone], className)}>
      {children}
    </section>
  );
}
