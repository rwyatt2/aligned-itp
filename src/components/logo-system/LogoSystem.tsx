import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { Check, X, AlertTriangle, Download } from 'lucide-react'
import SectionWrapper from '../layout/SectionWrapper'
import AlignedLogo from '../hero/AlignedLogo'

interface LogoRuleProps {
  correct: boolean
  label: string
  description: string
  children: React.ReactNode
}

function LogoRule({ correct, label, description, children }: LogoRuleProps) {
  // Magnetic hover effect
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      className={`rounded-2xl p-6 ${correct ? 'glass-card' : ''} transition-colors duration-300 relative overflow-hidden group`}
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: `1px solid ${correct ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background glow on hover */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300"
        style={{ backgroundColor: correct ? '#22c55e' : '#ef4444' }}
      />
      
      <motion.div 
        className="aspect-square rounded-[1rem] mb-5 flex items-center justify-center relative shadow-inner overflow-hidden"
        style={{ 
          backgroundColor: 'var(--bg-primary)',
          x: isHovered ? springX.get() * 0.15 : 0,
          y: isHovered ? springY.get() * 0.15 : 0,
        }}
      >
        {/* The child (SVG logo) gets a slight parallax */}
        <motion.div
          style={{
            x: isHovered ? springX.get() * -0.05 : 0,
            y: isHovered ? springY.get() * -0.05 : 0,
          }}
        >
          {children}
        </motion.div>
        
        <div
          className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-md"
          style={{
            backgroundColor: correct ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: `1px solid ${correct ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            color: correct ? '#22c55e' : '#ef4444',
          }}
        >
          {correct ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
        </div>
      </motion.div>

      <h4 className="text-sm font-bold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>
        {label}
      </h4>
      <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
        {description}
      </p>
    </motion.div>
  )
}

export default function LogoSystem() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = () => {
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 2000)
  }

  // Magnetic center logo
  const centerRef = useRef<HTMLDivElement>(null)
  const [centerHovered, setCenterHovered] = useState(false)
  const cx = useMotionValue(0)
  const cy = useMotionValue(0)
  const cSpringX = useSpring(cx, { stiffness: 400, damping: 25 })
  const cSpringY = useSpring(cy, { stiffness: 400, damping: 25 })

  const handleCenterMouseMove = (e: React.MouseEvent) => {
    if (!centerRef.current) return
    const rect = centerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    cx.set((e.clientX - centerX) * 0.1)
    cy.set((e.clientY - centerY) * 0.1)
  }

  return (
    <SectionWrapper
      id="logo-system"
      kicker="01 — Logo System"
      title="The Aligned Mark"
      subtitle="Three curves. One intersection. Infinite alignment. The mark represents the convergence of people, process, and technology."
    >
      <div ref={ref}>
        {/* Primary Mark Display */}
        <motion.div
           ref={centerRef}
           onMouseMove={handleCenterMouseMove}
           onMouseEnter={() => setCenterHovered(true)}
           onMouseLeave={() => { cx.set(0); cy.set(0); setCenterHovered(false) }}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel rounded-3xl p-12 md:p-24 mb-16 flex flex-col items-center justify-center relative overflow-hidden group"
        >
          {/* Subtle background glow that follows mouse slightly */}
          <motion.div 
            className="absolute -z-10 w-[40vw] h-[40vw] rounded-full filter blur-[80px] opacity-5 transition-opacity duration-700 pointer-events-none group-hover:opacity-10"
            style={{ 
              background: 'radial-gradient(circle, var(--text-primary) 0%, transparent 70%)',
              x: cSpringX,
              y: cSpringY
            }}
          />

          <motion.div 
            className="relative w-48 md:w-72 drop-shadow-2xl z-10"
            style={{ x: cSpringX, y: cSpringY }}
          >
            <AlignedLogo animated={centerHovered} />
          </motion.div>

          <div className="mt-12 text-center relative z-10 flex flex-col items-center">
            <h3
              className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              Aligned Technology Partners
            </h3>
            
            <motion.button 
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass px-6 py-2.5 rounded-full flex items-center gap-3 text-sm font-semibold tracking-wide border border-[var(--border-primary)] transition-colors hover:bg-[var(--bg-tertiary)] hover:border-[var(--accent)]"
              style={{ color: 'var(--text-primary)' }}
            >
              {downloaded ? (
                <>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-[#22c55e]">
                    <Check size={16} strokeWidth={3} />
                  </motion.div>
                  Downloaded
                </>
              ) : (
                <>
                   <Download size={16} />
                   Download Assets
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Clear Space & Minimum Size */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Clear Space */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              Clear Space
            </h3>
            <p className="text-sm font-medium mb-8" style={{ color: 'var(--text-tertiary)' }}>
              Maintain a minimum clear space equal to the height of the crossbar curve around all sides of the mark.
            </p>
            <div className="relative flex items-center justify-center py-16 bg-[var(--bg-tertiary)] rounded-2xl shadow-inner border border-[var(--border-secondary)]">
              {/* Dashed boundary lines */}
              <div
                className="absolute inset-[15%] rounded-[2rem]"
                style={{ border: '2px dashed var(--accent)', opacity: 0.5 }}
              />
              {/* Inner mark */}
              <div className="w-24 relative z-10">
                <AlignedLogo animated={false} />
              </div>
              {/* Dimension markers */}
              <div className="absolute top-[8%] left-1/2 -translate-x-1/2 text-xs font-bold font-mono text-[var(--text-primary)] bg-[var(--bg-tertiary)] px-2">
                x
              </div>
              <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-xs font-bold font-mono text-[var(--text-primary)] bg-[var(--bg-tertiary)] px-2">
                x
              </div>
              <div className="absolute left-[8%] top-1/2 -translate-y-1/2 text-xs font-bold font-mono text-[var(--text-primary)] bg-[var(--bg-tertiary)] py-2">
                x
              </div>
              <div className="absolute right-[8%] top-1/2 -translate-y-1/2 text-xs font-bold font-mono text-[var(--text-primary)] bg-[var(--bg-tertiary)] py-2">
                x
              </div>
            </div>
          </motion.div>

          {/* Minimum Size */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              Minimum Size
            </h3>
            <p className="text-sm font-medium mb-8" style={{ color: 'var(--text-tertiary)' }}>
              Never reproduce the mark smaller than these minimum dimensions to ensure legibility on digital and print.
            </p>
            <div className="flex items-end gap-6 md:gap-10 justify-center h-[240px] bg-[var(--bg-tertiary)] rounded-2xl shadow-inner border border-[var(--border-secondary)] px-4">
              {[
                { size: 64, label: '64px', ok: true },
                { size: 40, label: '40px', ok: true },
                { size: 24, label: '24px', ok: true },
                { size: 16, label: '16px', ok: false },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-4 pb-12">
                  <div style={{ width: item.size, height: item.size, opacity: item.ok ? 1 : 0.3 }}>
                    <AlignedLogo animated={false} />
                  </div>
                  <div className="flex items-center gap-1.5 bg-[var(--bg-primary)] px-2.5 py-1 rounded-full border border-[var(--border-secondary)]">
                    {!item.ok && <AlertTriangle size={12} strokeWidth={3} style={{ color: '#ef4444' }} />}
                    <span
                      className="text-[10px] font-bold tracking-widest uppercase"
                      style={{ color: item.ok ? 'var(--text-primary)' : '#ef4444', fontFamily: 'var(--font-mono)' }}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Do's & Don'ts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
            Usage Rules
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <LogoRule correct={true} label="Brand Colors" description="Use only official brand colors">
              <div className="w-16"><AlignedLogo animated={false} /></div>
            </LogoRule>

            <LogoRule correct={true} label="Monochrome" description="High-contrast solid color">
              <div className="w-16" style={{ filter: 'grayscale(1) brightness(2)' }}>
                <AlignedLogo animated={false} />
              </div>
            </LogoRule>

            <LogoRule correct={false} label="Do Not Stretch" description="Maintain native proportions">
              <div className="w-20" style={{ transform: 'scaleY(0.6)' }}>
                <AlignedLogo animated={false} />
              </div>
            </LogoRule>

            <LogoRule correct={false} label="Custom Colors" description="Never use off-brand colors">
              <div className="w-16" style={{ filter: 'hue-rotate(220deg)' }}>
                <AlignedLogo animated={false} />
              </div>
            </LogoRule>

            <LogoRule correct={false} label="Drop Shadows" description="Never add external effects">
              <div className="w-16" style={{ filter: 'drop-shadow(6px 6px 10px rgba(0,0,0,0.8))' }}>
                <AlignedLogo animated={false} />
              </div>
            </LogoRule>

            <LogoRule correct={false} label="Rotated" description="Always keep the mark upright">
              <div className="w-16" style={{ transform: 'rotate(25deg)' }}>
                <AlignedLogo animated={false} />
              </div>
            </LogoRule>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
