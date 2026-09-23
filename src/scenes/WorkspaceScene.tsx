import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { Workspace } from '../components/3d/Workspace'
import { CameraRig } from '../components/3d/CameraRig'
import { useMediaQuery } from '../hooks/useMediaQuery'

type WorkspaceSceneProps = {
  isExploring: boolean
  isMonitorFocused: boolean
  onMonitorFocus: () => void
}

export function WorkspaceScene({
  isExploring,
  isMonitorFocused,
  onMonitorFocus,
}: WorkspaceSceneProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')

  const camera = useMemo(() => {
    if (isMobile) {
      return { position: [0.15, 1.55, 2.6] as [number, number, number], fov: 42 }
    }
    if (isTablet) {
      return { position: [0.2, 1.45, 2.35] as [number, number, number], fov: 40 }
    }
    return { position: [0.35, 1.35, 2.15] as [number, number, number], fov: 38 }
  }, [isMobile, isTablet])

  return (
    <Canvas
      className="workspace-canvas"
      shadows
      dpr={[1, isMobile ? 1.5 : 2]}
      camera={{
        position: camera.position,
        fov: camera.fov,
        near: 0.1,
        far: 40,
      }}
      gl={{
        antialias: !isMobile,
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor('#0b0e12')
      }}
    >
      <Suspense fallback={null}>
        <Workspace
          isExploring={isExploring}
          isMonitorFocused={isMonitorFocused}
          onMonitorFocus={onMonitorFocus}
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
