import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import MasterDownloadButton from '../master-download/MasterDownload'

const guidelineSections = [
  { id: 'hero', label: 'Home' },
  { id: 'logo-system', label: 'Logo' },
  { id: 'color-palette', label: 'Color' },
  { id: 'typography', label: 'Type' },
  { id: 'visual-language', label: 'Visual' },
  { id: 'mockups', label: 'Mockups' },
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
              className="flex items-center gap-2.5 px-3 py-1 group rounded-md transition-colors hover:bg-[var(--bg-tertiary)]"
            >
              <div className="w-6 h-6 shrink-0">
                <svg viewBox="0 0 1121 974" className="w-full h-full">
                  <path
                    d="M1088.98 745.654L1121 691.207C977.139 471.994 832.804 233.21 732.232 0H680.76C578.646 226.567 453.642 445.423 309.9 648.147C284.164 648.859 258.428 649.926 232.692 651.35C376.197 452.659 500.014 223.008 608.77 0H545.557C434.548 225.974 306.342 455.032 160.583 655.858C134.136 657.518 107.451 660.009 81.1219 662.263C227.355 460.132 354.256 227.041 464.79 0H401.696C286.654 234.633 151.57 471.52 0 680.056L26.2104 724.539C274.201 698.561 525.869 695.833 773.86 721.218C787.736 743.756 801.968 766.057 816.437 788.239C586.236 760.6 311.679 772.225 62.3832 785.985L94.8794 841.025C348.682 827.621 621.697 818.369 857.473 849.803L899.694 911.842C665.342 882.068 388.531 889.897 131.527 903.302L164.023 958.461C429.092 945.768 709.935 941.735 954.724 974L980.816 929.636C837.311 726.674 706.258 509.597 604.145 283.268C615.767 261.679 627.271 239.971 638.42 218.145C715.628 403.906 885.936 664.398 1016.75 868.427L1049.13 813.387C914.044 603.19 749.191 348.628 671.628 151.717C682.064 130.483 696.178 100.354 706.496 78.7646C804.103 302.603 950.099 534.626 1088.98 745.654ZM737.213 660.721C618.614 650.045 499.184 645.419 379.873 646.724C447.238 548.98 512.112 448.389 570.225 344.714C620.63 452.422 676.371 558.232 737.213 660.721Z"
                    fill="var(--accent)"
                    className="transition-all duration-300 group-hover:fill-[var(--color-kinetic-light)]"
                  />
                </svg>
              </div>
              <span className="hidden sm:block text-sm font-medium tracking-tight whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
                Aligned Technology Partners
              </span>
            </button>

            {/* Desktop Nav */}
            {(
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
            )}

            {/* Right Controls */}
            <div className="flex items-center gap-2 pr-1">
              {/* View Toggle */}
              {onViewChange && (
                <>
                  {/* Landing Page button hidden temporarily
                  <button
                    onClick={() => onViewChange(currentView === 'guidelines' ? 'landing' : 'guidelines')}
                    className="px-3 md:px-4 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] md:border-transparent md:hover:border-[var(--border-secondary)]"
                    style={{ color: currentView === 'landing' ? 'var(--accent)' : 'var(--text-secondary)' }}
                  >
                    <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-mono)' }}>
                      {currentView === 'guidelines' ? 'Landing Page' : 'Guidelines'}
                    </span>
                  </button>
                  */}
                </>
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

              {/* Master Download */}
              <MasterDownloadButton />

              {/* Mobile Menu Toggle */}
              {(
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-[var(--bg-tertiary)]"
                  style={{ color: 'var(--text-secondary)' }}
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {(
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
      )}
    </>
  )
}
