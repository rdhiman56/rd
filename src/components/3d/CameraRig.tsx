import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import * as THREE from 'three'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { roomLayout } from '../../data/roomLayout'

type CameraRigProps = {
  isExploring: boolean
  isMonitorFocused: boolean
}

const ROOM_LOOK = new THREE.Vector3(0.2, 0.7, 0)
const MAC_LOOK = new THREE.Vector3(...roomLayout.macScreen)

export function CameraRig({ isExploring, isMonitorFocused }: CameraRigProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const defaultPos = useMemo(() => {
    if (isMobile) return new THREE.Vector3(2.4, 2.4, 3.6)
    return new THREE.Vector3(2.8, 2.2, 3.4)
  }, [isMobile])

  const focusPos = useMemo(() => {
    if (isMobile) return new THREE.Vector3(0.95, 1.25, 1.35)
    return new THREE.Vector3(0.95, 1.2, 1.15)
  }, [isMobile])

  const goalPos = useRef(defaultPos.clone())
  const goalTarget = useRef(ROOM_LOOK.clone())

  useFrame((state, delta) => {
    const controls = controlsRef.current
    if (!controls) return

    if (isMonitorFocused) {
      goalPos.current.copy(focusPos)
      goalTarget.current.copy(MAC_LOOK)
    } else {
      goalPos.current.copy(defaultPos)
      goalTarget.current.copy(ROOM_LOOK)
    }

    const t = 1 - Math.exp(-2.8 * delta)
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
      maxPolarAngle={Math.PI / 2.2}
      minDistance={isMobile ? 2.2 : 2.0}
      maxDistance={isMobile ? 7 : 6.5}
      target={[0.2, 0.7, 0]}
      autoRotate={!isExploring && !isMonitorFocused}
      autoRotateSpeed={0.18}
    />
  )
}
