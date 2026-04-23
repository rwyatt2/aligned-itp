/**
 * logoSvgBuilder.ts
 *
 * Generates clean, production-ready SVG markup strings for the logomark,
 * and HTML markup strings for all lockup/wordmark variants.
 *
 * Lockups use HTML + flexbox (identical to the guidelines page) so the
 * browser handles text measurement — no guessed x-coordinates.
 * They are rendered to PNG via html-to-image in generateBrandZip.ts.
 */

// ─── Constants ──────────────────────────────────────────────────────────────

const LOGO_PATH =
  'M1088.98 745.654L1121 691.207C977.139 471.994 832.804 233.21 732.232 0H680.76C578.646 226.567 453.642 445.423 309.9 648.147C284.164 648.859 258.428 649.926 232.692 651.35C376.197 452.659 500.014 223.008 608.77 0H545.557C434.548 225.974 306.342 455.032 160.583 655.858C134.136 657.518 107.451 660.009 81.1219 662.263C227.355 460.132 354.256 227.041 464.79 0H401.696C286.654 234.633 151.57 471.52 0 680.056L26.2104 724.539C274.201 698.561 525.869 695.833 773.86 721.218C787.736 743.756 801.968 766.057 816.437 788.239C586.236 760.6 311.679 772.225 62.3832 785.985L94.8794 841.025C348.682 827.621 621.697 818.369 857.473 849.803L899.694 911.842C665.342 882.068 388.531 889.897 131.527 903.302L164.023 958.461C429.092 945.768 709.935 941.735 954.724 974L980.816 929.636C837.311 726.674 706.258 509.597 604.145 283.268C615.767 261.679 627.271 239.971 638.42 218.145C715.628 403.906 885.936 664.398 1016.75 868.427L1049.13 813.387C914.044 603.19 749.191 348.628 671.628 151.717C682.064 130.483 696.178 100.354 706.496 78.7646C804.103 302.603 950.099 534.626 1088.98 745.654ZM737.213 660.721C618.614 650.045 499.184 645.419 379.873 646.724C447.238 548.98 512.112 448.389 570.225 344.714C620.63 452.422 676.371 558.232 737.213 660.721Z'

const INLINE_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1121 974" style="width:100%;height:auto"><path d="${LOGO_PATH}" fill="currentColor"/></svg>`

// ─── Logomark Color Definitions ─────────────────────────────────────────────

export interface LogomarkVariant {
  name: string
  slug: string
  fill: string
  bgHex: string | null // null = transparent
  bgLabel: string
}

export const LOGOMARK_VARIANTS: LogomarkVariant[] = [
  { name: 'Kinetic',          slug: 'Kinetic',          fill: '#FF5E20', bgHex: null,      bgLabel: 'Transparent' },
  { name: 'White',            slug: 'White',            fill: '#FFFFFF', bgHex: '#0A0A0F', bgLabel: 'On Dark' },
  { name: 'Black',            slug: 'Black',            fill: '#0A0A0F', bgHex: null,      bgLabel: 'On Light' },
  { name: 'Industrial',       slug: 'Industrial',       fill: '#324458', bgHex: null,      bgLabel: 'Slate' },
  { name: 'Kinetic Inverse',  slug: 'KineticInverse',   fill: '#FFFFFF', bgHex: '#FF5E20', bgLabel: 'Reversed on Accent' },
  { name: 'Cool Gray',        slug: 'CoolGray',         fill: '#B0CEE2', bgHex: '#12121A', bgLabel: 'Soft on Dark' },
  { name: 'Charcoal',         slug: 'Charcoal',         fill: '#2A2A35', bgHex: null,      bgLabel: 'Graphite' },
  { name: 'Industrial Mono',  slug: 'IndustrialMono',   fill: '#90B6D5', bgHex: '#324458', bgLabel: 'Slate on Slate' },
]

// ─── Lockup Types ───────────────────────────────────────────────────────────

export type LockupType =
  | 'Wordmark'
  | 'CompactHorizontal'
  | 'CompactStacked'
  | 'PrimaryHorizontal'
  | 'DetailedHorizontal'
  | 'DetailedStacked'

export interface LockupColorScheme {
  name: string
  slug: string
  markFill: string
  textFill: string
  dividerFill: string
}

export const LOCKUP_COLOR_SCHEMES: LockupColorScheme[] = [
  { name: 'Default',  slug: 'Default', markFill: '#FF5E20', textFill: '#0A0A0F', dividerFill: '#FF5E20' },
  { name: 'White',    slug: 'White',   markFill: '#FFFFFF', textFill: '#FFFFFF', dividerFill: '#FFFFFF' },
  { name: 'Black',    slug: 'Black',   markFill: '#0A0A0F', textFill: '#0A0A0F', dividerFill: '#0A0A0F' },
]

// ─── SVG Generator (logomark only) ─────────────────────────────────────────

function svgWrap(width: number, height: number, content: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
${content}
</svg>`
}

/**
 * Pure logomark — just the triangle mark (SVG string).
 */
export function buildLogomarkSvg(fill: string): string {
  return svgWrap(1121, 974, `  <path d="${LOGO_PATH}" fill="${fill}" />`)
}

// ─── HTML Lockup Builders ───────────────────────────────────────────────────
//
// These return HTML strings that replicate the EXACT same flexbox layout used
// on the guidelines page. The browser's text layout engine handles spacing,
// so "Aligned | Technology Partners" renders pixel-perfect.
//
// Each builder returns { html, width, height } so the renderer knows the
// canvas dimensions.

export interface LockupHtmlResult {
  html: string
  width: number
  height: number
}

/**
 * Shared font-face declarations for lockup HTML.
 * We load Inter as a web fallback; Geist will be inherited if available.
 */
function fontStyle(): string {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500;600&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Geist Variable', 'Inter', system-ui, sans-serif; }
  `
}

/**
 * The pipe-divider wordmark fragment used across compact lockups.
 *
 * Exactly mirrors the guidelines page:
 *   <div class="flex items-center gap-2 leading-none">
 *     <span class="aligned">Aligned</span>
 *     <span class="pipe">|</span>
 *     <span class="subtitle-col">Technology<br/>Partners</span>
 *   </div>
 */
function pipeWordmark(
  textFill: string,
  dividerFill: string,
  alignedSize: string,
  subtitleSize: string,
): string {
  return `
    <div style="display:flex;align-items:center;gap:8px;line-height:1;">
      <span style="font-size:${alignedSize};font-weight:600;letter-spacing:-0.04em;color:${textFill};">Aligned</span>
      <span style="font-size:${alignedSize};font-weight:300;color:${dividerFill};">|</span>
      <span style="display:flex;flex-direction:column;font-size:${subtitleSize};font-weight:300;line-height:1.2;letter-spacing:0.03em;color:${textFill};padding-top:2px;">
        <span>Technology</span>
        <span>Partners</span>
      </span>
    </div>
  `
}

/**
 * Wordmark only — "Aligned | Technology Partners"
 */
export function buildWordmarkHtml(textFill: string, dividerFill: string): LockupHtmlResult {
  return {
    width: 360,
    height: 60,
    html: `<html><head><style>${fontStyle()}</style></head><body>
      <div style="display:flex;align-items:center;height:60px;padding:0 8px;">
        ${pipeWordmark(textFill, dividerFill, '42px', '14px')}
      </div>
    </body></html>`,
  }
}

/**
 * Compact Horizontal: mark + "Aligned | Technology Partners"
 */
export function buildCompactHorizontalHtml(scheme: LockupColorScheme): LockupHtmlResult {
  return {
    width: 440,
    height: 80,
    html: `<html><head><style>${fontStyle()}</style></head><body>
      <div style="display:flex;align-items:center;gap:16px;height:80px;padding:0 8px;">
        <div style="width:56px;flex-shrink:0;color:${scheme.markFill};">${INLINE_LOGO_SVG}</div>
        ${pipeWordmark(scheme.textFill, scheme.dividerFill, '32px', '13px')}
      </div>
    </body></html>`,
  }
}

/**
 * Compact Stacked: mark centered above "Aligned | Technology Partners"
 */
export function buildCompactStackedHtml(scheme: LockupColorScheme): LockupHtmlResult {
  return {
    width: 360,
    height: 160,
    html: `<html><head><style>${fontStyle()}</style></head><body>
      <div style="display:flex;flex-direction:column;align-items:center;gap:16px;padding:12px 8px;">
        <div style="width:60px;color:${scheme.markFill};">${INLINE_LOGO_SVG}</div>
        ${pipeWordmark(scheme.textFill, scheme.dividerFill, '32px', '13px')}
      </div>
    </body></html>`,
  }
}

/**
 * Primary Horizontal: mark + "Aligned Technology Partners" (single line)
 */
export function buildPrimaryHorizontalHtml(scheme: LockupColorScheme): LockupHtmlResult {
  return {
    width: 480,
    height: 70,
    html: `<html><head><style>${fontStyle()}</style></head><body>
      <div style="display:flex;align-items:center;gap:16px;height:70px;padding:0 8px;">
        <div style="width:52px;flex-shrink:0;color:${scheme.markFill};">${INLINE_LOGO_SVG}</div>
        <span style="font-size:24px;font-weight:500;letter-spacing:-0.02em;white-space:nowrap;color:${scheme.textFill};">Aligned Technology Partners</span>
      </div>
    </body></html>`,
  }
}

/**
 * Detailed Horizontal: larger mark + stacked company name
 */
export function buildDetailedHorizontalHtml(scheme: LockupColorScheme): LockupHtmlResult {
  return {
    width: 420,
    height: 130,
    html: `<html><head><style>${fontStyle()}</style></head><body>
      <div style="display:flex;align-items:center;gap:24px;height:130px;padding:0 8px;">
        <div style="width:80px;flex-shrink:0;color:${scheme.markFill};">${INLINE_LOGO_SVG}</div>
        <div style="display:flex;flex-direction:column;font-size:28px;font-weight:500;line-height:1.2;letter-spacing:-0.02em;color:${scheme.textFill};">
          <span>Aligned</span>
          <span>Technology</span>
          <span>Partners</span>
        </div>
      </div>
    </body></html>`,
  }
}

/**
 * Detailed Stacked: mark centered above stacked company name (centered)
 */
export function buildDetailedStackedHtml(scheme: LockupColorScheme): LockupHtmlResult {
  return {
    width: 300,
    height: 230,
    html: `<html><head><style>${fontStyle()}</style></head><body>
      <div style="display:flex;flex-direction:column;align-items:center;gap:20px;padding:12px 8px;">
        <div style="width:72px;color:${scheme.markFill};">${INLINE_LOGO_SVG}</div>
        <div style="display:flex;flex-direction:column;align-items:center;font-size:28px;font-weight:500;line-height:1.2;letter-spacing:-0.02em;color:${scheme.textFill};">
          <span>Aligned</span>
          <span>Technology</span>
          <span>Partners</span>
        </div>
      </div>
    </body></html>`,
  }
}

// ─── SVG Lockup Builders (foreignObject) ────────────────────────────────────
//
// These produce proper .svg files by embedding the same HTML flexbox layout
// inside an SVG <foreignObject>. This lets the rendering engine handle text
// measurement automatically — no hardcoded x-coordinates.

function lockupSvgWrap(width: number, height: number, htmlContent: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <foreignObject width="${width}" height="${height}">
    <div xmlns="http://www.w3.org/1999/xhtml">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500;600&amp;display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        div, span { font-family: 'Geist Variable', 'Inter', system-ui, sans-serif; }
      </style>
      ${htmlContent}
    </div>
  </foreignObject>
</svg>`
}

export function buildWordmarkSvg(textFill: string, dividerFill: string): string {
  return lockupSvgWrap(360, 60, `
    <div style="display:flex;align-items:center;height:60px;padding:0 8px;">
      ${pipeWordmark(textFill, dividerFill, '42px', '14px')}
    </div>
  `)
}

export function buildCompactHorizontalSvg(scheme: LockupColorScheme): string {
  return lockupSvgWrap(440, 80, `
    <div style="display:flex;align-items:center;gap:16px;height:80px;padding:0 8px;">
      <div style="width:56px;flex-shrink:0;color:${scheme.markFill};">${INLINE_LOGO_SVG}</div>
      ${pipeWordmark(scheme.textFill, scheme.dividerFill, '32px', '13px')}
    </div>
  `)
}

export function buildCompactStackedSvg(scheme: LockupColorScheme): string {
  return lockupSvgWrap(360, 160, `
    <div style="display:flex;flex-direction:column;align-items:center;gap:16px;padding:12px 8px;">
      <div style="width:60px;color:${scheme.markFill};">${INLINE_LOGO_SVG}</div>
      ${pipeWordmark(scheme.textFill, scheme.dividerFill, '32px', '13px')}
    </div>
  `)
}

export function buildPrimaryHorizontalSvg(scheme: LockupColorScheme): string {
  return lockupSvgWrap(480, 70, `
    <div style="display:flex;align-items:center;gap:16px;height:70px;padding:0 8px;">
      <div style="width:52px;flex-shrink:0;color:${scheme.markFill};">${INLINE_LOGO_SVG}</div>
      <span style="font-size:24px;font-weight:500;letter-spacing:-0.02em;white-space:nowrap;color:${scheme.textFill};">Aligned Technology Partners</span>
    </div>
  `)
}

export function buildDetailedHorizontalSvg(scheme: LockupColorScheme): string {
  return lockupSvgWrap(420, 130, `
    <div style="display:flex;align-items:center;gap:24px;height:130px;padding:0 8px;">
      <div style="width:80px;flex-shrink:0;color:${scheme.markFill};">${INLINE_LOGO_SVG}</div>
      <div style="display:flex;flex-direction:column;font-size:28px;font-weight:500;line-height:1.2;letter-spacing:-0.02em;color:${scheme.textFill};">
        <span>Aligned</span>
        <span>Technology</span>
        <span>Partners</span>
      </div>
    </div>
  `)
}

export function buildDetailedStackedSvg(scheme: LockupColorScheme): string {
  return lockupSvgWrap(300, 230, `
    <div style="display:flex;flex-direction:column;align-items:center;gap:20px;padding:12px 8px;">
      <div style="width:72px;color:${scheme.markFill};">${INLINE_LOGO_SVG}</div>
      <div style="display:flex;flex-direction:column;align-items:center;font-size:28px;font-weight:500;line-height:1.2;letter-spacing:-0.02em;color:${scheme.textFill};">
        <span>Aligned</span>
        <span>Technology</span>
        <span>Partners</span>
      </div>
    </div>
  `)
}

// ─── Public API ─────────────────────────────────────────────────────────────

export type LockupType_Key = LockupType

export const LOCKUP_TYPES: LockupType[] = [
  'Wordmark',
  'CompactHorizontal',
  'CompactStacked',
  'PrimaryHorizontal',
  'DetailedHorizontal',
  'DetailedStacked',
]

