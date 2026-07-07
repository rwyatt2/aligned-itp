import { SunMoon } from 'lucide-react'

/**
 * Shared copy for the "toggle Light/Dark to get that version of the logo" hint.
 * Kept in one place so wording stays consistent across every placement.
 */
export const THEME_VERSION_NOTE =
  'Toggle Light / Dark mode to preview and download the matching version of the logo.'

export const THEME_VERSION_NOTE_SHORT =
  'Toggle Light / Dark for the matching logo version.'

interface ThemeVersionNoteProps {
  /** Use the shorter copy (for tight spaces like dropdown menus). */
  short?: boolean
  /** Extra classes for the wrapper. */
  className?: string
  /** Render a more compact, muted variant. */
  compact?: boolean
}

/**
 * Small inline callout reminding users that the light/dark logo variant
 * follows the site theme. Colors come from the shared CSS custom properties
 * so it adapts automatically to the current theme.
 */
export default function ThemeVersionNote({
  short = false,
  className = '',
  compact = false,
}: ThemeVersionNoteProps) {
  return (
    <div
      className={`flex items-start gap-2 rounded-xl ${compact ? 'px-2.5 py-2' : 'px-4 py-3'} ${className}`}
      style={{
        backgroundColor: 'var(--bg-tertiary)',
        border: '1px solid var(--border-secondary)',
      }}
    >
      <SunMoon
        size={compact ? 13 : 15}
        className="shrink-0 mt-px"
        style={{ color: 'var(--accent)' }}
      />
      <span
        className={`${compact ? 'text-[10px]' : 'text-xs'} font-medium leading-relaxed`}
        style={{ color: 'var(--text-secondary)' }}
      >
        {short ? THEME_VERSION_NOTE_SHORT : THEME_VERSION_NOTE}
      </span>
    </div>
  )
}
