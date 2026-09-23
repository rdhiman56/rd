import { Html } from '@react-three/drei'
import { roomLayout } from '../../data/roomLayout'
import '../../styles/hotspots.css'

type BedProps = {
  highlighted?: boolean
  onClick?: () => void
}

export function Bed({ highlighted = false, onClick }: BedProps) {
  const [x, , z] = roomLayout.bed

  return (
    <group position={[x, 0, z]} onClick={(e) => { e.stopPropagation(); onClick?.() }}>
      {/* Frame */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.28, 1.05]} />
        <meshStandardMaterial
          color={highlighted ? '#7a5a48' : '#5c4336'}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>
      {/* Mattress */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <boxGeometry args={[1.55, 0.16, 0.92]} />
        <meshStandardMaterial color="#e8e2d6" roughness={0.9} />
      </mesh>
      {/* Blanket */}
      <mesh position={[0.15, 0.48, 0]} castShadow>
        <boxGeometry args={[1.1, 0.08, 0.88]} />
        <meshStandardMaterial color="#6e8f9e" roughness={0.85} />
      </mesh>
      {/* Pillow */}
      <mesh position={[-0.55, 0.5, 0]} castShadow>
        <boxGeometry args={[0.35, 0.12, 0.55]} />
        <meshStandardMaterial color="#f2efe8" roughness={0.9} />
      </mesh>
      {/* Headboard */}
      <mesh position={[-0.82, 0.55, 0]} castShadow>
        <boxGeometry args={[0.08, 0.7, 1.05]} />
        <meshStandardMaterial color="#4a362c" roughness={0.65} />
      </mesh>

      <Html position={[0, 1.15, 0]} center distanceFactor={6} style={{ pointerEvents: 'none' }}>
        <div className={`hotspot-label ${highlighted ? 'is-hot' : ''}`}>Bed · Sleep</div>
      </Html>

      {/* Click proxy */}
      <mesh position={[0, 0.4, 0]} visible={false}>
        <boxGeometry args={[1.7, 0.9, 1.1]} />
      </mesh>
    </group>
  )
}
