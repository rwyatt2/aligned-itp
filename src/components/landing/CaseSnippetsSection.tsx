import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

const cases = [
  {
    title: 'Operational Friction',
    before: 'Relying on disconnected tools and recurring login issues. Employees lose time each day to avoidable technology problems.',
    after: 'Workflows optimized, friction reduced. Employees spend less time fighting systems and operations scale with ease.'
  },
  {
    title: 'Security & Risk',
    before: 'Quiet anxiety about security and compliance exposure with limited visibility into what is actually protected.',
    after: 'Strengthened foundation through active protection and discipline. Reduced exposure to completely avoidable risk.'
  },
  {
    title: 'Growth Strain',
    before: 'Systems and workflows have not kept pace with expansion. Technology is bottlenecking standard growth.',
    after: 'Infrastructure aligned with reality of operations. Leadership makes smarter decisions for future stages of scale.'
  }
]

export default function CaseSnippetsSection() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [rectDims, setRectDims] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDims = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setRectDims({ width: rect.width, height: rect.height });
      }
    };
    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  
  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  }

  const rows = 12;
  const cols = 24;

  return (
    <section 
      id="reality"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-16 md:py-24 px-4 md:px-8 w-full border-b border-t border-[var(--border-secondary)] overflow-hidden bg-[var(--bg-secondary)]"
    >
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-luminosity pointer-events-none">
        <div 
          className="grid gap-[2px] w-full h-full p-4"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: rows * cols }).map((_, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            let angle = 45;
            let scale = 1;
            
            if (rectDims.width > 0) {
              const cellX = (col / cols) * rectDims.width;
              const cellY = (row / rows) * rectDims.height;
              const dx = mousePos.x - cellX;
              const dy = mousePos.y - cellY;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const maxDist = 200;
              
              if (distance < maxDist) {
                 angle = Math.atan2(dy, dx) * (180 / Math.PI);
                 scale = 1 + (maxDist - distance) / maxDist;
              } else {
                 angle = (row * 10) + (col * 15);
              }
            }

            return (
              <div key={i} className="flex items-center justify-center w-full h-full">
                <motion.div
                  animate={{ rotate: angle, scale: scale * 0.8 }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                  className="w-4 h-[2px] opacity-40 origin-center"
                  style={{
                     backgroundColor: scale > 1.5 ? 'var(--accent)' : 'var(--text-tertiary)'
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10 pointer-events-none">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-16"
        >
            <div className="mb-6 inline-block">
              <span className="kicker">02 // The Reality</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gradient-cool" style={{ lineHeight: 1.1 }}>Beyond Reactive Break/Fix</h2>
            <p className="text-base md:text-xl font-medium max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>See how we solve fundamental business challenges rather than just resetting passwords.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full pointer-events-auto">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card p-8 rounded-2xl flex flex-col h-full bg-[var(--bg-elevated)]"
            >
              <h3 className="text-lg font-bold tracking-tight mb-8 pb-4" style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-secondary)' }}>
                {c.title}
              </h3>
              
              <div className="flex-1 flex flex-col gap-6">
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-widest mb-2 font-bold" style={{ color: 'var(--text-secondary)' }}>Before</div>
                  <p className="text-sm font-medium leading-relaxed pl-3" style={{ color: 'var(--text-tertiary)', borderLeft: '2px solid var(--border-primary)' }}>{c.before}</p>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-widest mb-2 font-bold" style={{ color: 'var(--accent)' }}>After</div>
                  <p className="text-sm font-medium leading-relaxed pl-3" style={{ color: 'var(--text-primary)', borderLeft: '2px solid var(--accent)' }}>{c.after}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
