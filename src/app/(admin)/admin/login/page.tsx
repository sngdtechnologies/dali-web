import { Card } from '@/components/ui/Card';
import { LoginForm } from '@/components/admin/LoginForm';

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ expired?: string }>;
}) {
  const { expired } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="font-serif text-3xl italic text-foret-800">Dali</span>
          <p className="mt-1 text-sm text-sable-700">Backoffice</p>
        </div>
        {expired ? (
          <p role="status" className="mb-4 rounded-dali-md bg-or-500/15 px-4 py-2.5 text-sm text-or-700">
            Session expirée, reconnectez-vous.
          </p>
        ) : null}
        <Card>
          <LoginForm />
        </Card>
      </div>
    </main>
  );
}
