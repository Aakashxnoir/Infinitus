// One-time seed script: pushes lib/data.js mock content into Supabase so the
// site has real rows to read once a project is provisioned. Run schema.sql
// in the Supabase SQL editor first.
//
// Usage: npm run db:seed
// Reads SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY from .env.local or the
// environment. Run scripts/db/schema.sql in the Supabase SQL editor first.

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { MEMBERS, EVENTS } from '../../lib/data.js';

function loadEnvLocal() {
  const path = fileURLToPath(new URL('../../.env.local', import.meta.url));
  if (!existsSync(path)) return;

  const contents = readFileSync(path, 'utf8');
  for (const line of contents.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed
      .slice(eq + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '');
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    'Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY. Set them in .env.local or the environment before seeding.'
  );
  process.exit(1);
}

const supabase = createClient(url, key);

async function seedMembers() {
  const rows = MEMBERS.map((m, i) => ({
    name: m.name,
    role: m.role,
    role_rank: i + 1,
    photo_url: m.photoUrl,
    bio: m.bio || [m.department, m.year].filter(Boolean).join(', ') || null,
    linkedin_url: m.linkedinUrl,
    instagram_url: m.instagramUrl,
  }));

  const { error } = await supabase.from('members').insert(rows);
  if (error) throw error;
  console.log(`Seeded ${rows.length} members.`);
}

async function seedEvents() {
  const rows = EVENTS.map((e) => ({
    title: e.title,
    description: e.description,
    event_date: e.eventDate,
    event_type: e.eventType,
    status: e.status,
    cover_image_url: e.coverImageUrl,
    venue: e.venue,
    external_link: e.registrationFormUrl || e.externalLink,
    registration_form_url: e.registrationFormUrl || e.externalLink,
  }));

  const { error } = await supabase.from('events').insert(rows);
  if (error) throw error;
  console.log(`Seeded ${rows.length} events.`);
}

async function main() {
  await seedMembers();
  await seedEvents();
  console.log('Seed complete — official INFINITUS committee data loaded.');
}

main().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
