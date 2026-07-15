import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { StoreBadges } from './StoreBadges';
import { SolutionCta } from './solution/SolutionCta';
import { FeatureCards } from './solution/FeatureCards';

const SOURCES = [
  { name: 'MTN MoMo', value: '620 000 FCFA', hex: '#C9A961' },
  { name: 'Orange Money', value: '385 000 FCFA', hex: '#D4553A' },
  { name: 'Afriland First Bank', value: '240 000 FCFA', hex: '#2D4F3F' },
];

function SourcesCard({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }) {
  return (
    <div className="rounded-dali-xl bg-foret-50 p-5 sm:p-7">
      <div className="rounded-dali-lg border border-encre/10 bg-white p-6 shadow-xl">
        <div className="text-xs uppercase tracking-wide text-sable-700">{t('totalLabel')}</div>
        <div className="mt-1 font-serif text-3xl font-medium tabular-nums text-encre">1 245 000 FCFA</div>
        <div className="mt-5 space-y-2.5">
          {SOURCES.map((s) => (
            <div key={s.name} className="flex items-center justify-between rounded-dali-md bg-sable-50 px-4 py-3">
              <span className="flex items-center gap-2.5 text-sm text-encre">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.hex }} />
                {s.name}
              </span>
              <span className="font-mono text-sm tabular-nums text-sable-700">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function AggregationPage() {
  const t = await getTranslations('solutions.aggregation');
  const benefits = ['sources', 'sync', 'clarity'] as const;
  return (
    <main>
      <section className="bg-white pb-8 pt-14">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-foret-50 text-foret-700">{t('eyebrow')}</Badge>
                <Badge className="bg-or-500/15 text-or-700">{t('soon')}</Badge>
              </div>
              <h1 className="mt-4 text-4xl leading-tight text-foret-800 md:text-5xl">{t('title')}</h1>
              <p className="mt-5 max-w-md text-lg text-sable-700">{t('sub')}</p>
              <div className="mt-8"><StoreBadges /></div>
            </Reveal>
            <Reveal delay={0.1}>
              <SourcesCard t={t} />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-foret-50 py-20 md:py-24">
        <Container>
          <Reveal>
            <h2 className="max-w-2xl text-3xl text-encre md:text-4xl">{t('sourcesTitle')}</h2>
            <p className="mt-3 max-w-xl text-sable-700">{t('sourcesSub')}</p>
          </Reveal>
          <div className="mt-10">
            <FeatureCards items={benefits.map((b) => ({ title: t(`features.${b}.title`), body: t(`features.${b}.body`) }))} />
          </div>
        </Container>
      </section>

      <SolutionCta title={t('cta.title')} body={t('cta.body')} />
    </main>
  );
}
