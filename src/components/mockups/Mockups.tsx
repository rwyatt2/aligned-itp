import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionWrapper from '../layout/SectionWrapper'

interface MockupImage {
  id: string
  src: string
  alt: string
  label: string
}

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

const MOCKUPS: MockupImage[] = [
  {
    id: 'sticker-badge',
    src: `${base}/images/mockups/Stickers.png`,
    alt: 'Aligned Technology Partners sticker mockup on crumpled black surface',
    label: 'Sticker / Badge',
  },
  {
    id: 'circle-sticker',
    src: `${base}/images/mockups/Stickers-1.png`,
    alt: 'Aligned Technology Partners circular sticker with logomark on black background',
    label: 'Circle Sticker',
  },
  {
    id: 'business-cards-1',
    src: `${base}/images/mockups/Qubus. Business Cards.png`,
    alt: 'Aligned Technology Partners business cards on concrete blocks — logo version',
    label: 'Business Cards — Logo',
  },
  {
    id: 'business-cards-2',
    src: `${base}/images/mockups/Qubus. Business Cards-1.png`,
    alt: 'Aligned Technology Partners business cards on concrete blocks — name version',
    label: 'Business Cards — Name',
  },
  {
    id: 'sign-square',
    src: `${base}/images/mockups/Lightbox Sign Mockup.png`,
    alt: 'Aligned Technology Partners illuminated square wall sign',
    label: 'Wall Sign — Square',
  },
  {
    id: 'sign-horizontal',
    src: `${base}/images/mockups/Lightbox Sign Mockup-1.png`,
    alt: 'Aligned Technology Partners illuminated horizontal wall sign',
    label: 'Wall Sign — Horizontal',
  },
  {
    id: 'polo-wordmark',
    src: `${base}/images/mockups/T-Shirt.png`,
    alt: 'Black polo shirt with Aligned Technology Partners logo and wordmark on chest',
    label: 'Polo — Wordmark',
  },
  {
    id: 'polo-logomark',
    src: `${base}/images/mockups/T-Shirt-1.png`,
    alt: 'Black polo shirt with Aligned Technology Partners logomark on chest',
    label: 'Polo — Logomark',
  },
]

export default function Mockups() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const lightboxPrev = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + MOCKUPS.length) % MOCKUPS.length)
  }, [])

  const lightboxNext = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % MOCKUPS.length)
  }, [])

  const active = MOCKUPS[activeIndex]

  return (
    <SectionWrapper
      id="mockups"
      kicker="05 — Mockups"
      title="Brand in the Real World"
      subtitle="See how the Aligned Technology Partners identity translates across physical and digital touchpoints — from business cards and signage to branded collateral."
    >
      {/* ── Featured View ── */}
      <div className="flex flex-col gap-6 md:gap-8">
        <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '16 / 9', background: 'var(--bg-secondary)', border: '1px solid var(--border-secondary)' }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={active.id}
              src={active.src}
              alt={active.alt}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-contain"
              draggable={false}
            />
          </AnimatePresence>

          {/* Label + Zoom button overlay */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 md:p-7 z-10"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)' }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={active.id + '-label'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-sm font-bold tracking-widest uppercase text-white/80"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {active.label}
              </motion.span>
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openLightbox(activeIndex)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wide uppercase transition-all"
              style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
              }}
              aria-label="View full size"
            >
              <ZoomIn size={14} />
              <span className="hidden sm:inline">View Full Size</span>
            </motion.button>
          </div>
        </div>

        {/* ── Thumbnail Strip ── */}
        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {MOCKUPS.map((mockup, i) => (
            <motion.button
              key={mockup.id}
              onClick={() => setActiveIndex(i)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative shrink-0 rounded-xl overflow-hidden transition-all duration-300 focus:outline-none"
              style={{
                width: 120,
                aspectRatio: '4 / 3',
                border: i === activeIndex
                  ? '2px solid var(--accent)'
                  : '2px solid var(--border-secondary)',
                boxShadow: i === activeIndex
                  ? '0 0 20px -4px color-mix(in srgb, var(--accent) 50%, transparent)'
                  : 'none',
                background: 'var(--bg-secondary)',
              }}
              aria-label={`Select: ${mockup.label}`}
              aria-pressed={i === activeIndex}
            >
              <img
                src={mockup.src}
                alt={mockup.alt}
                className="w-full h-full object-contain"
                draggable={false}
              />
              {/* Active indicator */}
              {i === activeIndex && (
                <motion.div
                  layoutId="thumb-active"
                  className="absolute inset-0 rounded-[10px]"
                  style={{ background: 'color-mix(in srgb, var(--accent) 10%, transparent)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}

        </div>

        {/* ── Nav dots (mobile) ── */}
        <div className="flex md:hidden justify-center gap-2 mt-1">
          {MOCKUPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 20 : 6,
                height: 6,
                background: i === activeIndex ? 'var(--accent)' : 'var(--border-primary)',
              }}
              aria-label={`Go to mockup ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}
              aria-label="Close lightbox"
            >
              <X size={20} />
            </motion.button>

            {/* Prev */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => { e.stopPropagation(); lightboxPrev() }}
              className="absolute left-4 md:left-8 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </motion.button>

            {/* Next */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => { e.stopPropagation(); lightboxNext() }}
              className="absolute right-4 md:right-8 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </motion.button>

            {/* Main Image */}
            <motion.div
              className="flex items-center justify-center w-full h-full px-16 md:px-24"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={MOCKUPS[lightboxIndex].id + '-lightbox'}
                  src={MOCKUPS[lightboxIndex].src}
                  alt={MOCKUPS[lightboxIndex].alt}
                  initial={{ opacity: 0, scale: 0.94, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-full max-h-[80vh] object-contain rounded-xl"
                  style={{ boxShadow: '0 40px 120px rgba(0,0,0,0.6)' }}
                  draggable={false}
                />
              </AnimatePresence>
            </motion.div>

            {/* Bottom label + thumbnails */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.15 }}
              className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-4 px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <span
                className="text-xs font-bold uppercase tracking-widest text-white/60"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {MOCKUPS[lightboxIndex].label} — {lightboxIndex + 1} / {MOCKUPS.length}
              </span>

              <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                {MOCKUPS.map((m, i) => (
                  <button
                    key={m.id}
                    onClick={() => setLightboxIndex(i)}
                    className="shrink-0 rounded-lg overflow-hidden transition-all duration-300"
                    style={{
                      width: 56,
                      height: 40,
                      border: i === lightboxIndex
                        ? '2px solid var(--accent)'
                        : '2px solid rgba(255,255,255,0.15)',
                      opacity: i === lightboxIndex ? 1 : 0.5,
                      background: 'rgba(255,255,255,0.05)',
                    }}
                    aria-label={`Jump to ${m.label}`}
                  >
                    <img src={m.src} alt={m.alt} className="w-full h-full object-contain" draggable={false} />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}
