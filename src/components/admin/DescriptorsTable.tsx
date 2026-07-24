import Link from 'next/link';
import type { AdminDescriptorListItem } from '@/lib/admin/api';

const dateFmt = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
const fmt = (iso: string) => dateFmt.format(new Date(iso));

export function DescriptorsTable({ items }: { items: AdminDescriptorListItem[] }) {
  if (items.length === 0) {
    return <p className="px-6 py-8 text-sm text-sable-700">Aucun descripteur.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-encre/10 text-xs uppercase tracking-wide text-sable-700">
            <th className="px-6 py-3 font-medium">Titre</th>
            <th className="px-6 py-3 font-medium">Clé</th>
            <th className="px-6 py-3 font-medium">Locale</th>
            <th className="px-6 py-3 font-medium">Type</th>
            <th className="px-6 py-3 font-medium">Version</th>
            <th className="px-6 py-3 font-medium">Modifié le</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={`${d.key}-${d.locale}`} className="border-b border-encre/5 last:border-0">
              <td className="px-6 py-3">
                <Link href={`/admin/descriptors/${d.key}/${d.locale}`} className="text-foret-700 hover:underline">
                  {d.title}
                </Link>
              </td>
              <td className="px-6 py-3 text-sable-700">{d.key}</td>
              <td className="px-6 py-3 text-sable-700">{d.locale}</td>
              <td className="px-6 py-3 text-sable-700">{d.type}</td>
              <td className="px-6 py-3 tabular-nums text-sable-700">{d.version}</td>
              <td className="px-6 py-3 tabular-nums text-sable-700">{fmt(d.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
