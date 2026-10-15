import Image from 'next/image';
import { RIT_LOGO } from '@/lib/branding';
import { COLLEGE_NAME } from '@/lib/site';

const SIZE_MAP = {
  xs: { light: RIT_LOGO.sm, dark: RIT_LOGO.whiteSm, width: 80, height: 26, className: 'h-5 w-auto' },
  sm: { light: RIT_LOGO.sm, dark: RIT_LOGO.whiteSm, width: 120, height: 40, className: 'h-7 w-auto sm:h-8' },
  md: { light: RIT_LOGO.md, dark: RIT_LOGO.whiteMd, width: 160, height: 52, className: 'h-9 w-auto' },
};

/**
 * RIT wordmark. Both variants are rendered and CSS picks one, so the right logo
 * shows on first paint in either theme (official white logo on dark, colour on light).
 */
export default function RitLogo({ size = 'md', className = '' }) {
  const config = SIZE_MAP[size] ?? SIZE_MAP.md;

  return (
    <span className={`inline-flex ${className}`.trim()}>
      <Image
        src={config.light}
        alt={COLLEGE_NAME}
        width={config.width}
        height={config.height}
        className={`object-contain dark:hidden ${config.className}`}
      />
      <Image
        src={config.dark}
        alt={COLLEGE_NAME}
        width={config.width}
        height={config.height}
        className={`hidden object-contain dark:block ${config.className}`}
      />
    </span>
  );
}
