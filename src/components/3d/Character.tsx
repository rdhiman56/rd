import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { CharacterApi } from '../../hooks/useCharacter'
import { roomLayout } from '../../data/roomLayout'

type CharacterProps = {
  api: CharacterApi
  onArrivedUseMac?: () => void
}

const WALK_SPEED = 1.55

export function Character({ api, onArrivedUseMac }: CharacterProps) {
  const group = useRef<THREE.Group>(null)
  const bob = useRef(0)
  const {
    pose,
    setPose,
    position,
    target,
    facing,
    intent,
    restoreEnergy,
    drainEnergy,
    setFeedback,
    forceRender,
  } = api

  const skin = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#c68642', roughness: 0.7 }),
    [],
  )
  const shirt = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#3d6b8a',
        roughness: 0.55,
        metalness: 0.05,
      }),
    [],
  )
  const pants = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#2c3340', roughness: 0.65 }),
    [],
  )

  useFrame((_, delta) => {
    if (!group.current) return

    if (pose === 'walking') {
      const pos = position.current
      const tgt = target.current
      const dist = pos.distanceTo(tgt)

      if (dist < 0.04) {
        pos.copy(tgt)
        const next = intent.current
        intent.current = { type: 'none' }

        if (next.type === 'sit' || next.type === 'use-mac') {
          setPose('sitting')
          pos.set(...roomLayout.sitOffset)
          facing.current = Math.PI
          setFeedback(
            next.type === 'use-mac'
              ? 'Seated · opening Mac…'
              : 'Seated at the Mac · click Mac or dock icons',
          )
          drainEnergy(4)
          if (next.type === 'use-mac') onArrivedUseMac?.()
        } else if (next.type === 'sleep') {
          setPose('sleeping')
          pos.set(...roomLayout.sleepOffset)
          facing.current = Math.PI / 2
          setFeedback('Sleeping · energy restoring…')
          restoreEnergy()
        } else {
          setPose('idle')
          setFeedback('Tap chair, bed, Mac, or floor')
          drainEnergy(2)
        }
        forceRender()
      } else {
        const step = Math.min(WALK_SPEED * delta, dist)
        const dir = tgt.clone().sub(pos).normalize()
        pos.addScaledVector(dir, step)
        facing.current = Math.atan2(dir.x, dir.z)
        bob.current += delta * 10
      }
    }

    const p = position.current
    let y = p.y
    let rotX = 0
    let scaleY = 1

    if (pose === 'sitting') {
      y = 0.42
      rotX = 0.15
    } else if (pose === 'sleeping') {
      y = 0.48
      rotX = Math.PI / 2
      scaleY = 0.92
    } else if (pose === 'walking') {
      y = Math.abs(Math.sin(bob.current)) * 0.04
    }

    group.current.position.set(p.x, y, p.z)
    group.current.rotation.set(rotX, facing.current, 0)
    group.current.scale.set(1, scaleY, 1)
  })

  const armSwing = pose === 'walking' ? Math.sin(bob.current) * 0.45 : 0
  const legSwing = pose === 'walking' ? Math.sin(bob.current) * 0.55 : 0

  return (
    <group ref={group}>
      {/* Body */}
      <mesh position={[0, 0.95, 0]} castShadow material={shirt}>
        <capsuleGeometry args={[0.14, 0.32, 6, 10]} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.32, 0]} castShadow material={skin}>
        <sphereGeometry args={[0.13, 16, 16]} />
      </mesh>
      {/* Hair */}
      <mesh position={[0, 1.4, -0.02]} castShadow>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#1c1410" roughness={0.85} />
      </mesh>
      {/* Arms */}
      <mesh
        position={[-0.22, 0.95, 0]}
        rotation={[armSwing, 0, 0.25]}
        castShadow
        material={shirt}
      >
        <capsuleGeometry args={[0.045, 0.28, 4, 8]} />
      </mesh>
      <mesh
        position={[0.22, 0.95, 0]}
        rotation={[-armSwing, 0, -0.25]}
        castShadow
        material={shirt}
      >
        <capsuleGeometry args={[0.045, 0.28, 4, 8]} />
      </mesh>
      {/* Legs */}
      <mesh
        position={[-0.08, 0.45, 0]}
        rotation={[legSwing, 0, 0]}
        castShadow
        material={pants}
      >
        <capsuleGeometry args={[0.055, 0.32, 4, 8]} />
      </mesh>
      <mesh
        position={[0.08, 0.45, 0]}
        rotation={[-legSwing, 0, 0]}
        castShadow
        material={pants}
      >
        <capsuleGeometry args={[0.055, 0.32, 4, 8]} />
      </mesh>

      {/* Soft highlight when selected interactions pending */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.22, 0.28, 24]} />
        <meshBasicMaterial
          color="#7ec8e8"
          transparent
          opacity={pose === 'walking' ? 0.45 : 0.15}
        />
      </mesh>
    </group>
  )
}
