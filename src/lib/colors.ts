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

