import { roomLayout } from '../../data/roomLayout'

/** Cozy bedroom shell — spacious floor, walls, window glow */
export function Room() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[6.5, 5.2]} />
        <meshStandardMaterial color="#3d342c" roughness={0.9} metalness={0.02} />
      </mesh>

      {/* Soft rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.2, 0.01, 0.35]} receiveShadow>
        <planeGeometry args={[2.4, 1.8]} />
        <meshStandardMaterial color="#5c4a3a" roughness={1} metalness={0} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 1.4, -2.35]} receiveShadow>
        <planeGeometry args={[6.5, 2.8]} />
        <meshStandardMaterial color="#d8cfc3" roughness={0.95} metalness={0} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-3.25, 1.4, 0.1]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[5.2, 2.8]} />
        <meshStandardMaterial color="#cfc6ba" roughness={0.95} metalness={0} />
      </mesh>

      {/* Right wall */}
      <mesh position={[3.25, 1.4, 0.1]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[5.2, 2.8]} />
        <meshStandardMaterial color="#cfc6ba" roughness={0.95} metalness={0} />
      </mesh>

      {/* Window glow */}
      <mesh position={[-0.2, 1.55, -2.33]}>
        <planeGeometry args={[1.5, 1.2]} />
        <meshStandardMaterial color="#6b5a4a" roughness={0.7} />
      </mesh>
      <mesh position={[-0.2, 1.55, -2.32]}>
        <planeGeometry args={[1.35, 1.05]} />
        <meshStandardMaterial
          color="#9ec8e6"
          emissive="#7eb6d4"
          emissiveIntensity={0.55}
          roughness={0.4}
        />
      </mesh>

      {/* Nightstand near bed */}
      <mesh position={[-2.45, 0.28, -0.55]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.55, 0.4]} />
        <meshStandardMaterial color="#5a4638" roughness={0.65} metalness={0.05} />
      </mesh>
      <pointLight
        position={[-2.45, 0.7, -0.55]}
        intensity={0.45}
        distance={2.5}
        color="#ffd2a1"
      />

      {/* Tiny plant */}
      <mesh position={[2.2, 0.35, -1.8]} castShadow>
        <cylinderGeometry args={[0.12, 0.14, 0.2, 12]} />
        <meshStandardMaterial color="#6b4f3a" roughness={0.8} />
      </mesh>
      <mesh position={[2.2, 0.6, -1.8]} castShadow>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial color="#3f6b4a" roughness={0.85} />
      </mesh>

      {/* Marker for layout reference (invisible helpers avoided) */}
      <group position={roomLayout.desk} />
    </group>
  )
}
