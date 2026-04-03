import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AlignedLogo from './AlignedLogo'
import TechSchematic from './TechSchematic'
export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -100])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 250])

  // Framer Motion staggered text setup
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        staggerChildren: 0.12,
      },
    },
  }

  const word = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    },
  }

  return (
    <>
      <section
        id="hero"
        ref={sectionRef}
        className="relative h-screen overflow-hidden bg-[var(--bg-primary)]"
      >
      {/* Tech Schematic Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        style={{ y: bgY }}
      >
        <TechSchematic />
      </motion.div>

      {/* Hero Content - Fixed while scrolling */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="text-center max-w-5xl mx-auto z-10"
        >
          {/* Kicker */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="glass px-4 py-2 rounded-2xl inline-block shadow-sm">
              <span className="kicker">Brand Guidelines · 2026</span>
            </div>
          </motion.div>

          {/* Main headline with staggered reveal */}
          <motion.h1
            variants={sentence}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-4"
            style={{ color: 'var(--text-primary)', lineHeight: 1.05 }}
          >
            {['Misalignment', 'is'].map((w, i) => (
              <motion.span key={i} variants={word} className="inline-block mr-[0.25em]">
                {w}
              </motion.span>
            ))}
            <br className="hidden md:block"/>
            <span className="relative inline-block mt-2 md:mt-0">
              <motion.span variants={word} className="inline-block relative z-10">
                the enemy
              </motion.span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.5, ease: "circOut" }}
                className="absolute left-0 right-0 bottom-[0.1em] h-[0.1em] origin-left z-0 mix-blend-multiply dark:mix-blend-screen"
                style={{ backgroundColor: 'var(--accent)', opacity: 0.8 }}
              />
            </span>
            <motion.span variants={word} className="inline-block" style={{ color: 'var(--accent)' }}>.</motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-10 mt-6"
            style={{ color: 'var(--text-primary)', lineHeight: 1.1 }}
          >
            Aligning people, process and Technology to advance your business
            <span style={{ color: 'var(--accent)' }}>.</span>
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-16 font-medium"
            style={{ color: 'var(--text-primary)' }}
          >
            Aligning people, process, and technology to help your business operate better.
            <br />
            <strong className="mt-2 block font-mono uppercase tracking-[0.1em] text-xs" style={{ color: 'var(--text-secondary)' }}>Protect • Optimize • Advance</strong>
          </motion.p>
        </motion.div>

        {/* Floating Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1 }}
          style={{ opacity: textOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
        >
          <span
            className="text-[10px] font-bold tracking-[0.2em] uppercase"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
          >
            Scroll to discover
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full flex items-start justify-center p-1.5 glass-card"
          >
            <motion.div
              animate={{ opacity: [1, 0, 1], y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-1.5 h-3 rounded-full"
              style={{ backgroundColor: 'var(--accent)', boxShadow: 'var(--shadow-glow)' }}
            />
          </motion.div>
        </motion.div>

      </div>

      </section>

      {/* Logo Card Section */}
      <section id="logo-card" className="relative min-h-screen flex items-center justify-center px-4 bg-[var(--bg-primary)] z-10 py-24">
        <div className="max-w-lg w-full">
          <div className="glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden">
            {/* Inner ambient glow for the logo card */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-panel)] to-transparent opacity-50" />
            
            <div className="relative z-10 drop-shadow-xl">
              <AlignedLogo animated={true} />
            </div>

            {/* Labels */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16 grid grid-cols-3 gap-4 text-center relative z-10"
            >
              {[
                { line: 'People', system: 'Protect', color: 'var(--text-primary)' },
                { line: 'Process', system: 'Optimize', color: 'var(--accent)' },
                { line: 'Technology', system: 'Advance', color: 'var(--text-secondary)' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="text-xs md:text-sm font-bold tracking-[0.15em] uppercase mb-2"
                    style={{ color: item.color, fontFamily: 'var(--font-mono)' }}
                  >
                    {item.line}
                  </div>
                  <div
                    className="text-[10px] md:text-xs tracking-widest uppercase px-3 py-1 rounded-md border"
                    style={{ 
                      color: 'var(--text-tertiary)', 
                      fontFamily: 'var(--font-mono)',
                      borderColor: 'var(--border-secondary)',
                      backgroundColor: 'var(--bg-primary)'
                    }}
                  >
                    {item.system}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
