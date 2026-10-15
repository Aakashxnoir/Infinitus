/**
 * Official site copy, navigation map, and metadata.
 * Sourced from docs/INFINITUS_Official_Website_Content.md and the club's Instagram.
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

export const SOCIAL = {
  instagram: 'https://www.instagram.com/infinitus_club.rit/',
  instagramHandle: '@infinitus_club.rit',
  queriesForm: 'https://forms.gle/wMbC1SEdAXYYbFvn9',
};

/** Site pages, in navigation order. `index` is the § number shown beside each page title. */
export const PAGES = [
  { id: 'home', href: '/', navLabel: 'Home', index: 0 },
  { id: 'about', href: '/about', navLabel: 'About', index: 1 },
  { id: 'events', href: '/events', navLabel: 'Events', index: 2 },
  { id: 'team', href: '/team', navLabel: 'Team', index: 3 },
  { id: 'gallery', href: '/gallery', navLabel: 'Gallery', index: 4 },
  { id: 'contact', href: '/contact', navLabel: 'Contact', index: 5, navVariant: 'button' },
];

export const NAV_LINKS = PAGES;

export function pageById(id) {
  return PAGES.find((p) => p.id === id);
}

export const COPY = {
  hero: {
    badge: 'Official Mathematics Club',
    tagline: 'Where logic meets innovation',
    support:
      'The Mathematics Club of Rajalakshmi Institute of Technology, Chennai — competitions, workshops, puzzles and collaborative learning beyond the classroom.',
    primaryCta: 'Explore events',
    secondaryCta: 'Meet the team',
    scrollHint: 'Scroll',
  },
  home: {
    marquee: ['Logic', 'Innovation', 'Creativity', 'Problem-solving', 'Exploration', 'Learning', 'Collaboration'],
    exploreEyebrow: 'Contents',
    exploreHeading: 'Find your way around',
    explore: {
      about: 'Who we are, what we do, and how far we have come since 2023.',
      events: 'Championships, quizzes, workshops and creative contests — every one we have hosted.',
      team: 'The Core Committee 2026–27 and what each role looks after.',
      gallery: 'Snapshots from our events, celebrations and milestones.',
    },
    eventsHeading: 'Latest from the club',
    eventsCta: 'All events',
    teamHeading: 'The people behind it',
    teamCta: 'Full committee',
    galleryHeading: 'Moments, in motion',
    galleryCta: 'Open gallery',
    ctaEyebrow: 'Say hello',
    ctaHeading: 'Have a question, an idea, or a problem worth solving?',
    ctaButton: 'Get in touch',
  },
  pages: {
    about: { title: 'About', description: 'INFINITUS is the Mathematics Club of Rajalakshmi Institute of Technology, Chennai — who we are, what we do, and our journey so far.' },
    events: { title: 'Events', description: 'Championships, quizzes, workshops and creative contests hosted by INFINITUS, the RIT Mathematics Club.' },
    team: { title: 'Team', description: 'Meet the INFINITUS Core Committee 2026–27 and the responsibilities of each role.' },
    gallery: { title: 'Gallery', description: 'Photos from INFINITUS events, celebrations and milestones.' },
    contact: { title: 'Contact', description: 'Get in touch with INFINITUS, the Mathematics Club of Rajalakshmi Institute of Technology, Chennai.' },
  },
  notFound: {
    heading: 'This page tends to infinity',
    body: "We followed the limit and found nothing there. The page you're after may have moved.",
    cta: 'Back to home',
  },
  about: {
    eyebrow: '§1 About',
    statement: 'A student-driven community that makes mathematics engaging, interactive and',
    statementAccent: 'infinitely creative.',
    body: 'INFINITUS is the official Mathematics Club of Rajalakshmi Institute of Technology, Chennai. The club aims to make mathematics engaging, interactive, innovative, and accessible through competitions, workshops, problem-solving activities, creative challenges, and collaborative learning.',
    bodySecondary:
      'INFINITUS provides students with opportunities to strengthen logical reasoning, analytical thinking, mathematical aptitude, creativity, teamwork, leadership, and problem-solving skills while exploring mathematics beyond conventional classroom learning.',
    pillars: [
      {
        title: 'Competitions & quizzes',
        body: 'Team challenges, online quizzes and championships that put problem-solving speed and logic to the test.',
      },
      {
        title: 'Workshops & sessions',
        body: 'Hands-on learning — from web development to statistics storytelling and guest lectures.',
      },
      {
        title: 'Games & puzzles',
        body: 'PiDoku, treasure hunts and channel-surfing chaos — mathematics you play, not just study.',
      },
      {
        title: 'Math × technology',
        body: 'Initiatives that connect mathematical thinking with code, data and innovation.',
      },
      {
        title: 'Creative mathematics',
        body: 'Poster contests, photography and memes that reveal the beauty of maths in everyday life.',
      },
      {
        title: 'The Math Podcast',
        body: 'Fresh conversations on mathematics, ideas and the people behind them.',
      },
    ],
    focusQuote: 'Mathematics beyond the classroom.',
    focus:
      'INFINITUS focuses on creating a student-driven mathematical community where members can explore concepts, challenge themselves, collaborate with peers, and apply mathematical thinking in creative and practical ways.',
    journeyHeading: 'Our journey so far',
    journey: [
      {
        year: '2023',
        title: 'First steps',
        body: 'A mathematical rangoli and the National Mathematics Day celebration on campus.',
      },
      {
        year: '2024',
        title: 'Finding our rhythm',
        body: "Math-O-Fest '24 with a guest lecture from SSN College of Engineering, and Infinity Quest '24.",
      },
      {
        year: '2025',
        title: 'Growing louder',
        body: "Mathspire Expilog '25, the launch of The Math Podcast, and RIT's Best Vice President 2024–25 award.",
      },
      {
        year: '2026',
        title: 'Beyond campus',
        body: 'PI-QUEST on Pi Day and SHINKA — a mathematics & innovation championship for school students.',
      },
    ],
  },
  events: {
    eyebrow: '§2 Events',
    heading: "What we've hosted",
    intro: 'Championships, quizzes, workshops and creative contests — a look at what INFINITUS has hosted.',
    featuredLabel: 'Latest',
    upcomingHeading: 'Upcoming',
    registerCta: 'Register now',
    nextEventTitle: 'Next event: to be announced',
    nextEventBody: 'New events are announced on Instagram first. Follow along so you never miss a registration.',
    viewPost: 'View on Instagram',
    showAll: 'Show all events',
    showLess: 'Show fewer',
    details: 'Details',
    backToEvents: 'All events',
    prevEvent: 'Newer',
    nextEvent: 'Older',
  },
  members: {
    eyebrow: '§3 Team',
    heading: 'Core Committee 2026–27',
    subheading: 'Select a name to read what that role looks after.',
    leadershipLabel: 'Office bearers',
  },
  gallery: {
    eyebrow: '§4 Gallery',
    heading: 'From our events',
    intro: 'Snapshots from our events, celebrations and milestones.',
  },
  contact: {
    eyebrow: '§5 Contact',
    heading: 'Contact us',
    intro:
      'Questions about the club, membership, collaborations or this website? Send them through our Google Form or reach us directly.',
    formTitle: 'Website & club queries',
    formBody: 'Feedback, club enhancement ideas, membership enquiries and general questions.',
    formCta: 'Open Google Form',
    orgLine: 'INFINITUS Mathematics Club',
    addressLines: ['Rajalakshmi Institute of Technology', 'Chennai, Tamil Nadu, India'],
  },
  footer: {
    tagline: 'Where logic meets innovation.',
    copyright: (year) => `© ${year} INFINITUS Club, ${COLLEGE_NAME}.`,
    credit: 'Designed & built by the INFINITUS Technical Team',
  },
  brand: {
    homeAriaLabel: `INFINITUS Club at ${COLLEGE_NAME} — Home`,
  },
};
