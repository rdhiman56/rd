import { Desk } from './Desk'
import { Monitor } from './Monitor'
import { DeskAccessories } from './DeskAccessories'
import { Lighting } from './Lighting'

type WorkspaceProps = {
  isExploring?: boolean
  isMonitorFocused: boolean
  onMonitorFocus: () => void
}

export function Workspace({
  isExploring = false,
  isMonitorFocused,
  onMonitorFocus,
}: WorkspaceProps) {
  return (
    <group>
      <Lighting isExploring={isExploring || isMonitorFocused} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#12151a"
          roughness={0.92}
          metalness={0.05}
        />
      </mesh>

      <mesh position={[0, 2, -3.2]} receiveShadow>
        <planeGeometry args={[14, 6]} />
        <meshStandardMaterial
          color="#151920"
          roughness={0.95}
          metalness={0.02}
        />
      </mesh>

      <Desk />
      <Monitor
        isExploring={isExploring}
        isFocused={isMonitorFocused}
        onFocus={onMonitorFocus}
      />
      <DeskAccessories />
    </group>
  )
}
