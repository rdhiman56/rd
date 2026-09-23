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
      <header className="hero-overlay__brand">
        <p className="hero-overlay__eyebrow">Developer Workspace</p>
        <h1 className="hero-overlay__name">{personal.name}</h1>
        <p className="hero-overlay__title">{personal.title}</p>
        <p className="hero-overlay__meta">
          {personal.experienceYears} years of experience
        </p>
      </header>

      <nav className="hero-overlay__actions" aria-label="Primary">
        <button
          type="button"
          className="btn btn--primary"
          onClick={isExploring ? onExitExplore : onExplore}
        >
          {isExploring ? 'Exit Explore' : 'Explore Workspace'}
        </button>
      </nav>

      {!isMonitorFocused && (
        <p className="hero-overlay__hint">
          Click the computer monitor to open the desktop — Resume, GitHub,
          LinkedIn icons are clickable there
        </p>
      )}

      {isMonitorFocused && (
        <p className="hero-overlay__hint">
          Click icons on the desktop · Backdrop or red menu dot to close
        </p>
      )}
    </div>
  )
}
