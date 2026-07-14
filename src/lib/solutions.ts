export type SolutionFeature = { k: string; id?: string; img?: string; photo?: boolean; gradient?: boolean };

export type Solution = {
  slug: string;
  key: string;
  business?: boolean;
  hero?: string;
  heroPhoto?: boolean;
  heroGradient?: boolean;
  features: SolutionFeature[];
};

const businessFeatures = (keys: string[]): SolutionFeature[] => keys.map((k) => ({ k, gradient: true }));

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
    slug: 'virement-simplifie', key: 'virement', business: true, heroGradient: true,
    features: businessFeatures(['instant', 'frictionless', 'cost']),
  },
  'echeancier-de-paiement': {
    slug: 'echeancier-de-paiement', key: 'echeancier', business: true, heroGradient: true,
    features: businessFeatures(['split', 'flexible', 'transparent']),
  },
  'solution-aggregation-bancaire': {
    slug: 'solution-aggregation-bancaire', key: 'aggregation', business: true, heroGradient: true,
    features: businessFeatures(['connect', 'secure', 'integrate']),
  },
  wealth: {
    slug: 'wealth', key: 'wealth', business: true, heroGradient: true,
    features: businessFeatures(['vision', 'enriched', 'realtime']),
  },
  insights: {
    slug: 'insights', key: 'insights', business: true, heroGradient: true,
    features: businessFeatures(['labels', 'categorize', 'recurring']),
  },
  'nos-etudes': {
    slug: 'nos-etudes', key: 'etudes', business: true, heroGradient: true,
    features: businessFeatures(['trends', 'exclusive', 'decisions']),
  },
};

export function solutionSlugs(): string[] {
  return Object.keys(SOLUTIONS);
}
