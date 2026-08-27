import { Space_Grotesk, Inter } from 'next/font/google';
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

export const metadata = {
  title: 'INFINITUS — Math Club',
  description:
    'INFINITUS is the official math club website — meet the team, explore past and upcoming events, and get in touch.',
  openGraph: {
    title: 'INFINITUS — Math Club',
    description:
      'INFINITUS is the official math club website — meet the team, explore past and upcoming events, and get in touch.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
