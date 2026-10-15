const MONTH = new Intl.DateTimeFormat('en-IN', { month: 'short' });

function parse(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** "18 Jul 2026", or "3–4 Aug 2026" when an end date in the same month is given. */
export function formatEventDate(start, end) {
  const a = parse(start);
  if (!a) return start || '';
  const b = end ? parse(end) : null;
  const tail = `${MONTH.format(a)} ${a.getFullYear()}`;
  if (b && b.getMonth() === a.getMonth() && b.getFullYear() === a.getFullYear() && b.getDate() !== a.getDate()) {
    return `${a.getDate()}–${b.getDate()} ${tail}`;
  }
  return `${a.getDate()} ${tail}`;
}

export function eventYear(dateStr) {
  return parse(dateStr)?.getFullYear() ?? null;
}

/** Office-bearer roles, in display order. */
export const LEADERSHIP_ROLES = ['President', 'Vice President', 'Secretary', 'Joint Secretary', 'Technical Head'];

/** "CSE · III Year" */
export function metaOf(member) {
  return [member.department, member.year].filter(Boolean).join(' · ');
}

export function eventHref(event) {
  return `/events/${encodeURIComponent(event.id)}`;
}
