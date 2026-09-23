import { useMemo } from 'react'
import * as THREE from 'three'

const WOOD = '#3a2a1f'
const WOOD_EDGE = '#2a1d15'
const LEG = '#1a1a1c'

export function Desk() {
  const woodMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: WOOD,
        roughness: 0.55,
        metalness: 0.08,
      }),
    [],
  )

  const edgeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: WOOD_EDGE,
        roughness: 0.45,
        metalness: 0.12,
      }),
    [],
  )

  const legMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: LEG,
        roughness: 0.35,
        metalness: 0.55,
      }),
    [],
  )

  return (
    <group position={[0, 0, 0]}>
      {/* Desktop surface */}
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow material={woodMat}>
        <boxGeometry args={[2.4, 0.06, 1.15]} />
      </mesh>

      {/* Subtle front edge bevel */}
      <mesh position={[0, 0.695, 0.575]} material={edgeMat} castShadow>
        <boxGeometry args={[2.42, 0.02, 0.02]} />
      </mesh>

      {/* Metal legs */}
      {[
        [-1.05, 0.35, -0.45],
        [1.05, 0.35, -0.45],
        [-1.05, 0.35, 0.45],
        [1.05, 0.35, 0.45],
      ].map((pos, i) => (
        <mesh
          key={i}
          position={pos as [number, number, number]}
          castShadow
          material={legMat}
        >
          <boxGeometry args={[0.05, 0.7, 0.05]} />
        </mesh>
      ))}

      {/* Cross braces */}
      <mesh position={[0, 0.12, -0.45]} material={legMat}>
        <boxGeometry args={[2.1, 0.03, 0.03]} />
      </mesh>
      <mesh position={[0, 0.12, 0.45]} material={legMat}>
        <boxGeometry args={[2.1, 0.03, 0.03]} />
      </mesh>
    </group>
  )
}
