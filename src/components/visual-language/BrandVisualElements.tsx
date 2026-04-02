import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Element 1: Quantum Vector Field
const QuantumVectorField = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rectDims, setRectDims] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setRectDims({ width: rect.width, height: rect.height });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const rows = 12;
  const cols = 20;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[400px] bg-[var(--bg-secondary)] overflow-hidden rounded-2xl flex items-center justify-center p-8 border border-[var(--border-secondary)]"
    >
      <div className="absolute top-4 left-4 text-xs font-mono font-bold uppercase tracking-widest text-[var(--accent)] z-10">
        01 / Quantum Vector Field
      </div>
      <div 
        className="grid gap-2 w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
        }}
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
            <motion.div
              key={i}
              className="flex items-center justify-center w-full h-full"
            >
              <motion.div
                animate={{ rotate: angle, scale: scale * 0.8 }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                className="w-4 h-[2px] bg-[var(--text-secondary)] opacity-40 origin-center"
                style={{
                   boxShadow: scale > 1.2 ? '0 0 8px var(--accent-glow)' : 'none',
                   backgroundColor: scale > 1.5 ? 'var(--accent)' : 'var(--text-secondary)'
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Element 2: Data Barcode Matrix
const DataBarcodeMatrix = () => {
  return (
    <div className="relative w-full h-[400px] bg-void overflow-hidden rounded-2xl border border-[var(--border-secondary)] p-8 flex flex-col justify-between">
      <div className="absolute top-4 left-4 text-xs font-mono font-bold uppercase tracking-widest text-[var(--accent)] z-10">
        02 / Data Barcode Matrix
      </div>
      
      <div className="flex-1 flex flex-col justify-center gap-4 py-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-full flex h-8 gap-[2px] items-end">
            {[...Array(40)].map((_, j) => {
              // Generate pseudo-random widths and opacities based on indices
              const isAccent = (i * j) % 17 === 0;
              const widthClass = ['w-1', 'w-2', 'w-3', 'w-4'][((i * 13) + j) % 4];
              const heightClass = ['h-full', 'h-4/5', 'h-3/5', 'h-1/2', 'h-2/5'][((i * 7) + j) % 5];
              const opacityClass = ['opacity-20', 'opacity-40', 'opacity-60', 'opacity-80', 'opacity-100'][((i * 11) + j) % 5];
              
              return (
                <motion.div
                  key={j}
                  className={`${widthClass} ${heightClass} ${isAccent ? 'bg-[var(--accent)]' : 'bg-[var(--text-secondary)]'} ${opacityClass}`}
                  animate={{ 
                    height: ['40%', '100%', '60%', '100%'][j % 4],
                    opacity: [0.3, 1, 0.5, 0.8][(j + i) % 4]
                  }}
                  transition={{ 
                    duration: 3 + (j % 3), 
                    repeat: Infinity, 
                    repeatType: 'reverse',
                    ease: "easeInOut",
                    delay: j * 0.05
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// Element 3: Tech Schematic Overlay
const TechSchematicOverlay = () => {
  return (
    <div className="relative w-full h-[400px] bg-[var(--bg-primary)] overflow-hidden rounded-2xl border border-[var(--border-secondary)] flex items-center justify-center p-8">
      <div className="absolute top-4 left-4 text-xs font-mono font-bold uppercase tracking-widest text-[var(--accent)] z-10">
        03 / Tech Schematic Overlay
      </div>
      
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      <div className="relative w-[300px] h-[300px]">
        {/* Rotating Radar Rings */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-dashed border-[var(--text-secondary)] rounded-full opacity-30"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border border-[var(--text-tertiary)] rounded-full opacity-20 border-t-[var(--accent)] border-t-2"
        />
        
        {/* Center Crosshair */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 relative flex items-center justify-center">
            <div className="absolute w-full h-px bg-[var(--accent)]" />
            <div className="absolute h-full w-px bg-[var(--accent)]" />
            <div className="w-2 h-2 bg-white rounded-full z-10" />
          </div>
        </div>

        {/* Floating Data Points */}
        <div className="absolute top-1/4 -left-12 flex items-center gap-2 text-xs font-mono text-[var(--text-primary)]">
          <div className="w-2 h-2 bg-[var(--text-primary)] rounded-full" />
          <motion.div 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            SYS.OP.01 / 89.2%
          </motion.div>
        </div>
        
        <div className="absolute bottom-1/4 -right-8 flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
          <div>NODE ALPHA</div>
          <div className="w-16 h-px bg-[var(--text-secondary)] opacity-50" />
        </div>

        {/* Hexagon/Cube Isometric frame */}
        <svg className="absolute inset-0 w-full h-full opacity-40 drop-shadow-md" viewBox="0 0 100 100">
           <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="var(--text-secondary)" strokeWidth="0.5" />
           <line x1="50" y1="5" x2="50" y2="50" stroke="var(--text-secondary)" strokeWidth="0.5" />
           <line x1="95" y1="27.5" x2="50" y2="50" stroke="var(--text-secondary)" strokeWidth="0.5" />
           <line x1="5" y1="27.5" x2="50" y2="50" stroke="var(--text-secondary)" strokeWidth="0.5" />
        </svg>

      </div>
    </div>
  );
};

export default function BrandVisualElements() {
  return (
    <div className="flex flex-col gap-12 w-full mt-12 pt-12 border-t border-[var(--border-secondary)]">
      <div className="flex flex-col gap-4 mb-4">
        <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Atmospheric Elements
        </h3>
        <p className="text-sm font-medium leading-relaxed max-w-2xl" style={{ color: 'var(--text-tertiary)' }}>
          Beyond the signature pattern, these architectural elements serve as ambient backgrounds and 
          structural focal points, adding depth, motion, and a premium technical feel.
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <QuantumVectorField />
        <DataBarcodeMatrix />
      </div>
      
      <div className="w-full">
        <TechSchematicOverlay />
      </div>
    </div>
  );
}
