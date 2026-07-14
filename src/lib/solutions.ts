export type SolutionFeature = { k: string; id?: string; img?: string; photo?: boolean; gradient?: boolean };

export type Solution = {
  slug: string;
  key: string;
  business?: boolean;
  soon?: boolean;
  hero?: string;
  heroPhoto?: boolean;
  heroGradient?: boolean;
  features: SolutionFeature[];
};

const gradientFeatures = (keys: string[]): SolutionFeature[] => keys.map((k) => ({ k, gradient: true }));

export const SOLUTIONS: Record<string, Solution> = {
  app: {
    slug: 'app',
    key: 'app',
    hero: '/screens/comptes.webp',
    features: [
      { k: 'overview', img: '/screens/comptes.webp' },
      { k: 'assistant', id: 'assistant-ia', img: '/screens/assistant.webp' },
      { k: 'score', id: 'dali-score', img: '/screens/score.webp' },
      { k: 'budget', img: '/screens/budget.webp' },
    ],
  },
  'virement-simplifie': {
    slug: 'virement-simplifie', key: 'virement', heroGradient: true,
    features: gradientFeatures(['prepare', 'dialer', 'track']),
  },
  'echeancier-de-paiement': {
    slug: 'echeancier-de-paiement', key: 'echeancier', heroGradient: true,
    features: gradientFeatures(['goals', 'chantier', 'simulate']),
  },
  'solution-aggregation-bancaire': {
    slug: 'solution-aggregation-bancaire', key: 'aggregation', soon: true, heroGradient: true,
    features: gradientFeatures(['sources', 'sync', 'clarity']),
  },
  wealth: {
    slug: 'wealth', key: 'wealth', heroGradient: true,
    features: gradientFeatures(['total', 'assets', 'track']),
  },
  insights: {
    slug: 'insights', key: 'insights', heroGradient: true,
    features: gradientFeatures(['observe', 'personal', 'act']),
  },
  'nos-etudes': {
    slug: 'nos-etudes', key: 'etudes', soon: true, heroGradient: true,
    features: gradientFeatures(['trends', 'exclusive', 'decisions']),
  },
};

export function solutionSlugs(): string[] {
  return Object.keys(SOLUTIONS);
}
