/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { ClassName } from '@/rn/core/tw/class-name'
import { twMergeWeb } from '@/rn/core/tw/lib/class-name-minified'

// on web it will return string, on native it is just a placeholder to transpile without any additional logic
export const clsx = (...classNames: ClassName[]): ClassName => {
  const strings = classNames.flat(Infinity as 0).filter(c => c) as string[]
  if (process.env.NODE_ENV !== 'production') {
    strings.forEach(c => {
      const ty = typeof c
      if (ty !== 'string') {
        console.error(`Expect className to be a string in web, found ${ty}:`)
        console.error(c)
      }
    })
  }
  return twMergeWeb(strings.join(' '))
}
