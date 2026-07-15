import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { StoreBadges } from './StoreBadges';
import { PhoneFrame } from './solution/PhoneFrame';
import { SolutionCta } from './solution/SolutionCta';
import { DaliScoreGauge } from './DaliScoreGauge';
import { cn } from '@/lib/utils';

function GradientPhone({ src, width = 220 }: { src: string; width?: number }) {
  return (
    <div className="relative flex justify-center overflow-hidden rounded-dali-xl bg-gradient-to-br from-foret-600 via-foret-800 to-foret-900 p-8 sm:p-10">
      <div className="pointer-events-none absolute -right-12 -top-10 h-44 w-44 rounded-full bg-or-500/25 blur-3xl" aria-hidden />
      <PhoneFrame src={src} width={width} />
    </div>
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
          <GradientPhone src={src} />
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
              <GradientPhone src="/screens/comptes.webp" width={230} />
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
