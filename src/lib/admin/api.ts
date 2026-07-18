import { apiFetch, ApiError } from '@/lib/api/client';
import { requireAdminToken, redirectExpired } from '@/lib/auth/session';

export interface AdminStats {
  total: number;
  active7d: number;
  new30d: number;
}

export interface AdminUserListItem {
  id: string;
  email: string | null;
  createdAt: string;
  lastSeenAt: string;
  syncCount: number;
  usageCount: number;
}

export interface AdminUsersPage {
  items: AdminUserListItem[];
  nextCursor: string | null;
}

export interface AdminUserDetail {
  user: { id: string; email: string | null; createdAt: string; lastSeenAt: string };
  syncCount: number;
  usageCount: number;
  recentSync: { action: string; clientId: string; createdAt: string }[];
  recentUsage: { day: string; count: number }[];
}

async function get<T>(path: string): Promise<T> {
  const token = await requireAdminToken();
  try {
    return await apiFetch<T>(path, { token, cache: 'no-store' });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) redirectExpired();
    throw error;
  }
}

export function fetchStats(): Promise<AdminStats> {
  return get<AdminStats>('/admin/stats');
}

export function fetchUsers(params: { search?: string; cursor?: string } = {}): Promise<AdminUsersPage> {
  const query = new URLSearchParams();
  if (params.search) query.set('search', params.search);
  if (params.cursor) query.set('cursor', params.cursor);
  const suffix = query.toString();
  return get<AdminUsersPage>(`/admin/users${suffix ? `?${suffix}` : ''}`);
}

export function fetchUser(id: string): Promise<AdminUserDetail> {
  return get<AdminUserDetail>(`/admin/users/${encodeURIComponent(id)}`);
}
