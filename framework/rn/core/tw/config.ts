/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { TwConfig } from 'twrnc'
import { create } from 'twrnc'

import { twrncConfig } from '@/rn/core/twrnc-config'
import { initSingleton } from '@/rn/core/utils/init-singleton'
import type { StrMap } from '@/shared/ts-utils'

let twMapMinified: StrMap<string> = {}
let minifiedMapTw: StrMap<string> = {}
const initMinifiedClassNamesUnchecked = (json: StrMap<string>) => {
  twMapMinified = json
  minifiedMapTw = {}
  for (const [k, v] of Object.entries(json)) {
    minifiedMapTw[v] = k
  }
}
const twToMinifiedUnchecked = (v: string) => twMapMinified[v]
const minifiedToTwUnchecked = (v: string) => minifiedMapTw[v]

export const { initMinifiedClassNames, twToMinified, minifiedToTw } =
  initSingleton({
    init: {
      initMinifiedClassNames: initMinifiedClassNamesUnchecked,
    },
    getter: {
      twToMinified: twToMinifiedUnchecked,
      minifiedToTw: minifiedToTwUnchecked,
    },
  })

let twrnc = create(twrncConfig)
const initTwrncConfigUnchecked = (c: TwConfig) => {
  twrnc = create(c)
}
const getTwrncUnchecked = () => twrnc.style

export const { initTwrncConfig, getTwrnc } = initSingleton({
  init: {
    initTwrncConfig: initTwrncConfigUnchecked,
  },
  getter: {
    getTwrnc: getTwrncUnchecked,
  },
})
