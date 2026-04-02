import SectionWrapper from '../layout/SectionWrapper'
import ColorSwatch from './ColorSwatch'
import { brandColors } from '../../lib/colors'

export default function ColorPalette() {
  return (
    <SectionWrapper
      id="color-palette"
      kicker="02 — Color Palette"
      title="Engineered for Impact"
      subtitle="Eight meticulously selected colors. Each chosen for its role in creating contrast, hierarchy, and emotional resonance. Click any value to copy."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {brandColors.map((color, i) => (
          <ColorSwatch key={color.slug} color={color} index={i} />
        ))}
      </div>

      {/* Usage Ratios Summary */}
      <div className="mt-12 rounded-2xl p-6 md:p-8" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-secondary)' }}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Recommended Usage Ratios
        </h3>
        <div className="flex flex-col gap-3">
          {brandColors.map((color) => (
            <div key={color.slug} className="flex items-center gap-4">
              <div className="w-4 h-4 rounded-sm flex-shrink-0"
                   style={{
                     backgroundColor: color.hex,
                     border: color.hex === '#FFFFFF' ? '1px solid var(--border-secondary)' : 'none',
                   }}
              />
              <span className="text-xs font-medium w-36 flex-shrink-0" style={{ color: 'var(--text-secondary)' }}>
                {color.name}
              </span>
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${color.ratio}%`, backgroundColor: color.hex === '#FFFFFF' ? 'var(--border-primary)' : color.hex }}
                />
              </div>
              <span className="text-xs font-mono w-8 text-right" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                {color.ratio}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
