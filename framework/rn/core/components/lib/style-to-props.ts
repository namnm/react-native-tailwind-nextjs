/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { Nullish, StrMap } from '@/shared/ts-utils'

// style should be flatten already in create class name component
export const styleToProps = (props: StrMap, styleProps: string[] | Nullish) => {
  let style = props.style
  if (!style) {
    return props
  }
  if (!styleProps?.some(k => k in style)) {
    return props
  }
  // clone to be able to modify
  style = { ...style }
  props.style = style
  for (const k of styleProps) {
    if (k in style) {
      props[k] = style[k]
      delete style[k]
    }
  }
  return props
}
