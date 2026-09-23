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
      const href = app.getHref()
      window.open(href, '_blank', 'noopener,noreferrer')
      return
    }

    if (app.section) {
      onNavigate(app.section)
    }
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
            aria-label="Close computer view"
            onClick={onClose}
            disabled={!interactive}
            title="Close computer"
          >
            ●
          </button>
          <span className="os__menubar-app">
            {isDesktop ? 'Finder' : (openApp?.label ?? 'RahulOS')}
          </span>
        </div>
        <div className="os__menubar-right">
          <span className="os__menubar-user">{portfolio.personal.name}</span>
          <span className="os__menubar-clock">Local</span>
        </div>
      </header>

      <div className="os__desktop">
        {isDesktop ? (
          <HomeDesktop
            interactive={interactive}
            onLaunch={launchApp}
            personalName={portfolio.personal.name}
            personalTitle={portfolio.personal.title}
          />
        ) : (
          <AppWindow
            title={openApp?.label ?? 'App'}
            tint={openApp?.tint}
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
  personalName,
  personalTitle,
}: {
  interactive: boolean
  onLaunch: (app: DesktopApp) => void
  personalName: string
  personalTitle: string
}) {
  const homeApps = desktopApps.filter((app) => app.showOnHome)

  return (
    <div className="os-home">
      <div className="os-home__hero">
        <p className="os-home__eyebrow">RahulOS · Click any icon</p>
        <h2 className="os-home__name">{personalName}</h2>
        <p className="os-home__title">{personalTitle}</p>
      </div>

      <div className="os-home__grid" role="list" aria-label="Applications">
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
      title={
        app.kind === 'external'
          ? `Open ${app.label} in a new tab`
          : `Open ${app.label}`
      }
    >
      <span
        className="os-icon__tile"
        style={{
          background: `linear-gradient(145deg, ${c1}, ${c2})`,
        }}
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
  tint,
  onClose,
  interactive,
  children,
}: {
  title: string
  tint?: [string, string]
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
            aria-label="Back to desktop"
            onClick={onClose}
            disabled={!interactive}
          />
          <span className="os-window__dot os-window__dot--min" />
          <span className="os-window__dot os-window__dot--max" />
        </div>
        <p className="os-window__title">{title}</p>
        <span
          className="os-window__accent"
          style={{
            background: tint
              ? `linear-gradient(90deg, ${tint[0]}, ${tint[1]})`
              : undefined,
          }}
          aria-hidden
        />
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
              <p className="os-panel__text">
                Click Download or Open — this is the authoritative resume PDF.
              </p>
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
                Open in Tab
              </a>
            </div>
          </div>
          <div className="os-resume-preview">
            <iframe
              title="Rahul Dhiman Resume PDF"
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
          <p className="os-panel__eyebrow">Background</p>
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
          <p className="os-panel__eyebrow">Credentials</p>
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
          <p className="os-panel__eyebrow">Reach out</p>
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
