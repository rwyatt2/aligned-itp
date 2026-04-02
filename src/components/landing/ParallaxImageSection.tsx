import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function SchematicOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [squares, setSquares] = useState<{x: number, y: number, color: string, opacity: number, delay: number}[]>([]);

  useEffect(() => {
    const generateSquares = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const gridSize = 40;
      const cols = Math.floor(width / gridSize);
      const rows = Math.floor(height / gridSize);
      
      const colors = [
        'var(--accent)', 
        'var(--color-industrial-light)', 
        'var(--text-tertiary)', 
        'var(--bg-elevated)',
        'var(--color-industrial)'
      ];
      
      const newSquares = [];
      const used = new Set();
      
      // Request requested mostly edges, avoiding center faces area
      for (let i = 0; i < 80; i++) {
        const x = Math.floor(Math.random() * cols);
        const y = Math.floor(Math.random() * rows);
        
        const xP = x / cols;
        const yP = y / rows;
        
        // Danger zone where people are located prominently (roughly 25% -> 75% wide, 15% -> 85% high)
        const isSafe = (xP < 0.25 || xP > 0.75) || (yP < 0.15 || yP > 0.85);
        const key = `${x},${y}`;
        
        if (isSafe && !used.has(key)) {
           used.add(key);
           newSquares.push({
             x,
             y,
             color: colors[Math.floor(Math.random() * colors.length)],
             opacity: 0.2 + (Math.random() * 0.45),
             delay: 0.1 + (Math.random() * 0.5)
           });
        }
      }
      setSquares(newSquares);
    };

    generateSquares();
    
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
       clearTimeout(timeoutId);
       timeoutId = setTimeout(generateSquares, 200);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-20 pointer-events-none"
    >
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--text-primary) 1px, transparent 1px),
            linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {squares.map((sq, i) => (
         <motion.div
           key={i}
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: sq.opacity, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: sq.delay }}
           className="absolute"
           style={{
             left: sq.x * 40,
             top: sq.y * 40,
             width: 40,
             height: 40,
             backgroundColor: sq.color,
           }}
         />
      ))}
    </div>
  )
}

export default function ParallaxImageSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Move the image slightly slower than the scroll to create parallax
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[60vh] lg:h-[70vh] overflow-hidden border-y border-[var(--border-secondary)]"
    >
      {/* The Parallax Image */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/parallax-break-new.png`} 
          alt="Diverse team of IT consultants collaborating" 
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* The Tech Schematic Grid Overlay */}
      <SchematicOverlay />

    </section>
  )
}
