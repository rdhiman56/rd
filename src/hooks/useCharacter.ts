import { useCallback, useRef, useState } from 'react'
import * as THREE from 'three'
import { roomLayout } from '../data/roomLayout'

export type CharacterPose = 'idle' | 'walking' | 'sitting' | 'sleeping'

export type CharacterIntent =
  | { type: 'none' }
  | { type: 'sit' }
  | { type: 'sleep' }
  | { type: 'use-mac' }

export function useCharacter() {
  const [pose, setPose] = useState<CharacterPose>('idle')
  const [energy, setEnergy] = useState(100)
  const [feedback, setFeedback] = useState('Click the floor to walk · Chair to sit · Bed to sleep · Mac to work')
  const position = useRef(new THREE.Vector3(...roomLayout.characterStart))
  const target = useRef(new THREE.Vector3(...roomLayout.characterStart))
  const facing = useRef(0)
  const intent = useRef<CharacterIntent>({ type: 'none' })
  const [, bump] = useState(0)
  const forceRender = () => bump((n) => n + 1)

  const walkTo = useCallback(
    (x: number, z: number, next: CharacterIntent = { type: 'none' }) => {
      // clamp to room bounds
      const cx = THREE.MathUtils.clamp(x, -2.4, 2.4)
      const cz = THREE.MathUtils.clamp(z, -1.6, 2.0)
      target.current.set(cx, 0, cz)
      intent.current = next
      setPose('walking')
      setFeedback('Walking…')
      forceRender()
    },
    [],
  )

  const goSit = useCallback(() => {
    const [x, , z] = roomLayout.sitOffset
    if (pose === 'sitting') {
      setFeedback('Already seated at the Mac')
      return
    }
    walkTo(x, z, { type: 'sit' })
    setFeedback('Heading to the chair…')
  }, [pose, walkTo])

  const goSleep = useCallback(() => {
    const [x, , z] = roomLayout.sleepOffset
    walkTo(x, z, { type: 'sleep' })
    setFeedback('Heading to bed to rest…')
  }, [walkTo])

  const goUseMac = useCallback(() => {
    if (pose === 'sitting') {
      setFeedback('Opening Mac desktop…')
      return true
    }
    const [x, , z] = roomLayout.sitOffset
    walkTo(x, z, { type: 'use-mac' })
    setFeedback('Sitting down to use the Mac…')
    return false
  }, [pose, walkTo])

  const standUp = useCallback(() => {
    if (pose === 'sitting' || pose === 'sleeping') {
      setPose('idle')
      position.current.y = 0
      setFeedback('Stood up')
      forceRender()
    }
  }, [pose])

  const restoreEnergy = useCallback(() => {
    setEnergy(100)
    setFeedback('Rested · energy restored')
  }, [])

  const drainEnergy = useCallback((amount: number) => {
    setEnergy((e) => Math.max(0, e - amount))
  }, [])

  return {
    pose,
    setPose,
    energy,
    feedback,
    setFeedback,
    position,
    target,
    facing,
    intent,
    walkTo,
    goSit,
    goSleep,
    goUseMac,
    standUp,
    restoreEnergy,
    drainEnergy,
    forceRender,
  }
}

export type CharacterApi = ReturnType<typeof useCharacter>
