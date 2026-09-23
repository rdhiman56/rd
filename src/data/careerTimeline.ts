import { portfolio } from './portfolio'
import type { ExperienceRole, Project } from './types'

/**
 * Career timeline — derived from resume employment + project attributions only.
 * Technologies listed on a stage come only from projects whose companyContext
 * matches that employer (or empty when the resume does not list stack for that role).
 */

export interface CareerTimelineProject {
  id: string
  name: string
  period?: string
  stack: string[]
  responsibilities: string[]
  url?: string
  isPersonal?: boolean
}

export interface CareerTimelineStage {
  id: string
  experienceId: string
  company: string
  role: string
  location: string
  start: string
  end: string
  note?: string
  /** Visual career-era label for progression narrative */
  eraLabel: string
  /** Technologies evidenced by resume-linked projects for this employer only */
  technologies: string[]
  projects: CareerTimelineProject[]
}

/**
 * Technology evolution markers for the progression rail.
 * Labels follow resume-supported themes; AI/GenAI is from skills/interests,
 * not attributed to any employer.
 */
export interface TechProgressionMarker {
  id: string
  label: string
  /** Stage id this marker sits near on the rail */
  stageId: string
  /** When true, shown as current exploration — not employer-claimed */
  isExploration?: boolean
}

const PROJECTS_BY_EXPERIENCE: Record<string, string[]> = {
  hdfc: [],
  techm: ['telekom', 'ses', 'icc', 'bluemarble', 'bison'],
  capco: ['vscreen', 'raid', 'windex'],
  mindtree: ['sc-johnson'],
  kabuni: ['kabuni-project'],
  onestop: [],
  'ludhiana-beverages': [],
}

/** Chronological order (earliest → latest) for left-to-right timeline */
const STAGE_ORDER = [
  'ludhiana-beverages',
  'onestop',
  'kabuni',
  'mindtree',
  'capco',
  'techm',
  'hdfc',
] as const

const ERA_BY_EXPERIENCE: Record<string, string> = {
  'ludhiana-beverages': 'Early Web Development',
  onestop: 'Front-End Development',
  kabuni: 'HTML / CSS / JavaScript',
  mindtree: 'HTML / CSS / JavaScript',
  capco: 'HTML / CSS / JavaScript',
  techm: 'React · E-commerce · GraphQL / REST',
  hdfc: 'Enterprise Applications',
}

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b))
}

function projectsForExperience(experienceId: string): Project[] {
  const ids = PROJECTS_BY_EXPERIENCE[experienceId] ?? []
  return ids
    .map((id) => portfolio.projects.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p))
}

function toTimelineProject(project: Project): CareerTimelineProject {
  return {
    id: project.id,
    name: project.name,
    period: project.period,
    stack: [...project.stack],
    responsibilities: [...project.responsibilities],
    url: project.url,
    isPersonal: project.isPersonal,
  }
}

function buildStage(role: ExperienceRole): CareerTimelineStage {
  const linked = projectsForExperience(role.id)
  const technologies = uniqueSorted(linked.flatMap((p) => p.stack))

  return {
    id: role.id,
    experienceId: role.id,
    company: role.company,
    role: role.title,
    location: role.location,
    start: role.start,
    end: role.end,
    note: role.note,
    eraLabel: ERA_BY_EXPERIENCE[role.id] ?? 'Career',
    technologies,
    projects: linked.map(toTimelineProject),
  }
}

/** Employment stages in chronological order */
export const careerTimelineStages: CareerTimelineStage[] = STAGE_ORDER.map(
  (id) => {
    const role = portfolio.experience.find((e) => e.id === id)
    if (!role) {
      throw new Error(`Missing experience role for timeline stage: ${id}`)
    }
    return buildStage(role)
  },
)

/**
 * Progression rail — communicates technology evolution visually.
 * One Stop era label references WordPress/CMS because resume WordPress projects
 * (Yugmarg, Gta5theshop, Mediaclues) fall in that period; they are NOT attached
 * as employer tech unless companyContext exists (none do for WordPress projects).
 */
export const techProgressionMarkers: TechProgressionMarker[] = [
  { id: 'early-web', label: 'Early Web Development', stageId: 'ludhiana-beverages' },
  { id: 'wordpress-cms', label: 'WordPress / CMS', stageId: 'onestop' },
  { id: 'html-css-js', label: 'HTML / CSS / JavaScript', stageId: 'kabuni' },
  { id: 'react', label: 'React', stageId: 'techm' },
  { id: 'ecommerce', label: 'E-commerce', stageId: 'techm' },
  { id: 'graphql-rest', label: 'GraphQL / REST', stageId: 'techm' },
  { id: 'enterprise', label: 'Enterprise Applications', stageId: 'hdfc' },
  { id: 'hdfc-bank', label: 'HDFC Bank', stageId: 'hdfc' },
  {
    id: 'ai-genai',
    label: 'AI / GenAI',
    stageId: 'hdfc',
    isExploration: true,
  },
]

/** WordPress projects from resume (no employer companyContext) — shown in detail when relevant era selected */
export const wordpressProjectsUnaffiliated: CareerTimelineProject[] =
  portfolio.projects
    .filter((p) => p.stack.includes('Wordpress') && !p.companyContext)
    .map(toTimelineProject)

export function getCareerStage(id: string): CareerTimelineStage | undefined {
  return careerTimelineStages.find((s) => s.id === id)
}
