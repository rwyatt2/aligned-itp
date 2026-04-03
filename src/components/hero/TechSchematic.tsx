export default function TechSchematic() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none flex items-center justify-center z-0">
      
      {/* Schematic Background Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 dark:opacity-30">
        <defs>
          <pattern id="schematic-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[var(--text-tertiary)]" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#schematic-grid)" />
      </svg>
      
    </div>
  )
}
