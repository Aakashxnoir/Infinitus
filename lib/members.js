import { getSupabaseClient } from './supabaseClient';
import { MEMBERS } from './data';
import { getRoleDetails } from './roleResponsibilities';

function withRoleDetails(member) {
  const details = getRoleDetails(member.name);
  return {
    ...member,
    team: details?.team || null,
    responsibilities: details?.summary || null,
  };
}

export async function getMembers() {
  const supabase = getSupabaseClient();
  if (!supabase) return MEMBERS.map(withRoleDetails);

  const { data, error } = await supabase
    .from('members')
    .select('id, name, role, photo_url, bio, linkedin_url, instagram_url')
    .eq('is_active', true)
    .order('role_rank', { ascending: true });

  if (error || !data) return MEMBERS.map(withRoleDetails);

  return data.map((m) =>
    withRoleDetails({
      id: m.id,
      name: m.name,
      role: m.role,
      photoUrl: m.photo_url,
      bio: m.bio,
      department: m.department || null,
      year: m.year || null,
      linkedinUrl: m.linkedin_url,
      instagramUrl: m.instagram_url,
    })
  );
}
