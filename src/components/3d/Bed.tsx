import { Html } from '@react-three/drei'
import { roomLayout } from '../../data/roomLayout'
import '../../styles/hotspots.css'

type BedProps = {
  highlighted?: boolean
  occupied?: boolean
  onClick?: () => void
}

export function Bed({
  highlighted = false,
  occupied = false,
  onClick,
}: BedProps) {
  const [x, , z] = roomLayout.bed

  return (
    <group
      position={[x, 0, z]}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
    >
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.28, 1.05]} />
        <meshStandardMaterial
          color={highlighted || occupied ? '#7a5a48' : '#5c4336'}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[0, 0.38, 0]} castShadow>
        <boxGeometry args={[1.55, 0.16, 0.92]} />
        <meshStandardMaterial color="#e8e2d6" roughness={0.9} />
      </mesh>
      <mesh position={[0.2, 0.48, 0]} castShadow>
        <boxGeometry args={[1.0, 0.08, 0.88]} />
        <meshStandardMaterial color="#6e8f9e" roughness={0.85} />
      </mesh>
      {/* Pillow near headboard (-X) */}
      <mesh position={[-0.55, 0.5, 0]} castShadow>
        <boxGeometry args={[0.35, 0.12, 0.55]} />
        <meshStandardMaterial color="#f2efe8" roughness={0.9} />
      </mesh>
      <mesh position={[-0.82, 0.55, 0]} castShadow>
        <boxGeometry args={[0.08, 0.7, 1.05]} />
        <meshStandardMaterial color="#4a362c" roughness={0.65} />
      </mesh>

      {!occupied && (
        <Html
          position={[0.2, 1.05, 0]}
          center
          distanceFactor={10}
          style={{ pointerEvents: 'none' }}
          zIndexRange={[10, 0]}
        >
          <div className={`hotspot-label ${highlighted ? 'is-hot' : ''}`}>
            Bed · Sleep
          </div>
        </Html>
      )}

      <mesh position={[0, 0.4, 0]} visible={false}>
        <boxGeometry args={[1.7, 0.9, 1.1]} />
      </mesh>
    </group>
  )
}
