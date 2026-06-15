/**
 * epsGenerator.ts
 *
 * Produces true-vector, print-ready EPS (Encapsulated PostScript) for the
 * logomark and every lockup. Text is converted to outlines with opentype.js
 * (genuine Geist glyphs), and the layout is computed from the shared
 * `lockupSpec`, so the EPS is an exact match of the on-page logo.
 *
 * Coordinates are computed in SVG space (y down) and flipped to PostScript
 * space (y up) at emit time.
 */

import type * as opentype from 'opentype.js'
import { MARK_PATH, MARK_W, MARK_H, type LockupKind } from './lockupSpec'
import { layoutLockup, loadGeistFonts, type GeistFonts } from './lockupLayout'
import type { LockupColorScheme } from './logoSvgBuilder'

// ─── Path op model (SVG space) ──────────────────────────────────────────────

type EpsOp =
  | { t: 'm'; x: number; y: number }
  | { t: 'l'; x: number; y: number }
  | { t: 'c'; x1: number; y1: number; x2: number; y2: number; x: number; y: number }
  | { t: 'z' }

interface Drawable {
  rgb: [number, number, number]
  ops: EpsOp[]
}

// ─── Color ──────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace('#', '').trim()
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  const n = parseInt(h, 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

// ─── SVG path parser (absolute output) ──────────────────────────────────────
// Supports M/L/H/V/C/S/Q/T/Z (absolute + relative), implicit repeated commands,
// and smooth-curve reflection. Sufficient for the logomark path.

function parseSvgPath(d: string): EpsOp[] {
  const ops: EpsOp[] = []
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi) || []
  let i = 0
  let cmd = ''
  let cx = 0
  let cy = 0
  let startX = 0
  let startY = 0
  let prevCtrlX = 0
  let prevCtrlY = 0
  let prevCmd = ''

  const num = () => parseFloat(tokens[i++])
  const isCmd = (t: string) => /^[a-zA-Z]$/.test(t)

  while (i < tokens.length) {
    if (isCmd(tokens[i])) {
      cmd = tokens[i++]
    } else if (cmd === 'M') {
      cmd = 'L' // implicit lineto after first moveto pair
    } else if (cmd === 'm') {
      cmd = 'l'
    }
    const rel = cmd === cmd.toLowerCase()
    const C = cmd.toUpperCase()

    switch (C) {
      case 'M': {
        let x = num()
        let y = num()
        if (rel) { x += cx; y += cy }
        cx = x; cy = y; startX = x; startY = y
        ops.push({ t: 'm', x, y })
        break
      }
      case 'L': {
        let x = num()
        let y = num()
        if (rel) { x += cx; y += cy }
        cx = x; cy = y
        ops.push({ t: 'l', x, y })
        break
      }
      case 'H': {
        let x = num()
        if (rel) x += cx
        cx = x
        ops.push({ t: 'l', x, y: cy })
        break
      }
      case 'V': {
        let y = num()
        if (rel) y += cy
        cy = y
        ops.push({ t: 'l', x: cx, y })
        break
      }
      case 'C': {
        let x1 = num(), y1 = num(), x2 = num(), y2 = num(), x = num(), y = num()
        if (rel) { x1 += cx; y1 += cy; x2 += cx; y2 += cy; x += cx; y += cy }
        ops.push({ t: 'c', x1, y1, x2, y2, x, y })
        prevCtrlX = x2; prevCtrlY = y2; cx = x; cy = y
        break
      }
      case 'S': {
        let x2 = num(), y2 = num(), x = num(), y = num()
        if (rel) { x2 += cx; y2 += cy; x += cx; y += cy }
        const reflect = prevCmd === 'C' || prevCmd === 'S'
        const x1 = reflect ? 2 * cx - prevCtrlX : cx
        const y1 = reflect ? 2 * cy - prevCtrlY : cy
        ops.push({ t: 'c', x1, y1, x2, y2, x, y })
        prevCtrlX = x2; prevCtrlY = y2; cx = x; cy = y
        break
      }
      case 'Q': {
        let qx = num(), qy = num(), x = num(), y = num()
        if (rel) { qx += cx; qy += cy; x += cx; y += cy }
        ops.push(quadToCubic(cx, cy, qx, qy, x, y))
        prevCtrlX = qx; prevCtrlY = qy; cx = x; cy = y
        break
      }
      case 'T': {
        let x = num(), y = num()
        if (rel) { x += cx; y += cy }
        const reflect = prevCmd === 'Q' || prevCmd === 'T'
        const qx = reflect ? 2 * cx - prevCtrlX : cx
        const qy = reflect ? 2 * cy - prevCtrlY : cy
        ops.push(quadToCubic(cx, cy, qx, qy, x, y))
        prevCtrlX = qx; prevCtrlY = qy; cx = x; cy = y
        break
      }
      case 'Z': {
        ops.push({ t: 'z' })
        cx = startX; cy = startY
        break
      }
      default:
        i++ // skip unknown
    }
    prevCmd = C
  }
  return ops
}

function quadToCubic(x0: number, y0: number, qx: number, qy: number, x: number, y: number): EpsOp {
  return {
    t: 'c',
    x1: x0 + (2 / 3) * (qx - x0),
    y1: y0 + (2 / 3) * (qy - y0),
    x2: x + (2 / 3) * (qx - x),
    y2: y + (2 / 3) * (qy - y),
    x,
    y,
  }
}

// ─── opentype path -> EpsOp[] ───────────────────────────────────────────────

function glyphPathToOps(path: opentype.Path): EpsOp[] {
  const ops: EpsOp[] = []
  for (const c of path.commands) {
    switch (c.type) {
      case 'M': ops.push({ t: 'm', x: c.x, y: c.y }); break
      case 'L': ops.push({ t: 'l', x: c.x, y: c.y }); break
      case 'C': ops.push({ t: 'c', x1: c.x1, y1: c.y1, x2: c.x2, y2: c.y2, x: c.x, y: c.y }); break
      case 'Q': ops.push(quadToCubic(lastX(ops), lastY(ops), c.x1, c.y1, c.x, c.y)); break
      case 'Z': ops.push({ t: 'z' }); break
    }
  }
  return ops
}

function lastX(ops: EpsOp[]): number {
  for (let i = ops.length - 1; i >= 0; i--) {
    const o = ops[i]
    if (o.t !== 'z') return o.x
  }
  return 0
}
function lastY(ops: EpsOp[]): number {
  for (let i = ops.length - 1; i >= 0; i--) {
    const o = ops[i]
    if (o.t !== 'z') return o.y
  }
  return 0
}

// ─── Transform helpers ──────────────────────────────────────────────────────

function transformOps(ops: EpsOp[], sx: number, sy: number, tx: number, ty: number): EpsOp[] {
  const fx = (x: number) => x * sx + tx
  const fy = (y: number) => y * sy + ty
  return ops.map((o) => {
    switch (o.t) {
      case 'm': return { t: 'm', x: fx(o.x), y: fy(o.y) }
      case 'l': return { t: 'l', x: fx(o.x), y: fy(o.y) }
      case 'c': return { t: 'c', x1: fx(o.x1), y1: fy(o.y1), x2: fx(o.x2), y2: fy(o.y2), x: fx(o.x), y: fy(o.y) }
      case 'z': return { t: 'z' }
    }
  })
}

// ─── EPS document emit (flips y -> PostScript up) ───────────────────────────

const fmt = (n: number): string => {
  const r = Math.round(n * 1000) / 1000
  return Object.is(r, -0) ? '0' : String(r)
}

function emitEps(width: number, height: number, drawables: Drawable[], title: string): string {
  const H = height
  const fy = (y: number) => H - y
  const lines: string[] = []
  lines.push('%!PS-Adobe-3.0 EPSF-3.0')
  lines.push(`%%BoundingBox: 0 0 ${Math.ceil(width)} ${Math.ceil(height)}`)
  lines.push(`%%HiResBoundingBox: 0 0 ${fmt(width)} ${fmt(height)}`)
  lines.push('%%Creator: Aligned Technology Partners brand site')
  lines.push(`%%Title: ${title}`)
  lines.push(`%%CreationDate: ${new Date().toISOString().split('T')[0]}`)
  lines.push('%%LanguageLevel: 2')
  lines.push('%%EndComments')
  lines.push('%%BeginProlog')
  lines.push('/m { moveto } bind def')
  lines.push('/l { lineto } bind def')
  lines.push('/c { curveto } bind def')
  lines.push('/h { closepath } bind def')
  lines.push('/rg { setrgbcolor } bind def')
  lines.push('/f { fill } bind def')
  lines.push('%%EndProlog')

  for (const d of drawables) {
    if (d.ops.length === 0) continue
    lines.push(`${fmt(d.rgb[0])} ${fmt(d.rgb[1])} ${fmt(d.rgb[2])} rg`)
    lines.push('newpath')
    for (const o of d.ops) {
      switch (o.t) {
        case 'm': lines.push(`${fmt(o.x)} ${fmt(fy(o.y))} m`); break
        case 'l': lines.push(`${fmt(o.x)} ${fmt(fy(o.y))} l`); break
        case 'c': lines.push(`${fmt(o.x1)} ${fmt(fy(o.y1))} ${fmt(o.x2)} ${fmt(fy(o.y2))} ${fmt(o.x)} ${fmt(fy(o.y))} c`); break
        case 'z': lines.push('h'); break
      }
    }
    lines.push('f')
  }

  lines.push('showpage')
  lines.push('%%EOF')
  return lines.join('\n')
}

// ─── Public builders ────────────────────────────────────────────────────────

const MARK_OPS = parseSvgPath(MARK_PATH)

/** Pure logomark EPS at native viewBox size (1121 x 974). */
export function buildLogomarkEps(fill: string, title = 'Aligned Logomark'): string {
  return emitEps(MARK_W, MARK_H, [{ rgb: hexToRgb(fill), ops: MARK_OPS }], title)
}

function lockupDrawables(kind: LockupKind, scheme: LockupColorScheme, fonts: GeistFonts) {
  const layout = layoutLockup(kind, fonts)
  const drawables: Drawable[] = []

  if (layout.mark) {
    const sx = layout.mark.width / MARK_W
    const sy = layout.mark.height / MARK_H
    drawables.push({
      rgb: hexToRgb(scheme.markFill),
      ops: transformOps(MARK_OPS, sx, sy, layout.mark.x, layout.mark.y),
    })
  }

  for (const run of layout.runs) {
    const font = fonts[run.weight]
    const path = font.getPath(run.text, run.x, run.baselineY, run.fontSizePx, {
      kerning: true,
      letterSpacing: run.letterSpacingEm,
    })
    drawables.push({
      rgb: hexToRgb(run.role === 'divider' ? scheme.dividerFill : scheme.textFill),
      ops: glyphPathToOps(path),
    })
  }

  return { drawables, width: layout.width, height: layout.height }
}

export async function buildLockupEps(
  kind: LockupKind,
  scheme: LockupColorScheme,
  title = `Aligned ${kind}`,
): Promise<string> {
  const fonts = await loadGeistFonts()
  const { drawables, width, height } = lockupDrawables(kind, scheme, fonts)
  return emitEps(width, height, drawables, title)
}

// ─── Per-card dispatch ──────────────────────────────────────────────────────

export type EpsSource =
  | { kind: 'logomark'; fill: string }
  | { kind: 'lockup'; type: LockupKind; scheme: LockupColorScheme }

export async function buildEps(source: EpsSource): Promise<string> {
  if (source.kind === 'logomark') return buildLogomarkEps(source.fill)
  return buildLockupEps(source.type, source.scheme)
}

export function epsToBlob(eps: string): Blob {
  return new Blob([eps], { type: 'application/postscript' })
}
