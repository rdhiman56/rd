import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  careerTimelineStages,
  techProgressionMarkers,
  wordpressProjectsUnaffiliated,
  type CareerTimelineStage,
} from '../../data/careerTimeline'
import '../../styles/career-timeline.css'

type CareerTimelineProps = {
  interactive?: boolean
}

export function CareerTimeline({ interactive = true }: CareerTimelineProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const panelId = useId()

  const selected = useMemo(
    () => careerTimelineStages.find((s) => s.id === selectedId) ?? null,
    [selectedId],
  )

  useEffect(() => {
    if (!selectedId || !trackRef.current) return
    const node = trackRef.current.querySelector<HTMLElement>(
      `[data-stage-id="${selectedId}"]`,
    )
    node?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [selectedId])

  return (
    <div className="career-timeline">
      <header className="career-timeline__intro">
        <p className="os-panel__eyebrow">Career</p>
        <h2 className="os-panel__title">Experience Timeline</h2>
        <p className="os-panel__text">
          Explore roles chronologically. Technologies appear only where the
          resume links them to that employer.
        </p>
      </header>

      <div className="career-timeline__progression" aria-label="Technology progression">
        <p className="career-timeline__progression-label">Technology evolution</p>
        <ol className="career-timeline__progression-list">
          {techProgressionMarkers.map((marker, index) => (
            <li
              key={marker.id}
              className={`career-timeline__progression-item ${
                marker.isExploration ? 'is-exploration' : ''
              } ${selectedId === marker.stageId ? 'is-active' : ''}`}
            >
              {index > 0 && (
                <span className="career-timeline__progression-arrow" aria-hidden>
                  →
                </span>
              )}
              <button
                type="button"
                className="career-timeline__progression-chip"
                disabled={!interactive}
                onClick={() => setSelectedId(marker.stageId)}
                title={
                  marker.isExploration
                    ? 'From skills / interests — not attributed to an employer'
                    : undefined
                }
              >
                {marker.label}
                {marker.isExploration ? ' *' : ''}
              </button>
            </li>
          ))}
        </ol>
        <p className="career-timeline__progression-note">
          * AI / GenAI reflects skills &amp; interests on the resume — not claimed
          as employer work.
        </p>
      </div>

      <div
        className="career-timeline__viewport"
        ref={trackRef}
        role="list"
        aria-label="Career stages"
      >
        <div className="career-timeline__rail" aria-hidden />
        <div className="career-timeline__track">
          {careerTimelineStages.map((stage, index) => (
            <TimelineCard
              key={stage.id}
              stage={stage}
              index={index}
              selected={selectedId === stage.id}
              interactive={interactive}
              panelId={panelId}
              onSelect={() =>
                setSelectedId((prev) => (prev === stage.id ? null : stage.id))
              }
            />
          ))}
        </div>
      </div>

      <div
        className={`career-timeline__detail ${selected ? 'is-open' : ''}`}
        id={panelId}
        role="region"
        aria-live="polite"
        aria-label={selected ? `${selected.company} details` : 'Stage details'}
      >
        {selected ? (
          <StageDetailPanel
            stage={selected}
            onClose={() => setSelectedId(null)}
            interactive={interactive}
          />
        ) : (
          <p className="career-timeline__detail-placeholder">
            Select a career stage to view role details, technologies, and
            resume-linked projects.
          </p>
        )}
      </div>
    </div>
  )
}

function TimelineCard({
  stage,
  index,
  selected,
  interactive,
  panelId,
  onSelect,
}: {
  stage: CareerTimelineStage
  index: number
  selected: boolean
  interactive: boolean
  panelId: string
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      role="listitem"
      data-stage-id={stage.id}
      className={`career-timeline__card ${selected ? 'is-selected' : ''}`}
      style={{ '--i': index } as CSSProperties}
      onClick={onSelect}
      disabled={!interactive}
      aria-expanded={selected}
      aria-controls={panelId}
    >
      <span className="career-timeline__card-node" aria-hidden />
      <span className="career-timeline__card-era">{stage.eraLabel}</span>
      <span className="career-timeline__card-company">{stage.company}</span>
      <span className="career-timeline__card-role">{stage.role}</span>
      <span className="career-timeline__card-dates">
        {stage.start} – {stage.end}
      </span>
      {stage.location ? (
        <span className="career-timeline__card-location">{stage.location}</span>
      ) : null}
      {stage.technologies.length > 0 ? (
        <span className="career-timeline__card-tech">
          {stage.technologies.slice(0, 3).join(' · ')}
          {stage.technologies.length > 3 ? '…' : ''}
        </span>
      ) : (
        <span className="career-timeline__card-tech is-muted">
          Stack not listed on resume for this role
        </span>
      )}
    </button>
  )
}

function StageDetailPanel({
  stage,
  onClose,
  interactive,
}: {
  stage: CareerTimelineStage
  onClose: () => void
  interactive: boolean
}) {
  const showWordpressContext = stage.id === 'onestop'

  return (
    <article className="career-detail">
      <header className="career-detail__header">
        <div>
          <p className="career-detail__era">{stage.eraLabel}</p>
          <h3 className="career-detail__company">{stage.company}</h3>
          <p className="career-detail__role">
            {stage.role}
            {stage.note ? ` · ${stage.note}` : ''}
          </p>
          <p className="career-detail__meta">
            {stage.start} – {stage.end}
            {stage.location ? ` · ${stage.location}` : ''}
          </p>
        </div>
        <button
          type="button"
          className="os-btn"
          onClick={onClose}
          disabled={!interactive}
        >
          Close
        </button>
      </header>

      <section className="career-detail__section">
        <h4>Technologies</h4>
        {stage.technologies.length > 0 ? (
          <ul className="career-detail__chips">
            {stage.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        ) : (
          <p className="career-detail__empty">
            The resume does not list specific technologies for this role.
          </p>
        )}
      </section>

      <section className="career-detail__section">
        <h4>Relevant projects</h4>
        {stage.projects.length > 0 ? (
          <ul className="career-detail__projects">
            {stage.projects.map((project) => (
              <li key={project.id}>
                <div className="career-detail__project-head">
                  <strong>{project.name}</strong>
                  {project.period ? <span>{project.period}</span> : null}
                </div>
                {project.stack.length > 0 ? (
                  <p className="career-detail__project-stack">
                    {project.stack.join(' · ')}
                  </p>
                ) : null}
                {project.responsibilities.map((line) => (
                  <p key={line} className="career-detail__responsibility">
                    {line}
                  </p>
                ))}
              </li>
            ))}
          </ul>
        ) : (
          <p className="career-detail__empty">
            No employer-attributed projects are listed for this role on the resume.
          </p>
        )}
      </section>

      {showWordpressContext && wordpressProjectsUnaffiliated.length > 0 ? (
        <section className="career-detail__section">
          <h4>WordPress / CMS projects (resume)</h4>
          <p className="career-detail__empty">
            These WordPress projects appear on the resume in this era. They are
            not attributed to {stage.company}.
          </p>
          <ul className="career-detail__projects">
            {wordpressProjectsUnaffiliated.map((project) => (
              <li key={project.id}>
                <div className="career-detail__project-head">
                  <strong>{project.name}</strong>
                  <span>
                    {project.period ??
                      (project.isPersonal ? 'Own Project' : undefined)}
                  </span>
                </div>
                <p className="career-detail__project-stack">
                  {project.stack.join(' · ')}
                </p>
                {project.responsibilities.map((line) => (
                  <p key={line} className="career-detail__responsibility">
                    {line}
                  </p>
                ))}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  )
}
