import type { PortfolioProject } from '../../../data/projects'
import { ProjectTechnology, ProjectTypeBadge } from './ProjectTechnology'

type ProjectCardProps = {
  project: PortfolioProject
  index?: number
  interactive?: boolean
  onOpen: (id: string) => void
}

export function ProjectCard({
  project,
  index = 0,
  interactive = true,
  onOpen,
}: ProjectCardProps) {
  return (
    <article
      className={`project-card ${project.featured ? 'is-featured' : ''}`}
      style={{ ['--i' as string]: index }}
    >
      <header className="project-card__header">
        <div className="project-card__meta">
          <ProjectTypeBadge project={project} />
          {project.period ? (
            <span className="project-card__period">{project.period}</span>
          ) : (
            <span className="project-card__period is-muted">Period not listed</span>
          )}
        </div>
        <h3 className="project-card__name">{project.name}</h3>
        {project.companyContext ? (
          <p className="project-card__context">{project.companyContext}</p>
        ) : null}
      </header>

      <p className="project-card__desc">
        {project.description ||
          (project.detailsPending
            ? 'Additional project details will be added when available.'
            : 'Description not listed on resume.')}
      </p>

      <ProjectTechnology stack={project.stack} compact />

      <footer className="project-card__footer">
        <button
          type="button"
          className="os-btn os-btn--primary"
          disabled={!interactive}
          onClick={() => onOpen(project.id)}
        >
          View Details
        </button>
      </footer>
    </article>
  )
}
