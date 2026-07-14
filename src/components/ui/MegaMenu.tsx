import Image from 'next/image';
import { Link } from '@/i18n/routing';
import type { MegaColumn, MegaItem, MegaPromo } from '@/components/marketing/nav-data';

function ItemLink({ item }: { item: MegaItem }) {
  return (
    <Link href={item.href} className="group flex gap-3 rounded-dali-md p-2.5 transition-colors hover:bg-foret-50">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-dali-sm bg-foret-50 text-foret-600 transition-colors group-hover:bg-white">
        {item.icon}
      </span>
      <span>
        <span className="block text-sm font-semibold text-encre">{item.label}</span>
        <span className="block text-xs leading-snug text-sable-700">{item.desc}</span>
      </span>
    </Link>
  );
}

type Props =
  | { layout: 'columns'; columns: MegaColumn[] }
  | { layout: 'grid'; items: MegaItem[]; promo?: MegaPromo };

export function MegaMenu(props: Props) {
  if (props.layout === 'columns') {
    return (
      <div className="grid gap-8 py-8 md:grid-cols-4">
        {props.columns.map((col) => (
          <div key={col.title}>
            <div className="text-sm font-bold text-encre">{col.title}</div>
            <p className="mb-3 mt-1 text-xs leading-snug text-sable-700">{col.tagline}</p>
            <div className="flex flex-col gap-0.5">
              {col.items.map((it) => (
                <ItemLink key={it.label} item={it} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-8 py-8 md:grid-cols-[1fr_320px]">
      <div className="grid gap-1 sm:grid-cols-2">
        {props.items.map((it) => (
          <ItemLink key={it.label} item={it} />
        ))}
      </div>
      {props.promo && (
        <Link
          href={props.promo.href}
          className="relative flex flex-col justify-between overflow-hidden rounded-dali-lg bg-foret-800 p-6 text-ivoire transition-transform hover:-translate-y-0.5"
        >
          {props.promo.image && (
            <>
              <Image src={props.promo.image} alt="" fill sizes="320px" className="object-cover" />
              <div className="absolute inset-0 bg-foret-900/80" aria-hidden />
            </>
          )}
          <div className="relative z-10">
            <span className="inline-block rounded-dali-full bg-or-500/20 px-2.5 py-0.5 text-xs font-medium text-or-300">
              {props.promo.badge}
            </span>
            <h3 className="mt-4 font-serif text-xl">{props.promo.title}</h3>
            <p className="mt-2 text-sm text-ivoire/70">{props.promo.desc}</p>
          </div>
          <span aria-hidden className="relative z-10 mt-6 flex h-9 w-9 items-center justify-center self-end rounded-dali-full bg-ivoire/10">→</span>
        </Link>
      )}
    </div>
  );
}
