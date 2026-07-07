/**
 * MasterDownload.tsx
 *
 * Compact download button designed to sit inside the Navbar.
 * Triggers the full brand asset ZIP generation with a progress indicator.
 * Password-gated via the existing DownloadGuard system.
 */

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Check, X, Sun, Moon, Layers } from 'lucide-react'
import { useDownloadGuard } from '../../context/DownloadGuardContext'
import { useTheme } from '../../context/ThemeContext'
import { generateBrandZip, type ZipProgress } from '../../lib/generateBrandZip'
import type { LogoVersionMode } from '../../lib/logoSvgBuilder'
import { THEME_VERSION_NOTE } from '../common/ThemeVersionNote'

const VERSION_OPTIONS: { mode: LogoVersionMode; label: string; sub: string; icon: typeof Sun }[] = [
  { mode: 'light', label: 'Light', sub: 'For light backgrounds', icon: Sun },
  { mode: 'dark', label: 'Dark', sub: 'For dark backgrounds', icon: Moon },
  { mode: 'both', label: 'Both', sub: 'Every version', icon: Layers },
]

export default function MasterDownloadButton() {
  const { guardDownload } = useDownloadGuard()
  const { theme } = useTheme()
  const [state, setState] = useState<'idle' | 'building' | 'done' | 'error'>('idle')
  const [progress, setProgress] = useState<ZipProgress>({ step: '', percent: 0 })
  const [showPanel, setShowPanel] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowPanel(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDownload = useCallback(async (mode: LogoVersionMode) => {
    setState('building')
    setProgress({ step: 'Preparing…', percent: 0 })

    try {
      const blob = await generateBrandZip(mode, (p) => setProgress(p))

      // Trigger browser download
      const suffix = mode === 'both' ? '' : `-${mode.charAt(0).toUpperCase() + mode.slice(1)}`
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Aligned-Technology-Partners-Brand-Assets${suffix}.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setState('done')
      setTimeout(() => setState('idle'), 3000)
    } catch (err) {
      console.error('Master download failed:', err)
      setState('error')
      setTimeout(() => setState('idle'), 4000)
    }
  }, [])

  const chooseVersion = useCallback((mode: LogoVersionMode) => {
    setShowPanel(false)
    guardDownload(() => handleDownload(mode))
  }, [guardDownload, handleDownload])

  const isBuilding = state === 'building'
  const isDone = state === 'done'
  const isError = state === 'error'

  return (
    <div className="relative" ref={containerRef}>
      <motion.button
        onClick={() => { if (!isBuilding) setShowPanel((v) => !v) }}
        disabled={isBuilding}
        whileHover={isBuilding ? {} : { scale: 1.08 }}
        whileTap={isBuilding ? {} : { scale: 0.94 }}
        className="relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 overflow-hidden focus:outline-none"
        style={{
          color: isDone
            ? '#22c55e'
            : isError
            ? '#ef4444'
            : isBuilding
            ? 'var(--accent)'
            : 'var(--text-secondary)',
          backgroundColor: isBuilding
            ? 'var(--bg-tertiary)'
            : 'transparent',
        }}
        aria-label="Download all brand assets"
        id="master-download-button"
      >
        {/* Progress ring */}
        {isBuilding && (
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 40 40"
          >
            {/* Track */}
            <circle
              cx="20" cy="20" r="16"
              fill="none"
              stroke="var(--border-secondary)"
              strokeWidth="2"
            />
            {/* Progress arc */}
            <motion.circle
              cx="20" cy="20" r="16"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 16}
              strokeDashoffset={2 * Math.PI * 16 * (1 - progress.percent / 100)}
              transition={{ duration: 0.3 }}
            />
          </svg>
        )}

        {/* Icon */}
        <AnimatePresence mode="wait">
          {isDone ? (
            <motion.div
              key="done"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.25, type: 'spring', stiffness: 400 }}
            >
              <Check size={18} strokeWidth={3} />
            </motion.div>
          ) : isError ? (
            <motion.div
              key="error"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <X size={18} strokeWidth={3} />
            </motion.div>
          ) : isBuilding ? (
            <motion.div
              key="building"
              className="relative z-10"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Download size={16} />
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
            >
              <Download size={18} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Progress / status label */}
      <AnimatePresence>
        {(isBuilding || isDone || isError) && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 z-50 pointer-events-none"
          >
            <div
              className="px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shadow-lg border"
              style={{
                backgroundColor: 'var(--bg-panel)',
                borderColor: 'var(--border-secondary)',
                backdropFilter: 'blur(12px)',
                color: isBuilding ? 'var(--accent)' : isDone ? '#22c55e' : '#ef4444',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {isBuilding
                ? `${progress.step} ${progress.percent}%`
                : isDone
                ? 'Download complete!'
                : 'Download failed — try again'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Version chooser panel */}
      <AnimatePresence>
        {showPanel && !isBuilding && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96, transition: { duration: 0.12 } }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full right-0 mt-2 z-50 w-72 rounded-2xl shadow-2xl border overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-secondary)',
            }}
          >
            <div className="p-3">
              <div
                className="text-xs font-bold tracking-tight mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                Download Brand Assets
              </div>
              <p
                className="text-[11px] font-medium leading-relaxed mb-3"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {THEME_VERSION_NOTE}
              </p>

              <div className="flex flex-col gap-1.5">
                {VERSION_OPTIONS.map(({ mode, label, sub, icon: Icon }) => {
                  const recommended =
                    (mode === 'light' && theme === 'light') ||
                    (mode === 'dark' && theme === 'dark')
                  return (
                    <button
                      key={mode}
                      onClick={() => chooseVersion(mode)}
                      className="flex items-center gap-3 text-left px-3 py-2.5 rounded-xl transition-colors hover:bg-[var(--bg-tertiary)] border"
                      style={{
                        borderColor: recommended ? 'var(--accent)' : 'var(--border-secondary)',
                      }}
                    >
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--accent)' }}
                      >
                        <Icon size={15} />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                          {label}
                          {recommended && (
                            <span
                              className="ml-1.5 text-[9px] font-bold uppercase tracking-wide"
                              style={{ color: 'var(--accent)' }}
                            >
                              Current
                            </span>
                          )}
                        </span>
                        <span className="text-[10px] font-medium" style={{ color: 'var(--text-tertiary)' }}>
                          {sub}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
