/**
 * Endless horizontal ticker. Children render twice so the loop is seamless; the copy is hidden
 * from assistive tech. Pauses on hover and stops for reduced motion (styles/globals.css).
 */
export default function Marquee({ children, duration = 40, reverse = false, className = '' }) {
  return (
    <div
      className={`marquee flex overflow-hidden ${reverse ? 'marquee-reverse' : ''} ${className}`}
      style={{ '--marquee-duration': `${duration}s` }}
    >
      <div className="marquee-track flex w-max shrink-0">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
