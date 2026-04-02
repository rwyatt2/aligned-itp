import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionWrapperProps {
  id: string
  children: ReactNode
  className?: string
  kicker?: string
  title?: string
  subtitle?: string
  fullHeight?: boolean
}

export default function SectionWrapper({
  id,
  children,
  className = '',
  kicker,
  title,
  subtitle,
  fullHeight = false,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id={id}
      ref={ref}
      className={`relative ${fullHeight ? 'min-h-screen' : 'py-24 md:py-32 lg:py-40 px-6 gap-y-32'} ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        {(kicker || title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 md:mb-28 lg:mb-32 max-w-3xl"
          >
            {kicker && (
              <span className="kicker mb-4 block">{kicker}</span>
            )}
            {title && (
              <h2
                className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
                style={{ color: 'var(--text-primary)', lineHeight: 1.1 }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}
