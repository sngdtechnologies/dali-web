import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { StoreBadges } from './StoreBadges';
import { PhoneFrame } from './solution/PhoneFrame';
import { FloatingMock } from './solution/FloatingMock';
import { SolutionCta } from './solution/SolutionCta';
import { DaliScoreGauge } from './DaliScoreGauge';
import { cn } from '@/lib/utils';

function PhoneChips() {
  return (
    <>
      <div className="absolute left-0 top-12 z-20 hidden items-center gap-2 rounded-dali-md bg-white px-3 py-2 shadow-xl ring-1 ring-encre/5 sm:flex" aria-hidden>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foret-50 text-foret-700">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M16 15h2" /></svg>
        </span>
        <span className="font-mono text-sm font-semibold tabular-nums text-encre">2 458 200 FCFA</span>
      </div>
      <div className="absolute -right-1 bottom-14 z-20 hidden rounded-dali-md bg-white px-3 py-2 shadow-xl ring-1 ring-encre/5 sm:block" aria-hidden>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-or-500" />
          <span className="font-mono text-xs font-semibold tabular-nums text-serenite">+12 %</span>
        </div>
        <svg viewBox="0 0 60 20" className="mt-1 w-16" aria-hidden>
          <path d="M0 16 C12 6 22 14 34 8 S52 2 60 6" fill="none" stroke="#3A6B4E" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </>
  );
}

function FloatingPhone({ src, width = 220, rich = false }: { src: string; width?: number; rich?: boolean }) {
  return (
    <FloatingMock overlay={rich ? <PhoneChips /> : undefined}>
      <PhoneFrame src={src} width={width} />
    </FloatingMock>
  );
}

function ScreenRow({ id, src, side, title, body }: { id?: string; src: string; side: 'left' | 'right'; title: string; body: string }) {
  return (
    <section id={id} className={cn('py-20 md:py-24', side === 'right' ? 'bg-foret-50/50' : 'bg-white')}>
      <Container className="grid items-center gap-12 md:grid-cols-2">
        <Reveal className={cn(side === 'right' && 'md:order-2')}>
          <h2 className="text-3xl text-encre md:text-4xl">{title}</h2>
          <p className="mt-4 max-w-md text-lg text-sable-700">{body}</p>
        </Reveal>
        <Reveal delay={0.1} className={cn(side === 'right' && 'md:order-1')}>
          <FloatingPhone src={src} />
        </Reveal>
      </Container>
    </section>
  );
}

export async function AppPage() {
  const t = await getTranslations('solutions.app');
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
              <FloatingPhone src="/screens/comptes.webp" width={230} rich />
            </Reveal>
          </div>
        </Container>
      </section>

      <ScreenRow id="assistant-ia" src="/screens/assistant.webp" side="left" title={t('features.assistant.title')} body={t('features.assistant.body')} />

      <section id="dali-score" className="bg-white py-20 md:py-24">
        <Container className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl text-encre md:text-4xl">{t('features.score.title')}</h2>
            <p className="mt-4 max-w-md text-lg text-sable-700">{t('features.score.body')}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-dali-xl bg-foret-50 px-8 py-12">
              <DaliScoreGauge score={820} />
            </div>
          </Reveal>
        </Container>
      </section>

      <ScreenRow src="/screens/budget.webp" side="left" title={t('features.budget.title')} body={t('features.budget.body')} />

      <SolutionCta title={t('cta.title')} body={t('cta.body')} />
    </main>
  );
}
