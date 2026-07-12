import { describe, it, expect, vi, afterEach } from 'vitest';
import { apiFetch, ApiError } from './client';

afterEach(() => vi.unstubAllGlobals());

describe('apiFetch', () => {
  it('returns parsed JSON on success and injects the bearer token', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'content-type': 'application/json' } }));
    vi.stubGlobal('fetch', fetchMock);
    const data = await apiFetch<{ ok: boolean }>('/health', { token: 'abc', baseUrl: 'http://api.test' });
    expect(data).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledWith(
      'http://api.test/health',
      expect.objectContaining({ headers: expect.objectContaining({ Authorization: 'Bearer abc' }) }),
    );
  });
  it('throws ApiError with the status on failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('nope', { status: 404 })));
    await expect(apiFetch('/missing', { baseUrl: 'http://api.test' })).rejects.toMatchObject({ status: 404 } as Partial<ApiError>);
  });
});
