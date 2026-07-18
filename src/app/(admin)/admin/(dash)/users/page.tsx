import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { UsersTable } from '@/components/admin/UsersTable';
import { fetchUsers } from '@/lib/admin/api';
import { isRedirectError } from '@/lib/auth/session';

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; cursor?: string }>;
}) {
  const { search, cursor } = await searchParams;

  let page: Awaited<ReturnType<typeof fetchUsers>> | null = null;
  try {
    page = await fetchUsers({ search, cursor });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    page = null;
  }

  return (
    <div>
      <h1 className="text-2xl text-encre">Utilisateurs</h1>

      <form className="mt-6 flex gap-2" action="/admin/users">
        <input
          name="search"
          defaultValue={search ?? ''}
          placeholder="Rechercher par email ou id"
          aria-label="Rechercher par email ou id"
          className="w-80 rounded-dali-md border border-encre/15 bg-white px-4 py-2 text-sm outline-none focus:border-foret-600"
        />
        <button type="submit" className="rounded-dali-md bg-foret-800 px-4 py-2 text-sm font-medium text-ivoire">
          Rechercher
        </button>
      </form>

      <Card className="mt-6 p-0">
        {page ? (
          <UsersTable items={page.items} />
        ) : (
          <div className="px-6 py-8">
            <p className="text-sm text-sable-700">Impossible de charger les utilisateurs.</p>
            <Link href="/admin/users" className="mt-2 inline-block text-sm text-foret-700 hover:underline">
              Réessayer
            </Link>
          </div>
        )}
      </Card>

      {page?.nextCursor ? (
        <Link
          href={`/admin/users?${new URLSearchParams({ ...(search ? { search } : {}), cursor: page.nextCursor }).toString()}`}
          className="mt-6 inline-block rounded-dali-full border border-encre/15 bg-white px-5 py-2 text-sm hover:bg-encre/5"
        >
          Charger plus
        </Link>
      ) : null}
    </div>
  );
}
