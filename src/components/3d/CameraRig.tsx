import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import * as THREE from 'three'
import { useMediaQuery } from '../../hooks/useMediaQuery'

type CameraRigProps = {
  isExploring: boolean
  isMonitorFocused: boolean
}

const MONITOR_LOOK_AT = new THREE.Vector3(0, 1.17, -0.26)
const DESK_LOOK_AT = new THREE.Vector3(0, 0.85, 0)

export function CameraRig({ isExploring, isMonitorFocused }: CameraRigProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')

  const defaultPos = useMemo(() => {
    if (isMobile) return new THREE.Vector3(0.15, 1.55, 2.6)
    if (isTablet) return new THREE.Vector3(0.2, 1.45, 2.35)
    return new THREE.Vector3(0.35, 1.35, 2.15)
  }, [isMobile, isTablet])

  const focusPos = useMemo(() => {
    if (isMobile) return new THREE.Vector3(0, 1.18, 0.95)
    return new THREE.Vector3(0, 1.17, 0.72)
  }, [isMobile])

  const goalPos = useRef(defaultPos.clone())
  const goalTarget = useRef(DESK_LOOK_AT.clone())

  useFrame((state, delta) => {
    const controls = controlsRef.current
    if (!controls) return

    if (isMonitorFocused) {
      goalPos.current.copy(focusPos)
      goalTarget.current.copy(MONITOR_LOOK_AT)
    } else {
      goalPos.current.copy(defaultPos)
      goalTarget.current.copy(DESK_LOOK_AT)
    }

    const t = 1 - Math.exp(-3.2 * delta)
    state.camera.position.lerp(goalPos.current, t)
    controls.target.lerp(goalTarget.current, t)
    controls.update()
  })

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={false}
      enableZoom={isExploring && !isMonitorFocused}
      enableRotate={isExploring && !isMonitorFocused}
      enableDamping
      dampingFactor={0.08}
      minPolarAngle={Math.PI / 5}
      maxPolarAngle={Math.PI / 2.15}
      minDistance={isMobile ? 1.6 : 1.2}
      maxDistance={isMobile ? 4.2 : 3.8}
      target={[0, 0.85, 0]}
      autoRotate={isExploring && !isMonitorFocused ? false : !isExploring}
      autoRotateSpeed={0.25}
    />
  )
}
