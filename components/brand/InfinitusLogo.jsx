import Image from 'next/image';
import { INFINITUS_LOGO } from '@/lib/branding';

const SIZE_MAP = {
  nav: {
    src: INFINITUS_LOGO.nav,
    width: 40,
    height: 40,
    className: 'h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10',
  },
  footer: {
    src: INFINITUS_LOGO.footer,
    width: 56,
    height: 56,
    className: 'h-12 w-12 sm:h-14 sm:w-14',
  },
  hero: {
    src: INFINITUS_LOGO.hero,
    width: 160,
    height: 160,
    className: 'h-[4.5rem] w-[4.5rem] sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32',
  },
  loader: {
    src: INFINITUS_LOGO.loader,
    width: 200,
    height: 200,
    className: 'h-44 w-44 sm:h-48 sm:w-48',
  },
};

export default function InfinitusLogo({
  size = 'nav',
  priority = false,
  interactive = false,
  className = '',
}) {
  const config = SIZE_MAP[size] ?? SIZE_MAP.nav;

  return (
    <Image
      src={config.src}
      alt="Infinitus Club Mathematics"
      width={config.width}
      height={config.height}
      priority={priority}
      className={`object-contain ${config.className} ${
        interactive ? 'interactive-logo' : ''
      } ${className}`.trim()}
    />
  );
}
