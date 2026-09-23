import { lazy, Suspense } from 'react'
import { HeroOverlay } from './components/ui/HeroOverlay'
import { ComputerScreenOverlay } from './components/ui/ComputerScreenOverlay'
import { useWorkspaceUi } from './hooks/useWorkspaceUi'
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

  return (
    <div className="app-shell">
      <Suspense fallback={<div className="workspace-fallback" aria-hidden />}>
        <WorkspaceScene
          isExploring={isExploring}
          isMonitorFocused={isMonitorFocused}
          onMonitorFocus={focusMonitor}
        />
      </Suspense>

      <HeroOverlay
        isExploring={isExploring}
        isMonitorFocused={isMonitorFocused}
        onExplore={enterExplore}
        onExitExplore={exitExplore}
      />

      {isMonitorFocused && (
        <ComputerScreenOverlay
          activeSection={activeSection}
          onNavigate={setActiveSection}
          onClose={blurMonitor}
        />
      )}
    </div>
  )
}
