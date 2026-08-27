import { getSupabaseClient } from './supabaseClient';
import { MEMBERS } from './data';

export async function getMembers() {
  const supabase = getSupabaseClient();
  if (!supabase) return MEMBERS;

  const { data, error } = await supabase
    .from('members')
    .select('id, name, role, photo_url, bio, linkedin_url, instagram_url')
    .eq('is_active', true)
    .order('role_rank', { ascending: true });

  if (error || !data) return MEMBERS;

  return data.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    photoUrl: m.photo_url,
    bio: m.bio,
    linkedinUrl: m.linkedin_url,
    instagramUrl: m.instagram_url,
  }));
}
