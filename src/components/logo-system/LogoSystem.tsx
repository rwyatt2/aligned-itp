import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
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
          className="absolute top-2 right-2 w-6 h-6 rounded-md flex items-center justify-center backdrop-blur-md"
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

function CardDownloadButton({ size = 14 }) {
  const [downloaded, setDownloaded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleDownload = async (e: React.MouseEvent, type: string) => {
    e.stopPropagation()
    setIsOpen(false)
    
    const cardBottomContainer = containerRef.current?.parentElement;
    const targetNode = cardBottomContainer?.previousElementSibling as HTMLElement;
    if (!targetNode) return;

    setIsDownloading(true);
    try {
      const { toSvg, toPng, toJpeg } = await import('html-to-image');
      let dataUrl;
      const options = { quality: 1, pixelRatio: 3, style: { transform: 'none' } };
      
      if (type === 'SVG') {
        dataUrl = await toSvg(targetNode, { ...options, backgroundColor: 'transparent' });
      } else if (type === 'PNG') {
        dataUrl = await toPng(targetNode, { ...options, backgroundColor: 'transparent' });
      } else if (type === 'JPG') {
        const computedStyle = window.getComputedStyle(targetNode);
        let bgColor = computedStyle.backgroundColor;
        if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') bgColor = '#FFFFFF';
        dataUrl = await toJpeg(targetNode, { ...options, backgroundColor: bgColor });
      }
      
      if (dataUrl) {
         const link = document.createElement('a');
         const titleNode = cardBottomContainer?.querySelector('.font-bold');
         const name = titleNode?.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'logo';
         link.download = `aligned-${name}.${type.toLowerCase()}`;
         link.href = dataUrl;
         link.click();
         setDownloaded(true)
         setTimeout(() => setDownloaded(false), 2000)
      }
    } catch (err) {
      console.error('Failed to download image', err);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen) }}
        disabled={isDownloading}
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors border focus:outline-none ${isDownloading ? 'opacity-50 cursor-wait' : 'hover:bg-[var(--bg-tertiary)] hover:border-[var(--border-secondary)] border-transparent'}`}
        style={{ color: downloaded ? '#22c55e' : 'var(--text-secondary)', marginTop: '-0.25rem' }}
        title="Download asset"
      >
        {downloaded ? <Check size={size} strokeWidth={3} /> : (isDownloading ? <div className="w-4 h-4 rounded-full border-2 border-[var(--text-secondary)] border-t-transparent animate-spin" /> : <Download size={size} />)}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
            className="absolute right-0 bottom-full mb-2 z-50 glass-panel rounded-xl shadow-2xl border border-[var(--border-secondary)] overflow-hidden min-w-[100px] p-1.5 flex flex-col gap-0.5"
            style={{ backgroundColor: 'var(--bg-panel)' }}
          >
            {['SVG', 'PNG', 'JPG'].map(format => (
              <button
                key={format}
                onClick={(e) => handleDownload(e, format)}
                className="text-left px-3 py-1.5 text-xs font-bold rounded-lg transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
                style={{ color: 'var(--text-secondary)' }}
              >
                .{format}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function LogoSystem() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [downloaded, setDownloaded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isDownloadingMain, setIsDownloadingMain] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleDownload = async (format?: string) => {
    setIsOpen(false);
    const targetNode = document.getElementById('primary-logo-target');
    if (!targetNode) return;

    setIsDownloadingMain(true);
    try {
      const { toSvg, toPng, toJpeg } = await import('html-to-image');
      let dataUrl;
      const typeStr = (format || 'PNG Transparent');
      const options = { quality: 1, pixelRatio: 3, style: { transform: 'none' } };
      
      if (typeStr.includes('SVG')) {
        dataUrl = await toSvg(targetNode, { ...options, backgroundColor: 'transparent' });
      } else if (typeStr.includes('PNG')) {
        dataUrl = await toPng(targetNode, { ...options, backgroundColor: 'transparent' });
      } else if (typeStr.includes('JPG')) {
        dataUrl = await toJpeg(targetNode, { ...options, backgroundColor: '#FFFFFF' });
      }
      
      if (dataUrl) {
         const link = document.createElement('a');
         const ext = typeStr.includes('SVG') ? 'svg' : typeStr.includes('PNG') ? 'png' : 'jpg';
         link.download = `aligned-primary-mark.${ext}`;
         link.href = dataUrl;
         link.click();
         setDownloaded(true)
         setTimeout(() => setDownloaded(false), 2000)
      }
    } catch (err) {
      console.error('Failed to download image', err);
    } finally {
      setIsDownloadingMain(false);
    }
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
      subtitle="The Aligned Technology Partners logo communicates structure, trust, movement, and partnership. The mark represents the convergence of people, process, and technology."
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
          className="glass-panel rounded-2xl p-12 md:p-24 mb-16 flex flex-col items-center justify-center relative overflow-hidden group"
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
            <div id="primary-logo-target" className="p-8 -m-8 flex items-center justify-center">
              <AlignedLogo animated={centerHovered ? 'converge' : 'breathing'} />
            </div>
          </motion.div>

          <div className="mt-12 text-center relative z-10 flex flex-col items-center">
            <h3
              className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              Aligned Technology Partners
            </h3>
            
            <div className="relative" ref={containerRef}>
              <motion.button 
                onClick={() => setIsOpen(!isOpen)}
                disabled={isDownloadingMain}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`glass px-6 py-2.5 rounded-lg flex items-center gap-3 text-sm font-semibold tracking-wide border transition-colors ${isDownloadingMain ? 'opacity-70 cursor-wait border-[var(--border-secondary)]' : 'border-[var(--border-primary)] hover:bg-[var(--bg-tertiary)] hover:border-[var(--accent)]'}`}
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
                     {isDownloadingMain ? <div className="w-4 h-4 rounded-full border-2 border-[var(--text-primary)] border-t-transparent animate-spin" /> : <Download size={16} />}
                     {isDownloadingMain ? 'Generating...' : 'Download Assets'}
                  </>
                )}
              </motion.button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 glass-panel rounded-xl shadow-2xl border border-[var(--border-secondary)] overflow-hidden min-w-[140px] p-1.5 flex flex-col gap-0.5"
                    style={{ backgroundColor: 'var(--bg-panel)' }}
                  >
                    {['SVG Vector', 'PNG Transparent', 'JPG Studio'].map(format => (
                      <button
                        key={format}
                        onClick={() => handleDownload(format)}
                        className="text-left px-4 py-2 text-xs font-bold rounded-lg transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {format}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Logomark Color Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              Color Variations
            </h3>
            <p className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>
              Approved color variations of the primary logomark designed for flexibility across different backgrounds. These are the only permitted color combinations.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="group rounded-2xl glass-card overflow-hidden cursor-pointer">
               <div className="aspect-[4/3] flex items-center justify-center p-8 transition-colors duration-300" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                 <div className="w-16 md:w-20 transform group-hover:scale-110 transition-transform duration-500 ease-[var(--ease-bounce)]"><AlignedLogo color="var(--accent)" animated={false} /></div>
               </div>
               <div className="p-4 border-t border-[var(--border-secondary)] bg-[var(--bg-panel)] flex items-start justify-between gap-2">
                 <div>
                   <div className="text-xs font-bold uppercase tracking-widest font-mono mb-1" style={{ color: 'var(--text-primary)' }}>Kinetic</div>
                   <div className="text-[10px] font-medium" style={{ color: 'var(--text-tertiary)' }}>Primary Accent</div>
                 </div>
                 <CardDownloadButton />
               </div>
            </div>

            <div className="group rounded-2xl glass-card overflow-hidden cursor-pointer">
               <div className="aspect-[4/3] flex items-center justify-center bg-[#0A0A0F] p-8 transition-colors duration-300">
                 <div className="w-16 md:w-20 transform group-hover:scale-110 transition-transform duration-500 ease-[var(--ease-bounce)]"><AlignedLogo color="#FFFFFF" animated={false} /></div>
               </div>
               <div className="p-4 border-t border-[var(--border-secondary)] bg-[var(--bg-panel)] flex items-start justify-between gap-2">
                 <div>
                   <div className="text-xs font-bold uppercase tracking-widest font-mono mb-1" style={{ color: 'var(--text-primary)' }}>Pristine</div>
                   <div className="text-[10px] font-medium" style={{ color: 'var(--text-tertiary)' }}>Reverse on Dark</div>
                 </div>
                 <CardDownloadButton />
               </div>
            </div>

            <div className="group rounded-2xl glass-card overflow-hidden cursor-pointer">
               <div className="aspect-[4/3] flex items-center justify-center bg-[#FFFFFF] p-8 transition-colors duration-300">
                 <div className="w-16 md:w-20 transform group-hover:scale-110 transition-transform duration-500 ease-[var(--ease-bounce)]"><AlignedLogo color="#0A0A0F" animated={false} /></div>
               </div>
               <div className="p-4 border-t border-[var(--border-secondary)] bg-[var(--bg-panel)] flex items-start justify-between gap-2">
                 <div>
                   <div className="text-xs font-bold uppercase tracking-widest font-mono mb-1" style={{ color: 'var(--text-primary)' }}>Void</div>
                   <div className="text-[10px] font-medium" style={{ color: 'var(--text-tertiary)' }}>Positive on Light</div>
                 </div>
                 <CardDownloadButton />
               </div>
            </div>

            <div className="group rounded-2xl glass-card overflow-hidden cursor-pointer">
               <div className="aspect-[4/3] flex items-center justify-center bg-[#F0F2F5] p-8 transition-colors duration-300">
                 <div className="w-16 md:w-20 transform group-hover:scale-110 transition-transform duration-500 ease-[var(--ease-bounce)]"><AlignedLogo color="#324458" animated={false} /></div>
               </div>
               <div className="p-4 border-t border-[var(--border-secondary)] bg-[var(--bg-panel)] flex items-start justify-between gap-2">
                 <div>
                   <div className="text-xs font-bold uppercase tracking-widest font-mono mb-1" style={{ color: 'var(--text-primary)' }}>Industrial</div>
                   <div className="text-[10px] font-medium" style={{ color: 'var(--text-tertiary)' }}>Slate Variant</div>
                 </div>
                 <CardDownloadButton />
               </div>
            </div>

            <div className="group rounded-2xl glass-card overflow-hidden cursor-pointer">
               <div className="aspect-[4/3] flex items-center justify-center p-8 transition-colors duration-300" style={{ backgroundColor: 'var(--accent)' }}>
                 <div className="w-16 md:w-20 transform group-hover:scale-110 transition-transform duration-500 ease-[var(--ease-bounce)]"><AlignedLogo color="#FFFFFF" animated={false} /></div>
               </div>
               <div className="p-4 border-t border-[var(--border-secondary)] bg-[var(--bg-panel)] flex items-start justify-between gap-2">
                 <div>
                   <div className="text-xs font-bold uppercase tracking-widest font-mono mb-1" style={{ color: 'var(--text-primary)' }}>Kinetic Inverse</div>
                   <div className="text-[10px] font-medium" style={{ color: 'var(--text-tertiary)' }}>Reversed on Accent</div>
                 </div>
                 <CardDownloadButton />
               </div>
            </div>

            <div className="group rounded-2xl glass-card overflow-hidden cursor-pointer">
               <div className="aspect-[4/3] flex items-center justify-center bg-[#12121A] p-8 transition-colors duration-300">
                 <div className="w-16 md:w-20 transform group-hover:scale-110 transition-transform duration-500 ease-[var(--ease-bounce)]"><AlignedLogo color="#B0CEE2" animated={false} /></div>
               </div>
               <div className="p-4 border-t border-[var(--border-secondary)] bg-[var(--bg-panel)] flex items-start justify-between gap-2">
                 <div>
                   <div className="text-xs font-bold uppercase tracking-widest font-mono mb-1" style={{ color: 'var(--text-primary)' }}>Cool Gray</div>
                   <div className="text-[10px] font-medium" style={{ color: 'var(--text-tertiary)' }}>Soft Tone on Dark</div>
                 </div>
                 <CardDownloadButton />
               </div>
            </div>

            <div className="group rounded-2xl glass-card overflow-hidden cursor-pointer">
               <div className="aspect-[4/3] flex items-center justify-center bg-[#F0F2F5] p-8 transition-colors duration-300">
                 <div className="w-16 md:w-20 transform group-hover:scale-110 transition-transform duration-500 ease-[var(--ease-bounce)]"><AlignedLogo color="#2A2A35" animated={false} /></div>
               </div>
               <div className="p-4 border-t border-[var(--border-secondary)] bg-[var(--bg-panel)] flex items-start justify-between gap-2">
                 <div>
                   <div className="text-xs font-bold uppercase tracking-widest font-mono mb-1" style={{ color: 'var(--text-primary)' }}>Charcoal</div>
                   <div className="text-[10px] font-medium" style={{ color: 'var(--text-tertiary)' }}>Graphite Variant</div>
                 </div>
                 <CardDownloadButton />
               </div>
            </div>

            <div className="group rounded-2xl glass-card overflow-hidden cursor-pointer">
               <div className="aspect-[4/3] flex items-center justify-center bg-[#324458] p-8 transition-colors duration-300">
                 <div className="w-16 md:w-20 transform group-hover:scale-110 transition-transform duration-500 ease-[var(--ease-bounce)]"><AlignedLogo color="#90B6D5" animated={false} /></div>
               </div>
               <div className="p-4 border-t border-[var(--border-secondary)] bg-[var(--bg-panel)] flex items-start justify-between gap-2">
                 <div>
                   <div className="text-xs font-bold uppercase tracking-widest font-mono mb-1" style={{ color: 'var(--text-primary)' }}>Industrial Mono</div>
                   <div className="text-[10px] font-medium" style={{ color: 'var(--text-tertiary)' }}>Slate on Slate</div>
                 </div>
                 <CardDownloadButton />
               </div>
            </div>
          </div>
        </motion.div>

        {/* Logo Lockups */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6, delay: 0.15 }}
           className="mb-16"
         >
           <div className="mb-8">
             <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
               Lockups & Configurations
             </h3>
             <p className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>
               The Aligned Technology Partners identity is designed with flexible lockups to accommodate different spatial requirements.
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {/* 1. Wordmark */}
             <div className="group rounded-2xl glass-card overflow-hidden flex flex-col">
               <div className="flex items-center justify-center p-8 min-h-[260px] transition-colors duration-300 flex-1" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                 <div className="flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500 ease-[var(--ease-bounce)] w-full">
                   <div className="text-[2rem] mt-0.5 tracking-tight">
                     <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Aligned</span>
                     <span className="font-light mx-0.5" style={{ color: 'var(--accent)' }}>|</span>
                     <span className="font-light" style={{ color: 'var(--text-primary)' }}>TP</span>
                   </div>
                 </div>
               </div>
               <div className="p-5 border-t border-[var(--border-secondary)] bg-[var(--bg-panel)] flex items-start justify-between gap-3">
                 <div>
                   <div className="text-sm font-bold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>Wordmark</div>
                   <div className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>Standalone typography for highly restricted spaces.</div>
                 </div>
                 <CardDownloadButton />
               </div>
             </div>

             {/* 2. Compact Horizontal */}
             <div className="group rounded-2xl glass-card overflow-hidden flex flex-col">
               <div className="flex items-center justify-center p-8 min-h-[260px] transition-colors duration-300 flex-1" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                 <div className="flex items-center gap-4 transform group-hover:scale-105 transition-transform duration-500 ease-[var(--ease-bounce)]">
                   <div className="w-10 shrink-0">
                     <AlignedLogo animated={false} />
                   </div>
                   <div className="text-[1.65rem] mt-1 tracking-tight">
                     <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Aligned</span>
                     <span className="font-light mx-0.5" style={{ color: 'var(--accent)' }}>|</span>
                     <span className="font-light" style={{ color: 'var(--text-primary)' }}>TP</span>
                   </div>
                 </div>
               </div>
               <div className="p-5 border-t border-[var(--border-secondary)] bg-[var(--bg-panel)] flex items-start justify-between gap-3">
                 <div>
                   <div className="text-sm font-bold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>Compact Horizontal</div>
                   <div className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>Space-saving design for navigation bars and UI headers.</div>
                 </div>
                 <CardDownloadButton />
               </div>
             </div>

             {/* 3. Compact Stacked */}
             <div className="group rounded-2xl glass-card overflow-hidden flex flex-col">
               <div className="flex items-center justify-center p-8 min-h-[260px] transition-colors duration-300 flex-1" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                 <div className="flex flex-col items-center gap-5 transform group-hover:scale-105 transition-transform duration-500 ease-[var(--ease-bounce)]">
                   <div className="w-12">
                     <AlignedLogo animated={false} />
                   </div>
                   <div className="text-[1.65rem] tracking-tight leading-none">
                     <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Aligned</span>
                     <span className="font-light mx-0.5" style={{ color: 'var(--accent)' }}>|</span>
                     <span className="font-light" style={{ color: 'var(--text-primary)' }}>TP</span>
                   </div>
                 </div>
               </div>
               <div className="p-5 border-t border-[var(--border-secondary)] bg-[var(--bg-panel)] flex items-start justify-between gap-3">
                 <div>
                   <div className="text-sm font-bold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>Compact Stacked</div>
                   <div className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>Optimized for avatars, social media, and square constraints.</div>
                 </div>
                 <CardDownloadButton />
               </div>
             </div>

             {/* 4. Primary Horizontal */}
             <div className="group rounded-2xl glass-card overflow-hidden flex flex-col md:col-span-2 lg:col-span-1">
               <div className="flex items-center justify-center p-8 min-h-[260px] transition-colors duration-300 flex-1" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                 <div className="flex items-center gap-4 transform group-hover:scale-105 transition-transform duration-500 ease-[var(--ease-bounce)] max-w-full overflow-hidden">
                   <div className="w-8 shrink-0">
                     <AlignedLogo animated={false} />
                   </div>
                   <div className="text-[1rem] sm:text-lg font-medium tracking-tight mt-1 leading-none whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: 'var(--text-primary)' }}>
                     Aligned Technology Partners
                   </div>
                 </div>
               </div>
               <div className="p-5 border-t border-[var(--border-secondary)] bg-[var(--bg-panel)] flex items-start justify-between gap-3">
                 <div>
                   <div className="text-sm font-bold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>Primary Horizontal</div>
                   <div className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>Standard configuration for documents and wide banners.</div>
                 </div>
                 <CardDownloadButton />
               </div>
             </div>

             {/* 5. Detailed Horizontal */}
             <div className="group rounded-2xl glass-card overflow-hidden flex flex-col">
               <div className="flex items-center justify-center p-8 min-h-[260px] transition-colors duration-300 flex-1" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                 <div className="flex items-center gap-6 transform group-hover:scale-105 transition-transform duration-500 ease-[var(--ease-bounce)]">
                   <div className="w-20 shrink-0">
                     <AlignedLogo animated={false} />
                   </div>
                   <div className="flex flex-col text-[1.4rem] font-medium leading-[1.2] tracking-tight" style={{ color: 'var(--text-primary)' }}>
                     <span>Aligned</span>
                     <span>Technology</span>
                     <span>Partners</span>
                   </div>
                 </div>
               </div>
               <div className="p-5 border-t border-[var(--border-secondary)] bg-[var(--bg-panel)] flex items-start justify-between gap-3">
                 <div>
                   <div className="text-sm font-bold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>Detailed Horizontal</div>
                   <div className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>Formal block layout for title pages and large covers.</div>
                 </div>
                 <CardDownloadButton />
               </div>
             </div>

             {/* 6. Detailed Stacked */}
             <div className="group rounded-2xl glass-card overflow-hidden flex flex-col">
               <div className="flex items-center justify-center p-8 min-h-[260px] transition-colors duration-300 flex-1" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                 <div className="flex flex-col items-center gap-6 transform group-hover:scale-105 transition-transform duration-500 ease-[var(--ease-bounce)]">
                   <div className="w-16 shrink-0">
                     <AlignedLogo animated={false} />
                   </div>
                   <div className="flex flex-col items-center text-[1.4rem] font-medium leading-[1.2] tracking-tight" style={{ color: 'var(--text-primary)' }}>
                     <span>Aligned</span>
                     <span>Technology</span>
                     <span>Partners</span>
                   </div>
                 </div>
               </div>
               <div className="p-5 border-t border-[var(--border-secondary)] bg-[var(--bg-panel)] flex items-start justify-between gap-3">
                 <div>
                   <div className="text-sm font-bold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>Detailed Stacked</div>
                   <div className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>Centered formal arrangement for vertical applications.</div>
                 </div>
                 <CardDownloadButton />
               </div>
             </div>
           </div>
         </motion.div>

        {/* Social Media Contexts */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6, delay: 0.17 }}
           className="mb-16"
        >
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              Social Media Contexts
            </h3>
            <p className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>
              Visualizing the logomark in standard social media avatar formats and interfaces. The compact standalone mark is required for legibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* LinkedIn Mockup */}
            <div className="group rounded-2xl glass-card overflow-hidden flex flex-col">
              <div className="p-0 flex flex-col bg-white h-48 relative overflow-hidden">
                <div className="h-16 bg-[#e0dfdc] relative">
                  <div className="absolute inset-0 overflow-hidden">
                     <div className="w-full h-full bg-[var(--bg-tertiary)]" />
                  </div>
                </div>
                <div className="px-4 relative pb-4">
                  <div className="w-16 h-16 rounded-full border-4 border-white bg-white flex items-center justify-center -mt-8 relative z-10 shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
                    <div className="w-10 transform translate-y-[-1px]"><AlignedLogo animated={false} /></div>
                  </div>
                  <div className="mt-2">
                    <div className="w-24 h-4 bg-gray-200 rounded-sm mb-1"></div>
                    <div className="w-32 h-2.5 bg-gray-100 rounded-sm"></div>
                  </div>
                </div>
                <div className="absolute top-3 right-3 text-white/50">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </div>
              </div>
              <div className="p-4 border-t border-[var(--border-secondary)] bg-[var(--bg-panel)] grow flex items-start justify-between">
                <div>
                  <div className="text-sm font-bold tracking-tight mb-0.5" style={{ color: 'var(--text-primary)' }}>LinkedIn</div>
                  <div className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>Profile overlap</div>
                </div>
              </div>
            </div>

            {/* X / Twitter Mockup */}
            <div className="group rounded-2xl glass-card overflow-hidden flex flex-col">
              <div className="p-4 flex bg-black h-48 relative overflow-hidden gap-3 border border-neutral-900 border-b-0">
                <div className="shrink-0 pt-1">
                  <div className="w-12 h-12 rounded-full border border-neutral-800 bg-[#0A0A0F] flex items-center justify-center p-2.5 overflow-hidden">
                    <div className="w-full h-full text-white"><AlignedLogo animated={false} color="#FFFFFF" /></div>
                  </div>
                </div>
                <div className="pt-1 w-full">
                  <div className="flex gap-2 items-center mb-1.5">
                    <div className="w-16 h-3.5 rounded-full bg-neutral-800"></div>
                    <div className="w-10 h-3 rounded-full bg-neutral-900"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-2.5 rounded-full bg-neutral-800"></div>
                    <div className="w-4/5 h-2.5 rounded-full bg-neutral-800"></div>
                    <div className="w-2/3 h-2.5 rounded-full bg-neutral-800"></div>
                  </div>
                </div>
                <div className="absolute top-3 right-3 text-white/20">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </div>
              </div>
              <div className="p-4 border-t border-[var(--border-secondary)] bg-[var(--bg-panel)] grow flex items-start justify-between">
                <div>
                  <div className="text-sm font-bold tracking-tight mb-0.5" style={{ color: 'var(--text-primary)' }}>X / Twitter</div>
                  <div className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>Reverse on dark timeline</div>
                </div>
              </div>
            </div>

            {/* Instagram Mockup */}
            <div className="group rounded-2xl glass-card overflow-hidden flex flex-col">
              <div className="p-0 flex flex-col items-center justify-center bg-white h-48 relative overflow-hidden">
                 <div className="rounded-full p-[2px] bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB]">
                   <div className="w-16 h-16 rounded-full border-2 border-white bg-white flex items-center justify-center p-3 relative overflow-hidden">
                     <div className="w-full h-full transform scale-110"><AlignedLogo animated={false} color="#0A0A0F" /></div>
                   </div>
                 </div>
                 <div className="w-20 h-3 bg-gray-200 mt-3 rounded-full"></div>
                 <div className="absolute top-3 right-3 text-black/10">
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                 </div>
              </div>
              <div className="p-4 border-t border-[var(--border-secondary)] bg-[var(--bg-panel)] grow flex items-start justify-between">
                <div>
                  <div className="text-sm font-bold tracking-tight mb-0.5" style={{ color: 'var(--text-primary)' }}>Instagram</div>
                  <div className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>Story ring context</div>
                </div>
              </div>
            </div>

            {/* Facebook Mockup */}
            <div className="group rounded-2xl glass-card overflow-hidden flex flex-col">
              <div className="p-0 flex flex-col bg-[#f0f2f5] h-48 relative overflow-hidden">
                 <div className="h-16 relative bg-[#1877f2] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
                 </div>
                 <div className="absolute top-[2.5rem] left-[1rem] z-10">
                   <div className="w-[4.5rem] h-[4.5rem] rounded-full border-4 border-white bg-white flex items-center justify-center shadow-sm overflow-hidden">
                     <div className="w-12 h-12 flex items-center justify-center transform translate-y-[-1px]"><AlignedLogo animated={false} color="#0A0A0F" /></div>
                   </div>
                 </div>
                 <div className="pt-12 px-4">
                   <div className="w-24 h-4 bg-gray-300 rounded-sm mb-1"></div>
                   <div className="w-16 h-2 bg-gray-300/60 rounded-sm"></div>
                 </div>
                 <div className="absolute top-3 right-3 text-white/50">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                 </div>
              </div>
              <div className="p-4 border-t border-[var(--border-secondary)] bg-[var(--bg-panel)] grow flex items-start justify-between">
                <div>
                  <div className="text-sm font-bold tracking-tight mb-0.5" style={{ color: 'var(--text-primary)' }}>Facebook</div>
                  <div className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>Page header context</div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Clear Space & Minimum Size */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Clear Space */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              Clear Space
            </h3>
            <p className="text-sm font-medium mb-8" style={{ color: 'var(--text-tertiary)' }}>
              Maintain a minimum clear space equal to the height of the crossbar curve around all sides of the mark.
            </p>
            <div className="relative flex items-center justify-center h-[240px] bg-[var(--bg-tertiary)] rounded-2xl shadow-inner border border-[var(--border-secondary)] overflow-hidden">
              <div className="relative flex items-center justify-center w-[160px] md:w-[180px] h-[140px] md:h-[160px]">
                {/* Dashed boundary lines */}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{ border: '2px dashed var(--accent)', opacity: 0.5 }}
                />
                
                {/* Inner mark */}
                <div className="w-20 md:w-24 relative z-10">
                  <AlignedLogo animated={false} />
                </div>
                
                {/* Dimension markers */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] md:text-xs font-bold font-mono text-[var(--text-primary)] bg-[var(--bg-tertiary)] px-2 z-10 flex items-center justify-center">
                  x
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[10px] md:text-xs font-bold font-mono text-[var(--text-primary)] bg-[var(--bg-tertiary)] px-2 z-10 flex items-center justify-center">
                  x
                </div>
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] md:text-xs font-bold font-mono text-[var(--text-primary)] bg-[var(--bg-tertiary)] py-2 z-10 flex items-center justify-center">
                  x
                </div>
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 text-[10px] md:text-xs font-bold font-mono text-[var(--text-primary)] bg-[var(--bg-tertiary)] py-2 z-10 flex items-center justify-center">
                  x
                </div>
              </div>
            </div>
          </motion.div>

          {/* Minimum Size */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card rounded-2xl p-8"
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
                  <div className="flex items-center gap-1.5 bg-[var(--bg-primary)] px-2.5 py-1 rounded-md border border-[var(--border-secondary)]">
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
              <div className="w-16">
                <AlignedLogo animated={false} color="var(--text-primary)" />
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
              <div className="w-16" style={{ filter: 'drop-shadow(6px 6px 10px var(--text-primary))' }}>
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
