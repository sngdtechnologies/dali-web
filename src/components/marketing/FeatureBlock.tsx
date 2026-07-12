import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { DaliScoreGauge } from './DaliScoreGauge';
import { type FeatureKey } from './features';
import { cn } from '@/lib/utils';

const svgProps = {
  width: 64,
  height: 64,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const icons: Record<Exclude<FeatureKey, 'score'>, React.ReactNode> = {
  aggregation: (
    <svg {...svgProps}>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </svg>
  ),
  sms: (
    <svg {...svgProps}>
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5A8.38 8.38 0 0 1 4 11.5 8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z" />
      <path d="M8 10h8M8 13h5" />
    </svg>
  ),
  budgets: (
    <svg {...svgProps}>
      <path d="M12 3v18M3 12h18" opacity="0" />
      <circle cx="12" cy="12" r="9" />
      <path d="M12 12V3a9 9 0 0 1 9 9Z" fill="currentColor" opacity="0.15" />
      <path d="M12 12 6.5 17.5" />
    </svg>
  ),
};

export function FeatureBlock({ featureKey, side }: { featureKey: FeatureKey; side: 'left' | 'right' }) {
  const t = useTranslations(`features.${featureKey}`);
  const visual =
    featureKey === 'score' ? (
      <DaliScoreGauge score={820} />
    ) : (
      <div className="flex aspect-[4/3] items-center justify-center rounded-dali-xl bg-foret-50 text-foret-700" aria-hidden>
        {icons[featureKey]}
      </div>
    );
  return (
    <Container className="grid items-center gap-12 py-20 md:grid-cols-2">
      <Reveal className={cn(side === 'right' && 'md:order-2')}>
        <h2 className="font-serif text-4xl">{t('title')}</h2>
        <p className="mt-4 max-w-md text-lg text-sable-700">{t('body')}</p>
      </Reveal>
      <Reveal delay={0.1} className={cn(side === 'right' && 'md:order-1')}>
        {visual}
      </Reveal>
    </Container>
  );
}
