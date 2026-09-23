import { Environment, ContactShadows } from '@react-three/drei'
import { useMediaQuery } from '../../hooks/useMediaQuery'

type LightingProps = {
  isExploring?: boolean
  cozy?: boolean
}

export function Lighting({ isExploring = false, cozy = false }: LightingProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const shadowMap = isMobile ? 512 : 2048

  return (
    <>
      <color attach="background" args={[cozy ? '#1a1512' : '#0b0e12']} />
      <fog attach="fog" args={[cozy ? '#1a1512' : '#0b0e12', 7, 16]} />

      <ambientLight intensity={cozy ? 0.32 : 0.22} color="#f0e6d8" />

      <directionalLight
        position={[3.2, 5.5, 2.2]}
        intensity={isExploring ? 0.95 : 0.75}
        color="#fff1df"
        castShadow
        shadow-mapSize-width={shadowMap}
        shadow-mapSize-height={shadowMap}
        shadow-camera-near={1}
        shadow-camera-far={16}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.00025}
      />

      <directionalLight position={[-2.5, 2.2, 1]} intensity={0.22} color="#9bb6c9" />

      <pointLight
        position={[0.9, 1.8, -0.5]}
        intensity={0.35}
        distance={5}
        color="#ffd7b0"
      />

      <Environment preset="apartment" environmentIntensity={cozy ? 0.4 : 0.3} />

      <ContactShadows
        position={[0, 0.002, 0]}
        opacity={0.45}
        scale={10}
        blur={2.2}
        far={5}
        color="#000000"
      />
    </>
  )
}
