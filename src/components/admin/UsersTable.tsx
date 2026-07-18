import Link from 'next/link';
import type { AdminUserListItem } from '@/lib/admin/api';

const dateFmt = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
const fmt = (iso: string) => dateFmt.format(new Date(iso));

export function UsersTable({ items }: { items: AdminUserListItem[] }) {
  if (items.length === 0) {
    return <p className="px-6 py-8 text-sm text-sable-700">Aucun utilisateur.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-encre/10 text-xs uppercase tracking-wide text-sable-700">
            <th className="px-6 py-3 font-medium">Utilisateur</th>
            <th className="px-6 py-3 font-medium">Inscrit le</th>
            <th className="px-6 py-3 font-medium">Vu le</th>
            <th className="px-6 py-3 font-medium">Activité</th>
          </tr>
        </thead>
        <tbody>
          {items.map((u) => (
            <tr key={u.id} className="border-b border-encre/5 last:border-0">
              <td className="px-6 py-3">
                <Link href={`/admin/users/${u.id}`} className="text-foret-700 hover:underline">
                  {u.email ?? u.id}
                </Link>
              </td>
              <td className="px-6 py-3 tabular-nums text-sable-700">{fmt(u.createdAt)}</td>
              <td className="px-6 py-3 tabular-nums text-sable-700">{fmt(u.lastSeenAt)}</td>
              <td className="px-6 py-3 tabular-nums text-sable-700">{u.syncCount} sync · {u.usageCount} IA</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
