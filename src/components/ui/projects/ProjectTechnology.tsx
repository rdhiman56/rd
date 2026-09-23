import type { PortfolioProject } from '../../../data/projects'
import '../../../styles/projects.css'

type ProjectTechnologyProps = {
  stack: string[]
  compact?: boolean
}

export function ProjectTechnology({ stack, compact = false }: ProjectTechnologyProps) {
  if (!stack.length) {
    return (
      <p className="project-tech project-tech--empty">
        Technology stack not listed on resume
      </p>
    )
  }

  const visible = compact ? stack.slice(0, 4) : stack
  const hiddenCount = compact ? Math.max(0, stack.length - visible.length) : 0

  return (
    <ul
      className={`project-tech ${compact ? 'project-tech--compact' : ''}`}
      aria-label="Technology stack"
    >
      {visible.map((tech) => (
        <li key={tech}>{tech}</li>
      ))}
      {hiddenCount > 0 ? <li className="is-more">+{hiddenCount}</li> : null}
    </ul>
  )
}

type ProjectTypeBadgeProps = {
  project: PortfolioProject
}

export function ProjectTypeBadge({ project }: ProjectTypeBadgeProps) {
  const label =
    project.projectType === 'personal'
      ? 'Personal'
      : project.projectType === 'placeholder'
        ? 'Current role'
        : 'Professional'

  return <span className="project-type-badge">{label}</span>
}
