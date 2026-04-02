import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../../context/ThemeContext'

// 1. Mathematically generate a pristine 45-degree ribbed normal map for physical glass reflection
const generateRibbedNormalMap = () => {
  const size = 1024
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.Texture()

  const imageData = ctx.createImageData(size, size)
  
  // Diagonal rotation (-45 degrees)
  const rot = -Math.PI / 4
  const cosR = Math.cos(rot)
  const sinR = Math.sin(rot)
  
  // Number of ribs spanning the canvas
  const ribs = 60
  
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // Map to 0..1 space
      const px = x / size
      const py = y / size
      
      // Rotate coordinates
      const rx = px * cosR - py * sinR
      
      // Calculate the ridge slope using a sine wave
      // To get sharp optical grooves, we sharpen the sine wave
      const rawWave = Math.sin(rx * Math.PI * 2 * ribs)
      const slope = Math.sign(rawWave) * Math.pow(Math.abs(rawWave), 0.5)
      
      // The normal vector direction
      const normX = slope * cosR
      const normY = slope * sinR
      // Z controls "flatness". Lower Z = deeper ribs
      const normZ = 1.8 
      
      // Normalize the vector
      const len = Math.sqrt(normX*normX + normY*normY + normZ*normZ)
      
      // Map 3D normal space (-1..1) to RGB image space (0..255)
      const i = (y * size + x) * 4
      imageData.data[i] = (normX/len * 0.5 + 0.5) * 255     // R
      imageData.data[i+1] = (normY/len * 0.5 + 0.5) * 255   // G
      imageData.data[i+2] = (normZ/len * 0.5 + 0.5) * 255   // B
      imageData.data[i+3] = 255                             // A
    }
  }
  
  ctx.putImageData(imageData, 0, 0)
  const texture = new THREE.CanvasTexture(canvas)
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  return texture
}

function PhysicalGlass() {
  const normalMap = useMemo(() => generateRibbedNormalMap(), [])
  const { viewport, pointer } = useThree()
  const glassRef = useRef<THREE.Mesh>(null)

  // Subtle mouse interaction - tilt the glass slightly based on mouse
  useFrame(() => {
    if (glassRef.current) {
      const targetRotationX = (pointer.y * Math.PI) * 0.05
      const targetRotationY = (pointer.x * Math.PI) * 0.05
      
      glassRef.current.rotation.x += (targetRotationX - glassRef.current.rotation.x) * 0.05
      glassRef.current.rotation.y += (targetRotationY - glassRef.current.rotation.y) * 0.05
    }
  })

  return (
    <mesh ref={glassRef} position={[0, 0, 2]}>
      {/* Plane large enough to cover viewport even when tilted */}
      <planeGeometry args={[viewport.width * 1.5, viewport.height * 1.5]} />
      <MeshTransmissionMaterial
        normalMap={normalMap}
        normalScale={new THREE.Vector2(0.8, 0.8)}   // Intensity of the ribs
        thickness={3.0}                             // Physical thickness of the glass
        roughness={0.05}                            // Very polished, optical finish
        ior={1.3}                                   // Index of Refraction (Acrylic/Glass)
        transmission={1.0}                          // 100% transparent
        chromaticAberration={0.08}                  // Gorgeous premium edge-color splitting
        anisotropy={0.5}                            // Enhances diagonal stretching
        clearcoat={1}                               // Premium glossy finish on top
        clearcoatRoughness={0.1}
      />
    </mesh>
  )
}

function FloatingLogoRings() {
  const groupRef = useRef<THREE.Group>(null)

  // Slowly rotate the entire logo assembly for a premium, heavy feel
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.05
    }
  })

  // Torus dimensions to match the Aligned logo scale
  const radius = 2.5
  const tube = 0.35
  const offset = 1.8

  // Placed in an equilateral triangle layout
  const c1: [number, number, number] = [0, offset, 0]
  const c2: [number, number, number] = [offset * 0.866, -offset * 0.5, 0]
  const c3: [number, number, number] = [-offset * 0.866, -offset * 0.5, 0]

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        {/* Ring 1 - Kinetic Orange */}
        <mesh position={c1}>
          <torusGeometry args={[radius, tube, 64, 128]} />
          <meshPhysicalMaterial 
            color="#FF5E20" 
            emissive="#FF5E20"
            emissiveIntensity={1.2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        
        {/* Ring 2 - Industrial Blue */}
        <mesh position={c2}>
          <torusGeometry args={[radius, tube, 64, 128]} />
          <meshPhysicalMaterial 
            color="#324458" 
            emissive="#324458"
            emissiveIntensity={1.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        
        {/* Ring 3 - Kinetic Orange */}
        <mesh position={c3}>
          <torusGeometry args={[radius, tube, 64, 128]} />
          <meshPhysicalMaterial 
            color="#FF5E20" 
            emissive="#FF5E20"
            emissiveIntensity={1.2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>
    </group>
  )
}

export default function HeroShader() {
  const { theme } = useTheme()
  
  // Explicitly match the brand guidelines CSS custom properties to ensure perfect blending
  const bgColor = theme === 'dark' ? '#0A0A0F' : '#FCFDFD'

  return (
    <div className="absolute inset-0 pointer-events-auto" style={{ zIndex: 0 }}>
      {/* Background layer color to ground the 3D scene smoothly in light or dark mode */}
      <div className="absolute inset-0 transition-colors duration-1000" style={{ backgroundColor: bgColor }} />
      
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 35 }} 
        dpr={[1, 2]} 
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        {/* Pass the dynamic background color directly to WebGL so the transmission material refracts it perfectly */}
        <color attach="background" args={[bgColor]} />
        
        <ambientLight intensity={theme === 'dark' ? 0.5 : 1.5} />
        <directionalLight position={[10, 10, 5]} intensity={theme === 'dark' ? 1 : 2} color="#ffffff" />
        
        {/* The true 3D physical glass panel filling the viewport */}
        <PhysicalGlass />
        
        {/* The floating brand logo geometries cast perfectly behind the glass */}
        <FloatingLogoRings />
        
        {/* Studio environment for high-end PBR reflections on the glass and metal */}
        <Environment preset={theme === 'dark' ? "city" : "studio"} />
      </Canvas>
    </div>
  )
}
