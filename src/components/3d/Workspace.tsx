import { Room } from './Room'
import { Bed } from './Bed'
import { Chair } from './Chair'
import { MacSetup } from './MacSetup'
import { Character } from './Character'
import { Lighting } from './Lighting'
import type { CharacterApi } from '../../hooks/useCharacter'

type WorkspaceProps = {
  isExploring?: boolean
  isMonitorFocused: boolean
  character: CharacterApi
  highlight: 'none' | 'chair' | 'bed' | 'mac'
  onFloorClick: (x: number, z: number) => void
  onChairClick: () => void
  onBedClick: () => void
  onMacClick: () => void
  onArrivedUseMac: () => void
}

export function Workspace({
  isExploring = false,
  isMonitorFocused,
  character,
  highlight,
  onFloorClick,
  onChairClick,
  onBedClick,
  onMacClick,
  onArrivedUseMac,
}: WorkspaceProps) {
  return (
    <group>
      <Lighting isExploring={isExploring || isMonitorFocused} cozy />

      <Room />

      {/* Clickable floor for walking */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.02, 0.2]}
        onClick={(e) => {
          e.stopPropagation()
          onFloorClick(e.point.x, e.point.z)
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto'
        }}
      >
        <planeGeometry args={[5.8, 4.4]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <Bed
        highlighted={highlight === 'bed'}
        occupied={character.pose === 'sleeping'}
        onClick={onBedClick}
      />
      <Chair
        highlighted={highlight === 'chair'}
        occupied={character.pose === 'sitting'}
        onClick={onChairClick}
      />
      <MacSetup
        highlighted={highlight === 'mac'}
        active={isMonitorFocused || character.pose === 'sitting'}
        onClick={onMacClick}
      />

      <Character api={character} onArrivedUseMac={onArrivedUseMac} />
    </group>
  )
}
