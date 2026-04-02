import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Lenis from 'lenis'
import Navbar from './components/layout/Navbar'
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
      <footer
        className="relative py-16 px-6 glass-panel mx-4 md:mx-12 rounded-[2rem] mt-24 mb-4 md:mb-12 shadow-inner"
      >
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              {/* Mini logo */}
              <div className="w-8 h-8 drop-shadow-md">
                <svg viewBox="0 0 56 48" className="w-full h-full">
                  <path d="M37.8223 0.549805C37.732 1.45903 37.6856 2.3816 37.6855 3.31445L37.6904 3.85059C37.9043 15.0773 44.8151 24.666 54.5957 28.7871L55.1182 29.0068L44.3477 47.6611L43.8955 47.3184C39.4033 43.9073 33.8367 41.8389 27.791 41.7129L27.2041 41.707C21.2019 41.7071 15.648 43.6208 11.1172 46.8711L10.6689 47.1924L0.276367 29.1904L0 28.7129L0.501953 28.4854C9.92022 24.2093 16.5138 14.8042 16.7178 3.83789L16.7227 3.31445C16.7226 2.38127 16.6772 1.45867 16.5869 0.549805L16.5322 0H37.877L37.8223 0.549805ZM33.0967 23.9375C31.915 26.455 30.525 28.8549 28.9463 31.1143C32.85 36.213 37.8039 40.4631 43.4814 43.5508L51.127 30.3057C45.7502 27.0029 39.6406 24.7785 33.0967 23.9375ZM21.3086 23.9375C15.0278 24.7452 9.14764 26.8292 3.93066 29.916L11.5918 43.1826C16.9903 40.1287 21.7087 36.0122 25.459 31.1143C23.8804 28.8549 22.4902 26.455 21.3086 23.9375ZM27.2041 33.4551C25.5128 35.5907 23.6458 37.5805 21.625 39.4033C23.4341 39.0684 25.2989 38.8926 27.2041 38.8926L27.6895 38.8965C29.4253 38.9236 31.126 39.0971 32.7803 39.4033C30.7602 37.5806 28.8948 35.5903 27.2041 33.4551ZM26.2861 23.5684C25.6185 23.5817 24.9543 23.6098 24.2939 23.6514C25.1585 25.3906 26.132 27.0663 27.2031 28.6719C28.2736 27.0667 29.2461 25.3913 30.1104 23.6523C29.1492 23.5918 28.1801 23.5596 27.2041 23.5596L26.2861 23.5684ZM17.793 13.4873C16.5326 17.0417 14.6301 20.2903 12.2266 23.0977C14.7799 22.2713 17.4259 21.6516 20.1445 21.2559C19.153 18.7612 18.3629 16.165 17.793 13.4873ZM36.6113 13.4893C36.0414 16.1662 35.2521 18.7617 34.2607 21.2559C36.9795 21.6514 39.6254 22.2713 42.1787 23.0977C39.7757 20.2907 37.8716 17.0429 36.6113 13.4893ZM19.5371 3.31445L19.541 3.91016C19.618 9.93443 20.8635 15.676 23.0527 20.9238C24.421 20.8078 25.8056 20.7451 27.2041 20.7451L28.3438 20.7588C29.3551 20.7825 30.3586 20.8395 31.3535 20.9238C33.615 15.5031 34.8701 9.55609 34.8701 3.31445L34.8643 2.80469H19.5439C19.5416 2.97486 19.5371 3.14473 19.5371 3.31445Z" fill="var(--accent)" />
                </svg>
              </div>
              <span className="text-base font-bold tracking-tight text-gradient">
                Aligned Technology Partners
              </span>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                System V2 — {new Date().getFullYear()}
              </p>
              <div className="flex gap-4 text-[10px] uppercase font-bold tracking-[0.2em] opacity-50" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                <span>Confidential</span>
                <span>Internal Only</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
