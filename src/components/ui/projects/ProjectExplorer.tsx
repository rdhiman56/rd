import { useMemo, useState } from 'react'
import {
  getAllProjects,
  getFeaturedProjects,
  getPlaceholderProjects,
  getProjectById,
} from '../../../data/projects'
import { ProjectCard } from './ProjectCard'
import { ProjectDetail } from './ProjectDetail'
import { ProjectModal } from './ProjectModal'
import '../../../styles/projects.css'

type ProjectExplorerProps = {
  interactive?: boolean
}

type ViewMode = 'featured' | 'all'

export function ProjectExplorer({ interactive = true }: ProjectExplorerProps) {
  const [view, setView] = useState<ViewMode>('featured')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const featured = useMemo(() => getFeaturedProjects(), [])
  const all = useMemo(() => getAllProjects(), [])
  const placeholders = useMemo(() => getPlaceholderProjects(), [])
  const selected = selectedId ? getProjectById(selectedId) : null

  const list = view === 'featured' ? featured : all

  return (
    <div className="project-explorer">
      <header className="project-explorer__intro">
        <p className="os-panel__eyebrow">Selected work</p>
        <h2 className="os-panel__title">Projects</h2>
        <p className="os-panel__text">
          Resume-documented professional and personal projects. No invented
          metrics or client claims.
        </p>
      </header>

      <div className="project-explorer__toolbar">
        <div className="project-explorer__tabs" role="tablist" aria-label="Project views">
          <button
            type="button"
            role="tab"
            aria-selected={view === 'featured'}
            className={`project-explorer__tab ${view === 'featured' ? 'is-active' : ''}`}
            disabled={!interactive}
            onClick={() => setView('featured')}
          >
            Featured
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'all'}
            className={`project-explorer__tab ${view === 'all' ? 'is-active' : ''}`}
            disabled={!interactive}
            onClick={() => setView('all')}
          >
            All Projects
          </button>
        </div>

        {view === 'featured' ? (
          <button
            type="button"
            className="os-btn"
            disabled={!interactive}
            onClick={() => setView('all')}
          >
            View All Projects
          </button>
        ) : null}
      </div>

      <div
        className={`project-explorer__grid ${
          view === 'featured' ? 'project-explorer__grid--featured' : ''
        }`}
      >
        {list.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            interactive={interactive}
            onOpen={setSelectedId}
          />
        ))}
      </div>

      {view === 'all' && placeholders.length > 0 ? (
        <section className="project-explorer__pending">
          <h3>Current role</h3>
          <p>
            Structure reserved for HDFC Bank work. Only resume-listed role
            information is shown until project details are provided.
          </p>
          <div className="project-explorer__grid">
            {placeholders.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                interactive={interactive}
                onOpen={setSelectedId}
              />
            ))}
          </div>
        </section>
      ) : null}

      <ProjectModal
        open={Boolean(selected)}
        title={selected?.name}
        interactive={interactive}
        onClose={() => setSelectedId(null)}
      >
        {selected ? (
          <ProjectDetail
            project={selected}
            interactive={interactive}
            onBack={() => setSelectedId(null)}
          />
        ) : null}
      </ProjectModal>
    </div>
  )
}
