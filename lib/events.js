import { getSupabaseClient } from './supabaseClient';
import { EVENTS } from './data';

function mapEvent(e) {
  const formUrl = e.registration_form_url || e.external_link || null;
  return {
    id: e.id,
    title: e.title,
    description: e.description,
    eventDate: e.event_date,
    eventType: e.event_type,
    status: e.status,
    venue: e.venue,
    coverImageUrl: e.cover_image_url,
    externalLink: e.external_link,
    registrationFormUrl: formUrl,
    images: (e.event_images || [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((img) => img.image_url),
  };
}

function mapMockEvent(e) {
  return {
    ...e,
    registrationFormUrl: e.registrationFormUrl || null,
    images: e.images || [],
  };
}

function staticEvents(status) {
  const base = status ? EVENTS.filter((e) => e.status === status) : EVENTS;
  return base.map(mapMockEvent);
}

/** Bundled events always show; events added in Supabase are merged in, newest first. */
export async function getEvents(status) {
  const bundled = staticEvents(status);
  const fromDb = await getDbEvents(status);
  const titles = new Set(bundled.map((e) => e.title.toLowerCase()));
  return [...bundled, ...fromDb.filter((e) => !titles.has(e.title.toLowerCase()))].sort(
    (a, b) => new Date(b.eventDate) - new Date(a.eventDate)
  );
}

/** One event plus its neighbours in the newest-first list (for prev/next links). */
export async function getEvent(id) {
  const events = await getEvents();
  const index = events.findIndex((e) => String(e.id) === id);
  if (index === -1) return null;
  return { event: events[index], newer: events[index - 1] ?? null, older: events[index + 1] ?? null };
}

async function getDbEvents(status) {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  let query = supabase
    .from('events')
    .select(
      'id, title, description, event_date, event_type, status, venue, cover_image_url, external_link, registration_form_url, event_images(image_url, sort_order)'
    )
    .order('event_date', { ascending: false });

  if (status) query = query.eq('status', status);

  const { data, error } = await query;

  if (error || !data) {
    // Older DBs may lack registration_form_url — retry without it
    let fallback = supabase
      .from('events')
      .select(
        'id, title, description, event_date, event_type, status, venue, cover_image_url, external_link, event_images(image_url, sort_order)'
      )
      .order('event_date', { ascending: false });

    if (status) fallback = fallback.eq('status', status);

    const second = await fallback;
    if (second.error || !second.data) return [];

    return second.data.map(mapEvent);
  }

  return data.map(mapEvent);
}
