export const FAQ_KEYS = ['cost', 'offline', 'sms', 'privacy', 'score', 'accounts'] as const;

export function getFaqItems(t: (key: string) => string) {
  return FAQ_KEYS.map((k) => ({ q: t(`items.${k}.q`), a: t(`items.${k}.a`) }));
}
