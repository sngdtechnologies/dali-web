export const FEATURE_KEYS = ['aggregation', 'sms', 'score', 'budgets'] as const;
export type FeatureKey = (typeof FEATURE_KEYS)[number];
