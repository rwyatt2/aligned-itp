export interface ColorData {
  name: string
  slug: string
  hex: string
  rgb: string
  cmyk: string
  description: string
  usage: string
  ratio: number
}

export const brandColors: ColorData[] = [
  {
    name: 'Midnight Navy',
    slug: 'midnight',
    hex: '#1A2730',
    rgb: '26, 39, 48',
    cmyk: '46, 19, 0, 81',
    description: 'The foundational dark. Anchors every dark-mode surface and serves as the primary text color in light mode.',
    usage: 'Primary backgrounds, body text',
    ratio: 10,
  },
  {
    name: 'Graphite',
    slug: 'graphite',
    hex: '#424048',
    rgb: '66, 64, 72',
    cmyk: '8, 11, 0, 72',
    description: 'The neutral workhorse. UI panels, cards, and tertiary backgrounds.',
    usage: 'UI panels, card backgrounds',
    ratio: 5,
  },
  {
    name: 'Steel Blue',
    slug: 'steel-blue',
    hex: '#45586C',
    rgb: '69, 88, 108',
    cmyk: '36, 19, 0, 58',
    description: 'Structural depth. Borders, dividers, and secondary backgrounds.',
    usage: 'Structural borders, secondary surfaces',
    ratio: 3,
  },
  {
    name: 'Ice Blue',
    slug: 'ice-blue',
    hex: '#B0CEE2',
    rgb: '176, 206, 226',
    cmyk: '22, 9, 0, 11',
    description: 'The quiet partner. Subtle highlights, metallic accents, and cool background tints.',
    usage: 'Highlights, subtle tints',
    ratio: 2,
  },
  {
    name: 'Rust Orange',
    slug: 'rust-orange',
    hex: '#A63E1B',
    rgb: '166, 62, 27',
    cmyk: '0, 63, 84, 35',
    description: 'Deep energy. Hover states, active borders, and rich accents that ground the primary kinetic orange.',
    usage: 'Hover states, secondary accents',
    ratio: 5,
  },
  {
    name: 'Kinetic Orange',
    slug: 'kinetic',
    hex: '#E95D2C',
    rgb: '233, 93, 44',
    cmyk: '0, 60, 81, 9',
    description: 'The spark. Primary action color, CTA buttons, highlights, and accent marks. Must pop aggressively.',
    usage: 'CTAs, accents, highlights',
    ratio: 15,
  },
  {
    name: 'Abyss Black',
    slug: 'abyss',
    hex: '#090A0F',
    rgb: '9, 10, 15',
    cmyk: '40, 33, 0, 94',
    description: 'Deepest shadow. An industry best-practice off-black that avoids OLED smearing while maintaining ultra-high contrast.',
    usage: 'Ultimate contrast, deep shadows',
    ratio: 30,
  },
  {
    name: 'Arctic White',
    slug: 'arctic',
    hex: '#F8F9FA',
    rgb: '248, 249, 250',
    cmyk: '1, 0, 0, 2',
    description: 'Clean slate. An industry best-practice off-white that reduces eye strain compared to pure hex #FFFFFF.',
    usage: 'Primary light backgrounds',
    ratio: 30,
  },
]

export interface GradientData {
  name: string
  slug: string
  from: string
  to: string
  css: string
  description: string
  usage: string
}

export const brandGradients: GradientData[] = [
  {
    name: 'Kinetic Plasma',
    slug: 'kinetic-plasma',
    from: '#B0CEE2',
    to: '#E95D2C',
    css: 'radial-gradient(circle at -10% 20%, rgba(176, 206, 226, 0.85) 0%, rgba(176, 206, 226, 0) 65%), radial-gradient(circle at 110% 80%, rgba(233, 93, 44, 0.9) 0%, rgba(233, 93, 44, 0) 65%), radial-gradient(circle at 80% -10%, rgba(166, 62, 27, 0.7) 0%, rgba(166, 62, 27, 0) 55%), radial-gradient(circle at 20% 110%, rgba(69, 88, 108, 0.6) 0%, rgba(69, 88, 108, 0) 55%), #090A0F',
    description: 'An expansive, fluid four-point mesh. Perfectly maps Ice Blue and Steel Blue against Kinetic and Rust Orange in a beautiful organic collision over a pure Abyss dark mode base.',
    usage: 'Hero sections, high-impact fluid backgrounds',
  },
  {
    name: 'Gravity Well',
    slug: 'gravity-well',
    from: '#E95D2C',
    to: '#090A0F',
    css: 'radial-gradient(ellipse 180% 150% at 30% 130%, rgba(9, 10, 15, 1) 40%, transparent 65%), linear-gradient(160deg, rgba(233, 93, 44, 1) 0%, rgba(166, 62, 27, 1) 40%, rgba(26, 39, 48, 0.9) 80%, rgba(9, 10, 15, 1) 100%)',
    description: 'A massive gravitational sweep. An immensely soft negative-space eclipse perfectly carves an ascending void out of a blazing field of Kinetic Orange.',
    usage: 'Cinematic reveals, intense asymmetrical backdrops',
  },
  {
    name: 'Thermal Core',
    slug: 'thermal-core',
    from: '#E95D2C',
    to: '#424048',
    css: 'radial-gradient(ellipse 150% 150% at 15% 15%, rgba(233, 93, 44, 1) 0%, rgba(166, 62, 27, 0.8) 25%, transparent 60%), radial-gradient(ellipse 150% 150% at 85% 85%, rgba(66, 64, 72, 1) 0%, rgba(26, 39, 48, 1) 40%, transparent 70%), linear-gradient(135deg, transparent 40%, rgba(166, 62, 27, 0.8) 48%, rgba(66, 64, 72, 0.8) 52%, transparent 60%), #090A0F',
    description: 'Fuses Kinetic Orange heat against Midnight Navy and smoke Graphite. An organic collision of raw brand energy.',
    usage: 'Primary feature cards, brand focal points',
  },
  {
    name: 'Aurora Arc',
    slug: 'aurora-arc',
    from: '#090A0F',
    to: '#E95D2C',
    css: 'radial-gradient(ellipse 200% 100% at 50% 120%, rgba(9, 10, 15, 1) 48%, rgba(233, 93, 44, 1) 51%, rgba(166, 62, 27, 0.8) 55%, transparent 65%), radial-gradient(ellipse 200% 100% at 30% -20%, rgba(9, 10, 15, 1) 48%, rgba(176, 206, 226, 0.8) 51%, rgba(69, 88, 108, 0.8) 55%, transparent 65%), #090A0F',
    description: 'Stunning geometric sweeps. Employs deep ellipse cutouts to create razor-sharp floating ribbons of neon light over an Abyss base.',
    usage: 'Premium ambient footers, sweeping horizontal elements',
  },
  /*
  {
    name: 'Glacial Bleed',
    slug: 'glacial-bleed',
    from: '#F8F9FA',
    to: '#B0CEE2',
    css: 'radial-gradient(circle at 10% 10%, rgba(176, 206, 226, 0.45) 0%, transparent 60%), radial-gradient(circle at 90% 90%, rgba(69, 88, 108, 0.15) 0%, transparent 60%), radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.9) 0%, transparent 70%), radial-gradient(circle at 30% 80%, rgba(176, 206, 226, 0.25) 0%, transparent 60%), #F8F9FA',
    description: 'An expansive ambient light field. Massive, soft arcs of Ice Blue and faint Steel Blue diffuse elegantly across a pure Arctic White canvas.',
    usage: 'Primary light mode backgrounds, clean elegant surfaces',
  },
  {
    name: 'Prism Refraction',
    slug: 'prism-refraction',
    from: '#B0CEE2',
    to: '#E95D2C',
    css: 'radial-gradient(circle at 85% 15%, rgba(233, 93, 44, 0.35) 0%, transparent 55%), radial-gradient(circle at 15% 85%, rgba(176, 206, 226, 0.6) 0%, transparent 55%), radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.9) 0%, transparent 70%), radial-gradient(circle at 20% 20%, rgba(69, 88, 108, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(166, 62, 27, 0.1) 0%, transparent 50%), #F8F9FA',
    description: 'A delicate optical shear. A razor-thin structural refraction of Kinetic Orange and Ice Blue slicing through a stark, bright environment.',
    usage: 'Premium light panels, subtle architectural accents',
  },
  {
    name: 'Daylight Curve',
    slug: 'daylight-curve',
    from: '#F8F9FA',
    to: '#424048',
    css: 'radial-gradient(ellipse 150% 100% at 50% -20%, #FFFFFF 0%, rgba(255, 255, 255, 0.9) 30%, transparent 70%), radial-gradient(circle at 10% 90%, rgba(176, 206, 226, 0.4) 0%, transparent 60%), radial-gradient(circle at 90% 90%, rgba(66, 64, 72, 0.15) 0%, transparent 60%), radial-gradient(circle at 50% 120%, rgba(69, 88, 108, 0.2) 0%, transparent 70%), #F8F9FA',
    description: 'The light counterpart to Gravity Well. An immense, soft white arch sweeps over a faint, structured backdrop of Ice Blue and Graphite.',
    usage: 'Expansive structural headers, sophisticated white-space',
  }
  */
]

