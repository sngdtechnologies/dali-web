import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { StoreBadges } from './StoreBadges';
import { SolutionCta } from './solution/SolutionCta';
import { FeatureCards } from './solution/FeatureCards';
import { FloatingMock } from './solution/FloatingMock';

const SOURCES = [
  { name: 'MTN MoMo', value: '620 000 FCFA', hex: '#C9A961' },
  { name: 'Orange Money', value: '385 000 FCFA', hex: '#D4553A' },
  { name: 'Afriland First Bank', value: '240 000 FCFA', hex: '#2D4F3F' },
];

function AggregationChips({ synced, sources }: { synced: string; sources: string }) {
  return (
    <>
      <div className="absolute -left-3 -top-3 z-20 hidden items-center gap-2 rounded-dali-md bg-white px-3 py-2 shadow-xl ring-1 ring-encre/5 sm:flex" aria-hidden>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foret-50 text-foret-700">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h18M3 12h18M3 17h18" /></svg>
        </span>
        <span className="text-sm font-semibold text-encre">{sources}</span>
      </div>
      <div className="absolute -bottom-3 -right-3 z-20 hidden items-center gap-2 rounded-dali-md bg-white px-3 py-2 shadow-xl ring-1 ring-encre/5 sm:flex" aria-hidden>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-serenite/15 text-serenite">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7M21 4v4h-4" /></svg>
        </span>
        <span className="text-xs font-medium text-encre">{synced}</span>
      </div>
    </>
  );
}

function SourcesCard({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }) {
  return (
    <FloatingMock overlay={<AggregationChips synced={t('chips.synced')} sources={t('chips.sources')} />}>
      <div className="w-full rounded-dali-lg border border-encre/10 bg-white p-6 shadow-xl">
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
    </FloatingMock>
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
