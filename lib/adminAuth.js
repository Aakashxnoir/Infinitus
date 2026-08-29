import { createHash, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'infinitus_admin';

function getPassword() {
  return process.env.ADMIN_PASSWORD || '';
}

function tokenFor(password) {
  return createHash('sha256').update(`infinitus:${password}`).digest('hex');
}

export function isAdminConfigured() {
  return Boolean(getPassword());
}

export function verifyAdminPassword(password) {
  const expected = getPassword();
  if (!expected || !password) return false;

  const a = Buffer.from(tokenFor(password));
  const b = Buffer.from(tokenFor(expected));
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function createAdminSession() {
  const password = getPassword();
  if (!password) throw new Error('ADMIN_PASSWORD is not set');

  const jar = await cookies();
  jar.set(COOKIE_NAME, tokenFor(password), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12, // 12 hours
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const password = getPassword();
  if (!password) return false;

  const jar = await cookies();
  const value = jar.get(COOKIE_NAME)?.value;
  if (!value) return false;

  try {
    const a = Buffer.from(value);
    const b = Buffer.from(tokenFor(password));
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function requireAdmin() {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    const err = new Error('Unauthorized');
    err.status = 401;
    throw err;
  }
}
