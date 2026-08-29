import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { getEvents } from '@/lib/events';
import { setEventRegistrationForm } from '@/lib/eventRegistrations';

export async function GET() {
  try {
    await requireAdmin();
    const events = await getEvents();
    return NextResponse.json({ success: true, events });
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
    if (!body?.id) {
      return NextResponse.json({ success: false, error: 'Event id is required' }, { status: 400 });
    }

    const result = await setEventRegistrationForm(
      body.id,
      body.registrationFormUrl ?? ''
    );

    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    const status = err.status || 500;
    return NextResponse.json(
      { success: false, error: status === 401 ? 'Unauthorized' : err.message },
      { status }
    );
  }
}
