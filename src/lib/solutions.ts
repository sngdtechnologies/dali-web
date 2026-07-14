export type SolutionFeature = { k: string; id?: string; img: string; photo?: boolean };

export type Solution = {
  slug: string;
  key: string;
  business?: boolean;
  hero: string;
  heroPhoto?: boolean;
  features: SolutionFeature[];
};

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
};

export function solutionSlugs(): string[] {
  return Object.keys(SOLUTIONS);
}
