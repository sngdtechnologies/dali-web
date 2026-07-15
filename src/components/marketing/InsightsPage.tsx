import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { StoreBadges } from './StoreBadges';
import { SolutionCta } from './solution/SolutionCta';
import { FeatureCards } from './solution/FeatureCards';

function Spark() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v3M12 18v3M4.2 4.2l2 2M17.8 17.8l2 2M3 12h3M18 12h3M4.2 19.8l2-2M17.8 6.2l2-2" />
    </svg>
  );
}

function InsightCard({ t, k, delay }: { t: Awaited<ReturnType<typeof getTranslations>>; k: string; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="rounded-dali-lg border border-encre/10 bg-white p-5 shadow-lg">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-foret-700">
          <Spark /> {t('obsLabel')}
        </div>
        <p className="mt-2 text-encre">{t(`${k}.text`)}</p>
        <div className="mt-3 rounded-dali-md bg-foret-50 p-3 text-sm text-foret-800">
          <span className="font-semibold">{t('sugLabel')} · </span>{t(`${k}.sug`)}
        </div>
      </div>
    </Reveal>
  );
}

export async function InsightsPage() {
  const t = await getTranslations('solutions.insights');
  const benefits = ['observe', 'personal', 'act'] as const;
  return (
    <main>
      <section className="bg-white pb-8 pt-14">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <Badge className="bg-foret-50 text-foret-700">{t('eyebrow')}</Badge>
              <h1 className="mt-4 text-4xl leading-tight text-foret-800 md:text-5xl">{t('title')}</h1>
              <p className="mt-5 max-w-md text-lg text-sable-700">{t('sub')}</p>
              <div className="mt-8"><StoreBadges /></div>
            </Reveal>
            <div className="flex flex-col gap-4">
              <InsightCard t={t} k="insight1" delay={0.1} />
              <InsightCard t={t} k="insight2" delay={0.2} />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-foret-50 py-20 md:py-24">
        <Container>
          <Reveal><h2 className="text-3xl text-encre md:text-4xl">{t('benefitsTitle')}</h2></Reveal>
          <div className="mt-10">
            <FeatureCards items={benefits.map((b) => ({ title: t(`features.${b}.title`), body: t(`features.${b}.body`) }))} />
          </div>
        </Container>
      </section>

      <SolutionCta title={t('cta.title')} body={t('cta.body')} />
    </main>
  );
}
