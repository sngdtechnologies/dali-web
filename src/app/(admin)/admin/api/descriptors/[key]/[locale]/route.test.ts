import { describe, it, expect, vi, afterEach } from 'vitest';

const apiFetch = vi.fn();
vi.mock('@/lib/api/client', async () => {
  const actual = await vi.importActual<typeof import('@/lib/api/client')>('@/lib/api/client');
  return { ...actual, apiFetch: (...args: unknown[]) => apiFetch(...args) };
});

const requireAdminToken = vi.fn();
vi.mock('@/lib/auth/session', () => ({ requireAdminToken: () => requireAdminToken() }));

import { PUT } from './route';
import { ApiError } from '@/lib/api/client';

const req = (body: unknown) =>
  new Request('http://localhost:3000/admin/api/descriptors/fiscalite/fr', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
const params = Promise.resolve({ key: 'fiscalite', locale: 'fr' });

afterEach(() => { apiFetch.mockReset(); requireAdminToken.mockReset(); });

describe('PUT /admin/api/descriptors/:key/:locale', () => {
  it('forwards the token and body to the backend, returning its result', async () => {
    requireAdminToken.mockResolvedValue('jwt.abc');
    apiFetch.mockResolvedValue({ key: 'fiscalite', locale: 'fr', version: 2, json: { type: 'detail' }, updatedAt: '2026-07-01T00:00:00.000Z' });

    const res = await PUT(req({ expectedVersion: 1, json: { type: 'detail' } }), { params });

    expect(apiFetch).toHaveBeenCalledWith(
      '/admin/descriptors/fiscalite/fr',
      expect.objectContaining({ method: 'PUT', token: 'jwt.abc' }),
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ key: 'fiscalite', locale: 'fr', version: 2, json: { type: 'detail' }, updatedAt: '2026-07-01T00:00:00.000Z' });
  });

  it('returns 400 for an unparseable body without calling the backend', async () => {
    requireAdminToken.mockResolvedValue('jwt.abc');
    const res = await PUT(new Request('http://x', { method: 'PUT', body: 'not json' }), { params });
    expect(res.status).toBe(400);
    expect(apiFetch).not.toHaveBeenCalled();
  });

  it('forwards a 409 conflict status and message from the backend', async () => {
    requireAdminToken.mockResolvedValue('jwt.abc');
    apiFetch.mockRejectedValue(new ApiError(409, 'Descriptor was edited since it was loaded (current version 3)'));

    const res = await PUT(req({ expectedVersion: 1, json: { type: 'detail' } }), { params });

    expect(res.status).toBe(409);
    expect(await res.json()).toEqual({ message: 'Descriptor was edited since it was loaded (current version 3)' });
  });

  it('forwards a 400 validation status from the backend', async () => {
    requireAdminToken.mockResolvedValue('jwt.abc');
    apiFetch.mockRejectedValue(new ApiError(400, 'Bad Request'));

    const res = await PUT(req({ expectedVersion: 1, json: { type: 'nope' } }), { params });

    expect(res.status).toBe(400);
  });

  it('returns 502 when the backend is unreachable', async () => {
    requireAdminToken.mockResolvedValue('jwt.abc');
    apiFetch.mockRejectedValue(new Error('ECONNREFUSED'));

    const res = await PUT(req({ expectedVersion: 1, json: { type: 'detail' } }), { params });

    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ message: 'Service indisponible, réessayez.' });
  });
});
