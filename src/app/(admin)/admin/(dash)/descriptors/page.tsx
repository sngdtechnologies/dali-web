import { Card } from '@/components/ui/Card';
import { DescriptorsTable } from '@/components/admin/DescriptorsTable';
import { fetchDescriptors } from '@/lib/admin/api';
import { isRedirectError } from '@/lib/auth/session';

export default async function AdminDescriptorsPage() {
  let items: Awaited<ReturnType<typeof fetchDescriptors>> | null = null;
  try {
    items = await fetchDescriptors();
  } catch (error) {
    if (isRedirectError(error)) throw error;
    items = null;
  }

  return (
    <div>
      <h1 className="text-2xl text-encre">Descripteurs</h1>
      <Card className="mt-6 p-0">
        {items ? (
          <DescriptorsTable items={items} />
        ) : (
          <div className="px-6 py-8">
            <p className="text-sm text-sable-700">Impossible de charger les descripteurs.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
