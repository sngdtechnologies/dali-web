import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { fetchUser } from '@/lib/admin/api';
import { isRedirectError } from '@/lib/auth/session';

const dateTimeFmt = new Intl.DateTimeFormat('fr-FR', {
  day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
});
const fmt = (iso: string) => dateTimeFmt.format(new Date(iso));

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let data: Awaited<ReturnType<typeof fetchUser>> | null = null;
  try {
    data = await fetchUser(id);
  } catch (error) {
    if (isRedirectError(error)) throw error;
    data = null;
  }

  if (!data) {
    return (
      <div>
        <Link href="/admin/users" className="text-sm text-foret-700 hover:underline">← Utilisateurs</Link>
        <Card className="mt-6"><p className="text-sm text-sable-700">Utilisateur introuvable ou service indisponible.</p></Card>
      </div>
    );
  }

  return (
    <div>
      <Link href="/admin/users" className="text-sm text-foret-700 hover:underline">← Utilisateurs</Link>
      <h1 className="mt-3 text-2xl text-encre">{data.user.email ?? data.user.id}</h1>
      <p className="mt-1 font-mono text-xs text-sable-700">{data.user.id}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <Card><div className="text-xs uppercase tracking-wide text-sable-700">Inscrit le</div><div className="mt-1 text-sm tabular-nums text-encre">{fmt(data.user.createdAt)}</div></Card>
        <Card><div className="text-xs uppercase tracking-wide text-sable-700">Vu le</div><div className="mt-1 text-sm tabular-nums text-encre">{fmt(data.user.lastSeenAt)}</div></Card>
        <Card><div className="text-xs uppercase tracking-wide text-sable-700">Sync</div><div className="mt-1 font-mono text-2xl tabular-nums text-encre">{data.syncCount}</div></Card>
        <Card><div className="text-xs uppercase tracking-wide text-sable-700">Requêtes IA</div><div className="mt-1 font-mono text-2xl tabular-nums text-encre">{data.usageCount}</div></Card>
      </div>

      <h2 className="mt-10 text-lg text-encre">Activité récente</h2>
      <Card className="mt-3 p-0">
        {data.recentSync.length === 0 ? (
          <p className="px-6 py-8 text-sm text-sable-700">Aucune activité.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-encre/10 text-xs uppercase tracking-wide text-sable-700">
                <th className="px-6 py-3 font-medium">Action</th>
                <th className="px-6 py-3 font-medium">Client</th>
                <th className="px-6 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.recentSync.map((s) => (
                <tr key={`${s.clientId}-${s.createdAt}`} className="border-b border-encre/5 last:border-0">
                  <td className="px-6 py-3 font-mono text-xs text-encre">{s.action}</td>
                  <td className="px-6 py-3 font-mono text-xs text-sable-700">{s.clientId}</td>
                  <td className="px-6 py-3 tabular-nums text-sable-700">{fmt(s.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <h2 className="mt-10 text-lg text-encre">Usage de l&apos;assistant</h2>
      <Card className="mt-3 p-0">
        {data.recentUsage.length === 0 ? (
          <p className="px-6 py-8 text-sm text-sable-700">Aucun usage.</p>
        ) : (
          <ul className="divide-y divide-encre/5">
            {data.recentUsage.map((u) => (
              <li key={u.day} className="flex justify-between px-6 py-3 text-sm">
                <span className="tabular-nums text-sable-700">{u.day}</span>
                <span className="font-mono tabular-nums text-encre">{u.count}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
