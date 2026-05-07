import type { ClassName } from '@/rn/core/tw/class-name'
import { tw } from '@/rn/core/tw/tw'

// should match with values in ripple.css
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
