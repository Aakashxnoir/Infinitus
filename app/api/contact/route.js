import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { isRateLimited } from '@/lib/rateLimiter';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, message, company } = body;

  // Honeypot: bots fill hidden fields, real users leave it blank.
  if (company) {
    return NextResponse.json({ success: true });
  }

  if (!name || typeof name !== 'string' || !name.trim()) {
    return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
  }
  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
  }
  if (!message || typeof message !== 'string' || !message.trim()) {
    return NextResponse.json({ success: false, error: 'Message is required' }, { status: 400 });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: 'Too many requests — please try again later' },
      { status: 429 }
    );
  }

  const trimmed = { name: name.trim(), email: email.trim(), message: message.trim() };

  const supabase = getSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from('contact_messages').insert({
      name: trimmed.name,
      email: trimmed.email,
      message: trimmed.message,
      ip_address: ip,
    });
    if (error) console.error('Failed to store contact message', error);
  }

  if (process.env.RESEND_API_KEY && process.env.CONTACT_RECEIVER_EMAIL) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'INFINITUS Website <onboarding@resend.dev>',
        to: process.env.CONTACT_RECEIVER_EMAIL,
        replyTo: trimmed.email,
        subject: `New contact message from ${trimmed.name}`,
        text: trimmed.message,
      });
    } catch (err) {
      console.error('Failed to send contact email', err);
    }
  }

  return NextResponse.json({ success: true });
}
