import Image from 'next/image';
import { INFINITUS_LOGO } from '@/lib/branding';

const SIZE_MAP = {
  nav: {
    src: INFINITUS_LOGO.nav,
    width: 40,
    height: 40,
    className: 'h-9 w-9 sm:h-10 sm:w-10',
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
    className: 'h-28 w-28 sm:h-36 sm:w-36',
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
