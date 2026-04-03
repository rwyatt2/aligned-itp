import SectionWrapper from '../layout/SectionWrapper'
import ColorSwatch from './ColorSwatch'
import GradientSwatch from './GradientSwatch'
import { brandColors, brandGradients } from '../../lib/colors'

export default function ColorPalette() {
  return (
    <SectionWrapper
      id="color-palette"
      kicker="02 — Color Palette"
      title="Engineered for Impact"
      subtitle="Eight meticulously selected colors. Engineered to communicate trust, clarity, sophistication, and momentum. Click any flex value to copy."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {brandColors.map((color, i) => (
          <ColorSwatch key={color.slug} color={color} index={i} />
        ))}
      </div>

      <div className="mt-16">
        <h3 className="text-xl font-bold mb-6 tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Brand Gradients
        </h3>
        <p className="text-sm mb-8 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          Gradients build dimensional depth and highlight active states. Always use the predefined CSS variables or these exact hex combinations. 
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandGradients.map((gradient, i) => (
            <GradientSwatch key={gradient.slug} gradient={gradient} index={i} />
          ))}
        </div>
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
                     border: ['#FFFFFF', '#F8F9FA'].includes(color.hex) ? '1px solid var(--border-secondary)' : 'none',
                   }}
              />
              <span className="text-xs font-medium w-36 flex-shrink-0" style={{ color: 'var(--text-secondary)' }}>
                {color.name}
              </span>
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${color.ratio}%`, backgroundColor: ['#FFFFFF', '#F8F9FA'].includes(color.hex) ? 'var(--border-primary)' : color.hex }}
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
