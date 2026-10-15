import Image from 'next/image';
import { INFINITUS_LOGO } from '@/lib/branding';

const SIZE_MAP = {
  nav: {
    src: INFINITUS_LOGO.nav,
    width: 40,
    height: 40,
    className: 'h-9 w-9',
  },
  footer: {
    src: INFINITUS_LOGO.footer,
    width: 56,
    height: 56,
    className: 'h-14 w-14',
  },
  loader: {
    src: INFINITUS_LOGO.loader,
    width: 200,
    height: 200,
    className: 'h-40 w-40 sm:h-44 sm:w-44',
  },
};

export default function InfinitusLogo({ size = 'nav', priority = false, className = '' }) {
  const config = SIZE_MAP[size] ?? SIZE_MAP.nav;

  return (
    <Image
      src={config.src}
      alt="Infinitus Club Mathematics"
      width={config.width}
      height={config.height}
      priority={priority}
      className={`object-contain ${config.className} ${className}`.trim()}
    />
  );
}
