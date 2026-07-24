import { Card } from '@/components/ui/Card';
import { DescriptorEditor } from '@/components/admin/descriptors/DescriptorEditor';
import { fetchDescriptor } from '@/lib/admin/api';
import { isRedirectError } from '@/lib/auth/session';

export default async function AdminDescriptorEditorPage({
  params,
}: {
  params: Promise<{ key: string; locale: string }>;
}) {
  const { key, locale } = await params;
  let detail: Awaited<ReturnType<typeof fetchDescriptor>> | null = null;
  try {
    detail = await fetchDescriptor(key, locale);
  } catch (error) {
    if (isRedirectError(error)) throw error;
    detail = null;
  }

  return (
    <div>
      <h1 className="text-2xl text-encre">{detail ? detail.json.title : `${key} (${locale})`}</h1>
      <Card className="mt-6">
        {detail ? (
          <DescriptorEditor initial={detail} />
        ) : (
          <p className="text-sm text-sable-700">Impossible de charger ce descripteur.</p>
        )}
      </Card>
    </div>
  );
}
