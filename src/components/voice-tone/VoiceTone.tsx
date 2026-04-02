import { motion } from 'framer-motion'
import { BookOpen, Compass, Crown } from 'lucide-react'
import SectionWrapper from '../layout/SectionWrapper'

const archetypes = [
  {
    icon: BookOpen,
    name: 'The Sage',
    role: 'Understanding',
    description: 'We seek truth, clarity, understanding, and wise decision-making. We approach business and technology with insight, perspective, strategic thinking, and a desire to replace confusion with clarity.',
    traits: ['Thoughtful', 'Informed', 'Disciplined', 'Grounded'],
    color: 'var(--color-industrial)',
  },
  {
    icon: Compass,
    name: 'The Guide',
    role: 'Confidence',
    description: 'We help others move from uncertainty to confidence. We are not a distant expert speaking down to clients, but a trusted partner helping them navigate complexity and move toward stronger outcomes.',
    traits: ['Trusted', 'Practical', 'Calm', 'Supportive'],
    color: 'var(--accent)',
  },
  {
    icon: Crown,
    name: 'The Ruler',
    role: 'Structure',
    description: 'We bring order, structure, stability, responsibility, and control. This gives our brand strength and authority. We reflect a commitment to discipline and reliable systems.',
    traits: ['Authoritative', 'Structured', 'Precise', 'Dependable'],
    color: 'var(--color-cool-gray)',
  },
]

const messagingPillars = [
  {
    pillar: 'Alignment',
    headline: 'Alignment that drives growth.',
    body: 'People, process, and technology must be aligned to serve the mission. Real progress happens when systems, workflows, and teams work together in ways that support how the organization actually operates.',
    mono: 'ALIGNMENT',
  },
  {
    pillar: 'Protection',
    headline: 'Protect what matters most.',
    body: 'Every strong business needs a secure and reliable foundation. We reduce risk, protect critical systems, and create trust in the infrastructure you depend on.',
    mono: 'PROTECTION',
  },
  {
    pillar: 'Optimization',
    headline: 'Optimize how you operate.',
    body: 'Technology should make the business work better. We focus on reducing friction, improving workflows, increasing efficiency, and helping you get more value from the systems you already rely on.',
    mono: 'OPTIMIZATION',
  },
  {
    pillar: 'Advancement',
    headline: 'Advance with confidence.',
    body: 'Technology should create momentum. We help clients make better decisions, strengthen operations, and use technology more intentionally to support growth.',
    mono: 'ADVANCEMENT',
  },
  {
    pillar: 'Partnership',
    headline: 'Strategic growth partnership.',
    body: 'The best outcomes come through long-term partnership, not transactional support. We work alongside leadership as a trusted advisor, helping clients navigate complexity.',
    mono: 'PARTNERSHIP',
  },
  {
    pillar: 'Business Outcomes',
    headline: 'Better-operating businesses.',
    body: 'We keep the conversation focused on outcomes, not tools. Our message is not about features or jargon—it is about efficiency, resilience, clarity, growth, and business performance.',
    mono: 'OUTCOMES',
  },
]

export default function VoiceTone() {
  return (
    <SectionWrapper
      id="voice-tone"
      kicker="05 — Voice & Tone"
      title="How We Speak"
      subtitle="Every word reflects our archetype blend: the wisdom of a Sage, the direction of a Guide, and the authority of a Ruler."
    >
      <div className="flex flex-col gap-32">
        
        {/* Archetype Cards */}
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          {archetypes.map((archetype, i) => (
            <motion.div
              key={archetype.name}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
              className="glass-card rounded-2xl overflow-hidden p-10 md:p-12 relative group flex flex-col min-h-full"
            >
              {/* Accent top line */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: archetype.color }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shrink-0 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110"
                style={{
                  backgroundColor: `color-mix(in srgb, ${archetype.color} 15%, transparent)`,
                  color: archetype.color,
                }}
              >
                <archetype.icon size={28} strokeWidth={2} />
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-6 flex-1">
                <div>
                  <h4 className="text-2xl font-bold mb-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    {archetype.name}
                  </h4>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: archetype.color, fontFamily: 'var(--font-mono)' }}>
                    {archetype.role}
                  </span>
                </div>

                <p className="text-base leading-relaxed font-medium flex-1" style={{ color: 'var(--text-tertiary)' }}>
                  {archetype.description}
                </p>

                {/* Traits */}
                <div className="flex flex-wrap gap-2.5 pt-4 mt-auto border-t border-[var(--border-secondary)]">
                  {archetype.traits.map((trait) => (
                    <span
                      key={trait}
                      className="text-[10px] px-3 py-1.5 rounded-md font-bold uppercase tracking-widest"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${archetype.color} 8%, transparent)`,
                        color: archetype.color,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Messaging Pillars */}
        <div>
          <h3 className="text-2xl font-bold mb-16 inline-flex" style={{ color: 'var(--text-primary)', borderBottom: '2px solid var(--accent)' }}>
            Core Messaging Pillars
          </h3>
          <div className="flex flex-col gap-0 border-y border-[var(--border-secondary)] divide-y divide-[var(--border-secondary)]">
            {messagingPillars.map((p, i) => (
              <motion.div
                key={p.pillar}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                className="group py-16 md:py-20 flex flex-col md:flex-row gap-8 md:gap-24 transition-colors hover:bg-[var(--bg-tertiary)] -mx-6 px-6 rounded-2xl"
              >
                {/* Pillar label */}
                <div className="md:w-40 flex-shrink-0 pt-2">
                  <span
                    className="text-xs font-bold tracking-[0.25em] uppercase px-4 py-2 rounded-md border opacity-70 group-hover:opacity-100 transition-opacity"
                    style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', borderColor: 'var(--accent)', backgroundColor: 'color-mix(in srgb, var(--accent) 5%, transparent)' }}
                  >
                    {p.mono}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col gap-6">
                  <h4 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-sm" style={{ color: 'var(--text-primary)', lineHeight: 1.1 }}>
                    {p.headline}
                  </h4>
                  <p className="text-lg leading-relaxed font-medium max-w-3xl" style={{ color: 'var(--text-tertiary)' }}>
                    {p.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tone Spectrum */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-2xl p-10 md:p-16 lg:p-24"
        >
          <h3 className="text-2xl font-bold mb-16" style={{ color: 'var(--text-primary)' }}>
            Tone Spectrum
          </h3>
          <div className="flex flex-col gap-16 md:gap-20">
            {[
              { left: 'Wise', right: 'Flashy', position: 20 },
              { left: 'Confident', right: 'Arrogant', position: 15 },
              { left: 'Structured', right: 'Rigid', position: 35 },
              { left: 'Strategic', right: 'Abstract', position: 25 },
            ].map((spectrum, i) => (
              <div key={i} className="group cursor-default">
                {/* Labels above the track with flex spacing */}
                <div className="flex justify-between items-end mb-6">
                  <span className="text-xs md:text-sm font-bold tracking-wider uppercase transition-colors" style={{ color: 'var(--text-primary)' }}>
                    {spectrum.left}
                  </span>
                  <span className="text-xs md:text-sm font-bold tracking-wider uppercase transition-colors" style={{ color: 'var(--text-tertiary)' }}>
                    {spectrum.right}
                  </span>
                </div>
                
                {/* Slim, elegant track */}
                <div className="h-0.5 rounded-full relative w-full" style={{ backgroundColor: 'var(--border-primary)' }}>
                  {/* Filled track portion */}
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{
                      width: `${spectrum.position}%`,
                      background: `linear-gradient(90deg, var(--color-kinetic-dark), var(--accent))`,
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${spectrum.position}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
                  />
                  
                  {/* Elegant indicator knob */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 bg-[var(--bg-primary)] shadow-sm"
                    style={{
                      left: `${spectrum.position}%`,
                      transform: 'translate(-50%, -50%)',
                      borderColor: 'var(--accent)',
                    }}
                    whileHover={{ scale: 1.4, backgroundColor: 'var(--accent)' }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                  >
                     <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: 'var(--accent)' }} />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 p-8 md:p-10 rounded-2xl relative overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent)]" />
            <p className="text-sm md:text-base italic leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
              "We lean technical because our audience is sophisticated. We lean authoritative because our clients trust our expertise. But we never sacrifice clarity for complexity — if a concept can be said simply, it must be."
            </p>
          </div>
        </motion.div>

        {/* Writing Examples */}
        <div>
          <h3 className="text-2xl font-bold mb-12" style={{ color: 'var(--text-primary)' }}>
            Writing Examples
          </h3>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            
            {/* On Brand Example */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-2xl p-10 md:p-14 relative"
            >
              {/* Badge */}
              <div className="inline-flex items-center justify-center px-4 py-2 rounded-md mb-12 border shadow-sm" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.2)' }}>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#22c55e] uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" /> On Brand
                </span>
              </div>
              
              <div className="flex flex-col gap-10">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>Headline</p>
                  <p className="text-3xl font-extrabold tracking-tight leading-tight" style={{ color: 'var(--text-primary)' }}>
                    Alignment that <span className="text-gradient">drives growth.</span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>Body Text</p>
                  <p className="text-base font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    We help organizations move from reactive, inefficient technology environments to aligned, secure, optimized, growth-enabled systems.
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>Call To Action</p>
                  <p className="text-base font-bold bg-[var(--bg-tertiary)] py-3 px-6 rounded-lg inline-flex items-center gap-3 transition-colors hover:bg-[var(--bg-secondary)]" style={{ color: 'var(--accent)' }}>
                    What business problem can we help you solve? <span className="text-xl leading-none">→</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Off Brand Example */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="glass-card rounded-2xl p-10 md:p-14 relative"
            >
              {/* Badge */}
              <div className="inline-flex items-center justify-center px-4 py-2 rounded-md mb-12 border shadow-sm" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#ef4444] uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" /> Off Brand
                </span>
              </div>
              
              <div className="flex flex-col gap-10 opacity-60">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>Headline</p>
                  <p className="text-3xl font-bold tracking-tight leading-tight" style={{ color: 'var(--text-primary)', textDecoration: 'line-through' }}>
                    We fix your IT issues fast.
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>Body Text</p>
                  <p className="text-base font-medium leading-relaxed" style={{ color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
                    Our dedicated IT help desk manages all your devices, vendors, and products. We operate a rapid break/fix model to keep systems online.
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>Call To Action</p>
                  <p className="text-base font-bold underline underline-offset-4" style={{ color: '#ef4444', textDecoration: 'line-through' }}>
                    Submit a support ticket
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </SectionWrapper>
  )
}
