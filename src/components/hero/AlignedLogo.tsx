import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface AlignedLogoProps {
  className?: string
  size?: number | string
  animated?: boolean | 'scroll' | 'breathing' | 'draw' | 'converge' | 'outline'
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

  const pathD = "M1088.98 745.654L1121 691.207C977.139 471.994 832.804 233.21 732.232 0H680.76C578.646 226.567 453.642 445.423 309.9 648.147C284.164 648.859 258.428 649.926 232.692 651.35C376.197 452.659 500.014 223.008 608.77 0H545.557C434.548 225.974 306.342 455.032 160.583 655.858C134.136 657.518 107.451 660.009 81.1219 662.263C227.355 460.132 354.256 227.041 464.79 0H401.696C286.654 234.633 151.57 471.52 0 680.056L26.2104 724.539C274.201 698.561 525.869 695.833 773.86 721.218C787.736 743.756 801.968 766.057 816.437 788.239C586.236 760.6 311.679 772.225 62.3832 785.985L94.8794 841.025C348.682 827.621 621.697 818.369 857.473 849.803L899.694 911.842C665.342 882.068 388.531 889.897 131.527 903.302L164.023 958.461C429.092 945.768 709.935 941.735 954.724 974L980.816 929.636C837.311 726.674 706.258 509.597 604.145 283.268C615.767 261.679 627.271 239.971 638.42 218.145C715.628 403.906 885.936 664.398 1016.75 868.427L1049.13 813.387C914.044 603.19 749.191 348.628 671.628 151.717C682.064 130.483 696.178 100.354 706.496 78.7646C804.103 302.603 950.099 534.626 1088.98 745.654ZM737.213 660.721C618.614 650.045 499.184 645.419 379.873 646.724C447.238 548.98 512.112 448.389 570.225 344.714C620.63 452.422 676.371 558.232 737.213 660.721Z"

  if (!animated) {
    return (
      <div className={className}>
        <svg viewBox="0 0 1121 974" width={size} height={size} className="w-full h-auto max-w-full">
          <path d={pathD} fill={color} />
        </svg>
      </div>
    )
  }

  if (animated === 'breathing') {
    return (
      <div key="logo-breathing" className={className}>
        <motion.svg
          viewBox="0 0 1121 974"
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
          viewBox="0 0 1121 974"
          width={size}
          height={size}
          className="w-full h-auto max-w-full overflow-visible drop-shadow-xl"
        >
          <motion.path 
            d={pathD} 
            fill={color}
            initial={{ opacity: 0, scale: 0.85, originX: '50%', originY: '50%' }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.svg>
      </div>
    )
  }

  if (animated === 'draw') {
    return (
      <div key="logo-draw" className={className}>
        <motion.svg
          viewBox="0 0 1121 974"
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

  if (animated === 'outline') {
    return (
      <div key="logo-outline" className={className}>
        <motion.svg
          viewBox="0 0 1121 974"
          width={size}
          height={size}
          className="w-full h-auto max-w-full"
        >
          <motion.path 
            d={pathD} 
            fill="none" 
            stroke={color}
            strokeWidth={0.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </motion.svg>
      </div>
    )
  }

  // Default 'scroll' animation for boolean true
  return (
    <div ref={containerRef} className={className}>
      <motion.svg
        viewBox="0 0 1121 974"
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
