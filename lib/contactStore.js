import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { getSupabaseClient } from './supabaseClient';

const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'contact-messages.json');

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(STORE_PATH);
  } catch {
    await fs.writeFile(STORE_PATH, '[]\n', 'utf8');
  }
}

async function readLocal() {
  await ensureStore();
  const raw = await fs.readFile(STORE_PATH, 'utf8');
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLocal(messages) {
  await ensureStore();
  await fs.writeFile(STORE_PATH, `${JSON.stringify(messages, null, 2)}\n`, 'utf8');
}

/**
 * Persist a contact submission. Prefers Supabase; falls back to local JSON
 * so the form always works before a cloud backend is configured.
 */
export async function saveContactMessage({ name, email, message, ipAddress }) {
  const record = {
    id: randomUUID(),
    name,
    email,
    message,
    status: 'new',
    ip_address: ipAddress || null,
    created_at: new Date().toISOString(),
  };

  const supabase = getSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        name: record.name,
        email: record.email,
        message: record.message,
        ip_address: record.ip_address,
        status: 'new',
      })
      .select('id, name, email, message, status, created_at')
      .single();

    if (error) {
      throw new Error(error.message || 'Failed to store contact message in Supabase');
    }

    return { ...data, storage: 'supabase' };
  }

  const messages = await readLocal();
  messages.unshift(record);
  await writeLocal(messages);
  return { ...record, storage: 'local' };
}

export async function listContactMessages() {
  const supabase = getSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('id, name, email, message, status, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message || 'Failed to load contact messages');
    }

    return { messages: data || [], storage: 'supabase' };
  }

  const messages = await readLocal();
  return { messages, storage: 'local' };
}

export async function updateContactStatus(id, status) {
  const allowed = new Set(['new', 'read', 'replied']);
  if (!allowed.has(status)) {
    throw new Error('Invalid status');
  }

  const supabase = getSupabaseClient();
  if (supabase) {
    const { error } = await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', id);

    if (error) throw new Error(error.message);
    return { storage: 'supabase' };
  }

  const messages = await readLocal();
  const next = messages.map((m) => (m.id === id ? { ...m, status } : m));
  await writeLocal(next);
  return { storage: 'local' };
}
