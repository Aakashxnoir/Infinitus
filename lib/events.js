import { getSupabaseClient } from './supabaseClient';
import { EVENTS } from './data';

export async function getEvents(status) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return status ? EVENTS.filter((e) => e.status === status) : EVENTS;
  }

  let query = supabase
    .from('events')
    .select(
      'id, title, description, event_date, event_type, status, venue, cover_image_url, external_link, event_images(image_url, sort_order)'
    )
    .order('event_date', { ascending: false });

  if (status) query = query.eq('status', status);

  const { data, error } = await query;

  if (error || !data) {
    return status ? EVENTS.filter((e) => e.status === status) : EVENTS;
  }

  return data.map((e) => ({
    id: e.id,
    title: e.title,
    description: e.description,
    eventDate: e.event_date,
    eventType: e.event_type,
    status: e.status,
    venue: e.venue,
    coverImageUrl: e.cover_image_url,
    externalLink: e.external_link,
    images: (e.event_images || [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((img) => img.image_url),
  }));
}
