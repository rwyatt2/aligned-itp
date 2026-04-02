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
        resolution={512}                            // Heavy optimization: limits internal FBO size. Visually identical.
        samples={3}                                 // Low MSAA on internal buffer reduces GPU load
      />
    </mesh>
  )
}

// Mathematically generate a procedural brushed metal map so the spin is highly visible
const generateBrushedMetalMap = () => {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.Texture()
  const imageData = ctx.createImageData(size, size)
  for (let i = 0; i < imageData.data.length; i += 4) {
    const val = Math.random() * 80 + 120 // Middle-gray noise variations
    imageData.data[i] = val
    imageData.data[i+1] = val
    imageData.data[i+2] = val
    imageData.data[i+3] = 255
  }
  ctx.putImageData(imageData, 0, 0)
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  // Drastically stretch the noise horizontally. 
  // On a torus, this wraps the noise tightly along the tube, creating a beautiful brushed/lathed metal effect.
  texture.repeat.set(120, 1) 
  return texture
}

function FloatingLogoRings() {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)
  
  const brushedMap = useMemo(() => generateBrushedMetalMap(), [])

  // Slowly rotate each ring individually like cogs in a machine
  useFrame((state) => {
    const time = state.clock.elapsedTime
    // Alternate directions to simulate interlocking gears
    if (ring1Ref.current) ring1Ref.current.rotation.z = time * 0.15
    if (ring2Ref.current) ring2Ref.current.rotation.z = -time * 0.15
    if (ring3Ref.current) ring3Ref.current.rotation.z = -time * 0.15
  })

  // Torus dimensions to match the Aligned logo scale
  const radius = 2.5
  const tube = 0.35
  
  // EXACT OVERLAP MATH DERIVED FROM THE PROVIDED SVG:
  // In the SVG, the distance between centers is exactly 42, and the radius is 21. 
  // Thus, the distance between any two ring centers is exactly 2 * radius.
  // This means the center-paths of the toruses kiss tangentially, 
  // and they only "overlap" because of the tube thickness.
  // To form an equilateral triangle with side length L = 2 * radius,
  // the distance from origin to a vertex (circumradius) is L / sqrt(3).
  const offset = (2 * radius) / Math.sqrt(3)

  // Inverted layout: Two rings on top, one on bottom, matching the exact reference image
  // 0.866 is approx Math.sqrt(3)/2
  const sqrt3v2 = Math.sqrt(3) / 2
  const c1: [number, number, number] = [-offset * sqrt3v2, offset * 0.5, 0] // Top Left
  const c2: [number, number, number] = [offset * sqrt3v2, offset * 0.5, 0]  // Top Right
  const c3: [number, number, number] = [0, -offset, 0]                      // Bottom Center

  return (
    <group position={[0, 0, -3]}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        {/* Ring 1 - Top Left */}
        <mesh ref={ring1Ref} position={c1}>
          <torusGeometry args={[radius, tube, 64, 128]} />
          <meshPhysicalMaterial 
            color="#FF5E20" 
            emissive="#FF5E20"
            emissiveIntensity={0.6} // Reduced slightly to allow the brushed metal reflection to shine
            roughnessMap={brushedMap}
            roughness={0.7}
            metalness={0.8}
            clearcoat={0.3}
          />
        </mesh>
        
        {/* Ring 2 - Bottom Right */}
        <mesh ref={ring2Ref} position={c2}>
          <torusGeometry args={[radius, tube, 64, 128]} />
          <meshPhysicalMaterial 
            color="#FF5E20" 
            emissive="#FF5E20"
            emissiveIntensity={0.6}
            roughnessMap={brushedMap}
            roughness={0.7}
            metalness={0.8}
            clearcoat={0.3}
          />
        </mesh>
        
        {/* Ring 3 - Bottom Left */}
        <mesh ref={ring3Ref} position={c3}>
          <torusGeometry args={[radius, tube, 64, 128]} />
          <meshPhysicalMaterial 
            color="#FF5E20" 
            emissive="#FF5E20"
            emissiveIntensity={0.6}
            roughnessMap={brushedMap}
            roughness={0.7}
            metalness={0.8}
            clearcoat={0.3}
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
        dpr={[1, 1.5]} // Caps retina displays at 1.5x scaling to save 50%+ fillrate cost
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
