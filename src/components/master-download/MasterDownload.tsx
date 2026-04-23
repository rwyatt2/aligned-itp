/**
 * MasterDownload.tsx
 *
 * Compact download button designed to sit inside the Navbar.
 * Triggers the full brand asset ZIP generation with a progress indicator.
 * Password-gated via the existing DownloadGuard system.
 */

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Check, X } from 'lucide-react'
import { useDownloadGuard } from '../../context/DownloadGuardContext'
import { generateBrandZip, type ZipProgress } from '../../lib/generateBrandZip'

export default function MasterDownloadButton() {
  const { guardDownload } = useDownloadGuard()
  const [state, setState] = useState<'idle' | 'building' | 'done' | 'error'>('idle')
  const [progress, setProgress] = useState<ZipProgress>({ step: '', percent: 0 })
  const [showTooltip, setShowTooltip] = useState(false)
  const tooltipTimeout = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    return () => {
      if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current)
    }
  }, [])

  const handleDownload = useCallback(async () => {
    if (state === 'building') return
    setState('building')
    setProgress({ step: 'Preparing…', percent: 0 })

    try {
      const blob = await generateBrandZip((p) => setProgress(p))

      // Trigger browser download
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'Aligned-Technology-Partners-Brand-Assets.zip'
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
  }, [state])

  const triggerGuardedDownload = useCallback(() => {
    guardDownload(handleDownload)
  }, [guardDownload, handleDownload])

  const isBuilding = state === 'building'
  const isDone = state === 'done'
  const isError = state === 'error'

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current)
        setShowTooltip(true)
      }}
      onMouseLeave={() => {
        tooltipTimeout.current = setTimeout(() => setShowTooltip(false), 200)
      }}
    >
      <motion.button
        onClick={triggerGuardedDownload}
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

      {/* Tooltip / Progress label */}
      <AnimatePresence>
        {(showTooltip || isBuilding) && (
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
                color: isBuilding ? 'var(--accent)' : isDone ? '#22c55e' : isError ? '#ef4444' : 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {isBuilding
                ? `${progress.step} ${progress.percent}%`
                : isDone
                ? 'Download complete!'
                : isError
                ? 'Download failed — try again'
                : 'Download Brand Assets'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
