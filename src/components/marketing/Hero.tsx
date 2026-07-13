import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { StoreBadges } from './StoreBadges';
import { ScrollIndicator } from './ScrollIndicator';

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function FloatingDashboard() {
  return (
    <div className="pointer-events-none absolute right-5 top-5 hidden w-56 rounded-dali-lg bg-white/95 p-4 text-encre shadow-xl backdrop-blur sm:block" aria-hidden>
      <div className="text-[10px] uppercase tracking-wide text-sable-700">Solde total</div>
      <div className="mt-0.5 font-serif text-2xl text-foret-800">+4 226,34 €</div>
      <svg viewBox="0 0 200 60" className="mt-2 w-full">
        <path d="M0 46 C34 22 62 50 96 30 S150 8 200 22" fill="none" stroke="#3A6B4E" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function Hero() {
  const t = useTranslations('hero');
  return (
    <section className="relative bg-white pb-24 pt-6">
      <Container>
        <div className="grid gap-5 lg:grid-cols-[1.7fr_1fr]">
          <div className="relative overflow-hidden rounded-dali-xl bg-gradient-to-br from-foret-700 to-foret-900 p-8 text-ivoire md:p-12">
            <FloatingDashboard />
            <div className="relative max-w-xl pt-44 sm:pt-28 md:pt-36">
              <Reveal>
                <h1 className="text-4xl leading-[1.1] md:text-5xl">{t('headline')}</h1>
                <p className="mt-4 max-w-md text-lg text-ivoire/80">{t('sub')}</p>
                <div id="download" className="mt-8">
                  <StoreBadges />
                </div>
              </Reveal>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-dali-xl bg-encre p-6 text-ivoire">
              <div className="relative z-10">
                <h2 className="text-xl">{t('appCard.title')}</h2>
                <p className="mt-2 max-w-[72%] text-sm text-ivoire/70">{t('appCard.desc')}</p>
              </div>
              <a href="#download" className="relative z-10 mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-or-300 hover:gap-3">
                {t('appCard.cta')} <Arrow />
              </a>
              <div className="pointer-events-none absolute -bottom-8 -right-4 w-32 rotate-3">
                <Image src="/screens/comptes.webp" alt="" width={128} height={268} className="rounded-[20px] shadow-2xl" />
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between rounded-dali-xl bg-foret-100 p-6 text-encre">
              <div>
                <h2 className="text-xl">{t('bizCard.title')}</h2>
                <p className="mt-2 text-sm text-sable-700">{t('bizCard.desc')}</p>
              </div>
              <Link href="/entreprises" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foret-700 hover:gap-3">
                {t('bizCard.cta')} <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </Container>
      <ScrollIndicator label={t('scroll')} />
    </section>
  );
}
