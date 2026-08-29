import { NextResponse } from 'next/server';
import {
  createAdminSession,
  isAdminConfigured,
  verifyAdminPassword,
} from '@/lib/adminAuth';

export async function POST(request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      {
        success: false,
        error: 'Set ADMIN_PASSWORD in .env.local to enable the admin panel.',
      },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const password = body?.password;

  if (!password || !verifyAdminPassword(password)) {
    return NextResponse.json({ success: false, error: 'Incorrect password' }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ success: true });
}
