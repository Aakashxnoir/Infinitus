import Image from 'next/image';
import { RIT_LOGO } from '@/lib/branding';
import { COLLEGE_NAME } from '@/lib/site';
const SIZE_MAP = {
  nav: {
    src: RIT_LOGO.sm,
    width: 100,
    height: 32,
    className: 'h-6 w-auto sm:h-7',
  },
  sm: {
    src: RIT_LOGO.sm,
    width: 120,
    height: 40,
    className: 'h-7 w-auto sm:h-8',
  },
  md: {
    src: RIT_LOGO.md,
    width: 160,
    height: 52,
    className: 'h-8 w-auto sm:h-9',
  },
  lg: {
    src: RIT_LOGO.lg,
    width: 220,
    height: 72,
    className: 'h-10 w-auto sm:h-11',
  },
};

export default function RitLogo({
  size = 'md',
  showName = false,
  interactive = false,
  className = '',
}) {
  const config = SIZE_MAP[size] ?? SIZE_MAP.md;

  return (
    <div
      className={`inline-flex flex-col items-center gap-2 ${
        interactive ? 'interactive-logo' : ''
      } ${className}`.trim()}
    >
      <Image
        src={config.src}
        alt={COLLEGE_NAME}
        width={config.width}
        height={config.height}
        className={`object-contain ${config.className}`}
      />
      {showName && (
        <p className="max-w-xs text-center text-xs leading-snug text-brand-ink/60 sm:text-sm">
          {COLLEGE_NAME}
        </p>
      )}
    </div>
  );
}
