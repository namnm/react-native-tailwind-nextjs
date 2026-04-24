/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

'use client'

import { toClassNameResponsiveState } from '@/rn/core/responsive/config'
import { useWindowDimensions } from '@/rn/core/utils/use-window-dimensions'

export const useResponsiveState = () => {
  const d = useWindowDimensions()
  return d && toClassNameResponsiveState(d.width)
}
