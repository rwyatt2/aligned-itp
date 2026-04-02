
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
import { ArrowRight, Shield, Zap, TrendingUp } from 'lucide-react'
import SectionWrapper from '../layout/SectionWrapper'
import BrandVisualElements from './BrandVisualElements'

const UNION_PATH = "M37.8223 0.549805C37.732 1.45903 37.6856 2.3816 37.6855 3.31445L37.6904 3.85059C37.9043 15.0773 44.8151 24.666 54.5957 28.7871L55.1182 29.0068L44.3477 47.6611L43.8955 47.3184C39.4033 43.9073 33.8367 41.8389 27.791 41.7129L27.2041 41.707C21.2019 41.7071 15.648 43.6208 11.1172 46.8711L10.6689 47.1924L0.276367 29.1904L0 28.7129L0.501953 28.4854C9.92022 24.2093 16.5138 14.8042 16.7178 3.83789L16.7227 3.31445C16.7226 2.38127 16.6772 1.45867 16.5869 0.549805L16.5322 0H37.877L37.8223 0.549805ZM33.0967 23.9375C31.915 26.455 30.525 28.8549 28.9463 31.1143C32.85 36.213 37.8039 40.4631 43.4814 43.5508L51.127 30.3057C45.7502 27.0029 39.6406 24.7785 33.0967 23.9375ZM21.3086 23.9375C15.0278 24.7452 9.14764 26.8292 3.93066 29.916L11.5918 43.1826C16.9903 40.1287 21.7087 36.0122 25.459 31.1143C23.8804 28.8549 22.4902 26.455 21.3086 23.9375ZM27.2041 33.4551C25.5128 35.5907 23.6458 37.5805 21.625 39.4033C23.4341 39.0684 25.2989 38.8926 27.2041 38.8926L27.6895 38.8965C29.4253 38.9236 31.126 39.0971 32.7803 39.4033C30.7602 37.5806 28.8948 35.5903 27.2041 33.4551ZM26.2861 23.5684C25.6185 23.5817 24.9543 23.6098 24.2939 23.6514C25.1585 25.3906 26.132 27.0663 27.2031 28.6719C28.2736 27.0667 29.2461 25.3913 30.1104 23.6523C29.1492 23.5918 28.1801 23.5596 27.2041 23.5596L26.2861 23.5684ZM17.793 13.4873C16.5326 17.0417 14.6301 20.2903 12.2266 23.0977C14.7799 22.2713 17.4259 21.6516 20.1445 21.2559C19.153 18.7612 18.3629 16.165 17.793 13.4873ZM36.6113 13.4893C36.0414 16.1662 35.2521 18.7617 34.2607 21.2559C36.9795 21.6514 39.6254 22.2713 42.1787 23.0977C39.7757 20.2907 37.8716 17.0429 36.6113 13.4893ZM19.5371 3.31445L19.541 3.91016C19.618 9.93443 20.8635 15.676 23.0527 20.9238C24.421 20.8078 25.8056 20.7451 27.2041 20.7451L28.3438 20.7588C29.3551 20.7825 30.3586 20.8395 31.3535 20.9238C33.615 15.5031 34.8701 9.55609 34.8701 3.31445L34.8643 2.80469H19.5439C19.5416 2.97486 19.5371 3.14473 19.5371 3.31445Z";

function PatternCard({ dark, children }: { dark: boolean, children: React.ReactNode }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: dark ? 0 : 0.15 }}
      onMouseMove={handleMouseMove}
      className={`rounded-2xl min-h-[320px] relative overflow-hidden group shadow-${dark ? 'md' : 'sm'}`}
      style={{ backgroundColor: dark ? '#0A0C12' : '#FFFFFF', border: dark ? 'none' : '1px solid var(--border-secondary)' }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)'},
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </motion.div>
  )
}

export default function VisualLanguage() {
  return (
    <SectionWrapper
      id="visual-language"
      kicker="04 — Visual Language"
      title="Systems Made Visible"
      subtitle="The curved intersecting lines of the logo extend into every visual decision. Patterns, borders, and containers reflect adaptability and flow."
    >
      <div className="flex flex-col gap-24 lg:gap-32">
        {/* Background Pattern Demo */}
        <div>
          <h3 className="text-2xl font-bold mb-12" style={{ color: 'var(--text-primary)' }}>
            Signature Pattern
          </h3>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Dark pattern variant */}
            {/* Dark pattern variant */}
            <PatternCard dark={true}>
              <svg className="absolute inset-0 w-full h-full opacity-100 transition-opacity duration-700">
                <defs>
                  <pattern id="dots-dark" width="16" height="16" patternUnits="userSpaceOnUse">
                    <circle cx="8" cy="8" r="1" fill="rgba(255,255,255,0.12)" />
                  </pattern>
                  <pattern id="pattern-dark" width="128" height="128" patternUnits="userSpaceOnUse">
                    <path d="M0 64 L128 64 M64 0 L64 128" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    <path d="M62 64 L66 64 M64 62 L64 66" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                    <path d="M126 128 L130 128 M128 126 L128 130" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                    
                    <g transform="translate(18, 20) scale(0.5)">
                      <path d={UNION_PATH} fill="rgba(255, 255, 255, 0.15)" />
                    </g>
                    <g transform="translate(82, 84) scale(0.5)">
                      <path d={UNION_PATH} fill="rgba(255, 255, 255, 0.15)" />
                    </g>
                    
                    <circle cx="64" cy="64" r="2.5" fill="var(--accent)" opacity="0.9" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots-dark)" />
                <rect width="100%" height="100%" fill="url(#pattern-dark)" />
              </svg>
              <div className="absolute bottom-6 left-8 bg-[#0A0C12]/80 backdrop-blur-md px-4 py-2 rounded-md border border-white/5 z-20">
                <span className="text-xs font-bold tracking-widest text-white/50 uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
                  Dark Base — #0A0C12
                </span>
              </div>
            </PatternCard>

            {/* Light pattern variant */}
            {/* Light pattern variant */}
            <PatternCard dark={false}>
              <svg className="absolute inset-0 w-full h-full opacity-100 transition-opacity duration-700">
                <defs>
                  <pattern id="dots-light" width="16" height="16" patternUnits="userSpaceOnUse">
                    <circle cx="8" cy="8" r="1" fill="rgba(0,0,0,0.1)" />
                  </pattern>
                  <pattern id="pattern-light" width="128" height="128" patternUnits="userSpaceOnUse">
                    <path d="M0 64 L128 64 M64 0 L64 128" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                    <path d="M62 64 L66 64 M64 62 L64 66" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
                    <path d="M126 128 L130 128 M128 126 L128 130" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
                    
                    <g transform="translate(18, 20) scale(0.5)">
                      <path d={UNION_PATH} fill="#023661" opacity="0.12" />
                    </g>
                    <g transform="translate(82, 84) scale(0.5)">
                      <path d={UNION_PATH} fill="#023661" opacity="0.12" />
                    </g>
                    
                    <circle cx="64" cy="64" r="2.5" fill="var(--accent)" opacity="0.8" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots-light)" />
                <rect width="100%" height="100%" fill="url(#pattern-light)" />
              </svg>
              <div className="absolute bottom-6 left-8 bg-white/80 backdrop-blur-md px-4 py-2 rounded-md border border-black/5 z-20">
                <span className="text-xs font-bold tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'rgba(0,0,0,0.4)' }}>
                  Light Base — #FFFFFF
                </span>
              </div>
            </PatternCard>
          </div>
          
          <BrandVisualElements />
        </div>

        {/* Glassmorphism Cards */}
        <div>
          <h3 className="text-2xl font-bold mb-12" style={{ color: 'var(--text-primary)' }}>
            Glass Cards & Surfaces
          </h3>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              { icon: Shield, title: 'Protect', description: 'Secure every layer. From endpoints to the cloud, we build defense-in-depth architecture.', color: 'var(--color-industrial)' },
              { icon: Zap, title: 'Optimize', description: 'Eliminate friction. We streamline processes to remove bottlenecks and accelerate performance.', color: 'var(--accent)' },
              { icon: TrendingUp, title: 'Advance', description: 'Move forward deliberately. Strategic initiatives that create lasting competitive advantage.', color: 'var(--color-cool-gray)' },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card rounded-2xl p-10 cursor-pointer group flex flex-col gap-6"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: `color-mix(in srgb, ${card.color} 15%, transparent)`, color: card.color }}
                >
                  <card.icon size={26} strokeWidth={2} />
                </div>
                
                <div>
                  <h4 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                    {card.title}
                  </h4>
                  <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                    {card.description}
                  </p>
                </div>
                
                <span
                  className="mt-auto text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-300 group-hover:gap-4"
                  style={{ color: card.color }}
                >
                  Learn more <ArrowRight size={14} />
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Border Treatments */}
        <div>
          <h3 className="text-2xl font-bold mb-12" style={{ color: 'var(--text-primary)' }}>
            Border & Container Treatments
          </h3>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Standard border */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl p-10 min-h-[250px] flex flex-col justify-between"
              style={{ border: '1px solid var(--border-primary)', backgroundColor: 'var(--bg-secondary)' }}
            >
              <span className="text-sm font-bold tracking-widest uppercase" style={{ color: 'var(--text-primary)' }}>Standard Border</span>
              <p className="text-[11px] uppercase tracking-widest opacity-60 font-bold" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                1px solid / Industrial <br/> 15% (light) / 35% (dark)
              </p>
            </motion.div>

            {/* Accent border */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-2xl p-10 min-h-[250px] flex flex-col justify-between relative overflow-hidden"
              style={{ border: '1px solid var(--border-secondary)', backgroundColor: 'var(--bg-secondary)' }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{
                  background: 'linear-gradient(90deg, var(--accent) 0%, var(--color-kinetic-light) 100%)',
                }}
              />
              <span className="text-sm font-bold tracking-widest uppercase" style={{ color: 'var(--text-primary)' }}>Accent Border</span>
              <p className="text-[11px] uppercase tracking-widest opacity-60 font-bold" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                6px gradient top <br/> Kinetic → Kinetic Light
              </p>
            </motion.div>

            {/* Glow border */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl p-10 min-h-[250px] flex flex-col justify-between"
              style={{ 
                border: '1px solid color-mix(in srgb, var(--accent) 40%, transparent)', 
                backgroundColor: 'var(--bg-secondary)',
                boxShadow: '0 0 40px -10px color-mix(in srgb, var(--accent) 30%, transparent)' 
              }}
            >
              <span className="text-sm font-bold tracking-widest uppercase" style={{ color: 'var(--accent)' }}>Glow Border</span>
              <p className="text-[11px] uppercase tracking-widest opacity-60 font-bold" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                1px solid Kinetic <br/> + 40px box-shadow spread
              </p>
            </motion.div>
          </div>
        </div>

        {/* Button Styles */}
        <div className="pt-8 border-t border-[var(--border-secondary)]">
          <h3 className="text-2xl font-bold mb-10" style={{ color: 'var(--text-primary)' }}>
            Button System
          </h3>
          <div className="flex flex-wrap gap-8 items-center bg-[var(--bg-tertiary)] p-12 rounded-2xl border border-[var(--border-secondary)]">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg text-sm font-bold tracking-wide transition-all duration-300"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'white',
                boxShadow: '0 8px 20px -6px rgba(219, 82, 39, 0.4)',
              }}
            >
              Primary Action
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg text-sm font-bold tracking-wide transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-primary)',
              }}
            >
              Secondary Action
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, borderBottomColor: 'var(--accent)' }}
              whileTap={{ scale: 0.95 }}
              className="px-2 py-2 text-sm font-bold tracking-wide flex items-center gap-3 transition-all duration-300 border-b-2 border-transparent"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--accent)',
              }}
            >
              Text Link <ArrowRight size={16} strokeWidth={3} />
            </motion.button>
            
            <div className="w-full mt-4 flex flex-wrap gap-6 pt-6 border-t border-black/10 dark:border-white/5">
              {[
                'Primary: Kinetic Orange / White / Pill',
                'Secondary: Surface / Border / Pill',
                'Text: No BG / Accent / Animated Underline',
              ].map((spec) => (
                <span key={spec} className="text-[10px] uppercase font-bold tracking-[0.1em]" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  {spec}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </SectionWrapper>
  )
}
