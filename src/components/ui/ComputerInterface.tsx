import type { ReactNode } from 'react'
import { portfolio, desktopApps, getResumeUrl } from '../../data'
import type { ComputerSectionId, DesktopApp } from '../../data'
import { CareerTimeline } from './CareerTimeline'
import { SkillsWorkspace } from './SkillsWorkspace'
import { ProjectExplorer } from './projects'
import '../../styles/computer.css'

type ComputerInterfaceProps = {
  activeSection: ComputerSectionId
  onNavigate: (section: ComputerSectionId) => void
  onClose: () => void
  interactive?: boolean
}

export function ComputerInterface({
  activeSection,
  onNavigate,
  onClose,
  interactive = true,
}: ComputerInterfaceProps) {
  const resumeUrl = getResumeUrl()
  const isDesktop = activeSection === 'home'
  const openApp = desktopApps.find(
    (app) => app.section === activeSection && app.kind === 'window',
  )

  const launchApp = (app: DesktopApp) => {
    if (!interactive) return

    if (app.kind === 'external' && app.getHref) {
      window.open(app.getHref(), '_blank', 'noopener,noreferrer')
      return
    }

    if (app.section) onNavigate(app.section)
  }

  return (
    <div
      className={`os ${interactive ? 'os--interactive' : 'os--idle'}`}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <header className="os__menubar">
        <div className="os__menubar-left">
          <button
            type="button"
            className="os__apple"
            aria-label="Close computer"
            onClick={onClose}
            disabled={!interactive}
            title="Close"
          >
            
          </button>
          <span className="os__menubar-app">
            {isDesktop ? 'Finder' : (openApp?.label ?? 'App')}
          </span>
        </div>
        <div className="os__menubar-right">
          <span className="os__menubar-clock">
            {portfolio.personal.name.split(' ')[0]}
          </span>
        </div>
      </header>

      <div className="os__desktop">
        {/* Desktop icons always visible underneath */}
        <HomeDesktop interactive={interactive} onLaunch={launchApp} />

        {!isDesktop && openApp && (
          <AppWindow
            title={openApp.label}
            onClose={() => onNavigate('home')}
            interactive={interactive}
          >
            <SectionView
              section={activeSection}
              resumeUrl={resumeUrl}
              interactive={interactive}
            />
          </AppWindow>
        )}

        <Dock
          activeSection={activeSection}
          interactive={interactive}
          onLaunch={launchApp}
        />
      </div>
    </div>
  )
}

function HomeDesktop({
  interactive,
  onLaunch,
}: {
  interactive: boolean
  onLaunch: (app: DesktopApp) => void
}) {
  const homeApps = desktopApps.filter((app) => app.showOnHome)

  return (
    <div className="os-home">
      <div className="os-home__icons" role="list" aria-label="Desktop icons">
        {homeApps.map((app) => (
          <AppIcon
            key={app.id}
            app={app}
            interactive={interactive}
            onLaunch={() => onLaunch(app)}
          />
        ))}
      </div>
    </div>
  )
}

function Dock({
  activeSection,
  interactive,
  onLaunch,
}: {
  activeSection: ComputerSectionId
  interactive: boolean
  onLaunch: (app: DesktopApp) => void
}) {
  const dockApps = desktopApps.filter((app) => app.showInDock)

  return (
    <nav className="os-dock" aria-label="Dock">
      <div className="os-dock__inner">
        {dockApps.map((app) => {
          const isActive =
            app.kind !== 'external' && app.section === activeSection
          return (
            <AppIcon
              key={app.id}
              app={app}
              compact
              active={isActive}
              interactive={interactive}
              onLaunch={() => onLaunch(app)}
            />
          )
        })}
      </div>
    </nav>
  )
}

function AppIcon({
  app,
  interactive,
  onLaunch,
  compact = false,
  active = false,
}: {
  app: DesktopApp
  interactive: boolean
  onLaunch: () => void
  compact?: boolean
  active?: boolean
}) {
  const [c1, c2] = app.tint

  return (
    <button
      type="button"
      role="listitem"
      className={`os-icon ${compact ? 'os-icon--dock' : ''} ${
        active ? 'is-active' : ''
      }`}
      disabled={!interactive}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onLaunch()
      }}
      title={app.label}
    >
      <span
        className="os-icon__tile"
        style={{ background: `linear-gradient(160deg, ${c1}, ${c2})` }}
      >
        <span className="os-icon__glyph">{app.glyph}</span>
      </span>
      {!compact && <span className="os-icon__label">{app.label}</span>}
      {compact && active ? <span className="os-icon__dot" aria-hidden /> : null}
    </button>
  )
}

function AppWindow({
  title,
  onClose,
  interactive,
  children,
}: {
  title: string
  onClose: () => void
  interactive: boolean
  children: ReactNode
}) {
  return (
    <div className="os-window">
      <header className="os-window__chrome">
        <div className="os-window__traffic">
          <button
            type="button"
            className="os-window__dot os-window__dot--close"
            aria-label="Close window"
            onClick={onClose}
            disabled={!interactive}
          />
          <span className="os-window__dot os-window__dot--min" />
          <span className="os-window__dot os-window__dot--max" />
        </div>
        <p className="os-window__title">{title}</p>
      </header>
      <div className="os-window__body">{children}</div>
    </div>
  )
}

function SectionView({
  section,
  resumeUrl,
  interactive,
}: {
  section: ComputerSectionId
  resumeUrl: string
  interactive: boolean
}) {
  const { personal, social, education, certifications } = portfolio

  switch (section) {
    case 'home':
      return null

    case 'resume':
      return (
        <div className="os-panel os-panel--resume">
          <div className="os-panel__header-row">
            <div>
              <p className="os-panel__eyebrow">Documents</p>
              <h2 className="os-panel__title">Resume.pdf</h2>
            </div>
            <div className="os-actions">
              <a
                className="os-btn os-btn--primary"
                href={resumeUrl}
                download="Rahul_Dhiman_Resume.pdf"
              >
                Download
              </a>
              <a
                className="os-btn"
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open
              </a>
            </div>
          </div>
          <div className="os-resume-preview">
            <iframe
              title="Resume PDF"
              src={resumeUrl}
              className="os-resume-preview__frame"
            />
          </div>
        </div>
      )

    case 'experience':
      return <CareerTimeline interactive={interactive} />

    case 'projects':
      return <ProjectExplorer interactive={interactive} />

    case 'skills':
      return <SkillsWorkspace interactive={interactive} />

    case 'education':
      return (
        <div className="os-panel">
          <p className="os-panel__eyebrow">Education</p>
          <h2 className="os-panel__title">Education</h2>
          <ul className="os-list">
            {education.map((item) => (
              <li key={item.id} className="os-list__item">
                <strong>{item.credential}</strong>
                <span>
                  {item.institution} · {item.location}
                </span>
                <span className="os-list__meta">
                  {item.start} – {item.end}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'certifications':
      return (
        <div className="os-panel">
          <p className="os-panel__eyebrow">Certifications</p>
          <h2 className="os-panel__title">Certifications</h2>
          <ul className="os-list">
            {certifications.map((cert) => (
              <li key={cert.id} className="os-list__item">
                <strong>{cert.title}</strong>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'contact':
      return (
        <div className="os-panel">
          <p className="os-panel__eyebrow">Contact</p>
          <h2 className="os-panel__title">Contact</h2>
          <ul className="os-list">
            <li className="os-list__item">
              <strong>Email</strong>
              <a href={`mailto:${personal.email}`}>{personal.email}</a>
            </li>
            <li className="os-list__item">
              <strong>Phone</strong>
              <span>{personal.phone}</span>
            </li>
            <li className="os-list__item">
              <strong>Location</strong>
              <span>{personal.location}</span>
            </li>
            <li className="os-list__item">
              <strong>GitHub</strong>
              <a href={social.github} target="_blank" rel="noopener noreferrer">
                {social.githubUsername}
              </a>
            </li>
            <li className="os-list__item">
              <strong>LinkedIn</strong>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                Profile
              </a>
            </li>
          </ul>
        </div>
      )

    default:
      return null
  }
}
