import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/** Telegram paper-plane mark (lucide-react has no brand icons). */
export function TelegramIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M21.5 3.6 2.9 10.8c-1 .4-1 1.8.1 2.1l4.6 1.4 1.8 5.6c.3.9 1.4 1.1 2 .4l2.6-2.6 4.6 3.4c.8.6 1.9.1 2.1-.8l3.1-14.3c.3-1.3-1-2.4-2.3-1.9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="m7.6 14.3 10-6.6-7.4 8.1" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

/** Instagram camera mark. */
export function InstagramIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  );
}

/** Copper divider ornament: line — diamond — line. */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="160"
      height="14"
      viewBox="0 0 160 14"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 7h62M98 7h62" stroke="var(--color-copper)" strokeWidth="2" />
      <path d="M0 10.5h56M104 10.5h56" stroke="var(--color-copper-light)" strokeWidth="0.75" opacity="0.6" />
      <path d="M80 1 86 7l-6 6-6-6 6-6Z" fill="var(--color-copper)" />
      <path d="M68 7l3-3 3 3-3 3-3-3ZM86 7l3-3 3 3-3 3-3-3Z" fill="var(--color-copper-light)" />
    </svg>
  );
}
