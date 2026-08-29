import { promises as fs } from 'node:fs';
import path from 'node:path';
import { getSupabaseClient } from './supabaseClient';

const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'event-registrations.json');

const GOOGLE_FORM_RE =
  /^https:\/\/(docs\.google\.com\/forms\/|forms\.gle\/)/i;

export function isGoogleFormUrl(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url.trim());
    return GOOGLE_FORM_RE.test(parsed.href);
  } catch {
    return false;
  }
}

export function normalizeFormUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  return trimmed;
}

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(STORE_PATH);
  } catch {
    await fs.writeFile(STORE_PATH, '{}\n', 'utf8');
  }
}

async function readLocalOverrides() {
  await ensureStore();
  const raw = await fs.readFile(STORE_PATH, 'utf8');
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

async function writeLocalOverrides(map) {
  await ensureStore();
  await fs.writeFile(STORE_PATH, `${JSON.stringify(map, null, 2)}\n`, 'utf8');
}

/**
 * Apply local Google Form URL overrides on top of event rows
 * (used when Supabase is not configured).
 */
export async function applyRegistrationOverrides(events) {
  const overrides = await readLocalOverrides();
  return events.map((event) => {
    const override = overrides[event.id];
    if (!override) return event;
    return {
      ...event,
      registrationFormUrl: override.registrationFormUrl ?? event.registrationFormUrl,
      externalLink: override.registrationFormUrl ?? event.externalLink,
    };
  });
}

export async function setEventRegistrationForm(eventId, registrationFormUrl) {
  const url = normalizeFormUrl(registrationFormUrl);

  if (url && !isGoogleFormUrl(url)) {
    throw new Error(
      'Registration link must be a Google Form URL (forms.gle or docs.google.com/forms)'
    );
  }

  const supabase = getSupabaseClient();
  if (supabase) {
    const { error } = await supabase
      .from('events')
      .update({
        registration_form_url: url,
        external_link: url,
        updated_at: new Date().toISOString(),
      })
      .eq('id', eventId);

    if (error) {
      // Column may not exist yet on older schemas — fall back to external_link only
      const { error: fallbackError } = await supabase
        .from('events')
        .update({
          external_link: url,
          updated_at: new Date().toISOString(),
        })
        .eq('id', eventId);

      if (fallbackError) throw new Error(fallbackError.message);
    }

    return { storage: 'supabase', registrationFormUrl: url };
  }

  const overrides = await readLocalOverrides();
  if (url) {
    overrides[eventId] = {
      registrationFormUrl: url,
      updatedAt: new Date().toISOString(),
    };
  } else {
    delete overrides[eventId];
  }
  await writeLocalOverrides(overrides);
  return { storage: 'local', registrationFormUrl: url };
}
