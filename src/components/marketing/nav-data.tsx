import type { ReactNode } from 'react';

type TFn = (key: string) => string;

export type MegaItem = { label: string; desc: string; href: string; icon: ReactNode; badge?: string };
export type MegaColumn = { title: string; tagline: string; items: MegaItem[] };
export type MegaPromo = { title: string; desc: string; badge: string; href: string; image?: string };
export type NavMenu =
  | { key: string; label: string; layout: 'columns'; columns: MegaColumn[] }
  | { key: string; label: string; layout: 'grid'; items: MegaItem[]; promo?: MegaPromo };

const P = {
  width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true,
};

const icons: Record<string, ReactNode> = {
  app: <svg {...P}><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>,
  ai: <svg {...P}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" /></svg>,
  score: <svg {...P}><path d="M3 12a9 9 0 0 1 18 0" /><path d="M12 12l4-2" /></svg>,
  transfer: <svg {...P}><path d="M3 8h14l-3-3M21 16H7l3 3" /></svg>,
  calendar: <svg {...P}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></svg>,
  accounts: <svg {...P}><path d="M12 3 3 8l9 5 9-5-9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" /></svg>,
  wealth: <svg {...P}><path d="M12 3l3 5 6 .9-4.5 4.2 1 6-5.5-3-5.5 3 1-6L3 8.9 9 8z" /></svg>,
  insights: <svg {...P}><path d="M4 20V10M10 20V4M16 20v-7M22 20V8" /></svg>,
  study: <svg {...P}><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M8 7h7M8 11h7" /></svg>,
  budget: <svg {...P}><circle cx="12" cy="12" r="9" /><path d="M12 12V3a9 9 0 0 1 9 9zM12 12 6.5 17.5" /></svg>,
  target: <svg {...P}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>,
  qr: <svg {...P}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3M21 14v7h-7" /></svg>,
  cart: <svg {...P}><path d="M3 4h2l2.5 12h10l2-8H6" /><circle cx="9" cy="20" r="1" /><circle cx="17" cy="20" r="1" /></svg>,
  shield: <svg {...P}><path d="M12 3 5 6v5c0 5 3.5 8 7 10 3.5-2 7-5 7-10V6z" /></svg>,
  faq: <svg {...P}><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .8-1 1.7M12 17h.01" /></svg>,
  help: <svg {...P}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>,
  blog: <svg {...P}><path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5" /></svg>,
  team: <svg {...P}><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0M16 6a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.6" /></svg>,
  event: <svg {...P}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4M9 14l2 2 4-4" /></svg>,
  star: <svg {...P}><path d="M12 3l2.5 6H21l-5 4 2 7-6-4-6 4 2-7-5-4h6.5z" /></svg>,
};

export function getNavMenus(t: TFn): NavMenu[] {
  const m = (k: string) => `mega.${k}`;
  const item = (k: string, href: string, icon: ReactNode, badge?: string): MegaItem => ({
    label: t(`${k}.label`), desc: t(`${k}.desc`), href, icon, badge,
  });
  const soon = t(m('soon'));
  return [
    {
      key: 'solutions', label: t('solutions'), layout: 'columns',
      columns: [
        {
          title: t(m('solutions.app.title')), tagline: t(m('solutions.app.tagline')),
          items: [
            item(m('solutions.app.i1'), '/solutions/app', icons.app),
            item(m('solutions.app.i2'), '/solutions/app#assistant-ia', icons.ai),
            item(m('solutions.app.i3'), '/solutions/app#dali-score', icons.score),
          ],
        },
        {
          title: t(m('solutions.payments.title')), tagline: t(m('solutions.payments.tagline')),
          items: [
            item(m('solutions.payments.i1'), '/solutions/virement-simplifie', icons.transfer),
            item(m('solutions.payments.i2'), '/solutions/echeancier-de-paiement', icons.calendar),
          ],
        },
        {
          title: t(m('solutions.data.title')), tagline: t(m('solutions.data.tagline')),
          items: [
            item(m('solutions.data.i1'), '/solutions/solution-aggregation-bancaire', icons.accounts, soon),
            item(m('solutions.data.i2'), '/solutions/wealth', icons.wealth),
            item(m('solutions.data.i3'), '/solutions/insights', icons.insights),
          ],
        },
        {
          title: t(m('solutions.observatory.title')), tagline: t(m('solutions.observatory.tagline')),
          items: [item(m('solutions.observatory.i1'), '/solutions/nos-etudes', icons.study, soon)],
        },
      ],
    },
    {
      key: 'usecases', label: t('usecases'), layout: 'grid',
      items: [
        item(m('usecases.i1'), '/fonctionnalites', icons.budget),
        item(m('usecases.i2'), '/fonctionnalites', icons.accounts),
        item(m('usecases.i3'), '/fonctionnalites', icons.transfer),
        item(m('usecases.i4'), '/fonctionnalites', icons.target),
        item(m('usecases.i5'), '/entreprises', icons.qr),
        item(m('usecases.i6'), '/entreprises', icons.cart),
      ],
      promo: { title: t(m('usecases.promo.title')), desc: t(m('usecases.promo.desc')), badge: t(m('usecases.promo.badge')), href: '/entreprises', image: '/menu/usecases.webp' },
    },
    {
      key: 'resources', label: t('resources'), layout: 'grid',
      items: [
        item(m('resources.i1'), '/securite', icons.shield),
        item(m('resources.i2'), '/faq', icons.faq),
        item(m('resources.i3'), '#', icons.blog),
        item(m('resources.i4'), '#', icons.help),
      ],
    },
    {
      key: 'about', label: t('about'), layout: 'grid',
      items: [
        item(m('about.i1'), '/a-propos', icons.team),
        item(m('about.i2'), '#', icons.star),
        item(m('about.i3'), '#', icons.shield),
        item(m('about.i4'), '#', icons.event),
      ],
      promo: { title: t(m('about.promo.title')), desc: t(m('about.promo.desc')), badge: t(m('about.promo.badge')), href: '/entreprises', image: '/menu/about.webp' },
    },
  ];
}
