/**
 * lockupSpec.ts
 *
 * SINGLE SOURCE OF TRUTH for the Aligned Technology Partners logo geometry and
 * typography. Every surface that renders a logo derives its metrics from here:
 *   - the live page lockup cards (LogoSystem.tsx -> <Lockup>)
 *   - the downloadable SVG + PNG (logoSvgBuilder.ts / generateBrandZip.ts)
 *   - the downloadable EPS (epsGenerator.ts)
 *
 * All values are taken directly from the page's Tailwind classes, converted to
 * absolute units (rem x 16). Keeping them in one place guarantees that the
 * page, SVG, PNG, and EPS exports are pixel-identical.
 */

export const REM = 16

// Tailwind tracking tokens (em)
export const TRACK_TIGHT = -0.025
export const TRACK_WIDE = 0.025
export const TRACK_NORMAL = 0

// ─── Logomark geometry ──────────────────────────────────────────────────────
// Single compound path (nonzero winding produces the inner-triangle hole).

export const MARK_PATH =
  'M1088.98 745.654L1121 691.207C977.139 471.994 832.804 233.21 732.232 0H680.76C578.646 226.567 453.642 445.423 309.9 648.147C284.164 648.859 258.428 649.926 232.692 651.35C376.197 452.659 500.014 223.008 608.77 0H545.557C434.548 225.974 306.342 455.032 160.583 655.858C134.136 657.518 107.451 660.009 81.1219 662.263C227.355 460.132 354.256 227.041 464.79 0H401.696C286.654 234.633 151.57 471.52 0 680.056L26.2104 724.539C274.201 698.561 525.869 695.833 773.86 721.218C787.736 743.756 801.968 766.057 816.437 788.239C586.236 760.6 311.679 772.225 62.3832 785.985L94.8794 841.025C348.682 827.621 621.697 818.369 857.473 849.803L899.694 911.842C665.342 882.068 388.531 889.897 131.527 903.302L164.023 958.461C429.092 945.768 709.935 941.735 954.724 974L980.816 929.636C837.311 726.674 706.258 509.597 604.145 283.268C615.767 261.679 627.271 239.971 638.42 218.145C715.628 403.906 885.936 664.398 1016.75 868.427L1049.13 813.387C914.044 603.19 749.191 348.628 671.628 151.717C682.064 130.483 696.178 100.354 706.496 78.7646C804.103 302.603 950.099 534.626 1088.98 745.654ZM737.213 660.721C618.614 650.045 499.184 645.419 379.873 646.724C447.238 548.98 512.112 448.389 570.225 344.714C620.63 452.422 676.371 558.232 737.213 660.721Z'

export const MARK_W = 1121
export const MARK_H = 974
export const markHeightForWidth = (widthPx: number): number => (widthPx * MARK_H) / MARK_W

// ─── Weights ────────────────────────────────────────────────────────────────
// Maps to the static Geist OTF instances bundled under public/fonts/geist/otf.

export type FontWeight = 300 | 500 | 600
export const WEIGHT_TO_GEIST: Record<FontWeight, string> = {
  300: 'Light',
  500: 'Medium',
  600: 'SemiBold',
}

// ─── Type styles ────────────────────────────────────────────────────────────

export interface TextStyle {
  fontSizePx: number
  weight: FontWeight
  letterSpacingEm: number
  lineHeight: number
}

/**
 * The "Aligned | Technology Partners" pipe wordmark, shared by the Wordmark,
 * Compact Horizontal, and Compact Stacked lockups.
 */
export interface PipeWordmarkSpec {
  gapPx: number
  aligned: TextStyle
  alignedMarginTopPx: number
  pipe: TextStyle
  subtitle: TextStyle
  subtitleMarginTopPx: number
  subtitleLines: [string, string]
}

export type LockupKind =
  | 'Wordmark'
  | 'CompactHorizontal'
  | 'CompactStacked'
  | 'PrimaryHorizontal'
  | 'DetailedHorizontal'
  | 'DetailedStacked'

export interface LockupSpec {
  kind: LockupKind
  orientation: 'horizontal' | 'stacked'
  /** Width of the logomark in px, or null when the lockup has no mark. */
  markWidthPx: number | null
  /** Gap between the mark and the text block (cross-axis gap for the row/column). */
  gapPx: number
  /** Transparent padding around the content in the exported canvas. */
  paddingPx: number
  pipe?: PipeWordmarkSpec
  singleLine?: { text: string; style: TextStyle }
  block?: { lines: string[]; style: TextStyle; align: 'left' | 'center' }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function pipeWordmark(alignedPx: number, subtitlePx: number, alignedMarginTopPx: number): PipeWordmarkSpec {
  return {
    gapPx: 8, // gap-2
    aligned: { fontSizePx: alignedPx, weight: 600, letterSpacingEm: TRACK_TIGHT, lineHeight: 1 },
    alignedMarginTopPx,
    pipe: { fontSizePx: alignedPx, weight: 300, letterSpacingEm: TRACK_NORMAL, lineHeight: 1 },
    subtitle: { fontSizePx: subtitlePx, weight: 500, letterSpacingEm: TRACK_WIDE, lineHeight: 1.2 },
    subtitleMarginTopPx: 2, // mt-0.5
    subtitleLines: ['Technology', 'Partners'],
  }
}

// ─── Specs (values mirror LogoSystem.tsx) ───────────────────────────────────

export const LOCKUP_SPECS: Record<LockupKind, LockupSpec> = {
  // text-[2rem] semibold tracking-tight | text-[0.85rem] light tracking-wide
  Wordmark: {
    kind: 'Wordmark',
    orientation: 'horizontal',
    markWidthPx: null,
    gapPx: 0,
    paddingPx: 8,
    pipe: pipeWordmark(2 * REM, 0.85 * REM, 0),
  },
  // w-10 mark, gap-4 | text-[1.65rem] (aligned has mt-0.5) | text-[0.75rem]
  CompactHorizontal: {
    kind: 'CompactHorizontal',
    orientation: 'horizontal',
    markWidthPx: 40,
    gapPx: 16,
    paddingPx: 8,
    pipe: pipeWordmark(1.65 * REM, 0.75 * REM, 2),
  },
  // w-12 mark, gap-5 stacked | text-[1.65rem] (no aligned mt) | text-[0.75rem]
  CompactStacked: {
    kind: 'CompactStacked',
    orientation: 'stacked',
    markWidthPx: 48,
    gapPx: 20,
    paddingPx: 12,
    pipe: pipeWordmark(1.65 * REM, 0.75 * REM, 0),
  },
  // w-12 mark, gap-4 | text-xl medium tracking-tight (line-height 1.4)
  PrimaryHorizontal: {
    kind: 'PrimaryHorizontal',
    orientation: 'horizontal',
    markWidthPx: 48,
    gapPx: 16,
    paddingPx: 8,
    singleLine: {
      text: 'Aligned Technology Partners',
      style: { fontSizePx: 1.25 * REM, weight: 500, letterSpacingEm: TRACK_TIGHT, lineHeight: 1.4 },
    },
  },
  // w-20 mark, gap-6 | text-[1.4rem] medium leading-[1.2] tracking-tight
  DetailedHorizontal: {
    kind: 'DetailedHorizontal',
    orientation: 'horizontal',
    markWidthPx: 80,
    gapPx: 24,
    paddingPx: 8,
    block: {
      lines: ['Aligned', 'Technology', 'Partners'],
      style: { fontSizePx: 1.4 * REM, weight: 500, letterSpacingEm: TRACK_TIGHT, lineHeight: 1.2 },
      align: 'left',
    },
  },
  // w-16 mark, gap-6 stacked | text-[1.4rem] medium leading-[1.2] centered
  DetailedStacked: {
    kind: 'DetailedStacked',
    orientation: 'stacked',
    markWidthPx: 64,
    gapPx: 24,
    paddingPx: 12,
    block: {
      lines: ['Aligned', 'Technology', 'Partners'],
      style: { fontSizePx: 1.4 * REM, weight: 500, letterSpacingEm: TRACK_TIGHT, lineHeight: 1.2 },
      align: 'center',
    },
  },
}

export const LOCKUP_KINDS: LockupKind[] = [
  'Wordmark',
  'CompactHorizontal',
  'CompactStacked',
  'PrimaryHorizontal',
  'DetailedHorizontal',
  'DetailedStacked',
]
