import { useState } from 'react'
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

export default function Typography() {
  const [testText, setTestText] = useState('Alignment is the solution.')
  const [testWeight, setTestWeight] = useState(600)
  const [testSize, setTestSize] = useState(64)

  return (
    <SectionWrapper
      id="typography"
      kicker="03 — Typography"
      title="Geist — The Voice of Precision"
      subtitle="Geist by Vercel. A typeface engineered for interfaces, optimized for readability, and calibrated for every screen."
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
              We believe that misalignment between people, process, and technology is the root cause of inefficiency, risk, and stagnation. Our mission is to engineer alignment — creating systems where every layer works together.
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
                <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] shadow-inner">
                  <span className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: '#DB5227' }} />
                  <span className="text-[10px] md:text-xs tracking-wider" style={{ color: 'var(--text-primary)' }}>#DB5227 — Kinetic Orange</span>
                </div>
                <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] shadow-inner">
                  <span className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: '#023661' }} />
                  <span className="text-[10px] md:text-xs tracking-wider" style={{ color: 'var(--text-primary)' }}>#023661 — Industrial Blue</span>
                </div>
                <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] shadow-inner">
                  <span className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: '#0A0C12' }} />
                  <span className="text-[10px] md:text-xs tracking-wider" style={{ color: 'var(--text-primary)' }}>#0A0C12 — Void Black</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
