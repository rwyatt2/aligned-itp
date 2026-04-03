import { motion } from 'framer-motion'

export default function LeadCaptureSection() {
  return (
    <section id="lead-capture" className="py-16 md:py-24 px-4 md:px-8 w-full relative bg-[var(--bg-primary)]">
      <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-16">
        
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mb-6 inline-block">
              <span className="kicker">04 // The Next Step</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-6" style={{ color: 'var(--text-primary)', lineHeight: 1 }}>
              Ready to <br />
              <span className="text-gradient hover:opacity-90 transition-opacity pr-2">Align?</span>
            </h2>
            <p className="text-lg md:text-xl font-medium mb-10 max-w-md mx-auto md:mx-0 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Schedule a Strategy Call today to uncover operational friction and build a blueprint for scalable growth.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="w-full md:w-[450px]"
        >
          <div className="glass-panel p-6 md:p-10 rounded-2xl w-full flex flex-col gap-6 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-panel)] to-transparent rounded-2xl opacity-50" />
            
            <div className="relative z-10 font-mono text-[10px] uppercase tracking-widest font-bold pb-4 mb-2" style={{ color: 'var(--text-tertiary)', borderBottom: '1px solid var(--border-secondary)' }}>
              Client Information form
            </div>

            <form className="flex flex-col gap-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase font-bold tracking-widest pl-1" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
                <input 
                  type="text" 
                  placeholder="ex. John Doe" 
                  className="w-full rounded-xl px-4 py-3.5 outline-none transition-all text-sm font-medium bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-primary)] shadow-sm focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase font-bold tracking-widest pl-1" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
                <input 
                  type="email" 
                  placeholder="ex. john@company.com" 
                  className="w-full rounded-xl px-4 py-3.5 outline-none transition-all text-sm font-medium bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-primary)] shadow-sm focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase font-bold tracking-widest pl-1" style={{ color: 'var(--text-secondary)' }}>Company Size</label>
                <div className="relative">
                  <select 
                    className="w-full rounded-xl px-4 py-3.5 outline-none transition-all text-sm appearance-none cursor-pointer font-medium bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-primary)] shadow-sm focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10"
                  >
                      <option>1-10 Employees</option>
                      <option>11-50 Employees</option>
                      <option>51-200 Employees</option>
                      <option>200+ Employees</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-secondary)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>
              
              <button 
                className="w-full mt-2 font-bold py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:brightness-110 focus:ring-4 focus:ring-[var(--accent)]/30 outline-none active:translate-y-0 text-sm tracking-wide"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  boxShadow: 'var(--shadow-md)',
                  fontFamily: 'var(--font-sans)'
                }}
              >
                Schedule Strategy Call
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
