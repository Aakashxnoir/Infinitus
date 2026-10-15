import { STIX_Two_Text, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { CLUB_NAME, COLLEGE_NAME, SITE } from '@/lib/site';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import Loader from '@/components/layout/Loader';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

// STIX is the typeface of mathematical publishing; it sets both headings and italic accents.
const serif = STIX_Two_Text({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

// Before paint: theme (saved choice, else the system's) and whether the intro already played this session.
const initScript = `
(function () {
  var root = document.documentElement;
  try {
    var stored = localStorage.getItem('infinitus-theme');
    root.classList.toggle('dark', stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches);
    if (sessionStorage.getItem('infinitus-intro-seen')) root.classList.add('intro-seen');
    else sessionStorage.setItem('infinitus-intro-seen', '1');
  } catch (e) {}
})();
`;

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: SITE.titleTemplate,
  },
  description: SITE.description,
  keywords: SITE.keywords,
  authors: [{ name: CLUB_NAME }],
  creator: CLUB_NAME,
  publisher: COLLEGE_NAME,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: 'website',
    locale: SITE.locale,
    siteName: CLUB_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0C0E1F' },
    { media: '(prefers-color-scheme: light)', color: '#F7F5EF' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${body.variable} ${mono.variable}`}
      // Lets Next.js turn smooth scrolling off while it resets scroll on route changes
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <Loader />
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
