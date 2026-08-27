import { NextResponse } from 'next/server';
import { getEvents } from '@/lib/events';

export const revalidate = 60;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type'); // 'upcoming' | 'conducted'
  const events = await getEvents(type || undefined);
  return NextResponse.json(events);
}
