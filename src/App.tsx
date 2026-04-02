import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Lenis from 'lenis'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/hero/HeroSection'
import LogoSystem from './components/logo-system/LogoSystem'
import ColorPalette from './components/color-palette/ColorPalette'
import Typography from './components/typography/Typography'
import VisualLanguage from './components/visual-language/VisualLanguage'
import VoiceTone from './components/voice-tone/VoiceTone'
import ClientLanding from './pages/ClientLanding'

function AnimatedDivider() {
  return (
    <div className="flex justify-center py-4 md:py-6 relative -z-10 overflow-hidden">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "circOut" }}
        className="h-px w-full max-w-7xl relative"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
        }}
      >
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 h-full w-1/4"
          style={{
            background: 'linear-gradient(90deg, transparent, #FFFFFF, transparent)',
            mixBlendMode: 'overlay',
            opacity: 0.8
          }}
        />
      </motion.div>
    </div>
  )
}

export default function App() {
  const [currentView, setCurrentView] = useState<'guidelines' | 'landing'>(() => {
    return new URLSearchParams(window.location.search).get('view') === 'landing' ? 'landing' : 'guidelines'
  })

  const handleViewChange = (view: 'guidelines' | 'landing') => {
    setCurrentView(view)
    window.history.pushState({}, '', view === 'landing' ? '?view=landing' : '/')
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like natural exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,     // Slightly accelerated wheel for responsiveness
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative font-sans text-base antialiased selection:bg-[var(--accent)] selection:text-white">
      <Navbar currentView={currentView} onViewChange={handleViewChange} />

      <main className="relative z-0">
        {currentView === 'guidelines' ? (
          <>
            <HeroSection />
            <AnimatedDivider />
            <LogoSystem />
            <AnimatedDivider />
            <ColorPalette />
            <AnimatedDivider />
            <Typography />
            <AnimatedDivider />
            <VisualLanguage />
            <AnimatedDivider />
            <VoiceTone />
          </>
        ) : (
          <ClientLanding />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
