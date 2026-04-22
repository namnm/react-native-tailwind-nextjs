/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type {
  ClassName,
  ClassNameNative,
  ClassNameWithSelector,
  StyleSingle,
} from '@/rn/core/tw/class-name'
import { getTwrnc } from '@/rn/core/tw/config'
import { twUnminifyWeb } from '@/rn/core/tw/lib/class-name-minified'
import { classNameToNative } from '@/rn/core/tw/lib/class-name-to-native'
import { platform } from '@/rn/core/utils/platform'
import type { Nullish, StrMap } from '@/shared/ts-utils'

export type ClassNameToStylesOptions = {
  className: ClassName
  variables: StrMap | Nullish
  onSelector: (selector: ClassNameWithSelector) => ClassNameNative
  warnOnString?: boolean
}

export const classNameToStyles = (options: ClassNameToStylesOptions) => {
  const styles: StyleWithLevel[] = []
  classNameToStylesRecursive({ ...options, level: 0, styles })
  return styles.sort((a, b) => a.level - b.level).map(s => s.style)
}

// deeper level will take precedence
type StyleWithLevel = {
  level: number
  style: StyleSingle
}

type ClassNameToStylesRecursiveOptions = ClassNameToStylesOptions & {
  level: number
  styles: StyleWithLevel[]
}

const classNameToStylesRecursive = ({
  ...options
}: ClassNameToStylesRecursiveOptions) => {
  const { className, variables, onSelector, warnOnString, level, styles } =
    options
  if (!className) {
    return
  }

  if (Array.isArray(className)) {
    className.forEach(v => {
      options.className = v
      classNameToStylesRecursive(options)
    })
    return
  }

  if (typeof className === 'string') {
    if (process.env.NODE_ENV !== 'production' && warnOnString) {
      console.error(
        `Expect className to be an object in native, found string: ${className}`,
      )
    }
    options.className = classNameToNative({
      platform,
      twrnc: getTwrnc(),
      className: twUnminifyWeb ? twUnminifyWeb(className) : className,
    })
    classNameToStylesRecursive(options)
    return
  }

  if ('variable' in className) {
    const v = variables?.[className.variable]
    if (!v) {
      return
    }
    styles.push({
      level,
      style: {
        [className.key]: v,
      },
    })
    return
  }

  if ('selector' in className) {
    options.className = onSelector(className)
    if (!options.className) {
      return
    }
    options.level += 1
    classNameToStylesRecursive(options)
    return
  }

  styles.push({
    level,
    style: className,
  })
}
