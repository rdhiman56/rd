import { portfolio } from '../../data'
import '../../styles/overlay.css'

type HeroOverlayProps = {
  isExploring: boolean
  isMonitorFocused: boolean
  onExplore: () => void
  onExitExplore: () => void
}

export function HeroOverlay({
  isExploring,
  isMonitorFocused,
  onExplore,
  onExitExplore,
}: HeroOverlayProps) {
  const { personal } = portfolio
  const dimmed = isExploring || isMonitorFocused

  return (
    <div
      className={`hero-overlay ${dimmed ? 'hero-overlay--exploring' : ''} ${
        isMonitorFocused ? 'hero-overlay--monitor' : ''
      }`}
    >
      {!isMonitorFocused && (
        <header className="hero-overlay__brand">
          <p className="hero-overlay__eyebrow">Cozy Developer Room</p>
          <h1 className="hero-overlay__name">{personal.name}</h1>
          <p className="hero-overlay__title">{personal.title}</p>
          <p className="hero-overlay__meta">
            {personal.experienceYears} years of experience
          </p>
        </header>
      )}

      {!isMonitorFocused && (
        <nav className="hero-overlay__actions" aria-label="Primary">
          <button
            type="button"
            className="btn btn--primary"
            onClick={isExploring ? onExitExplore : onExplore}
          >
            {isExploring ? 'Exit Explore' : 'Explore Room'}
          </button>
        </nav>
      )}

      {!isMonitorFocused && !isExploring && (
        <p className="hero-overlay__hint">
          Walk the character · Sit at the Mac · Open icons · Sleep in bed when tired
        </p>
      )}
    </div>
  )
}
