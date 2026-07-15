import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { StoreBadges } from './StoreBadges';
import { FloatingMock } from './solution/FloatingMock';

const IP = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };

const BENEFIT_ICONS: Record<string, React.ReactNode> = {
  prepare: <svg {...IP} width="22" height="22"><path d="m8 9-3 3 3 3M16 9l3 3-3 3M13 6l-2 12" /></svg>,
  dialer: <svg {...IP} width="22" height="22"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>,
  track: <svg {...IP} width="22" height="22"><path d="M21 12a9 9 0 1 1-3-6.7M21 4v4h-4" /><path d="m9 12 2 2 4-4" /></svg>,
};

function PhoneMock({ title, meta, callLabel }: { title: string; meta: string; callLabel: string }) {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
  return (
    <FloatingMock>
      <div className="w-[236px] rounded-[40px] bg-encre p-2.5 shadow-2xl ring-1 ring-black/10">
        <div className="overflow-hidden rounded-[32px] bg-white">
          <div className="mx-auto mt-2.5 h-1.5 w-14 rounded-full bg-encre/15" aria-hidden />
          <div className="px-5 pb-6 pt-4 text-center">
            <div className="text-xs font-medium text-sable-700">{title}</div>
            <div className="mt-5 font-mono text-[26px] font-medium tabular-nums tracking-tight text-encre">*126*1*5000#</div>
            <div className="mt-1 text-xs text-sable-500">{meta}</div>
            <div className="mx-auto mt-5 grid w-[150px] grid-cols-3 gap-x-4 gap-y-2.5" aria-hidden>
              {keys.map((k) => (
                <div key={k} className="flex h-9 items-center justify-center rounded-full bg-sable-50 font-mono text-sm text-encre">{k}</div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-center gap-2 text-serenite">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-serenite text-white shadow-lg">
                <svg {...IP} width="20" height="20" stroke="#fff"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
              </span>
              <span className="text-sm font-medium">{callLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </FloatingMock>
  );
}

export async function VirementPage() {
  const t = await getTranslations('solutions.virement');
  const steps = ['s1', 's2', 's3', 's4'] as const;
  const benefits = ['prepare', 'dialer', 'track'] as const;
  return (
    <main>
      <section className="bg-white pb-8 pt-14">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <Badge className="bg-foret-50 text-foret-700">{t('eyebrow')}</Badge>
              <h1 className="mt-4 text-4xl leading-tight text-foret-800 md:text-5xl">{t('title')}</h1>
              <p className="mt-5 max-w-md text-lg text-sable-700">{t('sub')}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-dali-full bg-or-500/15 px-3 py-1 text-xs font-medium text-or-700">MTN MoMo</span>
                <span className="rounded-dali-full bg-corail/10 px-3 py-1 text-xs font-medium text-terre">Orange Money</span>
              </div>
              <div className="mt-8"><StoreBadges /></div>
            </Reveal>
            <Reveal delay={0.1}>
              <PhoneMock title={t('mockTitle')} meta={t('mockMeta')} callLabel={t('call')} />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-foret-50 py-20 md:py-24">
        <Container>
          <Reveal>
            <h2 className="text-3xl text-encre md:text-4xl">{t('how')}</h2>
            <p className="mt-3 text-sable-700">{t('howSub')}</p>
          </Reveal>
          <div className="relative mt-12">
            <div className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-px bg-foret-300 lg:block" aria-hidden />
            <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <Reveal key={s} delay={i * 0.06}>
                  <li className="flex flex-col items-start">
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-foret-800 font-mono text-base font-medium tabular-nums text-ivoire ring-8 ring-foret-50">{i + 1}</span>
                    <p className="mt-4 text-sm font-medium leading-snug text-encre">{t(`steps.${s}`)}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-24">
        <Container>
          <Reveal>
            <h2 className="text-3xl text-encre md:text-4xl">{t('benefitsTitle')}</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b} delay={i * 0.06}>
                <div className="h-full rounded-dali-lg border border-encre/10 bg-white p-6 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-dali-md bg-foret-50 text-foret-700">
                    {BENEFIT_ICONS[b]}
                  </span>
                  <h3 className="mt-4 text-lg text-encre">{t(`features.${b}.title`)}</h3>
                  <p className="mt-2 text-sm text-sable-700">{t(`features.${b}.body`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-8 flex items-start gap-4 rounded-dali-lg bg-foret-50 p-6">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-dali-md bg-white text-foret-700">
                <svg {...IP} width="22" height="22"><path d="M12 3 5 6v5c0 5 3.5 8 7 10 3.5-2 7-5 7-10V6z" /><path d="m9 12 2 2 4-4" /></svg>
              </span>
              <div>
                <h3 className="text-base font-semibold text-encre">{t('trust.title')}</h3>
                <p className="mt-1 max-w-2xl text-sm text-sable-700">{t('trust.body')}</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-24">
        <Container>
          <div className="rounded-dali-xl bg-foret-800 px-8 py-14 text-center text-ivoire md:py-20">
            <h2 className="mx-auto max-w-2xl text-3xl md:text-4xl">{t('cta.title')}</h2>
            <p className="mx-auto mt-4 max-w-xl text-ivoire/80">{t('cta.body')}</p>
            <div className="mt-8 flex justify-center">
              <StoreBadges className="justify-center" />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
