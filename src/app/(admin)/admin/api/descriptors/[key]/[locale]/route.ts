import { NextResponse } from 'next/server';
import { apiFetch, ApiError } from '@/lib/api/client';
import { requireAdminToken } from '@/lib/auth/session';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ key: string; locale: string }> },
) {
  const { key, locale } = await params;
  const token = await requireAdminToken();
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ message: 'Corps de requête invalide.' }, { status: 400 });

  try {
    const updated = await apiFetch(
      `/admin/descriptors/${encodeURIComponent(key)}/${encodeURIComponent(locale)}`,
      { method: 'PUT', token, body: JSON.stringify(body) },
    );
    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    return NextResponse.json({ message: 'Service indisponible, réessayez.' }, { status: 502 });
  }
}
