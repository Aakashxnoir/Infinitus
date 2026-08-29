/**
 * Official site copy, navigation map, and metadata.
 * Single source of truth — update text here for the whole website.
 */

export const COLLEGE_NAME = 'Rajalakshmi Institute of Technology';
export const COLLEGE_SHORT = 'RIT';

export const CLUB_NAME = 'Infinitus Club of Mathematics';
export const CLUB_SHORT = 'Infinitus';

export const SITE = {
  /** Browser tab title — kept short so it is not truncated */
  title: 'Infinitus | RIT Mathematics Club',
  titleTemplate: '%s | Infinitus Club',
  description:
    'Official website of Infinitus Club of Mathematics at Rajalakshmi Institute of Technology (RIT). Meet the team, explore events, and contact the club.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  contactEmail: 'infinitus@ritchennai.edu.in',
  locale: 'en_IN',
  keywords: [
    'Infinitus',
    'RIT',
    'Rajalakshmi Institute of Technology',
    'mathematics club',
    'college math club',
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
    id: 'members',
    component: 'MembersGrid',
    navLabel: 'Members',
    inNav: true,
  },
  {
    id: 'about',
    component: 'AboutUs',
    navLabel: 'About',
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
    tagline:
      'The official mathematics club of Rajalakshmi Institute of Technology — explore, compete, and build with numbers.',
    cta: 'Meet the team',
  },
  members: {
    eyebrow: 'Our team',
    heading: 'Club Members',
    empty: 'Member profiles will be published here soon.',
  },
  about: {
    eyebrow: 'About us',
    heading: 'About Infinitus',
    body: `${CLUB_NAME} is the official mathematics club at ${COLLEGE_NAME}. We run problem-solving circles, guest lectures, competitive-math preparation, and workshops that connect classroom theory to real exploration. Whether you are preparing for olympiads or discovering math beyond the syllabus, you are welcome here.`,
  },
  events: {
    eyebrow: 'Activities',
    heading: 'Events',
    conductedHeading: 'Events conducted',
    conductedEmpty: 'Past events will be listed here once published.',
    upcomingHeading: 'Upcoming events',
    upcomingEmpty: 'Upcoming events will be announced here. Check back soon.',
    registerCta: 'View details & register',
  },
  gallery: {
    eyebrow: 'Gallery',
    heading: 'Event gallery',
    empty: 'Photos from club events will appear here once they are uploaded.',
  },
  contact: {
    eyebrow: 'Contact',
    heading: 'Get in touch',
    intro:
      'For membership enquiries, collaborations, or general questions, send us a message or email the club directly.',
    formSubmit: 'Send message',
    formSubmitting: 'Sending…',
    formSuccessTitle: 'Message sent',
    formSuccessBody: 'Thank you for reaching out. The club will respond as soon as possible.',
    formSuccessAgain: 'Send another message',
  },
  footer: {
    clubLine: CLUB_NAME,
    copyright: (year) =>
      `© ${year} ${CLUB_NAME}, ${COLLEGE_NAME}. All rights reserved.`,
  },
  brand: {
    homeAriaLabel: `${CLUB_NAME} at ${COLLEGE_NAME} — Home`,
    srOnly: `${CLUB_NAME} at ${COLLEGE_NAME}`,
  },
};

export function sectionHref(id) {
  return `#${id}`;
}
