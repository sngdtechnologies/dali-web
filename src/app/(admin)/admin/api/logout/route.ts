import { NextResponse } from 'next/server';
import { ADMIN_COOKIE } from '@/lib/auth/cookie';

export async function POST() {
  const response = new NextResponse(null, { status: 204 });
  response.cookies.set(ADMIN_COOKIE, '', { httpOnly: true, path: '/admin', maxAge: 0 });
  return response;
}
