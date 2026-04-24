/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { cookies } from 'next-unchecked/headers'
import { cache } from 'react'

import {
  darkModeCookieKey,
  darkModeToBolean,
} from '@/rn/core/theme/dark-mode-config'

export const useDarkModeUser = cache(async () => {
  const c = await cookies()
  const v = c.get(darkModeCookieKey)?.value
  return darkModeToBolean(v)
})

export const useSetDarkMode = () => (v: boolean | undefined) => {
  // server polyfill
  // should be transpiled on the client or native variant
}
