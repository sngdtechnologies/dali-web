import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE } from '@/lib/auth/cookie';

export async function getAdminToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value;
}

export async function requireAdminToken(): Promise<string> {
  const token = await getAdminToken();
  if (!token) redirect('/admin/login');
  return token;
}

// Read-only on purpose: this runs inside Server Components, which are not
// allowed to write cookies. The stale cookie is overwritten on the next login.
export function redirectExpired(): never {
  redirect('/admin/login?expired=1');
}

// `redirect()` works by throwing a tagged error. Pages that catch fetch errors
// to render an error state must let this one bubble, or the redirect is lost.
export function isRedirectError(error: unknown): boolean {
  const digest = (error as { digest?: unknown } | null)?.digest;
  return typeof digest === 'string' && digest.startsWith('NEXT_REDIRECT');
}
