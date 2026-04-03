import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const guidelineSections = [
  { id: 'hero', label: 'Home' },
  { id: 'logo-system', label: 'Logo' },
  { id: 'color-palette', label: 'Color' },
  { id: 'typography', label: 'Type' },
  { id: 'visual-language', label: 'Visual' },
  { id: 'voice-tone', label: 'Voice' },
]

const landingSections = [
  { id: 'client-hero', label: 'Home' },
  { id: 'framework', label: 'Framework' },
  { id: 'reality', label: 'Reality' },
  { id: 'partners', label: 'Partners' },
  { id: 'lead-capture', label: 'Contact' },
]

interface NavbarProps {
  currentView?: 'guidelines' | 'landing'
  onViewChange?: (view: 'guidelines' | 'landing') => void
}

export default function Navbar({ currentView = 'guidelines', onViewChange }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)
  
  const { scrollY } = useScroll()

  const activeSectionsList = currentView === 'guidelines' ? guidelineSections : landingSections

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Manage active section
    const scrollPos = latest + window.innerHeight / 3
    for (let i = activeSectionsList.length - 1; i >= 0; i--) {
      const el = document.getElementById(activeSectionsList[i].id)
      if (el && el.offsetTop <= scrollPos) {
        if (activeSection !== activeSectionsList[i].id) {
          setActiveSection(activeSectionsList[i].id)
        }
        break
      }
    }
  })

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
        }}
        animate="visible"
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 mt-2 md:mt-4 pointer-events-none"
      >
        <div className="mx-auto max-w-5xl pointer-events-auto">
          <div className="glass-panel p-2 md:p-2.5 rounded-2xl flex items-center justify-between">
            {/* Logo Mark */}
            <button
              onClick={() => scrollTo('hero')}
              className="flex items-center gap-2 px-3 py-1 group rounded-md transition-colors hover:bg-[var(--bg-tertiary)]"
            >
              <div className="w-6 h-6 relative">
                <svg viewBox="0 0 56 48" className="w-full h-full">
                  <path
                    d="M37.8223 0.549805C37.732 1.45903 37.6856 2.3816 37.6855 3.31445L37.6904 3.85059C37.9043 15.0773 44.8151 24.666 54.5957 28.7871L55.1182 29.0068L44.3477 47.6611L43.8955 47.3184C39.4033 43.9073 33.8367 41.8389 27.791 41.7129L27.2041 41.707C21.2019 41.7071 15.648 43.6208 11.1172 46.8711L10.6689 47.1924L0.276367 29.1904L0 28.7129L0.501953 28.4854C9.92022 24.2093 16.5138 14.8042 16.7178 3.83789L16.7227 3.31445C16.7226 2.38127 16.6772 1.45867 16.5869 0.549805L16.5322 0H37.877L37.8223 0.549805ZM33.0967 23.9375C31.915 26.455 30.525 28.8549 28.9463 31.1143C32.85 36.213 37.8039 40.4631 43.4814 43.5508L51.127 30.3057C45.7502 27.0029 39.6406 24.7785 33.0967 23.9375ZM21.3086 23.9375C15.0278 24.7452 9.14764 26.8292 3.93066 29.916L11.5918 43.1826C16.9903 40.1287 21.7087 36.0122 25.459 31.1143C23.8804 28.8549 22.4902 26.455 21.3086 23.9375ZM27.2041 33.4551C25.5128 35.5907 23.6458 37.5805 21.625 39.4033C23.4341 39.0684 25.2989 38.8926 27.2041 38.8926L27.6895 38.8965C29.4253 38.9236 31.126 39.0971 32.7803 39.4033C30.7602 37.5806 28.8948 35.5903 27.2041 33.4551ZM26.2861 23.5684C25.6185 23.5817 24.9543 23.6098 24.2939 23.6514C25.1585 25.3906 26.132 27.0663 27.2031 28.6719C28.2736 27.0667 29.2461 25.3913 30.1104 23.6523C29.1492 23.5918 28.1801 23.5596 27.2041 23.5596L26.2861 23.5684ZM17.793 13.4873C16.5326 17.0417 14.6301 20.2903 12.2266 23.0977C14.7799 22.2713 17.4259 21.6516 20.1445 21.2559C19.153 18.7612 18.3629 16.165 17.793 13.4873ZM36.6113 13.4893C36.0414 16.1662 35.2521 18.7617 34.2607 21.2559C36.9795 21.6514 39.6254 22.2713 42.1787 23.0977C39.7757 20.2907 37.8716 17.0429 36.6113 13.4893ZM19.5371 3.31445L19.541 3.91016C19.618 9.93443 20.8635 15.676 23.0527 20.9238C24.421 20.8078 25.8056 20.7451 27.2041 20.7451L28.3438 20.7588C29.3551 20.7825 30.3586 20.8395 31.3535 20.9238C33.615 15.5031 34.8701 9.55609 34.8701 3.31445L34.8643 2.80469H19.5439C19.5416 2.97486 19.5371 3.14473 19.5371 3.31445Z"
                    fill="var(--accent)"
                    className="transition-all duration-300 group-hover:fill-[var(--color-kinetic-light)]"
                  />
                </svg>
              </div>
              <span className="text-sm font-bold tracking-tight hidden sm:block text-gradient">
                Aligned Technology Partners
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 px-4">
              {activeSectionsList.slice(1).map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className="relative px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-colors duration-300 rounded-lg"
                  style={{
                    color: activeSection === section.id ? 'var(--text-primary)' : 'var(--text-tertiary)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {section.label}
                  {activeSection === section.id && (
                    <motion.div
                      layoutId="nav-bg"
                      className="absolute inset-0 rounded-lg -z-10"
                      style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-secondary)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 pr-1">
              {/* View Toggle */}
              {onViewChange && (
                <button
                  onClick={() => onViewChange(currentView === 'guidelines' ? 'landing' : 'guidelines')}
                  className="px-3 md:px-4 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] md:border-transparent md:hover:border-[var(--border-secondary)]"
                  style={{ color: currentView === 'landing' ? 'var(--accent)' : 'var(--text-secondary)' }}
                >
                  <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-mono)' }}>
                    {currentView === 'guidelines' ? 'Client View' : 'Guidelines'}
                  </span>
                </button>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[var(--bg-tertiary)]"
                style={{ color: 'var(--text-secondary)' }}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                  >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.div>
                </AnimatePresence>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-[var(--bg-tertiary)]"
                style={{ color: 'var(--text-secondary)' }}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-24 z-40 px-4 md:hidden"
          >
            <div className="glass-panel rounded-2xl p-4 shadow-xl">
              {activeSectionsList.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 mb-1"
                  style={{
                    color: activeSection === section.id ? 'var(--accent)' : 'var(--text-primary)',
                    backgroundColor: activeSection === section.id ? 'var(--accent-glow)' : 'transparent',
                  }}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
