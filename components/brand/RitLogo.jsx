'use client';

import Image from 'next/image';
import { RIT_LOGO } from '@/lib/branding';
import { COLLEGE_NAME } from '@/lib/site';
import { useTheme } from '@/components/ui/ThemeProvider';

const SIZE_MAP = {
  nav: {
    light: RIT_LOGO.sm,
    dark: RIT_LOGO.whiteSm,
    width: 100,
    height: 32,
    className: 'h-5 w-auto sm:h-6 lg:h-7',
  },
  sm: {
    light: RIT_LOGO.sm,
    dark: RIT_LOGO.whiteSm,
    width: 120,
    height: 40,
    className: 'h-7 w-auto sm:h-8',
  },
  hero: {
    light: RIT_LOGO.md,
    dark: RIT_LOGO.whiteMd,
    width: 160,
    height: 52,
    className: 'h-8 w-auto sm:h-10 md:h-11 lg:h-12',
  },
  md: {
    light: RIT_LOGO.md,
    dark: RIT_LOGO.whiteMd,
    width: 160,
    height: 52,
    className: 'h-8 w-auto sm:h-9',
  },
  lg: {
    light: RIT_LOGO.lg,
    dark: RIT_LOGO.whiteLg,
    width: 220,
    height: 72,
    className: 'h-10 w-auto sm:h-11',
  },
};

/**
 * RIT wordmark.
 * Light surfaces → official color logo.
 * Dark surfaces → official white logo (no CSS invert).
 * Pass forceVariant="light"|"dark" to override theme (e.g. always light on a white card).
 */
export default function RitLogo({
  size = 'md',
  showName = false,
  interactive = false,
  forceVariant,
  className = '',
}) {
  const { isDark } = useTheme();
  const config = SIZE_MAP[size] ?? SIZE_MAP.md;
  const useDark = forceVariant ? forceVariant === 'dark' : isDark;
  const src = useDark ? config.dark : config.light;

  return (
    <div
      className={`inline-flex flex-col items-center gap-2 ${
        interactive ? 'interactive-logo' : ''
      } ${className}`.trim()}
    >
      <Image
        src={src}
        alt={COLLEGE_NAME}
        width={config.width}
        height={config.height}
        className={`object-contain ${config.className}`}
      />
      {showName && (
        <p
          className={`max-w-xs text-center text-xs leading-snug sm:text-sm ${
            useDark ? 'text-brand-white/65' : 'text-brand-ink/60'
          }`}
        >
          {COLLEGE_NAME}
        </p>
      )}
    </div>
  );
}
