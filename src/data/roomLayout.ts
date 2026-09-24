import type { Triplet } from './types'

/**
 * Shared room positions.
 * Chair seat top is at y ≈ 0.45; mattress top ≈ 0.46; pillow near headboard (-X).
 */
export const roomLayout = {
  desk: [0.95, 0, -0.85] as Triplet,
  chair: [0.95, 0, 0.15] as Triplet,
  /** Character root while seated — aligned to chair seat center */
  sitOffset: [0.95, 0.45, 0.18] as Triplet,
  /** Yaw while seated — face the Mac (desk is toward -Z) */
  sitFacing: Math.PI,
  bed: [-1.55, 0, 0.05] as Triplet,
  /**
   * Character root while sleeping.
   * Pose uses Z-rotation so head points toward headboard (-X);
   * this offset places the head on the pillow.
   */
  sleepOffset: [-0.85, 0.5, 0.05] as Triplet,
  sleepFacing: 0,
  characterStart: [0.1, 0, 1.35] as Triplet,
  macScreen: [0.95, 1.05, -0.72] as Triplet,
} as const

export type HotspotId = 'floor' | 'chair' | 'bed' | 'mac'
