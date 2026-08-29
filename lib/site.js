/**
 * Official site copy, navigation map, and metadata.
 * Sourced from docs/INFINITUS_Official_Website_Content.md
 */

export const COLLEGE_NAME = 'Rajalakshmi Institute of Technology';
export const COLLEGE_SHORT = 'RIT';

export const CLUB_NAME = 'INFINITUS Club';
export const CLUB_SHORT = 'INFINITUS';

export const SITE = {
  title: 'INFINITUS | RIT Mathematics Club',
  titleTemplate: '%s | INFINITUS',
  description:
    'INFINITUS — Mathematics Club of Rajalakshmi Institute of Technology, Chennai. Explore mathematics through competitions, workshops, innovation, problem-solving, creativity, and collaborative learning.',
  shortDescription:
    'INFINITUS is the Mathematics Club of Rajalakshmi Institute of Technology, promoting mathematical thinking through competitions, innovation, problem-solving, creativity, and collaborative learning.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://infinitus-seven.vercel.app',
  contactEmail: 'infinitus@ritchennai.edu.in',
  /** Google Form for website/club queries — override with NEXT_PUBLIC_CONTACT_FORM_URL */
  contactFormUrl:
    process.env.NEXT_PUBLIC_CONTACT_FORM_URL ||
    'https://forms.gle/wMbC1SEdAXYYbFvn9',
  location: 'Chennai, Tamil Nadu, India',
  locale: 'en_IN',
  keywords: [
    'INFINITUS',
    'Mathematics',
    'Logic',
    'Innovation',
    'Creativity',
    'Problem-Solving',
    'Exploration',
    'Learning',
    'Collaboration',
    'RIT',
    'Rajalakshmi Institute of Technology',
    'Chennai',
  ],
};

/**
 * Page sections — maps DOM id → component → nav label.
 * Order matches app/page.jsx render order.
 */
export const PAGE_SECTIONS = [
  {
    id: 'home',
    component: 'Hero',
    navLabel: 'Home',
    inNav: true,
  },
  {
    id: 'about',
    component: 'AboutUs',
    navLabel: 'About',
    inNav: true,
  },
  {
    id: 'members',
    component: 'MembersGrid',
    navLabel: 'Core Team',
    inNav: true,
  },
  {
    id: 'events',
    component: 'EventsSection',
    navLabel: 'Events',
    inNav: true,
  },
  {
    id: 'gallery',
    component: 'GallerySection',
    navLabel: 'Gallery',
    inNav: true,
  },
  {
    id: 'contact',
    component: 'ContactSection',
    navLabel: 'Contact',
    inNav: true,
    navVariant: 'button',
  },
];

/** Primary navigation links derived from PAGE_SECTIONS */
export const NAV_LINKS = PAGE_SECTIONS.filter((s) => s.inNav);

export const COPY = {
  hero: {
    tagline: 'Where Logic Meets Innovation',
    support:
      'The official Mathematics Club of Rajalakshmi Institute of Technology, Chennai — competitions, workshops, problem-solving, and collaborative learning.',
    cta: 'Meet the core team',
  },
  members: {
    eyebrow: '2026–2027',
    heading: 'Core Team',
    empty: 'Committee profiles will be published here soon.',
  },
  about: {
    eyebrow: 'About us',
    heading: 'About INFINITUS',
    body: 'INFINITUS is the official Mathematics Club of Rajalakshmi Institute of Technology, Chennai. The club aims to make mathematics engaging, interactive, innovative, and accessible through competitions, workshops, problem-solving activities, creative challenges, and collaborative learning.',
    bodySecondary:
      'INFINITUS provides students with opportunities to strengthen logical reasoning, analytical thinking, mathematical aptitude, creativity, teamwork, leadership, and problem-solving skills while exploring mathematics beyond conventional classroom learning.',
    focusEyebrow: 'Purpose',
    focusHeading: 'Club focus',
    focus:
      'INFINITUS focuses on creating a student-driven mathematical community where members can explore concepts, challenge themselves, collaborate with peers, and apply mathematical thinking in creative and practical ways. The club encourages curiosity and continuous learning by connecting mathematics with logical reasoning, innovation, technology, creativity, and real-world problem-solving.',
    activitiesEyebrow: 'Activities',
    activitiesHeading: 'What INFINITUS does',
    activitiesIntro: 'A mix of competitions, workshops, and collaborative learning that builds aptitude beyond the classroom.',
    activities: [
      'Mathematics competitions and quizzes',
      'Mathematical games and challenges',
      'Workshops and learning sessions',
      'Problem-solving activities',
      'Creative mathematics activities',
      'Mathematics and technology initiatives',
      'Innovation-focused activities',
      'Collaborative and peer learning',
      'Student skill development',
    ],
  },
  events: {
    eyebrow: 'Activities',
    heading: 'Events',
    conductedHeading: 'Events conducted',
    conductedEmpty: 'Past events will be listed here once published.',
    upcomingHeading: 'Upcoming events',
    upcomingEmpty: 'Upcoming events will be announced here once details are finalized.',
    registerCta: 'View details & register',
  },
  gallery: {
    eyebrow: 'Gallery',
    heading: 'Event gallery',
    empty: 'Photographs and visual highlights from club activities will appear here once uploaded.',
  },
  contact: {
    eyebrow: 'Contact',
    heading: 'Get in touch',
    intro:
      'Share questions about the website, suggestions for club enhancements, membership enquiries, or collaboration ideas through our Google Form.',
    emailLine: 'You can also reach the club directly at',
    orgLine: 'INFINITUS Mathematics Club',
    addressLines: [
      'Rajalakshmi Institute of Technology',
      'Chennai, Tamil Nadu, India',
    ],
    formTitle: 'Website & club queries',
    formActiveBody:
      'Use the INFINITUS Club Review and Queries form for website feedback, club enhancement ideas, and general questions.',
    formCta: 'Open Google Form',
    formPlaceholderEyebrow: 'Coming soon',
    formPlaceholderBody:
      'A Google Form will be linked here for all queries about the INFINITUS website and club enhancements.',
    formPlaceholderHint:
      'Add NEXT_PUBLIC_CONTACT_FORM_URL in .env.local with your Google Form link to activate this section.',
    formFallback: 'Having trouble with the embedded form?',
    formOpenLink: 'Open the Google Form',
  },
  footer: {
    clubLine: 'INFINITUS Mathematics Club',
    copyright: (year) =>
      `© ${year} INFINITUS Club, ${COLLEGE_NAME}. All rights reserved.`,
  },
  brand: {
    homeAriaLabel: `INFINITUS Club at ${COLLEGE_NAME} — Home`,
    srOnly: `INFINITUS Club at ${COLLEGE_NAME}`,
  },
};

export function sectionHref(id) {
  return `#${id}`;
}
