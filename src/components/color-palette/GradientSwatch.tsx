import { useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import { useClipboard } from '../../hooks/useClipboard'
import type { GradientData } from '../../lib/colors'

interface GradientSwatchProps {
  gradient: GradientData
  index: number
}

export default function GradientSwatch({ gradient, index }: GradientSwatchProps) {
  const { copy, copiedValue } = useClipboard()
  const ref = useRef<HTMLDivElement>(null)

  // 3D Tilt Setup
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const values = [
    { label: 'CSS', value: gradient.css }
  ]

  // Assuming gradients ending in light colors need dark text. Let's just use white for dark backgrounds.
  const isLight = gradient.to === '#B0CEE2' || gradient.to === '#F8F9FA'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      className="relative group z-10 hover:z-20"
    >
      {/* Background ambient glow matching the gradient */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-2xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: gradient.css, transform: 'scale(1.05)' }}
      />

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="glass-card rounded-2xl overflow-hidden h-full flex flex-col cursor-crosshair"
      >
        {/* Gradient Preview */}
        <div
          className="h-40 md:h-48 relative overflow-hidden transition-all duration-500"
          style={{
            background: gradient.css,
            borderBottom: isLight ? '1px solid var(--border-secondary)' : 'none',
          }}
        >
          {/* Dynamic gloss overlay */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)`,
              transform: 'translateZ(1px)' // Force 3D layer
            }}
          />
        </div>

        {/* Info */}
        <div className="p-5 flex-1 flex flex-col bg-[var(--bg-panel)] backdrop-blur-xl relative" style={{ transform: 'translateZ(30px)' }}>
          <h4 className="text-base font-bold mb-1 tracking-tight drop-shadow-sm" style={{ color: 'var(--text-primary)' }}>
            {gradient.name}
          </h4>
          <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
            {gradient.description}
          </p>

          <p className="text-xs mb-4" style={{ color: 'var(--text-tertiary)' }}>
            <strong style={{ color: 'var(--text-secondary)' }}>Usage:</strong> border, fills, backgrounds
          </p>

          {/* Copyable Values */}
          <div className="space-y-2 mt-auto">
            {values.map((v) => (
              <motion.button
                key={v.label}
                onClick={() => copy(v.value)}
                initial={{ opacity: 0.8, x: 0 }}
                whileHover={{ opacity: 1, x: 4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs group/copy border border-transparent hover:border-[var(--border-primary)]"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  fontFamily: 'var(--font-mono)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)'
                }}
              >
                <span className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)', minWidth: '36px' }}>
                    {v.label}
                  </span>
                  <span className="font-semibold tracking-wide truncate max-w-[120px]" style={{ color: 'var(--text-primary)' }} title={v.value}>{v.value}</span>
                </span>
                <AnimatePresence mode="wait">
                  {copiedValue === v.value ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      style={{ color: '#22c55e' }}
                    >
                      <Check size={14} strokeWidth={3} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      whileHover={{ opacity: 1, scale: 1.1 }}
                      style={{ color: 'var(--text-primary)' }}
                      className="opacity-0 group-hover/copy:opacity-100 transition-all"
                    >
                      <Copy size={14} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
