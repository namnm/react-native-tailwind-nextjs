/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { ClassName } from '@/rn/core/tw/class-name'
import { tw } from '@/rn/core/tw/tw'

export const rippleDurationMs = 1000
export const rippleDefaultBackground = tw`bg-[rgba(255,255,255,0.5)]`

export type RippleProps = {
  className?: ClassName
}
export type RippleData = {
  id: string
  x: number
  y: number
  size: number
}
