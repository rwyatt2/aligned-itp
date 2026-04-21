
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
import { ArrowRight, Shield, Zap, TrendingUp } from 'lucide-react'
import SectionWrapper from '../layout/SectionWrapper'
import BrandVisualElements from './BrandVisualElements'

const UNION_PATH = "M1088.98 745.654L1121 691.207C977.139 471.994 832.804 233.21 732.232 0H680.76C578.646 226.567 453.642 445.423 309.9 648.147C284.164 648.859 258.428 649.926 232.692 651.35C376.197 452.659 500.014 223.008 608.77 0H545.557C434.548 225.974 306.342 455.032 160.583 655.858C134.136 657.518 107.451 660.009 81.1219 662.263C227.355 460.132 354.256 227.041 464.79 0H401.696C286.654 234.633 151.57 471.52 0 680.056L26.2104 724.539C274.201 698.561 525.869 695.833 773.86 721.218C787.736 743.756 801.968 766.057 816.437 788.239C586.236 760.6 311.679 772.225 62.3832 785.985L94.8794 841.025C348.682 827.621 621.697 818.369 857.473 849.803L899.694 911.842C665.342 882.068 388.531 889.897 131.527 903.302L164.023 958.461C429.092 945.768 709.935 941.735 954.724 974L980.816 929.636C837.311 726.674 706.258 509.597 604.145 283.268C615.767 261.679 627.271 239.971 638.42 218.145C715.628 403.906 885.936 664.398 1016.75 868.427L1049.13 813.387C914.044 603.19 749.191 348.628 671.628 151.717C682.064 130.483 696.178 100.354 706.496 78.7646C804.103 302.603 950.099 534.626 1088.98 745.654ZM737.213 660.721C618.614 650.045 499.184 645.419 379.873 646.724C447.238 548.98 512.112 448.389 570.225 344.714C620.63 452.422 676.371 558.232 737.213 660.721Z";

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
                    
                    <g transform="translate(18, 22) scale(0.024)">
                      <path d={UNION_PATH} fill="rgba(255, 255, 255, 0.15)" />
                    </g>
                    <g transform="translate(82, 86) scale(0.024)">
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
                    
                    <g transform="translate(18, 22) scale(0.024)">
                      <path d={UNION_PATH} fill="#023661" opacity="0.12" />
                    </g>
                    <g transform="translate(82, 86) scale(0.024)">
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
