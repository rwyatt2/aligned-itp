import { motion } from 'framer-motion'
import { Shield, Settings, TrendingUp } from 'lucide-react'
import frameworkAnchorImage from '../../assets/images/framework-anchor-people.png'

const pillars = [
  {
    title: 'Protect',
    icon: Shield,
    desc: 'Secure the foundation. Stop chaos, manage risk, and standardize the environment so leadership can focus on the mission.'
  },
  {
    title: 'Optimize',
    icon: Settings,
    desc: 'Remove friction. Fix the workflows and leverage tools so the business works effortlessly, regaining hours of lost productivity.'
  },
  {
    title: 'Advance',
    icon: TrendingUp,
    desc: 'Accelerate growth. Use technology to scale predictably, make critical decisions, and drive business success forward.'
  }
]

export default function FrameworkSection() {
  return (
    <section id="framework" className="py-16 md:py-24 px-4 md:px-8 w-full bg-[var(--bg-primary)] relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="text-center mb-16 md:mb-24"
        >
          <div className="mb-6 inline-block">
            <span className="kicker">01 // The Framework</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ color: 'var(--text-primary)', lineHeight: 1.1 }}>
            The Growth Alignment Framework
          </h2>
          <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Moving your organization from reactive operations toward aligned, optimized, and growth-enabled systems.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Side: Sticky Image Anchor */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:sticky lg:top-32 rounded-3xl overflow-hidden glass-card p-2 md:p-3 shadow-2xl relative"
          >
             <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden">
                <img 
                  src={frameworkAnchorImage} 
                  alt="Business executives discussing strategic technology framework" 
                  className="w-full h-full object-cover rounded-2xl scale-105 hover:scale-100 transition-transform duration-1000 ease-out" 
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top right, var(--bg-primary) -20%, transparent 50%)', opacity: 0.8 }} />
             </div>
          </motion.div>

          {/* Right Side: Pillars */}
          <div className="flex flex-col gap-6 md:gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass-card p-8 md:p-10 rounded-2xl flex flex-col group"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300" 
                  style={{ 
                    backgroundColor: 'var(--bg-tertiary)', 
                    color: 'var(--accent)',
                    border: '1px solid var(--border-secondary)'
                  }}
                >
                  <pillar.icon size={24} />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
                  {pillar.title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
