/**
 * Role responsibilities for Core Committee 2026–27.
 * Source: INFINITUS_Member_Role_Responsibilities.md
 * Shown when a visitor opens a member card.
 */
export const ROLE_RESPONSIBILITIES = {
  'Dr A Thilagavathy Vinoth': {
    team: 'Faculty',
    summary:
      'Serves as Faculty Coordinator for INFINITUS. Guides the club as Assistant Professor in the Humanities & Sciences (H & S) department, supports student leadership, advises on academic and institutional requirements, and helps ensure club activities align with college guidelines.',
  },
  'Austin Joshua M': {
    team: 'Leadership',
    summary:
      'Provides overall leadership and direction for INFINITUS. Oversees the functioning of the club, coordinates with faculty and the executive team, approves major initiatives, represents the club officially, and ensures that club activities and objectives are carried out effectively.',
  },
  'Sanjay Yuvaraj': {
    team: 'Leadership',
    summary:
      'Supports the President in managing the club and coordinates with different teams to ensure smooth execution of plans. Follows up on departmental progress, assists in decision-making, and helps maintain effective internal coordination.',
  },
  'Bala Vishnu K': {
    team: 'Leadership',
    summary:
      'Maintains official club records, meeting documentation, notices, schedules, approvals, communications, and other administrative documents. Ensures that important club information is properly recorded and organized.',
  },
  Kartavyaa: {
    team: 'Leadership',
    summary:
      'Assists the Secretary and leadership team with administrative activities, documentation, communication, task follow-ups, scheduling, and coordination required for the smooth functioning of the club.',
  },
  'Josewa Aghai': {
    team: 'Event Management',
    summary:
      'Manages the operational execution of club events. Coordinates venues, logistics, materials, volunteers, event schedules, and different departments to ensure that events are conducted smoothly and according to plan.',
  },
  'Jagannathan M': {
    team: 'Event Management',
    summary:
      'Develops and structures club events by preparing concepts, event formats, rounds, rules, schedules, judging criteria, scoring methods, and required resources. Coordinates with the event team during the planning stage.',
  },
  'Sridharshan S': {
    team: 'Event Management',
    summary:
      'Supports the planning and development of club events by designing event structures, activities, rules, schedules, participant flow, and operational requirements. Works with the event team to convert ideas into executable event plans.',
  },
  'C. Samsundar': {
    team: 'Event Management',
    summary:
      'Coordinates the execution of events and assists with participant management, registration, setup, materials, venue coordination, event flow, and on-ground activities.',
  },
  'Sree Vishishta': {
    team: 'Event Management',
    summary:
      'Supports event execution by coordinating participants, event materials, venue arrangements, schedules, and on-ground activities while ensuring that the planned event flow is maintained.',
  },
  'Yokeshwaran A': {
    team: 'Event Management',
    summary:
      'Assists the event team with participant guidance, logistics, material distribution, seating, coordination, and other on-ground requirements during club activities.',
  },
  'Aakash B K': {
    team: 'Technical Team',
    summary:
      'Leads the technical aspects of INFINITUS activities and digital systems. Oversees technical planning, online tools, registration systems, scoring systems, digital platforms, and technical readiness for events.',
  },
  'Chris Alan': {
    team: 'Technical Team',
    summary:
      'Supports the technical team in managing digital forms, spreadsheets, registration systems, scoring, leaderboards, online tools, event-day technical setup, and troubleshooting.',
  },
  'Abishek S': {
    team: 'Creative & Media',
    summary:
      "Leads the creative direction of INFINITUS and maintains a consistent visual identity across club activities. Guides creative concepts, branding, promotional materials, and visual communication.",
  },
  'Deepika S': {
    team: 'Creative & Media',
    summary:
      "Manages the club's social media presence, including event promotions, announcements, updates, campaigns, posting schedules, and audience engagement.",
  },
  'Aditya Parthasarathy': {
    team: 'Creative & Media',
    summary:
      "Leads the poster design team and supervises the creation of event posters, banners, promotional graphics, and other visual materials while maintaining consistency with the club's identity.",
  },
  'Vijay Ragav': {
    team: 'Creative & Media',
    summary:
      'Creates posters, promotional graphics, event creatives, and other visual materials based on confirmed event information and approved design requirements.',
  },
  'Akshitha Kannapan': {
    team: 'Creative & Media',
    summary:
      "Designs posters, promotional creatives, announcements, and supporting graphics for INFINITUS activities while following the club's visual identity and design requirements.",
  },
  'Dharaneesh V': {
    team: 'Creative & Media',
    summary:
      'Produces and edits promotional videos, reels, event highlights, recap videos, and other video-based content for INFINITUS.',
  },
  'Sam Jebaraj J': {
    team: 'Photography',
    summary:
      "Leads photography coverage for INFINITUS events and activities. Plans coverage, coordinates photographers, ensures important moments are documented, and maintains the quality and organization of event photographs.",
  },
  Balachandar: {
    team: 'Photography',
    summary:
      "Captures photographs during club events and activities for documentation, promotion, reports, social media, and the club's visual archive.",
  },
  'NS Lokesh Bharathi': {
    team: 'Content & Documentation',
    summary:
      'Creates written content for event promotions, announcements, descriptions, captions, scripts, and other official communication requirements of INFINITUS.',
  },
  'Abimanue M': {
    team: 'Content & Documentation',
    summary:
      'Develops event descriptions, announcements, promotional copy, captions, scripts, and other written content required for club activities and communications.',
  },
  'Abirami M R': {
    team: 'Content & Documentation',
    summary:
      'Prepares and maintains official event reports and documentation, recording event activities, outcomes, participant experiences, and other relevant details for institutional records.',
  },
  'Richella M': {
    team: 'Innovation & Outreach',
    summary:
      "Develops new and innovative ideas for INFINITUS activities and events. Explores new approaches, mathematical applications, technologies, collaborations, and concepts that can improve the club's activities.",
  },
  'Sabari Naathan D': {
    team: 'Innovation & Outreach',
    summary:
      "Handles public relations and external communication for INFINITUS. Coordinates with external organizations, clubs, institutions, guests, and other stakeholders while supporting the club's public image and outreach.",
  },
  'Tarika Varshini G S': {
    team: 'Volunteers & Logistics',
    summary:
      'Manages the volunteer team by allocating responsibilities, coordinating communication, organizing volunteer support, and ensuring sufficient manpower for club events and activities.',
  },
  'M.R. Harish': {
    team: 'Volunteers & Logistics',
    summary:
      'Coordinates event logistics and supports discipline management during club activities. Helps organize materials, movement, venue requirements, participant coordination, and orderly execution of events.',
  },
  'Yamuna A': {
    team: 'Volunteers & Logistics',
    summary:
      'Supports logistics and discipline management during events by coordinating materials, participant movement, venue arrangements, and on-ground requirements to maintain an organized event environment.',
  },
  Sandhya: {
    team: 'Finance',
    summary:
      'Manages the financial activities of INFINITUS, including budgeting, expense tracking, financial records, reimbursements, and other approved financial requirements of the club.',
  },
};

export function getRoleDetails(name) {
  return ROLE_RESPONSIBILITIES[name] || null;
}
