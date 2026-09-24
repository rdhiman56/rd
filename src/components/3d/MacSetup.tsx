import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { roomLayout } from '../../data/roomLayout'
import '../../styles/hotspots.css'

type MacSetupProps = {
  highlighted?: boolean
  active?: boolean
  onClick?: () => void
}

/** Compact desk + iMac-style display — clearly visible, not oversized */
export function MacSetup({ highlighted = false, active = false, onClick }: MacSetupProps) {
  const screenRef = useRef<THREE.MeshStandardMaterial>(null)
  const [dx, , dz] = roomLayout.desk

  useFrame(({ clock }) => {
    if (!screenRef.current) return
    const pulse = 0.25 + Math.sin(clock.elapsedTime * 1.2) * 0.05
    screenRef.current.emissiveIntensity = active ? 0.7 : highlighted ? 0.45 : pulse
  })

  return (
    <group
      position={[dx, 0, dz]}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
    >
      {/* Desk top */}
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.15, 0.05, 0.62]} />
        <meshStandardMaterial color="#6b513f" roughness={0.55} metalness={0.08} />
      </mesh>
      {/* Legs */}
      {[
        [-0.48, 0.35, -0.24],
        [0.48, 0.35, -0.24],
        [-0.48, 0.35, 0.24],
        [0.48, 0.35, 0.24],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.04, 0.7, 0.04]} />
          <meshStandardMaterial color="#2a2a2e" roughness={0.4} metalness={0.5} />
        </mesh>
      ))}

      {/* iMac body */}
      <group position={[0, 0.95, -0.12]}>
        <mesh castShadow>
          <boxGeometry args={[0.62, 0.4, 0.04]} />
          <meshStandardMaterial color="#d8d8dc" roughness={0.35} metalness={0.45} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0.01, 0.022]}>
          <planeGeometry args={[0.54, 0.32]} />
          <meshStandardMaterial
            ref={screenRef}
            color="#0b1520"
            emissive={active ? '#3aa0c8' : '#1a4a66'}
            emissiveIntensity={0.35}
            roughness={0.25}
          />
        </mesh>
        {/* Chin */}
        <mesh position={[0, -0.18, 0.01]}>
          <boxGeometry args={[0.62, 0.05, 0.03]} />
          <meshStandardMaterial color="#c8c8cc" roughness={0.4} metalness={0.4} />
        </mesh>
        {/* Stand */}
        <mesh position={[0, -0.28, -0.02]} castShadow>
          <cylinderGeometry args={[0.025, 0.04, 0.16, 12]} />
          <meshStandardMaterial color="#c0c0c4" roughness={0.35} metalness={0.5} />
        </mesh>
        <mesh position={[0, -0.36, 0.02]} castShadow>
          <cylinderGeometry args={[0.1, 0.12, 0.02, 24]} />
          <meshStandardMaterial color="#c0c0c4" roughness={0.35} metalness={0.5} />
        </mesh>
      </group>

      {/* Keyboard */}
      <mesh position={[0, 0.76, 0.12]} castShadow>
        <boxGeometry args={[0.36, 0.015, 0.13]} />
        <meshStandardMaterial color="#e8e8ec" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Mouse */}
      <mesh position={[0.28, 0.77, 0.14]} castShadow>
        <capsuleGeometry args={[0.018, 0.03, 4, 8]} />
        <meshStandardMaterial color="#e8e8ec" roughness={0.5} metalness={0.2} />
      </mesh>

      <pointLight
        position={[0, 1.05, 0.1]}
        intensity={active ? 0.55 : 0.25}
        distance={1.8}
        color="#7ec8e8"
      />

      {!active && (
        <Html
          position={[0, 1.35, 0.05]}
          center
          distanceFactor={10}
          style={{ pointerEvents: 'none' }}
          zIndexRange={[10, 0]}
        >
          <div className={`hotspot-label ${highlighted ? 'is-hot' : ''}`}>
            Mac · Work
          </div>
        </Html>
      )}

      <mesh position={[0, 0.95, 0]} visible={false}>
        <boxGeometry args={[1.2, 1.2, 0.8]} />
      </mesh>
    </group>
  )
}
