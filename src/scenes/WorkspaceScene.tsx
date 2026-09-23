import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { Workspace } from '../components/3d/Workspace'
import { CameraRig } from '../components/3d/CameraRig'
import { useMediaQuery } from '../hooks/useMediaQuery'
import type { CharacterApi } from '../hooks/useCharacter'

type WorkspaceSceneProps = {
  isExploring: boolean
  isMonitorFocused: boolean
  character: CharacterApi
  highlight: 'none' | 'chair' | 'bed' | 'mac'
  onFloorClick: (x: number, z: number) => void
  onChairClick: () => void
  onBedClick: () => void
  onMacClick: () => void
  onArrivedUseMac: () => void
}

export function WorkspaceScene({
  isExploring,
  isMonitorFocused,
  character,
  highlight,
  onFloorClick,
  onChairClick,
  onBedClick,
  onMacClick,
  onArrivedUseMac,
}: WorkspaceSceneProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const camera = useMemo(() => {
    if (isMobile) {
      return { position: [2.4, 2.4, 3.6] as [number, number, number], fov: 42 }
    }
    return { position: [2.8, 2.2, 3.4] as [number, number, number], fov: 40 }
  }, [isMobile])

  return (
    <Canvas
      className="workspace-canvas"
      shadows
      dpr={[1, isMobile ? 1.5 : 2]}
      camera={{
        position: camera.position,
        fov: camera.fov,
        near: 0.1,
        far: 50,
      }}
      gl={{
        antialias: !isMobile,
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor('#1a1512')
      }}
    >
      <Suspense fallback={null}>
        <Workspace
          isExploring={isExploring}
          isMonitorFocused={isMonitorFocused}
          character={character}
          highlight={highlight}
          onFloorClick={onFloorClick}
          onChairClick={onChairClick}
          onBedClick={onBedClick}
          onMacClick={onMacClick}
          onArrivedUseMac={onArrivedUseMac}
        />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Suspense>

      <CameraRig
        isExploring={isExploring}
        isMonitorFocused={isMonitorFocused}
      />
    </Canvas>
  )
}
