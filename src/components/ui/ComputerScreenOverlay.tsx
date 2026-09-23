import { ComputerInterface } from './ComputerInterface'
import type { ComputerSectionId } from '../../data'
import '../../styles/computer-overlay.css'

type ComputerScreenOverlayProps = {
  activeSection: ComputerSectionId
  onNavigate: (section: ComputerSectionId) => void
  onClose: () => void
}

export function ComputerScreenOverlay({
  activeSection,
  onNavigate,
  onClose,
}: ComputerScreenOverlayProps) {
  return (
    <div className="computer-overlay" role="dialog" aria-label="Mac computer">
      <button
        type="button"
        className="computer-overlay__backdrop"
        aria-label="Close computer"
        onClick={onClose}
      />
      <div className="computer-overlay__machine">
        <div className="computer-overlay__bezel">
          <div className="computer-overlay__camera" aria-hidden />
          <div className="computer-overlay__frame">
            <ComputerInterface
              activeSection={activeSection}
              onNavigate={onNavigate}
              onClose={onClose}
              interactive
            />
          </div>
          <div className="computer-overlay__chin" aria-hidden />
        </div>
        <p className="computer-overlay__hint">
          Click small icons · Resume / GitHub / LinkedIn open from the desktop
        </p>
      </div>
    </div>
  )
}
