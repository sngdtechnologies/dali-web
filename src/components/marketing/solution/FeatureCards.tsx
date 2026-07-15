import { Reveal } from '@/components/motion/Reveal';

export function FeatureCards({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 0.06}>
          <div className="h-full rounded-dali-lg border border-encre/10 bg-white p-6 shadow-sm">
            <h3 className="text-lg text-encre">{it.title}</h3>
            <p className="mt-2 text-sm text-sable-700">{it.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
