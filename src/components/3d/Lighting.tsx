import { Environment, ContactShadows } from '@react-three/drei'
import { useMediaQuery } from '../../hooks/useMediaQuery'

type LightingProps = {
  isExploring?: boolean
}

export function Lighting({ isExploring = false }: LightingProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const shadowMap = isMobile ? 512 : 2048

  return (
    <>
      <color attach="background" args={['#0b0e12']} />
      <fog attach="fog" args={['#0b0e12', 8, 18]} />

      <ambientLight intensity={0.22} color="#c8d4e0" />

      {/* Soft key from above-right — studio feel, not game lighting */}
      <directionalLight
        position={[3.5, 6, 2.5]}
        intensity={isExploring ? 1.05 : 0.85}
        color="#f2f0eb"
        castShadow
        shadow-mapSize-width={shadowMap}
        shadow-mapSize-height={shadowMap}
        shadow-camera-near={1}
        shadow-camera-far={14}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-bias={-0.00025}
      />

      {/* Cool fill — slight futuristic edge */}
      <directionalLight
        position={[-3, 2.5, -1]}
        intensity={0.28}
        color="#7a9bb8"
      />

      {/* Rim / back accent */}
      <pointLight
        position={[0, 2.2, -2.5]}
        intensity={0.4}
        distance={8}
        color="#4a6d88"
      />

      <Environment preset="city" environmentIntensity={0.35} />

      <ContactShadows
        position={[0, 0.001, 0]}
        opacity={0.55}
        scale={8}
        blur={2.4}
        far={4}
        color="#000000"
      />
    </>
  )
}
