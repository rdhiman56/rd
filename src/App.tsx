import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { HeroOverlay } from './components/ui/HeroOverlay'
import { ComputerScreenOverlay } from './components/ui/ComputerScreenOverlay'
import { RoomHud } from './components/ui/RoomHud'
import { useWorkspaceUi } from './hooks/useWorkspaceUi'
import { useCharacter } from './hooks/useCharacter'
import './styles/app.css'

const WorkspaceScene = lazy(() =>
  import('./scenes/WorkspaceScene').then((m) => ({
    default: m.WorkspaceScene,
  })),
)

export default function App() {
  const {
    isExploring,
    isMonitorFocused,
    activeSection,
    setActiveSection,
    enterExplore,
    exitExplore,
    focusMonitor,
    blurMonitor,
  } = useWorkspaceUi()

  const character = useCharacter()
  const [highlight, setHighlight] = useState<'none' | 'chair' | 'bed' | 'mac'>(
    'none',
  )

  useEffect(() => {
    if (character.energy < 25 && character.pose !== 'sleeping') {
      character.setFeedback(
        'Feeling tired — click the bed to sleep and restore energy',
      )
      setHighlight('bed')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only react to energy/pose
  }, [character.energy, character.pose])

  const openMac = useCallback(() => {
    enterExplore()
    focusMonitor()
    character.setFeedback('Mac desktop open · click icons')
    setHighlight('mac')
  }, [enterExplore, focusMonitor, character])

  const handleMacClick = useCallback(() => {
    enterExplore()
    const ready = character.goUseMac()
    if (ready) openMac()
    else setHighlight('mac')
  }, [character, enterExplore, openMac])

  const handleArrivedUseMac = useCallback(() => {
    openMac()
  }, [openMac])

  const handleChairClick = useCallback(() => {
    enterExplore()
    setHighlight('chair')
    character.goSit()
  }, [character, enterExplore])

  const handleBedClick = useCallback(() => {
    enterExplore()
    setHighlight('bed')
    blurMonitor()
    character.goSleep()
  }, [character, enterExplore, blurMonitor])

  const handleFloorClick = useCallback(
    (x: number, z: number) => {
      enterExplore()
      setHighlight('none')
      if (character.pose === 'sitting' || character.pose === 'sleeping') {
        character.standUp()
      }
      character.walkTo(x, z)
    },
    [character, enterExplore],
  )

  const handleCloseMac = useCallback(() => {
    blurMonitor()
    character.setFeedback('Mac closed · still seated — click floor to walk')
  }, [blurMonitor, character])

  return (
    <div className="app-shell">
      <Suspense fallback={<div className="workspace-fallback" aria-hidden />}>
        <WorkspaceScene
          isExploring={isExploring}
          isMonitorFocused={isMonitorFocused}
          character={character}
          highlight={highlight}
          onFloorClick={handleFloorClick}
          onChairClick={handleChairClick}
          onBedClick={handleBedClick}
          onMacClick={handleMacClick}
          onArrivedUseMac={handleArrivedUseMac}
        />
      </Suspense>

      <HeroOverlay
        isExploring={isExploring}
        isMonitorFocused={isMonitorFocused}
        onExplore={enterExplore}
        onExitExplore={() => {
          exitExplore()
          character.setFeedback('Explore paused')
        }}
      />

      {!isMonitorFocused && (
        <RoomHud
          energy={character.energy}
          feedback={character.feedback}
          pose={character.pose}
          onSit={handleChairClick}
          onSleep={handleBedClick}
          onMac={handleMacClick}
          onStand={() => {
            character.standUp()
            setHighlight('none')
          }}
        />
      )}

      {isMonitorFocused && (
        <ComputerScreenOverlay
          activeSection={activeSection}
          onNavigate={setActiveSection}
          onClose={handleCloseMac}
        />
      )}
    </div>
  )
}
