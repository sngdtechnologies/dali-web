import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';

const svgProps = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const ICONS: Record<string, React.ReactNode> = {
  offline: (
    <svg {...svgProps}>
      <path d="M5 12.55a11 11 0 0 1 14.08 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01M2 2l20 20" />
    </svg>
  ),
  encrypted: (
    <svg {...svgProps}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  ),
  sms: (
    <svg {...svgProps}>
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5A8.38 8.38 0 0 1 4 11.5 8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z" />
    </svg>
  ),
  banks: (
    <svg {...svgProps}>
      <path d="M3 21h18M4 10h16M5 10 12 4l7 6M6 10v11M18 10v11M10 10v11M14 10v11" />
    </svg>
  ),
};

const KEYS = ['offline', 'encrypted', 'sms', 'banks'] as const;

export function TrustBadges() {
  const t = useTranslations('trust');
  return (
    <div className="border-y border-encre/10 bg-ivoire-soft py-8">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4">
        {KEYS.map((k) => (
          <div key={k} className="flex items-center gap-3">
            <span className="text-foret-600">{ICONS[k]}</span>
            <span className="text-sm font-medium text-encre">{t(k)}</span>
          </div>
        ))}
      </Container>
    </div>
  );
}
