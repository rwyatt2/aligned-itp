import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import SectionWrapper from '../components/layout/SectionWrapper'
import AlignedLogo from '../components/hero/AlignedLogo'

/* ═══════════════════════════════════════════
   SVG Mark Components
   ═══════════════════════════════════════════ */

/* ── Alternative A SVG Mark ── */
function AlternativeALogo({ color = 'var(--accent)' }: { color?: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 208 181" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M137.617 1C139.982 1 141.825 3.04164 141.685 5.40296C141.557 7.57482 141.492 9.76369 141.492 11.9678C141.492 55.8207 167.241 93.6586 204.445 111.189C206.622 112.215 207.522 114.878 206.319 116.962L171.093 177.977C169.888 180.063 167.131 180.614 165.154 179.238C147.413 166.886 125.849 159.644 102.592 159.644C80.3626 159.644 59.6788 166.261 42.4018 177.633C40.4263 178.933 37.7379 178.358 36.5554 176.31L1.53851 115.658C0.357058 113.612 1.20149 110.998 3.31187 109.935C39.1247 91.8976 63.6929 54.8024 63.6929 11.9678C63.6929 9.76367 63.6274 7.5748 63.4988 5.40293C63.359 3.04163 65.2015 1 67.5669 1H137.617ZM127.295 90.6018C125.574 90.366 123.915 91.3013 123.165 92.8679C118.965 101.634 114.111 110.026 108.653 117.972C107.667 119.409 107.687 121.319 108.757 122.694C123.593 141.738 142.173 157.714 163.381 169.547C165.262 170.597 167.624 169.914 168.7 168.05L196.534 119.832C197.609 117.969 197.022 115.586 195.178 114.481C174.814 102.273 151.843 93.9649 127.295 90.6018ZM82.013 92.868C81.2624 91.3014 79.6035 90.3661 77.8824 90.602C54.3789 93.8235 32.3256 101.586 12.6169 112.956C10.7321 114.043 10.1166 116.456 11.2047 118.34L39.0634 166.586C40.1528 168.472 42.5545 169.144 44.4389 168.05C64.5492 156.379 82.2033 140.944 96.4202 122.694C97.4911 121.319 97.5108 119.409 96.5243 117.972C91.0669 110.026 86.2124 101.634 82.013 92.868ZM105.817 130.336C104.159 128.303 101.026 128.303 99.3679 130.336C95.423 135.173 91.242 139.809 86.8418 144.226C83.8345 147.245 86.9553 153.53 91.1968 153.119C94.9463 152.756 98.7477 152.57 102.592 152.57C106.436 152.57 110.236 152.756 113.984 153.119C118.226 153.53 121.346 147.247 118.34 144.227C113.941 139.809 109.761 135.173 105.817 130.336ZM102.592 88.917C99.7253 88.917 96.8739 88.985 94.0396 89.1182C91.2372 89.2499 89.5329 92.2019 90.8227 94.6934C93.4447 99.7579 96.302 104.681 99.376 109.451C100.892 111.804 104.292 111.804 105.808 109.45C108.88 104.681 111.735 99.7579 114.355 94.694C115.645 92.2022 113.94 89.25 111.138 89.1182C108.306 88.9851 105.457 88.917 102.592 88.917ZM70.1896 61.0233C69.0774 56.9074 62.06 56.4645 60.2901 60.3432C57.1472 67.2305 53.3538 73.7583 48.9888 79.849C46.5051 83.3146 50.3868 89.1682 54.5085 88.0774C60.453 86.5042 66.5132 85.2159 72.6738 84.2276C75.2686 83.8114 76.8397 81.092 75.905 78.636C73.7199 72.8949 71.8098 67.0187 70.1896 61.0233ZM144.888 60.3435C143.118 56.4648 136.1 56.9078 134.988 61.0237C133.368 67.0188 131.458 72.8948 129.273 78.6358C128.338 81.0919 129.909 83.8113 132.504 84.2275C138.666 85.2159 144.727 86.5046 150.672 88.0782C154.794 89.1691 158.675 83.3165 156.191 79.8512C151.825 73.7599 148.031 67.2314 144.888 60.3435ZM74.7291 8.03125C72.5534 8.03125 70.7651 9.79204 70.7651 11.9678C70.7651 36.0241 75.4824 58.9774 84.0311 79.9615C84.6866 81.5705 86.3256 82.5399 88.058 82.4064C92.8545 82.0369 97.7014 81.8447 102.592 81.8447C107.481 81.8447 112.326 82.0371 117.12 82.4065C118.852 82.5399 120.491 81.5706 121.147 79.9617C129.696 58.9771 134.419 36.025 134.419 11.9678C134.419 9.79204 132.631 8.03125 130.455 8.03125H74.7291Z"
        fill={color}
        stroke={color}
        strokeWidth={3}
      />
    </svg>
  )
}

/* ── Alternative B SVG Mark ── */
function AlternativeBLogo({ color = 'var(--accent)' }: { color?: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 191 168" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M121.053 0C126.683 0.000172261 131.046 4.86618 131.046 10.4961C131.046 49.1689 151.973 82.9533 183.119 101.146C189.342 104.78 192.068 112.729 188.465 118.97L163.995 161.354C160.389 167.598 152.137 169.208 145.88 165.624C130.539 156.838 112.766 151.814 93.8202 151.814C75.7642 151.815 58.7739 156.377 43.9384 164.411C37.7116 167.783 29.6693 166.104 26.1288 159.972L1.61024 117.503C-1.92707 111.376 0.633368 103.577 6.65613 99.8643C36.6208 81.3952 56.5954 48.2788 56.5956 10.4961C56.5957 4.86606 60.9587 0 66.5888 0H121.053ZM68.535 21.7354C66.7648 21.7354 65.386 23.2631 65.4891 25.0303C65.5814 26.6096 65.6278 28.2013 65.6278 29.8037C65.6277 61.2945 47.6401 88.5693 21.412 101.848C19.837 102.645 19.2064 104.597 20.0868 106.127L45.6971 150.641C46.5818 152.178 48.5997 152.61 50.0809 151.634C62.7346 143.293 77.8756 138.441 94.1464 138.44C111.169 138.44 126.955 143.752 139.95 152.812C141.432 153.846 143.502 153.432 144.403 151.866L170.168 107.088C171.065 105.529 170.392 103.54 168.766 102.771C141.519 89.8634 122.665 62.0432 122.665 29.8037C122.665 28.2013 122.712 26.6096 122.805 25.0303C122.908 23.2631 121.529 21.7354 119.759 21.7354H68.535Z"
        fill={color}
      />
    </svg>
  )
}

/* ── Alternative C SVG Mark ── */
function AlternativeCLogo({ color = 'var(--accent)' }: { color?: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 182 162" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M115.98 0.741211C121.424 0.741211 125.645 5.44693 125.645 10.8916C125.645 46.5033 143.992 77.8294 171.749 95.9339C179.812 101.193 183.488 111.799 178.675 120.137L160.016 152.454C155.2 160.797 144.169 162.911 135.583 158.542C121.79 151.524 106.179 147.567 89.6427 147.567C73.9159 147.567 59.025 151.146 45.7393 157.533C37.2135 161.632 26.4651 159.428 21.7353 151.235L2.89489 118.601C-1.83073 110.416 1.62401 100.011 9.42324 94.672C36.1218 76.3953 53.6407 45.6895 53.6407 10.8916C53.6407 5.44691 57.8601 0.741211 63.3048 0.741211H115.98Z"
        fill={color}
      />
      <path
        d="M125.645 10.8916L124.903 10.8916V10.8916H125.645ZM89.6427 147.567V146.826V146.826V147.567ZM53.6407 10.8916H54.382V10.8916L53.6407 10.8916ZM2.8949 118.601L2.25294 118.972L2.8949 118.601ZM9.42325 94.672L9.00453 94.0603L9.42325 94.672ZM160.016 152.454L159.374 152.083L160.016 152.454ZM135.583 158.542L135.247 159.203L135.583 158.542ZM178.675 120.137L179.317 120.507L178.675 120.137ZM45.7393 157.533L45.4182 156.865L45.7393 157.533ZM21.7354 151.235L21.0934 151.606L21.7354 151.235ZM125.645 10.8916H124.903C124.903 46.7642 143.386 78.3192 171.344 96.5548L171.749 95.9339L172.154 95.313C144.597 77.3396 126.386 46.2424 126.386 10.8916H125.645ZM178.675 120.137L178.033 119.766L159.374 152.083L160.016 152.454L160.658 152.825L179.317 120.507L178.675 120.137ZM135.583 158.542L135.919 157.881C122.025 150.812 106.298 146.826 89.6427 146.826V147.567L89.6427 148.309C106.059 148.309 121.556 152.237 135.247 159.203L135.583 158.542ZM89.6427 147.567V146.826C73.8024 146.826 58.8019 150.431 45.4182 156.865L45.7393 157.533L46.0605 158.201C59.2481 151.861 74.0295 148.309 89.6427 148.309V147.567ZM21.7354 151.235L22.3773 150.865L3.53685 118.23L2.8949 118.601L2.25294 118.972L21.0934 151.606L21.7354 151.235ZM9.42325 94.672L9.84196 95.2836C36.7337 76.8747 54.382 45.9444 54.382 10.8916H53.6407H52.8995C52.8995 45.4346 35.5099 75.9159 9.00453 94.0603L9.42325 94.672ZM63.3048 0.741211V1.48246H115.98V0.741211V-4.12464e-05H63.3048V0.741211ZM53.6407 10.8916L54.382 10.8916C54.3819 5.80822 58.3159 1.48246 63.3048 1.48246V0.741211V-4.12464e-05C57.4042 -4.12464e-05 52.8994 5.0856 52.8995 10.8916L53.6407 10.8916ZM2.8949 118.601L3.53685 118.23C-0.956341 110.448 2.29415 100.451 9.84196 95.2836L9.42325 94.672L9.00453 94.0603C0.953888 99.5714 -2.7051 110.384 2.25294 118.972L2.8949 118.601ZM160.016 152.454L159.374 152.083C154.795 160.015 144.23 162.11 135.919 157.881L135.583 158.542L135.247 159.203C144.108 163.711 155.604 161.578 160.658 152.825L160.016 152.454ZM171.749 95.9339L171.344 96.5548C179.149 101.646 182.609 111.839 178.033 119.766L178.675 120.137L179.317 120.507C184.367 111.759 180.475 100.741 172.154 95.313L171.749 95.9339ZM45.7393 157.533L45.4182 156.865C37.1671 160.832 26.8744 158.654 22.3773 150.865L21.7354 151.235L21.0934 151.606C26.0559 160.202 37.26 162.432 46.0605 158.201L45.7393 157.533ZM125.645 10.8916L126.386 10.8916C126.386 5.08553 121.88 -4.12464e-05 115.98 -4.12464e-05V0.741211V1.48246C120.969 1.48246 124.903 5.80833 124.903 10.8916L125.645 10.8916Z"
        fill={color}
      />
    </svg>
  )
}

/* ── Alternative D SVG Mark ── */
function AlternativeDLogo({ color = 'var(--accent)' }: { color?: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 213 210" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_alt_c" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="213" height="210">
        <path
          d="M106.359 209.487L36.9384 184.22L0.000236684 120.241L12.8287 47.4868L69.4213 2.73133e-06L143.298 9.18981e-06L199.89 47.4868L212.719 120.241L175.781 184.22L106.359 209.487Z"
          fill={color}
        />
      </mask>
      <g mask="url(#mask0_alt_c)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M102.117 -3.90247L85.7549 43.1268C75.7879 72.5346 59.6317 99.4422 38.3975 122.045C42.461 121.091 46.546 120.256 50.6475 119.539L66.4414 101.548C86.3963 78.8153 100.954 51.8653 109.025 22.7137L115.506 -0.690552H131.229L137.709 22.7137C145.781 51.8653 160.338 78.8153 180.293 101.548L209.747 135.102L198.046 146.187L168.032 112.31C147.548 88.975 132.324 61.5293 123.367 31.8387C122.255 35.5237 121.046 39.1737 119.743 42.786L127.152 64.6454C136.862 93.293 152.922 119.375 174.132 140.941L191.161 158.256L183.3 171.872L159.79 165.782C130.508 158.197 99.8907 157.329 70.2266 163.244L26.4395 171.975L20.5469 156.629L67.0361 147.245C97.4875 141.173 128.868 141.712 159.06 148.8C156.829 146.425 154.655 144.002 152.537 141.535L127.23 136.489C104.261 131.909 80.7204 131.396 57.6709 134.919L57.4736 135.102H56.4932C50.1718 136.107 43.8887 137.415 37.666 139.027L14.1572 145.117L6.2959 131.501L23.3242 114.186C44.5345 92.6205 60.5953 66.5382 70.3047 37.8905L84.6357 -4.39563L102.117 -3.90247ZM110.151 65.3094C101.789 82.2291 91.2291 98.0388 78.7012 112.31L74.8467 116.7C93.3996 115.574 112.078 116.833 130.42 120.49L137.548 121.911C126.672 105.854 117.964 88.3623 111.701 69.8827L110.151 65.3094Z"
          fill={color}
        />
      </g>
    </svg>
  )
}

/* ── Alternative E SVG Mark ── */
function AlternativeELogo({ color = 'var(--accent)' }: { color?: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 215 188" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M205.512 136.742L200.045 129.088C174.555 93.5076 152.414 55.3529 134.146 15.5808C115.877 55.3529 93.7357 93.5076 68.2461 129.088L62.7791 136.742L53.8726 130.364L59.3395 122.71C86.697 84.5327 110.137 43.3483 128.998 0.341684L129.157 0H139.18L139.316 0.341684C158.177 43.3483 181.617 84.5327 208.974 122.733L214.441 130.364L205.535 136.742H205.512Z" fill={color} />
      <path d="M35.2396 187.607L34.1689 176.719L43.5311 175.808C87.0845 171.525 131.185 171.434 174.783 175.489C149.476 139.772 127.517 101.526 109.431 61.6625L105.558 53.0976L115.535 48.5874L119.408 57.1523C138.815 99.954 162.756 140.819 190.569 178.678L190.774 178.951L185.74 187.63L185.398 187.585C138.702 182.414 91.3213 182.118 44.5789 186.719L35.2168 187.63L35.2396 187.607Z" fill={color} />
      <path d="M193.803 161.184L188.336 153.53C160.546 114.715 136.719 72.8698 117.562 29.157L117.425 28.8608L127.425 24.4189L127.562 24.7378C146.446 67.7901 169.885 108.952 197.22 147.152L202.687 154.783L193.78 161.161L193.803 161.184Z" fill={color} />
      <path d="M18.7923 165.535L17.7217 154.646L27.0838 153.735C74.578 149.066 122.733 149.362 170.181 154.624L170.523 154.669L169.316 165.535L168.974 165.489C122.277 160.318 74.8969 160.022 28.1544 164.624L18.7923 165.535Z" fill={color} />
      <path d="M155.535 142.87L146.173 141.959C99.4074 137.38 52.0271 137.653 5.35305 142.824L5.03415 142.87L0 134.191L0.205011 133.918C28.0181 96.0591 51.9816 55.1709 71.3665 12.392L75.2389 3.82709L85.2161 8.33732L81.3436 16.9022C63.2572 56.7654 41.2982 95.0112 15.9908 130.729C59.5897 126.674 103.69 126.765 147.243 131.048L156.605 131.959L155.535 142.847V142.87Z" fill={color} />
      <path d="M34.715 140.683L25.9224 134.168L26.1274 133.895C53.9405 96.0591 77.8812 55.1709 97.2888 12.392L101.184 3.82709L111.161 8.33732L107.266 16.9022C87.5622 60.3645 63.2343 101.913 34.9428 140.387L34.7378 140.683H34.715Z" fill={color} />
    </svg>
  )
}

/* ── Alternative F SVG Mark ── */
function AlternativeFLogo({ color = 'var(--accent)' }: { color?: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 213 184" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M130.341 135.653L79.124 46.9297L90.7048 26.869L141.922 115.592L130.341 135.653Z" fill={color} />
      <path d="M161.322 135.585L94.6279 20.0607L106.209 0L172.902 115.524L161.322 135.585Z" fill={color} />
      <path d="M105.412 95.2344L54.182 183.957H31.0205L82.2373 95.2344H105.412Z" fill={color} />
      <path d="M89.8553 68.4464L23.1615 183.971H0L66.6938 68.4464H89.8553Z" fill={color} />
      <path d="M82.8848 137.055H185.332L196.913 157.102H94.4655L82.8848 137.055Z" fill={color} />
      <path d="M67.4482 163.91H200.849L212.43 183.971H79.029L67.4482 163.91Z" fill={color} />
    </svg>
  )
}

/* ═══════════════════════════════════════════
   Logo Type — Text-based wordmark
   Renders "Aligned | Technology Partners"
   in Geist font matching the brand reference
   ═══════════════════════════════════════════ */

function LogoType() {
  return (
    <div className="flex items-center gap-3 select-none" style={{ fontFamily: 'var(--font-sans)' }}>
      <span
        className="text-[2.4rem] md:text-[3.2rem] leading-none tracking-[-0.02em]"
        style={{ color: 'var(--text-primary)', fontWeight: 400 }}
      >
        Aligned
      </span>
      <div
        className="w-[3px] self-stretch rounded-full"
        style={{ backgroundColor: 'var(--accent)', minHeight: '2.2rem' }}
      />
      <div className="flex flex-col leading-[1.15]">
        <span
          className="text-[1.1rem] md:text-[1.45rem] tracking-[-0.01em]"
          style={{ color: 'var(--text-primary)', fontWeight: 300 }}
        >
          Technology
        </span>
        <span
          className="text-[1.1rem] md:text-[1.45rem] tracking-[-0.01em]"
          style={{ color: 'var(--text-primary)', fontWeight: 300 }}
        >
          Partners
        </span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   View Toggle — Mark / Type / Combo
   ═══════════════════════════════════════════ */

type LogoView = 'mark' | 'type' | 'combo'

function ViewToggle({ active, onChange }: { active: LogoView; onChange: (v: LogoView) => void }) {
  const options: { value: LogoView; label: string }[] = [
    { value: 'mark', label: 'Mark' },
    { value: 'type', label: 'Type' },
    { value: 'combo', label: 'Combo' },
  ]

  return (
    <div
      className="inline-flex rounded-lg p-0.5 gap-0.5"
      style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-secondary)' }}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className="relative px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-colors duration-200"
          style={{
            fontFamily: 'var(--font-mono)',
            color: active === opt.value ? 'var(--text-primary)' : 'var(--text-tertiary)',
          }}
        >
          {active === opt.value && (
            <motion.div
              layoutId="view-toggle-bg"
              className="absolute inset-0 rounded-md"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-primary)',
                boxShadow: 'var(--shadow-sm)',
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
          <span className="relative z-10">{opt.label}</span>
        </button>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════
   Logo Card — Reusable card with view toggle
   ═══════════════════════════════════════════ */

interface LogoCardProps {
  id: string
  title: string
  subtitle: string
  description: string
  badge?: string
  markElement: React.ReactNode
  markSizeClass?: string
}

function LogoCard({ id, title, subtitle, description, badge, markElement, markSizeClass = 'w-32 md:w-44' }: LogoCardProps) {
  const [view, setView] = useState<LogoView>('mark')

  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl overflow-hidden glass-card relative group"
    >
      {/* Badge (e.g. "Current") */}
      {badge && (
        <div
          className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
          style={{
            background: 'linear-gradient(135deg, var(--accent), var(--color-kinetic-light))',
            color: '#fff',
            fontFamily: 'var(--font-mono)',
            boxShadow: '0 4px 20px rgba(255, 94, 32, 0.35)',
          }}
        >
          <Sparkles size={10} strokeWidth={3} />
          {badge}
        </div>
      )}

      {/* Logo display area */}
      <div
        className="aspect-[3/2] flex items-center justify-center p-8 md:p-12 relative overflow-hidden transition-colors duration-500"
        style={{ backgroundColor: badge ? 'var(--bg-tertiary)' : 'var(--bg-secondary)' }}
      >
        {badge && (
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 60%)' }}
          />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${id}-${view}`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex items-center justify-center"
          >
            {view === 'mark' && (
              <div className={`${markSizeClass} transform group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-bounce)]`}>
                {markElement}
              </div>
            )}
            {view === 'type' && (
              <div className="transform group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-bounce)]">
                <LogoType />
              </div>
            )}
            {view === 'combo' && (
              <div className="flex items-center gap-6 md:gap-8 transform group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-bounce)]">
                <div className="w-14 md:w-20 shrink-0">
                  {markElement}
                </div>
                <div className="flex items-center gap-3" style={{ fontFamily: 'var(--font-sans)' }}>
                  <span
                    className="text-[2rem] md:text-[2.8rem] leading-none tracking-[-0.02em]"
                    style={{ color: 'var(--text-primary)', fontWeight: 400 }}
                  >
                    Aligned
                  </span>
                  <div
                    className="w-[2.5px] self-stretch rounded-full"
                    style={{ backgroundColor: 'var(--accent)', minHeight: '2.2rem' }}
                  />
                  <div className="flex flex-col leading-[1.15]">
                    <span
                      className="text-[0.85rem] md:text-[1.2rem] tracking-[-0.01em]"
                      style={{ color: 'var(--text-primary)', fontWeight: 300 }}
                    >
                      Technology
                    </span>
                    <span
                      className="text-[0.85rem] md:text-[1.2rem] tracking-[-0.01em]"
                      style={{ color: 'var(--text-primary)', fontWeight: 300 }}
                    >
                      Partners
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Card footer */}
      <div className="p-6 border-t border-[var(--border-secondary)] bg-[var(--bg-panel)]">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                {subtitle}
              </p>
            )}
            <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
              {description}
            </p>
          </div>
        </div>
        <ViewToggle active={view} onChange={setView} />
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════
   Animation Variants
   ═══════════════════════════════════════════ */

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

/* ═══════════════════════════════════════════
   Logo data
   ═══════════════════════════════════════════ */

const logos: Omit<LogoCardProps, 'markElement'>[] = [
  {
    id: 'original',
    title: 'Original — The Aligned Mark',
    subtitle: '',
    description: 'The current logomark representing the convergence of people, process, and technology. This is the approved, production identity.',
    badge: 'Current',
  },
  {
    id: 'alt-a',
    title: 'Alternative A',
    subtitle: 'Precision Shield',
    description: 'A detailed shield form with intricate interior facets radiating from a central convergence point. Balances complexity with structural clarity.',
  },
  {
    id: 'alt-b',
    title: 'Alternative B',
    subtitle: 'Geometric Variant',
    description: 'A structural reinterpretation emphasizing angular precision and grid alignment. The rounded shield enclosure reinforces trust and containment.',
  },
  {
    id: 'alt-c',
    title: 'Alternative C',
    subtitle: 'Outline Form',
    description: 'The shield silhouette rendered as a clean outlined form. Emphasizes openness and transparency while retaining the core shape language.',
  },
  {
    id: 'alt-d',
    title: 'Alternative D',
    subtitle: 'Nonagon Weave',
    description: 'The convergence mark reimagined within a nine-sided polygon, with interlocking woven strands expressing structure and interconnection.',
    markSizeClass: 'w-36 md:w-48',
  },
  {
    id: 'alt-e',
    title: 'Alternative E',
    subtitle: 'Layered Convergence',
    description: 'Multiple chevron strands and horizontal bands converging into a unified form. Expresses momentum, layered complexity, and forward direction.',
    markSizeClass: 'w-36 md:w-48',
  },
  {
    id: 'alt-f',
    title: 'Alternative F',
    subtitle: 'Angular Prism',
    description: 'Bold angular shards and parallel bands forming an abstract "A" shape. A sharp, dynamic expression of alignment through geometric precision.',
    markSizeClass: 'w-36 md:w-48',
  },
]

const markComponents: Record<string, React.ReactNode> = {
  'original': <AlignedLogo animated={false} />,
  'alt-a': <AlternativeALogo />,
  'alt-b': <AlternativeBLogo />,
  'alt-c': <AlternativeCLogo />,
  'alt-d': <AlternativeDLogo />,
  'alt-e': <AlternativeELogo />,
  'alt-f': <AlternativeFLogo />,
}

/* ═══════════════════════════════════════════
   Page Component
   ═══════════════════════════════════════════ */

export default function LogoAlternatives() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div className="pt-28 md:pt-36 pb-20">
      <SectionWrapper
        id="logo-alternatives"
        kicker="Logo Exploration"
        title="Alternative Logo Concepts"
        subtitle="A curated set of directional concepts exploring different visual identities for Aligned Technology Partners. Toggle between the mark, logotype, and combination lockup for each option."
      >
        <div ref={ref}>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-8 max-w-2xl mx-auto"
          >
            {/* Original card */}
            <LogoCard
              {...logos[0]}
              markElement={markComponents[logos[0].id]}
            />

            {/* ── Divider ── */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--border-primary), transparent)' }} />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em] shrink-0"
                style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}
              >
                Alternatives
              </span>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--border-primary), transparent)' }} />
            </div>

            {/* Alternative cards */}
            {logos.slice(1).map((logo) => (
              <LogoCard
                key={logo.id}
                {...logo}
                markElement={markComponents[logo.id]}
              />
            ))}
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  )
}
