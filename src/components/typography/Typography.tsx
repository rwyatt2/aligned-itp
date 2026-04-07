import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '../layout/SectionWrapper'

const typeScale = [
  {
    tag: 'H1',
    text: 'Alignment drives growth.',
    size: 'text-5xl md:text-7xl',
    weight: 'font-bold',
    tracking: 'tracking-tighter',
    lineHeight: 'leading-[1.05]',
    specs: '72px / 700 / -0.02em',
  },
  {
    tag: 'H2',
    text: 'Protect. Optimize. Advance.',
    size: 'text-3xl md:text-5xl',
    weight: 'font-bold',
    tracking: 'tracking-tight',
    lineHeight: 'leading-[1.1]',
    specs: '48px / 700 / -0.015em',
  },
  {
    tag: 'H3',
    text: 'Strategic technology partnership',
    size: 'text-2xl md:text-3xl',
    weight: 'font-semibold',
    tracking: 'tracking-tight',
    lineHeight: 'leading-[1.2]',
    specs: '36px / 600 / -0.01em',
  },
  {
    tag: 'H4',
    text: 'Systems that work together',
    size: 'text-xl md:text-2xl',
    weight: 'font-semibold',
    tracking: 'tracking-tight',
    lineHeight: 'leading-[1.3]',
    specs: '24px / 600 / -0.005em',
  },
  {
    tag: 'H5',
    text: 'Connecting every layer of your business',
    size: 'text-lg md:text-xl',
    weight: 'font-medium',
    tracking: '',
    lineHeight: 'leading-[1.4]',
    specs: '20px / 500 / 0',
  },
  {
    tag: 'H6',
    text: 'Built for endurance, tuned for speed',
    size: 'text-base',
    weight: 'font-medium',
    tracking: '',
    lineHeight: 'leading-[1.5]',
    specs: '16px / 500 / 0',
  },
]

const basePath = import.meta.env.BASE_URL

type FontFormat = 'woff2' | 'otf' | 'ttf'

interface FontFile {
  name: string
  path: string
  label: string
  size: string
}

interface FontFamily {
  name: string
  description: string
  fontFamily: string
  sampleText: string
  formats: Record<FontFormat, { badge: string; files: FontFile[] }>
}

const geistWeights = ['Thin', 'ExtraLight', 'Light', 'Regular', 'Medium', 'SemiBold', 'Bold', 'ExtraBold', 'Black'] as const

const fontFamilies: FontFamily[] = [
  {
    name: 'Geist Sans',
    description: 'Primary typeface for headlines, body copy, and UI elements. Variable weight 100–900.',
    fontFamily: 'var(--font-sans)',
    sampleText: 'Aa',
    formats: {
      woff2: {
        badge: 'W2',
        files: [
          { name: 'geist-latin-wght-normal.woff2', path: `${basePath}fonts/geist/geist-latin-wght-normal.woff2`, label: 'Latin (Variable)', size: '27.7 KB' },
          { name: 'geist-latin-ext-wght-normal.woff2', path: `${basePath}fonts/geist/geist-latin-ext-wght-normal.woff2`, label: 'Latin Extended (Variable)', size: '14.9 KB' },
          { name: 'geist-cyrillic-wght-normal.woff2', path: `${basePath}fonts/geist/geist-cyrillic-wght-normal.woff2`, label: 'Cyrillic (Variable)', size: '14.3 KB' },
        ],
      },
      otf: {
        badge: 'OTF',
        files: geistWeights.map(w => ({
          name: `Geist-${w}.otf`,
          path: `${basePath}fonts/geist/otf/Geist-${w}.otf`,
          label: w.replace(/([A-Z])/g, ' $1').trim(),
          size: '',
        })),
      },
      ttf: {
        badge: 'TTF',
        files: geistWeights.map(w => ({
          name: `Geist-${w}.ttf`,
          path: `${basePath}fonts/geist/ttf/Geist-${w}.ttf`,
          label: w.replace(/([A-Z])/g, ' $1').trim(),
          size: '',
        })),
      },
    },
  },
  {
    name: 'Geist Mono',
    description: 'Monospace companion for code, data labels, specs, and technical callouts. Variable weight 100–900.',
    fontFamily: 'var(--font-mono)',
    sampleText: 'Aa',
    formats: {
      woff2: {
        badge: 'W2',
        files: [
          { name: 'geist-mono-latin-wght-normal.woff2', path: `${basePath}fonts/geist-mono/geist-mono-latin-wght-normal.woff2`, label: 'Latin (Variable)', size: '30.6 KB' },
          { name: 'geist-mono-latin-ext-wght-normal.woff2', path: `${basePath}fonts/geist-mono/geist-mono-latin-ext-wght-normal.woff2`, label: 'Latin Extended (Variable)', size: '12.7 KB' },
          { name: 'geist-mono-cyrillic-wght-normal.woff2', path: `${basePath}fonts/geist-mono/geist-mono-cyrillic-wght-normal.woff2`, label: 'Cyrillic (Variable)', size: '12.3 KB' },
        ],
      },
      otf: {
        badge: 'OTF',
        files: geistWeights.map(w => ({
          name: `GeistMono-${w}.otf`,
          path: `${basePath}fonts/geist-mono/otf/GeistMono-${w}.otf`,
          label: w.replace(/([A-Z])/g, ' $1').trim(),
          size: '',
        })),
      },
      ttf: {
        badge: 'TTF',
        files: geistWeights.map(w => ({
          name: `GeistMono-${w}.ttf`,
          path: `${basePath}fonts/geist-mono/ttf/GeistMono-${w}.ttf`,
          label: w.replace(/([A-Z])/g, ' $1').trim(),
          size: '',
        })),
      },
    },
  },
]

const formatLabels: Record<FontFormat, { label: string; description: string }> = {
  woff2: { label: 'Web', description: 'Variable WOFF2 for web use' },
  otf: { label: 'OTF', description: 'OpenType for desktop apps' },
  ttf: { label: 'TTF', description: 'TrueType for desktop apps' },
}

function DownloadIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1.5v9m0 0L4.5 7M8 10.5l3.5-3.5M2.5 13h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PackageIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.75 12V6a1.5 1.5 0 00-.75-1.3l-5.25-3a1.5 1.5 0 00-1.5 0l-5.25 3A1.5 1.5 0 002.25 6v6a1.5 1.5 0 00.75 1.3l5.25 3a1.5 1.5 0 001.5 0l5.25-3a1.5 1.5 0 00.75-1.3z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.58 5.22L9 9.01l6.42-3.79M9 16.56V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Typography() {
  const [testText, setTestText] = useState('Alignment is the solution.')
  const [testWeight, setTestWeight] = useState(600)
  const [testSize, setTestSize] = useState(64)
  const [downloadingAll, setDownloadingAll] = useState<string | null>(null)
  const [selectedFormats, setSelectedFormats] = useState<Record<string, FontFormat>>({
    'Geist Sans': 'otf',
    'Geist Mono': 'otf',
  })

  const downloadFile = useCallback((url: string, filename: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [])

  const downloadAllFonts = useCallback(async (familyName: string, files: FontFile[]) => {
    setDownloadingAll(familyName)
    try {
      const JSZip = (await import('jszip')).default
      const zip = new JSZip()

      await Promise.all(
        files.map(async (file) => {
          const response = await fetch(file.path)
          const blob = await response.blob()
          zip.file(file.name, blob)
        })
      )

      const zipBlob = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(zipBlob)
      const format = selectedFormats[familyName] || 'otf'
      const safeName = familyName.toLowerCase().replace(/\s+/g, '-')
      downloadFile(url, `${safeName}-${format}.zip`)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Failed to create zip:', err)
      files.forEach((file) => downloadFile(file.path, file.name))
    } finally {
      setDownloadingAll(null)
    }
  }, [downloadFile, selectedFormats])

  return (
    <SectionWrapper
      id="typography"
      kicker="03 — Typography"
      title="Geist — The Voice of Precision"
      subtitle="Geist by Vercel. A clean, modern sans-serif engineered to feel sophisticated, readable, and business-ready rather than overly geometric."
    >
      <div className="space-y-16">
        
        {/* Interactive Type Tester */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-2xl p-6 md:p-10 relative overflow-hidden group"
        >
          {/* Subtle animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-primary)] opacity-50 -z-10" />
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-2 flex items-center justify-center min-h-[200px] border-b md:border-b-0 md:border-r border-[var(--border-secondary)] pb-8 md:pb-0 md:pr-8">
              <input 
                type="text" 
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                className="w-full bg-transparent outline-none text-center transition-all bg-clip-text"
                style={{ 
                  fontWeight: testWeight, 
                  fontSize: `${testSize}px`,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)',
                  lineHeight: 1.1,
                  letterSpacing: testSize > 48 ? '-0.03em' : 'normal'
                }}
              />
            </div>
            
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]" style={{ fontFamily: 'var(--font-mono)' }}>Weight</label>
                  <span className="text-xs text-[var(--text-tertiary)]" style={{ fontFamily: 'var(--font-mono)' }}>{testWeight}</span>
                </div>
                <input 
                  type="range" 
                  min="100" max="900" step="100" 
                  value={testWeight} 
                  onChange={(e) => setTestWeight(Number(e.target.value))}
                  className="w-full appearance-none bg-[var(--bg-tertiary)] h-1 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)]"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]" style={{ fontFamily: 'var(--font-mono)' }}>Size</label>
                  <span className="text-xs text-[var(--text-tertiary)]" style={{ fontFamily: 'var(--font-mono)' }}>{testSize}px</span>
                </div>
                <input 
                  type="range" 
                  min="16" max="120" step="1" 
                  value={testSize} 
                  onChange={(e) => setTestSize(Number(e.target.value))}
                  className="w-full appearance-none bg-[var(--bg-tertiary)] h-1 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)]"
                />
              </div>

              <div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest text-center glass-card p-3 rounded-md border border-[var(--border-primary)]" style={{ fontFamily: 'var(--font-mono)' }}>
                Geist Sans Variable
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Font Download Section ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-bold mb-8 flex items-center gap-4" style={{ color: 'var(--text-primary)' }}>
            <span className="w-8 h-px bg-[var(--accent)] inline-block" />
            Font Downloads
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {fontFamilies.map((family, idx) => (
              <motion.div
                key={family.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-500"
              >
                {/* Font preview header */}
                <div
                  className="px-8 pt-10 pb-8 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%)',
                  }}
                >
                  <div className="absolute top-4 right-4">
                    <span
                      className="text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-[var(--border-primary)]"
                      style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
                    >
                      Variable
                    </span>
                  </div>
                  
                  {/* Large glyph preview */}
                  <div className="flex items-end gap-6">
                    <span
                      className="text-8xl font-light leading-none tracking-tighter opacity-90"
                      style={{ fontFamily: family.fontFamily, color: 'var(--text-primary)' }}
                    >
                      {family.sampleText}
                    </span>
                    <div className="pb-3 flex-1 min-w-0">
                      <h4 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                        {family.name}
                      </h4>
                      <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                        {family.description}
                      </p>
                    </div>
                  </div>

                  {/* Weight strip preview */}
                  <div className="mt-6 flex items-baseline gap-3 overflow-hidden">
                    {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((w) => (
                      <span
                        key={w}
                        className="text-xs whitespace-nowrap transition-opacity hover:opacity-100"
                        style={{
                          fontFamily: family.fontFamily,
                          fontWeight: w,
                          color: 'var(--text-secondary)',
                          opacity: w === 400 || w === 600 || w === 700 ? 1 : 0.45,
                        }}
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Format selector */}
                <div className="px-8 pt-6 pb-2">
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-secondary)]">
                    {(Object.keys(formatLabels) as FontFormat[]).map((fmt) => {
                      const isActive = (selectedFormats[family.name] || 'otf') === fmt
                      return (
                        <button
                          key={fmt}
                          onClick={() => setSelectedFormats(prev => ({ ...prev, [family.name]: fmt }))}
                          className="flex-1 py-2 px-3 rounded-lg text-[11px] font-semibold uppercase tracking-wider text-center transition-all duration-200 cursor-pointer"
                          style={{
                            fontFamily: 'var(--font-mono)',
                            background: isActive ? 'var(--bg-elevated)' : 'transparent',
                            color: isActive ? 'var(--accent)' : 'var(--text-tertiary)',
                            boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                          }}
                        >
                          {formatLabels[fmt].label}
                        </button>
                      )
                    })}
                  </div>
                  <p className="text-[10px] mt-2 text-center" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                    {formatLabels[selectedFormats[family.name] || 'otf'].description}
                  </p>
                </div>

                {/* File list */}
                {(() => {
                  const format = selectedFormats[family.name] || 'otf'
                  const formatData = family.formats[format]
                  return (
                    <>
                      <div className="px-8 py-4 space-y-2 max-h-[340px] overflow-y-auto">
                        {formatData.files.map((file) => (
                          <button
                            key={file.name}
                            onClick={() => downloadFile(file.path, file.name)}
                            className="w-full group/file flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] transition-all duration-200 hover:border-[var(--accent)] hover:shadow-[0_0_16px_rgba(255,94,32,0.08)] cursor-pointer text-left"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex items-center justify-center flex-shrink-0 group-hover/file:border-[var(--accent)] group-hover/file:bg-[rgba(255,94,32,0.06)] transition-colors">
                              <span className="text-[8px] font-bold uppercase" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{formatData.badge}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-xs font-medium block truncate" style={{ color: 'var(--text-primary)' }}>
                                {file.label}
                              </span>
                              <span className="text-[10px] block truncate" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                                {file.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {file.size && (
                                <span className="text-[10px]" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                                  {file.size}
                                </span>
                              )}
                              <DownloadIcon className="w-3.5 h-3.5 text-[var(--text-tertiary)] group-hover/file:text-[var(--accent)] transition-colors" />
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Download all button */}
                      <div className="px-8 pb-8 pt-2">
                        <button
                          onClick={() => downloadAllFonts(family.name, formatData.files)}
                          disabled={downloadingAll === family.name}
                          className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                          style={{
                            background: downloadingAll === family.name 
                              ? 'var(--bg-tertiary)'
                              : 'linear-gradient(135deg, var(--accent) 0%, var(--color-kinetic-dark) 100%)',
                            color: downloadingAll === family.name ? 'var(--text-secondary)' : '#FFFFFF',
                            boxShadow: downloadingAll === family.name ? 'none' : '0 4px 16px rgba(255, 94, 32, 0.3)',
                          }}
                        >
                          {downloadingAll === family.name ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                              />
                              Packaging…
                            </>
                          ) : (
                            <>
                              <PackageIcon className="w-4 h-4" />
                              Download All {formatData.badge} ({formatData.files.length} files)
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  )
                })()}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Type Scale */}
        <div className="glass-card rounded-2xl p-6 md:p-10">
          <h3 className="text-lg font-bold mb-8 flex items-center gap-4" style={{ color: 'var(--text-primary)' }}>
            <span className="w-8 h-px bg-[var(--accent)] inline-block" />
            Type Hierarchy
          </h3>
          <div className="space-y-0">
            {typeScale.map((item, i) => (
              <motion.div
                key={item.tag}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group py-6 flex flex-col lg:flex-row lg:items-baseline gap-2 lg:gap-8 hover:bg-[var(--bg-tertiary)] hover:px-4 -mx-4 rounded-2xl transition-all duration-300"
                style={{ borderBottom: i !== typeScale.length - 1 ? '1px solid var(--border-secondary)' : 'none' }}
              >
                {/* Tag label */}
                <span
                  className="text-xs font-semibold uppercase tracking-[0.2em] w-12 flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
                >
                  {item.tag}
                </span>

                {/* Specimen */}
                <span
                  className={`${item.size} ${item.weight} ${item.tracking} ${item.lineHeight} flex-1 group-hover:translate-x-2 transition-transform duration-300`}
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.text}
                </span>

                {/* Specs */}
                <span
                  className="text-[10px] uppercase tracking-widest flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}
                >
                  {item.specs}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Body & Mono specimens */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Body Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-500"
          >
            <span className="kicker mb-6 block drop-shadow-sm">Geist Sans — Body</span>
            <p className="text-base leading-relaxed mb-6 font-medium text-[var(--text-primary)]">
              Aligned Technology Partners is a strategic growth partner that helps organizations operate better and grow stronger by aligning people, process, and technology. Rather than treating technology as an isolated support function, we help businesses use it as a driver of operational efficiency, security, clarity, and progress.
            </p>
            <div className="h-px w-full bg-gradient-to-r from-[var(--border-secondary)] to-transparent my-4" />
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
              16px / 400 / 1.6 line-height — Optimized for extended reading at screen distances. The open apertures and generous spacing of Geist ensure effortless legibility.
            </p>
          </motion.div>

          {/* Mono specimen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-500"
          >
            <span className="kicker mb-6 block drop-shadow-sm">Geist Mono — Technical</span>
            <div style={{ fontFamily: 'var(--font-mono)' }}>
              <p className="text-sm border-l-2 border-[var(--accent)] pl-4 leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                Used for hex codes, data labels, specifications, and technical callouts. Creates clear visual distinction from editorial content.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] shadow-inner transition-colors hover:border-[var(--border-primary)]">
                  <span className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: '#E95D2C' }} />
                  <span className="text-[10px] md:text-xs font-medium tracking-wider" style={{ color: 'var(--text-primary)' }}>#E95D2C — Kinetic Orange</span>
                </div>
                <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] shadow-inner transition-colors hover:border-[var(--border-primary)]">
                  <span className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: '#1A2730' }} />
                  <span className="text-[10px] md:text-xs font-medium tracking-wider" style={{ color: 'var(--text-primary)' }}>#1A2730 — Midnight Navy</span>
                </div>
                <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] shadow-inner transition-colors hover:border-[var(--border-primary)]">
                  <span className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: '#090A0F' }} />
                  <span className="text-[10px] md:text-xs font-medium tracking-wider" style={{ color: 'var(--text-primary)' }}>#090A0F — Abyss Black</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
