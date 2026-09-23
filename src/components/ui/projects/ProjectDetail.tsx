import type { PortfolioProject } from '../../../data/projects'
import { ProjectTechnology, ProjectTypeBadge } from './ProjectTechnology'

type ProjectDetailProps = {
  project: PortfolioProject
  interactive?: boolean
  onBack: () => void
}

export function ProjectDetail({
  project,
  interactive = true,
  onBack,
}: ProjectDetailProps) {
  return (
    <article className="project-detail">
      <header className="project-detail__header">
        <button
          type="button"
          className="os-btn"
          onClick={onBack}
          disabled={!interactive}
        >
          ← Back
        </button>
        <div className="project-detail__heading">
          <div className="project-detail__meta">
            <ProjectTypeBadge project={project} />
            {project.period ? <span>{project.period}</span> : null}
          </div>
          <h2 className="project-detail__name">{project.name}</h2>
          {project.companyContext ? (
            <p className="project-detail__context">{project.companyContext}</p>
          ) : null}
        </div>
      </header>

      {project.detailsPending ? (
        <div className="project-detail__pending">
          <p>
            Resume lists this role at <strong>HDFC Bank Ltd.</strong> as{' '}
            <strong>Senior Software Engineer Manager</strong> ({project.period}).
          </p>
          <p>
            Project-level responsibilities and technology details are not listed
            on the resume yet. This section is reserved for updates.
          </p>
        </div>
      ) : (
        <>
          <section className="project-detail__section">
            <h3>Overview</h3>
            <p>
              {project.description ||
                'Overview not listed separately on the resume.'}
            </p>
          </section>

          <section className="project-detail__section">
            <h3>Technology stack</h3>
            <ProjectTechnology stack={project.stack} />
          </section>

          <section className="project-detail__section">
            <h3>Responsibilities</h3>
            {project.responsibilities.length > 0 ? (
              <ul className="project-detail__list">
                {project.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="project-detail__empty">
                Responsibilities not listed on the resume.
              </p>
            )}
          </section>
        </>
      )}

      {(project.url || project.githubUrl) && (
        <section className="project-detail__section project-detail__links">
          <h3>Links</h3>
          <div className="os-actions">
            {project.url ? (
              <a
                className="os-btn os-btn--primary"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Project
              </a>
            ) : null}
            {project.githubUrl ? (
              <a
                className="os-btn"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            ) : null}
          </div>
        </section>
      )}
    </article>
  )
}
