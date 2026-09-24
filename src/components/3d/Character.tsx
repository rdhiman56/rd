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

/**
 * Character parts are authored in a standing bind pose (feet at y=0).
 * Sitting / sleeping rearrange limb transforms — not just a root tilt —
 * so the figure actually sits on the chair and lies on the bed.
 */
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
      // Walk targets are floor-plane (y=0); ignore vertical in distance
      const dist = Math.hypot(tgt.x - pos.x, tgt.z - pos.z)

      if (dist < 0.05) {
        const next = intent.current
        intent.current = { type: 'none' }

        if (next.type === 'sit' || next.type === 'use-mac') {
          setPose('sitting')
          position.current.set(...roomLayout.sitOffset)
          facing.current = roomLayout.sitFacing
          setFeedback(
            next.type === 'use-mac'
              ? 'Seated · opening Mac…'
              : 'Seated at the Mac · click the Mac to open apps',
          )
          drainEnergy(4)
          if (next.type === 'use-mac') onArrivedUseMac?.()
        } else if (next.type === 'sleep') {
          setPose('sleeping')
          position.current.set(...roomLayout.sleepOffset)
          facing.current = roomLayout.sleepFacing
          setFeedback('Sleeping · energy restoring…')
          restoreEnergy()
        } else {
          setPose('idle')
          position.current.y = 0
          setFeedback('Tap chair, bed, Mac, or floor')
          drainEnergy(2)
        }
        forceRender()
      } else {
        const step = Math.min(WALK_SPEED * delta, dist)
        const dirX = (tgt.x - pos.x) / dist
        const dirZ = (tgt.z - pos.z) / dist
        pos.x += dirX * step
        pos.z += dirZ * step
        pos.y = 0
        facing.current = Math.atan2(dirX, dirZ)
        bob.current += delta * 10
      }
    }

    const p = position.current
    group.current.position.copy(p)

    if (pose === 'sitting') {
      // Upright on seat — limb sit pose handles the rest
      group.current.rotation.set(0, facing.current, 0)
      group.current.scale.set(1, 1, 1)
    } else if (pose === 'sleeping') {
      // Lie on back: local +Y → world -X so head points at headboard
      group.current.rotation.set(0, facing.current, Math.PI / 2)
      group.current.scale.set(1, 1, 1)
    } else {
      const bobY = pose === 'walking' ? Math.abs(Math.sin(bob.current)) * 0.04 : 0
      group.current.position.y = bobY
      group.current.rotation.set(0, facing.current, 0)
      group.current.scale.set(1, 1, 1)
    }
  })

  const walking = pose === 'walking'
  const sitting = pose === 'sitting'
  const sleeping = pose === 'sleeping'

  const armSwing = walking ? Math.sin(bob.current) * 0.45 : 0
  const legSwing = walking ? Math.sin(bob.current) * 0.55 : 0

  // --- Pose-specific local transforms ---
  const torso = sitting
    ? { pos: [0, 0.55, 0] as Triplet, rot: [0.12, 0, 0] as Triplet }
    : sleeping
      ? { pos: [0, 0.7, 0] as Triplet, rot: [0, 0, 0] as Triplet }
      : { pos: [0, 0.95, 0] as Triplet, rot: [0, 0, 0] as Triplet }

  const head = sitting
    ? { pos: [0, 0.88, 0.02] as Triplet }
    : sleeping
      ? { pos: [0, 1.28, 0] as Triplet }
      : { pos: [0, 1.32, 0] as Triplet }

  const leftArm = sitting
    ? { pos: [-0.2, 0.55, 0.06] as Triplet, rot: [0.8, 0, 0.35] as Triplet }
    : sleeping
      ? { pos: [-0.22, 0.7, 0.08] as Triplet, rot: [0.2, 0, 0.9] as Triplet }
      : {
          pos: [-0.22, 0.95, 0] as Triplet,
          rot: [armSwing, 0, 0.25] as Triplet,
        }

  const rightArm = sitting
    ? { pos: [0.2, 0.55, 0.06] as Triplet, rot: [0.8, 0, -0.35] as Triplet }
    : sleeping
      ? { pos: [0.22, 0.7, 0.08] as Triplet, rot: [0.2, 0, -0.9] as Triplet }
      : {
          pos: [0.22, 0.95, 0] as Triplet,
          rot: [-armSwing, 0, -0.25] as Triplet,
        }

  // Sitting: thighs forward (horizontal), calves down — looks seated on chair
  const leftLeg = sitting
    ? { pos: [-0.08, 0.38, 0.12] as Triplet, rot: [1.35, 0, 0.05] as Triplet }
    : sleeping
      ? { pos: [-0.08, 0.35, 0] as Triplet, rot: [0, 0, 0] as Triplet }
      : {
          pos: [-0.08, 0.45, 0] as Triplet,
          rot: [legSwing, 0, 0] as Triplet,
        }

  const rightLeg = sitting
    ? { pos: [0.08, 0.38, 0.12] as Triplet, rot: [1.35, 0, -0.05] as Triplet }
    : sleeping
      ? { pos: [0.08, 0.35, 0] as Triplet, rot: [0, 0, 0] as Triplet }
      : {
          pos: [0.08, 0.45, 0] as Triplet,
          rot: [-legSwing, 0, 0] as Triplet,
        }

  return (
    <group ref={group}>
      <mesh position={torso.pos} rotation={torso.rot} castShadow material={shirt}>
        <capsuleGeometry args={[0.14, sitting ? 0.22 : 0.32, 6, 10]} />
      </mesh>

      <mesh position={head.pos} castShadow material={skin}>
        <sphereGeometry args={[0.13, 16, 16]} />
      </mesh>
      <mesh
        position={[head.pos[0], head.pos[1] + 0.08, head.pos[2] - 0.02]}
        castShadow
      >
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#1c1410" roughness={0.85} />
      </mesh>

      <mesh position={leftArm.pos} rotation={leftArm.rot} castShadow material={shirt}>
        <capsuleGeometry args={[0.045, 0.28, 4, 8]} />
      </mesh>
      <mesh position={rightArm.pos} rotation={rightArm.rot} castShadow material={shirt}>
        <capsuleGeometry args={[0.045, 0.28, 4, 8]} />
      </mesh>

      <mesh position={leftLeg.pos} rotation={leftLeg.rot} castShadow material={pants}>
        <capsuleGeometry args={[0.055, sitting ? 0.26 : 0.32, 4, 8]} />
      </mesh>
      <mesh position={rightLeg.pos} rotation={rightLeg.rot} castShadow material={pants}>
        <capsuleGeometry args={[0.055, sitting ? 0.26 : 0.32, 4, 8]} />
      </mesh>

      {/* Ground ring only while standing / walking — hide when seated or asleep */}
      {!sitting && !sleeping && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.22, 0.28, 24]} />
          <meshBasicMaterial
            color="#7ec8e8"
            transparent
            opacity={walking ? 0.45 : 0.15}
          />
        </mesh>
      )}
    </group>
  )
}

type Triplet = [number, number, number]
