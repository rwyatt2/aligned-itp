import { motion } from 'framer-motion'

const WinnerBadge = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Ribbons hanging down from the seal */}
    <path d="M7 11v11l5-2.5 5 2.5V11" fill="currentColor" opacity="0.85" />
    
    {/* Solid Award Seal */}
    <circle cx="12" cy="9" r="9" fill="currentColor" />
    
    {/* Subtle inner detail ring */}
    <circle cx="12" cy="9" r="7" fill="none" stroke="var(--bg-primary)" strokeWidth="0.5" opacity="0.5" />
    
    {/* Sharp Star Cutout */}
    <path 
      d="M12 4.5l1.18 2.52 2.76.36-2.02 1.88.5 2.74L12 10.66 9.58 12l.5-2.74-2.02-1.88 2.76-.36L12 4.5z" 
      fill="var(--bg-primary)" 
    />
  </svg>
)

const trustBadges = [
  {
    image: `${import.meta.env.BASE_URL}SSL.svg`,
    text: "4 Years Voted Best of Southlake Style",
    width: "h-12 md:h-16 w-auto"
  },
  {
    image: `${import.meta.env.BASE_URL}BBBsvg.svg`,
    text: "A+ Rating By The Better Business Bureau",
    width: "h-10 md:h-[3.25rem] w-auto"
  },
  {
    icon: WinnerBadge,
    text: "5-Star Rated Customer Support Center",
    width: "h-14 md:h-[4.25rem] w-auto max-w-[4rem] text-black dark:text-white"
  }
]

export default function TrustBanner() {
  return (
    <section className="w-full relative z-20 border-y border-[var(--surface-glass-border)] bg-[var(--bg-primary)]/40 backdrop-blur-md overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {trustBadges.map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`flex flex-col items-center justify-center text-center px-4 ${idx !== 0 ? 'pt-6 md:pt-0' : ''} opacity-60 hover:opacity-100 transition-opacity duration-300`}
            >
              <div className="mb-3 flex items-center justify-center h-10 md:h-12 w-full relative">
                {badge.image ? (
                  <img 
                    src={badge.image} 
                    alt={badge.text} 
                    className={`object-contain ${badge.width} brightness-0 dark:invert`} 
                  />
                ) : badge.icon ? (
                  <badge.icon className={badge.width} />
                ) : null}
              </div>
              <p className="text-xs font-sans tracking-wide text-[var(--text-secondary)] max-w-[220px] leading-snug font-medium">
                {badge.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
