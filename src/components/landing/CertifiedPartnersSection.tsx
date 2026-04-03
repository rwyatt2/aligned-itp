import { motion } from 'framer-motion'

const partners = [
  { name: 'Microsoft Solutions Partner', logo: 'microsoft.png' },
  { name: 'Dell Technologies', logo: 'dell.png' },
  { name: 'Datto Blue Diamond', logo: 'datto.png' },
  { name: 'Barracuda Essentials', logo: 'barracuda.png' },
  { name: 'AWS', logo: 'aws.png' },
  { name: 'SentinelOne', logo: 'sentinelone.png' },
  { name: 'Verkada', logo: 'verkada.png' },
  { name: 'ThreatLocker', logo: 'threatlocker.png' }
]

export default function CertifiedPartnersSection() {
  return (
    <section id="partners" className="py-16 md:py-24 relative overflow-hidden bg-transparent">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 antialiased">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <span className="kicker">03 // Certifications</span>
          <h2 className="text-4xl md:text-5xl tracking-tight font-medium text-[var(--text-primary)] mt-4 mb-6">
            Certified Partners
          </h2>
          <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl">
            We've partnered with globally recognized industry leaders to provide cutting-edge service and unmatched security.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pointer-events-auto">
          {partners.map((partner, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center justify-center p-4 md:p-6 glass-panel rounded-2xl hover:border-[var(--border-primary)] transition-colors duration-300 group"
            >
              {/* Removed the hard white background. Instead we rely on dark:invert to cleanly flip black text/logos to white, and white JPG backgrounds to black in dark mode. */}
              <div className="w-full h-24 flex items-center justify-center rounded-xl p-4 group-hover:scale-105 transition-transform duration-500 ease-out">
                 <img 
                   src={`${import.meta.env.BASE_URL}images/partners/${partner.logo}`}
                   alt={partner.name}
                   className="max-w-full max-h-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 dark:invert transition-all duration-500"
                 />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
