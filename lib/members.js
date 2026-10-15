import { getSupabaseClient } from './supabaseClient';
import { MEMBERS } from './data';
import { getRoleDetails } from './roleResponsibilities';

const STATIC_BY_NAME = new Map(MEMBERS.map((m) => [m.name, m]));

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
    .select('id, name, role, department, year, bio, linkedin_url, instagram_url')
    .eq('is_active', true)
    .order('role_rank', { ascending: true });

  if (error || !data?.length) return MEMBERS.map(withRoleDetails);

  return data.map((m) => {
    // Fill missing department/year from the bundled roster
    const fallback = STATIC_BY_NAME.get(m.name);
    return withRoleDetails({
      id: m.id,
      name: m.name,
      role: m.role,
      bio: m.bio,
      department: m.department || fallback?.department || null,
      year: m.year || fallback?.year || null,
      linkedinUrl: m.linkedin_url,
      instagramUrl: m.instagram_url,
    });
  });
}
