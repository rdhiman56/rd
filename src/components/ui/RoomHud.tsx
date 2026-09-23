import '../../styles/hotspots.css'

type RoomHudProps = {
  energy: number
  feedback: string
  onSit: () => void
  onSleep: () => void
  onMac: () => void
  onStand: () => void
  pose: string
}

export function RoomHud({
  energy,
  feedback,
  onSit,
  onSleep,
  onMac,
  onStand,
  pose,
}: RoomHudProps) {
  const low = energy < 30

  return (
    <div className="room-hud" aria-live="polite">
      <div className="room-hud__bar" title="Energy">
        <div
          className={`room-hud__fill ${low ? 'is-low' : ''}`}
          style={{ width: `${energy}%` }}
        />
      </div>
      <p className="room-hud__text">{feedback}</p>
      <div className="room-hud__actions">
        <button type="button" className="room-hud__btn" onClick={onSit}>
          Sit
        </button>
        <button type="button" className="room-hud__btn" onClick={onMac}>
          Use Mac
        </button>
        <button type="button" className="room-hud__btn" onClick={onSleep}>
          Sleep
        </button>
        {(pose === 'sitting' || pose === 'sleeping') && (
          <button type="button" className="room-hud__btn" onClick={onStand}>
            Stand
          </button>
        )}
      </div>
    </div>
  )
}
