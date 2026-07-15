import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { StoreBadges } from './StoreBadges';
import { SolutionCta } from './solution/SolutionCta';
import { FeatureCards } from './solution/FeatureCards';
import { PanelDecor } from './solution/PanelDecor';

const IP = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };

const TOPICS: { k: string; icon: React.ReactNode }[] = [
  { k: 'spending', icon: <svg {...IP} width="22" height="22"><path d="M4 18 10 12l4 4 6-7M14 9h6v6" /></svg> },
  { k: 'savings', icon: <svg {...IP} width="22" height="22"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg> },
  { k: 'momo', icon: <svg {...IP} width="22" height="22"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg> },
];

const BARS = [38, 62, 48, 80, 56, 72];

function ReportCard({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }) {
  return (
    <div className="relative flex justify-center overflow-hidden rounded-dali-xl bg-gradient-to-br from-foret-700 via-foret-800 to-foret-900 p-7 sm:p-10">
      <PanelDecor tone="dark" />
      <div className="relative z-10 w-full max-w-sm rounded-dali-lg bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-encre">{t('reportTitle')}</div>
          <span className="rounded-dali-full bg-foret-50 px-2.5 py-0.5 text-xs font-medium text-foret-700">{t('reportPeriod')}</span>
        </div>
        <div className="mt-6 flex h-32 items-end gap-3" aria-hidden>
          {BARS.map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: i % 2 === 0 ? '#3A6B4E' : '#C9A961' }} />
          ))}
        </div>
        <div className="mt-3 h-px w-full bg-encre/10" />
      </div>
    </div>
  );
}

export async function EtudesPage() {
  const t = await getTranslations('solutions.etudes');
  const benefits = ['trends', 'exclusive', 'decisions'] as const;
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
              <ReportCard t={t} />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-foret-50 py-20 md:py-24">
        <Container>
          <Reveal><h2 className="text-3xl text-encre md:text-4xl">{t('topicsTitle')}</h2></Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {TOPICS.map((tp, i) => (
              <Reveal key={tp.k} delay={i * 0.05}>
                <div className="h-full rounded-dali-lg border border-encre/10 bg-white p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-dali-md bg-foret-50 text-foret-700">{tp.icon}</span>
                  <h3 className="mt-4 text-base font-semibold text-encre">{t(`topics.${tp.k}.label`)}</h3>
                  <p className="mt-1.5 text-sm text-sable-700">{t(`topics.${tp.k}.desc`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <SolutionCta title={t('cta.title')} body={t('cta.body')} />
    </main>
  );
}
