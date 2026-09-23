import { Html } from '@react-three/drei'
import { roomLayout } from '../../data/roomLayout'
import '../../styles/hotspots.css'

type ChairProps = {
  highlighted?: boolean
  occupied?: boolean
  onClick?: () => void
}

export function Chair({ highlighted = false, occupied = false, onClick }: ChairProps) {
  const [x, , z] = roomLayout.chair

  return (
    <group
      position={[x, 0, z]}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
    >
      {/* Seat */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[0.42, 0.06, 0.42]} />
        <meshStandardMaterial
          color={highlighted ? '#4a5560' : '#2f3640'}
          roughness={0.45}
          metalness={0.25}
        />
      </mesh>
      {/* Back */}
      <mesh position={[0, 0.72, -0.18]} castShadow>
        <boxGeometry args={[0.42, 0.55, 0.06]} />
        <meshStandardMaterial color="#2f3640" roughness={0.45} metalness={0.25} />
      </mesh>
      {/* Legs */}
      {[
        [-0.16, 0.2, -0.16],
        [0.16, 0.2, -0.16],
        [-0.16, 0.2, 0.16],
        [0.16, 0.2, 0.16],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.4, 8]} />
          <meshStandardMaterial color="#1a1d22" roughness={0.4} metalness={0.5} />
        </mesh>
      ))}

      <Html position={[0, 1.15, 0]} center distanceFactor={6} style={{ pointerEvents: 'none' }}>
        <div className={`hotspot-label ${highlighted ? 'is-hot' : ''}`}>
          {occupied ? 'Seated' : 'Chair · Sit'}
        </div>
      </Html>

      <mesh position={[0, 0.5, 0]} visible={false}>
        <boxGeometry args={[0.5, 1.0, 0.5]} />
      </mesh>
    </group>
  )
}
