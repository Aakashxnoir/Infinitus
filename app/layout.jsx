import { Space_Grotesk, Inter } from 'next/font/google';
import { INFINITUS_LOGO } from '@/lib/branding';
import { CLUB_NAME, COLLEGE_NAME, SITE } from '@/lib/site';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import '@/styles/globals.css';

const heading = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('infinitus-theme');
    if (stored === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
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
  icons: {
    icon: [
      { url: '/brand/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/infinitus-nav.webp', sizes: '80x80', type: 'image/webp' },
    ],
    shortcut: '/brand/favicon.png',
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: 'website',
    locale: SITE.locale,
    siteName: CLUB_NAME,
    images: [
      {
        url: INFINITUS_LOGO.og,
        width: 512,
        height: 512,
        alt: CLUB_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: SITE.title,
    description: SITE.description,
    images: [INFINITUS_LOGO.og],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
