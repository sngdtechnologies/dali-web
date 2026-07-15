import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { StoreBadges } from './StoreBadges';
import { PanelDecor } from './solution/PanelDecor';

const IP = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };

const CLASSES: { k: string; pct: number; hex: string; icon: React.ReactNode }[] = [
  { k: 'realestate', pct: 45, hex: '#1F3A2E', icon: <svg {...IP} width="22" height="22"><path d="M3 11 12 4l9 7M5 10v10h14V10M9 20v-6h6v6" /></svg> },
  { k: 'investments', pct: 25, hex: '#C9A961', icon: <svg {...IP} width="22" height="22"><path d="M4 18 10 12l4 4 6-7M14 9h6v6" /></svg> },
  { k: 'tontine', pct: 12, hex: '#9C4D38', icon: <svg {...IP} width="22" height="22"><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0M16 6a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.6" /></svg> },
  { k: 'savings', pct: 11, hex: '#5E8C72', icon: <svg {...IP} width="22" height="22"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg> },
  { k: 'cash', pct: 7, hex: '#BFB4A6', icon: <svg {...IP} width="22" height="22"><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M16 15h2" /></svg> },
];

function conic(): string {
  let acc = 0;
  const stops = CLASSES.map((c) => {
    const seg = `${c.hex} ${acc}% ${acc + c.pct}%`;
    acc += c.pct;
    return seg;
  });
  return `conic-gradient(${stops.join(', ')})`;
}

function Dashboard({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }) {
  return (
    <div className="relative overflow-hidden rounded-dali-xl bg-foret-50 p-5 sm:p-7">
      <PanelDecor tone="light" />
      <div className="relative z-10 rounded-dali-lg border border-encre/10 bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-wide text-sable-700">{t('dashLabel')}</div>
            <div className="mt-1 font-serif text-3xl font-medium tabular-nums text-encre">12 458 200 FCFA</div>
            <div className="mt-1 text-xs font-medium text-serenite">{t('dashGain')}</div>
          </div>
          <span className="rounded-dali-full bg-serenite/15 px-2 py-1 text-xs font-semibold text-serenite">+1,5 %</span>
        </div>
        <div className="mt-6 flex items-center gap-6">
          <div className="relative h-32 w-32 shrink-0" aria-hidden>
            <div className="h-full w-full rounded-full" style={{ background: conic() }} />
            <div className="absolute inset-[24%] flex flex-col items-center justify-center rounded-full bg-white">
              <span className="font-mono text-lg font-medium tabular-nums text-encre">5</span>
              <span className="text-[10px] text-sable-700">{t('dashActifs')}</span>
            </div>
          </div>
          <ul className="flex-1 space-y-2">
            {CLASSES.map((c) => (
              <li key={c.k} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-encre">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.hex }} />
                  {t(`classes.${c.k}.label`)}
                </span>
                <span className="font-mono tabular-nums text-sable-700">{c.pct} %</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function WealthPage() {
  const t = await getTranslations('solutions.wealth');
  const benefits = ['total', 'assets', 'track'] as const;
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
              <Dashboard t={t} />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-foret-50 py-20 md:py-24">
        <Container>
          <Reveal>
            <h2 className="max-w-2xl text-3xl text-encre md:text-4xl">{t('assetsTitle')}</h2>
            <p className="mt-3 max-w-xl text-sable-700">{t('assetsSub')}</p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CLASSES.map((c, i) => (
              <Reveal key={c.k} delay={i * 0.05}>
                <div className="h-full rounded-dali-lg border border-encre/10 bg-white p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-dali-md" style={{ backgroundColor: `${c.hex}1A`, color: c.hex }}>
                    {c.icon}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-encre">{t(`classes.${c.k}.label`)}</h3>
                  <p className="mt-1.5 text-sm text-sable-700">{t(`classes.${c.k}.desc`)}</p>
                </div>
              </Reveal>
            ))}
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
                  <h3 className="text-lg text-encre">{t(`features.${b}.title`)}</h3>
                  <p className="mt-2 text-sm text-sable-700">{t(`features.${b}.body`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white pb-20 md:pb-24">
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
