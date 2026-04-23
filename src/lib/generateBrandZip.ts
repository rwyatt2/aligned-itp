/**
 * generateBrandZip.ts
 *
 * Master orchestrator that builds the complete Aligned Technology Partners
 * brand asset ZIP package. Includes logos (SVG + PNG), fonts (OTF/TTF/WOFF2),
 * color swatches (.ase + reference text), gradient textures,
 * and a README with usage terms.
 *
 * Uses JSZip (already a project dependency).
 */

import JSZip from 'jszip'
import { brandColors, brandGradients } from './colors'
import { generateAseBlob } from './aseGenerator'
import {
  buildLogomarkSvg,
  buildWordmarkSvg,
  buildWordmarkHtml,
  buildCompactHorizontalSvg,
  buildCompactHorizontalHtml,
  buildCompactStackedSvg,
  buildCompactStackedHtml,
  buildPrimaryHorizontalSvg,
  buildPrimaryHorizontalHtml,
  buildDetailedHorizontalSvg,
  buildDetailedHorizontalHtml,
  buildDetailedStackedSvg,
  buildDetailedStackedHtml,
  LOGOMARK_VARIANTS,
  LOCKUP_COLOR_SCHEMES,
} from './logoSvgBuilder'

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ZipProgress {
  step: string
  percent: number
}

type ProgressCallback = (progress: ZipProgress) => void

// ─── Constants ──────────────────────────────────────────────────────────────

const ROOT = 'Aligned-Technology-Partners-Brand-Assets'
const basePath = import.meta.env.BASE_URL

const GRADIENT_WIDTH = 1920
const GRADIENT_HEIGHT = 1080

const GEIST_WEIGHTS = [
  'Thin', 'ExtraLight', 'Light', 'Regular', 'Medium',
  'SemiBold', 'Bold', 'ExtraBold', 'Black',
] as const

// ─── README Generator ───────────────────────────────────────────────────────

function generateReadme(): string {
  return `ALIGNED TECHNOLOGY PARTNERS — BRAND ASSETS
============================================

This package contains the official brand assets for
Aligned Technology Partners. These files are organized
by asset type for easy navigation.

CONTENTS
--------
01_Logos/        Logomark, Wordmark, and Lockup configurations
                 in SVG and PNG formats across all approved
                 color variants.

02_Fonts/        Geist Sans and Geist Mono typefaces in
                 OTF, TTF, and WOFF2 formats.

03_Color-Palette/  Adobe Swatch Exchange (.ase) file and a
                   plain-text color reference with HEX, RGB,
                   and CMYK values for every brand color.

04_Gradients/    Pre-rendered gradient textures at 1920×1080px
                 in PNG format, ready for use in presentations,
                 hero sections, and backgrounds.

USAGE & LICENSE
---------------
These assets are the exclusive property of
Aligned Technology Partners. They are provided
for authorized use only.

• Do NOT redistribute these files publicly.
• Do NOT modify the logomark geometry.
• Always use approved color variants.
• Maintain minimum clear space around the logo.
• Refer to the Brand Guidelines for full usage rules.

For questions, contact the brand team.

Generated: ${new Date().toISOString().split('T')[0]}
`
}

// ─── Color Reference Generator ──────────────────────────────────────────────

function generateColorReference(): string {
  const divider = '─'.repeat(60)
  let output = `ALIGNED TECHNOLOGY PARTNERS — COLOR REFERENCE\n${divider}\n\n`

  for (const color of brandColors) {
    output += `${color.name.toUpperCase()}\n`
    output += `  HEX    ${color.hex}\n`
    output += `  RGB    ${color.rgb}\n`
    output += `  CMYK   ${color.cmyk}\n`
    output += `  Usage  ${color.usage}\n`
    output += `  Ratio  ${color.ratio}%\n\n`
  }

  output += `${divider}\n`
  output += `CSS VARIABLE MAPPING\n${divider}\n\n`
  output += `--color-kinetic:          #FF5E20   (Primary Accent)\n`
  output += `--color-kinetic-light:    #FF8554\n`
  output += `--color-kinetic-dark:     #cc4511\n`
  output += `--color-void:             #0A0A0F\n`
  output += `--color-industrial:       #324458\n`
  output += `--color-industrial-light: #90B6D5\n`
  output += `--color-charcoal:         #2A2A35\n`
  output += `--color-charcoal-light:   #3D3D4E\n`
  output += `--color-cool-gray:        #B0CEE2\n`
  output += `--color-pristine:         #FFFFFF\n`
  output += `--color-void-soft:        #12121A\n`

  return output
}

// ─── SVG → PNG Renderer (for logomark only) ─────────────────────────────────

async function svgStringToPngBlob(
  svgString: string,
  scale: number = 1,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth * scale
      canvas.height = img.naturalHeight * scale
      const ctx = canvas.getContext('2d')!
      ctx.scale(scale, scale)
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)
      canvas.toBlob((pngBlob) => {
        if (pngBlob) resolve(pngBlob)
        else reject(new Error('Failed to create PNG blob'))
      }, 'image/png')
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load SVG for PNG conversion'))
    }

    img.src = url
  })
}

// ─── HTML → PNG Renderer (for lockups/wordmarks) ────────────────────────────
//
// Renders an HTML string into a hidden iframe, captures it via html-to-image,
// and returns a PNG blob. This lets the browser's text layout engine handle
// all spacing so it matches the guidelines page exactly.

async function htmlToPngBlob(
  htmlString: string,
  width: number,
  height: number,
  scale: number = 1,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement('iframe')
    iframe.style.cssText = `
      position: fixed; top: -9999px; left: -9999px;
      width: ${width}px; height: ${height}px;
      border: none; pointer-events: none; opacity: 0;
    `
    document.body.appendChild(iframe)

    iframe.onload = async () => {
      try {
        const doc = iframe.contentDocument!
        doc.open()
        doc.write(htmlString)
        doc.close()

        // Wait for fonts + layout
        await new Promise((r) => setTimeout(r, 300))

        const target = doc.body.firstElementChild as HTMLElement
        if (!target) throw new Error('No content in lockup HTML')

        const { toPng } = await import('html-to-image')
        const dataUrl = await toPng(target, {
          width,
          height,
          pixelRatio: scale,
          cacheBust: true,
          backgroundColor: 'transparent',
        })

        document.body.removeChild(iframe)

        const resp = await fetch(dataUrl)
        const blob = await resp.blob()
        resolve(blob)
      } catch (err) {
        document.body.removeChild(iframe)
        reject(err)
      }
    }

    iframe.onerror = () => {
      document.body.removeChild(iframe)
      reject(new Error('Failed to load lockup iframe'))
    }

    // Trigger load by setting srcdoc
    iframe.srcdoc = htmlString
  })
}

// ─── Gradient Renderer ──────────────────────────────────────────────────────

async function renderGradientPng(css: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const wrapper = document.createElement('div')
    wrapper.style.cssText = `
      position: fixed; top: 0; left: 0; z-index: -1;
      width: ${GRADIENT_WIDTH}px; height: ${GRADIENT_HEIGHT}px;
      pointer-events: none; clip: rect(0,0,0,0);
      overflow: hidden;
    `
    const node = document.createElement('div')
    node.style.cssText = `
      width: ${GRADIENT_WIDTH}px; height: ${GRADIENT_HEIGHT}px;
      background: ${css};
    `
    wrapper.appendChild(node)
    document.body.appendChild(wrapper)

    // Give browser time to paint
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        try {
          const { toPng } = await import('html-to-image')
          const dataUrl = await toPng(node, {
            width: GRADIENT_WIDTH,
            height: GRADIENT_HEIGHT,
            pixelRatio: 1,
            cacheBust: true,
            canvasWidth: GRADIENT_WIDTH,
            canvasHeight: GRADIENT_HEIGHT,
            style: { clip: 'auto', overflow: 'visible' },
          })
          document.body.removeChild(wrapper)

          // Convert data URL to blob
          const resp = await fetch(dataUrl)
          const blob = await resp.blob()
          resolve(blob)
        } catch (err) {
          document.body.removeChild(wrapper)
          reject(err)
        }
      })
    })
  })
}

// ─── File Fetcher ───────────────────────────────────────────────────────────

async function fetchAsBlob(url: string): Promise<Blob> {
  const resp = await fetch(url)
  if (!resp.ok) throw new Error(`Failed to fetch ${url}: ${resp.statusText}`)
  return resp.blob()
}

// ─── Master ZIP Builder ─────────────────────────────────────────────────────

export async function generateBrandZip(onProgress?: ProgressCallback): Promise<Blob> {
  const zip = new JSZip()
  const report = (step: string, percent: number) => onProgress?.({ step, percent })

  // ── 1. README ─────────────────────────────────────────────────────────
  report('Writing README…', 2)
  zip.file(`${ROOT}/00_README.txt`, generateReadme())

  // ── 2. Logos — Logomark SVG ───────────────────────────────────────────
  report('Building logomark SVGs…', 5)
  for (const variant of LOGOMARK_VARIANTS) {
    const svg = buildLogomarkSvg(variant.fill)
    zip.file(`${ROOT}/01_Logos/Logomark/SVG/ATP-Logomark-${variant.slug}.svg`, svg)
  }

  // ── 3. Logos — Logomark PNG (1x and 2x) ──────────────────────────────
  report('Rendering logomark PNGs…', 10)
  for (const variant of LOGOMARK_VARIANTS) {
    const svg = buildLogomarkSvg(variant.fill)
    try {
      const png1x = await svgStringToPngBlob(svg, 1)
      zip.file(`${ROOT}/01_Logos/Logomark/PNG/ATP-Logomark-${variant.slug}.png`, png1x)
      const png2x = await svgStringToPngBlob(svg, 2)
      zip.file(`${ROOT}/01_Logos/Logomark/PNG/ATP-Logomark-${variant.slug}@2x.png`, png2x)
    } catch {
      // If PNG rendering fails, skip but continue
      console.warn(`Failed to render PNG for logomark ${variant.slug}`)
    }
  }

  // ── 4. Logos — Wordmark SVG + PNG ─────────────────────────────────────
  report('Building wordmarks…', 20)
  for (const scheme of LOCKUP_COLOR_SCHEMES) {
    // SVG (foreignObject-based — browser handles text spacing)
    const svg = buildWordmarkSvg(scheme.textFill, scheme.dividerFill)
    zip.file(`${ROOT}/01_Logos/Wordmark/SVG/ATP-Wordmark-${scheme.slug}.svg`, svg)

    // PNG (html-to-image rendered)
    const result = buildWordmarkHtml(scheme.textFill, scheme.dividerFill)
    try {
      const png1x = await htmlToPngBlob(result.html, result.width, result.height, 1)
      zip.file(`${ROOT}/01_Logos/Wordmark/PNG/ATP-Wordmark-${scheme.slug}.png`, png1x)
      const png2x = await htmlToPngBlob(result.html, result.width, result.height, 2)
      zip.file(`${ROOT}/01_Logos/Wordmark/PNG/ATP-Wordmark-${scheme.slug}@2x.png`, png2x)
    } catch {
      console.warn(`Failed to render PNG for wordmark ${scheme.slug}`)
    }
  }

  // ── 5. Logos — Lockups SVG + PNG (5 types × 3 color schemes) ─────────
  report('Building lockups…', 25)

  const lockupBuilders = [
    { name: 'CompactHorizontal', svgBuilder: buildCompactHorizontalSvg, htmlBuilder: buildCompactHorizontalHtml },
    { name: 'CompactStacked', svgBuilder: buildCompactStackedSvg, htmlBuilder: buildCompactStackedHtml },
    { name: 'PrimaryHorizontal', svgBuilder: buildPrimaryHorizontalSvg, htmlBuilder: buildPrimaryHorizontalHtml },
    { name: 'DetailedHorizontal', svgBuilder: buildDetailedHorizontalSvg, htmlBuilder: buildDetailedHorizontalHtml },
    { name: 'DetailedStacked', svgBuilder: buildDetailedStackedSvg, htmlBuilder: buildDetailedStackedHtml },
  ]

  for (const lockup of lockupBuilders) {
    for (const scheme of LOCKUP_COLOR_SCHEMES) {
      // SVG
      const svg = lockup.svgBuilder(scheme)
      zip.file(`${ROOT}/01_Logos/Lockups/SVG/ATP-${lockup.name}-${scheme.slug}.svg`, svg)

      // PNG
      const result = lockup.htmlBuilder(scheme)
      try {
        const png1x = await htmlToPngBlob(result.html, result.width, result.height, 1)
        zip.file(`${ROOT}/01_Logos/Lockups/PNG/ATP-${lockup.name}-${scheme.slug}.png`, png1x)
        const png2x = await htmlToPngBlob(result.html, result.width, result.height, 2)
        zip.file(`${ROOT}/01_Logos/Lockups/PNG/ATP-${lockup.name}-${scheme.slug}@2x.png`, png2x)
      } catch {
        console.warn(`Failed to render PNG for lockup ${lockup.name}-${scheme.slug}`)
      }
    }
  }

  // ── 6. Logos — Favicon ───────────────────────────────────────────────
  report('Adding favicon…', 35)
  try {
    const faviconBlob = await fetchAsBlob(`${basePath}favicon.svg`)
    zip.file(`${ROOT}/01_Logos/Favicon/ATP-Favicon.svg`, faviconBlob)
  } catch {
    console.warn('Failed to fetch favicon')
  }

  // ── 7. Fonts — Geist Sans ────────────────────────────────────────────
  report('Packaging Geist Sans fonts…', 40)
  for (const weight of GEIST_WEIGHTS) {
    try {
      const otf = await fetchAsBlob(`${basePath}fonts/geist/otf/Geist-${weight}.otf`)
      zip.file(`${ROOT}/02_Fonts/Geist-Sans/OTF/Geist-${weight}.otf`, otf)
    } catch { /* skip */ }

    try {
      const ttf = await fetchAsBlob(`${basePath}fonts/geist/ttf/Geist-${weight}.ttf`)
      zip.file(`${ROOT}/02_Fonts/Geist-Sans/TTF/Geist-${weight}.ttf`, ttf)
    } catch { /* skip */ }
  }

  // Geist Sans WOFF2
  for (const file of [
    'geist-latin-wght-normal.woff2',
    'geist-latin-ext-wght-normal.woff2',
    'geist-cyrillic-wght-normal.woff2',
  ]) {
    try {
      const blob = await fetchAsBlob(`${basePath}fonts/geist/${file}`)
      zip.file(`${ROOT}/02_Fonts/Geist-Sans/WOFF2/${file}`, blob)
    } catch { /* skip */ }
  }

  // ── 8. Fonts — Geist Mono ───────────────────────────────────────────
  report('Packaging Geist Mono fonts…', 55)
  for (const weight of GEIST_WEIGHTS) {
    try {
      const otf = await fetchAsBlob(`${basePath}fonts/geist-mono/otf/GeistMono-${weight}.otf`)
      zip.file(`${ROOT}/02_Fonts/Geist-Mono/OTF/GeistMono-${weight}.otf`, otf)
    } catch { /* skip */ }

    try {
      const ttf = await fetchAsBlob(`${basePath}fonts/geist-mono/ttf/GeistMono-${weight}.ttf`)
      zip.file(`${ROOT}/02_Fonts/Geist-Mono/TTF/GeistMono-${weight}.ttf`, ttf)
    } catch { /* skip */ }
  }

  for (const file of [
    'geist-mono-latin-wght-normal.woff2',
    'geist-mono-latin-ext-wght-normal.woff2',
    'geist-mono-cyrillic-wght-normal.woff2',
  ]) {
    try {
      const blob = await fetchAsBlob(`${basePath}fonts/geist-mono/${file}`)
      zip.file(`${ROOT}/02_Fonts/Geist-Mono/WOFF2/${file}`, blob)
    } catch { /* skip */ }
  }

  // ── 9. Color Palette ─────────────────────────────────────────────────
  report('Generating color swatches…', 70)

  // Adobe Swatch Exchange
  const aseBlob = generateAseBlob()
  zip.file(`${ROOT}/03_Color-Palette/Swatches/ATP-Brand-Colors.ase`, aseBlob)

  // Color reference text
  zip.file(`${ROOT}/03_Color-Palette/Reference/ATP-Color-Reference.txt`, generateColorReference())

  // ── 10. Gradients ────────────────────────────────────────────────────
  report('Rendering gradient textures…', 75)
  for (const gradient of brandGradients) {
    try {
      const pngBlob = await renderGradientPng(gradient.css)
      zip.file(`${ROOT}/04_Gradients/ATP-${gradient.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}-${GRADIENT_WIDTH}x${GRADIENT_HEIGHT}.png`, pngBlob)
    } catch {
      console.warn(`Failed to render gradient: ${gradient.name}`)
    }
  }

  // ── 11. Generate ZIP ──────────────────────────────────────────────────
  report('Compressing archive…', 92)
  const zipBlob = await zip.generateAsync(
    { type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } },
    (metadata) => {
      const pct = 92 + Math.round(metadata.percent * 0.08)
      report('Compressing archive…', Math.min(pct, 100))
    },
  )

  report('Complete!', 100)
  return zipBlob
}
