import { Card } from '@/components/ui/Card';
import { fetchStats } from '@/lib/admin/api';
import { isRedirectError } from '@/lib/auth/session';

export default async function AdminDashboardPage() {
  let stats: Awaited<ReturnType<typeof fetchStats>> | null = null;
  try {
    stats = await fetchStats();
  } catch (error) {
    if (isRedirectError(error)) throw error;
    stats = null;
  }

  if (!stats) {
    return (
      <div>
        <h1 className="text-2xl text-encre">Dashboard</h1>
        <Card className="mt-6">
          <p className="text-sm text-sable-700">Impossible de charger les statistiques.</p>
        </Card>
      </div>
    );
  }

  const tiles = [
    { label: 'Utilisateurs', value: stats.total },
    { label: 'Actifs (7 j)', value: stats.active7d },
    { label: 'Nouveaux (30 j)', value: stats.new30d },
  ];

  return (
    <div>
      <h1 className="text-2xl text-encre">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {tiles.map((tile) => (
          <Card key={tile.label}>
            <div className="text-xs uppercase tracking-wide text-sable-700">{tile.label}</div>
            <div className="mt-2 font-mono text-3xl font-medium tabular-nums text-encre">{tile.value}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
