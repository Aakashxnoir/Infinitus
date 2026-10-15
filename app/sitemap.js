import { SITE, PAGES } from '@/lib/site';
import { getEvents } from '@/lib/events';
import { eventHref } from '@/lib/format';

export default async function sitemap() {
  const events = await getEvents();
  const now = new Date();

  return [
    ...PAGES.map((page) => ({
      url: `${SITE.url}${page.href === '/' ? '' : page.href}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: page.href === '/' ? 1 : 0.8,
    })),
    ...events.map((event) => ({
      url: `${SITE.url}${eventHref(event)}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
  ];
}
