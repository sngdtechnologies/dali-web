import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { StoreBadges } from './StoreBadges';
import { ScrollIndicator } from './ScrollIndicator';

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Fab() {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-or-300 text-encre transition-transform duration-200 group-hover:scale-110">
      <Arrow />
    </span>
  );
}

function BizIcons() {
  const chip = 'flex h-8 w-8 items-center justify-center rounded-full bg-foret-800 text-ivoire';
  return (
    <div className="flex gap-2" aria-hidden>
      <span className={chip}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 6l6 6-6 6M5 12h14" /></svg>
      </span>
      <span className={chip}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="7" cy="12" r="2.4" /><circle cx="14" cy="7" r="2.4" /><circle cx="14" cy="17" r="2.4" /></svg>
      </span>
      <span className={chip}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="8" cy="9" r="3" /><circle cx="16" cy="14" r="3" /></svg>
      </span>
    </div>
  );
}

function FloatingDashboard() {
  return (
    <div className="pointer-events-none absolute right-5 top-5 hidden w-72 rounded-dali-lg bg-white/95 p-4 text-encre shadow-xl backdrop-blur sm:block" aria-hidden>
      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap font-serif text-xl font-medium text-foret-800">2 458 200 FCFA</span>
        <span className="shrink-0 rounded-full bg-serenite/15 px-1.5 py-0.5 text-[11px] font-semibold text-serenite">+5,68 %</span>
      </div>
      <div className="mt-0.5 text-[11px] text-sable-700">Mon patrimoine</div>
      <div className="mt-3 flex gap-2">
        <div className="flex flex-col justify-between py-1 text-[9px] text-sable-500">
          <span>6 000</span><span>0</span><span>-4 000</span>
        </div>
        <div className="relative flex-1">
          <svg viewBox="0 0 200 70" className="w-full">
            <line x1="0" y1="8" x2="200" y2="8" stroke="#E5DFD5" strokeWidth="1" strokeDasharray="3 4" />
            <line x1="0" y1="35" x2="200" y2="35" stroke="#E5DFD5" strokeWidth="1" strokeDasharray="3 4" />
            <line x1="0" y1="62" x2="200" y2="62" stroke="#E5DFD5" strokeWidth="1" strokeDasharray="3 4" />
            <path d="M0 52 C34 30 62 58 96 36 S150 14 200 26" fill="none" stroke="#3A6B4E" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="200" cy="26" r="4" fill="#3A6B4E" stroke="#fff" strokeWidth="2" />
          </svg>
          <div className="flex justify-between text-[9px] text-sable-500">
            <span>Juin</span><span>Juillet</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const t = useTranslations('hero');
  return (
    <section className="relative bg-white pb-24 pt-6">
      <Container>
        <div className="grid gap-5 lg:grid-cols-[1.7fr_1fr]">
          <div className="relative flex min-h-[480px] flex-col justify-end overflow-hidden rounded-dali-xl p-8 text-ivoire md:min-h-[540px] md:p-12">
            <Image src="/hero.webp" alt="" fill priority sizes="(max-width: 1024px) 100vw, 62vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-foret-900/95 via-foret-900/55 to-foret-800/10" />
            <FloatingDashboard />
            <div className="relative max-w-2xl">
              <Reveal>
                <h1 className="text-[2.75rem] font-medium leading-[1.02] tracking-tight md:text-6xl lg:text-[4.25rem]">{t('headline')}</h1>
                <p className="mt-5 max-w-md text-base font-medium text-ivoire/90 md:text-lg">{t('sub')}</p>
                <div id="download" className="mt-7">
                  <StoreBadges />
                </div>
              </Reveal>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="group relative flex flex-1 flex-col overflow-hidden rounded-dali-xl bg-encre p-6 text-ivoire">
              <Image src="/logo-symbol.svg" alt="" width={28} height={28} className="h-7 w-7" />
              <div className="relative z-10 mt-4">
                <h2 className="text-xl leading-snug">{t('appCard.title')}</h2>
                <p className="mt-2 max-w-[68%] text-sm text-ivoire/70">{t('appCard.desc')}</p>
              </div>
              <a href="#download" className="relative z-10 mt-auto flex items-center justify-between pt-6">
                <span className="text-sm font-medium underline decoration-1 underline-offset-4">{t('appCard.cta')}</span>
                <Fab />
              </a>
              <div className="pointer-events-none absolute -right-5 -top-3 w-24 rotate-6 md:w-28">
                <Image src="/screens/comptes.webp" alt="" width={128} height={276} className="rounded-[16px] shadow-2xl" />
              </div>
            </div>

            <Link href="/entreprises" className="group flex flex-1 flex-col overflow-hidden rounded-dali-xl bg-foret-300 p-6 text-encre">
              <BizIcons />
              <div className="mt-5">
                <h2 className="text-xl leading-snug">{t('bizCard.title')}</h2>
                <p className="mt-2 max-w-[80%] text-sm text-foret-800/80">{t('bizCard.desc')}</p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-6">
                <span className="text-sm font-medium text-foret-800 underline decoration-1 underline-offset-4">{t('bizCard.cta')}</span>
                <Fab />
              </div>
            </Link>
          </div>
        </div>
      </Container>
      <ScrollIndicator label={t('scroll')} />
    </section>
  );
}
