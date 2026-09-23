import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { desktopApps } from '../../data'
import '../../styles/computer.css'

const FRAME = '#141416'
const BEZEL = '#0a0a0c'
const STAND = '#1c1c20'

type MonitorProps = {
  isExploring?: boolean
  isFocused: boolean
  onFocus: () => void
}

/**
 * 3D monitor is visual + click-to-open only.
 * Actual Resume / GitHub / LinkedIn clicks happen in ComputerScreenOverlay (DOM).
 */
export function Monitor({
  isExploring = false,
  isFocused,
  onFocus,
}: MonitorProps) {
  const glowRef = useRef<THREE.PointLight>(null)

  const frameMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: FRAME,
        roughness: 0.4,
        metalness: 0.65,
      }),
    [],
  )

  const standMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: STAND,
        roughness: 0.35,
        metalness: 0.7,
      }),
    [],
  )

  useFrame(({ clock }) => {
    if (!glowRef.current) return
    const pulse = Math.sin(clock.elapsedTime * 0.6) * 0.04
    const base = isFocused ? 0.55 : isExploring ? 0.45 : 0.32
    glowRef.current.intensity = base + pulse
  })

  const previewIcons = desktopApps.filter((app) => app.showOnHome).slice(0, 8)

  return (
    <group position={[0, 0.75, -0.28]}>
      <mesh position={[0, 0.42, 0]} castShadow material={frameMat}>
        <boxGeometry args={[1.12, 0.68, 0.04]} />
      </mesh>

      <mesh position={[0, 0.42, 0.021]}>
        <planeGeometry args={[1.06, 0.62]} />
        <meshStandardMaterial color={BEZEL} roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Always-clickable focus target (no Html blocking) */}
      {!isFocused && (
        <mesh
          position={[0, 0.42, 0.023]}
          onClick={(e) => {
            e.stopPropagation()
            onFocus()
          }}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto'
          }}
        >
          <planeGeometry args={[1.02, 0.58]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}

      {/* Visual preview only — not for clicking */}
      {!isFocused && (
        <Html
          transform
          position={[0, 0.42, 0.024]}
          scale={0.105}
          style={{
            width: '960px',
            height: '540px',
            pointerEvents: 'none',
          }}
          pointerEvents="none"
        >
          <div className="os os--idle os--preview">
            <div className="os__menubar">
              <div className="os__menubar-left">
                <span className="os__apple" aria-hidden>
                  
                </span>
                <span className="os__menubar-app">Finder</span>
              </div>
              <div className="os__menubar-right">
                <span className="os__menubar-clock">Click to open</span>
              </div>
            </div>
            <div className="os__desktop">
              <div className="os-home">
                <div className="os-home__icons">
                  {previewIcons.map((app) => {
                    const [c1, c2] = app.tint
                    return (
                      <div key={app.id} className="os-icon">
                        <span
                          className="os-icon__tile"
                          style={{
                            background: `linear-gradient(160deg, ${c1}, ${c2})`,
                          }}
                        >
                          <span className="os-icon__glyph">{app.glyph}</span>
                        </span>
                        <span className="os-icon__label">{app.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </Html>
      )}

      <pointLight
        ref={glowRef}
        position={[0, 0.42, 0.2]}
        intensity={0.35}
        distance={2.2}
        color="#7eb6d9"
      />

      <mesh position={[0, 0.08, -0.02]} castShadow material={standMat}>
        <cylinderGeometry args={[0.035, 0.045, 0.18, 16]} />
      </mesh>

      <mesh
        position={[0, 0.01, 0.02]}
        castShadow
        material={standMat}
        rotation={[-0.05, 0, 0]}
      >
        <cylinderGeometry args={[0.18, 0.22, 0.025, 32]} />
      </mesh>
    </group>
  )
}
