import { portfolio } from './portfolio'
import { getResumeUrl } from './paths'

export type ComputerSectionId =
  | 'home'
  | 'resume'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'education'
  | 'certifications'
  | 'contact'

export type DesktopAppId =
  | ComputerSectionId
  | 'github'
  | 'linkedin'
  | 'mail'

export type DesktopAppKind = 'desktop' | 'window' | 'external'

export interface DesktopApp {
  id: DesktopAppId
  label: string
  /** Short glyph shown on the icon */
  glyph: string
  /** Icon gradient colors */
  tint: [string, string]
  kind: DesktopAppKind
  /** Internal section when kind is window/desktop */
  section?: ComputerSectionId
  /** External URL when kind is external */
  getHref?: () => string
  showOnHome?: boolean
  showInDock?: boolean
}

/**
 * macOS / iPad style desktop apps.
 * Resume, social, and portfolio sections launch from icons — not separate buttons.
 */
export const desktopApps: DesktopApp[] = [
  {
    id: 'home',
    label: 'Home',
    glyph: '⌂',
    tint: ['#5b8def', '#3a6fd8'],
    kind: 'desktop',
    section: 'home',
    showOnHome: false,
    showInDock: true,
  },
  {
    id: 'resume',
    label: 'Resume',
    glyph: 'R',
    tint: ['#ff6b4a', '#e2452d'],
    kind: 'window',
    section: 'resume',
    showOnHome: true,
    showInDock: true,
  },
  {
    id: 'experience',
    label: 'Experience',
    glyph: 'E',
    tint: ['#34c759', '#248a3d'],
    kind: 'window',
    section: 'experience',
    showOnHome: true,
    showInDock: true,
  },
  {
    id: 'projects',
    label: 'Projects',
    glyph: 'P',
    tint: ['#af52de', '#7d3cb5'],
    kind: 'window',
    section: 'projects',
    showOnHome: true,
    showInDock: false,
  },
  {
    id: 'skills',
    label: 'Skills',
    glyph: 'S',
    tint: ['#ff9f0a', '#d47800'],
    kind: 'window',
    section: 'skills',
    showOnHome: true,
    showInDock: true,
  },
  {
    id: 'education',
    label: 'Education',
    glyph: 'Ed',
    tint: ['#64d2ff', '#2a9fbf'],
    kind: 'window',
    section: 'education',
    showOnHome: true,
    showInDock: false,
  },
  {
    id: 'certifications',
    label: 'Certificates',
    glyph: 'C',
    tint: ['#ff375f', '#c41e3a'],
    kind: 'window',
    section: 'certifications',
    showOnHome: true,
    showInDock: false,
  },
  {
    id: 'contact',
    label: 'Contact',
    glyph: '@',
    tint: ['#ac8e68', '#8b6f4e'],
    kind: 'window',
    section: 'contact',
    showOnHome: true,
    showInDock: false,
  },
  {
    id: 'github',
    label: 'GitHub',
    glyph: 'GH',
    tint: ['#3a3f46', '#1c1f24'],
    kind: 'external',
    getHref: () => portfolio.social.github,
    showOnHome: true,
    showInDock: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    glyph: 'in',
    tint: ['#0a66c2', '#004182'],
    kind: 'external',
    getHref: () => portfolio.social.linkedin,
    showOnHome: true,
    showInDock: true,
  },
  {
    id: 'mail',
    label: 'Mail',
    glyph: '✉',
    tint: ['#5ac8fa', '#0a84ff'],
    kind: 'external',
    getHref: () => `mailto:${portfolio.personal.email}`,
    showOnHome: true,
    showInDock: true,
  },
]

export interface ComputerNavItem {
  id: ComputerSectionId
  label: string
}

/** Window / home sections only (for legacy consumers) */
export const computerNav: ComputerNavItem[] = desktopApps
  .filter((app) => app.kind !== 'external' && app.section)
  .map((app) => ({
    id: app.section as ComputerSectionId,
    label: app.label,
  }))

export function getDesktopApp(id: DesktopAppId): DesktopApp | undefined {
  return desktopApps.find((app) => app.id === id)
}

export function openResumeExternally(): void {
  window.open(getResumeUrl(), '_blank', 'noopener,noreferrer')
}
