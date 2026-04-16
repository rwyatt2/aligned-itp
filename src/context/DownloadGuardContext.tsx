import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, X, Eye, EyeOff } from 'lucide-react'

// ─── Change this password to whatever you want ───
const DOWNLOAD_PASSWORD = 'aligned2026'

interface DownloadGuardContextType {
  guardDownload: (callback: () => void) => void
}

const DownloadGuardContext = createContext<DownloadGuardContextType | undefined>(undefined)

export function DownloadGuardProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null)

  const guardDownload = useCallback((callback: () => void) => {
    if (isAuthenticated) {
      callback()
      return
    }
    setPendingCallback(() => callback)
    setShowModal(true)
    setPassword('')
    setError(false)
  }, [isAuthenticated])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === DOWNLOAD_PASSWORD) {
      setIsAuthenticated(true)
      setShowModal(false)
      setError(false)
      setPassword('')
      if (pendingCallback) {
        pendingCallback()
        setPendingCallback(null)
      }
    } else {
      setError(true)
      // Shake animation will trigger via key change
    }
  }

  const handleClose = () => {
    setShowModal(false)
    setPassword('')
    setError(false)
    setPendingCallback(null)
  }

  return (
    <DownloadGuardContext.Provider value={{ guardDownload }}>
      {children}

      {/* Password Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={handleClose}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
              style={{
                backgroundColor: 'var(--bg-panel)',
                border: '1px solid var(--border-primary)',
              }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--bg-tertiary)]"
                style={{ color: 'var(--text-tertiary)' }}
              >
                <X size={16} />
              </button>

              <div className="p-8 pt-10">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 20 }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent), var(--color-kinetic-dark))',
                      boxShadow: '0 8px 32px rgba(233, 93, 44, 0.3)',
                    }}
                  >
                    <Lock size={24} color="#FFFFFF" />
                  </motion.div>
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-bold text-center tracking-tight mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Download Protected
                </h3>
                <p
                  className="text-xs text-center mb-6"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  Enter the access password to download brand assets.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <motion.div
                    animate={error ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="relative mb-4">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(false) }}
                        placeholder="Enter password"
                        autoFocus
                        className="w-full px-4 py-3 pr-12 rounded-xl text-sm font-medium outline-none transition-all duration-200"
                        style={{
                          backgroundColor: 'var(--bg-tertiary)',
                          color: 'var(--text-primary)',
                          border: error ? '2px solid #ef4444' : '2px solid var(--border-secondary)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md flex items-center justify-center transition-colors hover:bg-[var(--bg-secondary)]"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </motion.div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs font-semibold mb-4 text-center"
                      style={{ color: '#ef4444' }}
                    >
                      Incorrect password. Please try again.
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent), var(--color-kinetic-dark))',
                      color: '#FFFFFF',
                      boxShadow: '0 4px 16px rgba(233, 93, 44, 0.3)',
                    }}
                  >
                    Unlock Downloads
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DownloadGuardContext.Provider>
  )
}

export function useDownloadGuard() {
  const context = useContext(DownloadGuardContext)
  if (!context) {
    throw new Error('useDownloadGuard must be used within a DownloadGuardProvider')
  }
  return context
}
