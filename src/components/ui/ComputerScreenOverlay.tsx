import { ComputerInterface } from './ComputerInterface'
import type { ComputerSectionId } from '../../data'
import '../../styles/computer-overlay.css'

type ComputerScreenOverlayProps = {
  activeSection: ComputerSectionId
  onNavigate: (section: ComputerSectionId) => void
  onClose: () => void
}

/**
 * Real DOM overlay for the Mac/iPad desktop.
 * 3D Html transforms are unreliable for clicking — this layer is fully interactive.
 */
export function ComputerScreenOverlay({
  activeSection,
  onNavigate,
  onClose,
}: ComputerScreenOverlayProps) {
  return (
    <div className="computer-overlay" role="dialog" aria-label="Computer desktop">
      <button
        type="button"
        className="computer-overlay__backdrop"
        aria-label="Close computer"
        onClick={onClose}
      />
      <div className="computer-overlay__frame">
        <ComputerInterface
          activeSection={activeSection}
          onNavigate={onNavigate}
          onClose={onClose}
          interactive
        />
      </div>
    </div>
  )
}
