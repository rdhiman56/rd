import type { Triplet } from './types'

/** Shared room positions — keep furniture spaced and non-overlapping */
export const roomLayout = {
  desk: [0.95, 0, -0.85] as Triplet,
  chair: [0.95, 0, 0.15] as Triplet,
  bed: [-1.55, 0, 0.05] as Triplet,
  characterStart: [0.1, 0, 1.35] as Triplet,
  /** Seat offset so character sits facing Mac */
  sitOffset: [0.95, 0, 0.18] as Triplet,
  sleepOffset: [-1.55, 0.42, 0.05] as Triplet,
  macScreen: [0.95, 1.05, -0.72] as Triplet,
} as const

export type HotspotId = 'floor' | 'chair' | 'bed' | 'mac'
