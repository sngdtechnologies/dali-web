import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import middleware from './middleware';

const req = (url: string, cookie?: string) => {
  const r = new NextRequest(new URL(url, 'http://localhost:3000'));
  if (cookie) r.cookies.set('dali_admin', cookie);
  return r;
};

describe('middleware — admin', () => {
  it('redirects to /admin/login when the cookie is missing', () => {
    const res = middleware(req('/admin/users'));
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toBe('http://localhost:3000/admin/login');
  });

  it('lets /admin/users through when the cookie is present', () => {
    const res = middleware(req('/admin/users', 'jwt'));
    expect(res.headers.get('location')).toBeNull();
  });

  it('lets /admin/login through without a cookie', () => {
    const res = middleware(req('/admin/login'));
    expect(res.headers.get('location')).toBeNull();
  });

  it('lets /admin/api/login through without a cookie', () => {
    const res = middleware(req('/admin/api/login'));
    expect(res.headers.get('location')).toBeNull();
  });

  it('never rewrites /admin to a locale prefix', () => {
    const res = middleware(req('/admin', 'jwt'));
    expect(res.headers.get('location')).toBeNull();
    expect(res.headers.get('x-middleware-rewrite') ?? '').not.toContain('/fr/admin');
  });
});

describe('middleware — vitrine (non-regression)', () => {
  it('still handles a locale-prefixed marketing route', () => {
    const res = middleware(req('/fr/solutions/app'));
    expect(res).toBeDefined();
    expect(res.headers.get('location')).toBeNull();
  });

  it('still redirects the bare root to the default locale', () => {
    const res = middleware(req('/'));
    expect(res.headers.get('location')).toBe('http://localhost:3000/fr');
  });
});
