/**
 * lockupLayout.ts
 *
 * Pure geometry for the logo lockups, computed from `lockupSpec` using real
 * Geist font metrics (via opentype.js). This is what makes the EPS export an
 * exact match: it reproduces the browser's flexbox + line-box layout so the
 * mark and every glyph land in the same place as the live page.
 *
 * Returns absolute positions in SVG coordinate space (origin top-left, y down).
 * The EPS generator flips Y to PostScript space.
 */

import * as opentype from 'opentype.js'
import {
  LOCKUP_SPECS,
  WEIGHT_TO_GEIST,
  markHeightForWidth,
  type FontWeight,
  type LockupKind,
  type LockupSpec,
  type PipeWordmarkSpec,
  type TextStyle,
} from './lockupSpec'

export type GeistFonts = Record<FontWeight, opentype.Font>

export interface PlacedRun {
  text: string
  weight: FontWeight
  fontSizePx: number
  letterSpacingEm: number
  role: 'text' | 'divider'
  x: number
  baselineY: number
}

export interface PlacedMark {
  x: number
  y: number
  width: number
  height: number
}

export interface Layout {
  width: number
  height: number
  mark: PlacedMark | null
  runs: PlacedRun[]
}

// ─── Font loading (memoized) ────────────────────────────────────────────────

let fontsPromise: Promise<GeistFonts> | null = null

async function loadOtf(weight: FontWeight): Promise<opentype.Font> {
  const base = import.meta.env.BASE_URL
  const url = `${base}fonts/geist/otf/Geist-${WEIGHT_TO_GEIST[weight]}.otf`
  const resp = await fetch(url)
  if (!resp.ok) throw new Error(`Failed to load font ${url}: ${resp.statusText}`)
  const buffer = await resp.arrayBuffer()
  return opentype.parse(buffer)
}

export function loadGeistFonts(): Promise<GeistFonts> {
  if (!fontsPromise) {
    fontsPromise = (async () => {
      const [w300, w500, w600] = await Promise.all([loadOtf(300), loadOtf(500), loadOtf(600)])
      return { 300: w300, 500: w500, 600: w600 } as GeistFonts
    })().catch((err) => {
      fontsPromise = null // allow retry on failure
      throw err
    })
  }
  return fontsPromise
}

// ─── Metric helpers ─────────────────────────────────────────────────────────

function advance(text: string, style: TextStyle, fonts: GeistFonts): number {
  return fonts[style.weight].getAdvanceWidth(text, style.fontSizePx, {
    kerning: true,
    letterSpacing: style.letterSpacingEm,
  })
}

/** Distance from the top of a single line box down to the text baseline (CSS model). */
function baselineFromTop(style: TextStyle, fonts: GeistFonts): number {
  const font = fonts[style.weight]
  const lineBox = style.lineHeight * style.fontSizePx
  const ascent = (font.ascender / font.unitsPerEm) * style.fontSizePx
  const descent = (-font.descender / font.unitsPerEm) * style.fontSizePx
  const halfLeading = (lineBox - (ascent + descent)) / 2
  return halfLeading + ascent
}

const lineBoxOf = (style: TextStyle) => style.lineHeight * style.fontSizePx

// ─── Pipe wordmark group ────────────────────────────────────────────────────

interface PipeGroup {
  width: number
  height: number
  build: (originX: number, originY: number) => PlacedRun[]
}

function pipeGroup(p: PipeWordmarkSpec, fonts: GeistFonts): PipeGroup {
  const alignedW = advance('Aligned', p.aligned, fonts)
  const pipeW = advance('|', p.pipe, fonts)
  const sub1W = advance(p.subtitleLines[0], p.subtitle, fonts)
  const sub2W = advance(p.subtitleLines[1], p.subtitle, fonts)
  const subW = Math.max(sub1W, sub2W)

  const alignedBox = lineBoxOf(p.aligned)
  const pipeBox = lineBoxOf(p.pipe)
  const subBox = lineBoxOf(p.subtitle)
  const subBlock = subBox * 2

  const width = alignedW + p.gapPx + pipeW + p.gapPx + subW
  const height = Math.max(
    p.alignedMarginTopPx + alignedBox,
    pipeBox,
    p.subtitleMarginTopPx + subBlock,
  )

  const build = (x0: number, y0: number): PlacedRun[] => {
    const runs: PlacedRun[] = []
    let cx = x0

    // "Aligned"
    {
      const marginBox = p.alignedMarginTopPx + alignedBox
      const top = y0 + (height - marginBox) / 2 + p.alignedMarginTopPx
      runs.push({
        text: 'Aligned',
        weight: p.aligned.weight,
        fontSizePx: p.aligned.fontSizePx,
        letterSpacingEm: p.aligned.letterSpacingEm,
        role: 'text',
        x: cx,
        baselineY: top + baselineFromTop(p.aligned, fonts),
      })
      cx += alignedW + p.gapPx
    }

    // "|"
    {
      const top = y0 + (height - pipeBox) / 2
      runs.push({
        text: '|',
        weight: p.pipe.weight,
        fontSizePx: p.pipe.fontSizePx,
        letterSpacingEm: p.pipe.letterSpacingEm,
        role: 'divider',
        x: cx,
        baselineY: top + baselineFromTop(p.pipe, fonts),
      })
      cx += pipeW + p.gapPx
    }

    // "Technology" / "Partners" column
    {
      const marginBox = p.subtitleMarginTopPx + subBlock
      const top = y0 + (height - marginBox) / 2 + p.subtitleMarginTopPx
      const base1 = top + baselineFromTop(p.subtitle, fonts)
      const common = {
        weight: p.subtitle.weight,
        fontSizePx: p.subtitle.fontSizePx,
        letterSpacingEm: p.subtitle.letterSpacingEm,
        role: 'text' as const,
        x: cx,
      }
      runs.push({ ...common, text: p.subtitleLines[0], baselineY: base1 })
      runs.push({ ...common, text: p.subtitleLines[1], baselineY: base1 + subBox })
    }

    return runs
  }

  return { width, height, build }
}

// ─── Full lockup layout ─────────────────────────────────────────────────────

export function layoutLockup(kind: LockupKind, fonts: GeistFonts): Layout {
  const spec: LockupSpec = LOCKUP_SPECS[kind]
  const P = spec.paddingPx
  const markW = spec.markWidthPx
  const markH = markW != null ? markHeightForWidth(markW) : 0

  // Build the text block (group / single line / multi-line block) and a placer.
  let blockW = 0
  let blockH = 0
  let placeBlock: (x0: number, y0: number) => PlacedRun[]

  if (spec.pipe) {
    const g = pipeGroup(spec.pipe, fonts)
    blockW = g.width
    blockH = g.height
    placeBlock = g.build
  } else if (spec.singleLine) {
    const { text, style } = spec.singleLine
    blockW = advance(text, style, fonts)
    blockH = lineBoxOf(style)
    placeBlock = (x0, y0) => [
      {
        text,
        weight: style.weight,
        fontSizePx: style.fontSizePx,
        letterSpacingEm: style.letterSpacingEm,
        role: 'text',
        x: x0,
        baselineY: y0 + baselineFromTop(style, fonts),
      },
    ]
  } else if (spec.block) {
    const { lines, style, align } = spec.block
    const widths = lines.map((l) => advance(l, style, fonts))
    blockW = Math.max(...widths)
    const box = lineBoxOf(style)
    blockH = box * lines.length
    placeBlock = (x0, y0) =>
      lines.map((line, i) => ({
        text: line,
        weight: style.weight,
        fontSizePx: style.fontSizePx,
        letterSpacingEm: style.letterSpacingEm,
        role: 'text' as const,
        x: align === 'center' ? x0 + (blockW - widths[i]) / 2 : x0,
        baselineY: y0 + i * box + baselineFromTop(style, fonts),
      }))
  } else {
    throw new Error(`Lockup ${kind} has no text content`)
  }

  let width: number
  let height: number
  let mark: PlacedMark | null = null
  let runs: PlacedRun[]

  if (spec.orientation === 'horizontal') {
    const markSlot = markW != null ? markW + spec.gapPx : 0
    const rowH = Math.max(markH, blockH)
    width = 2 * P + markSlot + blockW
    height = 2 * P + rowH
    if (markW != null) {
      mark = { x: P, y: P + (rowH - markH) / 2, width: markW, height: markH }
    }
    runs = placeBlock(P + markSlot, P + (rowH - blockH) / 2)
  } else {
    // stacked
    const colW = Math.max(markW ?? 0, blockW)
    const colH = markH + spec.gapPx + blockH
    width = 2 * P + colW
    height = 2 * P + colH
    if (markW != null) {
      mark = { x: P + (colW - markW) / 2, y: P, width: markW, height: markH }
    }
    runs = placeBlock(P + (colW - blockW) / 2, P + markH + spec.gapPx)
  }

  return { width, height, mark, runs }
}
