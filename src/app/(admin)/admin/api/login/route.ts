import { NextResponse } from 'next/server';
import { apiFetch, ApiError } from '@/lib/api/client';
import type { AdminSession } from '@/lib/auth/types';
import { ADMIN_COOKIE } from '@/lib/auth/cookie';

const EIGHT_HOURS_SECONDS = 8 * 60 * 60;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string; password?: string } | null;
  if (!body?.email || !body?.password) {
    return NextResponse.json({ message: 'Email et mot de passe requis.' }, { status: 400 });
  }

  let session: AdminSession;
  try {
    session = await apiFetch<AdminSession>('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: body.email, password: body.password }),
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return NextResponse.json({ message: 'Identifiants invalides' }, { status: 401 });
    }
    if (error instanceof ApiError && error.status === 429) {
      return NextResponse.json({ message: 'Trop de tentatives, réessayez dans une minute.' }, { status: 429 });
    }
    return NextResponse.json({ message: 'Service indisponible, réessayez.' }, { status: 502 });
  }

  const response = NextResponse.json({ admin: session.admin });
  response.cookies.set(ADMIN_COOKIE, session.token, {
    httpOnly: true,
    // A Secure cookie is rejected over http://localhost, which would break local dev.
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/admin',
    maxAge: EIGHT_HOURS_SECONDS,
  });
  return response;
}
