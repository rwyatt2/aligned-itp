import { useRef, useCallback, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Check, Copy, Download, Loader2 } from 'lucide-react'
import { useClipboard } from '../../hooks/useClipboard'
import type { GradientData } from '../../lib/colors'

interface GradientSwatchProps {
  gradient: GradientData
  index: number
}

const EXPORT_WIDTH = 1920
const EXPORT_HEIGHT = 1080

export default function GradientSwatch({ gradient, index }: GradientSwatchProps) {
  const { copy, copiedValue } = useClipboard()
  const ref = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState<'png' | 'jpeg' | null>(null)

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

  const downloadGradient = useCallback(async (format: 'png' | 'jpeg') => {
    setDownloading(format)

    try {
      const canvas = document.createElement('canvas')
      canvas.width = EXPORT_WIDTH
      canvas.height = EXPORT_HEIGHT
      const ctx = canvas.getContext('2d')!

      // Create a temporary element with the gradient, visibly rendered in the page
      // We make it invisible to the user via clip-path but it must be in-viewport
      // so the browser actually paints the CSS background
      const wrapper = document.createElement('div')
      wrapper.style.cssText = `
        position: fixed; top: 0; left: 0; z-index: -1;
        width: ${EXPORT_WIDTH}px; height: ${EXPORT_HEIGHT}px;
        pointer-events: none; clip: rect(0,0,0,0);
        overflow: hidden;
      `
      const node = document.createElement('div')
      node.style.cssText = `
        width: ${EXPORT_WIDTH}px; height: ${EXPORT_HEIGHT}px;
        background: ${gradient.css};
      `
      wrapper.appendChild(node)
      document.body.appendChild(wrapper)

      // Give the browser a frame to paint the CSS gradient
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))

      // Use html-to-image to capture the rendered gradient
      const { toPng, toJpeg } = await import('html-to-image')

      let dataUrl: string
      const options = {
        width: EXPORT_WIDTH, 
        height: EXPORT_HEIGHT,
        pixelRatio: 1,
        cacheBust: true,
        canvasWidth: EXPORT_WIDTH,
        canvasHeight: EXPORT_HEIGHT,
        style: {
          // Override clip so html-to-image can see the element
          clip: 'auto',
          overflow: 'visible',
        },
      }

      if (format === 'png') {
        dataUrl = await toPng(node, options)
      } else {
        dataUrl = await toJpeg(node, { ...options, quality: 0.95 })
      }

      document.body.removeChild(wrapper)

      // Trigger download
      const link = document.createElement('a')
      link.download = `${gradient.slug}-${EXPORT_WIDTH}x${EXPORT_HEIGHT}.${format}`
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error(`Failed to export gradient as ${format}:`, err)
    } finally {
      setDownloading(null)
    }
  }, [gradient])

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

            {/* Download Buttons */}
            <div className="flex gap-2 pt-1">
              {(['png', 'jpeg'] as const).map((format) => (
                <motion.button
                  key={format}
                  onClick={() => downloadGradient(format)}
                  disabled={downloading !== null}
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border border-transparent hover:border-[var(--border-primary)] disabled:opacity-40 disabled:cursor-wait"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {downloading === format ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Loader2 size={13} />
                    </motion.span>
                  ) : (
                    <Download size={13} />
                  )}
                  <span className="uppercase tracking-[0.15em]" style={{ fontSize: '10px' }}>
                    {format}
                  </span>
                </motion.button>
              ))}
            </div>

            <p className="text-center pt-0.5" style={{ fontSize: '9px', color: 'var(--text-tertiary)', opacity: 0.6 }}>
              {EXPORT_WIDTH} × {EXPORT_HEIGHT}px  ·  Hero-ready
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
