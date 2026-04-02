import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface AlignedLogoProps {
  className?: string
  size?: number
  animated?: boolean | 'scroll' | 'breathing' | 'draw' | 'converge'
  color?: string
}

export default function AlignedLogo({ className = '', size = 400, animated = true, color = 'var(--accent)' }: AlignedLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Fade in and scale based on scroll instead of path length
  const overallOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1])

  const pathD = "M37.8223 0.549805C37.732 1.45903 37.6856 2.3816 37.6855 3.31445L37.6904 3.85059C37.9043 15.0773 44.8151 24.666 54.5957 28.7871L55.1182 29.0068L44.3477 47.6611L43.8955 47.3184C39.4033 43.9073 33.8367 41.8389 27.791 41.7129L27.2041 41.707C21.2019 41.7071 15.648 43.6208 11.1172 46.8711L10.6689 47.1924L0.276367 29.1904L0 28.7129L0.501953 28.4854C9.92022 24.2093 16.5138 14.8042 16.7178 3.83789L16.7227 3.31445C16.7226 2.38127 16.6772 1.45867 16.5869 0.549805L16.5322 0H37.877L37.8223 0.549805ZM33.0967 23.9375C31.915 26.455 30.525 28.8549 28.9463 31.1143C32.85 36.213 37.8039 40.4631 43.4814 43.5508L51.127 30.3057C45.7502 27.0029 39.6406 24.7785 33.0967 23.9375ZM21.3086 23.9375C15.0278 24.7452 9.14764 26.8292 3.93066 29.916L11.5918 43.1826C16.9903 40.1287 21.7087 36.0122 25.459 31.1143C23.8804 28.8549 22.4902 26.455 21.3086 23.9375ZM27.2041 33.4551C25.5128 35.5907 23.6458 37.5805 21.625 39.4033C23.4341 39.0684 25.2989 38.8926 27.2041 38.8926L27.6895 38.8965C29.4253 38.9236 31.126 39.0971 32.7803 39.4033C30.7602 37.5806 28.8948 35.5903 27.2041 33.4551ZM26.2861 23.5684C25.6185 23.5817 24.9543 23.6098 24.2939 23.6514C25.1585 25.3906 26.132 27.0663 27.2031 28.6719C28.2736 27.0667 29.2461 25.3913 30.1104 23.6523C29.1492 23.5918 28.1801 23.5596 27.2041 23.5596L26.2861 23.5684ZM17.793 13.4873C16.5326 17.0417 14.6301 20.2903 12.2266 23.0977C14.7799 22.2713 17.4259 21.6516 20.1445 21.2559C19.153 18.7612 18.3629 16.165 17.793 13.4873ZM36.6113 13.4893C36.0414 16.1662 35.2521 18.7617 34.2607 21.2559C36.9795 21.6514 39.6254 22.2713 42.1787 23.0977C39.7757 20.2907 37.8716 17.0429 36.6113 13.4893ZM19.5371 3.31445L19.541 3.91016C19.618 9.93443 20.8635 15.676 23.0527 20.9238C24.421 20.8078 25.8056 20.7451 27.2041 20.7451L28.3438 20.7588C29.3551 20.7825 30.3586 20.8395 31.3535 20.9238C33.615 15.5031 34.8701 9.55609 34.8701 3.31445L34.8643 2.80469H19.5439C19.5416 2.97486 19.5371 3.14473 19.5371 3.31445Z"

  if (!animated) {
    return (
      <div className={className}>
        <svg viewBox="0 0 56 48" width={size} height={size} className="w-full h-auto max-w-full">
          <path d={pathD} fill={color} />
        </svg>
      </div>
    )
  }

  if (animated === 'breathing') {
    return (
      <div key="logo-breathing" className={className}>
        <motion.svg
          viewBox="0 0 56 48"
          width={size}
          height={size}
          className="w-full h-auto max-w-full"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.path 
            d={pathD} 
            fill={color} 
          />
        </motion.svg>
      </div>
    )
  }

  if (animated === 'converge') {
    return (
      <div key="logo-converge" className={className}>
        <motion.svg
          viewBox="0 0 56 48"
          width={size}
          height={size}
          className="w-full h-auto max-w-full overflow-visible drop-shadow-xl"
        >
          {/* Bottom Ring (People) */}
          <motion.circle 
            r="45.89" fill="none" stroke={color} strokeWidth="1.5"
            initial={{ cx: 27.02, cy: 110, opacity: 0, scale: 1.1, transformOrigin: '50% 50%' }}
            animate={{ 
               cx: [27.02, 27.02, 27.02, 27.02], 
               cy: [110, 68.11, 68.11, 68.11], 
               opacity: [0, 0.4, 0.4, 0],
               scale: [1.1, 1, 1, 1]
            }}
            transition={{ duration: 4.5, times: [0, 0.35, 0.7, 1], ease: ["easeInOut", "linear", "easeInOut"] }}
          />
          {/* Top Left Ring (Process) */}
          <motion.circle 
            r="45.89" fill="none" stroke={color} strokeWidth="1.5"
            initial={{ cx: -50, cy: -20, opacity: 0, scale: 1.1, transformOrigin: '50% 50%' }}
            animate={{ 
               cx: [-50, -10.04, -10.04, -10.04], 
               cy: [-20, 3.89, 3.89, 3.89], 
               opacity: [0, 0.4, 0.4, 0],
               scale: [1.1, 1, 1, 1]
            }}
            transition={{ duration: 4.5, times: [0, 0.35, 0.7, 1], ease: ["easeInOut", "linear", "easeInOut"] }}
          />
          {/* Top Right Ring (Technology) */}
          <motion.circle 
            r="45.89" fill="none" stroke={color} strokeWidth="1.5"
            initial={{ cx: 104, cy: -20, opacity: 0, scale: 1.1, transformOrigin: '50% 50%' }}
            animate={{ 
               cx: [104, 64.09, 64.09, 64.09], 
               cy: [-20, 3.89, 3.89, 3.89], 
               opacity: [0, 0.4, 0.4, 0],
               scale: [1.1, 1, 1, 1]
            }}
            transition={{ duration: 4.5, times: [0, 0.35, 0.7, 1], ease: ["easeInOut", "linear", "easeInOut"] }}
          />

          {/* Final Logo Emergence */}
          <motion.path 
            d={pathD} 
            fill={color} 
            stroke={color}
            strokeWidth="0.5"
            initial={{ scale: 1, pathLength: 0, fillOpacity: 0, transformOrigin: '50% 50%' }}
            animate={{ 
               pathLength: [0, 0, 1, 1],
               fillOpacity: [0, 0, 0, 1],
            }}
            transition={{ duration: 4.5, times: [0, 0.35, 0.7, 1], ease: ["linear", "easeInOut", "easeOut"] }}
          />
        </motion.svg>
      </div>
    )
  }

  if (animated === 'draw') {
    return (
      <div key="logo-draw" className={className}>
        <motion.svg
          viewBox="0 0 56 48"
          width={size}
          height={size}
          className="w-full h-auto max-w-full"
        >
          <motion.path 
            d={pathD} 
            fill={color} 
            stroke={color}
            strokeWidth={1.5}
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{ pathLength: 1, fillOpacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </motion.svg>
      </div>
    )
  }

  // Default 'scroll' animation for boolean true
  return (
    <div ref={containerRef} className={className}>
      <motion.svg
        viewBox="0 0 56 48"
        width={size}
        height={size}
        className="w-full h-auto max-w-full"
        style={{ opacity: overallOpacity, scale: scale }}
      >
        <path d={pathD} fill={color} />
      </motion.svg>
    </div>
  )
}
