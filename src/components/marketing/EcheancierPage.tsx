import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { StoreBadges } from './StoreBadges';
import { SolutionCta } from './solution/SolutionCta';
import { FeatureCards } from './solution/FeatureCards';
import { PanelDecor } from './solution/PanelDecor';

const IP = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };

const TYPES: { k: string; icon: React.ReactNode }[] = [
  { k: 'education', icon: <svg {...IP} width="22" height="22"><path d="M3 8l9-4 9 4-9 4-9-4ZM7 10v5c0 1 2.2 2.5 5 2.5s5-1.5 5-2.5v-5M21 8v5" /></svg> },
  { k: 'chantier', icon: <svg {...IP} width="22" height="22"><path d="M3 20h18M6 20V9l6-4 6 4v11M10 20v-5h4v5" /></svg> },
  { k: 'travel', icon: <svg {...IP} width="22" height="22"><path d="M2 16l20-6-4 9-3-4-6 2-2-3 3-1-8 3z" /></svg> },
  { k: 'repay', icon: <svg {...IP} width="22" height="22"><circle cx="8" cy="12" r="5" /><path d="M13 8a5 5 0 0 1 0 8M6.5 12h3M8 10.5v3" /></svg> },
];

function GoalCard({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }) {
  return (
    <div className="relative overflow-hidden rounded-dali-xl bg-foret-50 p-5 sm:p-7">
      <PanelDecor tone="light" />
      <div className="relative z-10 rounded-dali-lg border border-encre/10 bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-wide text-sable-700">{t('mock.type')}</div>
            <div className="mt-0.5 text-lg font-semibold text-encre">{t('mock.name')}</div>
          </div>
          <span className="rounded-dali-full bg-foret-800 px-3 py-1 text-xs font-medium text-ivoire">{t('mock.builtLabel')} 62 %</span>
        </div>
        <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-sable-200" aria-hidden>
          <div className="h-full rounded-full bg-gradient-to-r from-foret-600 to-or-500" style={{ width: '62%' }} />
        </div>
        <div className="mt-2 flex justify-between text-xs tabular-nums text-sable-700">
          <span>{t('mock.savedLabel')} 6 200 000 FCFA</span>
          <span>10 000 000 FCFA</span>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-encre/10 pt-4 text-sm">
          <span className="font-mono tabular-nums text-encre">{t('mock.monthly')}</span>
          <span className="text-sable-700">{t('mock.etaLabel')} · {t('mock.eta')}</span>
        </div>
      </div>
    </div>
  );
}

export async function EcheancierPage() {
  const t = await getTranslations('solutions.echeancier');
  const benefits = ['goals', 'chantier', 'simulate'] as const;
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
            <Reveal delay={0.1}>
              <GoalCard t={t} />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-foret-50 py-20 md:py-24">
        <Container>
          <Reveal>
            <h2 className="max-w-2xl text-3xl text-encre md:text-4xl">{t('typesTitle')}</h2>
            <p className="mt-3 max-w-xl text-sable-700">{t('typesSub')}</p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TYPES.map((ty, i) => (
              <Reveal key={ty.k} delay={i * 0.05}>
                <div className="h-full rounded-dali-lg border border-encre/10 bg-white p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-dali-md bg-foret-50 text-foret-700">{ty.icon}</span>
                  <h3 className="mt-4 text-base font-semibold text-encre">{t(`types.${ty.k}.label`)}</h3>
                  <p className="mt-1.5 text-sm text-sable-700">{t(`types.${ty.k}.desc`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-24">
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
