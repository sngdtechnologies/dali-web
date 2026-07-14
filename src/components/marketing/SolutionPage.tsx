import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { StoreBadges } from './StoreBadges';
import { cn } from '@/lib/utils';
import type { Solution } from '@/lib/solutions';

function Visual({ img, photo }: { img: string; photo?: boolean }) {
  if (photo) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-dali-xl">
        <Image src={img} alt="" fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" />
      </div>
    );
  }
  return (
    <div className="flex justify-center rounded-dali-xl bg-foret-50 p-8">
      <div className="relative aspect-[9/19] w-[220px] overflow-hidden rounded-[28px] bg-foret-900 shadow-2xl ring-1 ring-black/5">
        <Image src={img} alt="" fill sizes="220px" className="object-cover object-top" />
      </div>
    </div>
  );
}

export async function SolutionPage({ solution }: { solution: Solution }) {
  const t = await getTranslations(`solutions.${solution.key}`);
  const cta = solution.business ? (
    <Button href="mailto:contact@dali.app">{t('ctaBtn')}</Button>
  ) : (
    <StoreBadges />
  );
  return (
    <main>
      <section className="bg-white pb-8 pt-14">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <Badge className="bg-foret-50 text-foret-700">{t('eyebrow')}</Badge>
              <h1 className="mt-4 text-4xl leading-tight text-foret-800 md:text-5xl">{t('title')}</h1>
              <p className="mt-5 max-w-md text-lg text-sable-700">{t('sub')}</p>
              <div className="mt-8">{cta}</div>
            </Reveal>
            <Reveal delay={0.1}>
              <Visual img={solution.hero} photo={solution.heroPhoto} />
            </Reveal>
          </div>
        </Container>
      </section>

      {solution.features.map((f, i) => (
        <section key={f.k} id={f.id} className={cn('py-20 md:py-24', i % 2 === 1 ? 'bg-foret-50/40' : 'bg-white')}>
          <Container className="grid items-center gap-12 md:grid-cols-2">
            <Reveal className={cn(i % 2 === 1 && 'md:order-2')}>
              <h2 className="text-3xl text-encre md:text-4xl">{t(`features.${f.k}.title`)}</h2>
              <p className="mt-4 max-w-md text-lg text-sable-700">{t(`features.${f.k}.body`)}</p>
            </Reveal>
            <Reveal delay={0.1} className={cn(i % 2 === 1 && 'md:order-1')}>
              <Visual img={f.img} photo={f.photo} />
            </Reveal>
          </Container>
        </section>
      ))}

      <section className="bg-white py-20 md:py-24">
        <Container>
          <div className="rounded-dali-xl bg-foret-800 px-8 py-14 text-center text-ivoire md:py-20">
            <h2 className="mx-auto max-w-2xl text-3xl md:text-4xl">{t('cta.title')}</h2>
            <p className="mx-auto mt-4 max-w-xl text-ivoire/80">{t('cta.body')}</p>
            <div className="mt-8 flex justify-center">
              {solution.business ? (
                <Button variant="secondary" href="mailto:contact@dali.app">{t('ctaBtn')}</Button>
              ) : (
                <StoreBadges className="justify-center" />
              )}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
