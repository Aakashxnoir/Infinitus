import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { listContactMessages, updateContactStatus } from '@/lib/contactStore';

export async function GET() {
  try {
    await requireAdmin();
    const result = await listContactMessages();
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    const status = err.status || 500;
    return NextResponse.json(
      { success: false, error: status === 401 ? 'Unauthorized' : err.message },
      { status }
    );
  }
}

export async function PATCH(request) {
  try {
    await requireAdmin();
    const body = await request.json().catch(() => null);
    if (!body?.id || !body?.status) {
      return NextResponse.json({ success: false, error: 'id and status are required' }, { status: 400 });
    }

    await updateContactStatus(body.id, body.status);
    return NextResponse.json({ success: true });
  } catch (err) {
    const status = err.status || 500;
    return NextResponse.json(
      { success: false, error: status === 401 ? 'Unauthorized' : err.message },
      { status }
    );
  }
}
