/**
 * Feather-style Eye and Eye-off icons for password visibility toggle.
 * Simple paths that render cleanly across browsers.
 * - When input type is "password" (masked): show EyeOff (click to show).
 * - When input type is "text" (visible): show Eye (click to hide).
 */

const iconClass = 'w-5 h-5 flex-shrink-0'
const strokeProps = { strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export function EyeIcon({ className = iconClass }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden {...strokeProps}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function EyeSlashIcon({ className = iconClass }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden {...strokeProps}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}
