import { useMemo } from 'react'
import * as THREE from 'three'

/**
 * Desk accessories + subtle personal-interest objects
 * (cricket, badminton, fitness, travel) — decorative only for this foundation pass.
 */
export function DeskAccessories() {
  const matteBlack = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a1e',
        roughness: 0.55,
        metalness: 0.35,
      }),
    [],
  )

  const softGrey = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2c2c32',
        roughness: 0.6,
        metalness: 0.2,
      }),
    [],
  )

  const warmMetal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#8a7a68',
        roughness: 0.35,
        metalness: 0.75,
      }),
    [],
  )

  return (
    <group>
      <Keyboard material={matteBlack} keyMat={softGrey} />
      <Mouse material={matteBlack} />
      <Phone material={matteBlack} />
      <DeskLamp metal={warmMetal} />
      <Notebook material={softGrey} />
      <Mug material={softGrey} />
      <CricketBall />
      <Shuttlecock />
      <Dumbbell metal={warmMetal} />
      <TravelCamera material={matteBlack} />
    </group>
  )
}

function Keyboard({
  material,
  keyMat,
}: {
  material: THREE.MeshStandardMaterial
  keyMat: THREE.MeshStandardMaterial
}) {
  return (
    <group position={[-0.15, 0.76, 0.28]} rotation={[0.02, 0.05, 0]}>
      <mesh castShadow receiveShadow material={material}>
        <boxGeometry args={[0.72, 0.025, 0.26]} />
      </mesh>
      {/* Keycap row suggestion */}
      {[-0.08, 0, 0.08].map((z, row) =>
        Array.from({ length: 12 }, (_, i) => (
          <mesh
            key={`${row}-${i}`}
            position={[-0.3 + i * 0.055, 0.016, z]}
            material={keyMat}
          >
            <boxGeometry args={[0.045, 0.01, 0.045]} />
          </mesh>
        )),
      )}
    </group>
  )
}

function Mouse({ material }: { material: THREE.MeshStandardMaterial }) {
  return (
    <group position={[0.42, 0.775, 0.32]} rotation={[0, -0.2, 0]}>
      <mesh castShadow material={material}>
        <capsuleGeometry args={[0.028, 0.06, 6, 12]} />
      </mesh>
      <mesh position={[0, 0.012, -0.01]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 0.03, 8]} />
        <meshStandardMaterial color="#3a3a42" roughness={0.4} metalness={0.2} />
      </mesh>
    </group>
  )
}

function Phone({ material }: { material: THREE.MeshStandardMaterial }) {
  return (
    <group position={[0.85, 0.78, 0.15]} rotation={[0, -0.4, 0]}>
      <mesh castShadow material={material}>
        <boxGeometry args={[0.07, 0.012, 0.14]} />
      </mesh>
      <mesh position={[0, 0.007, 0]}>
        <planeGeometry args={[0.058, 0.12]} />
        <meshStandardMaterial
          color="#0a1520"
          emissive="#1a4060"
          emissiveIntensity={0.25}
          roughness={0.25}
        />
      </mesh>
    </group>
  )
}

function DeskLamp({ metal }: { metal: THREE.MeshStandardMaterial }) {
  const target = useMemo(() => {
    const obj = new THREE.Object3D()
    // Local to lamp group: aim toward keyboard / desk center
    obj.position.set(0.9, -0.05, 0.55)
    return obj
  }, [])

  return (
    <group position={[-0.95, 0.75, -0.25]}>
      <primitive object={target} />
      <mesh castShadow material={metal} position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.02, 24]} />
      </mesh>
      <mesh castShadow material={metal} position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.32, 12]} />
      </mesh>
      <mesh
        castShadow
        material={metal}
        position={[0.08, 0.34, 0.05]}
        rotation={[0.5, 0.4, 0.2]}
      >
        <cylinderGeometry args={[0.01, 0.01, 0.22, 12]} />
      </mesh>
      <mesh
        castShadow
        position={[0.16, 0.28, 0.12]}
        rotation={[1.1, 0.3, 0]}
      >
        <coneGeometry args={[0.08, 0.1, 24, 1, true]} />
        <meshStandardMaterial
          color="#2a241c"
          roughness={0.5}
          metalness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      <spotLight
        position={[0.16, 0.28, 0.12]}
        target={target}
        angle={0.55}
        penumbra={0.55}
        intensity={2.2}
        distance={3.5}
        color="#ffd7a8"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      />
      <pointLight
        position={[0.18, 0.24, 0.14]}
        intensity={0.35}
        distance={1.2}
        color="#ffc98a"
      />
    </group>
  )
}

function Notebook({ material }: { material: THREE.MeshStandardMaterial }) {
  return (
    <group position={[0.7, 0.765, -0.15]} rotation={[0, -0.35, 0]}>
      <mesh castShadow receiveShadow material={material}>
        <boxGeometry args={[0.18, 0.015, 0.24]} />
      </mesh>
      <mesh position={[0, 0.009, 0]}>
        <planeGeometry args={[0.16, 0.22]} />
        <meshStandardMaterial color="#d8d2c4" roughness={0.85} />
      </mesh>
    </group>
  )
}

function Mug({ material }: { material: THREE.MeshStandardMaterial }) {
  return (
    <group position={[-0.65, 0.75, 0.2]}>
      <mesh castShadow material={material} position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.035, 0.032, 0.09, 24]} />
      </mesh>
      <mesh position={[0.045, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.025, 0.006, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#2c2c32" roughness={0.55} metalness={0.2} />
      </mesh>
    </group>
  )
}

/** Cricket-related object */
function CricketBall() {
  return (
    <mesh
      position={[0.95, 0.785, -0.35]}
      castShadow
      rotation={[0.3, 0.5, 0.2]}
    >
      <sphereGeometry args={[0.035, 24, 24]} />
      <meshStandardMaterial color="#6b1c1c" roughness={0.7} metalness={0.05} />
    </mesh>
  )
}

/** Badminton-related object */
function Shuttlecock() {
  return (
    <group position={[-1.05, 0.78, 0.35]} rotation={[0.2, 0.6, 0.1]}>
      <mesh castShadow>
        <coneGeometry args={[0.028, 0.06, 12]} />
        <meshStandardMaterial color="#e8e4dc" roughness={0.75} metalness={0.05} />
      </mesh>
      <mesh position={[0, -0.028, 0]}>
        <sphereGeometry args={[0.014, 12, 12]} />
        <meshStandardMaterial color="#c9a227" roughness={0.45} metalness={0.3} />
      </mesh>
    </group>
  )
}

/** Fitness-related object */
function Dumbbell({ metal }: { metal: THREE.MeshStandardMaterial }) {
  return (
    <group position={[-0.85, 0.79, 0.4]} rotation={[0, 0.4, 0.05]}>
      <mesh castShadow material={metal}>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 12]} />
      </mesh>
      <mesh position={[0, 0.055, 0]} castShadow material={metal}>
        <cylinderGeometry args={[0.022, 0.022, 0.025, 16]} />
      </mesh>
      <mesh position={[0, -0.055, 0]} castShadow material={metal}>
        <cylinderGeometry args={[0.022, 0.022, 0.025, 16]} />
      </mesh>
    </group>
  )
}

/** Travel-related object */
function TravelCamera({ material }: { material: THREE.MeshStandardMaterial }) {
  return (
    <group position={[1.0, 0.785, 0.38]} rotation={[0, -0.55, 0]}>
      <mesh castShadow material={material}>
        <boxGeometry args={[0.09, 0.055, 0.05]} />
      </mesh>
      <mesh position={[0, 0.005, 0.03]} castShadow>
        <cylinderGeometry args={[0.018, 0.02, 0.03, 24]} />
        <meshStandardMaterial color="#111114" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.005, 0.04]}>
        <circleGeometry args={[0.012, 24]} />
        <meshStandardMaterial
          color="#1a3040"
          emissive="#2a5068"
          emissiveIntensity={0.2}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}
