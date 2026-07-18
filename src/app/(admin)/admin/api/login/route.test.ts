import { describe, it, expect, vi, afterEach } from 'vitest';

const apiFetch = vi.fn();
vi.mock('@/lib/api/client', async () => {
  const actual = await vi.importActual<typeof import('@/lib/api/client')>('@/lib/api/client');
  return { ...actual, apiFetch: (...args: unknown[]) => apiFetch(...args) };
});

import { POST } from './route';
import { ApiError } from '@/lib/api/client';

const req = (body: unknown) =>
  new Request('http://localhost:3000/admin/api/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });

afterEach(() => apiFetch.mockReset());

describe('POST /admin/api/login', () => {
  it('sets an httpOnly cookie and never returns the token', async () => {
    apiFetch.mockResolvedValue({ token: 'jwt.abc', admin: { id: 'a1', email: 'x@dali.app', name: 'A', role: 'admin' } });

    const res = await POST(req({ email: 'x@dali.app', password: 'p' }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toEqual({ admin: { id: 'a1', email: 'x@dali.app', name: 'A', role: 'admin' } });
    expect(JSON.stringify(body)).not.toContain('jwt.abc');

    const cookie = res.headers.get('set-cookie') ?? '';
    expect(cookie).toContain('dali_admin=jwt.abc');
    expect(cookie).toContain('HttpOnly');
    expect(cookie).toContain('SameSite=lax');
    expect(cookie).toContain('Path=/admin');
  });

  it('propagates a 401 with a generic message and sets no cookie', async () => {
    apiFetch.mockRejectedValue(new ApiError(401, 'nope'));

    const res = await POST(req({ email: 'x@dali.app', password: 'bad' }));

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ message: 'Identifiants invalides' });
    expect(res.headers.get('set-cookie')).toBeNull();
  });

  it('propagates a 429 with a throttle message', async () => {
    apiFetch.mockRejectedValue(new ApiError(429, 'too many'));

    const res = await POST(req({ email: 'x@dali.app', password: 'p' }));

    expect(res.status).toBe(429);
    expect(await res.json()).toEqual({ message: 'Trop de tentatives, réessayez dans une minute.' });
  });

  it('returns 400 when email or password is missing', async () => {
    const res = await POST(req({ email: 'x@dali.app' }));
    expect(res.status).toBe(400);
    expect(apiFetch).not.toHaveBeenCalled();
  });

  it('returns 502 when the backend is unreachable', async () => {
    apiFetch.mockRejectedValue(new Error('ECONNREFUSED'));

    const res = await POST(req({ email: 'x@dali.app', password: 'p' }));

    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ message: 'Service indisponible, réessayez.' });
  });
});
