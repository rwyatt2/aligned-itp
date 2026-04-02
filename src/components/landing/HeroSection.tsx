import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function QuantumFieldBackground() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [rectDims, setRectDims] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDims = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setRectDims({ width: rect.width, height: rect.height });
      }
    };
    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  const rows = 16;
  const cols = 32;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 opacity-90 overflow-hidden"
    >
      <div 
        className="grid gap-2 w-full h-full p-4 md:p-8"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          let angle = 45;
          let scale = 1;
          
          if (rectDims.width > 0) {
            const cellX = (col / cols) * rectDims.width;
            const cellY = (row / rows) * rectDims.height;
            const dx = mousePos.x - cellX;
            const dy = mousePos.y - cellY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 200;
            
            if (distance < maxDist) {
               angle = Math.atan2(dy, dx) * (180 / Math.PI);
               scale = 1 + (maxDist - distance) / maxDist;
            } else {
               angle = (row * 10) + (col * 15);
            }
          }

          return (
            <div key={i} className="flex items-center justify-center w-full h-full">
              <motion.div
                animate={{ rotate: angle, scale: scale * 0.8 }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                className="w-4 h-[2px] opacity-40 origin-center"
                style={{
                   boxShadow: scale > 1.2 ? '0 0 8px var(--accent-glow)' : 'none',
                   backgroundColor: scale > 1.5 ? 'var(--accent)' : 'var(--text-secondary)'
                }}
              />
            </div>
          );
        })}
      </div>
      
      {/* Heavy Vignette Shadow to obscure the edges and bring text forward */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 15%, var(--bg-primary) 85%)', opacity: 0.95 }}
      />
      {/* Physical gradient overlay fixed to the bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)' }}
      />
    </div>
  )
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -100])

  const scrollToContact = () => {
    document.getElementById('lead-capture')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Framer Motion staggered text setup
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { delay: 0.3, staggerChildren: 0.12 },
    },
  }

  const word = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    },
  }

  return (
    <section
      id="client-hero"
      ref={sectionRef}
      className="relative min-h-[90vh] w-full overflow-hidden bg-[var(--bg-primary)] border-b border-[var(--border-secondary)]"
    >
      {/* Interactive Quantum Field Background */}
      <QuantumFieldBackground />

      {/* Hero Content */}
      <div className="relative h-full min-h-[90vh] flex flex-col items-center justify-center px-6 pt-24 pb-12 z-30 pointer-events-none">
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="text-center max-w-5xl mx-auto flex flex-col items-center pointer-events-auto"
        >
          {/* Kicker */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="glass px-4 py-2 rounded-2xl inline-block shadow-sm border border-[var(--surface-glass-border)]">
              <span className="kicker">Strategic Growth Partner</span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={sentence}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[1.05]"
            style={{ color: 'var(--text-primary)' }}
          >
            {['Turn', 'Technology', 'into', 'a'].map((w, i) => (
              <motion.span key={i} variants={word} className="inline-block mr-[0.25em]">
                {w}
              </motion.span>
            ))}
            <br className="hidden md:block"/>
            <span className="whitespace-nowrap">
              <span className="relative inline-block mt-2 md:mt-0">
                <motion.span variants={word} className="inline-block relative z-10">
                  Competitive
                </motion.span>
              </span>
              {[' '].map((w, i) => <motion.span key={i} variants={word} className="inline-block mr-[0.25em]">{w}</motion.span>)}
              <span className="relative inline-block mt-2 md:mt-0">
                <motion.span variants={word} className="inline-block relative z-10 text-gradient pr-2">
                  Advantage.
                </motion.span>
              </span>
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            We align your people, process, and technology to reduce operational friction and accelerate measurable business outcomes.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <button 
              onClick={scrollToContact}
              className="px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-1 hover:brightness-110 focus:ring-4 focus:ring-[var(--accent)]/30 outline-none active:translate-y-0"
              style={{ 
                backgroundColor: 'var(--accent)',
                color: 'white',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              Schedule a Strategy Call
            </button>
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}
