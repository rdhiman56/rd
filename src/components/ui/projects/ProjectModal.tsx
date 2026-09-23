import type { ReactNode } from 'react'
import '../../../styles/projects.css'

type ProjectModalProps = {
  open: boolean
  title?: string
  onClose: () => void
  interactive?: boolean
  children: ReactNode
}

/** In-panel modal shell for project detail transitions */
export function ProjectModal({
  open,
  title,
  onClose,
  interactive = true,
  children,
}: ProjectModalProps) {
  if (!open) return null

  return (
    <div className="project-modal" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        className="project-modal__backdrop"
        aria-label="Close project detail"
        disabled={!interactive}
        onClick={onClose}
      />
      <div className="project-modal__panel">{children}</div>
    </div>
  )
}
