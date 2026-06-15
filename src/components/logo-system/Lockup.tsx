/**
 * Lockup.tsx
 *
 * Renders a logo lockup on the page using the shared `lockupSpec` as the single
 * source of truth. The same spec drives the SVG/PNG/EPS exports, so what's shown
 * here is exactly what gets downloaded.
 */

import type { CSSProperties } from 'react'
import {
  LOCKUP_SPECS,
  type LockupKind,
  type PipeWordmarkSpec,
  type TextStyle,
} from '../../lib/lockupSpec'
import AlignedLogo from '../hero/AlignedLogo'

const TEXT = 'var(--text-primary)'
const ACCENT = 'var(--accent)'

function textStyle(s: TextStyle, color: string, extra: CSSProperties = {}): CSSProperties {
  return {
    fontSize: s.fontSizePx,
    fontWeight: s.weight,
    letterSpacing: `${s.letterSpacingEm}em`,
    lineHeight: s.lineHeight,
    color,
    ...extra,
  }
}

function Mark({ widthPx }: { widthPx: number }) {
  return (
    <div style={{ width: widthPx, flexShrink: 0, color: ACCENT }}>
      <AlignedLogo animated={false} color={ACCENT} />
    </div>
  )
}

function PipeWordmark({ p }: { p: PipeWordmarkSpec }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: p.gapPx, lineHeight: 1 }}>
      <span style={textStyle(p.aligned, TEXT, p.alignedMarginTopPx ? { marginTop: p.alignedMarginTopPx } : {})}>
        Aligned
      </span>
      <span style={textStyle(p.pipe, ACCENT)}>|</span>
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          ...textStyle(p.subtitle, TEXT, { marginTop: p.subtitleMarginTopPx }),
        }}
      >
        <span>{p.subtitleLines[0]}</span>
        <span>{p.subtitleLines[1]}</span>
      </span>
    </div>
  )
}

export default function Lockup({ kind }: { kind: LockupKind }) {
  const s = LOCKUP_SPECS[kind]

  if (s.pipe) {
    if (s.orientation === 'stacked') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: s.gapPx }}>
          {s.markWidthPx != null && <Mark widthPx={s.markWidthPx} />}
          <PipeWordmark p={s.pipe} />
        </div>
      )
    }
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: s.gapPx }}>
        {s.markWidthPx != null && <Mark widthPx={s.markWidthPx} />}
        <PipeWordmark p={s.pipe} />
      </div>
    )
  }

  if (s.singleLine) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: s.gapPx }}>
        {s.markWidthPx != null && <Mark widthPx={s.markWidthPx} />}
        <span style={textStyle(s.singleLine.style, TEXT, { whiteSpace: 'nowrap' })}>{s.singleLine.text}</span>
      </div>
    )
  }

  if (s.block) {
    const block = s.block
    const textBlock = (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: block.align === 'center' ? 'center' : 'flex-start',
          ...textStyle(block.style, TEXT),
        }}
      >
        {block.lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    )

    if (s.orientation === 'stacked') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: s.gapPx }}>
          {s.markWidthPx != null && <Mark widthPx={s.markWidthPx} />}
          {textBlock}
        </div>
      )
    }
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: s.gapPx }}>
        {s.markWidthPx != null && <Mark widthPx={s.markWidthPx} />}
        {textBlock}
      </div>
    )
  }

  return null
}
