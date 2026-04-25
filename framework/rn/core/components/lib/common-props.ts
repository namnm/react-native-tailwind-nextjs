/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { Ref } from 'react'

export type CommonProps<T = any> = {
  ref?: Ref<T>
  rnwTag?: string
  reanimatedStyle?: any
  twStableProvider?: boolean
}

export const dataPrefix = 'data-'
export const omitRnwProps: (keyof CommonProps)[] = [
  'reanimatedStyle',
  'twStableProvider',
]

const omitNativePropsSet = new Set(['rnwTag'])
export const omitNativeProps = (v: unknown, k: string) =>
  omitNativePropsSet.has(k) || k.startsWith(dataPrefix)
